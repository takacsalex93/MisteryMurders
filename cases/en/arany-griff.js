/* English: Case 2 — Death at the Golden Griffin */
(window.MM_EN = window.MM_EN || {})["arany-griff"] = {
  title: "Death at the Golden Griffin",
  meta: "Budapest · 3 March 1934 · Case no. 1934/88",
  teaser: "A celebrated theatre impresario is found dead in his hotel room, locked from the inside. The key is in the lock, the window four floors up. How did the killer get out?",
  intro: {
    eyebrow: "Budapest State Police · Criminal Division",
    heading: "The death of Elemér Vándor in Room 412",
    lead: "At half past eleven on Saturday night, 3 March 1934, the night porter of the Hotel Golden Griffin opened Room 412 with the spare key. Elemér Vándor, director of the Pest Variety Theatre, lay dead on the carpet, his own bronze award statuette beside him.",
    body: "The door was locked from the inside, the key in the lock. Below the window, a forty-metre drop to the Danube embankment. The police are calling it a locked-room mystery. You know there is no such thing: someone left that room, we just don't know where yet."
  },
  suspects: {
    lili: { name: "Lili Fodor", role: "Prima donna, 27. Vándor's star, and rumour has it more than that.",
      stmt: "“Elemér wanted to be rid of me, everyone knew that. But I was in my room all evening. After eleven I telephoned Vienna, and at half past eleven I rang him because he wasn't answering. Then I told the porter.”" },
    hartmann: { name: "Viktor Hartmann", role: "Business partner, 48. Runs the theatre's finances.",
      stmt: "“From half past ten until midnight I sat in the bar; the barman saw everything. The theatre's books are in order, if that's what you're thinking. Elemér and I have worked together for thirty years.”" },
    margit: { name: "Margit Szabó", role: "Chambermaid, 22. She cleans the fourth floor.",
      stmt: "“I'm the one who heard the thud, from the ironing room. I didn't go in, I was frightened. I never touch the guests' things.”" },
    ferenczy: { name: "Pál Ferenczy", role: "Night porter, 56. Twenty years behind the desk.",
      stmt: "“I stood at the desk all evening. Only regulars stay on the fourth floor; no stranger went up tonight, I'd stake my life on it.”" },
    kardos: { name: "Endre Kardos", role: "Young playwright, 31. Vándor once staged one of his plays.",
      stmt: "“I spent the whole evening at the New York café working on my play. I got home after midnight with dry feet: the rain only started at dawn. I haven't spoken to Vándor in years.”" }
  },
  clues: {
    eso: { t: "The rain", src: "Front desk", x: "The porter says the rain came down at a quarter to eleven and poured until midnight. Since then the umbrella stand has been full of dripping umbrellas." },
    holttest: { t: "The body and the statuette", src: "Room 412", x: "Vándor was killed by a blow from a bronze statuette of Pallas Athena, an award he received in 1930. The statuette has been wiped. The door was locked from the inside, the key in the lock. On the carpet, wet, muddy footprints, although Vándor never left his room all evening." },
    szerzodes: { t: "The stolen play", src: "Room 412 · safe", x: "In the safe, the manuscript of “The Last Dance”. Vándor's name is on the cover, but underneath, scratched out yet still legible, is the original author: Endre Kardos. The play is running to full houses, and every penny goes to Vándor." },
    ido: { t: "The evening's timeline", src: "Lift and stairwell", x: "The order of the evening: Vándor orders champagne, the waiter takes it up, the lift carries a man in a wet coat to the fourth floor, a dull thud from 412, a bolt clicks further down the corridor, Lili telephones in vain, the porter opens the door." },
    liftes: { t: "The lift boy's statement", src: "Lift and stairwell", x: "“His coat was soaking, as if he'd walked the whole embankment. He had his hat pulled down over his eyes and clutched a shabby leather document case. He got out on the fourth, but he didn't go towards 412, he turned right.”" },
    derkes: { t: "Andor Derkes does not exist", src: "Front desk · register", x: "That evening Room 414 was taken for cash by an “Andor Derkes”, who never came back to the desk. The name is made of exactly the letters of Endre Kardos." },
    kijarat: { t: "The connecting door", src: "Room 414", x: "On the connecting door between 412 and 414, the bolt on the 412 side is open, the one on the 414 side shut. The killer came through from the next room, went back the same way and bolted the door on his own side. In the wardrobe of 414, a shabby, wet leather document case." },
    tavirat: { t: "Vándor's draft telegram", src: "Lili's room", x: "“I hereby terminate Miss Fodor's contract with immediate effect; a claim for damages will follow.” A copy of Vándor's telegram on Lili's bedside table." },
    fokonyv: { t: "The secret ledger", src: "Bar", x: "In Hartmann's briefcase, a second ledger: over two years, forty thousand pengő has vanished from the theatre's till." },
    mandzsetta: { t: "The gold cufflinks", src: "Staff corridor", x: "In Margit's apron pocket, Vándor's monogrammed gold cufflinks." }
  },
  contradictions: {
    "c-kardos": { reveal: "Kardos is silent for a long time. “Yes, I took the room. I wanted to talk to him through the door. He wouldn't let me in. Then I left.”" },
    "c-kardos2": { reveal: "Kardos clenches his fist: “All right, I got soaked. I walked from the café. That doesn't make me a murderer.”" },
    "c-hartmann": { reveal: "Hartmann takes off his glasses: “I borrowed it. I meant to put it back. Elemér didn't know. But I never left the bar for a minute; the barman will tell you.”" },
    "c-margit": { reveal: "Margit bursts into tears: “I took them in the afternoon, while cleaning. I was in the ironing room with Anna when it thudded, she'll tell you too.”" },
    "c-ferenczy": { reveal: "Ferenczy sweats: “He paid cash, tipped well, I didn't ask questions. Said his name was Derkes. I didn't think it would lead to trouble.”" },
    "c-lili": { reveal: "Lili lifts her chin: “Yes, he threatened me with a lawsuit. But the exchange will tell you: from eleven I spent twenty minutes on the line to Vienna.”" }
  },
  locations: {
    szoba412: { name: "Room 412", desc: "Burgundy wallpaper, a half-empty champagne bottle, playbills on the mantelpiece. It happened here.",
      items: { holttest: { label: "The body", text: "Vándor lies in front of the fireplace, the bronze Pallas beside him." } } },
    lift: { name: "Lift and stairwell", desc: "A wrought-iron lift cage, a uniformed lift boy, red carpet on the stairs.",
      items: { liftes: { label: "The lift boy", text: "Sixteen years old and very eager to help." } } },
    porta: { name: "Front desk", desc: "A mahogany counter, a key board, an open register. Pál Ferenczy nervously straightens his tie.",
      items: { eso: { label: "The umbrella stand", text: "Full of dripping umbrellas, a puddle beneath." } } },
    szoba414: { name: "Room 414", desc: "Next door to 412. The bed unslept in, a half-smoked cigarette in the ashtray." },
    lili: { name: "Lili's room", desc: "Bouquets of flowers, the smell of perfume, papers on the bedside table.",
      items: { tavirat: { label: "The bedside table", text: "A crumpled copy of a telegram." } } },
    bar: { name: "Bar", desc: "A jazz piano, cigarette smoke, Hartmann's briefcase on a bar stool.",
      items: { fokonyv: { label: "Hartmann's briefcase", text: "Left open, a thick ledger sticking out." } } },
    szemelyzet: { name: "Staff corridor", desc: "Laundry baskets, ironing boards, the maids' aprons on the wall.",
      items: { mandzsetta: { label: "Margit's apron", text: "Something metallic clinks in the pocket." } } }
  },
  puzzles: {
    szef: {
      title: "The safe",
      body: `<p>The wall safe opens with a four-digit combination. Hartmann says Vándor set every code to the year an audience first gave him a standing ovation.</p>
<p>Three framed playbills on the mantelpiece:</p>
<div class="typed">THE BLUE BUTTERFLY — Anno MCMXXII
(closed after three performances)

STARS OF PEST — Anno MCMXXIV
(“the audience rose to its feet” — Pesti Hírlap)

THE LAST DANCE — Anno MCMXXXIII
(two hundredth performance)</div>`,
      wrong: "The dial springs back. Wrong year.",
      hints: [
        "It is not the first premiere, nor the longest run. When did the audience stand to applaud?",
        "Roman numerals: M = 1000, CM = 900, XX = 20, IV = 4."
      ]
    },
    idorend: {
      title: "The evening's timeline",
      body: `<p>Everyone on the hotel staff saw something, but nobody was watching the clock. Put the events in order from the statements.</p>`,
      facts: [
        "According to the kitchen chit, Vándor ordered champagne at 22:40. The waiter took it up twenty minutes later.",
        "The lift boy took the man in the wet coat up ten minutes after the waiter came down from the fourth floor.",
        "Margit says the thud came when the lift had long since gone back down.",
        "Margit says barely a minute after the thud a bolt clicked, not on the door of 412 but further along.",
        "Lili says she told the porter after a quarter of an hour of ringing and waiting.",
        "The porter went up when Lili came running down to him."
      ],
      items: { rendel: "Vándor orders champagne to his room", pincer: "The waiter takes up the tray; Vándor snatches it irritably", lift: "The lift takes a man in a wet coat to the fourth floor", puff: "A dull thud from Room 412", retesz: "A bolt clicks at the end of the corridor", telefon: "Lili rings Room 412 in vain", porta: "The porter opens 412 with the spare key" },
      hints: [
        "Start with the champagne: that has a time. Place everything else relative to it.",
        "The murder came after the lift, and the discovery takes the last two steps."
      ]
    },
    anagramma: {
      title: "The hotel register", placeholder: "First name Surname",
      body: `<p>Ferenczy reluctantly shows you the register. Room 414 was taken that evening by a certain gentleman who paid cash and never came back to the desk:</p>
<div class="typed">414 · DERKES ANDOR · Budapest · 1 night · paid</div>
<p>The porter shrugs: “Odd name. As if someone had just shuffled the letters.” Whose real name is hidden in it?</p>`,
      wrong: "The letters don't work. Count them again.",
      hints: [
        "An anagram: the same eleven letters in a different order. Think of one of the suspects.",
        "Write out the letters: D, E, R, K, E, S, A, N, D, O, R. Which suspect's name has two Ds and two Rs?"
      ]
    },
    kijarat: {
      title: "The way out",
      body: `<p>The door of Room 412 was locked from the inside, the key in the lock. The killer had to get out somehow. Compare what you found along the three possible routes.</p>`,
      options: {
        A: { label: "Through the window onto the ledge", sample: "The window is latched on the inside. On the narrow ledge, geranium pots stand in a row; the damp layer of soot is untouched." },
        B: { label: "Through the connecting door into 414", sample: "On the 412 side the bolt is open, on the 414 side it is shut. A wet smear of mud on the threshold." },
        C: { label: "Through the corridor door, with a spare key", sample: "The spare key hung on the board at the desk all evening; the porter only took it down at 23:35." }
      },
      confirm: "This way out",
      wrong: {
        A: "The soot is untouched and the pots are in place. Nobody went this way.",
        C: "The spare key hung on the desk board until the porter took it up."
      },
      hints: [
        "The right route is the one where the traces show movement, not the absence of it.",
        "A bolt can be shut from both sides. On which side was it left open?"
      ]
    }
  },
  accusation: {
    who: { legend: "Who is the killer?", name: "the culprit" },
    how: { legend: "How did they leave the room?", name: "the escape route", options: { ablak: "Through the window and along the ledge", ajto: "Through the connecting door into Room 414", potkulcs: "Through the corridor, with the porter's spare key" } },
    why: { legend: "Why did they kill?", name: "the motive", options: { szerzodes: "The terminated contract and the lawsuit", sikkasztas: "To hide the embezzlement", darab: "Vándor stole their play and staged it as his own", lopas: "They were caught stealing" } }
  },
  carnation: { found: "In the wet document case in the wardrobe of 414, a pressed black carnation and a typed note. In its bottom right corner, a letter circled in red.", note: "“On Saturday Vándor stays in 412. Room 414 is free, and there is a connecting door between them. I will buy the rights to your play at a good price. — F. Sz.”" },
  ending: {
    heading: "It was Endre Kardos.",
    paragraphs: [
      "Four years ago Kardos gave Vándor the first play of his life, “The Last Dance”. Vándor turned it down, then two years later staged it under his own name. It has played to full houses ever since, while Kardos writes his next one in a rented room.",
      "That evening Kardos walked across the city in the rain and took the room next to 412 under the name Andor Derkes. He knocked on the connecting door. Vándor opened it, thinking the waiter had come back. After the argument Kardos seized the bronze award statuette, the Pallas that stood for all the money and fame.",
      "He went back into 414 and bolted the door on his side. The bolt on the 412 side stayed open, and with that the locked-room mystery was solved. The name that played with letters, the wet document case and the scratched-out manuscript gave him away. Lili's lawsuit, Hartmann's embezzlement and Margit's theft were simply the hotel's other secrets."
    ]
  },
  interviews: {
    lili: {
      l1: { q: "Why did Vándor want to end your contract?", a: "“Because I'm getting old, he said. At twenty-seven! He'd found someone younger in Vienna.”" },
      l2: { q: "When did you last ring Room 412?", a: "“At half past eleven. It rang and rang, but nobody picked up. Elemér always answered, even at night.”" },
      l3: { q: "Do you know Endre Kardos?", a: "“The young writer? He came to the theatre once and shouted at Elemér. Called him a thief. I haven't seen him since.”" }
    },
    hartmann: {
      h1: { q: "Whose play is “The Last Dance”?", a: "“Elemér's name is on it. As for who wrote it… well, a lot happens in the theatre that not everyone needs to know.”" },
      h2: { q: "Where did forty thousand pengő go?", a: "“A loan. I meant to put it back. Elemér didn't know, but even if he had, I wouldn't kill him over it: I never left the bar for a minute.”" },
      h3: { q: "What is the safe combination?", a: "“No idea. Elemér always said he set it to the year they first gave him a standing ovation. He kept better track of that than of his birthday.”" }
    },
    margit: {
      m1: { q: "What exactly did you hear?", a: "“A dull thud from 412. Then not long after, a bolt clicking, but not there, a little further along.”" },
      m2: { q: "Who were you with in the ironing room?", a: "“Anna, the other maid. She heard the thud too, ask her.”" },
      m3: { q: "Where are the cufflinks from?", a: "“This afternoon… while I was cleaning. Forgive me! But when it thudded I was in the ironing room, I swear.”" }
    },
    ferenczy: {
      f1: { q: "Who took Room 414 tonight?", a: "“A gentleman, for cash. I didn't see his face, his hat was pulled down low. He tipped well.”" },
      f2: { q: "What was the weather like this evening?", a: "“Dry until a quarter to eleven, then the heavens opened. Anyone who came in after that was soaked to the skin.”" },
      f3: { q: "What was the guest's name?", a: "“Derkes. Andor Derkes. Odd name, as if someone had shuffled the letters.”" }
    },
    kardos: {
      k1: { q: "What are you writing now?", a: "“A play in which someone steals another man's life's work, and he can't get it back. Fiction, of course.”" },
      k2: { q: "When did the rain start?", a: "“At dawn, when I got home. I walked home from the New York with dry feet.”" },
      k3: { q: "Did you write “The Last Dance”?", a: "Kardos's hand trembles. “How do you know that? Vándor's name is on the cover. Everyone knows it's his play.” He laughs bitterly." }
    }
  },
  reveal: [
    { say: "Room 412 was locked from the inside. But there is no such thing as a locked room, ladies and gentlemen. There is only a door we have not thought of.",
      objection: "“But the key was in the lock on the inside, and the spare was with me!”",
      win: "The killer didn't leave through the corridor door but through the connecting one, into Room 414. And he bolted it behind him on his own side." },
    { say: "Room 414 was taken that evening by a certain Andor Derkes. A man who does not exist.",
      objection: "“What has that got to do with me? I sat in the New York all evening!”",
      win: "Andor Derkes, Endre Kardos. The same letters. You took the room under an anagram of your own name." },
    { say: "And the café? You said you walked home with dry feet, that the rain only began at dawn.",
      objection: "“That's how it was!”",
      win: "The rain came down at a quarter to eleven. The lift boy took a man in a soaking coat up to the fourth floor, with a leather document case. The very one we found in the wardrobe of 414." },
    { say: "Finally, the motive. Vándor took more than money and fame.",
      objection: "“Elemér hurt a great many people. It could have been anyone!”",
      win: "But only from one man did he steal a life's work. The manuscript is in the safe, and on its cover, scratched out yet still legible, is the original author's name: Endre Kardos." }
  ],
  confession: "“I spent four years writing that play. He made it his own in two weeks. All I wanted was for him to say it: it's yours. He laughed. And there was that statuette, right at hand…”"
};
