/* English: Case 4 — Frost at the Hollós Patisserie */
(window.MM_EN = window.MM_EN || {})["hollos-cukraszda"] = {
  title: "Frost at the Hollós Patisserie",
  meta: "Budapest, Váci utca · 11 April 1933 · Case no. 1933/226",
  teaser: "The famous master confectioner is found dead in the morning in his own ice room, bolted from the outside. A name is written in the frost on the door's glass. But two people in the house share it, and a clue points at each of them.",
  intro: {
    eyebrow: "Budapest State Police · District IV headquarters",
    heading: "The death of Ernő Hollós in the ice room",
    lead: "At six in the morning on 12 April 1933, the apprentice at the Hollós patisserie found his master, the confectioner Ernő Hollós, in the ice room. The heavy oak door was bolted from the outside; there is no handle on the inside.",
    body: "The evening before, the staff had been shown the patisserie's new pride, the pistachio Hollós cake. Five people were in the house that night. One of them slid the bolt and left the master to spend the night among the ice. Then they made sure suspicion would fall on the other Béla."
  },
  suspects: {
    szendrei: { name: "Béla Szendrei", role: "Head pastry chef, 41. Fifteen years at Hollós's side.",
      stmt: "“I went home at half past nine, as always. The cake was finished, the cream perfect. Mr Hollós was pleased with me; he has been for fifteen years. I haven't even been in the kitchen yet this morning.”" },
    hollosbela: { name: "Béla Hollós", role: "The nephew, 27. Sole heir to the patisserie.",
      stmt: "“By nine I was at the card club, ask anyone. My uncle and I quarrelled, yes, but who doesn't quarrel with their relatives? I haven't set foot in the ice room in years.”" },
    anna: { name: "Anna Kertész", role: "Cashier, 35. Six years at the till.",
      stmt: "“At half past nine I closed the till and went home. Every penny in the till adds up, it always has. Mr Hollós was very good to me.”" },
    vilma: { name: "Vilma Hollós", role: "The master's wife, 55.",
      stmt: "“At a quarter past nine I saw Ernő in the kitchen, looking at the cake. Then I went home. Ernő would never have sold this shop; it was his life.”" },
    feher: { name: "György Fehér", role: "Night watchman, 66. Uncle Gyuri knows everyone on Váci utca.",
      stmt: "“At ten I heard the master say: ‘I'll just have another look at the cake in the ice.’ After that I was awake at my post all night; not a mouse stirred in the house.”" }
  },
  clues: {
    holttest: { t: "The ice room", src: "Ice room", x: "Hollós lay curled up beside the blocks of ice, without his coat. The doctor says he froze to death around midnight. The oak door was bolted from the outside; there is no handle on the inside. On the shelf stands the pistachio cake, with one slice missing." },
    der: { t: "The name in the frost", src: "Ice room · door window", x: "From inside, with his finger, Hollós wrote a first name on the door's small window: BÉLA. There are two Bélas at the patisserie: Béla Szendrei, the head pastry chef, and Béla Hollós, the nephew." },
    kartya: { t: "A playing card among the ice", src: "Ice room", x: "Among the blocks of ice, a playing card: the ace of hearts, dry and clean. There is not a single damp patch in the sawdust around it, although the ice was melting all night." },
    retesz: { t: "The cream on the bolt", src: "Kitchen", x: "On the handle of the bolt, crusted green pistachio cream mixed with flour, dried overnight. Only Béla Szendrei made the cream that evening, and his apron bears the same dry, flour-flecked stain." },
    szerzodes: { t: "The preliminary contract", src: "Office · safe", x: "A preliminary contract with Lánchíd Café Ltd.: tomorrow Hollós sells the patisserie and the staff are dismissed. Beside it, a note: “I won't tell Szendrei. For fifteen years I've promised him a partnership. He'll understand.”" },
    tavozas: { t: "Who went home when?", src: "Watchman's booth · timesheet", x: "Béla Hollós 21:00, Anna Kertész 21:30, Madame Vilma 21:45, Béla Szendrei 22:30. György Fehér stayed in all night. Hollós went down to the ice room at 22:00." },
    valtok: { t: "Béla Hollós's coat", src: "Changing room", x: "In Béla Hollós's coat, gambling IOUs for three thousand pengő. On the coat sleeve, a fresh, still-wet green cream stain, with no flour in it. The coat has hung on its hook since the evening." },
    penzkonyv: { t: "The corrected cash book", src: "Till", x: "Two amounts in the cash book have been corrected in a different ink. Beside the corrections, a tiny pencil note: “put back, 28 March.”" },
    palinka: { t: "The brandy bottle", src: "Watchman's booth", x: "In György Fehér's booth, a half-empty bottle of plum brandy, the glass knocked over. A deep dent in his chair; the lamp wick has burned right down." },
    vilmatask: { t: "Madame Vilma's bag", src: "Shop floor", x: "In Madame Vilma's bag, a copy of the preliminary contract, signed by her as a witness, dated a week ago." },
    arlap: { t: "The price list", src: "Shop floor", x: "On the wall, the spring price list: “Pistachio Hollós cake, 4 pengő. Its secret is the silky pistachio cream.”" }
  },
  contradictions: {
    "c-szendrei": { reveal: "Szendrei turns pale: “All right… I left later. I was clearing up, that's all. At ten the master went down; I didn't see him after that.”" },
    "c-szendrei2": { reveal: "Szendrei answers too quickly: “The boy must have smeared it in the kitchen; he touches everything.”" },
    "c-hollosbela": { reveal: "Béla Hollós looks at the card: “It's from my deck. My deck had been lying in the kitchen since yesterday afternoon; anyone could have taken it. I was at the club from nine until dawn, ten people will swear to it.”" },
    "c-anna": { reveal: "Anna bursts into tears: “I borrowed it for my mother's doctor. Two weeks later I put it back; Mr Hollós found out and forgave me. I really did go home at half past nine.”" },
    "c-vilma": { reveal: "Vilma says quietly: “I knew. I signed it too. We wanted to retire, Ernő wanted it too. I was ashamed to admit it.”" },
    "c-feher": { reveal: "Uncle Gyuri twists his cap: “After ten I nodded off, all right. I only woke at dawn. I didn't see who went towards the ice room.”" }
  },
    locations: {
    jegkamra: { name: "Ice room", desc: "Cold mist, blocks of ice in sawdust, cakes on the shelves. A small frosted glass window in the door.",
      look: "Cold mist, blocks of ice in sawdust, the drip of meltwater. [[Hollós is huddled beside the ice blocks|holttest]], as if he had tried to keep warm. On the shelf, [[the pistachio cake, one slice missing|torta]].\n\n[[Something red and white flashes in the sawdust between the ice blocks|kartya]]. In the corner, [[an overturned bucket|vodor]]. In the door, a small frosted glass window.",
      decoys: { torta: "The master cut the missing slice himself, to taste it. The doctor says there's no sign of poison.", vodor: "Icy water and a wooden spoon. Perhaps Hollós banged on the door with it." },
      items: { holttest: { label: "The master", text: "You kneel beside the master." },
               kartya: { label: "Between the ice blocks", text: "You pull it out of the sawdust." } } },
    muhely: { name: "Kitchen", desc: "Marble tables, copper pans, a row of aprons on the wall. Flour and icing sugar everywhere.",
      look: "Marble tables, copper pans, flour and icing sugar everywhere. [[In a copper pan|ust]], the remains of a green cream. A row of aprons on the wall; outside the ice-room door, [[the heavy iron bolt|retesz_]]. On the table, [[a rolling pin|sodrofa]].",
      decoys: { ust: "Pistachio cream thickened with flour. Szendrei's secret, says the apprentice: nobody else makes it like that.", retesz_: "A green stain on the handle. Whose it is, you'll have to compare with the stains on the clothes.", sodrofa: "Clean, in its place. Nobody was struck with it." } },
    iroda: { name: "Hollós's office", desc: "A desk, framed diplomas, a green-painted safe in the corner.",
      look: "A desk, [[framed diplomas|oklevel]] on the wall, a green-painted safe in the corner. On the desk, the recipe for the Hollós cake and [[a desk calendar|naptar]].",
      decoys: { oklevel: "Vienna 1911, Paris 1925, Budapest 1930. Only Hollós's name on each, though Szendrei has made the cakes for years.", naptar: "12 April: “Lánchíd Ltd, 10 o'clock, signing.” Underlined twice." } },
    portas: { name: "Night watchman's booth", desc: "A cramped booth by the back gate, the attendance sheet on the wall, a bottle on the table.",
      look: "A cramped booth by the back gate, the rain-soaked attendance sheet on the wall. [[On the table, a bottle and an overturned glass|palinka]]. On a nail, [[Uncle Gyuri's lantern|lampas]].",
      decoys: { lampas: "Cold, the glass sooty. Nobody made the rounds with it tonight." },
      items: { palinka: { label: "The table", text: "You sniff the glass." } } },
    kassza: { name: "Till", desc: "A brass cash register, a thick cash book, small change in the drawer.",
      look: "A brass cash register, [[the thick cash book|penzkonyv]], [[small change|apro]] in the drawer.",
      decoys: { apro: "Exactly what the till roll says it should be. Nobody touched it tonight." },
      items: { penzkonyv: { label: "The cash book", text: "You leaf through the last pages." } } },
    oltozo: { name: "Staff changing room", desc: "Coat hooks, lockers, an elegant man's coat among the aprons.",
      look: "Coat hooks, lockers, starched aprons. [[An elegant man's coat among the aprons|valtok]], something green on the sleeve. [[Szendrei's locker|szekreny]] stands open; on the bench, [[a pair of boots|csizma]].",
      decoys: { szekreny: "A clean shirt, a photograph of Hollós and Szendrei arm in arm in 1918. His apron is missing from its peg.", csizma: "The apprentice's. He came in at six this morning; he found the master." },
      items: { valtok: { label: "The elegant coat", text: "You go through Béla Hollós's coat." } } },
    uzlet: { name: "Shop", desc: "Mirrored walls, glass display cases, little marble tables. It was to have reopened tomorrow.",
      look: "Mirrored walls, glass display cases, little marble tables. On the counter, [[Madame Vilma's handbag|vilmatask]], forgotten when she rushed in this morning. Above the counter, [[the price list in a brass frame|arlap]]; in a display case, [[a swan cast in sugar|hattyu]].",
      decoys: { hattyu: "Szendrei's masterpiece from the Paris exhibition. Yet the plinth bears Hollós's name." },
      items: { vilmatask: { label: "Madame Vilma's handbag", text: "You look inside the bag." },
               arlap: { label: "The price list", text: "You read the calligraphy." } } }
  },
  deductions: {
    "d-csel": { t: "Morning clues", x: "The card is dry among ice that melted all night, and the cream on the coat is still wet, although the coat has hung on its hook since the evening. Both were placed this morning, to throw suspicion on Béla Hollós.",
      q: "What do the playing card and the cream on the coat have in common?", opts: ["Both point to Béla Hollós, so he is the killer.", "Both are fresh: someone placed them this morning to throw suspicion on Béla Hollós.", "Béla Hollós came back this morning and left them then."] },
    "d-egyedul": { t: "Alone in the house", x: "Hollós went down to the ice room at ten. By then only Szendrei and the night watchman were in the house, and after ten Uncle Gyuri was asleep from the pálinka. Szendrei stayed awake, alone, until half past ten.",
      q: "Who could have been awake in the house when Hollós went down to the ice room?", opts: ["Only Béla Szendrei: the others had left and the watchman was asleep.", "Uncle Gyuri, who was awake at his post all night.", "Madame Vilma, who turned back before the tram."] },
    "d-bela": { t: "Which Béla?", x: "The master wrote BÉLA in the frost. On the bolt is floury cream that got there in the evening and dried all night, and only Béla Szendrei made that; his apron bears the same stain.",
      q: "Which Béla do the two clues point to together?", opts: ["Béla Hollós, the nephew, who inherits.", "Neither: the name refers to the bakery.", "Béla Szendrei, the head confectioner."] },
    "d-vilma": { t: "Vilma knew", x: "Vilma signed the preliminary contract as a witness. She wanted the sale; her husband's death would have gained her nothing: the deal would have gone through anyway.",
      q: "What does this mean for Vilma?", opts: ["She had no reason to kill her husband: she wanted the sale herself.", "Vilma wanted to stop the sale.", "Vilma forged her husband's signature."] }
  },
  events: {
    unokaocs: { title: "Béla Hollós bursts in", text: "The back door slams. Béla Hollós stands there, hatless, his tie askew. “I heard what my uncle wrote! Béla? Don't you know how many Bélas there are in this city?”\n\nSzendrei watches from the kitchen doorway. He doesn't say a word, only wipes his hands on his apron, over and over." },
    koteny: { title: "Smoke from the kitchen", text: "A smell of burning. The kitchen oven door is open, and Béla Szendrei is pushing his apron into the flames with a poker.\n\nThe apprentice snatches it out before it burns. The green stain is still on it, scorched. Szendrei puts down the poker. “My apron is my own,” he says quietly." }
  },
  fates: {
    hollosbela: "The word BÉLA, the ace of hearts and the cream-stained coat fitted perfectly. The nephew is convicted; the inheritance he supposedly killed for is bought by Lánchíd Ltd for a song.",
    anna: "The corrected cash book was enough. Anna Kertész is convicted, and her sick mother never learns why she doesn't come home.",
    vilma: "The signed preliminary contract and the hidden sale convinced the court. Vilma is convicted of her husband's murder, and strangers reopen the shop.",
    feher: "He was in the house all night and couldn't say what he had seen. Uncle Gyuri is convicted; for years the Váci utca tells how the kindly old night watchman killed the master."
  },
puzzles: {
    der: {
      title: "Writing in the frost", placeholder: "What name did he write?",
      body: `<p>On the small window of the ice-room door, Hollós wrote something in the frost from the inside with his finger before he collapsed. You are looking from the outside:</p>
<div class="typed mirror">BÉLA</div>
<p>What name did the master write?</p>`,
      wrong: "That's not what he wrote. He wrote from the inside; you are looking from the outside.",
      hints: [
        "The letters are mirrored because they were written from the other side. Read them right to left.",
        "A four-letter man's name. Two people in the house have it."
      ]
    },
    retesz: {
      title: "The green stain",
      body: `<p>A green stain on the handle of the ice-room bolt: crusted pistachio cream mixed with flour. It had been drying all night. Four people have some stain on their clothes. Which one matches the stain on the bolt?</p>`,
      options: {
        A: { label: "Béla Hollós's coat sleeve", sample: "Fresh, still-wet green cream. No flour in it." },
        B: { label: "Béla Szendrei's apron", sample: "Dried, crusted green cream mixed with flour." },
        C: { label: "Anna Kertész's glove", sample: "A violet ink stain on the forefinger." },
        D: { label: "Madame Vilma's scarf", sample: "Icing sugar and a drop of raspberry sauce." }
      },
      confirm: "This one matches",
      wrong: "The stain doesn't match the one on the bolt. Look at what is in it, and how dry it is.",
      hints: [
        "The cream on the bolt dried all night, and there is flour in it.",
        "A fresh, wet stain could not have got there in the evening. Someone put it there this morning."
      ]
    },
    szef: {
      title: "The safe",
      body: `<p>The safe opens with a four-digit combination. Vilma says her husband always used to say: “The code is the cake's secret.” On the desk is the recipe for the Hollós cake, in the master's handwriting:</p>
<div class="typed">HOLLÓS CAKE
Sponge:  4 eggs, 6 dkg butter, 2 spoons honey, 8 dkg flour
Cream:   3 egg yolks, 9 dkg butter, 2 dl cream, 7 dkg pistachios
Glaze:   5 dkg chocolate, 1 dl cream, 8 dkg sugar, 4 dkg butter</div>`,
      wrong: "The lock won't give. One part of the recipe is the secret, but which?",
      hints: [
        "The recipe doesn't say which part is the secret. Look around the shop floor.",
        "The price list says the cake's secret is the cream. The cream quantities give the code, in order."
      ]
    },
    tavozas: {
      title: "The timesheet", columnLabel: "When did they leave?",
      body: `<p>Uncle Gyuri's timesheet got wet and the times have smudged. From the tobacconist opposite and the neighbours, work out who left the patisserie when. Everyone left at a different time, and one person stayed in all night.</p>`,
      facts: [
        "The night watchman never leaves the building at night.",
        "The tobacconist says that at nine sharp, at closing time, an elegant young man came out first, shuffling a deck of cards.",
        "The cashier closed the till as the Franciscan church struck half past nine. The till roll's last entry is from then too. She put on her coat straight after.",
        "The conductor punched Madame Vilma's ticket on the tram at a quarter past ten. It is half an hour from the patisserie to the stop.",
        "The tobacconist says that after half past nine only one man came out of the gate, much later, when the lamplighter was on his second round. He usually passes at half past ten."
      ],
      choices: ["21:00", "21:30", "21:45", "22:30", "In all night"],
      answer: { szendrei: "22:30", hollosbela: "21:00", anna: "21:30", vilma: "21:45", feher: "In all night" },
      hints: [
        "Work it out for Vilma: when did she have to set off to be on the tram at a quarter past ten?",
        "If the young man left at nine, the later man can only be the head pastry chef."
      ]
    }
  },
  accusation: {
    who: { legend: "Who locked the master in?", name: "the culprit" },
    how: { legend: "How did Hollós die?", name: "the method", options: { jeg: "He was bolted into the ice room from outside and froze", mereg: "He was poisoned with the pistachio cake", utes: "He was struck with a rolling pin" } },
    why: { legend: "Why did they do it?", name: "the motive", options: { orokseg: "To inherit the patisserie", eladas: "The secret sale and a promise broken for fifteen years", kassza: "To hide the money taken from the till", adossag: "Because of gambling debts" } },
    plant: { legend: "Which clue was meant to throw suspicion on the other Béla?", name: "the planted clue" }
  },
  carnation: { found: "In Szendrei's apron pocket, a pressed black carnation and a typed note. In its bottom right corner, a letter circled in red.", note: "“Tomorrow Hollós sells the shop to Lánchíd Ltd., and leaves you out. The ice-room bolt is on the outside. — F. Sz.”" },
  ending: {
    heading: "It was Béla Szendrei.",
    paragraphs: [
      "For fifteen years Hollós had promised his head pastry chef that one day he would be a partner in the patisserie. That evening, when Szendrei took the cake into the office, he saw the Lánchíd Ltd. contract on the desk: the next day Hollós would sell the shop and dismiss the staff.",
      "At ten Hollós went down to the ice room to look at the cake. Szendrei, with pistachio cream still on his hands, slid the bolt and did not go home until half past ten. By then Uncle Gyuri had dozed off over his brandy. Through the little window the master saw who had locked him in, and wrote the name in the frost, but only the first name.",
      "In the morning Szendrei realised that “BÉLA” could mean two people. He came in early, threw the nephew's ace of hearts among the ice and smeared fresh cream on the coat hanging on its hook. But the card was dry amid the melting ice, and the cream was still wet. The stain on the bolt had been drying all night, and that decided which Béla it was."
    ]
  },
  interviews: {
    szendrei: {
      s1: { q: "Who made the pistachio cream this evening?", a: "“I did, who else. It's the soul of the cake. Mr Hollós's recipe, of course. At least, his name is on it.”" },
      s2: { q: "What did the master promise you?", a: "“That one day I'd be a partner. He's been promising for fifteen years. Next year, always next year.”" },
      s3: { q: "Did you know the shop was being sold?", a: "Szendrei turns pale. “What sale? That… that can't be true.” But his voice says otherwise." }
    },
    hollosbela: {
      h1: { q: "What were you doing at the card club?", a: "“Losing, as always. Ten people saw me; I sat there until dawn. The deck I'd left in the kitchen in the afternoon was missing, too.”" },
      h2: { q: "When did you last wear your coat?", a: "“In the afternoon, when I came in. I hung it in the changing room and left it there, because my other one was at the club.”" }
    },
    anna: {
      a1: { q: "Who left last?", a: "“I left at half past nine; the master and Mr Szendrei were still in. And Madame Vilma, in the office.”" },
      a2: { q: "What is the secret of the till?", a: "“There's no secret. I took it, I put it back. Mr Hollós forgave me. He had no reason to be angry with me.”" }
    },
    vilma: {
      v1: { q: "How did you get home?", a: "“By tram, as always. The conductor knows me; he punches my ticket every evening.”" },
      v2: { q: "Did you know about the sale?", a: "“Yes. I signed it as a witness. Ernő was ashamed in front of the staff, so he kept it quiet.”" }
    },
    feher: {
      f1: { q: "What did you hear after ten?", a: "“The master going down to the ice room. Then silence. At that hour I like to… rest my eyes a little.”" },
      f2: { q: "Did you see who went out last?", a: "“I heard someone go out of the gate around half past ten. A man, with heavy steps. The lamplighter was passing then.”" }
    }
  },
  reveal: [
    { say: "The master wrote his killer's name in the frost: BÉLA. There are two Bélas in this house.",
      objection: "“Don't look at me! I was at the club!”",
      win: "True. Your card was thrown among the ice, but it stayed dry while the ice melted. Someone put it there this morning, not last night." },
    { say: "And the cream on his coat sleeve was still wet, with no flour in it. The cream on the bolt had been drying all night, mixed with flour.",
      objection: "“Everyone in this house has cream on them!”",
      win: "But only one apron has crusted, flour-flecked pistachio cream. Yours, Mr Szendrei. You made the only batch last night." },
    { say: "You said you went home at half past nine.",
      objection: "“That's right, like every evening!”",
      win: "At half past nine only the cashier went out. You left at half past ten, when the master was already down in the ice room." },
    { say: "Finally, why. After fifteen years of promises, the master had secretly sold the shop.",
      objection: "“Ernő never hurt anyone!”",
      win: "He didn't mean to. He just forgot to say. “I won't tell Szendrei. He'll understand.” Szendrei understood." }
  ],
  confession: "“The cake was mine. The recipe was mine. Fifteen years were mine. I only slid the bolt. I thought by morning he'd learn how cold it is to be left alone.”"
};
