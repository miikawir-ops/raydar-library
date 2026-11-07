import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { tagIds } from './data/tags';

const nonEmpty = z.string().trim().min(1);

const language = z.object({
  ydin: nonEmpty,
  yleiskuva: nonEmpty,
  ideat: z.array(z.object({ otsikko: nonEmpty, selitys: nonEmpty })).min(1),
  kasitteet: z.array(z.object({ termi: nonEmpty, selitys: nonEmpty })).default([]),
  kirjoittaja: nonEmpty,
  suositukset: z.array(nonEmpty).default([]),
  huomio: z.array(nonEmpty).max(2).default([]),
});

const books = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/books' }),
  schema: z.object({
    title: nonEmpty,
    title_fi: nonEmpty.optional(),
    author: nonEmpty,
    year: z.number().int(),
    isbn: z.string().optional(),
    cover_id: z.number().int().positive().optional(),
    olid: z.string().optional(),
    cover_url: z.string().optional(),
    tags: z.array(z.enum(tagIds)).min(1).max(3),
    added: z.coerce.date(),
    updated: z.coerce.date().optional(),
    varmuus: z.enum(['korkea', 'kohtalainen', 'matala']),
    lahteet: z.array(z.object({ nimi: nonEmpty, url: z.string().url() })).min(2).max(12),
    liittyvat: z.array(z.string()).max(4).default([]),
    fi: language,
    en: language,
    oma_huomio: z.string().default(''),
  }),
});

export const collections = { books };
