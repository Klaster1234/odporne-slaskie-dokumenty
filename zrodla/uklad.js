/**
 * Wspolny sklad dokumentow konkursowych "Odporne Slaskie 2026".
 * Uzywane przez buduj-regulamin.js oraz buduj-wzory.js.
 */
const fs = require("fs");
const path = require("path");
const {
  Document, Paragraph, TextRun, AlignmentType, BorderStyle, Header, Footer, PageNumber,
  Table, TableRow, TableCell, WidthType, ShadingType, ImageRun, TabStopType,
  convertMillimetersToTwip, VerticalAlign,
} = require("docx");

const BAZA = path.resolve(__dirname, "..");

const TUSZ = "1A1712";
const RISO = "FF5C39";
const SZARY = "6B6152";
const LINIA = "C9C1B2";
const PAPIER = "EDE8DC";
const SERIF = "Fraunces";
const SANS = "Lato";

const KLAUZULA =
  "Sfinansowano ze środków Narodowego Instytutu Wolności – Centrum Rozwoju Społeczeństwa " +
  "Obywatelskiego w ramach Rządowego Programu wsparcia organizacji pozarządowych " +
  "Moc Małych Społeczności";

const ZADANIE = "Wielka Moc Małych Społeczności – Odporne Śląskie 2026";
/** Nazwa konkursu narzucona przez § 1 ust. 4 umowy nr 12/2/MMS/2026. Nie zmieniac. */
const KONKURS = "Moc Małych Społeczności – Śląskie";
const UMOWA_NIW = "12/2/MMS/2026";
const SZEROKOSC = 9070; // szerokosc kolumny tekstu w twipach

const obraz = (wzgledna) => fs.readFileSync(path.join(BAZA, wzgledna));
const po = (pt) => ({ after: pt * 20 });
const LITERY = "abcdefghijklmnopqrstuvwxyz".split("");

/* ---------- elementy tekstowe ---------- */

function naglowekSekcji(oznaczenie, tytul) {
  const bloki = [];
  if (oznaczenie) {
    bloki.push(new Paragraph({
      spacing: { before: 300, after: 40 }, keepNext: true,
      children: [new TextRun({
        text: oznaczenie, font: SANS, bold: true, size: 19, color: RISO, characterSpacing: 30,
      })],
    }));
  }
  bloki.push(new Paragraph({
    spacing: { before: oznaczenie ? 0 : 300, after: 140 }, keepNext: true,
    children: [new TextRun({ text: tytul, font: SERIF, bold: true, size: 28, color: TUSZ })],
  }));
  return bloki;
}

function akapit(tekst, opcje = {}) {
  return new Paragraph({
    spacing: po(opcje.odstep ?? 7),
    children: [new TextRun({
      text: tekst, font: SANS, size: opcje.rozmiar || 20,
      color: opcje.kolor || TUSZ, italics: !!opcje.kursywa, bold: !!opcje.pogrub,
    })],
  });
}

function ustep(numer, tekst) {
  return new Paragraph({
    spacing: po(5), indent: { left: 400, hanging: 400 },
    tabStops: [{ type: TabStopType.LEFT, position: 400 }],
    children: [
      new TextRun({ text: `${numer}.`, font: SANS, size: 22, color: TUSZ }),
      new TextRun({ text: "\t", font: SANS, size: 22 }),
      new TextRun({ text: tekst, font: SANS, size: 22, color: TUSZ }),
    ],
  });
}

function punkt(litera, tekst) {
  return new Paragraph({
    spacing: po(3), indent: { left: 800, hanging: 340 },
    tabStops: [{ type: TabStopType.LEFT, position: 800 }],
    children: [
      new TextRun({ text: `${litera})`, font: SANS, size: 22, color: SZARY }),
      new TextRun({ text: "\t", font: SANS, size: 22 }),
      new TextRun({ text: tekst, font: SANS, size: 22, color: TUSZ }),
    ],
  });
}

function cytat(tekst) {
  return new Paragraph({
    spacing: { before: 90, after: 110 }, indent: { left: 800, right: 300 },
    border: { left: { style: BorderStyle.SINGLE, size: 18, color: RISO, space: 14 } },
    children: [new TextRun({ text: `„${tekst}”`, font: SANS, size: 22, color: TUSZ, italics: true })],
  });
}

function podpowiedz(tekst) {
  return new Paragraph({
    spacing: po(6),
    children: [new TextRun({ text: tekst, font: SANS, size: 19, color: SZARY, italics: true })],
  });
}

/* ---------- elementy formularza ---------- */

function komorka(tekst, o = {}) {
  const dzieci = Array.isArray(tekst) ? tekst : [new Paragraph({
    alignment: o.prawo ? AlignmentType.RIGHT : (o.srodek ? AlignmentType.CENTER : AlignmentType.LEFT),
    spacing: { before: 0, after: 0 },
    children: [new TextRun({
      text: tekst, font: SANS, size: o.rozmiar || 19,
      bold: !!o.pogrub, color: o.kolor || TUSZ, italics: !!o.kursywa,
    })],
  })];
  return new TableCell({
    width: { size: o.szer, type: WidthType.DXA },
    shading: o.tlo ? { type: ShadingType.CLEAR, fill: o.tlo, color: "auto" } : undefined,
    margins: { top: o.wysoko || 90, bottom: o.wysoko || 90, left: 130, right: 130 },
    verticalAlign: VerticalAlign.CENTER,
    columnSpan: o.scal,
    children: dzieci,
  });
}

function ramkaTabeli(gruba = 8) {
  return {
    top: { style: BorderStyle.SINGLE, size: gruba, color: TUSZ },
    bottom: { style: BorderStyle.SINGLE, size: gruba, color: TUSZ },
    left: { style: BorderStyle.SINGLE, size: gruba, color: TUSZ },
    right: { style: BorderStyle.SINGLE, size: gruba, color: TUSZ },
    insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: LINIA },
    insideVertical: { style: BorderStyle.SINGLE, size: 4, color: LINIA },
  };
}

function tabela(szerokosci, wiersze) {
  return new Table({
    columnWidths: szerokosci,
    width: { size: szerokosci.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    rows: wiersze,
    borders: ramkaTabeli(),
  });
}

/** Tabela z naglowkiem i podanymi wierszami danych. */
function tabelaDanych(szerokosci, naglowki, wiersze, opcje = {}) {
  const rows = [new TableRow({
    tableHeader: true,
    children: naglowki.map((h, i) => komorka(h, {
      szer: szerokosci[i], tlo: TUSZ, kolor: "F2EEE4", pogrub: true,
      srodek: i > 0 && opcje.srodkujLiczby,
    })),
  })];
  wiersze.forEach((w, idx) => {
    const ostatni = opcje.podsumowanie && idx === wiersze.length - 1;
    rows.push(new TableRow({
      children: w.map((c, i) => komorka(c, {
        szer: szerokosci[i], pogrub: ostatni, tlo: ostatni ? PAPIER : undefined,
        prawo: opcje.prawoOd !== undefined && i >= opcje.prawoOd,
      })),
    }));
  });
  return tabela(szerokosci, rows);
}

/** Tabela do wypelnienia recznie: naglowek plus puste wiersze. */
function tabelaPusta(szerokosci, naglowki, ileWierszy, wysokoscWiersza = 200) {
  const rows = [new TableRow({
    tableHeader: true,
    children: naglowki.map((h, i) => komorka(h, {
      szer: szerokosci[i], tlo: TUSZ, kolor: "F2EEE4", pogrub: true, rozmiar: 17,
    })),
  })];
  for (let r = 0; r < ileWierszy; r++) {
    rows.push(new TableRow({
      children: szerokosci.map((s) => komorka("", { szer: s, wysoko: wysokoscWiersza })),
    }));
  }
  return tabela(szerokosci, rows);
}

/** Pole do wypelnienia: etykieta nad ramka o zadanej wysokosci. */
function pole(etykieta, wierszy = 3, wskazowka) {
  const bloki = [new Paragraph({
    spacing: { before: 180, after: 50 },
    children: [new TextRun({
      text: etykieta, font: SANS, bold: true, size: 20, color: TUSZ,
    })],
  })];
  if (wskazowka) bloki.push(podpowiedz(wskazowka));
  const puste = [];
  for (let i = 0; i < wierszy; i++) {
    puste.push(new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun({ text: "", size: 22 })] }));
  }
  bloki.push(tabela([SZEROKOSC], [new TableRow({
    children: [new TableCell({
      width: { size: SZEROKOSC, type: WidthType.DXA },
      margins: { top: 110, bottom: 110, left: 140, right: 140 },
      children: puste,
    })],
  })]));
  return bloki;
}

/** Wiersz danych: etykieta i pusta linia w jednej tabeli dwukolumnowej. */
function polaKrotkie(pary) {
  const L = 3000, P = SZEROKOSC - L;
  const rows = pary.map(([etykieta, podp]) => new TableRow({
    children: [
      komorka(etykieta, { szer: L, tlo: PAPIER, pogrub: true, rozmiar: 18 }),
      komorka(podp || "", { szer: P, kolor: SZARY, kursywa: true, rozmiar: 17, wysoko: 150 }),
    ],
  }));
  return tabela([L, P], rows);
}

function kratka(tekst, o = {}) {
  return new Paragraph({
    spacing: po(o.odstep ?? 5), indent: { left: 400, hanging: 400 },
    tabStops: [{ type: TabStopType.LEFT, position: 400 }],
    children: [
      new TextRun({ text: "☐", font: SANS, size: 26, color: TUSZ }),
      new TextRun({ text: "\t", font: SANS, size: 22 }),
      new TextRun({ text: tekst, font: SANS, size: o.rozmiar || 19, color: TUSZ }),
    ],
  });
}

function miejsceNaPodpis(pary) {
  const SZER = Math.floor(SZEROKOSC / pary.length);
  const puste = new Paragraph({ spacing: { before: 640, after: 0 }, children: [new TextRun({ text: "", size: 22 })] });
  return new Table({
    columnWidths: pary.map(() => SZER),
    width: { size: SZER * pary.length, type: WidthType.DXA },
    rows: [new TableRow({
      children: pary.map((p) => new TableCell({
        width: { size: SZER, type: WidthType.DXA },
        margins: { top: 60, bottom: 60, left: 0, right: 220 },
        borders: {
          top: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.NONE },
        },
        children: [
          puste,
          new Paragraph({
            border: { top: { style: BorderStyle.SINGLE, size: 6, color: TUSZ, space: 6 } },
            spacing: { after: 0 },
            children: [new TextRun({ text: p, font: SANS, size: 19, color: SZARY })],
          }),
        ],
      })),
    }),
    ],
    borders: {
      top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
    },
  });
}

/* ---------- strona tytulowa i zakonczenie ---------- */

function stronaTytulowa(m) {
  const bloki = [
    new Paragraph({
      spacing: { before: 700, after: 190 },
      children: [new ImageRun({
        type: "png", data: obraz("znak/os-poziomy-320.png"),
        transformation: { width: 232, height: 43 },
      })],
    }),
    new Paragraph({
      spacing: po(9),
      shading: { type: ShadingType.CLEAR, fill: RISO, color: "auto" },
      indent: { left: 90, right: 90 },
      children: [new TextRun({
        text: (m.stempel || "WZÓR DOKUMENTU").toUpperCase(), font: SANS, bold: true,
        size: 17, color: "FFFFFF", characterSpacing: 50,
      })],
    }),
    new Paragraph({
      spacing: { before: 250, after: 60 },
      children: [new TextRun({ text: m.tytul, font: SERIF, bold: true, size: m.duzy === false ? 40 : 46, color: TUSZ })],
    }),
    new Paragraph({
      spacing: po(16),
      children: [new TextRun({ text: "Odporne Śląskie 2026", font: SERIF, size: 30, color: RISO })],
    }),
    new Paragraph({
      spacing: po(4),
      border: { top: { style: BorderStyle.SINGLE, size: 12, color: TUSZ, space: 10 } },
      children: [],
    }),
  ];
  const meta = (e, w) => new Paragraph({
    spacing: po(3),
    tabStops: [{ type: TabStopType.LEFT, position: 2900 }],
    children: [
      new TextRun({ text: e.toUpperCase(), font: SANS, bold: true, size: 17, color: SZARY, characterSpacing: 30 }),
      new TextRun({ text: "\t", font: SANS, size: 22 }),
      new TextRun({ text: w, font: SANS, size: 22, color: TUSZ }),
    ],
  });
  bloki.push(
    meta("Konkurs", KONKURS),
    meta("Zadanie", ZADANIE),
    meta("Program", "Rządowy Program wsparcia organizacji pozarządowych Moc Małych Społeczności 2026, Priorytet 2"),
    meta("Umowa", "nr " + UMOWA_NIW + ", oferta nr 97594"),
    meta("Operator", "Fundacja Klaster Innowacji Społecznych"),
    meta("Współoferent", "Instytut Roździeńskiego"),
    meta("Wersja", (m.wersja || "wersja 1.6") + ", " + (m.data || "6 września 2026")),
  );
  if (m.uwaga) {
    bloki.push(new Paragraph({
      spacing: { before: 240 },
      border: {
        top: { style: BorderStyle.SINGLE, size: 12, color: TUSZ, space: 12 },
        bottom: { style: BorderStyle.SINGLE, size: 12, color: TUSZ, space: 12 },
        left: { style: BorderStyle.SINGLE, size: 12, color: TUSZ, space: 12 },
        right: { style: BorderStyle.SINGLE, size: 12, color: TUSZ, space: 12 },
      },
      children: [new TextRun({ text: m.uwaga, font: SANS, size: 20, color: TUSZ })],
    }));
  }
  bloki.push(...pasOznaczenBlok());
  return bloki;
}

/** Pas oznaczen stoi na stronie tytulowej; wywolania na koncu dokumentu nic nie dodaja. */
function pasekOznaczen() {
  return [];
}

function pasOznaczenBlok() {
  return [
    new Paragraph({
      spacing: { before: 360, after: 120 },
      border: { top: { style: BorderStyle.SINGLE, size: 12, color: TUSZ, space: 14 } },
      children: [new TextRun({
        text: "ZADANIE FINANSOWANE ZE ŚRODKÓW BUDŻETU PAŃSTWA", font: SANS, bold: true,
        size: 17, color: SZARY, characterSpacing: 40,
      })],
    }),
    new Paragraph({
      spacing: po(9),
      children: [new ImageRun({
        type: "png", data: obraz("logotypy/web-mms-kolor.png"),
        transformation: { width: 420, height: 77 },
      })],
    }),
    new Paragraph({
      spacing: po(6),
      children: [new TextRun({ text: KLAUZULA + ".", font: SANS, size: 21, color: TUSZ })],
    }),
    new Paragraph({
      spacing: po(12),
      children: [new TextRun({
        text: "Konkurs „" + KONKURS + "” prowadzony jest w ramach zadania „" + ZADANIE + "”, które realizują wspólnie Fundacja Klaster Innowacji Społecznych, lider oferty wspólnej, oraz Instytut Roździeńskiego, współoferent.",
        font: SANS, size: 21, color: SZARY,
      })],
    }),
    new Paragraph({
      spacing: po(9),
      children: [
        new ImageRun({ type: "png", data: obraz("logotypy/kis-logo.png"), transformation: { width: 118, height: 71 } }),
        new TextRun({ text: "        ", font: SANS, size: 22 }),
        new ImageRun({ type: "png", data: obraz("logotypy/ir-kolor.png"), transformation: { width: 85, height: 71 } }),
      ],
    }),
  ];
}

/* ---------- dokument ---------- */

function zbuduj(m, dzieci) {
  return new Document({
    creator: "Fundacja Klaster Innowacji Społecznych",
    title: m.tytul + ", Odporne Śląskie 2026",
    description: "Dokument konkursowy, zadanie " + ZADANIE,
    styles: { default: { document: { run: { font: SANS, size: 22, color: TUSZ } } } },
    sections: [{
      properties: {
        page: {
          margin: {
            top: convertMillimetersToTwip(30), bottom: convertMillimetersToTwip(24),
            left: convertMillimetersToTwip(24), right: convertMillimetersToTwip(22),
          },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              spacing: { after: 40 },
              tabStops: [{ type: TabStopType.RIGHT, position: SZEROKOSC }],
              children: [
                new ImageRun({
                  type: "png",
                  data: obraz("logotypy/mms-zestawienie-stopka.png"),
                  transformation: { width: 208, height: 38 },
                }),
                new TextRun({ text: "	", font: SANS, size: 19 }),
                new TextRun({ text: "Odporne Śląskie 2026", font: SERIF, bold: true, size: 19, color: TUSZ }),
              ],
            }),
            new Paragraph({
              spacing: { after: 60 },
              alignment: AlignmentType.RIGHT,
              border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: LINIA, space: 6 } },
              children: [
                new TextRun({ text: m.naglowek || m.tytul, font: SANS, size: 18, color: SZARY }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              spacing: { before: 60 },
              border: { top: { style: BorderStyle.SINGLE, size: 6, color: LINIA, space: 8 } },
              tabStops: [{ type: TabStopType.RIGHT, position: SZEROKOSC }],
              children: [
                new TextRun({ text: KLAUZULA + ".", font: SANS, size: 15, color: SZARY }),
                new TextRun({ text: "	", font: SANS, size: 16 }),
                new TextRun({ text: "s. ", font: SANS, size: 16, color: SZARY }),
                new TextRun({ children: [PageNumber.CURRENT], font: SANS, size: 16, color: SZARY }),
                new TextRun({ text: " z ", font: SANS, size: 16, color: SZARY }),
                new TextRun({ children: [PageNumber.TOTAL_PAGES], font: SANS, size: 16, color: SZARY }),
              ],
            }),
          ],
        }),
      },
      children: dzieci,
    }],
  });
}

module.exports = {
  KONKURS, UMOWA_NIW,
  TUSZ, RISO, SZARY, LINIA, PAPIER, SERIF, SANS, KLAUZULA, ZADANIE, SZEROKOSC, LITERY,
  obraz, po, naglowekSekcji, akapit, ustep, punkt, cytat, podpowiedz,
  komorka, tabela, tabelaDanych, tabelaPusta, pole, polaKrotkie, kratka, miejsceNaPodpis,
  stronaTytulowa, pasekOznaczen, zbuduj,
};
