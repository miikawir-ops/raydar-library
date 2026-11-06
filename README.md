# RayDar Library

Kaksikielinen (FI/EN) tietokirjatiivistelmien kirjasto osoitteessa https://library.raydar.fi. Osa RayDar-sivustoperhettä.

## Kehitys

```powershell
npm ci
npm run dev       # kehityspalvelin (haku toimii vain buildatusta sivusta)
npm run build     # sisällön tarkistus, Astro-build ja Pagefind-hakuindeksi
npm run preview   # buildatun sivun esikatselu
```

## Kirjan lisäys

Claude Codessa `/kirja Kirjan nimi` tai `/kirja-jono`, joka käsittelee `jono.md`:n. Säännöt ovat tiedostossa `CLAUDE.md`.

## Julkaisu

Push `main`-haaraan julkaisee sivun GitHub Actionsilla GitHub Pagesiin.

## Oikeudet

All rights reserved. Repossa ei ole avointa lisenssiä.
