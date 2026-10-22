# Tokaji Récsey-birtok: lakóház, udvar a kürtővel, présház, a pincemester háza és ládája; alatta a pince
from wgen import room, o, glint, npc, write

haz = {
 "name": "A birtok", "w": 43, "h": 29,
 "rooms": [
  room("haloszoba", 1, 3, 9, 7, "parquet2", "green"),
  room("szalon", 11, 3, 11, 7, "parquet", "red"),
  room("konyha", 23, 3, 8, 7, "redtile", "brick"),
  room("istallo", 32, 3, 10, 7, "planks", "planks"),
  room("udvar", 1, 13, 30, 7, "stone", "brickb", "Udvar és szellőzőkürtő"),
  room("preshaz", 32, 13, 10, 7, "bricks", "brickb"),
  room("mester", 32, 23, 7, 5, "planks", "brown"),
  room("lada", 40, 23, 2, 5, "planks", "brown")],
 "snd": ["wood", "wood", "tile", "gravel", "gravel", "stone", "wood", "wood"],
 "doors": [[4, 10, 2, 3], [15, 10, 2, 3], [26, 10, 2, 3], [36, 10, 2, 3], [31, 16, 1, 2], [35, 20, 2, 3], [39, 25, 1, 2]],
 "weather": {"udvar": "fog"},
 "decals": [{"kind": "heel", "pts": [[9.6, 17.6], [14, 18.2], [20, 17.8], [26, 17.2], [30.6, 17.1]]}],
 "objects": [
  # Ilona szobája
  o("rug_blue", 3.6, 8.6, floor=True),
  o("bed_b", 1.3, 6.4), o("nightstand", 3.6, 4.3),
  o("glass", 3.75, 3.4, z=1.0, spot="tea", label="Kamillatea az éjjeliszekrényen"), o("bottle", 4.2, 3.4, z=1.0, spot="csepp", label="Egy üveg altatócsepp"),
  o("wardrobe_old", 7.6, 4.3),
  o("chair_b", 6.2, 7.8, fg=True), o("pongyola", 6.3, 7.0, fg=True, z=0.9, spot="penesz", label="A pongyola és a papucs"),
  o("table_round", 2.4, 9.8, fg=True), o("papers", 2.55, 9.3, fg=True, z=0.6, puzzle="vallomas", label="Ilona vallomása"),
  # szalon
  o("fireplace", 15.6, 3.9, light=[44, "fire"]), o("notice", 13.0, 2.6, wall=True, puzzle="ido", label="Az éjszaka sorrendje"),
  o("drinkshelf", 18.6, 4.2),
  o("poker", 12.0, 8.2, fg=True, spot="kartya", label="Kiterített kártyák"),
  o("chair_b", 17.0, 8.2, fg=True), o("briefcase", 17.0, 7.6, fg=True, z=0.7, spot="lorenz", label="Lorenz úr irattáskája"),
  o("coatrack", 20.6, 6.0, spot="andras", label="András kabátja"),
  o("sofa_grey", 17.8, 10.0, fg=True),
  # konyha
  o("window", 23.6, 2.6, wall=True, spot="ablak", label="Az ablak a kürtőre néz"),
  o("counter", 23.2, 4.3), o("stove", 27.4, 4.7), o("barrel", 29.4, 4.6),
  o("ktable", 25.4, 8.9, fg=True),
  o("hooks", 29.6, 2.4, wall=True), o("apron", 29.8, 3.0, wall=True, z=0.1, spot="rozalia", label="Rozália köténye"),
  # istálló
  o("hay", 32.3, 4.4), o("hay", 33.8, 4.4), o("hay", 32.3, 9.95),
  o("horse", 36.0, 7.6, fg=True, spot="lo", label="Egy beteg ló pokróccal letakarva"),
  o("hooks", 40.0, 2.4, wall=True), o("coat", 40.0, 3.6, wall=True, z=0.1, spot="barany", label="Bárány kabátja"),
  o("lantern", 39.2, 8.6, fg=True, light=[30, "fire"]),
  # udvar
  o("chimney", 8.0, 16.6, spot="fedel", label="A kürtő fedele"),
  glint("hol", 10.8, 17.4, "A kürtő éjszakája", puzzle=True),
  glint("nyom", 20.0, 17.6, "Lábnyomok a kürtőtől a présház felé"),
  glint("drot", 30.2, 16.4, "Drót a présház ajtaján"),
  o("cellardoor", 2.2, 19.6, nosolid=True, warp=["pince", 4.0, 6.4], label="Le a pincébe"),
  o("barrel", 14.0, 14.6), o("barrel", 15.1, 14.6), o("cart", 23.0, 15.8, fg=True), o("crate", 28.6, 14.4), o("crate", 1.2, 14.4),
  # présház
  o("press", 33.6, 16.6, spot="pres", label="A nagy prés"),
  o("vat", 37.0, 18.6, fg=True), o("thermometer", 38.2, 17.6, fg=True, z=1.1, spot="homero", label="Hőmérő egy dézsában"),
  o("table_wood", 39.4, 15.6), o("ledger", 39.9, 14.2, z=1.5, puzzle="mustnaplo", label="A mustnapló"),
  o("barrel", 32.3, 19.95), o("barrel", 33.4, 19.95),
  # a pincemester háza
  o("bed_a", 32.2, 27.0), o("notice", 36.0, 22.6, wall=True),
  o("table_round", 35.4, 24.8, fg=True), o("bottle", 35.65, 24.2, fg=True, z=0.7, spot="asz", label="Egy címke nélküli palack aszú"),
  o("cane", 37.8, 24.6, spot="bot", label="Egy sétabot"),
  o("chest", 34.4, 27.9, fg=True, puzzle="kod", label="A vasalt láda"),
  # a láda
  o("chest_open", 40.0, 25.4, puzzle="konyv", label="A titkos füzet"),
  glint("fuzet_", 40.5, 27.6, "Egy kopott, viaszosvászon füzet")],
 "npcs": [
  npc("ilona", 5.6, 8.4, "left", barks=["Huszonöt éve vagyok itt asszony. Ennyi ködöt még nem láttam.", "Aludtam. Bevettem a cseppjeimet, és aludtam."]),
  npc("andras", 14.8, 5.2, "down", route=[[14.8, 5.2, 5], [14.8, 9.4, 5]], barks=["Apám mindig azt mondta, belőlem sosem lesz gazda.", "Pesten legalább nincs köd."]),
  npc("lorenz", 19.4, 8.0, "left", barks=["Bécsben a tokaji aranyat ér. Szó szerint.", "Négyszáz pengő ulti. Nem rossz este. Volt."]),
  npc("rozalia", 26.5, 6.0, "down", barks=["Hozhatok egy kis teát? Vagy pálinkát, a ködre.", "Az ablakból mindent látni, ha az ember nem alszik."]),
  npc("kocsis", 34.4, 7.8, "right", spot="kocsis", label="A kocsis", barks=["Szegény pára. Reggelre talán jobban lesz."]),
  npc("barany", 38.6, 8.8, "left", barks=["A ló egész éjjel nyögött. Mellette voltam.", "Az intézőnek mindent tudnia kell. Majdnem mindent."]),
  npc("gaspar", 36.6, 26.2, "left", barks=["Negyven éve járom ezt a pincét.", "A bor nem hazudik, uram. Csak a címke."])],
 "talks": [{"id": "szallitmany", "zone": [1, 13, 30, 7], "after": "lorenz", "lines": [
  ["lorenz", "Gáspár úr, a szállítmány rendben lesz holnapra?"], ["gaspar", "Rendben, ahogy mindig. Csak ne kérdezzen sokat, uram."], ["lorenz", "Én sosem kérdezek. Én csak fizetek."]]}]
}

pince = {
 "name": "A pince", "w": 33, "h": 14,
 "rooms": [room("lepcso", 1, 3, 6, 10, "stone", "stone"), room("erjeszto", 8, 3, 24, 10, "stone", "stone")],
 "snd": ["stone", "stone"],
 "doors": [[7, 8, 1, 2]],
 "objects": [
  o("stairs", 2.4, 4.3, warp=["haz", 3.2, 18.0], label="Fel az udvarra", light=[40, "fire"]),
  o("mold", 5.0, 2.7, wall=True, spot="penesz_", label="Fekete, bolyhos penész a falon"),
  glint("korlat", 4.8, 5.8, "A korlát"),
  glint("halal", 5.4, 11.0, "Hol halt meg?", puzzle=True),
  o("cask", 8.6, 4.6), o("cask", 10.6, 4.6), o("cask", 12.6, 4.6), o("cask", 14.6, 4.6), o("cask", 16.6, 4.6), o("cask", 18.6, 4.6),
  o("cask", 20.6, 4.6, spot="hordo", label="A hetes hordó"),
  o("cask", 8.6, 12.95), o("cask", 10.6, 12.95), o("cask", 12.6, 12.95), o("cask", 14.6, 12.95), o("cask", 16.6, 12.95),
  o("cask", 22.6, 9.4, fg=True), o("cask", 24.6, 9.4, fg=True), o("cask", 26.6, 9.4, fg=True),
  glint("vasrud", 8.5, 8.0, "A vasajtó és a falnak támasztott vasrúd"),
  o("chute", 26.0, 2.7, wall=True, spot="nyilas", label="A szellőzőnyílás"),
  o("table_wood", 28.6, 12.6, fg=True), o("candle", 29.2, 11.0, fg=True, z=1.6, light=[34, "fire"])],
 "npcs": [npc("recsey", 3.8, 9.6, static=True, lie=True, spot="holttest", label="A gazda a lépcső alján")]
}

write("tokaji-pince", {"case": "tokaji-pince", "start": ["pince", 4.6, 7.4],
  "chars": ["detektiv", "ilona", "andras", "gaspar", "lorenz", "rozalia", "barany", "kocsis", "recsey"],
  "dark": [{"map": "pince", "alpha": .9, "lamp": 66}],
  "maps": {"haz": haz, "pince": pince}})
