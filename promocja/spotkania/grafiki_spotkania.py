# -*- coding: utf-8 -*-
"""Grafiki 1080x1350 na posty o szkoleniach Akademii Odporności: zdjęcie miejscowości plus termin.

Zdjęcia pochodzą z Wikimedia Commons, podpis z autorem i licencją idzie na grafikę.
Plan wydarzeń i zdjęć: plan_postow.json obok skryptu.
Identyfikacja Remiza jak w promocja/reklamy/grafiki_mms.py (papier, tusz, pomarańcz, kobalt).
Uruchomienie: python grafiki_spotkania.py
"""
import glob
import io
import json
import os
import sys
import urllib.request

from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding="utf-8")

KATALOG = os.path.dirname(os.path.abspath(__file__))
LOGO = os.path.normpath(os.path.join(KATALOG, "..", "..", "logotypy"))
PAPIER = (242, 238, 228)
TUSZ = (26, 23, 18)
POM = (255, 92, 57)
KOB = (43, 63, 166)
SZARY = (110, 105, 96)
KROPKA = (214, 208, 196)
BIEL = (255, 255, 255)
KLAUZULA = (
    "Sfinansowano ze środków Narodowego Instytutu Wolności – Centrum Rozwoju Społeczeństwa "
    "Obywatelskiego w ramach Rządowego Programu wsparcia organizacji pozarządowych "
    "Moc Małych Społeczności. Zadanie: Wielka Moc Małych Społeczności, Odporne Śląskie 2026."
)
UA = {"User-Agent": "KlasterInnowacjiSpolecznych/1.0 (mms@klaster.org.pl)"}
W, H = 1080, 1350
FOT_H = 560   # wysokość zdjęcia miejscowości
PAS_H = 232   # ciemny pas z oznaczeniami NIW


def znajdz(wzorce):
    katalogi = [r"C:\tmp\fonty", r"C:\Windows\Fonts", os.path.expandvars(r"%LOCALAPPDATA%\Microsoft\Windows\Fonts")]
    for w in wzorce:
        for k in katalogi:
            trafienia = glob.glob(os.path.join(k, w))
            if trafienia:
                return trafienia[0]
    return None


LATO_R = znajdz(["Lato-Regular.ttf", "Lato-Regular*.ttf"])
LATO_B = znajdz(["Lato-Bold.ttf", "Lato-Bold*.ttf"])
# Fraunces-1.ttf z Windows nie ma osi zmiennych, wiec najpierw statyczna wersja 700
FRAUNCES = znajdz(["Fraunces-700.ttf", "FrauncesOS-Bold.ttf", "Fraunces*.ttf"])
assert LATO_R and LATO_B and FRAUNCES, "brak fontow Lato/Fraunces"


def f_lato(sz, bold=False):
    return ImageFont.truetype(LATO_B if bold else LATO_R, sz)


def f_fraunces(sz, wght=700):
    f = ImageFont.truetype(FRAUNCES, sz)
    try:
        vals = []
        for a in f.get_variation_axes():
            n = a.get("name", b"")
            n = n.decode() if isinstance(n, bytes) else str(n)
            if "eight" in n or n == "wght":
                vals.append(wght)
            elif "ptical" in n or n == "opsz":
                vals.append(min(144, max(9, sz * 0.75)))
            else:
                vals.append(a["default"])
        f.set_variation_by_axes(vals)
    except Exception:
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
    """Rozstrzelone wersaliki, jak na pozostalych materialach."""
    f = f_lato(sz, bold=True)
    cx = x
    for ch in tekst.upper():
        d.text((cx, y), ch, font=f, fill=kolor)
        cx += d.textlength(ch, font=f) + 3
    return cx


def tekst_lam(d, x, y, tekst, font, fill, maxw, lh=None):
    linie, akt = [], ""
    for s in tekst.split():
        prob = (akt + " " + s).strip()
        if d.textlength(prob, font=font) <= maxw:
            akt = prob
        else:
            linie.append(akt)
            akt = s
    if akt:
        linie.append(akt)
    lh = lh or int(font.size * 1.25)
    for i, l in enumerate(linie):
        d.text((x, y + i * lh), l, font=font, fill=fill)
    return y + len(linie) * lh


def wklej(im, sciezka, x, y, h):
    lg = Image.open(sciezka).convert("RGBA")
    w = int(lg.width * h / lg.height)
    lg = lg.resize((w, h), Image.LANCZOS)
    im.paste(lg, (int(x), int(y)), lg)
    return w


def zdjecie(url, szer, wys):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=90) as r:
        im = Image.open(io.BytesIO(r.read())).convert("RGB")
    skala = max(szer / im.width, wys / im.height)
    im = im.resize((max(szer, round(im.width * skala)), max(wys, round(im.height * skala))), Image.LANCZOS)
    x = (im.width - szer) // 2
    y = int((im.height - wys) * 0.42)  # lekko powyzej srodka, bo niebo mniej wazne niz dachy
    return im.crop((x, y, x + szer, y + wys))


def grafika(p, plik):
    im, d = papier(W, H)

    im.paste(zdjecie(p["url"], W, FOT_H), (0, 0))
    # poswiata pod podpisem, zeby autor byl czytelny na kazdym kadrze
    pas = im.crop((0, FOT_H - 80, W, FOT_H)).convert("RGBA")
    scrim = Image.new("RGBA", (W, 80), (0, 0, 0, 0))
    ds = ImageDraw.Draw(scrim)
    for i in range(80):
        ds.line([(0, i), (W, i)], fill=(0, 0, 0, int(215 * i / 80)))
    im.paste(Image.alpha_composite(pas, scrim).convert("RGB"), (0, FOT_H - 80))
    d.rectangle([0, FOT_H, W, FOT_H + 8], fill=POM)
    podpis = f"fot. {p['autor']}, Wikimedia Commons, {p['licencja']}"
    f = f_lato(19)
    d.text((W - 60 - d.textlength(podpis, font=f), FOT_H - 38), podpis, font=f, fill=(255, 255, 255))

    blok_dolny(im, d, kicker=f"Szkolenie, {p['dzien']} {p['data_pl']}",
               tytul=p["miasto"], tytul_sz=96 if len(p["miasto"]) <= 13 else 62,
               zdanie="Bezpłatne szkolenie o pisaniu wniosku o mikrodotację do 10 000 zł.",
               linia=p["godziny"] + (f", {p['miejsce']}" if p["miejsce"] else ""),
               dopisek="Udział bezpłatny, bez limitu miejsc, obowiązują zapisy.")
    im.save(plik, optimize=True)


def pas_hasla(im, d, haslo, tlo, etykieta_tekst):
    """Gorny pas webinarium: plaszczyzna koloru z haslem zamiast zdjecia miejscowosci."""
    d.rectangle([0, 0, W, FOT_H], fill=tlo)
    # znak S z kropka jak na reklamach, tonalnie, zeby nie wchodzil na haslo
    sz = 260
    x0, y0 = W - sz - 30, FOT_H - sz - 20
    d.text((x0, y0), "Ś", font=f_fraunces(sz, 700), fill=(48, 44, 38) if tlo == TUSZ else (58, 78, 178))
    d.ellipse([x0 + int(sz * 0.72), y0 + int(sz * 0.62),
               x0 + int(sz * 0.83), y0 + int(sz * 0.73)], fill=POM)
    etykieta(d, 60, 56, etykieta_tekst, kolor=POM)
    tekst_lam(d, 60, 132, haslo, f_fraunces(66, 700), BIEL, W - 400, lh=80)
    d.rectangle([0, FOT_H, W, FOT_H + 8], fill=POM)


def blok_dolny(im, d, kicker, tytul, tytul_sz, zdanie, linia, dopisek):
    """Papierowa czesc pod pasem: termin, tytul, jedno zdanie, adres, organizatorzy, oznaczenia."""
    y = FOT_H + 8 + 50
    etykieta(d, 60, y, kicker)
    y += 54
    f_t = f_fraunces(tytul_sz, 700)
    y = tekst_lam(d, 60, y, tytul, f_t, TUSZ, W - 120, lh=int(f_t.size * 1.06)) + 14
    y = tekst_lam(d, 60, y, zdanie, f_lato(32), TUSZ, W - 120, lh=42) + 8
    tekst_lam(d, 60, y, linia, f_lato(28, bold=True), POM, W - 120, lh=38)

    # adres strony jako przycisk, bo na Instagramie link w opisie nie jest klikalny
    f_a = f_lato(34, bold=True)
    adres = "mms.klaster.org.pl/spotkania"
    bw = d.textlength(adres, font=f_a) + 80
    bh = f_a.size + 40
    by = H - PAS_H - 108 - bh
    d.rounded_rectangle([60, by, 60 + bw, by + bh], radius=14, fill=KOB)
    d.text((100, by + 20), adres, font=f_a, fill=BIEL)
    d.text((60, by + bh + 18), dopisek, font=f_lato(24), fill=SZARY)

    # organizatorzy na papierze: logo Klastra nigdy nie stoi samo
    ox = 60 + bw + 56
    oy = by + (bh - 60) // 2
    w1 = wklej(im, os.path.join(LOGO, "kis-logo.png"), ox, oy, 60)
    d.line([ox + w1 + 26, oy + 4, ox + w1 + 26, oy + 56], fill=(200, 195, 185), width=2)
    wklej(im, os.path.join(LOGO, "ir-kolor-bez-tla.png"), ox + w1 + 52, oy, 60)

    d.rectangle([0, H - PAS_H, W, H], fill=TUSZ)
    wklej(im, os.path.join(LOGO, "web-mms-inwersja.png"), 60, H - PAS_H + 34, 78)
    tekst_lam(d, 60, H - PAS_H + 34 + 78 + 22, KLAUZULA, f_lato(18), (200, 195, 185), W - 120, lh=24)


def grafika_webinar(p, plik):
    im, d = papier(W, H)
    pas_hasla(im, d, p["haslo"], KOB if p["obszar"] else TUSZ,
              "Obszar odporności" if p["obszar"] else "Akademia Odporności")
    blok_dolny(im, d, kicker=f"Webinarium online, {p['dzien']} {p['data_pl']}",
               tytul=p["tytul"], tytul_sz=p.get("tytul_sz", 54),
               zdanie=p["zdanie"], linia="17:00 do 19:00, online",
               dopisek="Udział bezpłatny, zapisy online. Nagranie zostaje na stronie.")
    im.save(plik, optimize=True)


def main():
    for nazwa, rysuj in (("plan_postow.json", grafika), ("plan_webinaria.json", grafika_webinar)):
        sciezka = os.path.join(KATALOG, nazwa)
        if not os.path.exists(sciezka):
            continue
        for p in json.load(open(sciezka, encoding="utf-8")):
            rysuj(p, os.path.join(KATALOG, f"{p['slug']}.png"))
            print("OK", p["slug"])


if __name__ == "__main__":
    main()
