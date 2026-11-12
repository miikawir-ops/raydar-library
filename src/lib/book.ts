import { marked } from 'marked';
import type { CollectionEntry } from 'astro:content';

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

// Books with any of these tags lead the home page grid in every sort order.
export const FEATURED_TAGS: readonly string[] = ['tekoaly', 'psykologia'];
export const isFeatured = (book: Book) => book.data.tags.some((t) => FEATURED_TAGS.includes(t));
