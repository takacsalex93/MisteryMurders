/* 3. ügy — Éjszakai gyors (nehéz) */
(window.MM_CASES = window.MM_CASES || []).push({
  id: "ejszakai-gyors",
  fx: "snow",
  sound: "train",
  cover: "train",
  number: 3,
  title: "Éjszakai gyors",
  meta: "Budapest–Kassa hálókocsi · 1936. december 19. · Ügyszám 1936/1204",
  teaser: "A Kassára tartó éjszakai gyors elakad a hóban. Reggelre a bankigazgató halott a fülkéjében, az ajtaján belülről beakasztott lánc. Hat utas, több hazugság, és valaki nem egyedül dolgozott.",
  difficulty: "Nehéz",

  intro: {
    eyebrow: "M. kir. Államvasutak · Vasúti csendőrség",
    heading: "Ráday Kristóf halála a 3-as fülkében",
    lead: "1936. december 19-én éjjel 01:20-kor a Budapestről Kassára tartó éjszakai gyors Szikszó után elakadt a hófúvásban. Csak hajnali háromkor indult tovább. Reggel hatkor a hálókocsi-kalauz holtan találta Ráday Kristóf bankigazgatót a 3-as fülkében.",
    body: "Rádayt a saját levélbontó késével szúrták le. A fülke folyosói ajtaján belülről beakasztott biztonsági lánc, az ablak befagyva. A kocsiban hat ember utazott, és a hóban senki sem szállhatott le. A kalauz esküszik, hogy hajnali kettő után még élt. Valaki hazudik, és nem egyedül.",
    start: "fulke3"
  },

  suspects: [
    { id: "agnes", look: { hair: "bun", clothes: "coat", acc: ["pearls"], lips: true }, name: "Ráday Ágnes", role: "Az áldozat húga, 50 éves. Egyedüli örököse.",
      stmt: "„Fél kettő körül veszekedést hallottam a falon át, Kristóf hangját és egy másik férfiét. Nem értettem a szavakat. Aztán csend lett, és nagyon hideg.”" },
    { id: "wolf", look: { hair: "short", hat: "bowler", clothes: "suit", acc: ["mustache"] }, name: "Herbert Wolf", role: "Osztrák óraügynök, 44 éves. Gyakran utazik ezen a vonalon.",
      stmt: "„Egy óra körül átmentem az {{étkezőkocsiba|etkezo}}, mert nem tudtam aludni. Énekeltek, kártyáztunk. Ezt a bankárt nem ismertem.”" },
    { id: "iren", look: { hair: "bob", clothes: "blouse", acc: ["glasses"], lips: true }, name: "Csermák Irén", role: "Nevelőnő, 35 éves. Egyedül utazik Kassára.",
      stmt: "„Nem ismertem Ráday urat. Egész éjjel a fülkémben voltam, rosszul aludtam.”" },
    { id: "kornelia", look: { hair: "bob", hat: "cloche", clothes: "coat", acc: ["earrings"], lips: true }, name: "Vay Kornélia", role: "Operaénekesnő, 29 éves. Vendégszereplésre utazik a kassai színházba.",
      stmt: "„Ráday úr kedves öregúr volt. Egy óra után az étkezőkocsiban {{énekeltem|enekelt}}, mert a hidegben nem lehetett aludni.”" },
    { id: "somlo", look: { hair: "slick", clothes: "suit", acc: ["glasses"] }, name: "Somló Dezső", role: "Ráday cégvezetője, 39 éves. Tizenkét éve dolgozik a banknak.",
      stmt: "„Éjfélkor láttam utoljára a főnökömet, átnéztük a számokat. Aztán aludtam, majd kettő előtt átmentem kártyázni. A kalauz úr is mondta, hogy kettő után még élt.”" },
    { id: "bodnar", look: { hair: "short", hat: "cap", clothes: "uniform", acc: ["mustache"] }, name: "Bodnár Lajos", role: "Hálókocsi-kalauz, 50 éves. Tizennyolc éve szolgál a vonalon.",
      stmt: "„02:10-kor {{bevittem a vezérigazgató úrnak egy takarót|takarot}}, mert elment a fűtés. Élt, morgott, hogy ne zavarjam többet. Reggel hatkor találtam meg.”" }
  ],

    words: {
    raday: ["Ráday Kristóf", "személy"], klara: ["Klára", "személy"],
    kes: ["levélbontó kés", "tárgy"], takaro: ["takaró", "tárgy"], boritek: ["boríték 500 pengővel", "tárgy"], szelep: ["fűtésszelep", "tárgy"], valtok: ["hamis váltók", "tárgy"], lanc: ["biztonsági lánc", "tárgy"], orak: ["svájci órák", "tárgy"],
    mosdo: ["közös mosdó", "hely"], f4: ["4-es fülke", "hely"], f2: ["2-es fülke", "hely"], kalauzfulke: ["kalauzfülke", "hely"], etkezo: ["étkezőkocsi", "hely"], folyoso: ["folyosó", "hely"],
    t0120: ["01:20", "idő"], t0150: ["01:50", "idő"], t0210: ["02:10", "idő"], t0300: ["03:00", "idő"],
    fut: ["elzárta a fűtést", "tett"], kartyazott: ["kártyázott", "tett"], enekelt: ["énekelt", "tett"], takarot: ["takarót vitt be", "tett"],
    csalas: ["a sikkasztás leleplezése", "indíték"], orokseg: ["örökség", "indíték"], tartozas: ["lejárt váltók", "indíték"], csempeszes: ["csempészés", "indíték"]
  },

  clues: {
    holttest: { t: "A holttest", src: "3-as fülke", x: "Rádayt a saját ezüst {{levélbontó késével|kes}} szúrták szíven. A test teljesen kihűlt, de a fülke is jéghideg volt. A folyosói ajtón belülről beakasztott {{lánc|lanc}}, a kalauz reggel feszítette le. A {{takaró|takaro}} összehajtva a csomagtartón, érintetlenül." },
    medal: { t: "Az ezüst medál", src: "3-as fülke", x: "{{Ráday|raday}} mellényzsebében, a szíve fölött egy ezüst medál. Benne egy fiatal nő fényképe, a hátoldalán vésve: „{{Klára|klara}}, 1912.” Ágnes szerint Klára a bátyja első felesége volt, aki fiatalon meghalt." },
    naplo: { t: "Ráday titkos bejegyzése", src: "3-as fülke · napló", x: "„Somló {{hamis váltókkal|valtok}} lopja a bankot. Kassán {{feljelentem|csalas}}. A kalauzban sem bízom, túl sokat sugdolóznak.”" },
    ido: { t: "Az éjszaka időrendje", src: "Étkezőkocsi", x: "Az éjszaka sorrendje: {{01:20|t0120}} megállás, Ráday utolsó bejegyzése, veszekedés a fülkében, a {{fűtés elzárása|fut}}, Somló dideregve leül {{kártyázni|kartyazott}} ({{01:50|t0150}}), a kalauz szerinti takaró ({{02:10|t0210}}), {{03:00|t0300}} indulás." },
    fulkek: { t: "Ki melyik fülkében utazott?", src: "Folyosó · utaslista", x: "1: Csermák Irén · {{2|f2}}: Ráday Ágnes · 3: Ráday Kristóf · {{4|f4}}: Somló Dezső · 5: Vay Kornélia · 6: üres · 7: Herbert Wolf · {{kalauzfülke|kalauzfulke}}: Bodnár Lajos. Somló fülkéjének {{közös mosdója|mosdo}} van Ráday fülkéjével." },
    bejarat: { t: "Az út a mosdón át", src: "Közös mosdó (3–4)", x: "A folyosói ajtó láncát belülről akasztották be, az ablakot a fagy zárta le. A {{mosdó|mosdo}} 3-as oldali retesze nyitva, a szappantartó leverve, a linóleumon a mosdó túlsó ajtaja felé tartó nedves lábnyom." },
    utlevel: { t: "Somló útlevele", src: "Somló fülkéje", x: "Somló Dezső, cégvezető. Születési hely és idő: Szeged, 1897. február 9. Az útlevélben egy kassai szálloda névjegye, két éjszakára foglalva." },
    boritek: { t: "A lezárt boríték", src: "Somló fülkéje · aktatáska", x: "Az aktatáskában hamisított váltók kötege Ráday aláírásával, és egy lezárt {{boríték 500 pengővel|boritek}}. Rajta Somló kézírásával: „B. L. — a második fele Kassán.”" },
    futes: { t: "A fűtésszelep", src: "Kalauzfülke", x: "A hálókocsi fűtését csak a kalauzfülkében lévő {{szelepen|szelep}} lehet elzárni, a kalauz négyszögkulcsával. A szelepen friss olajos ujjnyom, a kulcs Bodnár zsebében van." },
    vegrendelet: { t: "A végrendelet", src: "Utasok csomagjai", x: "Ágnes táskájában a bátyja végrendeletének másolata: mindent ő {{örököl|orokseg}}." },
    orak: { t: "A kettős fenekű bőrönd", src: "Utasok csomagjai", x: "Wolf mintakollekciója alatt egy rejtett rekeszben harminc {{vámolatlan|csempeszes}} {{svájci karóra|orak}}." },
    valtok: { t: "Kornélia váltói", src: "Utasok csomagjai", x: "Kornélia kézitáskájában egy levél Rádaytól: „A váltói {{lejártak|tartozas}}. Kassán beszélünk.” Hatezer pengő tartozás." },
    level: { t: "Egy soha el nem küldött levél", src: "Utasok csomagjai", x: "Irén bőröndjében egy levél „Kedves Apám” megszólítással, a címzett Ráday Kristóf. A levél még a borítékban van, lezáratlanul." },
    ujj: { t: "Az ujjnyom a szelepen", src: "Kalauzfülke", x: "A fűtésszelep olajos ujjnyoma Bodnár Lajos ujjlenyomatával egyezik." }
  },
  contradictions: [
    {"id": "c-bodnar", "suspect": "bodnar", "clue": ["holttest"], "reveal": "Bodnár a takaróra néz, és elsápad: „Talán… nem is vittem be. Fáradt voltam, összekeverem.”"},
    {"id": "c-bodnar2", "suspect": "bodnar", "clue": ["boritek"], "reveal": "Bodnár összeomlik: „Somló úr adta. Azt mondta, csak annyit mondjak, hogy kettő után még élt. És hogy zárjam el a fűtést. Nem tudtam, mire kell!”"},
    {"id": "c-bodnar3", "suspect": "bodnar", "clue": ["futes"], "reveal": "Bodnár keze remeg: „A szelep… magától akadt el. Néha megesik.” A szelephez csak az ő kulcsa illik."},
    {"id": "c-somlo", "suspect": "somlo", "clue": ["boritek"], "reveal": "Somló mosolya megfagy: „Borravaló. Az éjszakai szolgálatért.” Ötszáz pengő borravaló, a másik fele Kassán."},
    {"id": "c-somlo2", "suspect": "somlo", "clue": ["naplo"], "reveal": "Somló sokáig hallgat. „Egy öregember rögeszméi” mondja végül, de a keze reszket."},
    {"id": "c-iren", "suspect": "iren", "clue": ["level"], "reveal": "Irén lehajtja a fejét: „Az apám volt. Ezen az úton akartam először beszélni vele. Nem mertem bekopogni. Ágnes asszony hallotta, hogy egész éjjel köhögtem a fülkémben.”"},
    {"id": "c-kornelia", "suspect": "kornelia", "clue": ["valtok"], "reveal": "Kornélia arca megkeményedik: „Tartoztam neki, igen. Kedves öregúr volt a váltóival együtt. De egy óra után az étkezőkocsiban énekeltem, az egész kocsi hallotta.”"},
    {"id": "c-wolf", "suspect": "wolf", "clue": ["orak"], "lie": false, "reveal": "Wolf lehalkítja a hangját: „Jó, csempészek. De egytől fél háromig a pincér szeme előtt kártyáztam.”"},
    {"id": "c-agnes", "suspect": "agnes", "clue": ["vegrendelet"], "lie": false, "reveal": "Ágnes nem jön zavarba: „Mindent én örökölök, ezt mindenki tudja. És én jelentettem a veszekedést. A fülkémből nincs átjárás hozzá.”"}
  ],

    locations: [
    { id: "fulke3", name: "A 3-as fülke", desc: "Mahagóni burkolat, rézlámpa, befagyott ablak. Ráday Kristóf az alsó ágyon fekszik.",
      look: "Mahagóni burkolat, rézlámpa, a lehelet is látszik a hidegben. [[A bankár az alsó ágyon fekszik, félig felöltözve, a levélbontó kés még a mellkasában|holttest]]. A [[mellényzsebe kidudorodik, közvetlenül a szíve fölött|medal]].\n\nA kisasztalon [[két pohár és egy üveg tokaji|poharak]], a falon [[a befagyott ablak|ablak]]. A párnán egy kis bőrkötéses napló.",
      decoys: { poharak: "Az egyikből ittak, a másik száraz. Rádaynak volt egy látogatója, de az nem ivott vele.", ablak: "Jégvirágok vastagon. Ezt az ablakot ma éjjel senki sem nyitotta ki." },
      items: [
        { clue: "holttest", label: "A holttest", text: "Megvizsgálod a holttestet és a fülkét." },
        { clue: "medal", label: "A mellényzseb", text: "Valami kerek és hideg, közvetlenül a szív fölött." }],
      puzzle: "naplo" },
    { id: "folyoso", name: "Folyosó", desc: "Keskeny szőnyeg, zúzmarás ablakok, a falon a fülkék számozott ajtói és a kalauz utaslistája, félig leszakítva.",
      look: "Keskeny szőnyeg, zúzmarás ablakok. A falon a fülkék számozott ajtói, a kalauzfülke mellett a félig leszakított utaslista. A szőnyegen [[olvadt hó foltjai|folt]], a 3-as ajtón [[a lefeszített biztonsági lánc|lanc]].",
      decoys: { folt: "Hó a csendőrök csizmájáról. Reggel jöttek fel Szikszónál.", lanc: "A láncot belülről akasztották be, reggel a kalauz feszítette le. Kívülről, a {{folyosóról|folyoso}} nem lehet beakasztani." },
      puzzle: "fulkek" },
    { id: "mosdo", name: "A 3-as fülke mosdója", desc: "Szűk mosdófülke két ajtóval: az egyik a 3-asba, a másik a szomszédba nyílik.",
      look: "Szűk mosdófülke két ajtóval: az egyik a 3-asba, a másik a szomszédba nyílik. [[A tükör|tukor]] bepárásodott, [[a csapból|csap]] lassan csöpög a víz.",
      decoys: { tukor: "Valaki ujjal letörölt rajta egy csíkot, arcmagasságban. Sietett.", csap: "A víz jéghideg. A fűtéssel együtt a melegvíz is elment." },
      requires: "fulkek", puzzle: "bejarat" },
    { id: "somlo", name: "Somló fülkéje", desc: "Rendezett ágy, a fogason átázott felöltő, az ágy alatt egy fekete aktatáska.",
      look: "Rendezett, szinte érintetlen ágy. A fogason [[egy felöltő, a zsebéből bordó útlevél kandikál ki|utlevel]]. Az ágy alatt egy fekete, számzáras aktatáska. Az asztalon [[egy pakli kártya|kartya]] és [[egy félig üres kölnisüveg|kolni]].",
      decoys: { kartya: "Francia kártya, a pikk ász hiányzik belőle. Somló a saját paklijával ült le kártyázni.", kolni: "Erős, citromos kölni. A mosdóban is ezt érezni." },
      requires: "fulkek",
      items: [{ clue: "utlevel", label: "A felöltő zsebe", text: "Kiveszed az útlevelet." }],
      puzzle: "aktataska" },
    { id: "etkezo", name: "Étkezőkocsi", desc: "Üres poharak, kiterített kártyák, a pincér egy széken bóbiskol.",
      look: "Üres poharak, kiterített kártyák, cigarettafüst. [[A pincér|pincer]] egy széken bóbiskol. A sarokban [[a zongora|zongora]], rajta Kornélia kottái.",
      decoys: { pincer: "„Wolf úr egytől fél háromig itt ült, Somló úr fél kettő után jött, dideregve. A művésznő énekelt, gyönyörűen.”", zongora: "Lehár-áriák. A kotta szélén ceruzával: „Kassa, dec. 20., főpróba.”" },
      puzzle: "idorend" },
    { id: "kalauz", name: "Kalauzfülke", desc: "Szamovár, menetrendek, a falon szelepek és kapcsolók.",
      look: "Szamovár, menetrendek, a falon szelepek és kapcsolók. [[Egy vörösre festett kerék|futes]] elzárt állásban. Az asztalon [[a kalauz menetnaplója|menetnaplo]] és [[egy olajos rongy|rongy]].",
      decoys: { menetnaplo: "Bodnár szép, kerek betűivel: „02:10 takaró a 3-asba.” A tinta frissebbnek tűnik a többinél.", rongy: "Gépolaj. Ugyanaz, ami a szelepen is fénylik." },
      items: [{ clue: "futes", label: "A fűtésszelep", text: "Megvizsgálod a szelepet." }],
      puzzle: "ujjnyom" },
    { id: "csomagok", name: "Utasok csomagjai", desc: "A csendőrök engedélyével átnézheted a többi utas poggyászát.",
      look: "A csendőrök engedélyével átnézheted a poggyászokat. [[Ráday Ágnes táskájában egy vaskos, pecsétes boríték|vegrendelet]]. [[Herbert Wolf bőröndje|orak]] gyanúsan nehéz egy mintakollekcióhoz képest. [[Vay Kornélia kézitáskájában|valtok]] púder, kotta és egy gyűrött levél. [[Csermák Irén bőröndjében|level]] gondosan összehajtott ruhák. Legfelül [[egy kalapdoboz|kalap]].",
      decoys: { kalap: "Kornélia színpadi kalapja, strucctollal. Semmi más." },
      items: [
        { clue: "vegrendelet", label: "Ráday Ágnes táskája", text: "Kinyitod a pecsétes borítékot." },
        { clue: "orak", label: "Herbert Wolf bőröndje", text: "Megkopogtatod a bőrönd alját." },
        { clue: "valtok", label: "Vay Kornélia kézitáskája", text: "Kisimítod a gyűrött levelet." },
        { clue: "level", label: "Csermák Irén bőröndje", text: "A ruhák között egy lezáratlan boríték." }] }
  ],

    deductions: [
    { id: "d-ut", from: ["bejarat", "fulkek"], t: "A 4-es fülkéből jött", x: "A gyilkos a közös mosdón át jött be és távozott. A 3-as fülke mosdótársa a 4-es: Somló Dezső fülkéje.",
      text: "A gyilkos ezen át jött be, és ugyanitt távozott: {}. A 3-as fülke mosdótársa: {}.", b: ["mosdo", "f4"] },
    { id: "d-hideg", from: ["holttest", "futes"], t: "Szándékos hideg", x: "A fűtést csak a kalauz kulcsával lehet elzárni, és a szelepen friss olajos ujjnyom. A jéghideg fülkében a holttest gyorsan kihűlt, így a halál ideje elmosódott.",
      text: "Valaki a kalauz kulcsával szándékosan {}, hogy a holttest gyorsan kihűljön. Ezt csak itt lehet megtenni: {}.", b: ["fut", "kalauzfulke"] },
    { id: "d-takaro", from: ["holttest", "ido"], t: "A takaró hazugsága", x: "Ráday a veszekedéskor halt meg, még a fűtés elzárása és Somló kártyázása előtt. A takaró érintetlenül, összehajtva fekszik a csomagtartón: 02:10-kor senki sem takarta be.",
      text: "A(z) {} érintetlenül, összehajtva fekszik. Ráday már a veszekedéskor meghalt, jóval ez előtt, amikor a kalauz szerint még élt: {}.", b: ["takaro", "t0210"] },
    { id: "d-bl", from: ["boritek", "futes"], t: "B. L.", x: "A boríték „B. L.”-nek szól, és a szelep kulcsa Bodnár Lajos zsebében van. Somló pénzzel vette meg a kalauzt.",
      text: "Ez a tárgy „B. L.”-nek szól: {}. B. L. valójában: {}, akinél a szelep kulcsa van.", b: ["boritek", "bodnar"] },
    { id: "d-iren", from: ["level", "medal"], t: "Klára lánya", x: "Irén „Kedves Apám” megszólítással írt Rádaynak, aki a szíve fölött Klára, az első felesége fényképét hordta. Irén Ráday és Klára lánya.",
      text: "Csermák Irén apja: {}. Az anyja: {}.", b: ["raday", "klara"] }
  ],
  events: [
    { id: "szelep", after: 4, title: "Megint hideg van",
      text: "A vonat megrándul, a lámpák pislákolnak. A folyosón hirtelen csípős lesz a levegő, mintha valaki újra elzárta volna a fűtést.\n\nA kalauzfülke ajtaja résnyire nyitva. Bodnár egy olajos ronggyal a vörös keréken áll, és amikor meglát, összerezzen: „Csak… olajozom. Megakadt.”" },
    { id: "somlo", afterSolved: "aktataska", title: "Somló a folyosón",
      text: "Alig nyílik ki az aktatáska, Somló Dezső már az ajtóban áll. „Ehhez nincs joga! Az a bank tulajdona!” kiáltja, és a táska után kap.\n\nA csendőr félreállítja. Somló nem ellenkezik tovább, csak megigazítja a szemüvegét, és egy pillanatra sem veszi le a szemét a lezárt borítékról." }
  ],

  fates: {
    agnes: "Az örökség elég indíték volt. Ágnest elítélik a bátyja meggyilkolásáért; a Ráday-vagyont zár alá veszik, és egy budapesti bank olcsón felvásárolja a részvényeket.",
    wolf: "A csempészett órák után az esküdtek bármit elhittek róla. Herbert Wolfot elítélik, és sosem jut haza Bécsbe.",
    iren: "A lezáratlan levél és az elhallgatott rokonság elég volt. Irént, aki egész életében az apjával akart beszélni, apagyilkosként ítélik el.",
    kornelia: "A lejárt váltók mindenkit meggyőztek. Kornéliát elítélik; a kassai főpróbát nélküle tartják meg.",
    bodnar: "Bodnár bűnös volt, csak nem ő szúrt. A kalauzt gyilkosságért ítélik el, és mivel hallgat, Somló Kassán felveszi a pénzt, és nyomtalanul eltűnik."
  },
  puzzles: {
    ujjnyom: {
      type: "print", title: "Ujjnyom a szelepen", reward: "ujj", answer: "B", refLabel: "Az olajos szelepről",
      body: `<p>A vörös szelepkeréken egy olajos ujjnyom. A csendőr korommal levette mindenki ujjlenyomatát, aki a hálókocsiban utazott. Melyikkel egyezik?</p>`,
      options: [
        { v: "A", label: "Somló Dezső", seed: 52, type: "orveny" },
        { v: "B", label: "Bodnár Lajos", seed: 67, type: "orveny" },
        { v: "C", label: "Herbert Wolf", seed: 73, type: "hurok" },
        { v: "D", label: "Ráday Ágnes", seed: 88, type: "iv" }
      ],
      hints: ["Két örvényes nyom is van. A megszakadó vonalak helye dönt."]
    },
    naplo: {
      type: "keyword", title: "A titkos napló", reward: "naplo", key: "KLARA",
      plain: "SOMLO HAMIS VALTOKKAL LOPJA A BANKOT. KASSAN FELJELENTEM. A KALAUZBAN SEM BIZOM, TUL SOKAT SUGDOLOZNAK.",
      body: `<p>Ráday zsebnaplójának utolsó oldala értelmetlen betűsor. A belső borítón az ő kézírása:</p>
<div class="typed">„A kulcs az, akit a szívem fölött hordok.”</div>
<p>A betűk nem egyformán csúsznak el, ezt egy kulcsszó tolja el, betűről betűre. Ha megvan a kulcsszó, írd be.</p>`,
      hints: ["Nézd meg, mit hordott Ráday szó szerint a szíve fölött. A kulcs egy név, ékezet nélkül."]
    },
    fulkek: {
      type: "assign", title: "Az utaslista", reward: "fulkek", columnLabel: "Hol utazott?",
      body: `<p>A kalauz utaslistája félig leszakadt, a nevek mellől eltűntek a fülkeszámok. Ráday a 3-asban utazott. Állítsd össze a többiekét az utasok és a személyzet szavai alapján. Egy fülke üresen maradt.</p>`,
      facts: [
        "A hálókocsi fülkéi párosával közös mosdón osztoznak: 1–2, 3–4 és 5–6. A 7-esnek nincs mosdótársa. A kalauz a kocsi végén, a saját fülkéjében utazik.",
        "Bodnár Lajos, ha nem a folyosón járt, a szolgálati helyén pihent.",
        "Ráday Ágnes a falon át hallotta a veszekedést a bátyja fülkéjéből, de nem közös vele a mosdója.",
        "Csermák Irén mosdótársa Ágnes volt.",
        "Herbert Wolf a mintakollekciója miatt mosdótárs nélküli fülkét kért.",
        "Ráday ragaszkodott hozzá, hogy a cégvezetője kéznél legyen: Somló a mosdótársa volt.",
        "Vay Kornélia babonából páratlan számú fülkét kért, és a mosdótársa fülkéje üresen maradt."
      ],
      choices: ["1-es fülke", "2-es fülke", "4-es fülke", "5-ös fülke", "6-os fülke", "7-es fülke", "Kalauzfülke"],
      answer: { agnes: "2-es fülke", wolf: "7-es fülke", iren: "1-es fülke", kornelia: "5-ös fülke", somlo: "4-es fülke", bodnar: "Kalauzfülke" },
      hints: ["Ráday fülkéjével csak a 2-es és a 4-es szomszédos. Ezek közül csak az egyiknek közös vele a mosdója."]
    },
    bejarat: {
      type: "choice", title: "Az út befelé", reward: "bejarat", answer: "B",
      body: `<p>A 3-as fülke folyosói ajtaján belülről be volt akasztva a lánc. Hogyan jutott be és ki a gyilkos? Vesd össze a három lehetséges útvonal nyomait.</p>`,
      options: [
        { v: "A", label: "A folyosói ajtón, a kalauz kulcsával", sample: "A lánc belülről beakasztva, a kalauznak reggel le kellett feszítenie. Kívülről nem lehet beakasztani." },
        { v: "B", label: "A közös mosdón át, a szomszéd fülkéből", sample: "A 3-as oldali retesz nyitva, a szappantartó leverve. A linóleumon a szomszéd ajtó felé tartó nedves cipőnyom." },
        { v: "C", label: "Az ablakon át, a megállás alatt", sample: "Az ablakot a fagy beleforrasztotta a keretbe. Kívül a hó az ablakpárkányon szűz és sima." }
      ],
      confirm: "Erre jött",
      wrong: { A: "A láncot csak belülről lehet beakasztani. A gyilkos nem erre ment ki.", C: "A fagyott ablakot senki sem nyithatta ki, a hó érintetlen." },
      hints: ["A biztonsági láncot csak belülről lehet beakasztani. Akkor hol hagyta el a fülkét a gyilkos?"]
    },
    aktataska: {
      type: "code", title: "Somló aktatáskája", reward: "boritek", answers: ["090297", "970209"], length: 6,
      body: `<p>Somló fekete aktatáskája hatjegyű számzárral nyílik. A bankban köztudott volt, hogy a cégvezető minden zárat, széfet és jelszót a saját születésnapjára állít.</p>`,
      wrong: "A zár nem enged. Hat számjegy, de nem ezek.",
      hints: ["A születési dátum az útlevélben áll. Hat számjegy: nap, hónap és az évszám utolsó két jegye."]
    },
    idorend: {
      type: "order", title: "Az éjszaka időrendje", reward: "ido",
      body: `<p>A pincér felébredt, és most mindenki egyszerre beszél. Rakd sorba az éjszaka eseményeit. Csak két időpontot tud biztosan mindenki, a többit neked kell kikövetkeztetned.</p>`,
      facts: [
        "A mozdonyvezető naplója szerint a vonat 01:20-kor akadt el, és 03:00-kor indult újra.",
        "Ráday utolsó, titkosítatlan bejegyzése így szól: „Megálltunk. S. jön a számokkal.”",
        "Ágnes szerint a veszekedés nem sokkal azután kezdődött, hogy a falon túl elhallgatott a toll sercegése.",
        "A fűtést csak a kalauzfülkéből lehet elzárni. Ágnes a veszekedés elcsendesedése után kezdett fázni.",
        "A pincér szerint Somló dideregve ült le kártyázni, mert a hálókocsiban addigra már hideg volt.",
        "A kalauz azt állítja, hogy a takarót a kártyázás kezdete után húsz perccel, 02:10-kor vitte be."
      ],
      items: [
        { id: "megall", text: "A vonat elakad a hóban" },
        { id: "naplo", text: "Ráday utolsó bejegyzést ír a naplójába" },
        { id: "veszek", text: "Ágnes veszekedést hall a falon át" },
        { id: "futes", text: "Valaki elzárja a kocsi fűtését" },
        { id: "kartya", text: "Somló kártyázni kezd Wolffal az étkezőkocsiban" },
        { id: "takaro", text: "A kalauz szerint takarót visz Rádaynak, aki még él" },
        { id: "indul", text: "A mozdony újraindul" }
      ],
      initial: ["takaro", "veszek", "indul", "kartya", "megall", "futes", "naplo"],
      answer: ["megall", "naplo", "veszek", "futes", "kartya", "takaro", "indul"],
      hints: ["Az első és az utolsó esemény a mozdonyvezető naplójából jön. A többinél figyeld, mi okozta a hideget."]
    }
  },

    accusation: {
    story: "A gyilkos: {}. A szomszéd fülkéből ezen át ment be Rádayhoz: {}. A veszekedés után a saját {} segítségével szúrta le.\nBűntársa: {}. Pénzt kapott, elzárta a fűtést, és azt hazudta, hogy Ráday ekkor még élt: {}.\nIndíték: {}.",
    b: ["somlo", "mosdo", "kes", "bodnar", "t0210", "csalas"], who: [0]
  },

  plan: { w: 13.2, h: 6.6,
    rooms: { kalauz: [0, 0, 1.6, 2.6, "Kalauz"], _f1: [1.6, 0, 1.5, 2.6, "1"], _f2: [3.1, 0, 1.5, 2.6, "2"], fulke3: [4.6, 0, 1.6, 2.6, "3"], mosdo: [6.2, 0, 0.9, 2.6, "WC"], somlo: [7.1, 0, 1.6, 2.6, "4"], _f5: [8.7, 0, 1.5, 2.6, "5"], _f6: [10.2, 0, 1.5, 2.6, "6"], _f7: [11.7, 0, 1.5, 2.6, "7"],
      folyoso: [0, 2.6, 13.2, 1.1, "Folyosó"], etkezo: [0, 4.4, 6, 2.2, "Étkezőkocsi"], csomagok: [6.6, 4.4, 6.6, 2.2, "Poggyászkocsi"] },
    doors: [[6.2, .8, 6.2, 1.8], [7.1, .8, 7.1, 1.8], [5, 2.6, 5.8, 2.6], [7.5, 2.6, 8.3, 2.6], [.4, 2.6, 1.2, 2.6]],
    marks: [[.1, 4.2, "← a következő kocsik"]],
    note: "A hálókocsi felülről. A közös mosdók párokat kötnek össze: 1–2, 3–4 és 5–6." },
  carnation: { letter: "G", found: "Somló aktatáskájában, a hamis váltók alatt egy préselt fekete szegfű és egy gépelt cédula. A jobb alsó sarkában pirossal bekarikázva egy betű.", note: "„⟪ido⟫ Ma éjjel Ráday Kassára utazik, és ott feljelent. ⟪penz⟫ A kalauz, Bodnár, ötszázért bármit mond. ⟪vevo⟫ A Ráday-részvényeket átveszem. — F. Sz.”" },

  ending: {
    heading: "Somló Dezső, és a kalauz segített neki.",
    paragraphs: [
      "Somló évek óta hamisított váltókkal lopta a bankot. Ráday rájött, és Kassán a rendőrségre akart menni. Somló tudta, hogy csak ez az éjszaka maradt. Pénzzel megvette a kalauzt: ötszáz pengő előre, a másik fele Kassán.",
      "Amikor a vonat elakadt a hóban, Ráday éppen azt írta a naplójába, hogy Somló jön a számokkal. Somló a közös mosdón át ment be, a veszekedés után leszúrta a főnökét a saját levélbontó késével, és ugyanarra távozott. A folyosói ajtó láncát Ráday maga akasztotta be este. Bodnár ezután elzárta a fűtést, hogy a holttest gyorsan kihűljön, Somló pedig dideregve leült kártyázni.",
      "A 02:10-es takaró volt a terv lényege: Rádayt élve mutatta, amikor Somlónak már alibije volt. De a takarót senki sem használta, a napló kulcsa ott lógott a halott szíve fölött, és a boríték a kalauz monogramjával a gyilkos aktatáskájában maradt. Ágnes öröksége, Kornélia váltói, Wolf órái és Irén levele csak a vonat többi titka voltak."
    ]
  }
});
