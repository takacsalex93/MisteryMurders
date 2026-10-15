# Rejtélyes gyilkosságok

Klasszikus, Agatha Christie modorában írt böngészős krimik. Járd be a helyszíneket, fejtsd meg a rejtvényeket, és nevezd meg a tettest.

**Játék:** https://takacsalex93.github.io/MisteryMurders/

## Ügyek

| # | Cím | Nehézség |
|---|-----|----------|
| 1 | Gyilkosság a Szegfű-villában | Könnyű |
| 2 | Halál az Arany Griffben | Közepes |
| 3 | Éjszakai gyors | Nehéz |

## Felépítés

- `index.html` — az oldal váza, itt kell felvenni az új ügyeket
- `js/engine.js` — a játékmotor (nézetek, mentés, rejtvénytípusok)
- `css/style.css` — megjelenés, világos és sötét mód
- `js/art.js` — kóddal rajzolt art deco illusztrációk (portrék, helyszínek, borítók)
- `cases/*.js` — egy fájl = egy ügy (történet, nyomok, rejtvények, megoldás)

### Rejtvénytípusok

`code` számzár · `choice` összevetés · `assign` logikai beosztás · `order` időrend · `text` szabad válasz (pl. anagramma) · `caesar` eltolásos titkosírás · `keyword` kulcsszavas (Vigenère) titkosírás

### Új ügy hozzáadása

1. Másold le valamelyik `cases/*.js` fájlt, és írd át a tartalmát.
2. Állítsd be a `difficulty` mezőt: `Könnyű`, `Közepes` vagy `Nehéz`.
3. Vedd fel a fájlt az `index.html`-be a többi ügy mellé.

Szerver és telepítés nem kell, a játékállás a böngészőben mentődik.
