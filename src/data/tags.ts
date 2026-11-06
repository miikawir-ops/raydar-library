// Allowed book tags. Read by the content schema and tools/check-books.mjs.
// Do not add tags without Ray's approval. Keep this file free of non-erasable
// TypeScript, because check-books.mjs imports it directly under Node.
export const tags = {
  talous: { fi: 'Talous', en: 'Economics' },
  sijoittaminen: { fi: 'Sijoittaminen', en: 'Investing' },
  liiketoiminta: { fi: 'Liiketoiminta', en: 'Business' },
  johtaminen: { fi: 'Johtaminen', en: 'Leadership' },
  psykologia: { fi: 'Psykologia', en: 'Psychology' },
  paatoksenteko: { fi: 'Päätöksenteko', en: 'Decision-making' },
  teknologia: { fi: 'Teknologia', en: 'Technology' },
  tekoaly: { fi: 'Tekoäly', en: 'AI' },
  tiede: { fi: 'Tiede', en: 'Science' },
  historia: { fi: 'Historia', en: 'History' },
  yhteiskunta: { fi: 'Yhteiskunta', en: 'Society' },
  filosofia: { fi: 'Filosofia', en: 'Philosophy' },
  terveys: { fi: 'Terveys', en: 'Health' },
  tuottavuus: { fi: 'Tuottavuus', en: 'Productivity' },
};

export type TagId = keyof typeof tags;
export const tagIds = Object.keys(tags) as [TagId, ...TagId[]];
