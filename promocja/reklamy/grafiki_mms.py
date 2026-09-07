# -*- coding: utf-8 -*-
"""Grafiki na podstrone MMS na klaster.org.pl, identyfikacja Remiza (papier, tusz, pomarancz, kobalt)."""
import glob, os, sys
from PIL import Image, ImageDraw, ImageFont
sys.stdout.reconfigure(encoding="utf-8")

PAPIER = (242, 238, 228); TUSZ = (26, 23, 18); POM = (255, 92, 57); KOB = (43, 63, 166); SZARY = (110, 105, 96); KROPKA = (214, 208, 196); BIEL = (255, 255, 255)
OUT = os.path.dirname(os.path.abspath(__file__)) + "/grafiki"
os.makedirs(OUT, exist_ok=True)

def znajdz(wzorce):
    dirs = [r"C:\Windows\Fonts", os.path.expandvars(r"%LOCALAPPDATA%\Microsoft\Windows\Fonts")]
    for w in wzorce:
        for d in dirs:
            r = glob.glob(os.path.join(d, w))
            if r: return r[0]
    return None

LATO_R = znajdz(["Lato-Regular.ttf", "Lato-Regular*.ttf"]); LATO_B = znajdz(["Lato-Bold.ttf", "Lato-Bold*.ttf"]); LATO_BL = znajdz(["Lato-Black.ttf"]) or LATO_B
FRAUNCES = znajdz(["Fraunces*.ttf", "Fraunces-*.ttf"])
print("fonty:", LATO_R, LATO_B, FRAUNCES)
assert LATO_R and LATO_B and FRAUNCES, "brak fontow"

def f_lato(sz, bold=False, black=False):
    return ImageFont.truetype(LATO_BL if black else (LATO_B if bold else LATO_R), sz)

def f_fraunces(sz, wght=700):
    f = ImageFont.truetype(FRAUNCES, sz)
    try:
        axes = f.get_variation_axes()
        vals = []
        for a in axes:
            n = a.get("name", b"")
            n = n.decode() if isinstance(n, bytes) else str(n)
            if "eight" in n or n == "wght": vals.append(wght)
            elif "ptical" in n or n == "opsz": vals.append(min(144, max(9, sz * 0.75)))
            elif "SOFT" in n.upper(): vals.append(50)
            else: vals.append(a["default"])
        f.set_variation_by_axes(vals)
    except Exception as e:
        pass
    return f

def papier(w, h):
    im = Image.new("RGB", (w, h), PAPIER)
    d = ImageDraw.Draw(im)
    for y in range(20, h, 28):
        for x in range(20, w, 28):
            d.ellipse([x, y, x + 2, y + 2], fill=KROPKA)
    return im, d

def etykieta(d, x, y, tekst, kolor=KOB, sz=26):
    f = f_lato(sz, bold=True)
    # rozstrzelone wersaliki
    t = tekst.upper()
    cx = x
    for ch in t:
        d.text((cx, y), ch, font=f, fill=kolor)
        cx += d.textlength(ch, font=f) + 3
    return cx

def tekst_lam(d, x, y, tekst, font, fill, maxw, lh=None):
    slowa = tekst.split(); linie = []; akt = ""
    for s in slowa:
        prob = (akt + " " + s).strip()
        if d.textlength(prob, font=font) <= maxw: akt = prob
        else: linie.append(akt); akt = s
    if akt: linie.append(akt)
    lh = lh or int(font.size * 1.25)
    for i, l in enumerate(linie): d.text((x, y + i * lh), l, font=font, fill=fill)
    return y + len(linie) * lh

def kafel(d, x, y, w, h, tytul, linie, nr=None, akcent=POM):
    d.rounded_rectangle([x, y, x + w, y + h], radius=18, fill=BIEL, outline=(226, 221, 210), width=2)
    d.rectangle([x, y, x + 10, y + h], fill=akcent)
    if nr is not None:
        d.ellipse([x + 30, y + 26, x + 74, y + 70], fill=TUSZ)
        f = f_lato(24, bold=True); tw = d.textlength(str(nr), font=f)
        d.text((x + 52 - tw / 2, y + 34), str(nr), font=f, fill=BIEL)
    yy = tekst_lam(d, x + (90 if nr is not None else 34), y + 24, tytul, f_fraunces(40, 700), TUSZ, w - (120 if nr is not None else 68), lh=44)
    yy += 14
    f = f_lato(24)
    for l in linie:
        d.ellipse([x + 36, yy + 11, x + 44, yy + 19], fill=akcent)
        yy = tekst_lam(d, x + 58, yy, l, f, TUSZ, w - 92, lh=30) + 6
    return yy

def stopka(d, w, h, tekst="mms.klaster.org.pl"):
    d.line([60, h - 78, w - 60, h - 78], fill=TUSZ, width=2)
    d.text((60, h - 60), tekst, font=f_lato(26, bold=True), fill=KOB)

# 1. Pasek naboru
W, H = 1600, 560
im, d = papier(W, H)
etykieta(d, 60, 56, "Nabór wniosków otwarty")
d.text((60, 100), "Do 10 000 zł na odporność", font=f_fraunces(96, 700), fill=TUSZ)
d.text((60, 206), "Twojej miejscowości", font=f_fraunces(96, 700), fill=TUSZ)
d.text((60, 336), "Wnioski do 6 października 2026, do godziny 23:59", font=f_lato(34, bold=True), fill=POM)
d.text((60, 386), "Od 1 000 do 10 000 zł, bez wkładu własnego, bez weksla, w całości online", font=f_lato(28), fill=TUSZ)
# przycisk
bx, by, bw, bh = 60, 446, 470, 68
d.rounded_rectangle([bx, by, bx + bw, by + bh], radius=10, fill=KOB)
f = f_lato(26, bold=True); t = "mms.klaster.org.pl"
d.text((bx + (bw - d.textlength(t, font=f)) / 2, by + 19), t, font=f, fill=BIEL)
# znak S z kropka po prawej
d.text((W - 330, 120), "Ś", font=f_fraunces(300, 700), fill=TUSZ)
d.ellipse([W - 120, 300, W - 60, 360], fill=POM)
im.save(OUT + "/mms-nabor-pasek.png", optimize=True)

# 2. Piec obszarow
W, H = 1600, 1000
im, d = papier(W, H)
etykieta(d, 60, 50, "Obowiązkowy komponent odporności")
d.text((60, 88), "Pięć obszarów, wybierasz co najmniej jeden", font=f_fraunces(56, 700), fill=TUSZ)
obszary = [
    ("Pierwsza pomoc i defibrylator AED", ["Kurs pierwszej pomocy dla koła gospodyń", "Defibrylator i apteczka do remizy", "Mapa najbliższych AED na osiedlu"]),
    ("Blackout i klęski żywiołowe", ["Plan na 48 godzin bez prądu", "Punkt ładowania telefonów w świetlicy", "Zapas wody i latarek dla sołectwa"]),
    ("Bezpieczeństwo cyfrowe i dezinformacja", ["Warsztat o oszustwach na wnuczka i na BLIK", "Rozpoznawanie fałszywych wiadomości", "Hasła i płatności w telefonie seniora"]),
    ("Sieci sąsiedzkie", ["Lista osób samotnych w bloku", "Telefon sąsiedzki na trudne dni", "Sąsiedzka skrzynka narzędzi i sprzętu"]),
    ("Współpraca ze służbami i OSP", ["Wspólne ćwiczenie ewakuacji z OSP", "Piknik ratowniczy z pokazem", "Punkty zbiórki ustalone z gminą"]),
]
kw, kh, gx, gy = 480, 330, 40, 30
poz = [(60, 190), (60 + kw + gx, 190), (60 + 2 * (kw + gx), 190), (60 + (kw + gx) / 2, 190 + kh + gy), (60 + (kw + gx) / 2 + kw + gx, 190 + kh + gy)]
for i, (t, l) in enumerate(obszary):
    x, y = poz[i]; kafel(d, int(x), int(y), kw, kh, t, l, nr=i + 1, akcent=POM if i % 2 == 0 else KOB)
stopka(d, W, H, "Obszary odpowiadają rozdziałom Poradnika bezpieczeństwa MSWiA")
im.save(OUT + "/mms-obszary.png", optimize=True)

# 3. Subregiony
W, H = 1600, 760
im, d = papier(W, H)
etykieta(d, 60, 50, "Cztery subregiony, cztery listy rankingowe")
d.text((60, 88), "Konkurujesz tylko ze swoim terenem", font=f_fraunces(56, 700), fill=TUSZ)
sub = [
    ("Zachodni", ["raciborski", "rybnicki", "wodzisławski", "Żory", "Jastrzębie-Zdrój"]),
    ("Południowy", ["bielski", "cieszyński", "żywiecki", "pszczyński"]),
    ("Centralny", ["będziński", "gliwicki", "tarnogórski", "mikołowski", "bieruńsko-lędziński", "Jaworzno", "Mysłowice", "Siemianowice Śl.", "Świętochłowice", "Piekary Śl.", "Chorzów"]),
    ("Północny", ["częstochowski", "kłobucki", "myszkowski", "zawierciański", "lubliniecki"]),
]
cw = 350; gx = 30
for i, (n, pow) in enumerate(sub):
    x = 60 + i * (cw + gx); y = 190
    d.rounded_rectangle([x, y, x + cw, H - 120], radius=18, fill=BIEL, outline=(226, 221, 210), width=2)
    d.rectangle([x, y, x + cw, y + 10], fill=POM if i % 2 == 0 else KOB)
    d.text((x + 28, y + 30), n, font=f_fraunces(44, 700), fill=TUSZ)
    d.text((x + 28, y + 86), "213 500 zł w subregionie", font=f_lato(20, bold=True), fill=KOB)
    yy = y + 130; f = f_lato(22); cx = x + 28
    for p in pow:
        tw = d.textlength(p, font=f) + 28
        if cx + tw > x + cw - 28: cx = x + 28; yy += 48
        d.rounded_rectangle([cx, yy, cx + tw, yy + 38], radius=19, fill=PAPIER, outline=(214, 208, 196), width=1)
        d.text((cx + 14, yy + 7), p, font=f, fill=TUSZ); cx += tw + 10
stopka(d, W, H, "Liczy się miejscowość siedziby do 100 tysięcy mieszkańców. Miasta powyżej tego progu nie składają wniosków.")
im.save(OUT + "/mms-subregiony.png", optimize=True)

# 4. Kto moze
W, H = 1600, 660
im, d = papier(W, H)
etykieta(d, 60, 50, "Kto może złożyć wniosek")
d.text((60, 88), "Jeden podmiot, jeden wniosek, jedna mikrodotacja", font=f_fraunces(56, 700), fill=TUSZ)
kto = [
    ("MiŚLOP", ["Stowarzyszenia, fundacje, koła gospodyń wiejskich, OSP, kluby sportowe", "Przychód do 200 tysięcy zł rocznie", "Do 50 procent na rozwój własnej organizacji"]),
    ("Grupy nieformalne", ["Od trzech pełnoletnich osób", "Bez rejestracji i bez patrona", "Mikrodotacja na rachunek jednego z członków"]),
    ("Organizacje patronackie", ["Użyczają osobowości prawnej grupie", "Podpisują umowę i rozliczają mikrodotację", "Jeden wniosek, nawet przy kilku grupach"]),
]
kw = 480; gx = 40
for i, (t, l) in enumerate(kto):
    kafel(d, 60 + i * (kw + gx), 190, kw, 330, t, l, akcent=[POM, KOB, TUSZ][i])
stopka(d, W, H, "Warunek wspólny: siedziba w województwie śląskim, w miejscowości do 100 tysięcy mieszkańców")
im.save(OUT + "/mms-kto.png", optimize=True)

# 5. Harmonogram
W, H = 1600, 560
im, d = papier(W, H)
etykieta(d, 60, 50, "Harmonogram")
d.text((60, 88), "Od wniosku do wypłaty w sześć tygodni", font=f_fraunces(56, 700), fill=TUSZ)
kroki = [("6 września", "start naboru"), ("6 października", "koniec naboru, 23:59"), ("7 do 14 października", "ocena wniosków"), ("15 października", "listy rankingowe"), ("16 do 23 października", "umowy i jedna wypłata"), ("23 listopada", "koniec realizacji")]
x0, x1, yl = 110, W - 110, 300
d.line([x0, yl, x1, yl], fill=TUSZ, width=4)
n = len(kroki)
for i, (data, opis) in enumerate(kroki):
    x = x0 + i * (x1 - x0) / (n - 1)
    d.ellipse([x - 16, yl - 16, x + 16, yl + 16], fill=POM if i in (0, 1) else KOB, outline=PAPIER, width=4)
    fd = f_lato(26, bold=True); fo = f_lato(22)
    wd = d.textlength(data, font=fd); wo = d.textlength(opis, font=fo)
    ty = yl - 90 if i % 2 == 0 else yl + 40
    d.text((x - wd / 2, ty), data, font=fd, fill=TUSZ)
    d.text((x - wo / 2, ty + 34), opis, font=fo, fill=SZARY)
stopka(d, W, H, "Wypłata jednorazowo, w 3 dni robocze od podpisania umowy. Sprawozdania do 27 listopada 2026.")
im.save(OUT + "/mms-harmonogram.png", optimize=True)
print("OK", os.listdir(OUT))
