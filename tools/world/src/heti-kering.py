# Heti rejtély 2.: a Gellért szálló bálterme és havas terasza
from wgen import room, o, glint, npc, write
M = {
 "name": "A Gellért szálló", "w": 30, "h": 13,
 "rooms": [room("tancterem", 1, 3, 18, 9, "parquet", "red"), room("terasz", 20, 3, 9, 9, "stone", "stone", "Terasz")],
 "snd": ["wood", "gravel"], "doors": [[19, 6, 1, 3]],
 "weather": {"terasz": "snow"},
 "objects": [
  o("window_red", 3.0, 2.8, wall=True), o("window_red", 8.0, 2.8, wall=True),
  o("grandpiano", 14.0, 6.0, fg=True), o("papers", 14.4, 4.2, fg=True, z=1.9, spot="kotta", label="A zongorán: kotta és egy levél"),
  o("drums", 10.6, 5.0, spot="dob", label="A dobos felszerelése"), o("mic", 12.6, 5.0),
  o("table_round", 17.2, 8.6, fg=True), o("glass", 17.45, 8.1, fg=True, z=0.6, spot="pohar", label="Moldován pezsgőspohara"),
  o("table_round", 4.0, 7.0, fg=True), o("table_round", 4.0, 10.6, fg=True), o("table_round", 9.0, 10.6, fg=True), o("bottle", 4.2, 6.5, fg=True, z=0.6),
  o("papers", 4.15, 10.1, fg=True, z=0.6, puzzle="alibi", label="A vallomások"),
  o("rug_purple", 7.4, 9.4, floor=True), o("plant_a", 1.3, 4.8), o("palm", 17.2, 4.8),
  o("bush", 20.4, 4.4), o("bush2", 27.4, 4.4), o("bench_wood", 23.0, 4.4),
  glint("legyezo", 26.0, 7.0, "Egy elejtett tolllegyező"), glint("konfetti", 22.4, 10.6, "Konfetti és egy elgurult trombita"), glint("korlat", 25.4, 4.8, "A zúzmarás korlát")],
 "npcs": [
  npc("moldovan", 23.6, 7.6, static=True, lie=True, spot="holttest", label="Moldován a hóban"),
  npc("zsuzsa", 8.0, 8.0, "right", barks=["Öt évig táncoltam vele. Öt évig!", "Hideg van… olyan hideg van."]),
  npc("hegedus", 12.6, 7.4, "right", barks=["A zenekar vár. Az újév nem vár.", "Ismeri a Hajnali keringőt? Mindenki ismeri."]),
  npc("tornai", 3.0, 5.4, "right", route=[[3, 5.4, 5], [7, 5.4, 5]], barks=["Botrány. A Gellértben! Szilveszterkor!", "Kérem, a vendégeket ne zaklassa."])]
}
write("heti-kering", {"case": "heti-kering", "start": ["m", 22.0, 9.0], "chars": ["detektiv", "zsuzsa", "hegedus", "tornai", "moldovan"], "maps": {"m": M}})
