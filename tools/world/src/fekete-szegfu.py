# A fekete szegfű: ügyvédi iroda a harmadik emeleten (Edit szobája, Fekete irodája, sötétkamra, irattár, váróterem, lépcsőházak); lent a kapu és az udvar
from wgen import room, o, glint, npc, write

iroda = {
 "name": "Harmadik emelet", "w": 41, "h": 21,
 "rooms": [
  room("titkarsag", 1, 3, 10, 8, "parquet2", "cream"),
  room("fekete_iroda", 12, 3, 12, 8, "darkwood", "panel"),
  room("sotetkamra", 25, 3, 6, 8, "grid", "darkgrey"),
  room("irattar", 32, 3, 8, 8, "woodgrey", "brown"),
  room("varo", 1, 14, 12, 6, "checker", "beige"),
  room("_lepcsohaz", 14, 14, 15, 6, "greyorn", "stone", "Főlépcső"),
  room("hatso", 30, 14, 10, 6, "stone", "darkgrey")],
 "snd": ["wood", "carpet", "tile", "wood", "stone", "stone", "stone"],
 "doors": [[5, 11, 2, 3], [11, 6, 1, 2], [24, 6, 1, 2], [13, 16, 1, 2], [17, 11, 2, 3], [35, 11, 2, 3], [29, 16, 1, 2]],
 "objects": [
  # Edit szobája
  o("filing", 1.3, 4.6), o("filing", 2.4, 4.6, spot="fuzet", label="Egy köteg iktatókönyv alatt"),
  o("radiator", 4.4, 3.9), o("bottle", 5.8, 3.4, z=0.6),
  o("table_wood", 6.6, 7.4, fg=True), o("typewriter", 7.0, 5.9, fg=True, z=1.6, spot="bucsu", label="Az írógépben maradt levél"),
  o("papers", 8.2, 6.0, fg=True, z=1.5, puzzle="alairas", label="Az aláírás"),
  o("vase_flower", 6.5, 5.6, fg=True, z=1.9, spot="szegfu", label="Egy váza egyetlen szál, szinte fekete virággal"),
  o("table_round", 2.4, 9.6, fg=True), o("compact", 2.65, 8.9, fg=True, z=0.8, spot="rouge", label="Egy kis tükör és egy rúzs"),
  # Fekete irodája
  o("landscape1", 13.0, 2.5, wall=True, spot="kepek", label="Bekeretezett fényképek a Balatonról, Tokajról, egy színházról"), o("landscape2", 15.0, 2.5, wall=True), o("frame_s2", 18.0, 2.6, wall=True),
  o("bookcase_dark", 20.6, 4.4),
  o("table_dark", 15.6, 7.6, fg=True), o("calendar", 16.0, 6.0, fg=True, z=1.6, spot="naptar", label="Az asztali naptár"),
  glint("toll", 16.9, 6.2, "Az íróasztalon egy töltőtoll"),
  o("tubchair_r", 13.0, 9.8, fg=True), o("tubchair_r", 19.0, 9.8, fg=True),
  o("table_round", 21.8, 9.6, fg=True), o("decanter", 22.05, 9.0, fg=True, z=0.7, spot="konyak", label="Kristálykancsó konyakkal"),
  glint("sotetkod", 23.3, 7.8, "A sötétkamra ajtaja", puzzle=True),
  # sötétkamra
  o("redlamp", 27.6, 3.6, z=0.1, light=[56, "red"]),
  o("photoline", 25.6, 2.6, wall=True),
  o("table_light", 25.4, 6.6, fg=True), o("trays", 25.6, 5.0, fg=True, z=1.7, spot="talak", label="Előhívótálak"),
  o("drinkshelf", 28.8, 4.3, spot="cianid", label="A vegyszerespolc"),
  glint("jelek", 28.0, 9.6, "A hetedik cédula", puzzle=True),
  # irattár
  o("bookcase_dark", 32.2, 4.4, spot="evszam", label="Dossziék évszámokkal"), o("bookcase_dark", 35.4, 4.4),
  o("bookcase_dark", 32.2, 9.4, fg=True), glint("lanchid", 38.6, 6.4, "A cégjegyzékek között egy vastag dosszié"),
  o("table_wood", 36.4, 10.2, fg=True), o("papers", 36.9, 8.8, fg=True, z=1.6, puzzle="dosszie", label="Edit dossziéja"),
  o("plant_pot", 39.0, 4.0),
  # váróterem
  o("sofa_grey", 1.4, 15.4), o("sofa_grey", 5.4, 15.4),
  o("table_light", 3.6, 18.8, fg=True), o("papers", 4.0, 17.4, fg=True, z=1.5, spot="ujsag", label="A mai újságok"),
  o("coatrack", 9.4, 16.0, spot="zseton", label="Halmi kabátja a fogason"),
  glint("kesztyu", 11.0, 17.0, "Egy finom női kesztyű a fogason"),
  o("papers", 8.4, 19.6, nosolid=True, puzzle="vallomas", label="Fekete vallomása"),
  # lépcsőházak
  o("stairs", 21.0, 15.9, warp=["fsz", 5.0, 6.0], label="Le a főlépcsőn a kapuhoz", nosolid=True),
  o("plant_b", 14.4, 15.4), o("plant_b", 27.6, 15.4),
  o("stairs", 37.6, 19.95, warp=["fsz", 30.5, 6.0], label="Le a hátsó lépcsőn az udvarra", nosolid=True),
  glint("galos", 35.4, 18.6, "Nedves nyomok a lépcsőfokokon"),
  o("irondoor", 31.0, 16.4, spot="kulcs", label="A vasajtó"),
  o("gasmeter", 33.6, 13.6, wall=True, spot="gazora", label="A gázóra")],
 "npcs": [
  npc("edit", 7.6, 6.6, static=True, sit=8, dy=-12, spot="holttest", label="Edit az íróasztalra borulva"),
  npc("fekete", 6.0, 17.6, "right", barks=["Harminc éve vezetem ezt az irodát. Edit a legjobb titkárnőm volt.", "Kérem, legyen tapintatos. Gyászolunk."]),
  npc("irma", 3.6, 16.4, "down", barks=["Az ibolya mindig is a kedvencem volt.", "A férjem sosem késik. Ma este sem késett."]),
  npc("halmi", 11.2, 18.6, "left", route=[[11.2, 18.6, 5], [11.2, 15.2, 5]], barks=["Öt éve dolgozom itt. Öt hosszú éve.", "Ma ünnep van, uram. A törvényszék zárva."])]
}

fsz = {
 "name": "Földszint", "w": 35, "h": 11,
 "rooms": [room("porta", 1, 3, 12, 7, "woodgrey", "tan"), room("_udvar", 14, 3, 20, 7, "stone", "brickb", "Udvar")],
 "snd": ["wood", "gravel"],
 "doors": [[13, 5, 1, 2]],
 "weather": {"Udvar": "rain"},
 "objects": [
  o("stairs", 2.0, 4.3, warp=["iroda", 21.6, 17.6], label="Fel a főlépcsőn", nosolid=True),
  o("notice", 6.0, 2.6, wall=True, spot="nevsor", label="A lakók névsora"),
  o("window", 9.0, 2.6, wall=True),
  o("table_wood", 8.4, 8.8, fg=True), o("vase_flower", 9.0, 7.2, fg=True, z=1.6, spot="uveg", label="Egy szál szegfű egy befőttesüvegben"),
  glint("hol", 10.8, 6.8, "Fél hét", puzzle=True),
  o("chair_d", 11.4, 9.6, fg=True, nosolid=True),
  o("stairs", 30.0, 4.3, warp=["iroda", 35.0, 17.4], label="Fel a hátsó lépcsőn", nosolid=True),
  o("barrel", 15.0, 4.4), o("barrel", 16.1, 4.4), o("cart", 20.0, 9.9, fg=True), o("crate", 26.0, 4.3), o("bin", 33.0, 4.4)],
 "npcs": [
  npc("rozsa", 5.0, 8.4, "down", spot="penz", barks=["Rózsa néninek szólítson, kedves.", "Én csak a kaput nyitom, a többi nem az én dolgom."]),
  npc("pinter", 24.0, 7.0, "down", spot="kocsma", route=[[24, 7, 6], [17, 8.4, 5]], barks=["Harminc éve hordom az aktákat ebben a házban.", "Két fröccs, uram, nem több. Esküszöm."])]
}

write("fekete-szegfu", {"case": "fekete-szegfu", "start": ["iroda", 4.0, 7.8],
  "chars": ["detektiv", "fekete", "irma", "halmi", "pinter", "rozsa", "edit"],
  "dark": [{"room": "sotetkamra", "tint": "red", "alpha": .9, "lamp": 54}],
  "maps": {"iroda": iroda, "fsz": fsz}})
