/* English: Case 1 — Murder at the Szegfű Villa */
(window.MM_EN = window.MM_EN || {})["szegfu-villa"] = {
  title: "Murder at the Szegfű Villa",
  meta: "Balatonfüred · 9 October 1931 · Case no. 1931/417",
  teaser: "On a stormy night a wealthy art collector, a baron, is found dead in his library. Five people are in the house, the road is blocked by fallen trees, and someone has already made sure suspicion falls elsewhere.",
  intro: {
    eyebrow: "Confidential · for the county police",
    heading: "The death of Baron Aurél Kendeffy",
    lead: "On Friday 9 October 1931, at ten in the evening, Baron Aurél Kendeffy was found dead in the library of his villa at Balatonfüred, on Lake Balaton. A storm raged outside and fallen trees blocked the road: nobody could leave the house.",
    body: "You, a private detective from Budapest who happens to be staying at the villa, are asked to find the truth by morning, when the gendarmes arrive. Five people were in the house. Each of them has a secret, and one of them is a killer."
  },
  suspects: {
    matild: { name: "Matild Kendeffy", role: "The widow, 29. The baron's second wife.",
      stmt: "“Aurél and I quarrelled in the afternoon, and after that I never left my room. I had a headache, the doctor gave me something and I fell asleep. I didn't set foot in the library all day.”" },
    gabor: { name: "Gábor Kendeffy", role: "The nephew, 34. First in line for the inheritance.",
      stmt: "“After dinner I played the piano in the drawing room, Chopin, all evening. I had a small argument with my uncle in the library in the afternoon, but in the evening I didn't go near it.”" },
    szirmai: { name: "Dr. Ottó Szirmai", role: "Family doctor, 52. An old friend.",
      stmt: "“From half past nine I was outside by the greenhouse having a cigar; Madame Matild can't bear smoke indoors. At ten I looked in on her, she was asleep. My bag was in the hall all evening, nothing is missing from it.”" },
    ilona: { name: "Ilona Bakos", role: "The baron's secretary, 31. She has handled the collection's paperwork for four years.",
      stmt: "“After dinner I went up to my room and typed all evening: I was making fair copies of the baron's letters. I never came downstairs.”" },
    lukacs: { name: "János Lukács", role: "Butler, 61. Thirty years in the family's service.",
      stmt: "“At half past nine I poured the baron's cognac in the library, as every evening, then went back to the kitchen and the silver. In the afternoon Mr Gábor and I searched the library for his cufflink, under the armchair too, but we didn't find it.”" }
  },
  clues: {
    holttest: { t: "A smell of bitter almonds", src: "Library", x: "The baron sits in his armchair, a half-empty cognac glass before him. A faint smell of bitter almonds rises from the glass. Dr. Szirmai says cyanide poisoning; death was instant, around ten o'clock." },
    mandzsetta: { t: "A cufflink under the armchair", src: "Library", x: "Under the armchair, close to the glass, a gold cufflink with the monogram K. G. It is shiny, with no dust on it, although the rug beneath it is dusty." },
    telefon: { t: "The telephone call", src: "Hall", x: "According to the exchange operator, the baron spoke to Budapest on the hall telephone from 21:30 to 21:55. At the end of the call he said: “Tomorrow I'll tell you everything.”" },
    taska: { t: "The doctor's bag", src: "Hall", x: "In Dr. Szirmai's bag one slot of the velvet holder is empty: a morphine ampoule is missing. There is no cyanide or anything containing cyanide in the bag, and none in his records." },
    zalog: { t: "Pawn tickets", src: "Guest room", x: "In Gábor's coat pocket, three Budapest pawn tickets: a gold watch, a cigarette case and a silver-topped walking stick. The last was pawned two weeks ago." },
    levelk: { t: "A love letter", src: "Upstairs rooms", x: "In Matild's drawer, an unsigned, adoring letter from a Budapest painter: “If you leave him, I'll be waiting for you in Paris in the spring.”" },
    ilonaszoba: { t: "Ilona's room", src: "Upstairs rooms", x: "In Ilona's upstairs room: a bed, a wardrobe, a washstand and a small table. There is no typewriter and never has been: in this house, typing is only done in the ground-floor office." },
    kertesz: { t: "The gardener's statement", src: "Greenhouse", x: "The gardener says only one person went into the greenhouse that afternoon: the young lady secretary, who cut flowers for the baron's desk. Between half past nine and ten someone smoked at the entrance, but did not go in." },
    darazs: { t: "The greenhouse wasp killer", src: "Greenhouse", x: "On the third shelf, the lid of a tin labelled “Wasp killer — POISON” (potassium cyanide) sits loose, with a fresh mark in the dust. In front of the shelf, the print of a narrow woman's high-heeled shoe." },
    level: { t: "The baron's unsent letter", src: "Library · desk", x: "“To the Police Headquarters! Over the past two years five paintings in my collection have been swapped for forgeries and the originals sold. The bills of sale were typed in this house. Tomorrow, 10 October, I shall name the culprit in person. — Aurél Kendeffy”" },
    gep: { t: "The typewriter of the false receipt", src: "Office", x: "The false receipt was not typed on the office's new Remington but on the old Continental kept in the locked cabinet. Only Ilona has the cabinet key. In the cabinet, two more receipts from the same machine: a Mednyánszky for 6,000 and a Szinyei for 9,000 pengő." },
    alibi: { t: "Who was where between 21:30 and 22:00?", src: "Drawing room · statements", x: "The timeline pieced together from the statements, half past nine to ten: Lukács in the kitchen, Dr. Szirmai by the greenhouse, Gábor in the drawing room, Matild upstairs, Ilona Bakos in the library." },
    jegyzet: { t: "Ilona's coded note", src: "Upstairs rooms · pocket diary", x: "Deciphered: “Greenhouse, third shelf. Cognac after half past nine, while he is on the phone.” From Ilona's pocket diary, on the day of the murder." },
    kereses: { t: "The afternoon search", src: "Gábor's statement", x: "In the afternoon, after the argument, Gábor and Lukács searched the whole library for the lost cufflink, under the armchair too. It wasn't there then." },
    hamu: { t: "Burnt paper in the stove", src: "Office", x: "In the office stove, a half-burnt typed sheet: “…ánszky, oil on canvas… 6,0…” On the corridor rug, a wet, narrow woman's shoeprint leads to the office door." }
  },
  contradictions: {
    "c-ilona": { reveal: "Ilona turns pale: “All right… I wasn't typing. I was downstairs, sorting the collection's papers in the library. But I never touched the cognac!”" },
    "c-gabor": { reveal: "Gábor looks surprised: “That's mine, I lost it in the afternoon during the argument. Lukács and I turned the whole library upside down for it, under the armchair too.”" },
    "c-szirmai": { reveal: "Szirmai lowers his eyes: “I gave it to Madame Matild at nine, she begged me, she wanted to sleep. I didn't record it. If this gets out I'll lose my licence.”" },
    "c-matild": { reveal: "Matild flushes: “Yes, I wanted to divorce him, that's what we argued about. If I had wanted to kill him, why would I have written to my lawyer this afternoon?”" }
  },
  locations: {
    konyvtar: { name: "Library", desc: "Leather armchairs, oak shelves, a storm outside. The baron died here.",
      look: "Leather armchairs, oak shelves, rain drumming on the tall windows. The baron [[sits in his armchair, a cut-crystal cognac glass on the side table before him|holttest]], as if he had merely dozed off.\n\nIn the fireplace, [[dying embers|kandallo]]. On the wall between the shelves, [[an empty picture frame|keret]]. The desk drawer has a four-digit combination lock. In a flash of lightning [[something glints on the rug beside the leg of the armchair|mandzsetta]].",
      decoys: { kandallo: "Only ash and a half-burnt log. Nobody burned paper here tonight.", keret: "The wallpaper is paler under the frame. Lukács says the baron sent the painting to a restorer last week." },
      items: { holttest: { label: "The body and the glass", text: "You lean closer to the glass." },
               mandzsetta: { label: "Under the armchair", text: "You kneel on the rug." } } },
    hall: { name: "Hall", desc: "Marble floor, a grandfather clock, and the only telephone in the house on the wall.",
      look: "Marble floor, the grandfather clock ticking. On the wall, the house's only [[telephone, with the exchange's call list beside it|telefon]]. On the coat stand hang [[Dr. Szirmai's black medical bag|taska]] and [[a soaked umbrella|ernyo]]. The hands of the [[grandfather clock|ora]] creep towards eleven.",
      decoys: { ernyo: "The doctor's umbrella, still dripping. He really was outside with it this evening.", ora: "It runs five minutes slow. Lukács says it always has; the baron liked it that way." },
      items: { telefon: { label: "The telephone", text: "You ring the exchange. The operator remembers when she put the baron through." },
               taska: { label: "Dr. Szirmai's bag", text: "You open the doctor's bag." } } },
    titkarsag: { name: "Office", desc: "A cramped ground-floor office: filing cabinets, a new Remington and a locked cabinet.",
      look: "A cramped office: filing cabinets, [[a new Remington|rem]] on the desk, a locked cabinet in the corner. [[The wastepaper basket|kosar]] is empty, and the [[stove|hamu]] is still warm.",
      decoys: { rem: "Its ribbon was changed yesterday. Its test line is below.", kosar: "Empty. Someone emptied it this evening, though the cleaner only comes on Mondays." },
      items: { hamu: { label: "The stove", text: "You open the stove door." } } },
    szalon: { name: "Drawing room", desc: "The guests gathered here before the police arrived. The piano lid is open.",
      look: "The guests wait here in silence. The [[piano lid is open|zongora]], a Chopin nocturne on the music stand. [[On the coffee table, an ashtray|hamutal]] full of cigarette ends.",
      decoys: { zongora: "Pencil marks on the score at the same run, twice.", hamutal: "Cigarettes, not cigars. Gábor's brand." } },
    emelet: { name: "Upstairs rooms", desc: "Bedrooms at the top of the stairs: the baron and baroness's, the guests' and the secretary's.",
      look: "A long corridor, bedrooms at the top of the stairs. [[In Matild's room the chest of drawers stands half open|levelk]], scented notepaper on the table. [[Ilona's room|ilonaszoba]] is tidy, almost empty; the corner of a pocket diary pokes out from under the pillow.\n\nIn the baron's bedroom [[the medicine cabinet|gyogyszer]] stands open. At the end of the corridor [[an open window|ablak]] bangs in the wind.",
      decoys: { gyogyszer: "Heart drops and aspirin. No trace of poison.", ablak: "Rain has blown in; the sill is wet. Below, only the dark garden, and no sign of a ladder." },
      items: { levelk: { label: "Matild's drawer", text: "A scented envelope under the lingerie." },
               ilonaszoba: { label: "Ilona's room", text: "You look around the secretary's room." } } },
    vendeg: { name: "Guest room", desc: "Gábor's room: a rumpled bed, a coat on the chair.",
      look: "Gábor's room. A rumpled bed, and on the chair [[a coat with papers poking out of the inside pocket|zalog]]. On the bedside table [[a half-empty whisky bottle|whisky]], on the floor [[an open suitcase|borond]].",
      decoys: { whisky: "Cheap Scotch. Gábor's tastes are humbler than his uncle's.", borond: "Shirts, a razor and a borrowed tailcoat. Gábor wasn't planning a long stay." },
      items: { zalog: { label: "Gábor's coat", text: "You go through the coat pockets." } } },
    uveghaz: { name: "Greenhouse", desc: "Humid heat, orchids, garden tools and chemicals in the corner.",
      look: "Humid heat, orchids, garden tools in the corner. [[On the chemicals shelf|darazs]] stand rows of tins; on the third shelf, a label with a skull. The old [[gardener worries about his seedlings even in the storm|kertesz]].\n\nIn front of the entrance, [[cigar ash on the gravel|szivar]]. On the table, [[a bunch of freshly cut orchids|orchidea]].",
      decoys: { szivar: "Havana cigar ash. Someone stood here a long while, but no footprints lead inside across the wet gravel.", orchidea: "Cut this afternoon for the baron's desk. The secateurs are still lying here." },
      items: { darazs: { label: "The chemicals shelf", text: "You examine the third shelf." },
               kertesz: { label: "The gardener", text: "You ask the gardener who has been here today." } } }
  },
  deductions: {
    "d-ido": { t: "The time of the poisoning", x: "The baron died instantly, around ten, and was on the phone until 21:55. So the poison went into the cognac between 21:30 and 21:55, while the glass stood unattended.",
      q: "What do the two tell you together?", opts: ["The baron was poisoned in the hall, during the call.", "The poison went into the cognac between 21:30 and 21:55, while the baron was on the phone.", "The baron drank the poison before he made the call."] },
    "d-mereg": { t: "Who took the poison?", x: "Only one person went into the greenhouse in the afternoon, a woman, and a woman's shoeprint is in front of the wasp killer. The secretary took the cyanide that afternoon.",
      q: "Who could have taken the cyanide from the greenhouse?", opts: ["The doctor, while smoking by the greenhouse in the evening.", "The gardener, who has access to everything.", "The secretary, when she cut flowers in the afternoon."] },
    "d-alibi": { t: "Ilona's false alibi", x: "Ilona says she typed in her room all evening, but there is no typewriter there, and the timeline puts her in the library, where the cognac stood.",
      q: "What do you conclude?", opts: ["Ilona is lying: she wasn't in her room but in the library.", "Ilona typed in the office and simply misremembers.", "The timeline is wrong, because Ilona can't play the piano."] },
    "d-hamis": { t: "The forger", x: "The baron meant to name the typist of the false receipts the next day. They were typed on the Continental in the locked cabinet, and only Ilona has its key.",
      q: "Whom did the baron mean to name the next day?", opts: ["Gábor, who sold the paintings because of his debts.", "Ilona, because only she had access to the Continental.", "Nobody: the baron forged them himself for the insurance."] },
    "d-csel": { t: "A planted cufflink", x: "It wasn't under the armchair in the afternoon, yet it was there in the evening, free of dust. Someone placed it after the murder to throw suspicion on Gábor.",
      q: "What does this mean for the cufflink?", opts: ["Someone put it there later to throw suspicion on Gábor.", "Gábor went back to the library in the evening and dropped it.", "It was there all along; they just missed it in the afternoon."] }
  },
  events: {
    aram: { title: "The lights go out", text: "The moment the drawer opens, thunder cracks overhead and the villa goes dark. In the blackness, quick footsteps in the corridor, a door slams, somewhere paper crackles.\n\nBy the time Lukács brings a candle, the office door stands ajar and smoke is rising from the stove. Someone tried to destroy something, and was in a hurry." }
  },
  fates: {
    matild: "The love letter and the afternoon quarrel were enough for the prosecution. Matild is convicted of murder; the painter waits for her in Paris in vain that spring.",
    gabor: "The cufflink and the pawn tickets convinced the jury. Gábor is sentenced to life, and never sees the inheritance he supposedly killed for.",
    szirmai: "The missing morphine ampoule settled it. Dr. Szirmai is convicted, struck off by the medical chamber, and never sees the villa again.",
    lukacs: "He had poured the cognac, and that was enough. After thirty years of service Lukács leaves the house in handcuffs, and dies in prison."
  },
  puzzles: {
    desk: {
      title: "The desk combination lock",
      body: `<p>The baron's desk drawer opens with a four-digit combination lock. Lukács says his master set every lock to the same day: the day he first set eyes on Katalin, his first wife.</p>
<p>Two framed photographs stand on the desk. One shows Matild, captioned: “For Matild, on our wedding day. 9 Oct 1929.” The other shows a young couple among pigeons; on the back:</p>
<div class="typed">Venice, St Mark's Square, 14 May 1920.
A year ago today, right here, I first saw you. — K.</div>`,
      wrong: "The lock clicks but does not open.",
      afterSolve: "<p>Under the letter lies a typed bill of sale. Worth comparing with the typewriters in the house: the office is now open.</p>",
      hints: [
        "It is not Matild, and not the year of the photograph either. Katalin writes: a year ago today.",
        "The first meeting has the same day and month as the photograph, just a year earlier. Four digits: day, then month."
      ]
    },
    type: {
      title: "The typewriters",
      body: `<p>According to the receipt found in the baron's drawer, the Munkácsy painting was “sold”. The typing has three peculiarities. Compare it with the test line from each of the four typewriters in the house, letter by letter. (The receipt is in Hungarian; look at the shapes, not the words.)</p>
<div class="typed">ADÁSVETELI NYUGTA
Munkácsy M.: Poros út, ol<span class="r">a</span>j, vászon.
<span class="r">A</span> vetelár<span class="r">a</span>t, l4 000 pengőt keszpenzben átvettem.
Bud<span class="r">a</span>pest, l93l. VI. 2.</div>`,
      options: {
        A: { label: "The library Underwood (the baron's)" },
        B: { label: "Gábor's portable" },
        C: { label: "The office's new Remington" },
        D: { label: "Old Continental from the office's locked cabinet" }
      },
      confirm: "This machine",
      wrong: "Not every peculiarity matches. Check letter by letter, numbers included.",
      hints: [
        "Watch three things: the accented é, the height of the a, and the numbers.",
        "Old typewriters had no 1 key; a small letter l was typed instead."
      ]
    },
    alibi: {
      title: "The statements", columnLabel: "Where between 21:30 and 22:00?",
      body: `<p>The cognac stood unattended between half past nine and ten. Use the witnesses' words to work out who was where.</p>`,
      facts: [
        "Five people were in five different places in the villa.",
        "Teréz, the cook: “After half past nine the only person with me in the kitchen was the one who had poured the cognac. He polished the silver and never moved.”",
        "The gardener saw the glow of a cigar at the greenhouse entrance. A stethoscope hung out of the smoker's pocket.",
        "Piano music came from the drawing room the whole time. The pianist fluffed the same run twice and started again. A gramophone record doesn't make mistakes.",
        "Only two people in the house can play the piano: Gábor and the doctor.",
        "At ten the doctor looked in on the baroness: she was fast asleep upstairs, where she had been lying since nine."
      ],
      choices: ["Drawing room", "Kitchen", "Greenhouse", "Upstairs rooms", "Library"],
      answer: { lukacs: "Kitchen", szirmai: "Greenhouse", gabor: "Drawing room", matild: "Upstairs rooms", ilona: "Library" },
      hints: [
        "Start with the butler and the smoker. If the doctor was outside, who could have been at the piano?",
        "If everyone was somewhere different and Matild was asleep upstairs, Ilona has only one place left, whatever she claims."
      ]
    },
    cipher: {
      title: "The pocket diary",
      plain: "GREENHOUSE, THIRD SHELF. COGNAC AFTER HALF PAST NINE, WHILE HE IS ON THE PHONE.",
      body: `<p>A pocket diary under Ilona's pillow. On the page for 9 October, a single line of gibberish. Pencilled inside the cover:</p>
<div class="typed">“Key: the one I sold for the most.”</div>
<p>The letters are shifted by a keyword, letter by letter. Once you have the keyword, type it in.</p>`,
      hints: [
        "Ilona sold paintings. You will find the receipts in the office's locked cabinet.",
        "Compare the amounts on all three receipts. The name of the most expensive painter is the key, without accents."
      ]
    }
  },
  accusation: {
    who: { legend: "Who is the killer?", name: "the culprit" },
    how: { legend: "How did they kill?", name: "the method", options: { morfium: "Morphine from the doctor's bag", cian: "Cyanide from the greenhouse wasp killer", altato: "Sleeping draught from Matild's bedside table" } },
    why: { legend: "Why?", name: "the motive", options: { orokseg: "To get the inheritance", feltekenyseg: "Jealousy, a betrayed marriage", hamisitas: "To stop the art forgery being exposed", adossag: "Mounting gambling debts" } },
    plant: { legend: "Which clue was planted to throw suspicion on someone else?", name: "the planted clue" }
  },
  carnation: { found: "Folded into Ilona's pocket diary, next to the keyword, lay a pressed black carnation and a typed note. In its bottom right corner, a letter circled in red.", note: "“The baron knows. Tomorrow he goes to the police. The wasp killer is on the third shelf of the greenhouse. I shall go on buying the Munkácsys. — F. Sz.”" },
  ending: {
    heading: "It was Ilona Bakos.",
    paragraphs: [
      "For four years Ilona handled the papers of the baron's collection. Painting by painting she replaced the originals with skilful forgeries, sold the originals, and typed the receipts on the old Continental whose cabinet key only she had.",
      "The baron discovered the fraud and wrote to the police. Ilona knew she had only one evening left. In the afternoon, while cutting flowers, she took the cyanide from the third shelf of the greenhouse. That same afternoon she picked up Gábor's lost cufflink from the floor. In the evening, while the baron was on the phone in the hall, she slipped into the library, tipped the poison into the cognac and dropped the cufflink under the armchair.",
      "She claimed to have spent the evening typing in her room, but there had never been a typewriter there. The cufflink would have pointed at Gábor, except that he and Lukács had searched that very spot in the afternoon. Szirmai's morphine, Gábor's debts and Matild's letter were simply the house's other secrets."
    ]
  },
  interviews: {
    matild: {
      m1: { q: "Why did you quarrel this afternoon?", a: "“I told him I was leaving him. He said he first had to put something right in the collection, then we would talk. The collection always came first.”" },
      m2: { q: "Who gave you medicine this evening?", a: "“The doctor. He brought it up at nine, in a little glass of water. After that I remember nothing.”" },
      m3: { q: "Who is the painter who wrote that letter?", a: "“That's none of your business. But if you must know: in the spring I'm going to him in Paris. I wanted to leave Aurél alive, not dead.”" }
    },
    gabor: {
      g1: { q: "What did you argue with your uncle about?", a: "“Money, what else. He said I wouldn't get another penny. Then he muttered something about forgeries, but I wasn't listening.”" },
      g2: { q: "When did you lose your cufflink?", a: "“In the afternoon, during the argument. Lukács and I looked for it together at four, under the armchair too. It wasn't there, I swear.”" },
      g3: { q: "Who else was in the library this afternoon?", a: "“The secretary, carrying papers in and out as usual. She brought my uncle a bunch of flowers too, from the greenhouse.”" }
    },
    szirmai: {
      s1: { q: "What did you see while you smoked?", a: "“Rain. And the gardener covering his seedlings. I didn't go into the greenhouse, the chemical smell chokes me.”" },
      s2: { q: "Do you know about poisons, doctor?", a: "“As much as any doctor. The smell of bitter almonds means cyanide. Gardeners use potassium cyanide against wasps; you can get it anywhere.”" },
      s3: { q: "Where did the ampoule go?", a: "“A little morphine kills nobody, at most it puts them to sleep. It wasn't morphine in the baron's cognac, I can tell by the smell.”" }
    },
    ilona: {
      i1: { q: "How long have you handled the collection's paperwork?", a: "“Four years. Every receipt and letter passes through my hands. The baron trusted me.”" },
      i2: { q: "Were you in the greenhouse today?", a: "“In the afternoon I cut a few flowers for the baron's desk. That's all.”" },
      i3: { q: "How many typewriters are there in the house?", a: "“A few. I haven't counted them. Nobody has used the old Continental in years.” She answers a little too quickly." }
    },
    lukacs: {
      l1: { q: "After you poured the cognac, who stayed near the library?", a: "“Nobody, sir. The baron went to the hall to telephone, I went to the kitchen. I didn't lock the door, we never do.”" },
      l2: { q: "What do you know about the secretary?", a: "“A hard-working girl. She often works down in the office late at night. Up in her room? She couldn't type there, there's nothing there at all.”" },
      l3: { q: "Are you sure the cufflink wasn't under the chair this afternoon?", a: "“I looked on my knees, sir, with the lamp. If it had been there, I'd have found it. I've cleaned that room for thirty years.”" }
    }
  },
  reveal: [
    { say: "Ladies and gentlemen, the baron did not simply collapse. He drank cyanide, tipped into his cognac between half past nine and ten while he was on the telephone in the hall.",
      objection: "“But my cufflink was under the chair! Surely you don't think…”",
      win: "No, my dear Gábor. Someone put your cufflink there later: in the afternoon you and Lukács searched that very spot. It is a planted clue." },
    { say: "Whoever planted the cufflink also poured the poison. Between half past nine and ten, someone saw every one of you. Every one but one.",
      objection: "“I was upstairs typing in my room, all evening!”",
      win: "There is no typewriter in your room, Miss Bakos. There never was. At half past nine you could only have been in one place: the library." },
    { say: "The poison came from the greenhouse. The wasp-killer lid was loose, and in front of it, the print of a narrow woman's shoe.",
      objection: "“Anyone could have gone in there!”",
      win: "The gardener says only one person went in that afternoon: you, to cut flowers. And your own pocket diary says it: third shelf, cognac after half past nine." },
    { say: "And why? The baron had discovered that his paintings had been swapped for forgeries, and tomorrow he meant to name the culprit.",
      objection: "“You can't prove that. Anyone can type a receipt!”",
      win: "Not anyone. The false receipts were typed on the old Continental, and only you have the key to its cabinet." }
  ],
  confession: "“Four years… four years of him admiring his paintings while I typed his receipts. Just once I wanted something beautiful for myself. I don't regret it. Only that I was caught.”"
};
