/* 2. ügy — Halál az Arany Griffben (közepes) */
(window.MM_CASES = window.MM_CASES || []).push({
  id: "arany-griff",
  fx: "rain",
  sound: "city",
  sounds: { bar: "jazz" },
  cover: "hotel",
  number: 2,
  title: "Halál az Arany Griffben",
  meta: "Budapest · 1934. március 3. · Ügyszám 1934/88",
  teaser: "Egy ünnepelt színházi impresszáriót holtan találnak belülről bezárt szállodai szobájában. A kulcs a zárban, az ablak a negyediken. Hogyan jutott ki a gyilkos?",
  difficulty: "Közepes",

  intro: {
    eyebrow: "Budapesti Államrendőrség · Bűnügyi osztály",
    heading: "Vándor Elemér halála a 412-es szobában",
    lead: "1934. március 3-án, szombat éjjel fél tizenkettőkor a Hotel Arany Griff éjszakai portása pótkulccsal nyitotta ki a 412-es szobát. Vándor Elemér, a Pesti Varieté igazgatója holtan feküdt a szőnyegen, mellette a saját bronz díjszobra.",
    body: "Az ajtó belülről volt bezárva, a kulcs a zárban. Az ablak alatt negyven méter mélység és a Duna-part. A rendőrség zárt szobás rejtélyről beszél. Te tudod, hogy ilyen nincs: valaki kiment azon a szobán, csak még nem tudjuk, hol.",
    start: "szoba412"
  },

  suspects: [
    { id: "lili", look: { hair: "bob", hat: "headband", clothes: "dress", acc: ["earrings"], lips: true }, name: "Fodor Lili", role: "Primadonna, 27 éves. Vándor sztárja, és a pletykák szerint több is annál.",
      stmt: "„Elemér meg akart szabadulni tőlem, ezt mindenki tudta. De egész este a szobámban voltam. Tizenegy után Bécsbe telefonáltam, fél tizenkettőkor pedig őt hívtam, mert nem vette fel. Akkor szóltam a portásnak.”" },
    { id: "hartmann", look: { hair: "slick", clothes: "suit", acc: ["monocle", "mustache"] }, name: "Hartmann Viktor", role: "Üzlettárs, 48 éves. A varieté pénzügyeit viszi.",
      stmt: "„Fél tizenegytől éjfélig a {{bárban|bar}} {{ültem|ult}}, a pultos mindent látott. A varieté könyvei rendben vannak, ha erre gondol. Harminc éve dolgozunk együtt Elemérrel.”" },
    { id: "margit", look: { hair: "bun", hat: "maid", clothes: "maid", lips: true }, name: "Szabó Margit", role: "Szobalány, 22 éves. Ő takarítja a negyedik emeletet.",
      stmt: "„A tompa puffanást én hallottam, a vasalószobából. Nem mentem be, féltem. A vendégek dolgaihoz soha nem nyúlok.”" },
    { id: "ferenczy", look: { hair: "short", hat: "cap", clothes: "uniform", acc: ["mustache"] }, name: "Ferenczy Pál", role: "Éjszakai portás, 56 éves. Húsz éve áll a pult mögött.",
      stmt: "„Egész este a pultnál álltam, a {{pótkulcs|potkulcs}} végig a táblán lógott. A negyediken csak törzsvendégek laknak, idegen ma este nem ment fel, arra mérget veszek.”" },
    { id: "kardos", look: { hair: "short", hat: "fedora", clothes: "trench" }, name: "Kardos Endre", role: "Fiatal drámaíró, 31 éves. Vándor egyszer bemutatott tőle egy darabot.",
      stmt: "„Az egész estét a New York kávéházban töltöttem, a darabomon dolgoztam. Éjfél után értem haza, száraz lábbal: az eső csak hajnalban eredt el. Vándorral évek óta nem beszéltem.”" }
  ],

    words: {
    vandor: ["Vándor Elemér", "személy"], derkes: ["Derkes Andor", "személy"],
    pallas: ["bronz Pallas-szobor", "tárgy"], irattarto: ["bőr irattartó", "tárgy"], potkulcs: ["pótkulcs", "tárgy"], kezirat: ["kézirat", "tárgy"], pezsgo: ["pezsgő", "tárgy"], mandzsetta: ["mandzsettagomb", "tárgy"],
    sz412: ["412-es szoba", "hely"], sz414: ["414-es szoba", "hely"], osszekoto: ["összekötő ajtó", "hely"], ablak: ["ablak", "hely"], folyoso: ["folyosó", "hely"], bar: ["bár", "hely"],
    t2245: ["háromnegyed tizenegy", "idő"], t2315: ["negyed tizenkettő", "idő"], t2300: ["23:00", "idő"], ejfel: ["éjfél", "idő"],
    telefonal: ["Béccsel telefonált", "tett"], vasalt: ["vasalt", "tett"], ult: ["a bárban ült", "tett"],
    darablopas: ["az ellopott darab", "indíték"], per: ["a felbontott szerződés", "indíték"], sikkasztas: ["sikkasztás", "indíték"], lopas: ["lopás", "indíték"]
  },

  clues: {
    eso: { t: "Az eső", src: "Porta", x: "A portás szerint {{háromnegyed tizenegykor|t2245}} szakadt le az eső, és {{éjfélig|ejfel}} zuhogott. Az ernyőtartó azóta tele csöpögő esernyőkkel." },
    holttest: { t: "A holttest és a díjszobor", src: "412-es szoba", x: "{{Vándort|vandor}} egy bronz {{Pallas-szobor|pallas}} ütése ölte meg, a díjat 1930-ban kapta. A szobrot letörölték. Az ajtó belülről zárva, a kulcs a zárban. A szőnyegen nedves, sáros nyomok, pedig Vándor egész este ki sem lépett a szobájából." },
    szerzodes: { t: "Az ellopott darab", src: "412-es szoba · széf", x: "A széfben „Az utolsó tánc” {{kézirata|kezirat}}. A borítón Vándor neve áll, de alatta, kivakarva, még olvasható az eredeti szerző: Kardos Endre. Az {{ellopott darab|darablopas}} most fut telt házzal, és minden bevétel Vándoré." },
    ido: { t: "Az este időrendje", src: "Lift és lépcsőház", x: "Az este sorrendje: Vándor {{pezsgőt|pezsgo}} rendel, a pincér felviszi, a lift egy nedves kabátos férfit visz a negyedikre, tompa puffanás a 412-ből (Margit szerint épp negyedet ütött a folyosói óra, {{negyed tizenkettőt|t2315}}), reteszcsattanás odébb a {{folyosón|folyoso}}, Lili hiába telefonál, a portás benyit." },
    liftes: { t: "A liftesfiú vallomása", src: "Lift és lépcsőház", x: "„Csuromvizes volt a kabátja, mintha végiggyalogolt volna a rakparton. A kalapját a szemébe húzta, és egy kopott {{bőr irattartót|irattarto}} szorongatott. A negyediken szállt ki, de nem ment a {{412|sz412}} felé, hanem jobbra fordult.”" },
    derkes: { t: "Derkes Andor nem létezik", src: "Porta · vendégkönyv", x: "A {{414-es szobát|sz414}} aznap este készpénzért egy „{{Derkes Andor|derkes}}” vette ki, és soha többé nem jelent meg a pultnál. A név pontosan Kardos Endre betűiből áll." },
    kijarat: { t: "Az összekötő ajtó", src: "414-es szoba", x: "A 412 és 414 közötti {{összekötő ajtón|osszekoto}} a 412-es oldali retesz nyitva, a 414-es oldali zárva, a küszöbön nedves sárfolt. A 414-es szekrényben egy kopott, nedves {{bőr irattartó|irattarto}}." },
    tavirat: { t: "Vándor táviratpiszkozata", src: "Lili szobája", x: "„Fodor kisasszony {{szerződését azonnali hatállyal felbontom|per}}, kártérítési per következik.” Vándor táviratának másolata Lili éjjeliszekrényén." },
    fokonyv: { t: "A titkos főkönyv", src: "Bár", x: "Hartmann aktatáskájában egy második főkönyv: két év alatt negyvenezer pengő {{tűnt el|sikkasztas}} a varieté kasszájából." },
    mandzsetta: { t: "Az arany mandzsettagombok", src: "Személyzeti folyosó", x: "Margit kötényzsebében Vándor monogramos arany {{mandzsettagombjai|mandzsetta}}." },
    kozpont: { t: "Lili hívásai", src: "Lili vallomása", x: "A szálloda központja szerint Lili {{23:00|t2300}}-tól 23:20-ig {{Béccsel beszélt|telefonal}}, 23:25-kor pedig a 412-t hívta, eredménytelenül." },
    hivas: { t: "Hívás a 414-ből", src: "Telefonközpont · napló", x: "A központ naplója szerint 23:05-kor a 414-es szobából a 412-t hívták, egy percig. A 414-ből más hívás egész este nem volt." }
  },
  contradictions: [
    {"id": "c-kardos", "suspect": "kardos", "clue": ["derkes"], "reveal": "Kardos sokáig hallgat. „Igen, én vettem ki a szobát. Beszélni akartam vele, az ajtón át. Nem engedett be. Aztán elmentem.”"},
    {"id": "c-kardos2", "suspect": "kardos", "clue": ["eso", "liftes"], "reveal": "Kardos keze ökölbe szorul: „Hát jó, eláztam. Gyalog jöttem a kávéházból. Ettől még nem vagyok gyilkos.”"},
    {"id": "c-hartmann", "suspect": "hartmann", "clue": ["fokonyv"], "reveal": "Hartmann leveszi a szemüvegét: „Kölcsönvettem. Vissza akartam tenni. Elemér nem tudott róla. De a bárból egy percre sem mozdultam, a pultos megmondja.”"},
    {"id": "c-margit", "suspect": "margit", "clue": ["mandzsetta"], "reveal": "Margit sírva fakad: „Délután {{vettem el|lopas}}, takarításkor. Annával {{vasaltam|vasalt}}, amikor puffant, ő is megmondja.”"},
    {"id": "c-ferenczy", "suspect": "ferenczy", "clue": ["derkes"], "reveal": "Ferenczy izzad: „Készpénzzel fizetett, jó borravalót adott, nem kérdeztem semmit. Azt mondta, Derkes. Nem gondoltam, hogy baj lesz belőle.”"},
    {"id": "c-lili", "suspect": "lili", "clue": ["tavirat"], "lie": false, "gives": "kozpont", "reveal": "Lili felszegi a fejét: „Igen, perrel fenyegetett. De a központ megmondja: tizenegytől húsz percen át Béccsel beszéltem.”"}
  ],

    locations: [
    { id: "szoba412", spots: { holttest: [62, 86], pezsgo: [18, 30], ablak: [80, 40], ajto: [58, 50] }, name: "412-es szoba", desc: "Bordó tapéta, félig kiürült pezsgősüveg, a kandallópárkányon színlapok. Itt történt.",
      look: "Bordó tapéta, fülledt meleg. [[Vándor a kandalló előtt fekszik, mellette a bronz Pallas|holttest]]. Az asztalon [[egy félig kiürült pezsgősüveg és két pohár|pezsgo]], a kandallópárkányon bekeretezett színlapok, a falban egy számzáras széf.\n\nAz ablak előtt [[muskátlis cserepek a párkányon|ablak]]. A szoba túlsó falán egy [[keskeny, tapétázott ajtó|ajto]], mintha csak a fal része volna.",
      decoys: { pezsgo: "Csak az egyik pohárból ittak. A másik tiszta, a pincér hozta fel a tálcán, ahogy szokás.", ablak: "Az {{ablak|ablak}} belülről zárva, a párkányon érintetlen a korom.", ajto: "Összekötő ajtó a szomszéd szobába. Erről az oldalról nyitva a retesz. Hogy a túloldalon mi van, azt innen nem látod." },
      items: [{ clue: "holttest", label: "A holttest", text: "Letérdelsz Vándor mellé." }],
      puzzle: "szef" },
    { id: "lift", spots: { liftes: [57, 58], folt: [80, 75], hamu: [18, 62] }, name: "Lift és lépcsőház", desc: "Kovácsoltvas liftkalitka, egyenruhás liftesfiú, a lépcsőn vörös szőnyeg.",
      look: "Kovácsoltvas liftkalitka, réztábla az emeletekkel. [[Az egyenruhás liftesfiú|liftes]] tizenhat éves, és nagyon szeretne segíteni. A lépcsőn [[vörös szőnyeg, rajta sötét foltok|folt]], a fordulóban [[egy hamutartó oszlop|hamu]].",
      decoys: { folt: "Vörösbor. A liftesfiú szerint egy vendég délután elejtett egy poharat.", hamu: "Szivarcsutkák, egy elhasznált jegy a Royal Orfeumba. Semmi, ami ide tartozna." },
      items: [{ clue: "liftes", label: "A liftesfiú", text: "Kikérdezed a fiút." }],
      puzzle: "idorend" },
    { id: "porta", spots: { eso: [6, 60], keret: [66, 38], blokk: [80, 60] }, name: "Porta", desc: "Mahagóni pult, kulcstábla, nyitott vendégkönyv. Ferenczy Pál idegesen igazgatja a nyakkendőjét.",
      look: "Mahagóni pult, mögötte a kulcstábla, a pulton nyitott vendégkönyv. Ferenczy Pál idegesen igazgatja a nyakkendőjét. Az ajtó mellett [[az ernyőtartó, alatta tócsa|eso]]. A falon [[egy keretezett levél|keret]], a pult szélén [[egy táviratblokk|blokk]].",
      decoys: { keret: "Hála Ferenczy úrnak húsz év hűséges szolgálatáért. A szálloda igazgatósága, 1932.", blokk: "Az utolsó lapon csak egy ceruzanyom: egy bécsi szám. Lili ma este is Bécset hívta." },
      items: [{ clue: "eso", label: "Az ernyőtartó", text: "Megkérdezed a portást, mikor kezdett esni." }],
      puzzle: "anagramma" },
    { id: "szoba414", spots: { agy: [40, 48], cigi: [24, 75] }, name: "414-es szoba", desc: "A 412 szomszédja. Bevetetlen ágy, a hamutartóban egy félig szívott cigaretta.",
      look: "A 412 szomszédja. [[Bevetetlen ágy|agy]], az asztalon [[egy hamutartó, benne félig szívott cigaretta|cigi]]. Az ablakon csorog az eső.",
      decoys: { agy: "Senki sem feküdt benne. Aki kivette, nem aludni jött.", cigi: "Olcsó Symphonia, a végén harapásnyom. Valaki idegesen várt itt." },
      requires: "anagramma", puzzle: "kijarat" },
    { id: "kozpont", spots: { tabla: [35, 45], fejhallgato: [70, 60] }, name: "Telefonközpont", desc: "A kezelőnő fülkéje a porta mögött: dugaszolótábla, fejhallgató, egy vastag napló.",
      look: "Szűk fülke a porta mögött. [[A dugaszolótábla|tabla]] tele zsinórokkal, a kezelőnő [[fejhallgatója|fejhallgato]] a szék támláján. Az asztalon a hívások naplója, minden kapcsolás percre pontosan.",
      decoys: { tabla: "Minden szobának saját dugója van. A 412-es és a 414-es egymás mellett.", fejhallgato: "Még langyos. A kezelőnő szerint egész este egyetlen percre sem tette le." },
      puzzle: "naplo" },
    { id: "lili", spots: { tavirat: [60, 68], nevjegy: [22, 56], ruha: [88, 80] }, name: "Lili szobája", desc: "Virágcsokrok, parfümillat, az éjjeliszekrényen papírok.",
      look: "Virágcsokrok minden asztalon, nehéz parfümillat. [[Az éjjeliszekrényen gyűrött papírok|tavirat]]. A tükör előtt [[egy halom névjegy és szerelmes levél|nevjegy]], a fotelen [[egy flitteres ruha|ruha]].",
      decoys: { nevjegy: "Rajongók, bankárok, egy főhercegi titkár. Lilinek nem Vándor volt az egyetlen pártfogója.", ruha: "A ma esti fellépés ruhája. Lili le sem vetkőzött, amikor visszaért." },
      items: [{ clue: "tavirat", label: "Az éjjeliszekrény", text: "Kisimítod a gyűrött papírt." }] },
    { id: "bar", spots: { fokonyv: [25, 74], pultos: [40, 45], poker: [88, 62] }, name: "Bár", desc: "Jazz zongora, cigarettafüst, Hartmann aktatáskája a bárszéken.",
      look: "Jazz zongora, cigarettafüst. A bárszéken [[Hartmann aktatáskája, nyitva maradt|fokonyv]]. A pult mögött [[a pultos poharat töröl|pultos]], a sarokban [[egy elhagyott pókerasztal|poker]].",
      decoys: { pultos: "„Hartmann úr fél tizenegytől éjfélig itt ült, három konyakot ivott, egyszer sem állt fel.”", poker: "Szétszórt zsetonok, egy kiterített flös. Valaki ma este sokat nyert." },
      items: [{ clue: "fokonyv", label: "Hartmann aktatáskája", text: "Kihúzod a táskából a vastag főkönyvet." }] },
    { id: "szemelyzet", spots: { mandzsetta: [30, 25], ledobo: [85, 75], anna: [45, 50] }, name: "Személyzeti folyosó", desc: "Szennyeskosarak, vasalódeszkák, a falon a szobalányok kötényei.",
      look: "Szennyeskosarak, vasalódeszkák, gőz és keményítőszag. [[A falon a szobalányok kötényei|mandzsetta]] lógnak. A sarokban [[a szennyesledobó nyílása|ledobo]], a vasalóban [[Anna, a másik szobalány|anna]] dolgozik.",
      decoys: { ledobo: "Lent a mosodában csak lepedők. Ha valaki ide dobott valamit, már rég elnyelte a gőz.", anna: "„Margit egész este velem vasalt. Amikor puffant, majdnem elejtette a vasalót.”" },
      items: [{ clue: "mandzsetta", label: "Margit köténye", text: "Valami fémes koccan Margit kötényzsebében." }] }
  ],

    deductions: [
    { id: "d-kivul", from: ["holttest", "eso"], t: "Kintről jött", x: "Vándor egész este ki sem lépett a szobájából, mégis friss, sáros nyomok vannak a szőnyegen. Az eső háromnegyed tizenegykor eredt el: a gyilkos kintről, az esőből érkezett.",
      text: "A sáros nyomokat nem ő hozta be, hiszen egész este ki sem lépett a szobájából: {}. Az eső ekkor kezdődött: {}. A gyilkos kintről, az esőből érkezett.", b: ["vandor", "t2245"] },
    { id: "d-szomszed", from: ["liftes", "kijarat"], t: "A szomszéd szobán át", x: "Az ázott férfi a negyediken nem a 412, hanem a 414 felé fordult. Az összekötő ajtó a 412 felől nyitva, a 414 felől zárva, a küszöbön sár. A gyilkos a 414-ből jött át, és oda tért vissza.",
      text: "Az ázott férfi ide ment: {}. Vándorhoz ezen át jutott be, és ugyanitt tért vissza: {}.", b: ["sz414", "osszekoto"] },
    { id: "d-tettes", from: ["d-szomszed", "derkes"], t: "A 414 vendége", x: "A gyilkos a 414-ből jött. A 414-et „Derkes Andor” vette ki, és ez a név Kardos Endre betűiből áll.",
      text: "A 414-es szobát ezen a néven vették ki: {}. A név mögött valójában ő áll: {}.", b: ["derkes", "kardos"] },
    { id: "d-lili", from: ["ido", "kozpont"], t: "Lili alibije", x: "A puffanás negyed tizenkettőkor hallatszott. Lili ekkor már negyedórája Béccsel beszélt a központon át, egészen 23:20-ig.",
      text: "A puffanás ekkor hallatszott: {}. Ugyanekkor {} {}, tehát nem lehetett a 412-ben.", b: ["t2315", "lili", "telefonal"] }
  ],
  events: [
    { id: "margit", after: 3, title: "Sikoly a személyzeti folyosóról",
      text: "Éles sikoly hasít a csendbe. Mire odaérsz, Margit a szennyesledobó előtt áll, falfehéren, a kezét a kötényzsebén tartja. Amikor meglát, kiejti a kezéből a seprűt, és szó nélkül elszalad a vasalószoba felé.\n\nAnna, a másik szobalány, csak a fejét csóválja: „Egész este ilyen. Valamit dugdos.”" },
    { id: "kardos", afterSolved: "kijarat", title: "Kardos az esőbe indul",
      text: "Amikor visszaérsz a hallba, Kardos Endre kalappal a fején, kabátban áll a forgóajtónál. Ferenczy elé ugrik: „A kapitány úr megtiltotta, hogy bárki elmenjen!”\n\nKardos lassan leveszi a kalapját. „Csak levegőzni akartam” mondja, de a keze remeg, és a kabátja még mindig nedves a válla körül." }
  ],

  fates: {
    lili: "A felbontott szerződés és a per elég indíték volt az esküdteknek. Lili utolsó fellépése a vádlottak padján zajlott; a bécsi impresszárió hiába várta.",
    hartmann: "A sikkasztott negyvenezer pengő mindenkit meggyőzött. Hartmannt gyilkosságért és csalásért ítélik el, a varietét bezárják.",
    margit: "A mandzsettagombok a zsebében voltak, és ez elég volt. Margitot elítélik, Anna vallomását senki sem hallgatja meg. Huszonkét évesen kerül a márianosztrai fegyházba.",
    ferenczy: "Ő adta ki a szobát, nála volt a pótkulcs. Ferenczyt húsz év szolgálat után letartóztatják; a szálloda a nevét is levakarja a dicsérő levélről."
  },
  puzzles: {
        naplo: {
      type: "log", title: "A központ naplója", reward: "hivas", answer: 3,
      body: `<p>A kezelőnő minden kapcsolást beírt a naplóba. Egyetlen sor nem illik bele senki vallomásába. Melyik az?</p>`,
      cols: ["Idő", "Hívó", "Hívott", "Időtartam"],
      rows: [
        ["22:41", "412", "Konyha", "1 perc"],
        ["22:52", "Porta", "307", "2 perc"],
        ["23:00", "418", "Bécs, távolsági", "20 perc"],
        ["23:05", "414", "412", "1 perc"],
        ["23:12", "210", "Porta", "1 perc"],
        ["23:21", "Porta", "105", "1 perc"],
        ["23:25", "418", "412", "nem jelentkezik"],
        ["23:31", "418", "Porta", "1 perc"]
      ],
      wrong: { 0: "Ez Vándor pezsgőrendelése.", 2: "Lili bécsi hívása, ahogy mondta.", 6: "Lili hívta Vándort, ahogy mondta.", 7: "Lili lerohan a portára, ahogy mondta." },
      hints: ["Lili a 418-ban lakik. Kinek a szobájából nem kellett volna ma este senkinek telefonálnia?"]
    },
szef: {
      type: "code", title: "A széf", reward: "szerzodes", answers: ["1924"], length: 4,
      body: `<p>A falba süllyesztett széf négyjegyű számzárral nyílik. Hartmann szerint Vándor minden kódot arra az évre állított, amikor a közönség először állva tapsolta.</p>
<p>A kandallópárkányon három bekeretezett színlap:</p>
<div class="typed">A KÉK LEPKE — Anno MCMXXII
(három előadás után levéve)

PESTI CSILLAGOK — Anno MCMXXIV
(„a közönség felállva ünnepelt” — Pesti Hírlap)

AZ UTOLSÓ TÁNC — Anno MCMXXXIII
(kétszázadik előadás)</div>`,
      wrong: "A tárcsa visszaugrik. Nem ez az év.",
      hints: [
        "Nem az első bemutató a kulcs, és nem is a leghosszabb sorozat. Mikor tapsolt állva a közönség?",
        "Római számok: M = 1000, CM = 900, XX = 20, IV = 4."
      ]
    },
    idorend: {
      type: "order", title: "Az este időrendje", reward: "ido",
      body: `<p>A szálloda dolgozói mind láttak valamit, de senki sem figyelt az órára. Rakd sorba az eseményeket a vallomások alapján.</p>`,
      facts: [
        "A konyhai cédula szerint Vándor 22:40-kor pezsgőt rendelt. A pincér húsz perc múlva vitte fel.",
        "A liftesfiú a nedves kabátos férfit tíz perccel azután vitte fel, hogy a pincér lejött a negyedikről.",
        "Margit szerint a puffanás akkor hallatszott, amikor a lift már rég újra lent járt.",
        "Margit szerint a puffanás után alig egy perccel retesz csattant, de nem a 412 ajtaján, hanem odébb.",
        "Lili azt mondja, negyedóra csengetés és várakozás után szólt a portásnak.",
        "A portás akkor ment fel, amikor Lili lerohant hozzá."
      ],
      items: [
        { id: "rendel", text: "Vándor pezsgőt rendel a szobájába" },
        { id: "pincer", text: "A pincér felviszi a tálcát, Vándor ingerülten átveszi" },
        { id: "lift", text: "A lift felvisz egy nedves kabátos férfit a negyedikre" },
        { id: "puff", text: "Tompa puffanás hallatszik a 412-ből" },
        { id: "retesz", text: "Reteszcsattanás hallatszik a folyosó végéről" },
        { id: "telefon", text: "Lili hiába hívja telefonon a 412-t" },
        { id: "porta", text: "A portás pótkulccsal kinyitja a 412-t" }
      ],
      initial: ["telefon", "puff", "porta", "rendel", "retesz", "lift", "pincer"],
      answer: ["rendel", "pincer", "lift", "puff", "retesz", "telefon", "porta"],
      hints: [
        "Kezdd a pezsgővel: azon van időpont. A többit ehhez képest helyezd el.",
        "A gyilkosság a lift után történt, a felfedezés pedig a két utolsó lépés."
      ]
    },
    anagramma: {
      type: "text", title: "A vendégkönyv", reward: "derkes", answers: ["Kardos Endre"], placeholder: "Vezetéknév Keresztnév",
      body: `<p>Ferenczy kelletlenül megmutatja a vendégkönyvet. A 414-es szobát aznap este egy bizonyos úr vette ki, aki készpénzzel fizetett, és soha többé nem jelent meg a pultnál:</p>
<div class="typed">414 · DERKES ANDOR · Budapest · 1 éj · fizetve</div>
<p>A portás vállat von: „Különös név. Mintha valaki csak összekeverte volna a betűket.” Kinek a valódi neve rejtőzik benne?</p>`,
      wrong: "Nem jön ki a betűkből. Számold meg őket újra.",
      hints: [
        "Anagramma: ugyanaz a tizenegy betű, más sorrendben. Egy gyanúsított nevére kell gondolni.",
        "Írd fel a betűket: D, E, R, K, E, S, A, N, D, O, R. Melyik gyanúsított nevében van két D és két R?"
      ]
    },
    kijarat: {
      type: "choice", title: "Az út kifelé", reward: "kijarat", answer: "B",
      body: `<p>A 412-es szoba ajtaja belülről volt bezárva, a kulcs a zárban. A gyilkosnak valahogy ki kellett jutnia. Hasonlítsd össze, amit a három lehetséges útvonalon találtál.</p>`,
      options: [
        { v: "A", label: "Az ablakon át a párkányra", sample: "Az ablak belülről bezárva. A keskeny párkányon sorban állnak a muskátlis cserepek, a nedves koromréteg érintetlen." },
        { v: "B", label: "Az összekötő ajtón a 414-be", sample: "A 412-es oldalon a retesz nyitva, a 414-es oldalon zárva. A küszöbön nedves sárfolt." },
        { v: "C", label: "A folyosói ajtón, pótkulccsal", sample: "A pótkulcs egész este a portán lógott a táblán, a portás csak 23:35-kor vette le." }
      ],
      confirm: "Erre ment ki",
      wrong: {
        A: "A korom érintetlen, a cserepek a helyükön. Erre senki sem járt.",
        C: "A pótkulcs a porta tábláján lógott, amíg a portás fel nem vitte."
      },
      hints: [
        "Az a helyes út, ahol a nyomok mozgást mutatnak, nem érintetlenséget.",
        "Egy retesz két oldalról is zárható. Melyik oldalon maradt nyitva?"
      ]
    }
  },

    accusation: {
    story: "A gyilkos: {}. Ezen a néven vette ki a szomszéd szobát: {}. Az esőben, egy {} nevű tárggyal a kezében érkezett.\nA 412-be ezen át jutott be: {}. Vándort egy {} ütésével ölte meg, aztán ugyanott visszament, és a saját oldalán bereteszelte az ajtót.\nIndítéka: {}.",
    b: ["kardos", "derkes", "irattarto", "osszekoto", "pallas", "darablopas"], who: [0]
  },

  plan: { w: 12, h: 8.6,
    rooms: { szoba412: [0, 0, 3, 3], szoba414: [3, 0, 3, 3], lili: [6, 0, 3, 3], szemelyzet: [9, 0, 3, 3], _folyoso: [0, 3, 12, 1.4, "Negyedik emeleti folyosó"], porta: [0, 5.6, 3, 3], kozpont: [3, 5.6, 2.4, 3], bar: [5.4, 5.6, 3.6, 3], lift: [9.6, 5.6, 2.4, 3] },
    doors: [[3, 1, 3, 2], [1, 3, 2, 3], [4, 3, 5, 3], [7, 3, 8, 3], [10, 3, 11, 3]],
    marks: [[3.1, 0.45, "összekötő ajtó"], [0.1, 5.35, "földszint"], [0.1, 0.25, "412"], [3.1, 2.8, "414"], [6.1, 0.25, "418"]],
    note: "Fent a negyedik emelet, lent a földszint. A lift köti össze a kettőt." },
  carnation: { letter: "E", found: "A 414-es szoba szekrényében, a nedves irattartóban egy préselt fekete szegfű és egy gépelt cédula. A jobb alsó sarkában pirossal bekarikázva egy betű.", note: "„⟪ido⟫ Szombaton Vándor a 412-ben száll meg. ⟪ajto⟫ A 414 szabad, és összekötő ajtó van köztük. ⟪vevo⟫ A darabod jogait jó áron megveszem. — F. Sz.”" },

  ending: {
    heading: "Kardos Endre volt az.",
    paragraphs: [
      "Négy éve Kardos odaadta Vándornak élete első darabját, „Az utolsó tánc”-ot. Vándor elutasította, aztán két évvel később a saját neve alatt mutatta be. A darab azóta telt házzal fut, Kardos pedig egy albérleti szobában írja a következőt.",
      "Aznap este Kardos esőben gyalogolt át a városon, és Derkes Andor néven kivette a 412 melletti szobát. Kopogott az összekötő ajtón. Vándor kinyitotta, mert azt hitte, a pincér jön vissza. A veszekedés után Kardos felkapta a bronz díjszobrot, a pénzt és a hírnevet jelképező Pallast.",
      "Visszament a 414-be, és a saját oldalán bereteszelte az ajtót. A 412-es oldali retesz nyitva maradt, és ezzel a zárt szoba rejtélye megoldódott. A betűkkel játszó név, a nedves irattartó és a kivakart kézirat elárulta. Lili pere, Hartmann sikkasztása és Margit lopása csak a szálloda többi titka volt."
    ]
  }
});
