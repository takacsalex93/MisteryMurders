"""A karakterkészítő rétegeinek összecsomagolása egyetlen képbe (images/world/chargen.png) és a hozzá tartozó leíró (js/chargen-data.js).
A LimeZu karaktergenerátorból csak egy válogatott, korhű részhalmazt veszünk át, és rétegenként csak a játékban használt két sort
(állás és járás, 384x64), saját elrendezésben; az eredeti csomag szerkezete és a többi elem nem kerül a repóba.
Használat: python3 tools/chargen_parts.py <Modern_Interiors mappa>"""
import sys, os, json
from PIL import Image
G = os.path.join(sys.argv[1], "2_Characters/Character_Generator")
ROOT = os.path.join(os.path.dirname(__file__), "..")
PICK = {
    "body": [("Bodies", f"Body_{b}") for b in ["01", "02", "03", "04", "07"]],
    "eyes": [("Eyes", f"Eyes_{e:02d}") for e in range(1, 8)],
    "hair": [("Hairstyles", f"Hairstyle_{s}_{c:02d}") for s in ["06", "01", "02", "04", "09", "10", "12", "15", "16", "20", "21", "23"] for c in range(1, 8)],
    "outfit": [("Outfits", f"Outfit_{s}_{c:02d}") for s, n in [("18", 4), ("05", 5), ("06", 4), ("26", 3), ("27", 3), ("28", 4), ("02", 4), ("03", 4), ("04", 3), ("17", 3)] for c in range(1, n + 1)],
    "hat": [("Accessories", f"Accessory_08_Detective_Hat_{c:02d}") for c in range(1, 4)],
    "face": [("Accessories", f"Accessory_12_Mustache_{c:02d}") for c in range(1, 6)] + [("Accessories", f"Accessory_13_Beard_{c:02d}") for c in range(1, 6)]
            + [("Accessories", f"Accessory_15_Glasses_{c:02d}") for c in range(1, 4)] + [("Accessories", "Accessory_16_Monocle_01")],
}
from collections import Counter
def swatch(im):
    # a réteg leggyakoribb, nem körvonal (nem túl sötét) színe: ebből lesz a választógomb színe
    c = Counter(px[:3] for px in im.get_flattened_data() if px[3] > 200 and sum(px[:3]) > 150 and px[:3] != (58, 58, 80))
    return "#%02x%02x%02x" % c.most_common(1)[0][0] if c else "#888888"
layers, index, sw = [], {}, {}
for cat, items in PICK.items():
    for kind, name in items:
        full = Image.open(os.path.join(G, kind, "16x16", name + ".png")).convert("RGBA")
        strip = Image.new("RGBA", (384, 64)); strip.alpha_composite(full.crop((0, 32, 384, 96)), (0, 0))
        key = name.split("_", 1)[1] if cat != "face" else name.replace("Accessory_", "")
        index.setdefault(cat, {})[key] = len(layers); sw[len(layers)] = swatch(strip); layers.append(strip)
COLS = 4
atlas = Image.new("RGBA", (384 * COLS, 64 * ((len(layers) + COLS - 1) // COLS)))
for i, s in enumerate(layers): atlas.alpha_composite(s, ((i % COLS) * 384, (i // COLS) * 64))
atlas.save(os.path.join(ROOT, "images/world/chargen.png"), optimize=True)
with open(os.path.join(ROOT, "js/chargen-data.js"), "w") as f:
    f.write("/* A karakterkészítő rétegeinek helye az images/world/chargen.png képen (tools/chargen_parts.py állítja elő). */\n")
    f.write("window.MM_CHARGEN = " + json.dumps({"cols": COLS, "w": 384, "h": 64, "idx": index, "sw": sw}, ensure_ascii=False) + ";\n")
print(len(layers), "réteg,", os.path.getsize(os.path.join(ROOT, "images/world/chargen.png")) // 1024, "KB")
