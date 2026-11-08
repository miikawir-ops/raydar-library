// Allowed book tags. Read by the content schema and tools/check-books.mjs.
// Do not add tags without Ray's approval. Keep this file free of non-erasable
// TypeScript, because check-books.mjs imports it directly under Node.
//
// hue = the tag's colour from the hero palette (src/styles/tokens.css, [data-hue]):
//   brass   money and work:      talous, sijoittaminen, liiketoiminta, tuottavuus
//   wine    people over time:    historia, yhteiskunta, johtaminen
//   emerald mind and life:       psykologia, terveys, filosofia
//   moon    reason and machines: paatoksenteko, teknologia, tekoaly, tiede
export const tags = {
  talous: { fi: 'Talous', en: 'Economics', hue: 'brass' },
  sijoittaminen: { fi: 'Sijoittaminen', en: 'Investing', hue: 'brass' },
  liiketoiminta: { fi: 'Liiketoiminta', en: 'Business', hue: 'brass' },
  johtaminen: { fi: 'Johtaminen', en: 'Leadership', hue: 'wine' },
  psykologia: { fi: 'Psykologia', en: 'Psychology', hue: 'emerald' },
  paatoksenteko: { fi: 'Päätöksenteko', en: 'Decision-making', hue: 'moon' },
  teknologia: { fi: 'Teknologia', en: 'Technology', hue: 'moon' },
  tekoaly: { fi: 'Tekoäly', en: 'AI', hue: 'moon' },
  tiede: { fi: 'Tiede', en: 'Science', hue: 'moon' },
  historia: { fi: 'Historia', en: 'History', hue: 'wine' },
  yhteiskunta: { fi: 'Yhteiskunta', en: 'Society', hue: 'wine' },
  filosofia: { fi: 'Filosofia', en: 'Philosophy', hue: 'emerald' },
  terveys: { fi: 'Terveys', en: 'Health', hue: 'emerald' },
  tuottavuus: { fi: 'Tuottavuus', en: 'Productivity', hue: 'brass' },
};

export type TagId = keyof typeof tags;
export const tagIds = Object.keys(tags) as [TagId, ...TagId[]];
