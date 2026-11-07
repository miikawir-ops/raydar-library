---
description: Tee tiivistelmät kaikista jono.md:n kirjoista ja tyhjennä käsitellyt jonosta.
---

Lue `jono.md`. Jokainen `- `-alkuinen rivi on yksi kirja (nimi ja mahdollisesti kirjoittaja).

## Käsittely

1. Käsittele kirjat järjestyksessä `/kirja`-komennon työjärjestyksellä: lue `.claude/commands/kirja.md` ja noudata CLAUDE.md:tä. Hae kansi Open Library Search API:sta WebFetchillä, ei curlilla. Jokaisesta kirjasta tehdään oma commit.
2. Kun kirja on lisätty, poista sen rivi `jono.md`:stä.
3. Kirja, jota ei voitu käsitellä, jää jonoon. Tällaisia ovat:
   - matala varmuus
   - tunnistamaton teos
   - kirja on jo kirjastossa
   
   Lisää riville perään syy, esimerkiksi `(odottaa: matala varmuus)`. Älä pysähdy kysymään kesken, vaan kerää kysymykset loppuraporttiin.
4. Lopuksi commit `chore: update reading queue` ja push.

## Raportti

1. Hae ajon tunniste: `gh run list --branch main --limit 1 --json databaseId --jq ".[0].databaseId"`. Aja sitten `gh run watch <tunniste> --exit-status`.
2. Raportoi lyhyesti:
   - lisätyt kirjat ja niiden live-osoitteet
   - jonoon jääneet kirjat syineen
   - kysymykset, joihin tarvitset vastauksen
