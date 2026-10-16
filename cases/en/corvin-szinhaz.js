/* English: Case 5 — Final Curtain */
(window.MM_EN = window.MM_EN || {})["corvin-szinhaz"] = {
  title: "Final Curtain",
  meta: "Budapest, Corvin Theatre · 20 November 1937 · Case no. 1937/915",
  teaser: "During the closing duet a sandbag falls from the fly loft and kills the company's star. The director calls it an accident. But when the rope parted, everyone's alibi was perfect. Too perfect.",
  intro: {
    eyebrow: "Budapest State Police · Criminal Division",
    heading: "The death of Iván Sárközy on stage",
    lead: "At 22:41 on the evening of 20 November 1937, during the closing duet of The Viennese Nightingale, a twenty-kilo sandbag fell from the fly loft. Iván Sárközy, the Corvin Theatre's celebrated leading man, died instantly. His partner, Mimi Rácz, was standing one step away and escaped.",
    body: "The director says the rope was worn. The fly master swears it was sound that afternoon. At the fatal moment everyone was in plain sight: on stage, in the prompt box, in the auditorium. That is exactly what is suspicious."
  },
  suspects: {
    mimi: { name: "Mimi Rácz", role: "Prima donna, 28. Sárközy's stage partner, and rumour has it more than that.",
      stmt: "“I was standing right beside him! One step to the left and it would have taken me too. In the interval I rested in my dressing room, as always.”" },
    kalman: { name: "Ödön Kálmán", role: "The theatre's director and producer, 55.",
      stmt: "“A terrible accident. Only this afternoon I re-blocked the final scene so that Iván would stand on mark seven; the light is lovelier there. My God, if I had known…”" },
    vass: { name: "Tibor Vass", role: "Fly master, 48. Twenty-two years responsible for the scenery and the ropes.",
      stmt: "“My ropes don't break by themselves. I checked every one this afternoon. I was up there during the second act, but nobody touched the number-seven bag.”" },
    klara: { name: "Klára Lengyel", role: "Prompter, 60. Thirty years in the prompt box.",
      stmt: "“I see everything, my dear. From down there you see the actors' faces, not their backs. Just ask what you want to know.”" },
    bodo: { name: "Ferenc Bodó", role: "Sárközy's understudy, 30. For years he has sung in the second cast.",
      stmt: "“I know what you're thinking. Now I get the part. But in the interval I was practising scales in my dressing room; the whole corridor heard me.”" }
  },
  clues: {
    holttest: { t: "On the stage", src: "Stage", x: "Sárközy lies on mark seven, the burst sandbag beside him. The end of the rope that held the bag hangs down from above. Mimi Rácz was standing one step to the left of the mark when the bag fell." },
    kotel: { t: "The burned rope", src: "Fly loft", x: "The rope was not cut, and it was not worn either: it burned through. Its end is scorched, there are drops of wax beneath it, and the stub of a church candle is wired to the rail." },
    gyertya: { t: "When was the candle lit?", src: "Prop room", x: "The candle was lit at 20:41. The first interval lasted from 20:35 to 20:55." },
    szunet: { t: "Who was where in the first interval?", src: "Buffet · statements", x: "Pieced together from the statements, in the first interval: Tibor Vass in the buffet, Director Kálmán in his office, Klára Lengyel in the prompt box, Ferenc Bodó in his own dressing room, Mimi Rácz (dressing room locked, key at the stage door) in the fly loft." },
    felnezett: { t: "A contradiction in Mimi's statement", src: "Director's office · statement", x: "In her signed statement Mimi claimed she never looked up at the fly loft. The prompter says she looked up just before the fall and jumped to the left." },
    sugo: { t: "The prompter's observation", src: "Prompt box", x: "Klára Lengyel: “At the last verse of the duet Mimi looked up, straight at the fly loft, then practically jumped a step to the left. Thirty years I've been prompting, and I've never seen her do that.”" },
    level: { t: "Sárközy's letter", src: "Dressing rooms · Mimi's room", x: "On Mimi's make-up table, a letter from Sárközy: “Don't be angry, Mimi. Tomorrow I announce my engagement to Liza Kálmán. What there was between us is over. You knew it would end one day.”" },
    bodo: { t: "The understudy's contract", src: "Dressing rooms · Bodó's room", x: "Ferenc Bodó's contract: if Sárközy drops out for any reason, he sings the Vienna tour. The chorister next door says he heard scales from Bodó's dressing room throughout the interval." },
    vass: { t: "The IOU", src: "Buffet", x: "In Tibor Vass's pocket, an IOU for a thousand pengő, signed by Sárközy." },
    pletyka: { t: "The gossip column manuscript", src: "Prompt box", x: "In the prompt box, a manuscript: next week's gossip column for Színházi Élet. “Is it true that the Corvin's leading man is to marry the director's daughter, and that a certain prima donna will soon have a headache?”" },
    kalman: { t: "Sárközy's demand", src: "Director's office", x: "Sárközy's letter to the director: he demands double his fee, or from January he sings in Vienna." },
    hetes: { t: "Who asked for mark seven?", src: "Kálmán's statement", x: "Kálmán says that in the afternoon Mimi asked for Iván to stand on mark seven in the final scene, because the light is lovelier there. Sandbag seven hangs above mark seven." }
  },
  contradictions: {
    "c-mimi": { reveal: "Mimi flares up: “All right, I wasn't in my dressing room! I just… wanted some fresh air.” Where, she won't say." },
    "c-mimi2": { reveal: "Mimi turns pale: “Anyone looks up if something creaks!”" },
    "c-kalman": { reveal: "Kálmán sits down: “My daughter… Yes, I knew about the engagement. And mark seven wasn't my idea. Mimi asked this afternoon for Iván to stand there, because the light is lovelier.”" },
    "c-kalman2": { reveal: "“Yes, he wanted more. He always wanted more. But in the interval I was counting the takings with the accountant; ask him.”" },
    "c-vass": { reveal: "Vass shrugs: “I owed him, yes. But I spent the interval in the buffet and drank three spritzers. The barman will tell you.”" },
    "c-klara": { reveal: "Klára smiles: “Yes, I write it. That's how I know Iván meant to marry someone else. And who would have a headache over it.”" },
    "c-bodo": { reveal: "Bodó flushes: “Yes, now I get the tour. But I was singing scales live; the chorister heard me, it wasn't a gramophone.”" }
  },
    locations: {
    szinpad: { name: "Stage", desc: "A Viennese ballroom set, the curtain half lowered. The spotlight still shines on mark seven.",
      look: "A Viennese ballroom set, the curtain half lowered, the auditorium empty and dark. [[Sárközy lies on the chalked number seven|holttest]], beside him the burst sandbag. [[The spotlight|reflektor]] still shines on him. On the boards, [[a row of chalk marks|kreta]], one to twelve.",
      decoys: { reflektor: "Hot and blinding. Anyone looking this way can see nothing of the fly loft.", kreta: "The director's marks. The chalk on seven is fresher: it was redrawn this afternoon." },
      items: { holttest: { label: "Mark seven", text: "You examine the body and the sandbag." } } },
    zsinorpadlas: { name: "Fly loft", desc: "Narrow iron walkways above the stage, ropes, pulleys, a row of sandbags. A dizzying drop.",
      look: "Narrow iron walkways above the stage, a dizzying drop. [[Pulleys and ropes|csigak]] everywhere; along the rail, [[a row of sandbags, each with a number|zsakok]]. Where seven should be, only the rope hangs.",
      decoys: { csigak: "Well-oiled, well-kept pulleys. Tibor Vass knows his job.", zsakok: "Twelve bags, eleven in place. Each hangs exactly above the stage mark whose number it bears." } },
    kellektar: { name: "Props room", desc: "Candlesticks, swords, papier-mâché fruit, a box of church candles.",
      look: "Papier-mâché fruit, [[wooden swords in a barrel|kardok]], candlesticks, a box of church candles. On the table, [[the props master's list|lista]].",
      decoys: { kardok: "Wood, painted silver. None of them cuts.", lista: "“Church candles, 7 — Act III.” Someone has crossed out the seven and written 6." } },
    bufe: { name: "Buffet", desc: "Red plush, champagne glasses, the interval schedule on the wall. The barman is still at the counter.",
      look: "Red plush, champagne glasses; on the wall, [[the interval schedule|rend]]. The barman is still at the counter. On the coat stand, [[Tibor Vass's coat, a paper sticking out of the pocket|vass]].",
      decoys: { rend: "First interval: 20:35–20:55. Second interval: 21:50–22:05. The final duet begins at 22:38." },
      items: { vass: { label: "Tibor Vass's coat", text: "You pull the paper out of the pocket." } } },
    sugolyuk: { name: "Prompt box", desc: "A cramped little den at the front of the stage: a lamp, a chair and the prompt book.",
      look: "A cramped little den at the front of the stage; from here you see the actors' faces, not their backs. [[Klára Lengyel|sugo]] sits on the chair and is happy to talk. [[Under the prompt book, a typed manuscript|pletyka]] with corrections in the margin. [[The little lamp|lampa]] has a green shade.",
      decoys: { lampa: "It lights only the prompt book; it can't be seen from the auditorium." },
      items: { sugo: { label: "Klára Lengyel", text: "You ask her what she saw." },
               pletyka: { label: "Under the prompt book", text: "You read the manuscript." } } },
    oltozok: { name: "Dressing rooms", desc: "A long corridor, name plates on the doors, mirrors ringed with bulbs inside.",
      look: "A long corridor, name plates on the doors. [[On Mimi Rácz's dressing table|level]], powder, lipstick and a crumpled letter. [[In Ferenc Bodó's dressing room|bodo]], a pile of scores and a signed contract. In the corner, [[a gramophone|gramofon]].",
      decoys: { gramofon: "Thick with dust. Whoever sang scales tonight did it live." },
      items: { level: { label: "Mimi Rácz's dressing table", text: "You smooth out the crumpled letter." },
               bodo: { label: "Ferenc Bodó's dressing room", text: "You leaf through the contract." } } },
    iroda: { name: "Director's office", desc: "Posters on the walls, a telephone; the police are taking statements here.",
      look: "On the walls, [[posters|plakat]]; the police are taking statements here. [[On the director's desk|kalman]], letters, bills and one angrily underlined letter.",
      decoys: { plakat: "“Viennese Blood” — Iván Sárközy and Mimi Rácz. On the poster Mimi's name is printed smaller." },
      items: { kalman: { label: "The director's desk", text: "You read the underlined letter." } } }
  },
  deductions: {
    "d-idozito": { t: "A candle timer", x: "The rope was burned through by a candle wired beneath it and lit at 20:41, in the first interval. The killer did not need to be in the loft when the bag fell.",
      q: "What does this mean for the killer's alibi?", opts: ["The killer was in the fly loft when the bag fell.", "The killer could have been anywhere when it fell, even on stage: they only had to be up there in the first interval.", "The candle was left there by chance; the rope wore through."] },
    "d-padlas": { t: "Who was up there at 20:41?", x: "The candle was lit in the first interval. In the first interval only Mimi Rácz was in the fly loft.",
      q: "Who could have lit the candle?", opts: ["Mimi Rácz.", "Tibor Vass, the flyman.", "Ferenc Bodó, the understudy."] },
    "d-tudta": { t: "Mimi knew", x: "Just before the fall Mimi looked up and jumped one step to the left, out from under the bag. She knew when and where it would fall.",
      q: "What do you conclude from Mimi's movement?", opts: ["Mimi heard the creak and jumped instinctively.", "Mimi stepped left because of the spotlight.", "Mimi knew when and where the bag would fall."] },
    "d-hely": { t: "Who put him under the bag?", x: "Sandbag seven hung above mark seven, and it was Mimi who asked that afternoon for Iván to stand exactly there.",
      q: "At whose request did Iván stand on the fatal spot?", opts: ["Director Kálmán's, who restaged the scene for the light.", "Mimi's, who asked in the afternoon for Iván to stand on mark seven.", "Nobody's: the mark has been there for years."] }
  },
  events: {
    recseg: { title: "A creak overhead", text: "Something creaks above the dark stage. A lantern's light wavers in the fly loft, and a sandbag slowly sways.\n\nTibor Vass climbs down the ladder. “Just checking my ropes,” he says hoarsely. “Twenty-two years and not one has ever broken. Not one.”" },
    ajul: { title: "Mimi collapses", text: "When you say it aloud in the corridor, twenty forty-one, Mimi Rácz staggers at the far end of the dressing-room corridor and collapses in the doorway.\n\nDirector Kálmán rushes over, shouting for smelling salts. Mimi slowly opens her eyes, and the first place she looks is not at you but upwards, at the ceiling." }
  },
  fates: {
    kalman: "He restaged the scene, and his daughter's future was at stake. Ödön Kálmán is convicted, the Corvin Theatre is closed, and his daughter's engagement never takes place.",
    vass: "It was his rope, his fly loft, and he owed the victim money. Tibor Vass is convicted; after twenty-two years the first rope that ever broke drags him down with it.",
    klara: "She wrote the gossip column and she knew everything. The prompter is convicted, and in prison nobody cares what she saw from the prompt box.",
    bodo: "He got the part and the Vienna tour. Ferenc Bodó is convicted; in the end a third tenor sings the tour."
  },
puzzles: {
    kotel: {
      title: "The end of the rope",
      body: `<p>The end of the rope that held the number-seven sandbag hangs by the rail. The director says it was worn; the fly master says someone cut it. Look closely and choose.</p>`,
      options: {
        A: { label: "Worn through", sample: "A worn rope frays into long, uneven strands. But here the ends of the strands are all the same length." },
        B: { label: "Cut", sample: "A cut rope has a sharp, clean end. But here the ends of the strands are black and hard." },
        C: { label: "Burned through", sample: "The ends of the strands are scorched, with drops of wax on the catwalk below. A candle stub is wired to the rail." }
      },
      confirm: "That's how it parted",
      wrong: { A: "Worn strands are uneven. These are even and black.", B: "A cut leaves a clean mark. This end is scorched." },
      hints: [
        "Look at the colour of the rope's end, and what lies beneath it on the catwalk.",
        "Black, hard strand ends and drops of wax. What causes both?"
      ]
    },
    gyertya: {
      title: "The candle's timing",
      body: `<p>In the prop room, a box of church candles: six of them, each exactly 12 centimetres long. The seventh is missing. The stub found in the fly loft is 4 centimetres tall, and the rope was looped over the flame at exactly that height.</p>
<p>According to the label on the box, a candle like this burns down completely in three hours. The rope parted at 22:41.</p>
<p>When was the candle lit? Enter hours and minutes as four digits.</p>`,
      wrong: "It couldn't have been lit yet. Work out again how much burned down.",
      hints: [
        "Work out how many centimetres the candle burns per hour, and how much of it burned down.",
        "12 cm in three hours: 4 cm an hour. 8 cm burned down, that's two hours. Subtract it from 22:41."
      ]
    },
    szunet: {
      title: "The first interval", columnLabel: "Where between 20:35 and 20:55?",
      body: `<p>The candle was lit in the first interval. Who was where then? The barman, the accountant and several of the chorus have given statements. Everyone was somewhere different.</p>`,
      facts: [
        "The barman says Tibor Vass spent the whole interval with him and drank three spritzers.",
        "In the interval Director Kálmán was counting the takings in his office with the accountant.",
        "Klára Lengyel never leaves the prompt box, not even in the interval: her knees won't let her climb down the ladder.",
        "Scales could be heard from Ferenc Bodó's dressing room throughout the interval, and the chorister next door says it was a live voice.",
        "Mimi Rácz says she rested in her dressing room. But her dressing-room key hung at the stage door throughout the interval, and the door was locked."
      ],
      choices: ["Buffet", "Director's office", "Prompt box", "Own dressing room", "Fly loft"],
      answer: { mimi: "Fly loft", kalman: "Director's office", vass: "Buffet", klara: "Prompt box", bodo: "Own dressing room" },
      hints: [
        "Four people have witnesses. Start with them.",
        "If Mimi's dressing room was locked and the key hung at the stage door, where could she have been?"
      ]
    },
    vallomas: {
      title: "Mimi's statement",
      body: `<p>The police took down Mimi Rácz's statement about the fatal moment. One highlighted part of it is not true. Compare it with what you heard in the theatre and click the lie.</p>`,
      statement: "Iván and I were singing the last verse of the duet. [[He was standing on mark seven]], [[as we rehearsed this afternoon]]. [[As blocked]], I [[took one step to the left]], because that's where the bow comes. [[I never looked up at the fly loft]], since [[the spotlight blinds you at that moment]]. [[I only heard a great crash]], and Iván was already on the floor.",
      wrong: {
        0: "That's true: the body lay on mark seven.",
        1: "That's true: the director re-blocked the scene this afternoon.",
        2: "The director really did send her left for the bow.",
        3: "True, she stood one step to the left, which is why she survived.",
        5: "The spotlight really does blind you; nothing wrong there.",
        6: "That's true too: everyone heard the crash."
      },
      hints: [
        "From the prompt box you see the actors' faces, not their backs. What did Klára Lengyel say?",
        "Klára saw where Mimi was looking just before the fall."
      ]
    }
  },
  accusation: {
    who: { legend: "Who killed Iván Sárközy?", name: "the culprit" },
    how: { legend: "How did the rope part?", name: "the method", options: { vagas: "It was cut during the closing duet", gyertya: "A candle was wired beneath it in the first interval and burned through the rope", kopas: "It was worn and parted by itself" } },
    why: { legend: "Why did she do it?", name: "the motive", options: { feltekenyseg: "Sárközy was to announce his engagement to someone else the next day", turne: "To get the Vienna tour", adossag: "To avoid repaying a debt", gazsi: "Because of the demand for double pay" } }
  },
  carnation: { found: "In Mimi's powder compact, a pressed black carnation and a typed note. In its bottom right corner, a letter circled in red.", note: "“Tomorrow the engagement will be announced. In the interval the fly loft is empty, and there are church candles in the prop room. — F. Sz.”" },
  ending: {
    heading: "It was Mimi Rácz.",
    paragraphs: [
      "For years Mimi believed that Sárközy would one day marry her. That afternoon she learned that the next day he would announce his engagement to the director's daughter. At rehearsal she asked Kálmán to have Iván stand on mark seven, because the light was lovelier there. The director was happy to oblige.",
      "In the first interval, while everyone was in the buffet or their dressing rooms, Mimi climbed to the fly loft. She wired a church candle beneath the rope of the number-seven bag and lit it at 20:41. Two hours later, during the closing duet, the flame burned through the rope. By then Mimi was down on stage, in full view of the audience, with a perfect alibi.",
      "But she had to know when to step aside. From the prompt box Klára Lengyel saw her look up just before the fall, then jump to the left. The candle's timing, the locked dressing room and that upward glance gave her away. Vass's debt, Bodó's contract and the director's quarrel over fees were simply the theatre's other secrets."
    ]
  },
  interviews: {
    mimi: {
      m1: { q: "Who asked for Iván to stand on mark seven?", a: "“The director blocked it that way. The light is lovelier there.” She lifts her chin." },
      m2: { q: "Did you know about Iván's engagement?", a: "“I knew. He told me this afternoon. I congratulated him. What else could I do?”" },
      m3: { q: "Where were you in the interval?", a: "“In my dressing room. I always rest there.”" }
    },
    kalman: {
      k1: { q: "Why did you change the scene?", a: "“Mimi asked me this afternoon, and she was right: the light on mark seven is beautiful. A good director listens to his prima donna.”" },
      k2: { q: "What does the props master say about the candles?", a: "“The church candles? Six are left in the box; they're needed for the second act tomorrow. One missing? Odd.”" }
    },
    vass: {
      v1: { q: "Who can go up to the fly loft?", a: "“Anyone who isn't afraid of heights. The stairs start behind the flats and there's no lock. In the interval I was in the buffet; nobody was up there.”" },
      v2: { q: "What could be under a rope to burn it through?", a: "“A candle? It would burn slowly, but surely. It could take hours. Devilish.”" }
    },
    klara: {
      c1: { q: "What did you see from the prompt box?", a: "“Everything, my dear. The actors' faces. Mimi looked up at the fly loft before the last verse. Thirty years I've been prompting, and she's never done that.”" },
      c2: { q: "Who writes the gossip column in Színházi Élet?", a: "Klára smiles. “Somebody has to.”" }
    },
    bodo: {
      b1: { q: "Where were you in the interval?", a: "“Practising scales. The chorister next door complained she couldn't sleep for it. Live, not on a gramophone.”" },
      b2: { q: "What do you gain from Sárközy's death?", a: "“The Vienna tour. I know how that sounds. But I didn't want to get it like this.”" }
    }
  },
  reveal: [
    { say: "Ladies and gentlemen, the rope was not worn, and it was not cut. It was burned through.",
      objection: "“It was an accident! Old ropes, an old theatre!”",
      win: "The ends of the strands are scorched, with wax drops beneath and a candle stub wired to the rail. Someone put that there on purpose." },
    { say: "The candle burned for two hours. When the bag fell, everyone had a perfect alibi. But the candle was not lit then.",
      objection: "“Then when?”",
      win: "Two hours earlier, at 20:41, in the first interval. The alibis for the fatal moment are worth nothing." },
    { say: "In the first interval everyone was somewhere visible. Everyone but one.",
      objection: "“I was resting in my dressing room!”",
      win: "Your dressing room was locked; the key hung at the stage door throughout. You had only one place left: the fly loft." },
    { say: "And when the bag fell, you knew what was coming.",
      objection: "“I never looked up!”",
      win: "Klára Lengyel saw you look up, then jump to the left. You were the only one who knew when the rope would burn through." }
  ],
  confession: "“Seven years I waited for him to marry me. This afternoon he told me in a letter that he would marry someone else. I wanted him to die on the stage, where we loved each other so much. I stood one step aside. Just one step.”"
};
