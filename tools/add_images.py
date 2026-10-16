"""Képek beépítése: python3 tools/add_images.py <forrás.png>=<ügy>/<név> ...
   pl. kep.png=tokaji-pince/cover  vagy  kep2.png=tokaji-pince/portrait-ilona
   Méretre vág, webp-be ment, és frissíti az images/manifest.js listát."""
import sys, re, os
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOPS = {"szegfu-villa": .12, "arany-griff": .18, "ejszakai-gyors": .24, "tokaji-pince": .07, "hollos-cukraszda": .2, "corvin-szinhaz": .2, "fekete-szegfu": .33}
new = []
for arg in sys.argv[1:]:
    src, dst = arg.split("=")
    case, name = dst.split("/")
    im = Image.open(src).convert("RGB"); w, h = im.size
    if name.startswith("portrait"):
        ch = int(w * 5 / 4); top = int(h * 0.03); im = im.crop((0, top, w, top + ch)).resize((640, 800), Image.LANCZOS)
    elif name == "cover":
        ch = int(w * 260 / 600); top = int(h * TOPS.get(case, .2)); im = im.crop((0, top, w, top + ch)).resize((1200, 520), Image.LANCZOS)
    else:
        ch = int(w * 5 / 8); top = (h - ch) // 2; im = im.crop((0, top, w, top + ch)).resize((960, 600), Image.LANCZOS)
    os.makedirs(f"{ROOT}/images/{case}", exist_ok=True)
    im.save(f"{ROOT}/images/{case}/{name}.webp", "WEBP", quality=80, method=6)
    new.append(f"{case}/{name}.webp")
p = f"{ROOT}/images/manifest.js"; s = open(p).read()
allf = sorted(set(re.findall(r'"([^"]+\.webp)"', s) + new))
s = s.split("window.MM_IMAGES")[0] + "window.MM_IMAGES = [\n" + ",\n".join(f'  "{o}"' for o in allf) + "\n];\n"
open(p, "w").write(s)
print(f"{len(new)} kép hozzáadva, összesen {len(allf)}")
