#!/usr/bin/env node
// Content check, run before every build (npm prebuild).
// Errors fail the build; warnings are reported for Ray to assess, never auto-fixed.
// It proves structure only, not that a summary is factually correct.
// Usage: node tools/check-books.mjs [books-dir]

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { tags as allowedTags } from '../src/data/tags.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = process.argv[2] ? resolve(process.argv[2]) : join(root, 'src/content/books');

const FILENAME = /^[a-z0-9]+(-[a-z0-9]+)*\.md$/;
const QUOTES = /[„“”‟"«»]/;
// "Clearly deviates" = more than 30 % outside the indicative range.
const TOLERANCE = 0.3;
const LENGTH_DIFF_LIMIT = 0.4;

const SCOPE = {
  korkea: { total: [1500, 3000], yleiskuva: [250, 500], ideat: [6, 12], selitys: [80, 200] },
  // Roughly half the scope: overview and 4-6 ideas at a general level.
  kohtalainen: { total: [750, 1500], yleiskuva: [125, 250], ideat: [4, 6], selitys: [40, 150] },
};

const words = (s) => (typeof s === 'string' ? s.trim().split(/\s+/).filter(Boolean).length : 0);
const sentences = (s) => (s.match(/[.!?…]+(\s|$)/g) ?? []).length || 1;
const filled = (s) => typeof s === 'string' && s.trim().length > 0;
const outside = (n, [min, max]) => n < min * (1 - TOLERANCE) || n > max * (1 + TOLERANCE);

function readFrontmatter(path) {
  const match = readFileSync(path, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---\s*/);
  if (!match) throw new Error('frontmatter missing');
  return parse(match[1]);
}

function allText(lang) {
  return [
    lang.ydin,
    lang.yleiskuva,
    ...(lang.ideat ?? []).flatMap((i) => [i?.otsikko, i?.selitys]),
    ...(lang.kasitteet ?? []).flatMap((k) => [k?.termi, k?.selitys]),
    lang.kirjoittaja,
    ...(lang.suositukset ?? []),
    ...(lang.huomio ?? []),
  ].filter(filled);
}

const errors = [];
const warnings = [];

const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.md')) : [];
const slugs = new Set(files.map((f) => f.replace(/\.md$/, '')));

for (const file of files) {
  const error = (msg) => errors.push(`${file}: ${msg}`);
  const warn = (msg) => warnings.push(`${file}: ${msg}`);

  if (!FILENAME.test(file)) error('invalid filename (lowercase a-z, 0-9 and - only)');

  let book;
  try {
    book = readFrontmatter(join(dir, file));
  } catch (e) {
    error(`cannot parse frontmatter: ${e.message}`);
    continue;
  }

  const bookTags = Array.isArray(book.tags) ? book.tags : [];
  if (bookTags.length < 1 || bookTags.length > 3) error(`needs 1-3 tags, has ${bookTags.length}`);
  for (const tag of bookTags) {
    if (!Object.hasOwn(allowedTags, tag)) error(`tag not allowed: ${tag}`);
  }

  for (const related of book.liittyvat ?? []) {
    if (!slugs.has(related)) error(`liittyvat points to a missing book: ${related}`);
    if (related === file.replace(/\.md$/, '')) error('liittyvat points to the book itself');
  }

  const sources = Array.isArray(book.lahteet) ? book.lahteet : [];
  if (sources.length < 2) error(`lahteet needs at least 2 sources, has ${sources.length}`);
  if (sources.length > 12) error(`lahteet allows at most 12 sources, has ${sources.length}`);

  const scope = SCOPE[book.varmuus];
  const totals = {};

  for (const code of ['fi', 'en']) {
    const lang = book[code];
    if (!lang || typeof lang !== 'object') {
      error(`${code} is missing`);
      continue;
    }
    for (const field of ['ydin', 'yleiskuva', 'kirjoittaja']) {
      if (!filled(lang[field])) error(`${code}.${field} is empty`);
    }
    const ideat = Array.isArray(lang.ideat) ? lang.ideat : [];
    if (ideat.length === 0) error(`${code}.ideat is empty`);
    ideat.forEach((idea, i) => {
      if (!filled(idea?.otsikko) || !filled(idea?.selitys)) {
        error(`${code}.ideat[${i + 1}] has an empty otsikko or selitys`);
      }
    });

    const text = allText(lang);
    totals[code] = text.reduce((sum, t) => sum + words(t), 0);

    const quoted = text.find((t) => QUOTES.test(t));
    if (quoted) warn(`${code}: quotation marks, possibly a quote: ${quoted.slice(0, 70).replace(/\s+/g, ' ')}...`);

    if (filled(lang.ydin) && sentences(lang.ydin) > 3) warn(`${code}.ydin has ${sentences(lang.ydin)} sentences (guide 1-3)`);
    if (filled(lang.kirjoittaja) && outside(words(lang.kirjoittaja), [50, 100])) {
      warn(`${code}.kirjoittaja is ${words(lang.kirjoittaja)} words (guide 50-100)`);
    }
    if ((lang.kasitteet ?? []).length > 8) warn(`${code}.kasitteet has ${lang.kasitteet.length} items (guide 0-8)`);
    if ((lang.suositukset ?? []).length > 6) warn(`${code}.suositukset has ${lang.suositukset.length} items (guide 0-6)`);
    if ((lang.huomio ?? []).length > 2) warn(`${code}.huomio has ${lang.huomio.length} items (guide 0-2)`);

    if (scope) {
      const overview = words(lang.yleiskuva);
      if (overview && outside(overview, scope.yleiskuva)) warn(`${code}.yleiskuva is ${overview} words (guide ${scope.yleiskuva.join('-')})`);
      if (ideat.length && (ideat.length < scope.ideat[0] || ideat.length > scope.ideat[1])) {
        warn(`${code}.ideat has ${ideat.length} items (guide ${scope.ideat.join('-')})`);
      }
      ideat.forEach((idea, i) => {
        const n = words(idea?.selitys);
        if (n && outside(n, scope.selitys)) warn(`${code}.ideat[${i + 1}] selitys is ${n} words (guide ${scope.selitys.join('-')})`);
      });
      if (outside(totals[code], scope.total)) warn(`${code} total is ${totals[code]} words (guide ${scope.total.join('-')})`);
    }
  }

  if (totals.fi && totals.en) {
    const diff = Math.abs(totals.fi - totals.en) / Math.max(totals.fi, totals.en);
    if (diff > LENGTH_DIFF_LIMIT) warn(`FI (${totals.fi}) and EN (${totals.en}) lengths differ by ${Math.round(diff * 100)} %`);
  }
}

for (const w of warnings) console.warn(`WARNING ${w}`);
for (const e of errors) console.error(`ERROR   ${e}`);
console.log(`check-books: ${files.length} books, ${errors.length} errors, ${warnings.length} warnings`);
if (errors.length > 0) process.exit(1);
