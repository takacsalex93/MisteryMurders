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

- **Bejárható pixelvilág (mind a hét ügyben):** felülnézetes, Stardew Valley-stílusú térkép, amelyen a nyomozót nyilakkal/WASD-vel vagy koppintással lehet irányítani. A csillogó tárgyakat E-vel vagy a gombbal lehet megvizsgálni, a gyanúsítottakkal a helyszínen lehet beszélgetni és szembesíteni őket, a rejtvények a tárgyakon nyílnak meg. Első belépéskor a helyiség festménye jelenik meg. A szereplők járkálnak (Lukács a konyha és a hall között, Ilona a folyosón, Szirmai a szivarozóhelyéig), megszólalnak, ha a közelükbe érsz, és egyes beszélgetéseiket ki lehet hallgatni (ezek a Jegyzetlapra kerülnek). Az áramszünet után a villa elsötétül: csak a nyomozó lámpása és a tűz világít, a nedves cipőnyomok a titkárságig vezetnek, és Lukács gyertyával érkezik, amikor odaérsz. Lépéshang padló szerint, ketyegő állóóra, nagyító a vizsgált tárgyakhoz, és látható zárt ajtó. Az éjszakának órája van (időpontokhoz kötött eseményekkel), a lebukott gyanúsítottak idegesek és kerülnek, ügyenként egyszer egy árnyalak suhan át a helyszínen. A szembesítés kártyákkal megy (két rossz próbálkozás után a gyanúsított megsértődik egy időre), és ha minden bizonyíték megvan, a gyanúsítottak összegyűlnek: oda kell menni a tetteshez, és rámutatni. Ha két nyom összefügg, a nyomozó elgondolkodik. Ügyenként három opcionális titok, a végén „Mit hagytál ki?” összesítő, a címoldalon pedig a nyomozó irodája a megoldott ügyek tárgyaival és a cédulákkal. Szereplőnként saját beszédhang, eső vagy hó az ablakokon. A szöveges leírás (📜 Leírás) választhatóan megmarad.
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

- **Napi kihívás (`#napi`):** minden nap ugyanaz az ügy és szabály mindenkinek (Hajnalig, Mester, Noir vagy Egyetlen vád), külön mentéssel; a végén Wordle-szerű, megosztható eredmény, és sorozatszámláló.
- **Heti rejtély:** rövid, egyhelyiséges esetek (`weekly` dátummal, a címoldal a megjelenés hetétől mutatja), mindegyik több változattal: a `variants` felülírja a nyomokat, ellentmondásokat, következtetéseket, rejtvényt, vádat és befejezést, induláskor sorsolódik.
- **Kitüntetések és rangok:** 16 kitüntetés a címoldali irodában, rang a megoldott ügyek pontjaiból.
- **Izgalmak:** rámutatás után a tettes a kijárat felé menekül (el lehet kapni), az Éjszakai gyorsban a pincért leütik, ha nem érsz oda időben, és két ügyben hamis bizonyíték vár (`trap` ellentmondás). A titkok helye játékonként változik.
- **Második évad:** a záró ügy utóirata és a címoldali előzetes.

## Felépítés

- `index.html` — az oldal váza, itt kell felvenni az új ügyeket
- `js/engine.js` — a játékmotor (nézetek, mentés, rejtvénytípusok)
- `js/world.js` — a bejárható pixelvilág (vászon, mozgás, útkeresés, párbeszédablakok)
- `cases/<ügy>.world.js` — generált térképadat; a `tools/world/build_world.py` készíti a `tools/world/<ügy>.json` leírásból
- `images/world/` — a térképek összerakott háttérképei, a tárgyatlasz és a szereplők mozgásfázisai
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

### Pixelvilág építése

A grafika [LimeZu Modern Interiors](https://limezu.itch.io/moderninteriors) csomagjából készül (a karaktergenerátorral együtt). A licenc nem engedi a nyers csomag terjesztését, ezért a repóba csak a kész, összerakott képek kerülnek; a csomag a repón kívül marad.

```
python3 tools/chars.py <csomag> <szereplők_ki>            # szereplők a tools/characters.json alapján
python3 tools/world/tighten.py <csomag> előnézet.png       # tárgyak pontos kivágása (tools/world/sprites.json)
python3 tools/world/src/<ügy>.py                            # a térképleírás (tools/world/<ügy>.json) megírása
python3 tools/world/build_world.py <csomag> <szereplők_ki> <ügy>
python3 tools/world/check_world.py <ügy>                    # minden helyiség, tárgy, szereplő elérhető-e, a zárak sorrendjével együtt
```

A saját rajzolású tárgyak (hordó, jégtömb, kapcsolótábla, liftkalitka, színházi székek stb.) a `tools/world/props.py`-ban vannak.

A térképleírásban a `rooms` a helyiségek padlóját (helyszín-azonosító, x, y, szélesség, magasság, padló- és falminta), a `doors` az ajtónyílásokat, az `objects` a bútorokat adja meg (`spot` megvizsgálható részlet, `puzzle` rejtvény, `warp` lépcső, `fg` y szerint rendezett, `floor`/`wall` háttérbe sütött), az `npcs` a szereplőket (`route` útvonal várakozással, `barks` megszólalások, `nick` becenév), a `talks` a kihallgatható beszélgetéseket, a `decals` a lábnyomokat, a `snd` a helyiségek padlóhangját; a tárgyak `light` fényt adnak a sötétben. A `dark` szabályok: `{after, lit, msg}` egy fordulat után sötét, `{map}` mindig sötét pálya (pince, zsinórpadlás), `{room, tint}` sötét helyiség színes fénnyel (sötétkamra). A `weather` szabadtéri helyiségekre esőt, ködöt vagy havat tesz. Az `npcs` között `static` + `lie` a holttest, `spot` a vizsgálható szereplő; a `glint` csillogó pont, `puzzle: true`-val rejtvényt nyit.

Az ügyenkénti óra, idővonal, árnyalak, gyülekezőhely és titkok a `tools/world/src/extras.py`-ban vannak; a címoldali iroda a `tools/world/src/iroda.py`.

Grafika: LimeZu (limezu.itch.io).

## Közös ranglista (opcionális, ingyenes Supabase)

Ha be van állítva, a megoldott ügy végén a játékos becenévvel felteheti az eredményét, a címoldalon pedig megjelenik a **Ranglista** (mai kihívás, összesített, ügyenként), az ügykártyákon pedig az, hogy hány nyomozó oldotta meg. Beállítás nélkül ebből semmi sem látszik, a játék ugyanúgy működik.

1. Regisztrálj a https://supabase.com oldalon (ingyenes), és hozz létre egy új projektet (*New project*; a régió legyen pl. Frankfurt).
2. A projektben nyisd meg az **SQL Editor**-t → *New query*, másold be a `supabase.sql` teljes tartalmát, és nyomd meg a **Run** gombot.
3. **Project Settings → API** (vagy *Data API*): másold ki a **Project URL**-t és az **anon public** kulcsot.
4. Írd be őket a `js/online.js` elejére (`url` és `key`), majd töltsd fel a változást.

Az anon kulcs nyilvános, ez így rendben van: a tábla sorszintű szabályai csak az olvasást és új eredmény beküldését engedik, módosítást és törlést nem, és egy játékos ügyenként legfeljebb 20 eredményt küldhet. Mivel bárki küldhet adatot, egy ügyes csaló beírhat hamis pontszámot; ha ilyen történik, a Supabase *Table Editor*-ában a sor kézzel törölhető.

## Címoldal és hangulat

- **Élő nyitókép:** a folytatandó (vagy következő) ügy borítója, rajta az ügy saját effektje (eső, vihar villámmal, hó, köd, por), görgetéskor lassabban mozgó háttérrel. Este (19 és 6 óra között) sötétebb, lámpafényes, nappal világosabb.
- **Nyomozói igazolvány:** becenév, választható jelkép és rangjelvény; a jelkép a ranglistán is a név előtt áll.
- **Friss jelentések:** futó hírcsík a közös ranglista legutóbbi eredményeiből.
- **Aktaállapotok:** az el nem kezdett ügy „Szigorúan titkos”, a félbehagyott „Folyamatban” (haladássávval), a megoldottra a megoldás utáni első visszatéréskor rácsapódik a „Lezárva” pecsét.
- **Napi visszaszámláló** a következő napi kihívásig.
- **Filmes átmenetek:** ügy megnyitásakor írógépes főcím, a sikeres vád után tárgyalótermi ítélet. A mozgáscsökkentést kérő böngészőkben ezek elmaradnak.
- **Eredménykártya** bejegyzés (4:5) és story (9:16) méretben.
- **Címoldali hang:** halk eső és zongora (a hang alapból ki van kapcsolva).

## Oktató eset, elakadásgátló, mentés

- **0. ügy · Próbanap** (`cases/oktato.js`): rövid, vezetett gyakorló eset pixeles pálya nélkül. Az új játékosnak a nyitókép ezt ajánlja. A Következő lépés sáv „Oktatás” módban minden lépésnél elmagyarázza a mechanikát (`tutor` mező).
- **Elakadásgátló:** a következtetés ablaka megmutatja a két összekötött nyom szövegét, és ha egy szükséges szó máshol van, megmondja, hol keresse (a szót nem árulja el). Két rossz próba után, illetve rossz vádnál súgóért megjelölhető a rossz szó.
- **Játékállás mentése:** a címoldal alján „Játékállás mentése vagy betöltése”: kód vagy fájl, amivel másik böngészőben vagy gépen folytatható a játék.
- **Lusta betöltés:** a pályák (`cases/<id>.world.js`) csak az ügy megnyitásakor töltődnek le; a kártyákon kisebb borítóképek (`cover-sm.webp`) vannak.

## Névtelen statisztika és visszajelzések (opcionális)

A közös ranglista Supabase projektjében futtasd le a `supabase_stats.sql` fájlt is (SQL Editor → New query → Run). Ezután a játék névtelenül rögzíti, ki hol tart (ügy indítása, rejtvények, súgók, rossz próbák, az ügy vége), az ügyek végén pedig csillagos értékelést és szöveges visszajelzést lehet küldeni. A játékosok csak beküldeni tudnak, olvasni nem.

Kiértékelés a Supabase-ben (Table Editor vagy SQL Editor):
- `stat_cases`: ügyenként kezdők, megoldók, megoldási arány, átlagos idő;
- `stat_sticking`: hol kérnek súgót, hol rontanak a legtöbbet;
- `stat_dropoff`: hol hagyják abba azok, akik nem fejezték be;
- `stat_feedback` és a `feedback` tábla: értékelések és szöveges megjegyzések.

A játékosok a címoldal alján kikapcsolhatják a statisztikát. Ha a táblák nincsenek létrehozva, a játék egyszerűen nem küld semmit.

## Játék több eszközön (szinkron)

A `supabase_sync.sql` lefuttatása után a címoldal alján (és a nyomozói igazolványban) bekapcsolható a szinkron. A játékos kap egy 20 karakteres nyomozói kódot; ahol ezt megadja (vagy megnyitja a `#sync=KÓD` linket), ott ugyanonnan folytathatja. Regisztráció nem kell. A haladás mentéskor néhány másodperc késéssel felkerül, induláskor és a lapra visszatéréskor letöltődik. Összefésülés: első összekapcsoláskor ügyenként a nagyobb előrehaladás nyer, utána a frissebb mentés; a kitüntetések és a napi napló egyesül, a ranglistás azonosító is közös lesz. A szerver a kódot csak lenyomatként (sha256) tárolja, a mentéseket csak a kód ismeretében lehet elérni.
