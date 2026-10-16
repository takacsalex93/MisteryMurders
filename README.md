# Rejtélyes gyilkosságok

Klasszikus, Agatha Christie modorában írt böngészős krimik, magyarul és angolul (Mystery Murders). Járd be a helyszíneket, fejtsd meg a rejtvényeket, és nevezd meg a tettest.

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
| 7 | A fekete szegfű | Zárás (a hat ügy után nyílik meg) |

## Játékmenet

- **Rejtett nyomok:** a helyszínek leírásában kell rábukkanni a nyomokra. Vannak csalinyomok is, amelyek csak időt visznek el.
- **Összevetés és következtetés:** a nyomok csak tényeket közölnek. Két nyomot összevetve a játékosnak kell levonnia a következtetést, és a vádhoz főleg ezek kellenek bizonyítéknak. Az elhamarkodott összevetés pontot ér.
- **Téves vád következménnyel:** ha a játékos ártatlant nevez meg tettesként, azt letartóztatják, és az ügy saját befejezéssel elveszik.
- **Váratlan fordulatok:** nyomozás közben jelenetek szakítják meg a munkát (áramszünet, menekülési kísérlet, bizonyíték eltüntetése).
- **Mester mód:** nincs súgó, nincs ✦ jelölés és számláló, és a rejtvények sem árulják el, mennyire jár közel a játékos.
- **Ami rejtve maradt:** a befejezés megmutatja, kinek a titka maradt felderítetlen.
- **Szembesítés:** a gyanúsítottakat a jegyzetfüzet nyomaival kell szembesíteni. A talált ellentmondás feltárja a hazugságot, a téves szembesítés pontlevonással jár. Ártatlanok is hazudnak.
- **Bizonyítékkal alátámasztott vád:** minden állításhoz meg kell jelölni a döntő bizonyítékot. Három próbálkozás van, utána a tettes megszökik.
- **Elültetett nyomok:** minden ügyben van legalább egy félrevezető nyom.
- **Kihallgatás:** minden gyanúsítottnak feltehetők kérdések, újabb nyomokkal újabb kérdések nyílnak meg.
- **Leleplezés:** a sikeres vád után lépésről lépésre el kell mondani, mi történt, és minden ellenvetésre a megfelelő bizonyítékkal felelni.
- **Nyomozótábla, Hajnalig mód, eredménykártya:** parafatábla piros fonallal, időre játszott változat, megosztható eredménykép.
- **A titkos szál:** minden ügy végén egy fekete szegfűs cédula és egy bekarikázott betű. A hat betű a záró ügy kulcsa.
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
- `cases/extras.js` — kihallgatási kérdések és a leleplezés jelenetei ügyenként
- `cases/en/*.js` — az ügyek angol fordítása (azonosítók szerint ráolvad az eredetire)
- `js/i18n.js` — nyelvválasztás és a felület angol szótára

### Rejtvénytípusok

`code` számzár · `choice` összevetés · `assign` logikai beosztás · `order` időrend · `text` szabad válasz (pl. anagramma) · `caesar` eltolásos titkosírás · `keyword` kulcsszavas (Vigenère) titkosírás · `spot` hazugság keresése egy vallomásban

### Új ügy hozzáadása

1. Másold le valamelyik `cases/*.js` fájlt, és írd át a tartalmát.
2. Állítsd be a `difficulty` mezőt: `Könnyű`, `Közepes` vagy `Nehéz`, és ha kell, a `sound` (háttérhang) és `fx` (borító-animáció) mezőt.
3. Írd meg a `contradictions` listát (melyik nyom melyik vallomással ütközik), a `deductions` listát (melyik két nyomból milyen következtetés jön, három válaszlehetőséggel), és a vádpontokhoz a `proof` bizonyítékokat. A helyszínek `look` szövegében `[[szöveg|azonosító]]` jelöli a kattintható részleteket: ha az azonosító egy nyom, az a nyom kerül elő, különben a `decoys` csalinyom-szövege. A `fates` az ártatlanul megvádolt gyanúsítottak sorsa, az `events` a nyomozás közbeni fordulatok.
4. Vedd fel a fájlt az `index.html`-be a többi ügy mellé.
5. Angol változathoz készíts egy `cases/en/<ügy>.js` fájlt ugyanazokkal az azonosítókkal.

Szerver és telepítés nem kell, a játékállás a böngészőben mentődik.
