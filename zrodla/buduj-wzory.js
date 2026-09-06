/**
 * Buduje pozostale dokumenty konkursowe:
 * wzor wniosku, karta oceny formalnej, karta oceny merytorycznej,
 * wzor umowy o powierzenie mikrodotacji, wzor sprawozdania koncowego.
 *
 * Uruchomienie: node buduj-wzory.js
 */
const fs = require("fs");
const path = require("path");
const { Packer, Paragraph, TextRun, TableRow, BorderStyle, PageBreak } = require("docx");
const U = require("./uklad");

const { SZEROKOSC, SANS, SERIF, TUSZ, SZARY, PAPIER, RISO, LITERY } = U;

const kreska = () => new Paragraph({
  spacing: { before: 200, after: 120 },
  border: { top: { style: BorderStyle.SINGLE, size: 6, color: U.LINIA, space: 8 } },
  children: [],
});
const lamStrone = () => new Paragraph({ children: [new PageBreak()] });

/* =======================================================================
   1. WZOR WNIOSKU O MIKRODOTACJE
   ======================================================================= */

function wzorWniosku() {
  const b = [];
  b.push(...U.stronaTytulowa({
    tytul: "Wniosek o mikrodotację",
    stempel: "Załącznik nr 1 do regulaminu",
    uwaga: "Wniosek składa się wyłącznie elektronicznie w systemie konkursowym. Ten dokument służy do przygotowania treści przed wypełnieniem formularza online oraz do pracy w zespole. Limity znaków są takie same jak w systemie.",
  }));
  b.push(lamStrone());

  b.push(...U.naglowekSekcji("Część A", "Wnioskodawca"));
  b.push(U.podpowiedz("Zaznacz jedną odpowiedź. Wybór decyduje o dalszych polach i o limitach budżetu."));
  b.push(U.kratka("Małe lub średnie lokalne organizacje pozarządowe, w skrócie MiŚLOP"));
  b.push(U.kratka("Lokalna grupa nieformalna działająca samodzielnie"));
  b.push(U.kratka("Organizacja patronacka w imieniu grupy nieformalnej"));
  b.push(U.polaKrotkie([
    ["Pełna nazwa podmiotu", ""],
    ["Forma prawna", "stowarzyszenie, fundacja, koło gospodyń wiejskich, OSP, klub sportowy, inna"],
    ["Numer KRS lub innego rejestru", ""],
    ["NIP", ""],
    ["REGON", ""],
    ["Miejscowość siedziby albo zamieszkania", "grupa nieformalna działająca samodzielnie: miejscowość osoby do kontaktu"],
    ["Ulica, numer, kod pocztowy", ""],
    ["Gmina", ""],
    ["Powiat", ""],
    ["Subregion", "zachodni, południowy, centralny, północny"],
    ["Liczba mieszkańców miejscowości", "warunek udziału: nie więcej niż 100 000"],
    ["Numer rachunku bankowego", "grupa nieformalna podaje rachunek jednego ze swoich członków"],
    ["Właściciel rachunku", "imię i nazwisko, jeżeli rachunek należy do członka grupy nieformalnej"],
  ]));
  b.push(U.akapit("Osoba do kontaktu", { pogrub: true, odstep: 3 }));
  b.push(U.polaKrotkie([
    ["Imię i nazwisko", ""], ["Funkcja", ""], ["Telefon", ""], ["Adres e-mail", ""],
  ]));
  b.push(U.akapit("Osoby uprawnione do reprezentacji podmiotu", { pogrub: true, odstep: 3 }));
  b.push(U.podpowiedz("Grupa nieformalna działająca samodzielnie wpisuje tu osoby, które podpiszą umowę w jej imieniu."));
  b.push(U.tabelaPusta([3200, 3000, 2870], ["Imię i nazwisko", "Funkcja", "Podstawa reprezentacji"], 2));
  b.push(U.podpowiedz("Poniższą tabelę wypełniają grupy nieformalne, także działające przez organizację patronacką. Wymagane są co najmniej trzy pełnoletnie osoby zamieszkałe w województwie śląskim."));
  b.push(U.tabelaPusta([3200, 3000, 2870], ["Imię i nazwisko", "Rola w grupie", "Uwagi"], 3));
  b.push(U.podpowiedz("Grupa nieformalna działająca przez organizację patronacką: wnioskodawcą jest organizacja patronacka, jej dane wpisuje się wyżej jako dane podmiotu."));
  b.push(U.polaKrotkie([
    ["Nazwa grupy nieformalnej", "jeżeli grupa działa przez organizację patronacką"],
  ]));

  b.push(lamStrone());
  b.push(...U.naglowekSekcji("Część B", "Mikroprojekt"));
  b.push(U.polaKrotkie([
    ["Tytuł mikroprojektu", "do 150 znaków"],
    ["Miejsce realizacji", "gmina i miejscowość"],
    ["Okres realizacji", "16 października 2026 do 23 listopada 2026, taki sam dla wszystkich mikroprojektów"],
  ]));
  b.push(...U.pole("Skrót mikroprojektu", 4,
    "Do 600 znaków. Ten opis publikujemy na liście dofinansowanych inicjatyw, więc napisz go tak, żeby był zrozumiały dla osoby z zewnątrz."));

  b.push(...U.naglowekSekcji("Część C", "Komponent odporności, obowiązkowy"));
  b.push(U.podpowiedz("Zaznacz co najmniej jeden obszar. Wniosek bez wskazanego obszaru i bez opisu nie przechodzi oceny formalnej."));
  [
    "Pierwsza pomoc i obsługa AED",
    "Klęski żywiołowe i długotrwała przerwa w dostawie prądu",
    "Bezpieczeństwo cyfrowe, dezinformacja i oszustwa",
    "Sieci sąsiedzkie i wolontariat spontaniczny",
    "Współpraca ze służbami i z jednostkami OSP",
  ].forEach((o) => b.push(U.kratka(o)));
  b.push(...U.pole("Jak mikroprojekt realizuje wybrany obszar", 7,
    "Od 300 do 2 000 znaków. Napisz, co konkretnie zrobicie i co po tym zostanie w społeczności. Sam wybór obszaru bez powiązania z działaniami obniża punktację w kryterium pierwszym."));

  b.push(lamStrone());
  b.push(...U.naglowekSekcji("Część D", "Diagnoza potrzeby lokalnej"));
  b.push(...U.pole("Jaką potrzebę zaspokaja mikroprojekt", 8, "Do 2 500 znaków."));
  b.push(...U.pole("Skąd wiecie o tej potrzebie", 4,
    "Do 800 znaków. Rozmowy z mieszkańcami, ankieta, dane gminy, konkretne zdarzenie."));

  b.push(...U.naglowekSekcji("Część E", "Działania"));
  b.push(U.podpowiedz("Od jednego do dziesięciu działań. Przy każdym podajcie nazwę, opis, termin od i do, miejsce oraz liczbę uczestników. Terminy działań są harmonogramem mikroprojektu."));
  b.push(U.tabelaPusta([600, 4070, 1600, 1500, 1300],
    ["Lp.", "Nazwa i opis działania", "Termin od i do", "Miejsce", "Liczba uczestników"], 6, 240));

  b.push(lamStrone());
  b.push(...U.naglowekSekcji("Część F", "Odbiorcy"));
  b.push(U.polaKrotkie([
    ["Planowana liczba odbiorców bezpośrednich", "operator zakłada średnio 19 osób na inicjatywę"],
    ["Planowana liczba odbiorców pośrednich", ""],
  ]));
  b.push(U.akapit("Grupy odbiorców", { pogrub: true, odstep: 3 }));
  ["Seniorzy", "Dzieci i młodzież", "Rodziny", "Osoby z niepełnosprawnościami", "Mieszkańcy ogółem"]
    .forEach((g) => b.push(U.kratka(g, { odstep: 3 })));
  b.push(U.akapit("Czy w działaniach uczestniczą osoby małoletnie", { pogrub: true, odstep: 3 }));
  b.push(U.kratka("Tak, wdrażamy standardy ochrony małoletnich i weryfikujemy osoby w Rejestrze Sprawców Przestępstw na Tle Seksualnym", { odstep: 3 }));
  b.push(U.kratka("Nie"));

  b.push(...U.naglowekSekcji("Część G", "Rezultaty"));
  b.push(U.podpowiedz("Co najmniej dwa wskaźniki liczbowe. Od nich zależy rozliczenie: 80 procent wykonania to rozliczenie prawidłowe, poniżej 50 procent oznacza zwrot środków."));
  b.push(U.tabelaPusta([3600, 1700, 3770],
    ["Nazwa wskaźnika", "Wartość docelowa", "Sposób pomiaru"], 4));
  b.push(...U.pole("Co zostanie w społeczności po zakończeniu mikroprojektu", 4,
    "Do 1 000 znaków. Sprzęt, procedura, przeszkolony zespół, nowy kontakt do współpracy."));

  b.push(lamStrone());
  b.push(...U.naglowekSekcji("Część H", "Budżet"));
  b.push(U.podpowiedz("Suma od 1 000 zł do 10 000 zł. Żadna pozycja majątkowa nie może przekroczyć 10 000 zł. MiŚLOP mogą przeznaczyć do 50 procent na rozwój instytucjonalny, grupy nieformalne nie mogą tego robić i nie kupują środków trwałych."));
  b.push(U.tabelaPusta([2900, 1500, 1100, 1100, 1200, 1270],
    ["Nazwa kosztu", "Rodzaj", "Jednostka", "Liczba", "Cena jedn.", "Wartość"], 8, 180));
  b.push(U.podpowiedz("W kolumnie Rodzaj wpisz: merytoryczny albo rozwój instytucjonalny."));
  b.push(U.polaKrotkie([
    ["Suma wnioskowanej mikrodotacji", ""],
    ["W tym rozwój instytucjonalny", "dotyczy wyłącznie MiŚLOP, maksymalnie 50 procent"],
  ]));
  b.push(...U.pole("Uzasadnienie budżetu", 5, "Do 1 500 znaków."));

  b.push(...U.naglowekSekcji("Część I", "Potencjał realizatora"));
  b.push(...U.pole("Doświadczenie", 5,
    "Do 1 500 znaków. Jeżeli to Wasz pierwszy grant, napiszcie to wprost. Brak doświadczenia grantowego nie jest wadą w tym konkursie."));
  b.push(...U.pole("Zasoby", 4, "Ludzie, lokal, sprzęt, partnerzy lokalni."));
  b.push(U.polaKrotkie([["Planowana liczba wolontariuszy", "pole nieobowiązkowe"]]));

  b.push(lamStrone());
  b.push(...U.naglowekSekcji("Część J", "Oświadczenia"));
  b.push(U.podpowiedz("Wszystkie oświadczenia są obowiązkowe. Bez ich złożenia system nie pozwoli wysłać wniosku."));
  [
    "Zapoznaliśmy się z regulaminem konkursu i akceptujemy jego postanowienia.",
    "Podmiot nie jest wpisany do rejestru podmiotów wykluczonych z możliwości otrzymania środków publicznych.",
    "Podmiot nie zalega z należnościami publicznoprawnymi.",
    "Wobec podmiotu nie toczy się postępowanie egzekucyjne dotyczące zobowiązań publicznoprawnych.",
    "Podmiot spełnia warunki formalne Rządowego Programu wsparcia organizacji pozarządowych Moc Małych Społeczności.",
    "Podmiot składa w tym naborze tylko ten jeden wniosek.",
    "Dane podane we wniosku są zgodne ze stanem faktycznym.",
    "Siedziba albo miejsce zamieszkania wnioskodawcy jest w województwie śląskim, w miejscowości liczącej nie więcej niż 100 000 mieszkańców (przy grupie nieformalnej działającej samodzielnie: miejsce zamieszkania osoby do kontaktu).",
    "Wyrażamy zgodę na przetwarzanie danych osobowych na zasadach opisanych w klauzuli informacyjnej.",
    "Zobowiązujemy się do oznaczania materiałów zgodnie z wymogami regulaminu.",
    "Zobowiązujemy się do zapewnienia apartyjnego charakteru wydarzeń w mikroprojekcie.",
    "Podmiot nie jest wpisany do rejestru podmiotów wykluczonych z możliwości otrzymania środków publicznych, nie zalega z należnościami publicznoprawnymi i nie toczy się wobec niego postępowanie egzekucyjne dotyczące zobowiązań publicznoprawnych.",
    "Podmiot spełnia warunki formalne Rządowego Programu wsparcia organizacji pozarządowych Moc Małych Społeczności.",
    "Wśród osób reprezentujących wnioskodawcę albo tworzących grupę nieformalną nie ma członków komisji oceniającej ani osób zatrudnionych u Operatora lub współoferenta, a osoby te nie pełnią funkcji w organach wnioskodawcy.",
    "Składamy w tym naborze tylko jeden wniosek.",
  ].forEach((o) => b.push(U.kratka(o)));
  b.push(U.podpowiedz("Poniższe oświadczenie składają wyłącznie MiŚLOP. Próg wynika z regulaminu Programu Moc Małych Społeczności."));
  b.push(U.kratka("Średni roczny przychód organizacji z trzech ostatnich zamkniętych lat budżetowych nie przekroczył 200 000 zł."));
  b.push(U.podpowiedz("Poniższe oświadczenia składa się tylko wtedy, gdy w działaniach uczestniczą osoby małoletnie."));
  b.push(U.kratka("Przed udziałem osób małoletnich zbierzemy pisemne zgody rodziców lub opiekunów prawnych."));
  b.push(U.kratka("Wdrożymy standardy ochrony małoletnich i zweryfikujemy osoby pracujące z małoletnimi w Rejestrze Sprawców Przestępstw na Tle Seksualnym."));
  b.push(U.podpowiedz("Poniższe oświadczenie składa organizacja patronacka."));
  b.push(U.kratka("Grupa nieformalna i organizacja patronacka uzgodniły złożenie wniosku. Organizacja jest stroną umowy i przyjmuje odpowiedzialność za wydatkowanie i rozliczenie mikrodotacji."));

  b.push(kreska());
  b.push(U.podpowiedz("Wniosek składa się wyłącznie w systemie konkursowym. Złożenie w systemie zastępuje podpis; poniższe pola służą tylko wersji roboczej na papierze."));
  b.push(U.miejsceNaPodpis(["Data i podpis osoby uprawnionej", "Data i podpis drugiej osoby uprawnionej"]));
  b.push(...U.pasekOznaczen());
  return U.zbuduj({ tytul: "Wniosek o mikrodotację", naglowek: "Wzór wniosku o mikrodotację" }, b);
}

/* =======================================================================
   2. KARTA OCENY FORMALNEJ
   ======================================================================= */

function kartaFormalna() {
  const b = [];
  b.push(...U.stronaTytulowa({
    tytul: "Karta oceny formalnej",
    stempel: "Załącznik nr 2 do regulaminu",
    duzy: false,
    uwaga: "Kartę wypełnia jeden ekspert. Odpowiedź NIE w wierszach 1 do 18 oznacza wezwanie do jednokrotnego uzupełnienia w terminie 3 dni roboczych albo pozostawienie wniosku bez rozpatrzenia, zgodnie z § 13 regulaminu. Wiersz 19 ma charakter informacyjny.",
  }));
  b.push(lamStrone());

  b.push(...U.naglowekSekcji("", "Metryka oceny"));
  b.push(U.polaKrotkie([
    ["Numer wniosku", ""], ["Nazwa wnioskodawcy", ""], ["Subregion", ""],
    ["Typ podmiotu", "MiŚLOP albo grupa nieformalna albo organizacja patronacka"],
    ["Imię i nazwisko eksperta", ""], ["Data oceny", ""],
  ]));

  b.push(...U.naglowekSekcji("", "Lista sprawdzająca"));
  const W = [520, 6250, 750, 750, 800];
  const pytania = [
    "Wniosek złożony w terminie naboru, zgodnie ze znacznikiem czasu systemu",
    "Wnioskodawca należy do jednej z trzech uprawnionych kategorii podmiotów",
    "Średni roczny przychód MiŚLOP z trzech ostatnich zamkniętych lat budżetowych nie przekracza 200 000 zł",
    "Siedziba albo miejsce zamieszkania (grupa nieformalna: osoby do kontaktu) w województwie śląskim",
    "Miejscowość siedziby albo zamieszkania liczy nie więcej niż 100 000 mieszkańców",
    "Podmiot nie złożył w tym naborze innego wniosku",
    "Wskazano co najmniej jeden obszar komponentu odporności",
    "Opis komponentu odporności jest wypełniony i liczy co najmniej 300 znaków",
    "Wniosek zawiera co najmniej jedno działanie",
    "Wniosek zawiera co najmniej dwa wskaźniki rezultatu",
    "Kwota wnioskowana mieści się w przedziale od 1 000 zł do 10 000 zł",
    "Żadna pozycja majątkowa nie przekracza 10 000 zł",
    "Udział rozwoju instytucjonalnego nie przekracza 50 procent, dotyczy MiŚLOP",
    "Grupa nieformalna nie planuje wydatków na rozwój instytucjonalny ani środków trwałych",
    "Termin realizacji mieści się w oknie realizacji zadania",
    "Złożono komplet obowiązkowych oświadczeń",
    "Złożono oświadczenie o standardach ochrony małoletnich, jeżeli dotyczy",
    "Złożono oświadczenie organizacji patronackiej, jeżeli dotyczy",
    "Wskazano numer rachunku bankowego (brak nie jest brakiem formalnym, rachunek uzupełnia się przed podpisaniem umowy, § 18 ust. 6 i 7)",
  ];
  const wiersze = [new TableRow({
    tableHeader: true,
    children: [
      U.komorka("Lp.", { szer: W[0], tlo: TUSZ, kolor: "F2EEE4", pogrub: true, rozmiar: 19 }),
      U.komorka("Warunek formalny", { szer: W[1], tlo: TUSZ, kolor: "F2EEE4", pogrub: true, rozmiar: 19 }),
      U.komorka("TAK", { szer: W[2], tlo: TUSZ, kolor: "F2EEE4", pogrub: true, rozmiar: 19, srodek: true }),
      U.komorka("NIE", { szer: W[3], tlo: TUSZ, kolor: "F2EEE4", pogrub: true, rozmiar: 19, srodek: true }),
      U.komorka("NIE DOT.", { szer: W[4], tlo: TUSZ, kolor: "F2EEE4", pogrub: true, rozmiar: 19, srodek: true }),
    ],
  })];
  pytania.forEach((p, i) => {
    wiersze.push(new TableRow({
      children: [
        U.komorka(String(i + 1), { szer: W[0], srodek: true, rozmiar: 20, kolor: SZARY }),
        U.komorka(p, { szer: W[1], rozmiar: 20 }),
        U.komorka("", { szer: W[2] }), U.komorka("", { szer: W[3] }), U.komorka("", { szer: W[4] }),
      ],
    }));
  });
  b.push(U.tabela(W, wiersze));

  b.push(...U.pole("Braki formalne do uzupełnienia", 4,
    "Wypisz konkretnie, czego brakuje. Wezwanie jest jednokrotne, więc opis musi być zrozumiały dla wnioskodawcy bez dopytywania."));

  b.push(...U.naglowekSekcji("", "Rozstrzygnięcie"));
  b.push(U.kratka("Wniosek spełnia wymogi formalne i przechodzi do oceny merytorycznej"));
  b.push(U.kratka("Wniosek wymaga jednokrotnego uzupełnienia, termin 3 dni robocze"));
  b.push(U.kratka("Wniosek pozostawia się bez rozpatrzenia"));
  b.push(...U.pole("Uzasadnienie rozstrzygnięcia", 3));
  b.push(U.miejsceNaPodpis(["Data i podpis eksperta"]));
  b.push(...U.pasekOznaczen());
  return U.zbuduj({ tytul: "Karta oceny formalnej", naglowek: "Karta oceny formalnej" }, b);
}

/* =======================================================================
   3. KARTA OCENY MERYTORYCZNEJ
   ======================================================================= */

function kartaMerytoryczna() {
  const b = [];
  b.push(...U.stronaTytulowa({
    tytul: "Karta oceny merytorycznej",
    stempel: "Załącznik nr 3 do regulaminu",
    duzy: false,
    uwaga: "Kartę wypełniają niezależnie dwaj eksperci. Maksymalna liczba punktów to 50. Rekomendację otrzymuje wniosek z wynikiem co najmniej 25 punktów, który jednocześnie osiągnął minimum w każdym z pięciu kryteriów.",
  }));
  b.push(lamStrone());

  b.push(...U.naglowekSekcji("", "Metryka oceny"));
  b.push(U.polaKrotkie([
    ["Numer wniosku", ""], ["Subregion", ""], ["Imię i nazwisko eksperta", ""],
    ["Numer oceny", "pierwsza, druga albo rozstrzygająca"], ["Data oceny", ""],
  ]));
  b.push(U.akapit("Oświadczam, że nie pozostaję z wnioskodawcą w stosunku, który mógłby budzić wątpliwości co do mojej bezstronności, oraz że zachowam poufność treści wniosku.", { rozmiar: 20, odstep: 4 }));
  b.push(U.kratka("Potwierdzam bezstronność i poufność", { odstep: 10 }));

  const kryteria = [
    {
      nr: "Kryterium 1", tytul: "Trafność diagnozy lokalnej potrzeby oraz jakość komponentu odporności", max: 15, min: 6,
      pyt: [
        "Czy potrzeba lokalna jest opisana konkretnie i wiarygodnie, a nie ogólnikowo",
        "Czy wskazano źródło wiedzy o potrzebie",
        "Czy odbiorcy są określeni i wiadomo, dlaczego właśnie oni",
        "Czy komponent odporności jest powiązany z opisaną potrzebą, a nie dopisany formalnie",
        "Czy wybrany obszar Poradnika bezpieczeństwa MSWiA odpowiada charakterowi działań",
        "Czy uczestnicy realnie ćwiczą umiejętność, a nie tylko o niej słuchają",
      ],
    },
    {
      nr: "Kryterium 2", tytul: "Spójność i racjonalność zaplanowanych działań", max: 10, min: 4,
      pyt: [
        "Czy działania prowadzą do zadeklarowanego celu",
        "Czy harmonogram jest wykonalny w oknie realizacji",
        "Czy liczba uczestników jest realistyczna wobec skali działań",
      ],
    },
    {
      nr: "Kryterium 3", tytul: "Mierzalność i trwałość rezultatów", max: 10, min: 4,
      pyt: [
        "Czy wskaźniki są liczbowe i możliwe do udokumentowania",
        "Czy wskazano sposób pomiaru każdego wskaźnika",
        "Czy po zakończeniu w społeczności zostaje trwały zasób: sprzęt, plan, umiejętność albo relacja",
        "Czy wskazano, kto utrzyma ten zasób po rozliczeniu mikrodotacji",
      ],
    },
    {
      nr: "Kryterium 4", tytul: "Racjonalność i efektywność kosztów", max: 10, min: 4,
      pyt: [
        "Czy koszty odpowiadają cenom rynkowym",
        "Czy każda pozycja budżetu wynika z zaplanowanych działań",
        "Czy relacja kosztu do liczby odbiorców jest uzasadniona",
      ],
    },
    {
      nr: "Kryterium 5", tytul: "Potencjał realizatora do wykonania inicjatywy", max: 5, min: 2,
      pyt: [
        "Czy wnioskodawca ma ludzi, zasoby albo partnerów potrzebnych do wykonania działań",
        "Czy dotychczasowe doświadczenie, choćby nieformalne, uwiarygodnia realizację",
      ],
    },
  ];

  kryteria.forEach((k) => {
    b.push(...U.naglowekSekcji(k.nr, k.tytul));
    b.push(U.akapit(`Punktacja od 0 do ${k.max}. Minimum wymagane do rekomendacji: ${k.min} ${k.min === 1 ? "punkt" : k.min >= 2 && k.min <= 4 ? "punkty" : "punktów"}.`,
      { rozmiar: 20, kolor: SZARY, odstep: 5 }));
    k.pyt.forEach((p, i) => b.push(U.punkt(LITERY[i], p)));
    b.push(U.polaKrotkie([["Liczba przyznanych punktów", `maksymalnie ${k.max}`]]));
    b.push(...U.pole("Uzasadnienie oceny w tym kryterium", 3, "Co najmniej 100 znaków. Wnioskodawca ma prawo wglądu w tę treść."));
  });

  b.push(lamStrone());
  b.push(...U.naglowekSekcji("", "Podsumowanie oceny"));
  b.push(U.tabelaDanych([6100, 1500, 1470],
    ["Kryterium", "Maksimum", "Przyznano"],
    [
      ["1. Trafność diagnozy i jakość komponentu odporności", "15", ""],
      ["2. Spójność i racjonalność działań", "10", ""],
      ["3. Mierzalność i trwałość rezultatów", "10", ""],
      ["4. Racjonalność i efektywność kosztów", "10", ""],
      ["5. Potencjał realizatora", "5", ""],
      ["Suma", "50", ""],
    ],
    { podsumowanie: true, prawoOd: 1 }));
  b.push(U.akapit("Próg rekomendacji: 25 punktów oraz minimum w każdym kryterium.", { rozmiar: 20, kolor: SZARY, odstep: 10 }));

  b.push(U.akapit("Uzasadnienia w pięciu kryteriach liczą łącznie nie mniej niż 500 znaków. Wnioskodawca ma prawo wglądu w tę treść, więc pisz tak, żeby dało się z niej wyciągnąć wnioski na przyszłość.", { rozmiar: 20, kolor: SZARY, odstep: 8 }));
  b.push(...U.pole("Uwagi dodatkowe", 3, "Pole nieobowiązkowe, na przykład zalecenia dla wnioskodawcy."));

  b.push(...U.naglowekSekcji("", "Rekomendacja"));
  b.push(U.kratka("Rekomendowany do dofinansowania"));
  b.push(U.kratka("Rekomendowany warunkowo, z korektą budżetu"));
  b.push(U.akapit("Korekta budżetu dotyczy wyłącznie pozycji niekwalifikowalnych z § 10 regulaminu albo pozycji nieuzasadnionych. Ekspert wskazuje te pozycje i ich wartość, a Operator obniża kwotę mikrodotacji o ich wartość przed zawarciem umowy. Korekta nie zmienia punktacji ani miejsca na liście rankingowej.", { rozmiar: 20, kolor: SZARY, odstep: 5 }));
  b.push(...U.pole("Pozycje budżetu do korekty, ich wartość i uzasadnienie", 4, "Wypełnij tylko przy rekomendacji warunkowej."));
  b.push(U.kratka("Nierekomendowany, nie osiągnął progu punktowego"));
  b.push(U.kratka("Nierekomendowany, nie osiągnął minimum w kryterium numer ......"));
  b.push(U.miejsceNaPodpis(["Data i podpis eksperta"]));
  b.push(...U.pasekOznaczen());
  return U.zbuduj({ tytul: "Karta oceny merytorycznej", naglowek: "Karta oceny merytorycznej" }, b);
}

/* =======================================================================
   4. WZOR UMOWY O POWIERZENIE MIKRODOTACJI
   ======================================================================= */

function wzorUmowy() {
  const b = [];
  b.push(...U.stronaTytulowa({
    tytul: "Umowa o powierzenie mikrodotacji",
    stempel: "Załącznik nr 4 do regulaminu",
    duzy: false,
    uwaga: "Umowa jest zawierana w postaci elektronicznej w systemie konkursowym. Ten dokument przedstawia jej pełną treść przed podpisaniem. Miejsca oznaczone kropkami uzupełnia system na podstawie danych z wniosku i listy rankingowej.",
  }));
  b.push(lamStrone());

  b.push(new Paragraph({
    spacing: { after: 160 },
    children: [new TextRun({ text: "Umowa nr ................... o powierzenie mikrodotacji", font: SERIF, bold: true, size: 30, color: TUSZ })],
  }));
  b.push(U.akapit("zawarta w dniu ....................... w Gliwicach, w postaci elektronicznej, pomiędzy:", { odstep: 6 }));
  b.push(U.akapit("Fundacją Klaster Innowacji Społecznych z siedzibą w Gliwicach przy ulicy o. Jana Siemińskiego 22, 44-100 Gliwice, wpisaną do Krajowego Rejestru Sądowego pod numerem 0000577540, NIP 6312658876, reprezentowaną przez ......................................., zwaną dalej Operatorem,", { odstep: 5 }));
  b.push(U.akapit("a", { odstep: 5 }));
  b.push(U.akapit("....................................................... z siedzibą w ......................................., numer w rejestrze ......................., NIP ......................., reprezentowanym przez ......................................., zwanym dalej Grantobiorcą,", { odstep: 5 }));
  b.push(U.akapit("albo, gdy Grantobiorcą jest grupa nieformalna działająca samodzielnie: grupą nieformalną ......................................., którą tworzą: ......................................., ......................................., ......................................., zamieszkali w województwie śląskim, reprezentowaną przez ......................................., zwaną dalej Grantobiorcą,", { odstep: 5 }));
  b.push(U.akapit("zwanymi dalej łącznie Stronami, o następującej treści:", { odstep: 10 }));

  const paragrafy = [
    {
      t: "Przedmiot umowy",
      u: [
        "Operator powierza Grantobiorcy realizację mikroprojektu pod tytułem ......................................................., zwanego dalej Mikroprojektem, opisanego we wniosku stanowiącym załącznik nr 1 do umowy.",
        "Mikroprojekt jest realizowany w ramach zadania publicznego „Wielka Moc Małych Społeczności – Odporne Śląskie 2026”, finansowanego ze środków Narodowego Instytutu Wolności – Centrum Rozwoju Społeczeństwa Obywatelskiego, w ramach Rządowego Programu wsparcia organizacji pozarządowych Moc Małych Społeczności, Priorytet 2.",
        "Grantobiorca oświadcza, że zapoznał się z regulaminem konkursu i realizuje Mikroprojekt zgodnie z nim.",
        "Grantobiorca oświadcza, że dane podane we wniosku są zgodne ze stanem faktycznym i prawnym, że nie jest wpisany do rejestru podmiotów wykluczonych z możliwości otrzymania środków publicznych, nie zalega z należnościami publicznoprawnymi i nie toczy się wobec niego postępowanie egzekucyjne dotyczące zobowiązań publicznoprawnych. Oświadczenia te stanowią zabezpieczenie umowy w rozumieniu § 18 ust. 3 regulaminu.",
        "Wskaźniki rezultatu Mikroprojektu oraz harmonogram działań określa wniosek, o którym mowa w ustępie 1. Osiągnięcie wskaźników jest podstawą rozliczenia mikrodotacji.",
      ],
    },
    {
      t: "Kwota mikrodotacji i wypłata",
      u: [
        "Operator powierza Grantobiorcy środki w kwocie ................... zł, słownie: ....................................................... .",
        "Mikrodotacja jest powierzeniem w rozumieniu art. 16a ustawy o działalności pożytku publicznego i o wolontariacie. Grantobiorca nie wnosi wkładu własnego.",
        "Mikrodotację Operator wypłaca jednorazowo, w całości, w terminie 3 dni roboczych od dnia zawarcia umowy.",
        "Wypłata następuje na rachunek bankowy numer ....................................................... , którego właścicielem jest ....................................................... .",
        "Jeżeli Grantobiorcą jest grupa nieformalna działająca samodzielnie, rachunek należy do jednego z jej członków wskazanego w ustępie 4, a osoby tworzące grupę odpowiadają za wydatkowanie i rozliczenie mikrodotacji solidarnie.",
        "Grantobiorca prowadzi wyodrębnioną ewidencję wydatków Mikroprojektu, umożliwiającą identyfikację każdej operacji.",
      ],
    },
    {
      t: "Termin realizacji",
      u: [
        "Mikroprojekt jest realizowany od dnia ....................... do dnia ....................... .",
        "Koszty są kwalifikowalne wyłącznie w okresie, o którym mowa w ustępie 1.",
        "Zmiana terminów działań w obrębie okresu, o którym mowa w ustępie 1, wymaga uprzedniej zgody Operatora wyrażonej w systemie konkursowym. Okres realizacji nie może wykraczać poza termin zakończenia zadania publicznego.",
      ],
    },
    {
      t: "Wydatkowanie środków",
      u: [
        "Grantobiorca wydatkuje środki wyłącznie zgodnie z budżetem stanowiącym załącznik nr 2 do umowy.",
        "Przesunięcia między pozycjami budżetu do 20 procent wartości pozycji nie wymagają zgody Operatora. Przesunięcia większe oraz zmiana zakresu działań wymagają zgody Operatora wyrażonej w systemie konkursowym przed dokonaniem wydatku.",
        "Wydatek majątkowy o wartości jednostkowej przekraczającej 10 000 zł jest niekwalifikowalny.",
        "Grantobiorca będący grupą nieformalną nie finansuje rozwoju instytucjonalnego i nie nabywa środków trwałych.",
        "Wszystkie płatności są dokonywane bezgotówkowo.",
        "Rzeczy zakupione ze środków mikrodotacji Grantobiorca nie zbywa przez 5 lat od dnia zakupu. Zgodę na wcześniejsze zbycie może wyrazić Operator, pod warunkiem przeznaczenia uzyskanych środków na cele statutowe Grantobiorcy.",
        "Grantobiorca nie pobiera od odbiorców Mikroprojektu żadnych świadczeń pieniężnych. Udział w działaniach jest bezpłatny.",
        "Grantobiorca opisuje dowody księgowe Mikroprojektu w sposób trwały, adnotacją o treści określonej w § 23 ust. 7 regulaminu.",
        "Niedopuszczalne jest finansowanie tego samego wydatku z dwóch źródeł publicznych.",
      ],
    },
    {
      t: "Obowiązki Grantobiorcy",
      u: [
        "Grantobiorca realizuje Mikroprojekt osobiście, z należytą starannością, zgodnie z wnioskiem i harmonogramem.",
        "Grantobiorca prowadzi listy obecności odbiorców bezpośrednich odrębnie dla każdego działania.",
        "Grantobiorca będący MiŚLOP przeprowadza wśród uczestników działań odpornościowych ankietę na wejściu i na wyjściu, obejmującą co najmniej dwie osoby.",
        "Grantobiorca niezwłocznie informuje Operatora o okolicznościach zagrażających realizacji Mikroprojektu albo osiągnięciu wskaźników.",
        "Wydarzenia organizowane w ramach Mikroprojektu mają charakter apartyjny. Zabronione jest promowanie partii politycznych oraz prowadzenie agitacji wyborczej.",
        "Grantobiorca przechowuje dokumentację Mikroprojektu, w tym dokumentację finansowo-księgową, przez okres 5 lat, licząc od początku roku następującego po roku, w którym realizował Mikroprojekt.",
      ],
    },
    {
      t: "Obowiązki informacyjne",
      u: [
        "Grantobiorca oznacza wszystkie materiały informacyjne, promocyjne i szkoleniowe oraz dokumenty podawane do wiadomości publicznej zestawieniem znaków obejmującym znak Komitetu do spraw Pożytku Publicznego, znak Narodowego Instytutu Wolności oraz znak Programu Moc Małych Społeczności.",
        "Do zestawienia znaków Grantobiorca dołącza napis informacyjny o treści wskazanej w regulaminie konkursu.",
        "Minimalna wysokość zestawienia znaków wynosi 15 mm w druku oraz 70 pikseli na ekranie. Wszystkie znaki w zestawieniu mają tę samą wielkość.",
        "Na początku każdego wydarzenia Grantobiorca przedstawia informację o finansowaniu zadania publicznego.",
        "Grantobiorca prowadzący stronę internetową albo profil w serwisie społecznościowym publikuje tam informację o finansowaniu Mikroprojektu i utrzymuje ją przez 90 dni od zakończenia realizacji.",
        "Operator udostępnia pakiet oznaczeń wraz z plikami znaków i instrukcją stosowania.",
      ],
    },
    {
      t: "Ochrona małoletnich i danych osobowych",
      u: [
        "Grantobiorca prowadzący działania z udziałem małoletnich wdraża standardy ochrony małoletnich zgodnie z ustawą z dnia 13 maja 2016 r. o przeciwdziałaniu zagrożeniom przestępczością na tle seksualnym i ochronie małoletnich oraz weryfikuje osoby pracujące z małoletnimi w Rejestrze Sprawców Przestępstw na Tle Seksualnym.",
        "Grantobiorca jest administratorem danych osobowych uczestników Mikroprojektu i odpowiada za zgodne z prawem ich przetwarzanie, w tym za pozyskanie zgód na wykorzystanie wizerunku.",
        "Grantobiorca przekazuje Operatorowi wyłącznie dane niezbędne do rozliczenia i ewaluacji.",
      ],
    },
    {
      t: "Monitoring i kontrola",
      u: [
        "Operator może przeprowadzić wizytę monitoringową w miejscu realizacji Mikroprojektu.",
        "Grantobiorca poddaje się kontroli prowadzonej przez Operatora, przez Narodowy Instytut Wolności oraz przez Kancelarię Prezesa Rady Ministrów, umożliwia wizytę w miejscu realizacji Mikroprojektu i udostępnia dokumentację na żądanie kontrolującego w wyznaczonym terminie.",
        "Ustalenia z wizyty zapisuje się w karcie monitoringu. Zalecenia Grantobiorca wdraża w wyznaczonym terminie.",
      ],
    },
    {
      t: "Sprawozdanie i rozliczenie",
      u: [
        "Grantobiorca składa sprawozdanie końcowe w systemie konkursowym w terminie ....................... , na wzorze stanowiącym załącznik nr 4 do umowy.",
        "Do sprawozdania Grantobiorca dołącza opisane dokumenty finansowe, listy obecności oraz dokumentację potwierdzającą osiągnięcie rezultatów.",
        "Rozliczenie jest prawidłowe, jeżeli Grantobiorca wykonał wszystkie zaplanowane działania i osiągnął co najmniej 80 procent wskaźników rezultatu.",
        "Przy osiągnięciu wskaźników na poziomie od 50 do 80 procent rozliczenie jest proporcjonalne, a Grantobiorca zwraca część mikrodotacji odpowiadającą niezrealizowanej części.",
        "Przy osiągnięciu wskaźników poniżej 50 procent Grantobiorca zwraca całość mikrodotacji.",
        "W razie braków w sprawozdaniu Operator wzywa do jednokrotnego uzupełnienia w wyznaczonym terminie.",
      ],
    },
    {
      t: "Zwrot środków",
      u: [
        "Grantobiorca zwraca środki niewykorzystane w terminie 14 dni od zakończenia realizacji Mikroprojektu, bez odrębnego wezwania.",
        "W przypadku stwierdzenia wydatków niekwalifikowalnych albo wykorzystania środków niezgodnie z umową Operator wzywa do zwrotu odpowiedniej części mikrodotacji wraz z odsetkami liczonymi jak od zaległości podatkowych, w terminie 14 dni od doręczenia wezwania.",
        "Zwrot następuje na rachunek bankowy wskazany przez Operatora.",
      ],
    },
    {
      t: "Rozwiązanie umowy",
      u: [
        "Operator może rozwiązać umowę ze skutkiem natychmiastowym, jeżeli Grantobiorca nie rozpoczął realizacji Mikroprojektu w terminie, wykorzystał środki niezgodnie z przeznaczeniem, odmówił poddania się monitoringowi albo podał we wniosku dane niezgodne ze stanem faktycznym.",
        "Rozwiązanie umowy zobowiązuje Grantobiorcę do zwrotu całości otrzymanych środków w terminie 14 dni.",
        "Grantobiorca może odstąpić od umowy przed otrzymaniem środków, informując o tym Operatora w systemie konkursowym.",
      ],
    },
    {
      t: "Postanowienia końcowe",
      u: [
        "Zmiany umowy wymagają formy dokumentowej pod rygorem nieważności, z zastrzeżeniem przesunięć budżetowych, o których mowa w § 4 ustęp 2.",
        "W sprawach nieuregulowanych stosuje się przepisy Kodeksu cywilnego, ustawy o działalności pożytku publicznego i o wolontariacie oraz postanowienia regulaminu konkursu.",
        "Spory wynikające z umowy Strony poddają pod rozstrzygnięcie sądu właściwego dla siedziby Operatora.",
        "Umowa wchodzi w życie z dniem jej zawarcia.",
      ],
    },
  ];

  paragrafy.forEach((p, i) => {
    b.push(...U.naglowekSekcji(`§ ${i + 1}`, p.t));
    p.u.forEach((t, j) => b.push(U.ustep(j + 1, t)));
  });

  b.push(...U.naglowekSekcji("", "Załączniki do umowy"));
  ["Wniosek o mikrodotację wraz ze wskaźnikami rezultatu", "Budżet Mikroprojektu", "Harmonogram działań Mikroprojektu", "Wzór sprawozdania końcowego",
    "Pakiet oznaczeń wraz z instrukcją stosowania", "Klauzule informacyjne RODO i wzory zgód"]
    .forEach((z, i) => b.push(U.ustep(i + 1, z)));

  b.push(U.miejsceNaPodpis(["Operator", "Grantobiorca"]));
  b.push(...U.pasekOznaczen());
  return U.zbuduj({ tytul: "Umowa o powierzenie mikrodotacji", naglowek: "Wzór umowy o powierzenie mikrodotacji" }, b);
}

/* =======================================================================
   5. WZOR SPRAWOZDANIA KONCOWEGO
   ======================================================================= */

function wzorSprawozdania() {
  const b = [];
  b.push(...U.stronaTytulowa({
    tytul: "Sprawozdanie końcowe",
    stempel: "Załącznik nr 5 do regulaminu",
    uwaga: "Sprawozdanie składa się elektronicznie w systemie konkursowym. Od wykonania wskaźników zależy rozliczenie: co najmniej 80 procent oznacza rozliczenie prawidłowe, od 50 do 80 procent rozliczenie proporcjonalne, poniżej 50 procent zwrot środków.",
  }));
  b.push(lamStrone());

  b.push(...U.naglowekSekcji("Część A", "Dane podstawowe"));
  b.push(U.polaKrotkie([
    ["Numer umowy", ""], ["Nazwa Grantobiorcy", ""], ["Tytuł mikroprojektu", ""],
    ["Subregion", ""], ["Okres realizacji", "od, do"], ["Kwota mikrodotacji", ""],
    ["Osoba składająca sprawozdanie", "imię, nazwisko, telefon, e-mail"],
  ]));

  b.push(...U.naglowekSekcji("Część B", "Co zostało zrobione"));
  b.push(...U.pole("Opis zrealizowanych działań", 8,
    "Do 3 000 znaków. Napisz, co się wydarzyło, gdzie i dla kogo. Bez ogólników w rodzaju „zrealizowano zaplanowane działania”."));
  b.push(U.akapit("Zestawienie działań", { pogrub: true, odstep: 3 }));
  b.push(U.tabelaPusta([2600, 1500, 1500, 1600, 1870],
    ["Działanie z wniosku", "Termin planowany", "Termin wykonania", "Liczba uczestników", "Uwagi"], 6, 200));
  b.push(...U.pole("Odstępstwa od harmonogramu i ich przyczyny", 3,
    "Jeżeli wszystko przebiegło zgodnie z planem, wpisz: brak odstępstw."));

  b.push(...U.naglowekSekcji("Część C", "Komponent odporności"));
  b.push(...U.pole("Jak zrealizowano komponent odporności", 5,
    "Do 1 500 znaków. Wskaż obszar z wniosku i opisz, co konkretnie w tym obszarze zrobiliście."));
  b.push(...U.pole("Co zostało w społeczności", 3,
    "Sprzęt, procedura, przeszkolone osoby, nowe kontakty. To pole porównujemy z częścią G wniosku, trwałość rezultatów."));

  b.push(lamStrone());
  b.push(...U.naglowekSekcji("Część D", "Wskaźniki"));
  b.push(U.tabelaPusta([3000, 1500, 1500, 1400, 1670],
    ["Nazwa wskaźnika", "Wartość planowana", "Wartość osiągnięta", "Wykonanie w procentach", "Źródło danych"], 5, 200));
  b.push(...U.pole("Wyjaśnienie odchyleń przekraczających 20 procent", 3));
  b.push(U.polaKrotkie([
    ["Liczba odbiorców bezpośrednich", "zgodnie z listami obecności"],
    ["Liczba osób objętych ankietą na wejściu i na wyjściu", "dotyczy MiŚLOP, minimum 2 osoby"],
    ["Liczba osób, u których ankieta wykazała wzrost świadomości", "dotyczy MiŚLOP, z tabeli zbiorczej załącznika 9, minimum 2 osoby"],
    ["Czy w działaniach uczestniczyły osoby małoletnie", "tak albo nie"],
  ]));

  b.push(...U.naglowekSekcji("Część E", "Rozliczenie finansowe"));
  b.push(U.tabelaPusta([700, 1900, 1200, 1900, 1600, 1770],
    ["Lp.", "Nazwa wydatku", "Data", "Numer dokumentu", "Pozycja budżetu", "Kwota"], 9, 170));
  b.push(U.polaKrotkie([
    ["Suma wydatków", ""], ["Kwota otrzymana", ""], ["Kwota niewykorzystana do zwrotu", ""],
    ["Data i kwota zwrotu", "jeżeli dotyczy"],
  ]));
  b.push(U.akapit("Grantobiorca oświadcza, że wszystkie wymienione dokumenty zostały opłacone, opisane zgodnie z wymogami umowy i są przechowywane u Grantobiorcy.",
    { rozmiar: 20, kolor: SZARY, odstep: 8 }));

  b.push(...U.naglowekSekcji("Część F", "Załączniki"));
  b.push(U.kratka("Listy obecności odbiorców bezpośrednich, odrębnie dla każdego działania"));
  b.push(U.kratka("Dokumentacja zdjęciowa działań"));
  b.push(U.kratka("Przykłady materiałów promocyjnych z widocznym zestawieniem znaków"));
  b.push(U.kratka("Kopie opisanych dokumentów finansowych"));
  b.push(U.kratka("Ankiety na wejściu i na wyjściu wraz z tabelą zbiorczą z załącznika 9, dotyczy MiŚLOP"));
  b.push(U.kratka("Podpisane standardy ochrony małoletnich oraz dokumentacja weryfikacji w Rejestrze Sprawców Przestępstw na Tle Seksualnym, jeżeli w działaniach uczestniczyły osoby małoletnie"));

  b.push(...U.naglowekSekcji("Część G", "Oświadczenia"));
  [
    "Dane zawarte w sprawozdaniu są zgodne ze stanem faktycznym.",
    "Środki zostały wydatkowane zgodnie z umową i budżetem.",
    "Żaden wydatek nie został sfinansowany z innego źródła publicznego.",
    "Dokumentację mikroprojektu przechowamy przez 5 lat, licząc od początku roku następującego po roku, w którym realizowaliśmy mikroprojekt.",
    "Wyrażamy zgodę na kontrolę prowadzoną przez Operatora, Narodowy Instytut Wolności oraz Kancelarię Prezesa Rady Ministrów.",
    "Wydarzenia w mikroprojekcie miały charakter apartyjny.",
  ].forEach((o) => b.push(U.kratka(o)));

  b.push(U.miejsceNaPodpis(["Data i podpis Grantobiorcy", "Data i podpis osoby przyjmującej sprawozdanie"]));
  b.push(...U.pasekOznaczen());
  return U.zbuduj({ tytul: "Sprawozdanie końcowe", naglowek: "Wzór sprawozdania końcowego" }, b);
}

/* ---------- zapis ---------- */

const DOKUMENTY = [
  ["wzor-wniosku.docx", wzorWniosku],
  ["karta-oceny-formalnej.docx", kartaFormalna],
  ["karta-oceny-merytorycznej.docx", kartaMerytoryczna],
  ["wzor-umowy.docx", wzorUmowy],
  ["wzor-sprawozdania.docx", wzorSprawozdania],
];

(async () => {
  for (const [nazwa, fn] of DOKUMENTY) {
    const buf = await Packer.toBuffer(fn());
    fs.writeFileSync(path.join(__dirname, nazwa), buf);
    console.log("zapisano", nazwa, Math.round(buf.length / 1024) + " KB");
  }
})();
