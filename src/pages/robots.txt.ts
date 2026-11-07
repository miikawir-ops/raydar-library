import type { APIRoute } from 'astro';
import { site } from '../site.config';

// Crawling stays allowed even when indexable is false: a crawler blocked here
// would never read the noindex meta tag.
export const GET: APIRoute = () =>
  new Response(
    `User-agent: *\nAllow: /\n${site.indexable ? `\nSitemap: ${site.url}/sitemap.xml\n` : ''}`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
