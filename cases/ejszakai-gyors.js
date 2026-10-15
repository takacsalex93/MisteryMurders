/* 3. ügy — Éjszakai gyors (nehéz) */
(window.MM_CASES = window.MM_CASES || []).push({
  id: "ejszakai-gyors",
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
      stmt: "„Fél kettő körül veszekedést hallottam a falon át, Kristóf hangját és egy másik férfiét. Nem értettem a szavakat. Aztán csend lett, és nagyon hideg.”",
      extra: { after: "vegrendelet", text: "Mindent ő örököl, és ezt nem is titkolja. De ő jelentette a veszekedést, és a fülkéjéből nincs átjárás a bátyjához." } },
    { id: "wolf", look: { hair: "short", hat: "bowler", clothes: "suit", acc: ["mustache"] }, name: "Herbert Wolf", role: "Osztrák óraügynök, 44 éves. Gyakran utazik ezen a vonalon.",
      stmt: "„Egy óra körül átmentem az étkezőkocsiba, mert nem tudtam aludni. Énekeltek, kártyáztunk. Ezt a bankárt nem ismertem.”",
      extra: { after: "orak", text: "Svájci órákat csempész egy kettős fenekű bőröndben, ezért ideges. 01:00-tól 02:30-ig az étkezőkocsiban ült, a pincér igazolja." } },
    { id: "iren", look: { hair: "bob", clothes: "blouse", acc: ["glasses"], lips: true }, name: "Csermák Irén", role: "Nevelőnő, 35 éves. Egyedül utazik Kassára.",
      stmt: "„Nem ismertem Ráday urat. Egész éjjel a fülkémben voltam, rosszul aludtam.”",
      extra: { after: "level", text: "Hazudott: Ráday törvénytelen lánya, és az ő kedvéért szállt fel erre a vonatra. De a mosdótársa, Ágnes egész éjjel hallotta köhögni." } },
    { id: "kornelia", look: { hair: "bob", hat: "cloche", clothes: "coat", acc: ["earrings"], lips: true }, name: "Vay Kornélia", role: "Operaénekesnő, 29 éves. Vendégszereplésre utazik a kassai színházba.",
      stmt: "„Ráday úr kedves öregúr volt. Egy óra után az étkezőkocsiban énekeltem, mert a hidegben nem lehetett aludni.”",
      extra: { after: "valtok", text: "Ráday kezében voltak a váltói, tönkretehette volna. De 01:00 után végig az étkezőkocsiban volt, a pincér igazolja." } },
    { id: "somlo", look: { hair: "slick", clothes: "suit", acc: ["glasses"] }, name: "Somló Dezső", role: "Ráday cégvezetője, 39 éves. Tizenkét éve dolgozik a banknak.",
      stmt: "„Éjfélkor láttam utoljára a főnökömet, átnéztük a számokat. Aztán aludtam, majd kettő előtt átmentem kártyázni. A kalauz úr is mondta, hogy kettő után még élt.”",
      extra: { after: "ido", text: "Az alibije egyetlen dolgon áll: a kalauz 02:10-es történetén. Az pedig nem igaz.", lie: true } },
    { id: "bodnar", look: { hair: "short", hat: "cap", clothes: "uniform", acc: ["mustache"] }, name: "Bodnár Lajos", role: "Hálókocsi-kalauz, 50 éves. Tizennyolc éve szolgál a vonalon.",
      stmt: "„02:10-kor bevittem a vezérigazgató úrnak egy takarót, mert elment a fűtés. Élt, morgott, hogy ne zavarjam többet. Reggel hatkor találtam meg.”",
      extra: { after: "boritek", text: "Somló fizette le. Ő zárta el a fűtést, és ő találta ki a 02:10-es takarót.", lie: true } }
  ],

  clues: {
    holttest: { t: "A holttest", src: "3-as fülke", x: "Rádayt a saját ezüst levélbontó késével szúrták szíven. A test teljesen kihűlt, de a fülke is jéghideg volt. A folyosói ajtón belülről beakasztott lánc, a kalauz reggel feszítette le. A takaró összehajtva a csomagtartón, érintetlenül." },
    medal: { t: "Az ezüst medál", src: "3-as fülke", x: "Ráday mellényzsebében, a szíve fölött egy ezüst medál. Benne egy fiatal nő fényképe, a hátoldalán vésve: „Klára, 1912.” Ágnes szerint Klára a bátyja első felesége volt, aki fiatalon meghalt." },
    naplo: { t: "Ráday titkos bejegyzése", src: "3-as fülke · napló", x: "„Somló hamis váltókkal lopja a bankot. Kassán feljelentem. A kalauzban sem bízom, túl sokat sugdolóznak.” Ráday tudta, hogy a cégvezetője csal, és az utat a rendőrségre szánta." },
    ido: { t: "Az éjszaka időrendje", src: "Étkezőkocsi", x: "A veszekedés 01:30 körül volt, közvetlenül Ráday utolsó bejegyzése után. Utána valaki elzárta a kocsi fűtését a kalauzfülkéből, hogy a holttest gyorsan kihűljön. Somló 01:50-kor dideregve érkezett kártyázni. A kalauz 02:10-es takarója csak arra kell, hogy Rádayt élve mutassa, miközben Somló már a kártyaasztalnál ült. A takarót senki sem használta." },
    fulkek: { t: "Ki melyik fülkében utazott?", src: "Folyosó · utaslista", x: "1: Csermák Irén · 2: Ráday Ágnes · 3: Ráday Kristóf · 4: Somló Dezső · 5: Vay Kornélia · 6: üres · 7: Herbert Wolf · kalauzfülke: Bodnár Lajos. Somló fülkéjének közös mosdója van Ráday fülkéjével." },
    bejarat: { t: "Az út a mosdón át", src: "Közös mosdó (3–4)", x: "A folyosói ajtó láncát belülről akasztották be, az ablakot a fagy zárta le. A gyilkos a 4-es fülke felől, a közös mosdón át jött be, és ugyanarra távozott. A 3-as oldali retesz nyitva, a szappantartó leverve, a padlón a 4-es felé tartó nedves lábnyom." },
    utlevel: { t: "Somló útlevele", src: "Somló fülkéje", x: "Somló Dezső, cégvezető. Születési hely és idő: Szeged, 1897. február 9. Az útlevélben egy kassai szálloda névjegye, két éjszakára foglalva." },
    boritek: { t: "A boríték a kalauznak", src: "Somló fülkéje · aktatáska", x: "Az aktatáskában hamisított váltók kötege Ráday aláírásával, és egy lezárt boríték 500 pengővel. Rajta Somló kézírásával: „B. L. — a második fele Kassán.” Bodnár Lajos, a kalauz." },
    futes: { t: "A fűtésszelep", src: "Kalauzfülke", x: "A hálókocsi fűtését csak a kalauzfülkében lévő szelepen lehet elzárni, a kalauz négyszögkulcsával. A szelepen friss olajos ujjnyom, a kulcs Bodnár zsebében van." },
    vegrendelet: { t: "A végrendelet", src: "Utasok csomagjai", x: "Ágnes táskájában a bátyja végrendeletének másolata: mindent ő örököl. Nem titkolja, sőt büszkén mutatja." },
    orak: { t: "A kettős fenekű bőrönd", src: "Utasok csomagjai", x: "Wolf mintakollekciója alatt egy rejtett rekeszben harminc vámolatlan svájci karóra. Csempész, nem gyilkos: 01:00 és 02:30 között az étkezőkocsiban ült." },
    valtok: { t: "Kornélia váltói", src: "Utasok csomagjai", x: "Kornélia kézitáskájában egy levél Rádaytól: „A váltói lejártak. Kassán beszélünk.” Hatezer pengő tartozás. Komoly indíték, de a pincér szerint 01:00 után végig az étkezőkocsiban énekelt." },
    level: { t: "Egy soha el nem küldött levél", src: "Utasok csomagjai", x: "Irén bőröndjében egy levél „Kedves Apám” megszólítással, alá Ráday neve. Irén a bankár törvénytelen lánya. Ezen az úton akart először beszélni vele, de a levél még a borítékban van." }
  },

  locations: [
    { id: "fulke3", name: "A 3-as fülke", desc: "Mahagóni burkolat, rézlámpa, befagyott ablak. Ráday Kristóf az alsó ágyon fekszik.",
      items: [
        { clue: "holttest", label: "A holttest", text: "A bankár félig felöltözve, a levélbontó kés még a mellkasában." },
        { clue: "medal", label: "A mellényzseb", text: "Valami kerek és hideg, közvetlenül a szív fölött." }],
      puzzle: "naplo" },
    { id: "folyoso", name: "Folyosó", desc: "Keskeny szőnyeg, zúzmarás ablakok, a falon a fülkék számozott ajtói és a kalauz utaslistája, félig leszakítva.",
      puzzle: "fulkek" },
    { id: "mosdo", name: "A 3-as fülke mosdója", desc: "Szűk mosdófülke két ajtóval: az egyik a 3-asba, a másik a szomszédba nyílik.",
      requires: "fulkek", puzzle: "bejarat" },
    { id: "somlo", name: "Somló fülkéje", desc: "Rendezett ágy, a fogason átázott felöltő, az ágy alatt egy fekete aktatáska.",
      requires: "fulkek",
      items: [{ clue: "utlevel", label: "A felöltő zsebe", text: "Egy bordó útlevél és néhány vasúti jegy." }],
      puzzle: "aktataska" },
    { id: "etkezo", name: "Étkezőkocsi", desc: "Üres poharak, kiterített kártyák, a pincér egy széken bóbiskol.",
      puzzle: "idorend" },
    { id: "kalauz", name: "Kalauzfülke", desc: "Szamovár, menetrendek, a falon szelepek és kapcsolók.",
      items: [{ clue: "futes", label: "A fűtésszelep", text: "Egy vörösre festett kerék, elzárt állásban." }] },
    { id: "csomagok", name: "Utasok csomagjai", desc: "A csendőrök engedélyével átnézheted a többi utas poggyászát.",
      items: [
        { clue: "vegrendelet", label: "Ráday Ágnes táskája", text: "Egy vaskos, pecsétes boríték." },
        { clue: "orak", label: "Herbert Wolf bőröndje", text: "Gyanúsan nehéz egy mintakollekcióhoz képest." },
        { clue: "valtok", label: "Vay Kornélia kézitáskája", text: "Púder, kotta, és egy gyűrött levél." },
        { clue: "level", label: "Csermák Irén bőröndje", text: "Gondosan összehajtott ruhák között egy lezáratlan boríték." }] }
  ],

  puzzles: {
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
    questions: [
      { id: "who", legend: "Ki szúrta le Rádayt?", name: "a tettes", from: "suspects", answer: "somlo" },
      { id: "help", legend: "Ki segített neki?", name: "a bűntárs", from: "suspects", answer: "bodnar",
        extra: [{ v: "senki", label: "Nem volt bűntársa" }] },
      { id: "how", legend: "Hogyan jutott be a fülkébe?", name: "a behatolás útja", answer: "mosdo",
        options: [{ v: "folyoso", label: "A folyosói ajtón, a kalauz kulcsával" }, { v: "mosdo", label: "A közös mosdón át, a szomszéd fülkéből" }, { v: "ablak", label: "Az ablakon át, a megállás alatt" }] },
      { id: "why", legend: "Miért ölt?", name: "az indíték", answer: "csalas",
        options: [{ v: "orokseg", label: "Az örökség megszerzése" }, { v: "valto", label: "A lejárt váltók elengedése" }, { v: "csalas", label: "Ráday Kassán le akarta leplezni a sikkasztását" }, { v: "csalad", label: "Régi családi sérelem" }] }
    ]
  },

  ending: {
    heading: "Somló Dezső, és a kalauz segített neki.",
    paragraphs: [
      "Somló évek óta hamisított váltókkal lopta a bankot. Ráday rájött, és Kassán a rendőrségre akart menni. Somló tudta, hogy csak ez az éjszaka maradt. Pénzzel megvette a kalauzt: ötszáz pengő előre, a másik fele Kassán.",
      "Amikor a vonat elakadt a hóban, Ráday éppen azt írta a naplójába, hogy Somló jön a számokkal. Somló a közös mosdón át ment be, a veszekedés után leszúrta a főnökét a saját levélbontó késével, és ugyanarra távozott. A folyosói ajtó láncát Ráday maga akasztotta be este. Bodnár ezután elzárta a fűtést, hogy a holttest gyorsan kihűljön, Somló pedig dideregve leült kártyázni.",
      "A 02:10-es takaró volt a terv lényege: Rádayt élve mutatta, amikor Somlónak már alibije volt. De a takarót senki sem használta, a napló kulcsa ott lógott a halott szíve fölött, és a boríték a kalauz monogramjával a gyilkos aktatáskájában maradt. Ágnes öröksége, Kornélia váltói, Wolf órái és Irén levele csak a vonat többi titka voltak."
    ]
  }
});
