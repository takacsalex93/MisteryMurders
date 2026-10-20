"""Szereplők összerakása a LimeZu karaktergenerátor rétegeiből.
Használat: python3 tools/chars.py <Modern_Interiors mappa> <kimeneti mappa>
Kimenet: <id>.png, 384x64: 1. sor állás, 2. sor járás; irányonként 6 kocka (jobbra, fel, balra, le)."""
import sys, json, os
from PIL import Image
SRC, OUT = sys.argv[1], sys.argv[2]
G = os.path.join(SRC, "2_Characters/Character_Generator")
SPEC = json.load(open(os.path.join(os.path.dirname(__file__), "characters.json")))
os.makedirs(OUT, exist_ok=True)
def layer(kind, name):
    return Image.open(os.path.join(G, kind, "16x16", name + ".png")).convert("RGBA")
for cid, s in SPEC.items():
    parts = [layer("Bodies", "Body_" + s["body"]), layer("Eyes", "Eyes_" + s.get("eyes", "01"))]
    if s.get("outfit"): parts.append(layer("Outfits", "Outfit_" + s["outfit"]))
    if s.get("hair"): parts.append(layer("Hairstyles", "Hairstyle_" + s["hair"]))
    for a in s.get("acc", []): parts.append(layer("Accessories", "Accessory_" + a))
    full = Image.new("RGBA", parts[0].size)
    for p in parts: full.alpha_composite(p)
    sheet = Image.new("RGBA", (384, 64))
    sheet.alpha_composite(full.crop((0, 32, 384, 64)), (0, 0))
    sheet.alpha_composite(full.crop((0, 64, 384, 96)), (0, 32))
    sheet.save(os.path.join(OUT, cid + ".png"))
print(len(SPEC), "szereplő")
