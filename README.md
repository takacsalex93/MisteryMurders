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

- **Séta mód:** a helyszín képén egy kis nyomozó sétál (kattintás vagy nyilak). A közeli részletek felvillannak, és megvizsgálhatók (E). A helyszínek `spots` mezője adja meg a részletek helyét a képen (x, y százalékban). A szöveges leírás választhatóan megmarad.
- **Egy helyiség egyszerre:** másik helyiségbe csak akkor lehet átmenni, ha az aktuálisban minden nyom megvan (a rejtvény ráér).
- **Rejtett nyomok:** a helyszínek leírásában kell rábukkanni a nyomokra, csalinyomokkal együtt.
- **Szókártyák (Golden Idol-módszer):** a szövegekben aláhúzott neveket, tárgyakat, helyeket, időpontokat, tetteket és indítékokat kattintással kell összegyűjteni.
- **Tábla és következtetések:** két összetartozó nyomot a Táblán piros fonallal (vagy a Jegyzetfüzetben) összekötve megnyílik egy hiányos mondat, amelyet a szókártyákból kell kiegészíteni. Csak a teljesen helyes mondat fogadható el; a visszajelzés legfeljebb annyi, hány szó hibás.
- **Vád:** az egész történetet hiányos mondatokból kell összerakni. Ártatlan megnevezése saját befejezéssel zárja az ügyet.
- **Dokumentumelemzés:** naplók (`log`), ujjlenyomat-összehasonlítás (`print`), jelírás (`glyph`).
- **Alaprajz:** minden ügynek kattintható art deco alaprajza van ajtókkal és térbeli megjegyzésekkel.
- **Jegyzetlap:** szabadon írható papír, a nyomok szövegéből kijelölt rész egy gombbal rámásolható.
- **Fekete szegfű jelírás:** a hat cédulán visszatérő jelek jelentését a címoldali szótárban kell kikövetkeztetni, a záró ügyben egy csak jelekkel írt üzenetet kell elolvasni.
- **Nehézség:** Nyomozó, Mester (nincs súgó, jelölés, számláló) és Noir (a jegyzetfüzet csak a nyomok címét jegyzi fel).
- **Szembesítés, kihallgatás, leleplezés, váratlan fordulatok, Hajnalig mód, eredménykártya.**
- Az angol változat (`cases/en/*.js`) egyelőre ki van kapcsolva.

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

`code` számzár · `choice` összevetés · `log` napló · `print` ujjlenyomat · `glyph` jelírás · `assign` logikai beosztás · `order` időrend · `text` szabad válasz (pl. anagramma) · `caesar` eltolásos titkosírás · `keyword` kulcsszavas (Vigenère) titkosírás · `spot` hazugság keresése egy vallomásban

### Új ügy hozzáadása

1. Másold le valamelyik `cases/*.js` fájlt, és írd át a tartalmát.
2. Állítsd be a `difficulty` mezőt: `Könnyű`, `Közepes` vagy `Nehéz`, és ha kell, a `sound` (háttérhang) és `fx` (borító-animáció) mezőt.
3. Írd meg a `contradictions` listát (melyik nyom melyik vallomással ütközik), a `deductions` listát (melyik két nyomból milyen következtetés jön, három válaszlehetőséggel), és a vádpontokhoz a `proof` bizonyítékokat. A helyszínek `look` szövegében `[[szöveg|azonosító]]` jelöli a kattintható részleteket: ha az azonosító egy nyom, az a nyom kerül elő, különben a `decoys` csalinyom-szövege. A `fates` az ártatlanul megvádolt gyanúsítottak sorsa, az `events` a nyomozás közbeni fordulatok.
4. Vedd fel a fájlt az `index.html`-be a többi ügy mellé.
5. Angol változathoz készíts egy `cases/en/<ügy>.js` fájlt ugyanazokkal az azonosítókkal.

Szerver és telepítés nem kell, a játékállás a böngészőben mentődik.
