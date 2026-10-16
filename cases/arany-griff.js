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
      stmt: "„Fél tizenegytől éjfélig a bárban ültem, a pultos mindent látott. A varieté könyvei rendben vannak, ha erre gondol. Harminc éve dolgozunk együtt Elemérrel.”" },
    { id: "margit", look: { hair: "bun", hat: "maid", clothes: "maid", lips: true }, name: "Szabó Margit", role: "Szobalány, 22 éves. Ő takarítja a negyedik emeletet.",
      stmt: "„A tompa puffanást én hallottam, a vasalószobából. Nem mentem be, féltem. A vendégek dolgaihoz soha nem nyúlok.”" },
    { id: "ferenczy", look: { hair: "short", hat: "cap", clothes: "uniform", acc: ["mustache"] }, name: "Ferenczy Pál", role: "Éjszakai portás, 56 éves. Húsz éve áll a pult mögött.",
      stmt: "„Egész este a pultnál álltam. A negyediken csak törzsvendégek laknak, idegen ma este nem ment fel, arra mérget veszek.”" },
    { id: "kardos", look: { hair: "short", hat: "fedora", clothes: "trench" }, name: "Kardos Endre", role: "Fiatal drámaíró, 31 éves. Vándor egyszer bemutatott tőle egy darabot.",
      stmt: "„Az egész estét a New York kávéházban töltöttem, a darabomon dolgoztam. Éjfél után értem haza, száraz lábbal: az eső csak hajnalban eredt el. Vándorral évek óta nem beszéltem.”" }
  ],

  clues: {
    eso: { t: "Az eső", src: "Porta", x: "A portás szerint háromnegyed tizenegykor szakadt le az eső, és éjfélig zuhogott. Az ernyőtartó azóta tele csöpögő esernyőkkel." },
    holttest: { t: "A holttest és a díjszobor", src: "412-es szoba", x: "Vándort egy bronz Pallas-szobor ütése ölte meg, a díjat 1930-ban kapta. A szobrot letörölték. Az ajtó belülről zárva, a kulcs a zárban. A szőnyegen nedves, sáros nyomok, pedig Vándor egész este ki sem lépett a szobájából." },
    szerzodes: { t: "Az ellopott darab", src: "412-es szoba · széf", x: "A széfben „Az utolsó tánc” kézirata. A borítón Vándor neve áll, de alatta, kivakarva, még olvasható az eredeti szerző: Kardos Endre. A darab most fut telt házzal, és minden bevétel Vándoré." },
    ido: { t: "Az este időrendje", src: "Lift és lépcsőház", x: "Az este sorrendje: Vándor pezsgőt rendel, a pincér felviszi, a lift egy nedves kabátos férfit visz a negyedikre, tompa puffanás a 412-ből (Margit szerint épp negyedet ütött a folyosói óra, negyed tizenkettőt), reteszcsattanás odébb a folyosón, Lili hiába telefonál, a portás benyit." },
    liftes: { t: "A liftesfiú vallomása", src: "Lift és lépcsőház", x: "„Csuromvizes volt a kabátja, mintha végiggyalogolt volna a rakparton. A kalapját a szemébe húzta, és egy kopott bőr irattartót szorongatott. A negyediken szállt ki, de nem ment a 412 felé, hanem jobbra fordult.”" },
    derkes: { t: "Derkes Andor nem létezik", src: "Porta · vendégkönyv", x: "A 414-es szobát aznap este készpénzért egy „Derkes Andor” vette ki, és soha többé nem jelent meg a pultnál. A név pontosan Kardos Endre betűiből áll." },
    kijarat: { t: "Az összekötő ajtó", src: "414-es szoba", x: "A 412 és 414 közötti összekötő ajtón a 412-es oldali retesz nyitva, a 414-es oldali zárva, a küszöbön nedves sárfolt. A 414-es szekrényben egy kopott, nedves bőr irattartó." },
    tavirat: { t: "Vándor táviratpiszkozata", src: "Lili szobája", x: "„Fodor kisasszony szerződését azonnali hatállyal felbontom, kártérítési per következik.” Vándor táviratának másolata Lili éjjeliszekrényén." },
    fokonyv: { t: "A titkos főkönyv", src: "Bár", x: "Hartmann aktatáskájában egy második főkönyv: két év alatt negyvenezer pengő tűnt el a varieté kasszájából." },
    mandzsetta: { t: "Az arany mandzsettagombok", src: "Személyzeti folyosó", x: "Margit kötényzsebében Vándor monogramos arany mandzsettagombjai." },
    kozpont: { t: "A telefonközpont naplója", src: "Lili vallomása", x: "A szálloda központja szerint Lili 23:00-tól 23:20-ig Béccsel beszélt, 23:25-kor pedig a 412-t hívta, eredménytelenül." }
  },

  contradictions: [
    {"id": "c-kardos", "suspect": "kardos", "clue": ["derkes"], "reveal": "Kardos sokáig hallgat. „Igen, én vettem ki a szobát. Beszélni akartam vele, az ajtón át. Nem engedett be. Aztán elmentem.”"},
    {"id": "c-kardos2", "suspect": "kardos", "clue": ["eso", "liftes"], "reveal": "Kardos keze ökölbe szorul: „Hát jó, eláztam. Gyalog jöttem a kávéházból. Ettől még nem vagyok gyilkos.”"},
    {"id": "c-hartmann", "suspect": "hartmann", "clue": ["fokonyv"], "reveal": "Hartmann leveszi a szemüvegét: „Kölcsönvettem. Vissza akartam tenni. Elemér nem tudott róla. De a bárból egy percre sem mozdultam, a pultos megmondja.”"},
    {"id": "c-margit", "suspect": "margit", "clue": ["mandzsetta"], "reveal": "Margit sírva fakad: „Délután vettem el, takarításkor. Annával voltam a vasalóban, amikor puffant, ő is megmondja.”"},
    {"id": "c-ferenczy", "suspect": "ferenczy", "clue": ["derkes"], "reveal": "Ferenczy izzad: „Készpénzzel fizetett, jó borravalót adott, nem kérdeztem semmit. Azt mondta, Derkes. Nem gondoltam, hogy baj lesz belőle.”"},
    {"id": "c-lili", "suspect": "lili", "clue": ["tavirat"], "lie": false, "gives": "kozpont", "reveal": "Lili felszegi a fejét: „Igen, perrel fenyegetett. De a központ megmondja: tizenegytől húsz percen át Béccsel beszéltem.”"}
  ],

    locations: [
    { id: "szoba412", name: "412-es szoba", desc: "Bordó tapéta, félig kiürült pezsgősüveg, a kandallópárkányon színlapok. Itt történt.",
      look: "Bordó tapéta, fülledt meleg. [[Vándor a kandalló előtt fekszik, mellette a bronz Pallas|holttest]]. Az asztalon [[egy félig kiürült pezsgősüveg és két pohár|pezsgo]], a kandallópárkányon bekeretezett színlapok, a falban egy számzáras széf.\n\nAz ablak előtt [[muskátlis cserepek a párkányon|ablak]]. A szoba túlsó falán egy [[keskeny, tapétázott ajtó|ajto]], mintha csak a fal része volna.",
      decoys: { pezsgo: "Csak az egyik pohárból ittak. A másik tiszta, a pincér hozta fel a tálcán, ahogy szokás.", ablak: "Az ablak belülről zárva, a párkányon érintetlen a korom.", ajto: "Összekötő ajtó a szomszéd szobába. Erről az oldalról nyitva a retesz. Hogy a túloldalon mi van, azt innen nem látod." },
      items: [{ clue: "holttest", label: "A holttest", text: "Letérdelsz Vándor mellé." }],
      puzzle: "szef" },
    { id: "lift", name: "Lift és lépcsőház", desc: "Kovácsoltvas liftkalitka, egyenruhás liftesfiú, a lépcsőn vörös szőnyeg.",
      look: "Kovácsoltvas liftkalitka, réztábla az emeletekkel. [[Az egyenruhás liftesfiú|liftes]] tizenhat éves, és nagyon szeretne segíteni. A lépcsőn [[vörös szőnyeg, rajta sötét foltok|folt]], a fordulóban [[egy hamutartó oszlop|hamu]].",
      decoys: { folt: "Vörösbor. A liftesfiú szerint egy vendég délután elejtett egy poharat.", hamu: "Szivarcsutkák, egy elhasznált jegy a Royal Orfeumba. Semmi, ami ide tartozna." },
      items: [{ clue: "liftes", label: "A liftesfiú", text: "Kikérdezed a fiút." }],
      puzzle: "idorend" },
    { id: "porta", name: "Porta", desc: "Mahagóni pult, kulcstábla, nyitott vendégkönyv. Ferenczy Pál idegesen igazgatja a nyakkendőjét.",
      look: "Mahagóni pult, mögötte a kulcstábla, a pulton nyitott vendégkönyv. Ferenczy Pál idegesen igazgatja a nyakkendőjét. Az ajtó mellett [[az ernyőtartó, alatta tócsa|eso]]. A falon [[egy keretezett levél|keret]], a pult szélén [[egy táviratblokk|blokk]].",
      decoys: { keret: "Hála Ferenczy úrnak húsz év hűséges szolgálatáért. A szálloda igazgatósága, 1932.", blokk: "Az utolsó lapon csak egy ceruzanyom: egy bécsi szám. Lili ma este is Bécset hívta." },
      items: [{ clue: "eso", label: "Az ernyőtartó", text: "Megkérdezed a portást, mikor kezdett esni." }],
      puzzle: "anagramma" },
    { id: "szoba414", name: "414-es szoba", desc: "A 412 szomszédja. Bevetetlen ágy, a hamutartóban egy félig szívott cigaretta.",
      look: "A 412 szomszédja. [[Bevetetlen ágy|agy]], az asztalon [[egy hamutartó, benne félig szívott cigaretta|cigi]]. Az ablakon csorog az eső.",
      decoys: { agy: "Senki sem feküdt benne. Aki kivette, nem aludni jött.", cigi: "Olcsó Symphonia, a végén harapásnyom. Valaki idegesen várt itt." },
      requires: "anagramma", puzzle: "kijarat" },
    { id: "lili", name: "Lili szobája", desc: "Virágcsokrok, parfümillat, az éjjeliszekrényen papírok.",
      look: "Virágcsokrok minden asztalon, nehéz parfümillat. [[Az éjjeliszekrényen gyűrött papírok|tavirat]]. A tükör előtt [[egy halom névjegy és szerelmes levél|nevjegy]], a fotelen [[egy flitteres ruha|ruha]].",
      decoys: { nevjegy: "Rajongók, bankárok, egy főhercegi titkár. Lilinek nem Vándor volt az egyetlen pártfogója.", ruha: "A ma esti fellépés ruhája. Lili le sem vetkőzött, amikor visszaért." },
      items: [{ clue: "tavirat", label: "Az éjjeliszekrény", text: "Kisimítod a gyűrött papírt." }] },
    { id: "bar", name: "Bár", desc: "Jazz zongora, cigarettafüst, Hartmann aktatáskája a bárszéken.",
      look: "Jazz zongora, cigarettafüst. A bárszéken [[Hartmann aktatáskája, nyitva maradt|fokonyv]]. A pult mögött [[a pultos poharat töröl|pultos]], a sarokban [[egy elhagyott pókerasztal|poker]].",
      decoys: { pultos: "„Hartmann úr fél tizenegytől éjfélig itt ült, három konyakot ivott, egyszer sem állt fel.”", poker: "Szétszórt zsetonok, egy kiterített flös. Valaki ma este sokat nyert." },
      items: [{ clue: "fokonyv", label: "Hartmann aktatáskája", text: "Kihúzod a táskából a vastag főkönyvet." }] },
    { id: "szemelyzet", name: "Személyzeti folyosó", desc: "Szennyeskosarak, vasalódeszkák, a falon a szobalányok kötényei.",
      look: "Szennyeskosarak, vasalódeszkák, gőz és keményítőszag. [[A falon a szobalányok kötényei|mandzsetta]] lógnak. A sarokban [[a szennyesledobó nyílása|ledobo]], a vasalóban [[Anna, a másik szobalány|anna]] dolgozik.",
      decoys: { ledobo: "Lent a mosodában csak lepedők. Ha valaki ide dobott valamit, már rég elnyelte a gőz.", anna: "„Margit egész este velem vasalt. Amikor puffant, majdnem elejtette a vasalót.”" },
      items: [{ clue: "mandzsetta", label: "Margit köténye", text: "Valami fémes koccan Margit kötényzsebében." }] }
  ],

  deductions: [
    { id: "d-kivul", from: ["holttest", "eso"], t: "Kintről jött", x: "Vándor egész este ki sem lépett a szobájából, mégis friss, sáros nyomok vannak a szőnyegen. Az eső háromnegyed tizenegykor eredt el: a gyilkos kintről, az esőből érkezett.",
      q: "Mire következtetsz a sáros nyomokból és az esőből?", ans: 2,
      opts: ["Vándor kiment a teraszra, és sárosan jött vissza.", "A szobalány takarításkor hordta be a sarat.", "A gyilkos kintről, az esőből érkezett, háromnegyed tizenegy után."] },
    { id: "d-szomszed", from: ["liftes", "kijarat"], t: "A szomszéd szobán át", x: "Az ázott férfi a negyediken nem a 412, hanem a 414 felé fordult. Az összekötő ajtó a 412 felől nyitva, a 414 felől zárva, a küszöbön sár. A gyilkos a 414-ből jött át, és oda tért vissza.",
      q: "Hogyan jutott be és ki a gyilkos?", ans: 0,
      opts: ["A 414-ből az összekötő ajtón át, és ugyanott vissza.", "A folyosóról, a portás pótkulcsával.", "Vándor engedte be a folyosói ajtón, aztán az ablakon távozott."] },
    { id: "d-tettes", from: ["d-szomszed", "derkes"], t: "A 414 vendége", x: "A gyilkos a 414-ből jött. A 414-et „Derkes Andor” vette ki, és ez a név Kardos Endre betűiből áll.",
      q: "Ki volt a 414 vendége?", ans: 1,
      opts: ["Hartmann, aki álnéven bérelt szobát a sikkasztott pénz rejtegetésére.", "Kardos Endre, Derkes Andor álnéven.", "Egy ismeretlen bécsi impresszárió, Lili barátja."] },
    { id: "d-lili", from: ["ido", "kozpont"], t: "Lili alibije", x: "A puffanás negyed tizenkettőkor hallatszott. Lili ekkor már negyedórája Béccsel beszélt a központon át, egészen 23:20-ig.",
      q: "Mit jelent ez Lilire nézve?", ans: 0,
      opts: ["Lili nem lehetett a 412-ben, amikor Vándort megölték.", "Lili a telefonhívással akart alibit szerezni, tehát ő a tettes.", "A központ naplója hamis, Lili lefizette a kezelőnőt."] }
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
    questions: [
      { id: "who", legend: "Ki a gyilkos?", name: "a tettes", from: "suspects", answer: "kardos", proof: ["d-tettes"] },
      { id: "how", legend: "Hogyan hagyta el a szobát?", name: "a menekülés útja", answer: "ajto", proof: ["d-szomszed", "kijarat"],
        options: [{ v: "ablak", label: "Az ablakon és a párkányon át" }, { v: "ajto", label: "Az összekötő ajtón a 414-es szobába" }, { v: "potkulcs", label: "A folyosón át, a portás pótkulcsával" }] },
      { id: "why", legend: "Miért ölt?", name: "az indíték", answer: "darab", proof: ["szerzodes"],
        options: [{ v: "szerzodes", label: "A felbontott szerződés és a per" }, { v: "sikkasztas", label: "A sikkasztás eltitkolása" }, { v: "darab", label: "Vándor ellopta és a sajátjaként vitte színre a darabját" }, { v: "lopas", label: "Rajtakapták egy lopáson" }] }
    ]
  },

  carnation: { letter: "E", found: "A 414-es szoba szekrényében, a nedves irattartóban egy préselt fekete szegfű és egy gépelt cédula. A jobb alsó sarkában pirossal bekarikázva egy betű.", note: "„Vándor szombaton a 412-ben száll meg. A 414 szabad, és összekötő ajtó van köztük. A darabod jogait jó áron megveszem. — F. Sz.”" },

  ending: {
    heading: "Kardos Endre volt az.",
    paragraphs: [
      "Négy éve Kardos odaadta Vándornak élete első darabját, „Az utolsó tánc”-ot. Vándor elutasította, aztán két évvel később a saját neve alatt mutatta be. A darab azóta telt házzal fut, Kardos pedig egy albérleti szobában írja a következőt.",
      "Aznap este Kardos esőben gyalogolt át a városon, és Derkes Andor néven kivette a 412 melletti szobát. Kopogott az összekötő ajtón. Vándor kinyitotta, mert azt hitte, a pincér jön vissza. A veszekedés után Kardos felkapta a bronz díjszobrot, a pénzt és a hírnevet jelképező Pallast.",
      "Visszament a 414-be, és a saját oldalán bereteszelte az ajtót. A 412-es oldali retesz nyitva maradt, és ezzel a zárt szoba rejtélye megoldódott. A betűkkel játszó név, a nedves irattartó és a kivakart kézirat elárulta. Lili pere, Hartmann sikkasztása és Margit lopása csak a szálloda többi titka volt."
    ]
  }
});
