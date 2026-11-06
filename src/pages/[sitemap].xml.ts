import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../site.config';

// Emitted only when the site is indexable.
export const getStaticPaths = () => (site.indexable ? [{ params: { sitemap: 'sitemap' } }] : []);

export const GET: APIRoute = async () => {
  const books = await getCollection('books');
  const urls = [`${site.url}/`, ...books.map((b) => `${site.url}/${b.id}/`)];
  const body = urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
