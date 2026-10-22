# A nyomozó irodája a címoldalon: a megoldott ügyek tárgyai a polcon, a fekete szegfű cédulái a parafatáblán
from wgen import room, o, npc, write
M = {
 "name": "Az iroda", "w": 22, "h": 12,
 "rooms": [room("_iroda", 1, 3, 20, 8, "herring", "stripes", "Az iroda")],
 "snd": ["wood"], "doors": [],
 "objects": [
  o("rug_purple", 8.0, 10.6, floor=True),
  o("window_red", 1.6, 2.8, wall=True), o("window_red", 17.6, 2.8, wall=True),
  o("corkboard", 4.4, 2.9, wall=True),
  o("shelf_trophy", 10.6, 4.6),
  o("trophy_glass", 11.0, 3.1, fg=True, z=1.6, trophy="szegfu-villa"),
  o("statue", 12.2, 3.3, fg=True, z=1.6, trophy="arany-griff"),
  o("locket", 13.6, 3.1, fg=True, z=1.6, trophy="ejszakai-gyors"),
  o("cake", 15.0, 3.1, fg=True, z=1.6, trophy="hollos-cukraszda"),
  o("sandbag", 11.2, 4.25, fg=True, z=1.6, trophy="corvin-szinhaz"),
  o("aszu", 12.8, 4.25, fg=True, z=1.6, trophy="tokaji-pince"),
  o("vase_flower", 14.4, 4.25, fg=True, z=1.6, trophy="fekete-szegfu"),
  o("bookcase_b", 1.2, 4.3), o("globe", 6.0, 4.6), o("plant_a", 19.4, 4.8), o("palm", 9.0, 4.6),
  o("table_dark", 15.0, 9.4, fg=True), o("lamp_red", 15.6, 7.9, fg=True, z=1.6), o("papers", 16.2, 8.0, fg=True, z=1.5),
  o("tubchair_r", 17.6, 9.6, fg=True), o("coatrack", 19.6, 8.6, fg=True)],
 "npcs": [npc("detektiv", 16.4, 10.0, "up", static=True)]
}
write("iroda", {"case": "iroda", "start": ["m", 8, 8], "chars": ["detektiv"], "maps": {"m": M}})
