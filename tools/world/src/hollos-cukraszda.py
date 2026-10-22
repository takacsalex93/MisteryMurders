# Hollós cukrászda: üzlettér, kassza, iroda; műhely, jégkamra, öltöző; hátsó udvar és portásfülke
from wgen import room, o, glint, npc, write

M = {
 "name": "A cukrászda", "w": 34, "h": 30,
 "rooms": [
  room("uzlet", 1, 3, 16, 8, "checker", "cream"),
  room("kassza", 18, 3, 5, 8, "parquet", "cream"),
  room("iroda", 24, 3, 9, 8, "darkwood", "panel"),
  room("muhely", 1, 14, 13, 7, "whitetile", "tile"),
  room("jegkamra", 15, 14, 7, 7, "lightgrey", "lblue"),
  room("oltozo", 23, 14, 10, 7, "planks", "brown"),
  room("_udvar", 1, 24, 24, 5, "stone", "brickb", "Hátsó udvar"),
  room("portas", 26, 24, 7, 5, "woodgrey", "brown")],
 "snd": ["stone", "wood", "wood", "tile", "stone", "wood", "gravel", "wood"],
 "doors": [[17, 6, 1, 2], [23, 6, 1, 2], [6, 11, 2, 3], [27, 11, 2, 3], [14, 17, 1, 2], [22, 17, 1, 2], [17, 21, 2, 3], [5, 21, 2, 3], [25, 26, 1, 2]],
 "weather": {"Hátsó udvar": "snow"},
 "objects": [
  # üzlettér
  o("mirror", 2.0, 2.9, wall=True), o("mirror", 6.0, 2.9, wall=True), o("mirror", 10.0, 2.9, wall=True),
  o("frame_s1", 14.0, 2.6, wall=True, spot="arlap", label="Az árlap rézkeretben"),
  o("vitrine", 1.4, 5.4), o("cake", 2.0, 4.4, z=1.1), o("cake_cut", 3.4, 4.4, z=1.1), o("cake", 5.6, 5.7, z=0.05),
  o("vitrine", 11.0, 5.4), o("swan", 12.4, 4.4, z=1.1, spot="hattyu", label="A cukorból öntött hattyú"),
  o("table_round", 4.0, 8.6, fg=True), o("table_round", 8.0, 9.6, fg=True), o("table_round", 12.0, 8.6, fg=True),
  o("chair_b", 5.2, 8.9, fg=True), o("tubchair_r", 14.0, 10.6, fg=True),
  o("handbag", 14.2, 9.4, fg=True, z=1.3, spot="vilmatask", label="Vilma asszony táskája"),
  o("plant_a", 15.7, 4.8), o("runner_b", 8.3, 10.95, floor=True),
  # kassza
  o("counter", 18.2, 4.4), o("cashreg", 19.0, 3.9, z=0.6),
  o("ledger", 20.8, 4.0, z=0.5, spot="penzkonyv", label="A vastag pénztárkönyv"),
  o("tape", 19.0, 6.6, puzzle="szalag", label="A kasszaszalag"),
  o("coins", 21.4, 8.6, nosolid=True, spot="apro", label="Apró a fiókban"),
  # iroda
  o("frame_s2", 25.0, 2.6, wall=True, spot="oklevel", label="Bekeretezett oklevelek"), o("frame_s3", 26.2, 2.6, wall=True), o("landscape1", 28.0, 2.5, wall=True),
  o("safe", 31.2, 4.4, puzzle="szef", label="A páncélszekrény"),
  o("table_dark", 26.0, 8.0, fg=True), o("calendar", 26.6, 6.3, fg=True, z=1.6, spot="naptar", label="Asztali naptár"),
  o("lamp_red", 27.3, 6.5, fg=True, z=1.6), o("chair_d", 26.5, 9.0, fg=True, nosolid=True), o("bookcase_dark", 29.4, 10.95),
  # műhely
  o("oven", 1.2, 15.8), o("oven", 3.4, 15.8),
  o("counter", 6.0, 15.3), o("copperpot", 6.4, 14.7, z=0.6, spot="ust", label="A rézüst"), o("copperpot", 8.4, 14.7, z=0.6),
  o("table_light", 3.0, 19.4, fg=True), o("table_light", 7.6, 19.4, fg=True),
  glint("sodrofa", 8.4, 18.4, "Egy sodrófa"),
  glint("retesz", 4.0, 18.5, "A zöld folt", puzzle=True),
  glint("retesz_", 13.3, 18.2, "A nehéz vasretesz a jégkamra ajtaján"),
  o("hooks", 11.0, 13.4, wall=True), o("apron", 11.2, 14.0, wall=True, z=0.1), o("apron", 12.2, 14.0, wall=True, z=0.1),
  # jégkamra
  o("iceblock", 15.3, 15.4), o("iceblock", 16.2, 15.4), o("iceblock", 15.3, 20.95), o("iceblock", 16.3, 20.95), o("iceblock", 20.5, 20.95),
  o("shelf_metal", 19.6, 15.4), o("cake_cut", 20.0, 14.5, z=1.1, spot="torta", label="A pisztáciás torta, egy szelet hiányzik"),
  o("window_frost", 17.3, 13.6, wall=True, puzzle="der", label="Írás a dérben"),
  glint("kartya", 17.0, 19.2, "Valami piros-fehér a jégtömbök között"),
  o("bucket_tipped", 20.6, 18.0, spot="vodor", label="Egy felborított vödör"),
  # öltöző
  o("hooks", 24.0, 13.4, wall=True), o("coat", 24.0, 14.6, wall=True, z=0.1, spot="valtok", label="Egy elegáns férfikabát a kötények között"),
  o("hooks", 25.4, 13.4, wall=True), o("apron", 25.6, 14.0, wall=True, z=0.1),
  o("wardrobe_old", 28.0, 15.4, spot="szekreny", label="Szendrei szekrénye"), o("wardrobe_old", 30.0, 15.4),
  o("bench_wood", 26.0, 19.4, fg=True), o("boots", 31.4, 20.4, fg=True, spot="csizma", label="Egy pár csizma"),
  # hátsó udvar
  o("barrel", 1.3, 25.4), o("barrel", 2.4, 25.4), o("crate", 9.0, 25.3), o("crate", 10.0, 25.3), o("cart", 12.0, 28.9, fg=True),
  o("bin", 22.6, 25.3),
  # portásfülke
  o("table_wood", 27.0, 27.4, fg=True), o("bottle", 27.6, 25.9, fg=True, z=1.5, spot="palinka", label="Egy üveg és egy felborult pohár"),
  o("lantern", 29.2, 26.0, fg=True, z=1.4, spot="lampas", label="Gyuri bácsi lámpása"),
  o("notice", 30.6, 23.6, wall=True, puzzle="tavozas", label="A jelenléti ív"),
  o("chair_d", 27.6, 28.6, fg=True, nosolid=True)],
 "npcs": [
  npc("hollos", 18.4, 17.4, static=True, lie=True, spot="holttest", label="A mester a jégtömbök mellett"),
  npc("hollosbela", 6.5, 7.6, "down", route=[[6.5, 7.6, 5], [10.5, 7.2, 5]], barks=["Holnap nyitottunk volna újra. Holnap!", "A bácsikám sosem bízott bennem. Na tessék."]),
  npc("anna", 20.5, 7.2, "down", barks=["Hat éve kezelem a kasszát. Egy fillér sem hiányzott soha.", "Kérem, ne nyúljon a pénztárgéphez."]),
  npc("vilma", 29.0, 6.6, "left", barks=["Harminc évig itt álltam mellette. Harminc évig.", "Az irodába senki sem jár be. Csak ő. Csak ő járt."]),
  npc("szendrei", 29.4, 18.4, "left", barks=["Tizenöt éve keverem itt a krémeket.", "A pisztácia titka? Az az én titkom, uram."]),
  npc("feher", 30.6, 27.3, "left", barks=["Gyuri bácsinak szólítson, mindenki így hív.", "Éjjel egyszer sem aludtam el. Na jó… talán egyszer."])],
 "talks": [{"id": "udvar", "zone": [1, 24, 24, 5], "after": "palinka", "lines": [
  ["vilma", "Szendrei úr, ugye maga is tudta, hogy Ernő el akarja adni?"], ["szendrei", "Asszonyom, én csak a tortákat sütöm. Az üzlet az önöké."], ["vilma", "Hát persze. Mindig csak a tortákat."]]}]
}

write("hollos-cukraszda", {"case": "hollos-cukraszda", "start": ["m", 17.2, 16.4],
  "chars": ["detektiv", "szendrei", "hollosbela", "anna", "vilma", "feher", "hollos"],
  "maps": {"m": M}})
