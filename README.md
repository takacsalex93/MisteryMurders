# Rejtélyes gyilkosságok

Klasszikus, Agatha Christie modorában írt böngészős krimik. Járd be a helyszíneket, fejtsd meg a rejtvényeket, és nevezd meg a tettest.

**Játék:** https://takacsalex93.github.io/MisteryMurders/

## Ügyek

| # | Cím | Nehézség |
|---|-----|----------|
| 1 | Gyilkosság a Szegfű-villában | Könnyű |
| 2 | Halál az Arany Griffben | Közepes |
| 3 | Éjszakai gyors | Nehéz |
| 4 | Fagy a Hollós cukrászdában | Könnyű |
| 5 | Utolsó felvonás | Közepes |
| 6 | Köd a Hegyalján | Nehéz |

## Játékmenet

- **Szembesítés:** a gyanúsítottakat a jegyzetfüzet nyomaival kell szembesíteni. A talált ellentmondás feltárja a hazugságot, a téves szembesítés pontlevonással jár. Ártatlanok is hazudnak.
- **Bizonyítékkal alátámasztott vád:** minden állításhoz meg kell jelölni a döntő bizonyítékot. Három próbálkozás van, utána a tettes megszökik.
- **Elültetett nyomok:** minden ügyben van legalább egy félrevezető nyom.
- **Rang:** a végén pontszám és nyomozói rang a próbálkozások, a súgók és a téves szembesítések alapján.

## Felépítés

- `index.html` — az oldal váza, itt kell felvenni az új ügyeket
- `js/engine.js` — a játékmotor (nézetek, mentés, rejtvénytípusok)
- `css/style.css` — megjelenés, világos és sötét mód
- `js/art.js` — kóddal rajzolt art deco illusztrációk (tartalék, ha nincs képfájl)
- `js/audio.js` — kóddal szintetizált háttérhangok és effektek, hangfájlok nélkül
- `js/fx.js` — borító-animációk (eső, vihar, hó, por, köd)
- `images/` — az illusztrációk, az `images/manifest.js` sorolja fel őket
- `cases/*.js` — egy fájl = egy ügy (történet, nyomok, rejtvények, megoldás)

### Rejtvénytípusok

`code` számzár · `choice` összevetés · `assign` logikai beosztás · `order` időrend · `text` szabad válasz (pl. anagramma) · `caesar` eltolásos titkosírás · `keyword` kulcsszavas (Vigenère) titkosírás · `spot` hazugság keresése egy vallomásban

### Új ügy hozzáadása

1. Másold le valamelyik `cases/*.js` fájlt, és írd át a tartalmát.
2. Állítsd be a `difficulty` mezőt: `Könnyű`, `Közepes` vagy `Nehéz`, és ha kell, a `sound` (háttérhang) és `fx` (borító-animáció) mezőt.
3. Írd meg a `contradictions` listát (melyik nyom melyik vallomással ütközik) és a vádpontokhoz a `proof` bizonyítékokat.
4. Vedd fel a fájlt az `index.html`-be a többi ügy mellé.

Szerver és telepítés nem kell, a játékállás a böngészőben mentődik.
