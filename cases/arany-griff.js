/* 2. ügy — Halál az Arany Griffben (közepes) */
(window.MM_CASES = window.MM_CASES || []).push({
  id: "arany-griff",
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
      stmt: "„Elemér meg akart szabadulni tőlem, ezt mindenki tudta. De én egész este a szobámban voltam. Fél tizenkettőkor felhívtam, mert nem válaszolt, és megijedtem.”",
      extra: { after: "tavirat", text: "Vándor perrel fenyegette, de a telefonközpont igazolja: 23:00 és 23:20 között végig a saját szobájából telefonált Bécsbe." } },
    { id: "hartmann", look: { hair: "slick", clothes: "suit", acc: ["monocle", "mustache"] }, name: "Hartmann Viktor", role: "Üzlettárs, 48 éves. A varieté pénzügyeit viszi.",
      stmt: "„Elemér és én harminc éve dolgozunk együtt. Ma este a bárban voltam, a pultos mindent látott. Ha ellenségeket keres, nézze meg, kiket rúgott ki.”",
      extra: { after: "fokonyv", text: "Sikkasztott a varietéből, de 22:30-tól éjfélig a bárban ült, ezt a pultos és két vendég is igazolja." } },
    { id: "margit", look: { hair: "bun", hat: "maid", clothes: "maid", lips: true }, name: "Szabó Margit", role: "Szobalány, 22 éves. Ő takarítja a negyedik emeletet.",
      stmt: "„A tompa puffanást én hallottam, a vasalószobából. Nem mentem be, féltem. A vendégek dolgaihoz soha nem nyúlok.”",
      extra: { after: "mandzsetta", text: "Ellopta Vándor mandzsettagombjait, ezért hazudott. De a puffanáskor a vasalószobában volt egy másik lánnyal." } },
    { id: "ferenczy", look: { hair: "short", hat: "cap", clothes: "uniform", acc: ["mustache"] }, name: "Ferenczy Pál", role: "Éjszakai portás, 56 éves. Húsz éve áll a pult mögött.",
      stmt: "„Én nyitottam ki a 412-t, uram. Rémes látvány volt. Egész este a pultnál álltam, a vendégek láthattak.”",
      extra: { after: "derkes", text: "Egy „Derkes úrnak” adta ki a 414-es kulcsot, és a borravaló miatt nem kérdezett semmit. Nem gyilkos, csak hallgatott." } },
    { id: "kardos", look: { hair: "short", hat: "fedora", clothes: "trench" }, name: "Kardos Endre", role: "Fiatal drámaíró, 31 éves. Vándor egyszer bemutatott tőle egy darabot.",
      stmt: "„Az egész estét a New York kávéházban töltöttem, a darabomon dolgoztam. A szállodába csak most hívtak be. Vándorral régen nem beszéltem.”",
      extra: { after: "derkes", text: "Nem a kávéházban volt: álnéven kivette a 412 melletti szobát.", lie: true } }
  ],

  clues: {
    holttest: { t: "A holttest és a díjszobor", src: "412-es szoba", x: "Vándort egy bronz Pallas-szobor ütése ölte meg, amelyet 1930-ban kapott. A szobrot letörölték. Az ajtó belülről zárva, a kulcs a zárban. A szőnyegen egy elszakadt, nedves papírfecni: valaki esőből jött be." },
    szerzodes: { t: "Az ellopott darab", src: "412-es szoba · széf", x: "A széfben „Az utolsó tánc” kézirata. A borítón Vándor neve áll, de alatta, kivakarva, még olvasható az eredeti szerző: Kardos Endre. A darab most fut telt házzal, és minden bevétel Vándoré." },
    ido: { t: "Az este időrendje", src: "Lift és lépcsőház", x: "Vándor 22:40-kor pezsgőt rendelt, 23:00-kor még élt. 23:10-kor egy nedves kabátos, kalapos férfi bőr irattartóval a negyedikre ment. Néhány perccel később tompa puffanás hallatszott a 412-ből. Lili 23:30-kor telefonált, a portás 23:35-kor nyitott be." },
    liftes: { t: "A liftesfiú vallomása", src: "Lift és lépcsőház", x: "„Csuromvizes volt a kabátja, mintha végiggyalogolt volna a rakparton. A kalapját a szemébe húzta, és egy kopott bőr irattartót szorongatott. A negyediken szállt ki, de nem ment a 412 felé, hanem jobbra fordult.”" },
    derkes: { t: "Derkes Andor nem létezik", src: "Porta · vendégkönyv", x: "A 414-es szobát aznap este egy „Derkes Andor” vette ki készpénzért. A név Kardos Endre anagrammája: ugyanazok a betűk, más sorrendben." },
    kijarat: { t: "Az összekötő ajtó", src: "414-es szoba", x: "A 412 és 414 közötti összekötő ajtón a 412-es oldali retesz nyitva, a 414-es oldali zárva. A gyilkos a szomszéd szobából jött át, és oda is tért vissza, majd a saját oldalán bereteszelte az ajtót. A 414-es szekrényben egy kopott, nedves bőr irattartó." },
    tavirat: { t: "Vándor táviratpiszkozata", src: "Lili szobája", x: "„Fodor kisasszony szerződését azonnali hatállyal felbontom, kártérítési per következik.” Lili éjjeliszekrényén ott a másolat. Komoly indíték, de a telefonközpont szerint Lili 23:00 és 23:20 között Béccsel beszélt." },
    fokonyv: { t: "A titkos főkönyv", src: "Bár", x: "Hartmann aktatáskájában egy második főkönyv: két év alatt negyvenezer pengő tűnt el a varieté kasszájából. Vándor ezt még nem tudta. A pultos szerint Hartmann 22:30-tól éjfélig a bárban ült." },
    mandzsetta: { t: "Az arany mandzsettagombok", src: "Személyzeti folyosó", x: "Margit kötényzsebében Vándor monogramos mandzsettagombjai. Délután lopta el takarítás közben. A puffanáskor a vasalószobában volt Annával, a másik szobalánnyal." }
  },

  locations: [
    { id: "szoba412", name: "412-es szoba", desc: "Bordó tapéta, félig kiürült pezsgősüveg, a kandallópárkányon színlapok. Itt történt.",
      items: [{ clue: "holttest", label: "A holttest", text: "Vándor a kandalló előtt fekszik, mellette a bronz Pallas." }],
      puzzle: "szef" },
    { id: "lift", name: "Lift és lépcsőház", desc: "Kovácsoltvas liftkalitka, egyenruhás liftesfiú, a lépcsőn vörös szőnyeg.",
      items: [{ clue: "liftes", label: "A liftesfiú", text: "Tizenhat éves, és nagyon szeretne segíteni." }],
      puzzle: "idorend" },
    { id: "porta", name: "Porta", desc: "Mahagóni pult, kulcstábla, nyitott vendégkönyv. Ferenczy Pál idegesen igazgatja a nyakkendőjét.",
      puzzle: "anagramma" },
    { id: "szoba414", name: "414-es szoba", desc: "A 412 szomszédja. Bevetetlen ágy, a hamutartóban egy félig szívott cigaretta.",
      requires: "anagramma", puzzle: "kijarat" },
    { id: "lili", name: "Lili szobája", desc: "Virágcsokrok, parfümillat, az éjjeliszekrényen papírok.",
      items: [{ clue: "tavirat", label: "Az éjjeliszekrény", text: "Egy gyűrött táviratmásolat." }] },
    { id: "bar", name: "Bár", desc: "Jazz zongora, cigarettafüst, Hartmann aktatáskája a bárszéken.",
      items: [{ clue: "fokonyv", label: "Hartmann aktatáskája", text: "Nyitva maradt, kilóg belőle egy vastag főkönyv." }] },
    { id: "szemelyzet", name: "Személyzeti folyosó", desc: "Szennyeskosarak, vasalódeszkák, a falon a szobalányok kötényei.",
      items: [{ clue: "mandzsetta", label: "Margit köténye", text: "Valami fémes koccan a zsebében." }] }
  ],

  puzzles: {
    szef: {
      type: "code", title: "A széf", reward: "szerzodes", answers: ["1922"], length: 4,
      body: `<p>A falba süllyesztett széf négyjegyű számzárral nyílik. Hartmann szerint Vándor mindig „az első igazi estéje” évét használta kódnak.</p>
<p>A kandallópárkányon bekeretezett, megsárgult színlap:</p>
<div class="typed">PESTI VARIETÉ — ELSŐ BEMUTATÓ
Igazgató: VÁNDOR ELEMÉR
„A Kék Lepke”
Anno Domini MCMXXII</div>`,
      wrong: "A tárcsa visszaugrik. Nem ez az.",
      hints: [
        "A színlap alján lévő évszám a kulcs, csak le kell fordítani.",
        "Római számok: M = 1000, CM = 900, XX = 20, II = 2."
      ]
    },
    idorend: {
      type: "order", title: "Az este időrendje", reward: "ido",
      body: `<p>A szálloda dolgozói mind láttak valamit, de senki sem figyelt az órára. Rakd sorba az eseményeket a vallomások alapján.</p>`,
      facts: [
        "A konyhai cédula szerint Vándor 22:40-kor pezsgőt rendelt. A pincér húsz perc múlva vitte fel.",
        "A liftesfiú a nedves kabátos férfit tíz perccel azután vitte fel, hogy a pincér lejött a negyedikről.",
        "Margit szerint a puffanás akkor hallatszott, amikor a lift már rég újra lent járt.",
        "Lili azt mondja, negyedóra csengetés és várakozás után szólt a portásnak.",
        "A portás akkor ment fel, amikor Lili lerohant hozzá."
      ],
      items: [
        { id: "rendel", text: "Vándor pezsgőt rendel a szobájába" },
        { id: "pincer", text: "A pincér felviszi a tálcát, Vándor ingerülten átveszi" },
        { id: "lift", text: "A lift felvisz egy nedves kabátos férfit a negyedikre" },
        { id: "puff", text: "Tompa puffanás hallatszik a 412-ből" },
        { id: "telefon", text: "Lili hiába hívja telefonon a 412-t" },
        { id: "porta", text: "A portás pótkulccsal kinyitja a 412-t" }
      ],
      initial: ["puff", "porta", "rendel", "telefon", "lift", "pincer"],
      answer: ["rendel", "pincer", "lift", "puff", "telefon", "porta"],
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
      { id: "who", legend: "Ki a gyilkos?", name: "a tettes", from: "suspects", answer: "kardos" },
      { id: "how", legend: "Hogyan hagyta el a szobát?", name: "a menekülés útja", answer: "ajto",
        options: [{ v: "ablak", label: "Az ablakon és a párkányon át" }, { v: "ajto", label: "Az összekötő ajtón a 414-es szobába" }, { v: "potkulcs", label: "A folyosón át, a portás pótkulcsával" }] },
      { id: "why", legend: "Miért ölt?", name: "az indíték", answer: "darab",
        options: [{ v: "szerzodes", label: "A felbontott szerződés és a per" }, { v: "sikkasztas", label: "A sikkasztás eltitkolása" }, { v: "darab", label: "Vándor ellopta és a sajátjaként vitte színre a darabját" }, { v: "lopas", label: "Rajtakapták egy lopáson" }] }
    ]
  },

  ending: {
    heading: "Kardos Endre volt az.",
    paragraphs: [
      "Négy éve Kardos odaadta Vándornak élete első darabját, „Az utolsó tánc”-ot. Vándor elutasította, aztán két évvel később a saját neve alatt mutatta be. A darab azóta telt házzal fut, Kardos pedig egy albérleti szobában írja a következőt.",
      "Aznap este Kardos esőben gyalogolt át a városon, és Derkes Andor néven kivette a 412 melletti szobát. Kopogott az összekötő ajtón. Vándor kinyitotta, mert azt hitte, a pincér jön vissza. A veszekedés után Kardos felkapta a bronz díjszobrot, a pénzt és a hírnevet jelképező Pallast.",
      "Visszament a 414-be, és a saját oldalán bereteszelte az ajtót. A 412-es oldali retesz nyitva maradt, és ezzel a zárt szoba rejtélye megoldódott. A betűkkel játszó név, a nedves irattartó és a kivakart kézirat elárulta. Lili pere, Hartmann sikkasztása és Margit lopása csak a szálloda többi titka volt."
    ]
  }
});
