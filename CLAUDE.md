# RayDar Library — CLAUDE.md

Lue tämä jokaisen istunnon alussa. Nämä säännöt ohittavat oletuskäyttäytymisen.

Kaksikielinen (FI/EN) tietokirjatiivistelmien kirjasto. Osa RayDar-sivustoperhettä.

**Tavoite:** tiivistelmä välittää kirjan sanoman sellaisena kuin se kirjassa on, niin selvästi ja kattavasti, ettei koko kirjaa tarvitse lukea.

**Julkisesti tiivistelmät esitetään johdatuksina,** jotka kunnioittavat kirjoittajaa ja suosittelevat koko kirjaa. Sivu ei koskaan esitä tiivistelmää kirjan korvikkeena: etusivun hero-teksti, kirjasivun rivi `ydin`-laatikon alla ja "Lue koko kirja" -osio kertovat tämän lukijalle.

**Tämä ei ole kirja-arvostelu.** Tehtävä on opettaa kirjan sisältö, ei arvioida sitä.

**Onnistumisen mittari:** luettuaan tiivistelmän lukija osaa kertoa omin sanoin

1. mistä kirja kertoo
2. mikä on sen ydinsanoma
3. mitkä ovat sen keskeiset viestit ja millä kirja niitä perustelee
4. kuka kirjoittaja on (tausta lyhyesti).

**Sanoman välittäminen on tärkeämpää kuin tiiviys.** Rakenne on kerroksellinen: ydin näkyy heti, ja syvempi sisältö on alempana.

Tämä on julkinen sivu. Virhe tiivistelmässä on väärää tietoa sivulla, jota ihmiset lukevat. Toimi sen mukaisesti.

## Periaatteet

- **Rehellisyys ennen mielistelyä.** Jos idea tai pyyntö on huono, sano se ja perustele.
- **Ensin selvitys, sitten suunnitelma, sitten koodi.** Älä yhdistä vaiheita.
- **Yksinkertaisuus.** Lisää monimutkaisuutta vasta, kun tarve on osoitettu, ei ennakoiden.
- **Kyseenalaista suunta.** Jos tavoitteeseen pääsee nopeammin tai varmemmin toista kautta, sano se ennen toteutusta.
- **Korjaa myös tämä tiedosto.** Kun väärä oletus korjataan, päivitä CLAUDE.md eikä pelkkää koodia, ettei sama virhe toistu.
- **Kerro parannusehdotukset, mutta älä toteuta niitä kysymättä.** Merkitse kiireellisyys:
  - **must-fix-now:** virheellinen sisältö tai tietoturva
  - **real-but-not-urgent:** todellinen mutta ei kiireellinen
  - **minor:** pieni tai kosmeettinen
- **Ristiriidat.** Jos kaksi sääntöä on ristiriidassa, kysy kumpi voittaa.

## Kieli

- **Kommunikointi Rayn kanssa** tapahtuu sillä kielellä, jolla hän kirjoittaa.
- **Koodi, kommentit, nimet ja commit-viestit** kirjoitetaan englanniksi, kuten muissa RayDar-repoissa.
- **Tiivistelmät** kirjoitetaan sekä suomeksi että englanniksi (ks. alla).

## Projekti lyhyesti

- **Osoite:** https://library.raydar.fi (GitHub Pages, repo `miikawir-ops/raydar-library`, julkinen, ei lisenssiä, all rights reserved README:ssä)
- **Stack:** Astro (staattinen), Astro content collections + Zod-skeema, Pagefind-haku
- **Julkaisu:** push `main`-haaraan → GitHub Actions → GitHub Pages (Pages source: "GitHub Actions")
- **Kehitysympäristö:** Windows, PowerShell, VS Code. Anna komennot PowerShell-muodossa.
- **RayDar-perhe:** `miikawir-ops/AI_valuechain` (raydar.fi) on perheen kanoninen toteutus. Visuaalinen kieli kopioidaan sieltä tänne, ei toisin päin. Muut RayDar-repot ovat tälle projektille **read-only**.
- **Linkit sisarsivuille** tehdään custom-domaineilla (raydar.fi, datacenter.raydar.fi, vice.raydar.fi), ei github.io-osoitteilla.

## Rakenne

```
src/content/books/*.md      # yksi kirja = yksi tiedosto, kaikki sisältö frontmatterissa
src/content.config.ts       # Zod-skeema (rakenteen totuuden lähde)
src/data/tags.ts            # sallitut tagit, FI/EN-nimet ja tagin väri (hue)
src/styles/tokens.css       # RayDar-designtokenit (värit, fontit, välit)
src/site.config.ts          # mm. indexable: false/true
tools/check-books.mjs       # sisällön tarkistus, ajetaan ennen buildia
tools/toccheck.mjs          # sisällysluettelon aktiivisen kohdan tarkistus (npm run check:toc)
public/hero.webp            # etusivun hero-kuva (Ray toimittaa)
public/edge.webp            # reunafiguuri, kirjahylly 338 × 1024 (Ray toimittaa)
public/fonts/               # itse hostattu Cormorant Garamond Italic 500 (Latin-subset woff2) ja sen OFL-lisenssi
public/CNAME                # library.raydar.fi
jono.md                     # lukujono: kirjat, joista halutaan tiivistelmä
.claude/commands/kirja.md   # /kirja: uusi kirja (tai useampi ;-erotettuna)
.claude/commands/kirja-jono.md  # /kirja-jono: käsittelee jono.md:n
.claude/settings.json       # sallitut komennot, jotta lisäys sujuu ilman kyselyitä
```

## Uuden kirjan lisäys: nopea polku

Lisäyksen pitää olla Raylle yhden rivin työ. Claude hoitaa kaiken muun loppuun asti.

**Komennot:**

- `/kirja Thinking, Fast and Slow`: yksi kirja
- `/kirja Kirja A; Kirja B; Kirja C`: useampi kerralla, jokaisesta oma commit
- `/kirja-jono`: käsittelee kaikki `jono.md`:n kirjat. Rivejä voi lisätä milloin tahansa, myös puhelimella GitHubin web-editorissa.

**Toimintatapa:**

- **Ei välikysymyksiä.** Kysy vain, kun kirjaa ei tunnisteta, varmuus on `matala` tai kirja on jo kirjastossa. Muuten etene julkaisuun asti.
- **Lyhyt loppuraportti:** enintään 3 riviä per kirja (otsikko, varmuus, varoitukset, live-osoite). Ei selostusta tehdyistä vaiheista.
- **Ei kyselyitä rutiinikomennoista.** `.claude/settings.json` sallii verkkohaut, buildin, git add/commit/push ja `gh run watch`. Force-push on estetty. Älä laajenna sallittuja komentoja kysymättä.

## Kirjatiedosto

**Tiedostonimi:** `sukunimi-kirjan-nimi.md`. Pienet kirjaimet, vain a–z, 0–9 ja `-`. Muunnokset: ä→a, ö→o, å→a. Esimerkki: `kahneman-thinking-fast-and-slow.md`.

**Frontmatter** (skeema `src/content.config.ts` on sitova):

- Pitkät tekstit kirjoitetaan YAML-lohkona (`|`).
- Tekstikentissä saa käyttää kevyttä Markdownia (kappaleet, **lihavointi**, listat), ja sivu renderöi sen.

```yaml
title: "Thinking, Fast and Slow"      # alkuperäinen nimi
title_fi: "Ajattelu, nopeasti ja hitaasti"  # vain jos suomennos on olemassa
author: "Daniel Kahneman"
year: 2011                            # alkuperäinen julkaisuvuosi
isbn: "9780374533557"                 # valinnainen
cover_id: 12345678                    # valinnainen, Open Libraryn cover_i
olid: "OL...M"                        # valinnainen, Open Libraryn editio-ID
cover_url: ""                         # valinnainen, Rayn käsin antama ohitus
tags: [psykologia, paatoksenteko]     # 1–3 kpl, vain src/data/tags.ts:n listalta
added: 2026-11-06
updated: 2026-11-06                   # valinnainen, viimeisin sisältömuutos
varmuus: korkea                       # korkea | kohtalainen | matala
lahteet:                              # 2–15 kpl, vain tässä työssä oikeasti avatut lähteet
  - nimi: ""
    url: ""
liittyvat: []                         # 0–4 kirjaston olemassa olevan kirjan slugia
fi:
  ydin: ""
  yleiskuva: |
    ...
  ideat:
    - otsikko: ""
      selitys: |
        ...
  kasitteet:                          # valinnainen
    - termi: ""
      selitys: ""
  kirjoittaja: ""
  suositukset: []                     # valinnainen, kirjan omat ohjeet
  huomio: []                          # valinnainen, 0–2 kpl
en:
  # sama rakenne kuin fi
oma_huomio: ""
```

## Tiivistelmän kirjoitussäännöt

### Pituus: sisältö ratkaisee

- **Pituus määräytyy kirjan sisällön mukaan, ei tavoitesanamäärän.** Rikas kirja saa pitkän tiivistelmän, ja suppea kirja lyhyemmän.
- **Alla olevat määrät ovat ohjeellisia.** Niistä saa poiketa, kun sanoma sitä vaatii.
- **Lyhentäminen ei ole tavoite.** Jos olennainen idea, perustelu tai esimerkki jäisi pois tiiviyden takia, se kirjoitetaan mukaan.
- **Täytettä ei kirjoiteta.** Ei yleisiä lauseita, toistoa eikä johdantoja, jotka eivät kerro mitään kirjasta.
- **Liian lyhyt korkean varmuuden tiivistelmä.** Jos varmuus on `korkea` ja tiivistelmä jää alle noin 60 %:iin ohjeellisesta laajuudesta tai yli puolet ideoiden selityksistä jää alle 80 sanan, hae lisää lähteitä ennen tallennusta:
  - laatumedian arviot (Guardian, NYT, FT, Economist, LRB)
  - kirjoittajan luennot, TED-puheet ja haastattelut
  - tieteelliset arviot

  Jos lähde ei aukea, kokeile toista lähdettä samasta aiheesta. Raportoi, mitä yritettiin ja mikä aukesi.

### Osiot (per kieli, varmuus `korkea`, yhteensä tyypillisesti noin 1500–3000 sanaa)

| Kenttä | Sisältö | Ohjeellinen laajuus |
|---|---|---|
| `ydin` | Kirjan ydinsanoma niin, että sen ymmärtää ilman muuta tekstiä. Näkyy myös kortissa. | 1–3 lausetta |
| `yleiskuva` | Mistä kirja kertoo: mihin kysymykseen tai ongelmaan se vastaa, mikä on sen pääajatus, miten kirja rakentaa sen (aineisto, esimerkit, eteneminen) ja mihin johtopäätökseen se päätyy. Lukijan pitää tämän jälkeen ymmärtää kirjan kokonaisuus. | 250–500 sanaa |
| `ideat` | Kirjan keskeiset viestit. `otsikko` tiivistää viestin. `selitys` kertoo, mitä kirja tällä tarkoittaa, miten se sen perustelee tai havainnollistaa (kirjan omat keskeiset esimerkit, kun ne on varmennettu) ja miten viesti liittyy kokonaisuuteen. | 6–12 kpl, selitys 80–200 sanaa |
| `kasitteet` | Kirjan omat tai sille keskeiset käsitteet määritelmineen, kuten kirja ne määrittelee. Vain jos kirja todella esittelee niitä. `termi` kirjoitetaan perusmuodossa, jotta Pagefind löytää sen perusmuotoisella haulla. | 0–8 kpl, 1–3 lausetta |
| `kirjoittaja` | Kuka hän on, mikä on hänen alansa ja asemansa ja mistä hänet tunnetaan. | 50–100 sanaa |
| `suositukset` | Valinnainen. Kirjan omat ohjeet tai johtopäätökset lukijalle, jos kirja niitä antaa. Ei omia sovelluksia. | 0–6 kohtaa |
| `huomio` | Valinnainen. Vain jos jokin kirjan keskeinen väite on myöhemmin laajasti kumottu tai kiistetty niin, että sen oppiminen faktana johtaisi harhaan (esim. tutkimus, joka ei ole toistunut). Ei arvostelua, makuasioita eikä yleistä kritiikkiä. | 0–2 lyhyttä kohtaa |

### Varmuus ja laajuus

**Mitä pidempi tiivistelmä, sitä enemmän tilaa virheille.** Laajuus mitoitetaan sen mukaan, mitä kirjasta voidaan varmentaa.

| Taso | Milloin | Laajuus |
|---|---|---|
| `korkea` | Laajasti tunnettu kirja, ja pääsisältö löytyy useasta luotettavasta lähteestä. | Täysi laajuus. |
| `kohtalainen` | Pääväite tunnetaan, mutta yksityiskohdista ei ole varmuutta. | Noin puolet: yleiskuva ja 4–6 ideaa yleisellä tasolla, ei yksityiskohtaisia esimerkkejä eikä lukuja. |
| `matala` | Luotettavaa tietoa sisällöstä on vähän. | **Älä lisää kirjaa, vaan kysy Raylta ensin.** |

Jos kirjaa ei tunnisteta tai nimellä löytyy useita teoksia, kysy.

### Sisältö

- **Uskollinen kirjalle, ei arvioiva.**
  - Välitä sanoma niin kuin kirja sen esittää: kirjan näkökulmasta, sen omilla käsitteillä ja painotuksilla.
  - Ei arvioivia ilmauksia kirjasta ("vakuuttava", "heikko", "erinomainen").
  - Ei omia lisäyksiä tai tulkintoja, joita kirjassa ei ole.
- **Selitä, älä luettele.** Pelkkä "kirja käsittelee X:ää" ei kerro mitään. Kerro, mitä kirja X:stä sanoo ja miksi.
- **Ymmärrettävä ilman kirjaa.** Jokainen käsite selitetään, kun sitä käytetään ensimmäisen kerran.
- **Ideoittain, ei luvuittain.** Tiivistelmä järjestetään kirjan ideoiden mukaan. Kirjaa ei kerrota uudelleen luku luvulta eikä sen rakennetta peilata, koska se olisi tekijänoikeudellisesti riskialtista eikä palvele ymmärtämistä yhtä hyvin.
- **Omin sanoin, ei sitaatteja.** Ei lainausmerkeissä olevia lauseita kirjasta.
- **Ei keksittyä tietoa.**
  - Älä keksi lukuja, tutkimuksia, koetuloksia, lukujen nimiä, esimerkkejä tai tapauskertomuksia.
  - Esimerkin tai tutkimuksen saa mainita vain, jos se on varmennettu lähteestä.
  - Jos et ole varma yksityiskohdasta, jätä se pois ja kirjoita yleisemmin. Puuttuva tieto on parempi kuin keksitty.
- **Kirjan kehys selväksi kevyesti.** Kerro alussa kerran, että sisältö on kirjan esitys ("Kirjan mukaan…", "Kahneman esittää…"), ja esitä viestit sen jälkeen suoraan. Älä toista "kirjoittaja väittää" joka lauseessa.
- **Kirjoittajasta vain julkinen ammatillinen tieto.** Ei yksityiselämää.
- **`huomio` on poikkeus, ei osio, joka täytetään aina.** Useimmissa kirjoissa se jää tyhjäksi.
- **Kumottu väite vai kiistetty tulkinta.** Kun väite on kumottu (esim. tutkimus ei ole toistunut), `huomio` kertoo sen suoraan. Kun keskeinen selitys on tulkinta, jota tutkijat kiistävät, `huomio` kuvaa kritiikin neutraalisti: kuka kritisoi ja mistä. Esimerkki: "Pääselitys on saanut laajaa kritiikkiä historioitsijoilta ja antropologeilta, erityisesti maantieteellisen determinismin vuoksi." Ei arviota kirjasta eikä kehotuksia lukijalle.

### Lähteet

- **Tarkistettavat asiat:**
  - kirjoittaja, julkaisuvuosi, mahdollinen suomennos ja sen nimi
  - kirjoittajan ammatillinen tausta
  - kirjan pääväitteet
  - jokainen mainittu esimerkki tai tutkimus
- **Hyväksyttävät lähteet:**
  - kustantajien ja yliopistojen sivut sekä kirjastot
  - Wikipedia, myös käsite- ja tutkimuskohtaiset artikkelit (esim. planning fallacy, peak-end rule, reference class forecasting)
  - laatumedian arviot ja tieteelliset arviot
  - alkuperäiset tutkimusartikkelit ja niiden abstraktit
  - kirjoittajan oma sivusto, haastattelut, luennot ja puheet (esim. Nobel-luento)
- **Opiskelijaoppaat** (LitCharts, SparkNotes yms.) kelpaavat yksittäisen faktan tarkistukseen, mutta eivät `lahteet`-kentän päälähteiksi. Niiden lukujakoa ei seurata.
- **Tarkat luvut ja laskelmat** vaativat muun lähteen kuin opiskelijaoppaan. Jos luku varmentuu vain oppaasta, poista se ja kerro asia laadullisesti.
- **Kun keskeinen esimerkki ei varmennu ensimmäisestä lähteestä,** hae sille oma lähde ennen kuin jätät sen pois.
- **`lahteet`-kenttään** kirjataan vain lähteet, jotka tässä työssä oikeasti avattiin. URL:eja ei koskaan kirjoiteta muistista.
- **Jokaisella tekstissä mainitulla esimerkillä on vähintään yksi lähde `lahteet`-kentässä.** Jos raja (15) tulee vastaan, päällekkäiset lähteet karsitaan ennen kuin minkään esimerkin ainoa lähde jää pois.
- **Lähteet näytetään kirjasivulla.** Näin lukija ja Ray voivat tarkistaa sisällön.

### Kielet

- **FI ja EN sisältävät saman asian,** mutta kumpikin kirjoitetaan luontevasti omalla kielellään. Ei sanasta sanaan -käännöstä.
- **Suomi:** selkeää yleiskieltä ja vakiintuneita suomenkielisiä termejä. Englanninkielinen termi sulkeisiin, kun se auttaa tunnistamaan käsitteen.
- **Englanti:** selkeää kansainvälistä englantia.

### Laadun tarkistus ennen tallennusta

Lue valmis tiivistelmä vielä kerran läpi ja kysy jokaisen kohdan kohdalla:

1. Onko tämä varmennettu lähteestä vai muistinvarainen yksityiskohta? Jos muistinvarainen, poista se tai yleistä.
2. Ymmärtääkö lukija tämän ilman kirjaa?
3. Kertooko tämä kirjasta jotain, vai onko se täytettä?
4. Puuttuuko jokin viesti, josta kirja yleisesti tunnetaan?
5. Onko tämä kirjan sanomaa vai omaa arviota tai tulkintaa? Jos omaa, poista se.
6. Täyttyykö onnistumisen mittari: osaisiko lukija tämän perusteella kertoa, mistä kirja kertoo, mikä on sen ydinsanoma, mitkä ovat keskeiset viestit ja kuka kirjoittaja on?

### Onnistunut build ei tarkoita oikeaa tiivistelmää

- **Skeema ja `tools/check-books.mjs`** todistavat vain, että rakenne on oikein.
- **Ne eivät todista mitään sisällön paikkansapitävyydestä.** Nämä ovat kaksi eri väitettä, ja kumpikin tarvitsee näyttönsä.
- **Faktat tarkistetaan lähteistä, ei buildista.**

### Oma huomio

- `oma_huomio` on **vain Rayn** kenttä.
- Uudessa kirjassa se jätetään tyhjäksi.
- Olemassa olevassa kirjassa sitä ei koskaan muuteta eikä ylikirjoiteta.

## Tagit

- Vain `src/data/tags.ts`:n listalta, 1–3 per kirja.
- Uutta tagia ei lisätä omin päin: ehdota sitä Raylle.
- Jokaisella tagilla on väri (`hue` `tags.ts`:ssä) hero-paletista. Uudelle tagille valitaan väri samalla logiikalla:
  - messinki: raha ja työ
  - viini: ihmiset ajassa
  - smaragdi: mieli ja elämä
  - kuunsininen: järki ja koneet
- Aloituslista (id → FI / EN / väri):

| id | FI | EN | väri |
|---|---|---|---|
| `talous` | Talous | Economics | messinki |
| `sijoittaminen` | Sijoittaminen | Investing | messinki |
| `liiketoiminta` | Liiketoiminta | Business | messinki |
| `johtaminen` | Johtaminen | Leadership | viini |
| `psykologia` | Psykologia | Psychology | smaragdi |
| `paatoksenteko` | Päätöksenteko | Decision-making | kuunsininen |
| `teknologia` | Teknologia | Technology | kuunsininen |
| `tekoaly` | Tekoäly | AI | kuunsininen |
| `tiede` | Tiede | Science | kuunsininen |
| `historia` | Historia | History | viini |
| `yhteiskunta` | Yhteiskunta | Society | viini |
| `filosofia` | Filosofia | Philosophy | smaragdi |
| `terveys` | Terveys | Health | smaragdi |
| `tuottavuus` | Tuottavuus | Productivity | messinki |

## Kansikuvat

1. **Järjestys:** `cover_url` → `https://covers.openlibrary.org/b/id/{cover_id}-M.jpg` (kirjasivulla `-L`) → typografinen varakansi.
2. **Kansi-ID:n haku:** `/kirja`-komento hakee `cover_id`:n ja `olid`:n kerran Open Library Search API:sta (`https://openlibrary.org/search.json?title=...&author=...&limit=5`, kentät `cover_i` ja `cover_edition_key`).
3. **Jos haku epäonnistuu tai osuma on epävarma, kentät jätetään pois.** Älä arvaa ID:tä. Epäonnistunut haku tarkoittaa puuttuvaa arvoa, ja varakansi hoitaa näytön.
4. **Ei ISBN-pohjaisia kansi-URL:eja sivulla,** koska niillä on rate limit.
5. **Hotlinkkaus, ei latausta:** kansikuvia ei ladata eikä committata repoon.
6. **Kirjoittajakuvia ei käytetä.**
7. **Kuvan merkintä:**
   - `loading="lazy"`
   - kiinteä kuvasuhde `aspect-ratio: 2 / 3`, jotta asettelu ei hypi
   - `onerror` vaihtaa varakanteen
   - `onload` vaihtaa varakanteen, jos `naturalWidth` on alle 2: Open Library palauttaa tuntemattomasta ID:stä `200`-vastauksen ja 1×1-GIF:n, joten `onerror` ei yksin riitä
   - `alt` = "Kirjan {title} kansi" / "Cover of {title}"
8. **Lähdeviitteet:** kirjasivulla linkki teoksen Open Library -sivulle (jos `olid` on tiedossa) ja alatunnisteessa linkki "Covers: Open Library".
9. **Varakansi:** värit johdetaan ensimmäisen tagin väristä (`[data-cover-tag]` `tokens.css`:ssä seuraa `tags.ts`:n huea: tummat sävyt kanteen, text-sävy viivaan ja kirjoittajaan), ja otsikko ja kirjoittaja ladotaan typografisesti RayDar-tyyliin. Sen pitää näyttää tarkoitukselliselta, ei virhetilalta.

## Ulkoasu ja visuaalinen laatu

### Linja

- **Tunnistettavasti RayDar-perhettä:** "Dark Intelligence" -ilme, tumma navy-gradientti ja samat fontit ja korostusvärit kuin raydar.fi:ssä.
- **Tumma kehys, paperinen lukupalsta.**
  - Kehys on tumma kuten perheen muilla sivuilla: hero, etusivu, navigaatio, sisällysluettelo ja reunat.
  - Kirjasivun lukupalsta on lämmin kermanvaalea paperi tummalla lämpimällä tekstillä, kuin kirjan sivu lampun valossa.
  - Valittu marraskuussa 2026 kahden variantin vertailusta. Hylätty vaihtoehto oli tumma, läpikuultava lukupaneeli.
  - Vaaleaa teemaa ei muuten ole: paperi on vain lukupalsta.
- **Periaate:** hyvin ammattimainen mutta ei tylsä.
- **Tunnelma:** laadukas digitaalinen kirjasto, jossa kansikuvat ovat näyttämöllä ja teksti on helppo lukea pitkäänkin.
- **Ei geneeristä template-ilmettä:**
  - ei oletus-Bootstrapia tai Tailwind-demon näköisyyttä
  - ei emojeja käyttöliittymässä
  - efektit tukevat tunnelmaa ja rakennetta eivätkä koskaan häiritse lukemista: ei efektejä leipätekstin takana
- **Konsepti "yökirjasto jatkuu":** hero-kuvan valonlähteet (lampun messinki, ikkunan kuunvalo, tähdet) jatkuvat koko sivun läpi hienovaraisena ympäristövalona. Värit vain hero-kuvan paletista: navy, kuunsininen ja messinki sekä toissijaisina syvä smaragdi (huopa ja muratti) ja viininpunainen nahka (nojatuoli ja kirjanselät). Ei violetteja tai neon-läikkiä, ei lasiefektiä joka paikassa eikä gradienttitekstiä leipätekstissä.
- **Paletti** (`tokens.css`): jokaisella toissijaisella värillä on kolme sävyä:
  - `--emerald`/`--wine` viivoihin ja sävytyksiin
  - `-text`-sävy tekstiin tummalla pinnalla
  - `-ink`-sävy tekstiin paperilla

  Smaragdi on otettu huovasta (noin `#17272c`) ja viini nojatuolin nahasta (noin `#5f1c07`). Viiniä on siirretty kohti viininpunaista, jottei se sekoitu messinkiin. Kaikki text- ja ink-sävyt on mitattu vähintään 4,5:1 omaa pintaansa vasten.
- **Tagin väri** (`[data-hue]`, kirjan ensimmäinen tagi) näkyy seuraavissa:
  - tagichipit, joissa jokainen tagi on omalla värillään
  - korttien yläreunan viiva
  - kirjasivun otsikkoalueen taustasävytys, jotta vaaleatkin kannet saavat värin
  - keskeisten viestien numerot
  - käsitteiden termit
  - osio-otsikoiden lyhyt alaviiva
- **Pintatasot** (`tokens.css`): `--surface-0` tausta, `--surface-1` pinta (kortit, kontrollit, mobiilin sisällysluettelo) ja `--surface-2` korotettu (keskeisten viestien kortit, `ydin`, tilalaatikot). Kaikki ovat syvää, hieman kylläistä navya, eivät harmaata eivätkä lähes mustaa.
- **Lukupalsta** (`.book-text`, tokens `--paper`, `--paper-2`, `--paper-line`, `--paper-grain`, `--ink`, `--ink-strong`, `--ink-muted`):
  - Lämmin paperi, jossa on hienovarainen rae ja ylhäältä tuleva valo, sekä pehmeä varjo kuin sivulla lampun valossa.
  - Teksti `--ink`, otsikot `--ink-strong`, numerot, termit ja korostukset kirjan värin ink-sävyllä, linkit `--moon-ink` ja messinki `--brass-ink`.
  - Kortit paperilla (ideat, käsitteet, oma huomio) ovat paperia vaaleampia (valkoinen 40 %), ja niissä on ohut ruskea reunus.
  - **Mobiilissa** paperi on 10 px:n päässä näytön reunasta pyöristetyin kulmin, jotta se näyttää sivulta eikä täytä näyttöä reunasta reunaan.
  - **Uusi elementti lukupalstaan** tarvitsee paperiversion: tumman pinnan valkoinen teksti ei kelpaa paperilla. Mittaa kontrasti, koska sisäkkäiset otsikot jäivät kerran valkoisiksi (1,32:1).
- **Ympäristövalo** säädetään yhdestä muuttujasta `--ambience` (0–1, oletus 0,7). Kaikki valoefektit skaalautuvat sen mukaan. Kerrokset:
  - **valolammikot:** yksi kiinteä taustakerros (`position: fixed`, `pointer-events: none`), jossa on neljä lammikkoa: messinki vasemmalla ylhäällä ja oikealla alhaalla, kuunsininen oikealla ja vasemmalla alempana. Jokaisessa näkymässä näkyy siis aina vähintään yksi kumpaakin sivun pituudesta riippumatta. Lammikot ajelehtivat hitaasti (CSS) ja siirtyvät hieman vierityksen mukana (rAF, rajattu siniliike, vain `transform`), joten ne eivät koskaan poistu näkymästä.
  - **lampun valo:** lämmin messinkilammikko heti hero-alueen alla lampun kohdalla (`.lamp-spill`)
  - **tähtipöly ja tuikkivat tähdet** vain sisältösarakkeen ulkopuolisissa reunoissa (maski). Yksikin kirkas tähtipikseli pienen tekstin alla rikkoo sen kontrastin, ja kapeilla näytöillä tähtiä ei näy lainkaan.
  - grain-tekstuuri
  - reunoilla näkyvä hyvin pieni sumea hero-kuva (`public/hero-blur.webp`, 64 px, CSS-blur ei käytössä)
  - **kursorilyhty:** pehmeä lämmin valo seuraa hiirtä viiveellä, vain etusivulla ja vain `pointer: fine`
  - **reunafiguurit:** `public/edge.webp` vasemmassa reunassa ja peilikuvana (`scaleX(-1)`) oikeassa.
    - **Rajaus:** näkyvissä on kaiverrettu pilari ja sen seinälamppu, ei hyllyjä.
      - Kuvan koordinaatit (338 × 1024): hyllyt x 0–135, pilari x 136–232, taivas x 232–338, lamppu (189, 645), sumu y > 900.
      - Lamppu on hieman keskikorkeuden alapuolella, ja alareunan sumu haipuu.
      - Kapealla marginaalilla pilarin ulkoreunasta rajataan, ei sisäreunasta. Sisäreunan häivytys alkaa vasta 86 %:n kohdalla, pilarin jälkeen, eikä koskaan peitä pilaria.
      - Kuvaa kirkastetaan suodattimella `brightness(1.32) saturate(1.15)`, koska lähdekuva on tumma.
      - Kuvan kaari on hyllyjen yläpuolella, joten hyllyttömässä rajauksessa siitä näkyy vain oikea pää ja muratti.
      - Jos kuva vaihtuu, mittaa koordinaatit uudelleen.
    - **Lampun valo:** voimakas ja melko laaja lämmin messinkinen radiaalihehku liekin kohdalla ja hyvin hienovarainen värähtely `--motion`-muuttujan alla.
      - Hehku pysyy figuurin sisällä: se on figuurin levyinen ja sen sisäreuna haipuu kuten kuva (oikealla peilattuna). Valo ei koskaan ulotu sisältösarakkeeseen.
      - Liekin kohta on tarkistettu 1440, 1920 ja 2560 px:llä. Kirjasivulla värähtely pysähtyy otsikkoalueen jälkeen (`amb-still`), ja reduced-motion poistaa sen.
    - Kiinteä taustakerros (`position: fixed`, `pointer-events: none`), korkeus 100vh + 80 px parallaksin liikevaraa varten.
    - Näkyy vain, kun näkymä on vähintään 1400 px. Silloin sisältösarakkeen (`--page-max` 1240 px) ulkopuolelle jää vähintään 80 px. Kapeammalla figuuri olisi vain kapea suikale.
    - Leveys on enintään sisältösarakkeen ulkopuolinen tila, ja kuvan sisäreuna haipuu läpinäkyväksi (mask). Figuuri ei siis koskaan ulotu sisältösarakkeen tai tekstin alle.
    - **Peittävyys** on `--amb-figures` = `min(1, ambience × 1,4)`, eli oletuksella 0,98. Figuurit näkyvät selvästi, eivät haaleina.
    - Etusivulla figuurit haipuvat hero-alueella (`--hero-cut`, skripti), jotta hero-kuva ei kilpaile niiden kanssa. Tämä seuraa sisällön paikkaa eikä ole liikettä, joten se toimii myös reduced-motionilla.
    - Parallaksi on enintään 60 px × `--motion` koko sivun matkalla, ja reduced-motion poistaa sen.
  
  Kaikki ovat sisällön alla, ja lukupalstan umpinainen pinta peittää ne.
- **Liike** säädetään muuttujasta `--motion` (0–1, oletus 0,6; 0 poistaa liikkeen). Liike on sallittu, kun se on:
  - **hidasta:** 20–40 s syklit (lammikot ajelehtivat ja sykkivät, osa tähdistä tuikkii, lampun valossa leijuu muutama pölyhiukkanen) sekä hero-kuvan parallaksi vierittäessä
  - **taustakerroksessa,** ei koskaan leipätekstin takana
  - **vain `transform` ja `opacity`**
  - **pysäytetty näkymän ulkopuolella:** sivun mukana vierivät efektit (lampun valo, pölyhiukkaset, kansihehku) pyörivät vain näkyvissä ollessaan (IntersectionObserver ja `in-view`)
  - **kirjasivulla vain otsikkoalueella:** kun otsikkoalue on vieritetty pois, lammikot pysähtyvät paikoilleen (`amb-still`), ja lukupalsta pysyy täysin rauhallisena. Tähdet eivät tuiki kirjasivulla.
  - **kokonaan pois, kun `prefers-reduced-motion`:** ei animaatioita, lyhtyä eikä parallaksia
- **Kansihehku:** kortissa ja kirjasivun otsikkoalueella kannen takana on sama kansikuva sumeana, ja ilman kantta hehku tulee tagin väristä.
  - **Levossa pieni ja tiukka** (`--amb-cover-glow` = ambience × 0,25), jotta vaaleat kannet eivät tee korteista utuisia.
  - **Täysi hehku** (× 3,6) vain korttien hover- ja focus-tilassa.
  - **Varjo:** kannen alla on terävä, lyhyt varjo (`--shadow-cover`), joten kansi irtoaa taustasta selvästi ilman leveää hehkua.
  - **Kirjasivulla** hehku on kannen ympärillä noin puolet aiemmasta säteestä ja haipuu ennen otsikkosaraketta, jotta tekstin kontrasti säilyy.
  - Hehkussa käytetään M-kokoista kantta, jottei hidas L-kansi nouse kirjasivun LCP-elementiksi.

### Typografia ja luettavuus

- **Pitkä teksti on sivun pääasia,** ja luettavuus menee koristeiden edelle.
- **Leipäteksti:** 17–19 px, riviväli noin 1,6 ja lukuleveys max noin 70 merkkiä.
- **Selkeä otsikkohierarkia,** ja osioiden välissä on riittävästi tilaa.
- **Ideat erottuvat toisistaan visuaalisesti,** esimerkiksi numeroituina kortteina tai osioina, joissa otsikko on korostettu.
- **Kontrasti** on vähintään WCAG AA myös hero-kuvan päällä. Kuvan päälle tulee tumma overlay-gradientti.
- **Kieliattribuutit:** jokaisessa tekstilohkossa on oikea `lang`-attribuutti (`fi` / `en`), jotta tavutus ja ruudunlukijat toimivat.

### Etusivu

- **Hero-alue:**
  - `public/hero.webp` täysleveänä, työpöydällä (≥ 720 px) vähintään 67vh ja mobiilissa noin 45 % näytön korkeudesta.
  - **Rakenne** vasemmassa reunassa, jossa kuvassa on rauhallinen alue:
    1. sivun nimi (H1)
    2. yksi kuvauskappale
    3. tunnuslause
    4. hakukenttä

    Erillistä alaotsikkoa ei ole.
  - **Tunnuslause** "Make everything as simple as possible, but not simpler." (`.hero-motto`) kuvauksen jälkeen ennen hakua:
    - Se on lopetus, ei alaotsikko, joten se ei ole otsikon alla.
    - Sama molemmilla kielillä (`lang="en"`), messinkinä (`--brass`).
    - Kuvauksen messinkisestä suosituksesta sen erottaa ohut lyhyt messinkiviiva (44 px) ja väli.
    - Hillitty motto: fontti Cormorant Garamond Italic, paino 500 (`--font-motto`), itse hostattuna `public/fonts/`-kansiosta.
      - Latin-subset woff2, noin 24 kt, `font-display: swap`, preload vain etusivulla.
      - Ei Google Fonts -linkkiä eikä npm-pakettia, ja OFL-lisenssi on fontin vieressä.
      - Paino 500, koska Cormorantin ohut 400 on näin pienenä vaikealukuinen.
      - Varafontti on kursiivi serif.
      - Aiemmat kokeilut olivat Pinyon Script ja Petit Formal Script. Kaunokirjoitus dominoi liikaa.
    - Koko on 21 px mobiilissa ja 24 px leveämmillä näytöillä. Lause on 1–2 rivillä kaikilla leveyksillä.
    - **Kontrasti:**
      - Mobiilissa 21 px on tavallista tekstiä, joten vaatimus on 4,5:1. Mitattu 4,73:1, eli varaa on vähän.
      - Työpöydällä 24 px on suurta tekstiä, joten vaatimus on 3:1. Mitattu 7,9–8,6:1.
      - Mittaa uudelleen, jos koko, peittokerros tai hero-kuva muuttuu.
  - Kuvaus on yksi kappale luonnonvalkoisena (`--paper`): "Tietokirjojen ydinsanomat suomeksi ja englanniksi – johdatuksia, jotka eivät korvaa kirjaa. Lämmin suositus: lue koko kirja!" / "The core messages of non-fiction books in Finnish and English – introductions, not replacements. A warm recommendation: read the whole book!"
    - Lopun suositus (`.hero-reco`) on messinkinä.
    - Mobiilin tasainen peittokerros on otsikon alapuolella 0,84, jotta messinkinen suositus säilyttää AA-kontrastin lampun valon päällä. Mitattu 4,85:1, joten varaa on vähän: mittaa uudelleen, jos peittokerros tai hero-kuva muuttuu.
  - Pölyhiukkaset ovat laatikossa, jolla on hero-kuvan oma cover-geometria, joten niiden prosenttisijainnit ovat kuvan koordinaatteja ja ne pysyvät lampun valossa kaikilla hero-koon arvoilla.
- **Kokoelman väliotsikko** ruudukon yläpuolella: messinkinen yläotsikko "Kokoelma" / "Collection" ja kirjamäärä. Tulosmäärä näytetään erikseen vain, kun haku tai suodatin on päällä.
- **Korttiruudukko,** jossa jokaisella kortilla on kansi, otsikko, kirjoittaja, vuosi, tagit ja `ydin`.
- **Hillitty hover-efekti:** pieni nosto ja korostusväri, ei pomppimista.
- **Toiminnot:** haku (Pagefind), tagisuodatus, järjestys (uusimmat / kirjoittaja / julkaisuvuosi) ja "satunnainen kirja".
- **Tyhjä tila ja "ei tuloksia":** suunniteltu tila, ei tyhjä ruutu.

### Kirjasivu

- **Järjestys:**
  0. paluupainike "← Kokoelma" / "← Collection" sisällön vasemmassa yläkulmassa ennen kantta
  1. kansi ja perustiedot
  2. `ydin` korostettuna ja sen alla pieni rivi, joka linkittää "Lue koko kirja" -osioon: "Johdatus teokseen, ei korvaa kirjaa. Lue koko kirja ↓" / "An introduction, not a replacement. Read the full book ↓"
  3. sisällysluettelo ankkurilinkein
  4. yleiskuva, keskeiset viestit (ideat), käsitteet, kirjoittaja, kirjan suositukset (jos on), huomio (jos on, pienellä)
  5. oma huomio (jos täytetty)
  6. liittyvät kirjat
  7. Lue koko kirja (ks. alla)
  8. lähteet
  9. paluupainike "← Takaisin kokoelmaan" / "← Back to the collection" paperin alapuolella
- **Paluu kokoelmaan:**
  - Molemmat paluupainikkeet ovat tummalla kehyksellä, eivät paperilla. Niissä on messinkinen ääriviiva, hover-tila ja vähintään 44 px korkeus.
  - Painikkeet ovat tavallisia linkkejä etusivulle, joten ne toimivat ilman JavaScriptiä.
  - Jos edellinen sivu oli saman sivuston etusivu, skripti käyttää `history.back()`:ia.
  - Etusivu tallentaa suodattimen, järjestyksen, haun ja vierityskohdan omaan historiamerkintäänsä (`history.replaceState`) ja palauttaa ne latautuessaan. Ne säilyvät siis myös, kun selain lataa sivun uudelleen eikä palauta sitä välimuistista (bfcache), ja selaimen omalla takaisin-painikkeella.
  - **Logo** (RayDar Library) on linkki etusivulle: hoverissa "Library" muuttuu messingiksi ja piste hehkuu.
- **"Lue koko kirja" / "Read the full book"** -osio (`#lue-koko-kirja`, myös sisällysluettelossa):
  - messinkiaksentti ja kansi pienenä
  - teksti: "Tämä tiivistelmä on johdatus teokseen. Kirjan varsinainen arvo on sen perusteluissa, esimerkeissä ja kirjoittajan omassa äänessä, joita tiivistelmä ei voi korvata. Suosittelemme lämpimästi lukemaan koko kirjan." / "This summary is an introduction. The real value of the book lies in its arguments, examples and the author's own voice, which no summary can replace. We warmly recommend reading the whole book."
  - kirjoittaja, alkuteos ja vuosi sekä suomennoksen nimi, jos on. Kirjoittajan nimeä ei taivuteta, vaan se on aina omana kenttänään.
  - linkki Finnaan: `https://www.finna.fi/Search/Results?lookfor=<nimi kirjoittaja>&type=AllFields`, jossa nimi on suomennoksen nimi tai alkuteos ilman kaksoispisteitä ja pilkkuja. Muoto tarkistettiin: se palauttaa jokaisen kirjaston kirjan ensimmäisenä tuloksena. Tarkista uuden kirjan Finna-haku, jos nimessä on muita erikoismerkkejä.
  - linkki Open Libraryyn (`olid`), jos se on tiedossa
  - ei kauppa- eikä affiliate-linkkejä
- **Sisältösarake 1 440–1 700 px:llä** on 1 120 px eikä 1 240 px (`--page-max`, `tokens.css`).
  - Kavennus on 60 px kummaltakin puolelta. Näin reunafiguureille jää todellinen marginaali, noin 150–210 px, ja koko pilari näkyy.
  - Korttiruudukko pidetään tällä välillä eksplisiittisesti neljässä sarakkeessa (`global.css`), ja kortit ovat noin 257 px leveitä.
  - Kirjasivun oma sarake on 1 100 px, joten lukupalsta (832 px) ei muutu. Lukupalsta ei saa kaventua alle 760 px:n.
  - 1 400–1 439 px:llä sarake on täysi, ja figuuri on vain noin 80 px:n kaistale.
- **Leveät näytöt** säilyttävät saman sommittelun kuin 1440 px. Sisältö on saman levyisenä keskellä (kirjasivu `max-width` 1100 px, muu sisältö `--page-max` 1240 px), ja ylimääräinen tila jää reunakuville.
- **Pitkillä sivuilla** sisällysluettelo on työpöydällä sivupalkissa ja pysyy näkyvissä vierittäessä. Mobiilissa se on avattava lista sivun alussa.
- **Merkinnät:** varmuustaso pienenä merkintänä, ja arvioitu lukuaika valitulla kielellä.
- **Lukuedistyminen** ohuena palkkina ylhäällä.

### Yleistä

- **Designtokenit vain `src/styles/tokens.css`:ssä.** Niitä ei muuteta kysymättä.
- **Korostusvärit:** sininen (`--accent`) on pääkorostus: linkit, alaotsikko ja muut korostukset. Messinki (`--brass`, hero-kuvan lampun sävy) on toissijainen. Sitä käytetään vain seuraavissa:
  - korttien hover- ja focus-tila
  - aktiivinen suodatinchip
  - sisällysluettelon aktiivinen kohta
  - `ydin`-laatikon kehys, sisäviiva ja kulmatähdet
  - osioiden välinen koristejakaja (ohut viiva ja pieni tähti)
  - käsitekorttien numerot
  - kokoelman yläotsikko "Kokoelma"
  - kirjasivun paluupainikkeet ja logon hover-tila
  - etusivun tunnuslause ja kuvauksen lopun suositus
  - "Lue koko kirja" -rivi `ydin`-laatikon alla sekä "Lue koko kirja" -osion yläreunus ja linkit
- **Tausta:** sivun tausta on syvä navy (`--surface-0`) ja ympäristövalo. Hero-kuva näkyy vain etusivun hero-alueella. Muualla siitä on vain pieni sumea versio reunoilla, ja lukupalsta on aina umpinainen paperi.
- **Liike vierittäessä:** kortit ja kirjasivun osiot saavat lyhyen fade-inin. Taustan hidas liike noudattaa yllä olevaa Liike-sääntöä, ja `prefers-reduced-motion` poistaa kaiken liikkeen.
- **Mobiili ensin:** 16 px reunat, ei vaakavieritystä, kosketuskohteet vähintään 44 px. Leveät taustaefektit (lampun valo, kansihehku) leikataan `main`-elementissä (`overflow-x: clip`). Pelkkä `body`-leikkaus ei riitä, koska se siirtyy näkymälle, joka raportoi silloin leveämmän sivun.
- **Kielivalinta FI/EN** koko sivulle. Valinta muistetaan localStoragessa, ja jokainen luku ja kirjoitus on try/catchissa. Oletuskieli on suomi.
- **Liike:** animaatiot ovat hillittyjä, ja `prefers-reduced-motion` kunnioitetaan.
- **Alatunnisteen tunnuslause** kaikilla sivuilla paitsi etusivulla, jossa sama lause on herossa: "Make everything as simple as possible, but not simpler." Samaa lausetta ei näytetä kahdesti samalla sivulla.
  - Vain englanniksi ja sama molemmilla kielillä (`lang="en"`), kursiivilla ja hillitysti.
  - Ilman attribuutiota tai linkkiä.
  - Erotettu pienellä messinkisellä tähtijakajalla (sama kuin osiojakajissa).
- **Alatunniste:** linkki raydar.fi:hin, "Covers: Open Library" ja maininta: "Tiivistelmät on tuotettu tekoälyn avulla ja voivat sisältää virheitä." / "Summaries are AI-generated and may contain errors."
- **Suorituskyky:** Lighthouse vähintään 90 kaikissa kategorioissa mobiilissa, ja hero-kuva alle 400 kt (WebP). SEO-tavoite 90 koskee vain tilaa `indexable: true`. Hero-kuvaa ei ladata laiskasti, koska se näkyy heti. Paikallinen Lighthouse-mittaus vaihtelee paljon koneen kuormasta riippuen (erityisesti TBT; katso `environment.benchmarkIndex`). Aja mobiilimittaus vähintään kolme kertaa ja vertaa samalla tavalla mitattuun mainiin (live-sivu) ennen kuin päättelet regression yhdestä ajosta.
- **Indeksointi:**
  - `src/site.config.ts` → `indexable: false` lisää vain noindex-metan. `robots.txt` sallii indeksoinnin, koska muuten hakukone ei näkisi noindexiä. Ray päättää, milloin asetus käännetään.
  - Kun `indexable: true`, noindex poistuu ja käytössä ovat lisäksi sitemap, meta description `ydin`-kentästä ja Open Graph -tagit.

### Visuaalinen hyväksyntä

- **Ulkoasu arvioidaan live-sivulta.** Ray ei tarkista kuvia etukäteen, eikä kuvakaappauksia tarvita.
- **Raportoi live-sivun tarkistus:** mitä tarkistettiin, millä leveyksillä (työpöytä 1440 px ja mobiili 390 px) ja mitä havaittiin.
- **Testisivut:** etusivu, pitkä kirjasivu ja kirja ilman kantta (varakansi).
- **Sisällysluettelo:** ulkoasumuutoksissa ajetaan `npm run check:toc` ennen pushia.
  - Aja ensin `npm run build` ja sitten `npm run preview` toisessa terminaalissa.
  - Tarkistus vierittää kirjasivuja alas, ylös ja hypäten (1440 ja 390 px) ja vertaa sisällysluettelon aktiivista kohtaa vierityskohtaan.
  - Se tarvitsee Playwrightin Chromiumin kerran koneelle: `npx playwright install chromium`.
  - Tarkistus ei kuulu julkaisuajoon.
- **Onnistunut build todistaa toimivuuden,** ei sitä, näyttääkö sivu Rayn mielestä oikealta. Siksi ulkoasumuutokset ovat omina committeinaan ja peruttavissa.

## Sisällön tarkistustyökalu

`tools/check-books.mjs` ajetaan automaattisesti ennen buildia (`prebuild`).

**Virhe (build kaatuu), kun:**

- FI tai EN puuttuu tai jokin pakollinen osio on tyhjä
- tagi ei ole sallittujen listalla
- `liittyvat` viittaa kirjaan, jota ei ole
- `lahteet`-kentässä on alle 2 tai yli 15 lähdettä
- tiedostonimi on väärää muotoa

**Varoitus (build jatkuu), kun:**

- osion laajuus poikkeaa selvästi ohjeellisesta
- tekstissä on lainausmerkkejä („ " " "), jotka voivat olla sitaatteja
- FI- ja EN-versioiden pituudet poikkeavat yli 40 %

Varoitukset raportoidaan Raylle. Niitä ei korjata automaattisesti, vaan ne arvioidaan.

## Hyväksyntä

- **Suoraan `main`-haaraan ilman etukäteishyväksyntää** (Rayn pyyntö on hyväksyntä):
  - kirjan lisäys `/kirja`-komennolla ja pyydetty muokkaus olemassa olevaan kirjaan
  - ulkoasu-, asettelu- ja käyttöliittymätekstimuutokset, ilman branchia
  - bugikorjaukset, joiden juurisyy on toistettu ja todennettu
  - dokumentaatio
- **Pakolliset automaattiset tarkistukset ennen pushia.** Jos jokin epäonnistuu, korjaa ennen pushia:
  - `npm run build` (sisältää check-books-tarkistuksen)
  - kontrastit vähintään WCAG AA kaikista muuttuneista teksteistä, myös hover-tiloista, mitattuna pikseleistä
  - `npm run check:toc` ulkoasumuutoksissa
- **Jokainen kokonaisuus omana committinaan,** jotta sen voi perua `git revert`illä. Älä niputa toisistaan riippumattomia muutoksia samaan committiin.
- **Raportissa kerrotaan live-sivun tarkistus.** Kuvakaappauksia ei tarvita.
- **Kysy edelleen ensin:**
  - skeemamuutokset
  - uudet riippuvuudet
  - arkkitehtuurimuutokset
  - sisällön poistaminen
  - asiat, jotka muuttaisivat sovittua toimintaa
- **Pysähdy ja kysy aina, kun:**
  - juurisyytä ei oikeasti ymmärretä
  - muutos koskisi enemmän kuin raportoitua ongelmaa

## Työnkulku

### Istunnon alussa

Tarkista ero originiin (`git status`, `git fetch`).

### Muokkaus

- Lue nykyinen tiedosto kokonaan ennen muokkausta. Älä koskaan muokkaa oletetun sisällön pohjalta.
- Muuta vain sitä, mitä pyydettiin. Usean tiedoston muutoksen jälkeen kerro tiedostoittain, mitä muutit ja miksi.
- Olemassa olevan kirjan muokkauksessa muutetaan vain pyydetyt kentät, ja `updated`-päiväys päivitetään.
- Älä poista kirjoja ilman Rayn pyyntöä.

### Ennen committia

1. Aja `npm run build` (sisältää check-books-tarkistuksen ja Pagefindin). Korjaa virheet, mutta älä kierrä skeemaa tai tarkistusta löysentämällä niitä.
2. Tarkista `.gitignore` (`node_modules`, `dist`, `.env`).

### Commit ja julkaisu

- **Commit-viestit** muodossa `type: what changed`. Esimerkit: `content: add Thinking, Fast and Slow`, `content: update <title>`, `feat: tag filter`, `fix: cover fallback`.
- **Commit-hashit, polut ja luvut** raportoidaan vain komentojen tulosteesta, ei koskaan muistista.
- **Historiaa ei kirjoiteta uudelleen** eikä force-pushata kysymättä.
- **Julkaisu ohitetaan, kun pushissa muuttuvat vain nämä:** `CLAUDE.md`, `tools/**`, `jono.md` tai `.claude/**` (`paths-ignore` workflowssa).
  - Huomaa, että myös `tools/check-books.mjs` (prebuild) kuuluu tähän: sen muutos tulee voimaan vasta seuraavassa julkaisussa.
  - Tällaisesta pushista ei ole ajoa, jota seurata.
  - Julkaisun voi käynnistää käsin (`workflow_dispatch`).
- **Seuraa deployta:** hae ajon tunniste `gh run list --commit <commit>` -komennolla pushatun commitin perusteella, aja `gh run watch <tunniste> --exit-status` ja kerro, menikö julkaisu läpi. Pelkkä `--limit 1` voi palauttaa edellisen commitin ajon, jos uusi ajo ei ole vielä rekisteröitynyt.

### Domain-käyttöönotto

- **Järjestys:** lisää domain ensin GitHubissa (Settings → Pages → Custom domain) ja tee DNS-muutos vasta sen jälkeen. GitHubin ohjeen mukaan Actions-julkaisussa `CNAME`-tiedosto ohitetaan, joten `public/CNAME` ei yksin ota domainia käyttöön.
- **DNS:** Zoner, CNAME `library` → `miikawir-ops.github.io`.
- **Testaa ennen käyttöönottoa vain kertakäyttöisiä polkuja** (esim. `/probe-123.html`), ei `/`:tä tai oikeita sivuja. GitHubin CDN välimuistittaa käyttöönottoa edeltävän 404:n tuntemattomaksi ajaksi.

## Valmis tarkoittaa

Paikallinen, pushattu ja julkaistu ovat kolme eri tilaa. Älä sano "valmis" ennen kuin kaikki nämä pätevät:

- [ ] Tiedosto noudattaa skeemaa, ja FI ja EN ovat molemmat täytetty.
- [ ] Laadun tarkistus on tehty: ei muistinvaraisia yksityiskohtia, ei sitaatteja, ei arvioivaa sävyä, ja onnistumisen mittari täyttyy.
- [ ] Faktat on tarkistettu lähteistä, lähteet on kirjattu, ja varmuus on asetettu rehellisesti.
- [ ] Kansi näkyy tai varakansi toimii.
- [ ] Build menee läpi, ja mahdolliset varoitukset on raportoitu.
- [ ] Muutos on pushattu (tarkistettu `git status`:lla, ei oletettu).
- [ ] Actions-ajo on vihreä.
- [ ] Muutos näkyy live-sivulla.
