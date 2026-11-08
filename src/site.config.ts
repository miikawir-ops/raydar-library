export const site = {
  url: 'https://library.raydar.fi',
  // false: noindex meta only; robots.txt still allows crawling so that crawlers can
  // read the noindex. Ray decides when to flip this.
  // true: removes noindex and enables the sitemap, meta description and Open Graph tags.
  indexable: false,
  // Reading-panel variant under comparison (branch ui-depth-color): 'a' = dark depth, 'b' = book page.
  // ?panel=a or ?panel=b in the URL overrides it in the browser, for side-by-side comparison.
  panel: 'a',
};
