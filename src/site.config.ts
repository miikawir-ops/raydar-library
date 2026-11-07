export const site = {
  url: 'https://library.raydar.fi',
  // false: noindex meta only; robots.txt still allows crawling so that crawlers can
  // read the noindex. Ray decides when to flip this.
  // true: removes noindex and enables the sitemap, meta description and Open Graph tags.
  indexable: false,
};
