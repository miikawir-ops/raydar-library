---
description: Lisää kirjastoon uusi kirjatiivistelmä (FI/EN). Useampi kirja puolipisteellä erotettuna.
argument-hint: <kirjan nimi [ja kirjoittaja]> [; toinen kirja ...]
---

Lisää kirjastoon kirjatiivistelmä tai -tiivistelmät: $ARGUMENTS

Noudata CLAUDE.md:n sääntöjä. Tämä komento määrittää vain työjärjestyksen, ei sääntöjä.

Jos argumentissa on useita kirjoja puolipisteellä erotettuna, käsittele ne yksi kerrallaan. Jokaisesta kirjasta tehdään oma commit.

Kysy Raylta vain, kun:

- kirjaa ei tunnisteta tai nimellä löytyy useita teoksia
- varmuus on `matala`
- kirja on jo kirjastossa

Muuten etene loppuun asti ilman välikysymyksiä.

## Työjärjestys (per kirja)

1. **Tunnista teos.** Tarkista, onko kirja jo `src/content/books/`-kansiossa. Vertaa nimeä, kirjoittajaa ja tiedostonimeä.
   - Jos kirja löytyy, kysy päivitetäänkö se vai ohitetaanko.
2. **Hae ja avaa lähteet** (2–6 kpl CLAUDE.md:n Lähteet-osion mukaan). Tarkista:
   - perustiedot
   - suomennos ja sen nimi
   - kirjoittajan tausta
   - kirjan pääsanoma ja keskeiset viestit
3. **Arvioi varmuus.**
   - `matala` → pysähdy ja kysy.
   - `kohtalainen` → käytä suppeampaa laajuutta.
4. **Hae kansi.** Open Library Search API WebFetchillä, ei curlilla → `cover_id` ja `olid`. Jos haku epäonnistuu tai osuma on epävarma, jätä kentät pois.
5. **Kirjoita tiedosto** suomeksi ja englanniksi CLAUDE.md:n mukaan.
   - `oma_huomio` tyhjäksi.
   - `liittyvat`: vain kirjaston olemassa olevia kirjoja, jos yhteys on selvä.
6. **Laadun tarkistus** CLAUDE.md:n kuudella kysymyksellä. Korjaa, mitä löytyy.
7. **Aja `npm run build`.** Korjaa virheet. Kirjaa varoitukset raporttia varten.
8. **Commit ja push:** `git add` kirjan tiedosto → `git commit -m "content: add <title>"` → `git push`.

## Lopuksi

Kun kaikki kirjat on käsitelty:

1. Hae ajon tunniste: `gh run list --branch main --limit 1 --json databaseId --jq ".[0].databaseId"`. Aja sitten `gh run watch <tunniste> --exit-status`.
2. Raportoi lyhyesti, enintään 3 riviä per kirja:
   - otsikko ja varmuus
   - mahdolliset varoitukset tai poikkeamat
   - live-osoite: `https://library.raydar.fi/<slug>/`
