import { marked } from 'marked';
import type { CollectionEntry } from 'astro:content';
import type { TagId } from '../data/tags';

export type Book = CollectionEntry<'books'>;
export type BookData = Book['data'];

// Text fields hold light Markdown written in this repo, so the output is trusted.
export const md = (text: string) => marked.parse(text, { async: false }) as string;
export const mdInline = (text: string) => marked.parseInline(text, { async: false }) as string;

export function coverSrc(book: BookData, size: 'M' | 'L'): string | null {
  if (book.cover_url) return book.cover_url;
  if (book.cover_id) return `https://covers.openlibrary.org/b/id/${book.cover_id}-${size}.jpg`;
  return null;
}

// Sort key: the last word of the first listed author.
export const authorSortKey = (author: string) =>
  author.split(',')[0].trim().split(/\s+/).pop()!.toLowerCase();

const WORDS_PER_MINUTE = 200;

export function readingMinutes(lang: BookData['fi']): number {
  const text = [
    lang.ydin,
    lang.yleiskuva,
    ...lang.ideat.flatMap((i) => [i.otsikko, i.selitys]),
    ...lang.kasitteet.flatMap((k) => [k.termi, k.selitys]),
    lang.kirjoittaja,
    ...lang.suositukset,
    ...lang.huomio,
  ].join(' ');
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / WORDS_PER_MINUTE));
}

export const byNewest = (a: Book, b: Book) =>
  b.data.added.getTime() - a.data.added.getTime() || a.data.title.localeCompare(b.data.title);

// Home page shelves, in display order. A book stands on the first shelf whose tag it has, so it is
// on exactly one shelf; the last shelf (tag null) takes all the rest. hueTag gives the shelf's line
// colour. With a search or a tag filter the home page shows a plain grid in the same shelf order,
// so AI and psychology books still lead every sort order there.
export const SHELVES: readonly { id: string; tag: TagId | null; hueTag: TagId; fi: string; en: string }[] = [
  { id: 'tekoaly', tag: 'tekoaly', hueTag: 'tekoaly', fi: 'Tekoäly', en: 'Artificial intelligence' },
  { id: 'psykologia', tag: 'psykologia', hueTag: 'psykologia', fi: 'Käyttäytymispsykologia', en: 'Behavioural psychology' },
  { id: 'historia-yhteiskunta', tag: null, hueTag: 'historia', fi: 'Historia ja yhteiskunta', en: 'History and society' },
];
export const shelfIndex = (book: Book) =>
  SHELVES.findIndex((s) => s.tag === null || book.data.tags.includes(s.tag));
