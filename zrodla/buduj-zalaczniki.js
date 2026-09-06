/* Zalaczniki 6 do 9 do regulaminu konkursu Moc Malych Spolecznosci – Slaskie:
   6. wzor standardow ochrony maloletnich, 7. klauzule RODO i zgody,
   8. pakiet oznaczen (instrukcja), 9. ankieta na wejsciu i na wyjsciu.
   Ten sam uklad co regulamin i wzory (uklad.js). */

const fs = require("fs");
const path = require("path");
const { Packer, Paragraph, TextRun, ImageRun, PageBreak } = require("docx");
const U = require("./uklad");

const lamStrone = () => new Paragraph({ children: [new PageBreak()] });
const L = U.LITERY;

/* ustep z podpunktami: {t, p:[...]} albo zwykly string */
function ustepy(lista, od = 1) {
  const out = [];
  lista.forEach((u, i) => {
    if (typeof u === "string") out.push(U.ustep(od + i, u));
    else { out.push(U.ustep(od + i, u.t)); u.p.forEach((p, j) => out.push(U.punkt(L[j], p))); }
  });
  return out;
}

function obrazek(plik, w, h, odstep = 8) {
  return new Paragraph({
    spacing: U.po(odstep),
    children: [new ImageRun({ type: "png", data: U.obraz(plik), transformation: { width: w, height: h } })],
  });
}

/* =======================================================================
   ZALACZNIK 6. Standardy ochrony maloletnich, wzor dla grantobiorcy
   ======================================================================= */
function standardyMaloletnich() {
  const b = [];
  b.push(...U.stronaTytulowa({
    tytul: "Standardy ochrony małoletnich",
    stempel: "Załącznik nr 6 do regulaminu, wzór dla grantobiorcy",
    duzy: false,
    uwaga: "Wzór do przyjęcia przez grantobiorcę, który w mikroprojekcie prowadzi działania z udziałem osób poniżej 18 roku życia. Obowiązek wynika z art. 22b i 22c ustawy z dnia 13 maja 2016 r. o przeciwdziałaniu zagrożeniom przestępczością na tle seksualnym i ochronie małoletnich. Pola w nawiasach kwadratowych wypełnia grantobiorca. Grupa nieformalna przyjmuje standardy przez organizację patronacką albo podpisami wszystkich członków.",
  }));
  b.push(lamStrone());

  b.push(...U.naglowekSekcji("", "Jak korzystać z tego wzoru"));
  b.push(U.akapit("Standardy przyjmujesz przed pierwszym działaniem z udziałem dzieci albo młodzieży. Wypełniasz nawiasy, skreślasz to, co nie dotyczy Twojego mikroprojektu, podpisujesz i przekazujesz wszystkim osobom, które będą pracować z małoletnimi. Wersję skróconą (§ 10) wieszasz w miejscu działań i czytasz dzieciom na pierwszym spotkaniu. Do sprawozdania załączasz podpisany dokument oraz potwierdzenia weryfikacji w Rejestrze Sprawców Przestępstw na Tle Seksualnym."));
  b.push(U.akapit("Jeżeli mikroprojekt w ogóle nie obejmuje działań z małoletnimi, nie przyjmujesz standardów, tylko zaznaczasz to we wniosku i w sprawozdaniu.", { kolor: U.SZARY, rozmiar: 20 }));

  b.push(...U.naglowekSekcji("§ 1", "Postanowienia ogólne"));
  b.push(...ustepy([
    "Standardy ochrony małoletnich, dalej Standardy, przyjmuje [NAZWA PODMIOTU], z siedzibą w [MIEJSCOWOŚĆ], dalej Organizator, na potrzeby mikroprojektu [TYTUŁ MIKROPROJEKTU] realizowanego w ramach konkursu Moc Małych Społeczności – Śląskie.",
    "Małoletnim jest każda osoba, która nie ukończyła 18 lat. Personelem jest każda osoba dorosła, która w imieniu Organizatora prowadzi zajęcia, opiekuje się uczestnikami albo ma z nimi bezpośredni kontakt, w tym wolontariusze i osoby prowadzące pojedyncze spotkania.",
    "Nadrzędnym celem Standardów jest dobro i bezpieczeństwo małoletnich. Każdy członek personelu zna Standardy i potwierdza to podpisem na liście w załączniku A.",
    "Osobą odpowiedzialną za wdrożenie Standardów, przyjmowanie zgłoszeń i podejmowanie interwencji jest [IMIĘ I NAZWISKO], telefon [NUMER], e-mail [ADRES], dalej Osoba odpowiedzialna. W razie jej nieobecności obowiązki przejmuje [IMIĘ I NAZWISKO ZASTĘPCY].",
  ]));

  b.push(...U.naglowekSekcji("§ 2", "Weryfikacja personelu"));
  b.push(...ustepy([
    "Przed dopuszczeniem do pracy z małoletnimi Organizator sprawdza każdą osobę z personelu w Rejestrze Sprawców Przestępstw na Tle Seksualnym (rps.ms.gov.pl), zarówno w Rejestrze z dostępem ograniczonym, jak i w Rejestrze osób, wobec których Państwowa Komisja wydała postanowienie o wpisie. Wydruk z Rejestru z datą sprawdzenia przechowuje się w dokumentacji mikroprojektu.",
    { t: "Każda osoba z personelu przed rozpoczęciem pracy składa pisemne oświadczenie, że:", p: [
      "nie była skazana za przestępstwa przeciwko wolności seksualnej i obyczajności ani za przestępstwa z użyciem przemocy na szkodę małoletniego,",
      "nie toczy się przeciwko niej postępowanie karne ani dyscyplinarne w takich sprawach,",
      "zapoznała się ze Standardami i zobowiązuje się do ich przestrzegania.",
    ] },
    "Osoba mająca obywatelstwo innego państwa niż Polska przedkłada dodatkowo informację z rejestru karnego tego państwa albo oświadczenie, jeżeli takiego rejestru nie ma.",
    "Organizator nie dopuszcza do pracy z małoletnimi osoby, której danych nie zweryfikował, nawet na jedno spotkanie.",
  ]));

  b.push(...U.naglowekSekcji("§ 3", "Zasady bezpiecznych relacji"));
  b.push(...ustepy([
    { t: "Personel w kontakcie z małoletnimi:", p: [
      "traktuje każde dziecko z szacunkiem, bez faworyzowania i bez wyśmiewania,",
      "zwraca się do dziecka po imieniu, nie używa przezwisk ani określeń dotyczących wyglądu,",
      "reaguje na każdą formę przemocy między uczestnikami, także słowną i w internecie,",
      "prowadzi zajęcia w miejscu, w którym w każdej chwili może wejść inna osoba dorosła,",
      "o sytuacji wymagającej rozmowy sam na sam informuje drugą osobę z personelu i zostawia otwarte drzwi.",
    ] },
    { t: "Personelowi nie wolno:", p: [
      "stosować przemocy fizycznej, słownej ani psychicznej, w tym krzyku, gróźb, zawstydzania i izolowania,",
      "nawiązywać z małoletnim relacji o charakterze romantycznym albo seksualnym, także w formie żartów, komentarzy i wiadomości,",
      "dotykać dziecka w sposób, który może być odebrany jako nieodpowiedni; dopuszczalny jest kontakt konieczny do udzielenia pomocy, zapewnienia bezpieczeństwa albo wynikający z zajęć, zawsze za zgodą dziecka i w obecności innych osób,",
      "kontaktować się z małoletnim prywatnymi kanałami, w tym przez komunikatory i media społecznościowe, poza kanałami uzgodnionymi z rodzicem albo opiekunem,",
      "podawać małoletnim alkoholu, wyrobów tytoniowych ani innych substancji psychoaktywnych ani przebywać pod ich wpływem w czasie działań,",
      "przyjmować od małoletnich ani wręczać im prezentów poza drobnymi upominkami związanymi z mikroprojektem, jawnymi dla całej grupy.",
    ] },
    "Uczestnicy poznają zasady wzajemnego szacunku na pierwszym spotkaniu. Organizator reaguje na przemoc rówieśniczą: przerywa ją, rozmawia z osobami zaangażowanymi, informuje rodziców albo opiekunów, a w poważnych przypadkach uruchamia procedurę z § 5.",
  ]));

  b.push(...U.naglowekSekcji("§ 4", "Rozpoznawanie krzywdzenia"));
  b.push(...ustepy([
    "Krzywdzeniem jest każde zamierzone albo niezamierzone działanie lub zaniechanie osoby dorosłej, instytucji albo innego dziecka, które szkodzi zdrowiu, rozwojowi albo godności małoletniego: przemoc fizyczna, psychiczna, seksualna, zaniedbanie oraz przemoc rówieśnicza.",
    "Personel zwraca uwagę na sygnały, które mogą świadczyć o krzywdzeniu: obrażenia bez wiarygodnego wyjaśnienia, nagłą zmianę zachowania, lęk przed powrotem do domu, wycofanie albo agresję, zaniedbanie higieny i ubioru, wiedzę lub zachowania seksualne nieadekwatne do wieku, wypowiedzi dziecka o krzywdzie.",
    "Sygnał nie jest dowodem. Obowiązkiem personelu jest zgłoszenie, nie rozstrzyganie.",
  ]));

  b.push(...U.naglowekSekcji("§ 5", "Procedura interwencji"));
  b.push(...ustepy([
    "Osoba z personelu, która podejrzewa krzywdzenie małoletniego albo otrzymała taką informację, tego samego dnia przekazuje ją Osobie odpowiedzialnej i sporządza notatkę na karcie interwencji (załącznik B).",
    "W sytuacji bezpośredniego zagrożenia życia lub zdrowia dziecka personel natychmiast dzwoni pod numer 112, a dopiero potem powiadamia Osobę odpowiedzialną.",
    { t: "Osoba odpowiedzialna w ciągu 24 godzin:", p: [
      "rozmawia z dzieckiem w bezpiecznych warunkach, bez presji i bez wypytywania o szczegóły zdarzeń,",
      "ustala, czy krzywdzenia dopuszcza się osoba z personelu, inny uczestnik czy osoba spoza mikroprojektu,",
      "informuje rodziców albo opiekunów, chyba że to oni są podejrzewani o krzywdzenie,",
      "decyduje o zawiadomieniu odpowiednich instytucji zgodnie z ust. 4 i 5.",
    ] },
    "Gdy zachodzi podejrzenie przestępstwa na szkodę małoletniego, Osoba odpowiedzialna składa zawiadomienie do policji albo prokuratury. Gdy zachodzi podejrzenie zaniedbania albo przemocy w rodzinie, składa wniosek do sądu rodzinnego o wgląd w sytuację dziecka i powiadamia ośrodek pomocy społecznej. Gdy krzywdzenia dopuszcza się osoba z personelu, Organizator natychmiast odsuwa ją od kontaktu z małoletnimi, niezależnie od dalszych kroków.",
    "Wzory zawiadomień i wsparcie w decyzji można uzyskać w Telefonie Zaufania dla Rodziców i Nauczycieli 800 100 100 oraz u Operatora konkursu, mms@klaster.org.pl, 539 644 192. Dziecko może samo dzwonić na Telefon Zaufania dla Dzieci i Młodzieży 116 111.",
    "Każda interwencja jest dokumentowana na karcie interwencji. Karty przechowuje Osoba odpowiedzialna w miejscu niedostępnym dla osób nieuprawnionych, przez 5 lat, licząc od początku roku następującego po roku, w którym realizowano mikroprojekt.",
    "Po ujawnieniu krzywdzenia Organizator ustala z rodzicami albo opiekunami plan wsparcia dziecka: kontakt z psychologiem, poradnią psychologiczno-pedagogiczną albo ośrodkiem interwencji kryzysowej, oraz sposób dalszego udziału dziecka w mikroprojekcie.",
  ]));

  b.push(...U.naglowekSekcji("§ 6", "Ochrona wizerunku i danych osobowych"));
  b.push(...ustepy([
    "Organizator utrwala i publikuje wizerunek małoletniego wyłącznie za pisemną zgodą rodzica albo opiekuna prawnego, na wzorze z załącznika nr 7 do regulaminu. Zgodę można wycofać w każdej chwili, a wycofanie obejmuje usunięcie materiałów z kanałów Organizatora.",
    "Nie publikuje się zdjęć dzieci w sytuacjach intymnych, ośmieszających, w niekompletnym ubraniu ani z danymi umożliwiającymi identyfikację, takimi jak nazwisko, adres czy szkoła. Zdjęcia dokumentacyjne z udziałem małoletnich nie trafiają do mediów społecznościowych; do relacji publicznych używa się zdjęć pozowanych, za zgodą, albo materiałów bez postaci.",
    "Personel nie fotografuje dzieci prywatnymi telefonami, chyba że Organizator wyznaczył do tego konkretną osobę i konkretne urządzenie. Materiały przechowuje Organizator, nie osoby prywatne.",
    "Dane osobowe małoletnich przetwarza się wyłącznie w zakresie potrzebnym do prowadzenia działań, listy obecności i sprawozdania, zgodnie z klauzulą informacyjną z załącznika nr 7 do regulaminu.",
  ]));

  b.push(...U.naglowekSekcji("§ 7", "Bezpieczne korzystanie z internetu"));
  b.push(...ustepy([
    "Jeżeli w działaniach używa się komputerów, tabletów albo telefonów, personel czuwa nad tym, z jakich stron i aplikacji korzystają dzieci, a urządzenia Organizatora mają włączone filtry treści.",
    "Personel uczy uczestników zasad bezpieczeństwa w sieci, w tym ochrony haseł, nieudostępniania danych i zdjęć obcym oraz zgłaszania niepokojących kontaktów osobie dorosłej.",
    "Komunikacja grupowa z małoletnimi odbywa się w kanałach, do których mają dostęp rodzice albo opiekunowie, i nigdy w wiadomościach prywatnych między osobą z personelu a pojedynczym dzieckiem.",
  ]));

  b.push(...U.naglowekSekcji("§ 8", "Przygotowanie personelu i udostępnianie Standardów"));
  b.push(...ustepy([
    "Osoba odpowiedzialna przed rozpoczęciem działań omawia Standardy z całym personelem, w tym z osobami prowadzącymi pojedyncze spotkania. Omówienie potwierdza lista w załączniku A.",
    "Standardy w pełnej wersji są dostępne do wglądu w miejscu działań i przekazywane rodzicom albo opiekunom przy zapisie dziecka, także w formie elektronicznej.",
    "Wersja skrócona dla dzieci (§ 10) jest wywieszona w widocznym miejscu i omawiana z uczestnikami na pierwszym spotkaniu językiem dostosowanym do wieku.",
  ]));

  b.push(...U.naglowekSekcji("§ 9", "Przegląd i aktualizacja"));
  b.push(...ustepy([
    "Osoba odpowiedzialna dokonuje przeglądu Standardów nie rzadziej niż raz na dwa lata oraz po każdej interwencji, oceniając, czy procedury zadziałały i co wymaga zmiany.",
    "Wnioski z przeglądu zapisuje się w krótkiej notatce dołączanej do Standardów. Zmiany wchodzą w życie po ich omówieniu z personelem.",
    "Standardy wchodzą w życie z dniem podpisania i obowiązują przez cały czas działań z udziałem małoletnich w mikroprojekcie oraz w kolejnych działaniach Organizatora.",
  ]));

  b.push(...U.naglowekSekcji("§ 10", "Wersja skrócona dla dzieci i młodzieży"));
  b.push(U.akapit("Ten tekst wieszasz na sali i czytasz uczestnikom na pierwszym spotkaniu. Możesz zmienić słowa na takie, jakie zrozumieją Twoi uczestnicy.", { kolor: U.SZARY, rozmiar: 20 }));
  [
    "Jesteś tu bezpieczny. Nikt nie może Cię bić, wyśmiewać, straszyć ani dotykać w sposób, którego nie chcesz.",
    "Dorośli, którzy prowadzą zajęcia, są sprawdzeni i znają zasady. Mają Ci pomagać, nie wolno im robić Ci krzywdy.",
    "Jeśli coś Cię niepokoi, boli albo zawstydza, powiedz o tym dorosłemu, któremu ufasz. Możesz też powiedzieć [IMIĘ OSOBY ODPOWIEDZIALNEJ] albo zadzwonić pod 116 111. To nie jest skarżenie.",
    "Nikt nie może zrobić Ci zdjęcia i pokazać go innym bez zgody Twoich rodziców.",
    "Wszyscy tu jesteśmy dla siebie mili. Jeżeli ktoś jest niemiły dla Ciebie albo dla kogoś innego, mów o tym od razu.",
  ].forEach((z) => b.push(U.kratka(z)));

  b.push(U.miejsceNaPodpis(["Data i podpis osoby reprezentującej Organizatora", "Data i podpis Osoby odpowiedzialnej"]));

  b.push(lamStrone());
  b.push(...U.naglowekSekcji("Załącznik A", "Lista personelu i potwierdzenia"));
  b.push(U.podpowiedz("Każda osoba pracująca z małoletnimi: data sprawdzenia w Rejestrze, data oświadczenia, podpis potwierdzający znajomość Standardów."));
  b.push(U.tabelaPusta([2700, 2000, 1700, 1500, 1170], ["Imię i nazwisko", "Rola w mikroprojekcie", "Rejestr, data", "Oświadczenie, data", "Podpis"], 8, 320));

  b.push(...U.naglowekSekcji("Załącznik B", "Karta interwencji"));
  b.push(U.polaKrotkie([
    ["Data i godzina zgłoszenia", ""],
    ["Kto zgłosił", "imię i nazwisko, rola"],
    ["Dziecko, którego dotyczy", "imię i wiek, bez nazwiska na tej karcie"],
    ["Rodzaj podejrzenia", "przemoc fizyczna, psychiczna, seksualna, zaniedbanie, rówieśnicza"],
  ]));
  b.push(...U.pole("Opis sytuacji i sygnałów", 5, "Fakty, bez ocen. Co zaobserwowano, co powiedziało dziecko, kto był obecny."));
  b.push(...U.pole("Podjęte działania i terminy", 4, "Rozmowa z dzieckiem, kontakt z rodzicami, zawiadomienia, odsunięcie osoby z personelu, wsparcie dla dziecka."));
  b.push(U.miejsceNaPodpis(["Data i podpis Osoby odpowiedzialnej"]));

  b.push(...U.pasekOznaczen());
  return U.zbuduj({ tytul: "Standardy ochrony małoletnich", naglowek: "Załącznik nr 6, standardy ochrony małoletnich" }, b);
}

/* =======================================================================
   ZALACZNIK 7. Klauzule informacyjne RODO i wzory zgod
   ======================================================================= */
function klauzuleRodo() {
  const b = [];
  b.push(...U.stronaTytulowa({
    tytul: "Klauzule informacyjne i wzory zgód",
    stempel: "Załącznik nr 7 do regulaminu",
    duzy: false,
    uwaga: "Część A to klauzula dla wnioskodawców i grantobiorców, której administratorem jest Operator. Część B to wzór klauzuli, którą grantobiorca jako administrator przekazuje uczestnikom swojego mikroprojektu. Części C i D to wzory zgód na wizerunek, dla osoby dorosłej i dla małoletniego.",
  }));
  b.push(lamStrone());

  b.push(...U.naglowekSekcji("Część A", "Klauzula informacyjna dla wnioskodawców i grantobiorców"));
  b.push(U.akapit("Zgodnie z art. 13 rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO) informujemy:"));
  b.push(...ustepy([
    "Administratorem danych osobowych jest Fundacja Klaster Innowacji Społecznych, ul. o. Jana Siemińskiego 22, 44-100 Gliwice, KRS 0000577540, e-mail mms@klaster.org.pl, telefon 539 644 192.",
    { t: "Dane przetwarzamy w celu:", p: [
      "przeprowadzenia konkursu Moc Małych Społeczności – Śląskie, w tym oceny wniosku, publikacji list rankingowych, zawarcia i wykonania umowy o powierzenie mikrodotacji oraz jej rozliczenia (art. 6 ust. 1 lit. b i c RODO),",
      "monitoringu, ewaluacji i sprawozdawczości wobec Narodowego Instytutu Wolności – Centrum Rozwoju Społeczeństwa Obywatelskiego oraz kontroli zadania publicznego (art. 6 ust. 1 lit. c i e RODO),",
      "kontaktu w sprawach konkursu i Akademii Odporności (art. 6 ust. 1 lit. f RODO, prawnie uzasadniony interes administratora),",
      "przesyłania informacji o konkursie na podany adres e-mail, jeżeli wyrażono zgodę (art. 6 ust. 1 lit. a RODO).",
    ] },
    "Odbiorcami danych mogą być: Instytut Roździeńskiego jako współoferent zadania, w zakresie działań, które prowadzi; eksperci komisji oceniającej, związani umową i oświadczeniem o poufności; Narodowy Instytut Wolności oraz Kancelaria Prezesa Rady Ministrów w ramach kontroli; dostawcy usług hostingu, poczty elektronicznej i systemu konkursowego, działający na zlecenie administratora na podstawie umów powierzenia.",
    "Dane wnioskodawców, których wnioski nie otrzymały dofinansowania, przechowujemy do zakończenia i rozliczenia zadania publicznego oraz przez okres kontroli. Dane grantobiorców przechowujemy przez 5 lat, licząc od początku roku następującego po roku, w którym realizowali mikroprojekt. Adres e-mail do informacji o konkursie przechowujemy do wycofania zgody.",
    "Dane nazwy podmiotu, subregionu, tytułu mikroprojektu, kwoty i liczby punktów publikujemy na stronie konkursu w listach rankingowych i w zestawieniu dofinansowanych inicjatyw, zgodnie z regulaminem. Danych osób fizycznych z grup nieformalnych nie publikujemy.",
    "Każda osoba ma prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia, wniesienia sprzeciwu oraz wycofania zgody w każdej chwili, bez wpływu na zgodność z prawem przetwarzania sprzed wycofania. Wnioski w tych sprawach kieruje się na adres mms@klaster.org.pl.",
    "Każda osoba ma prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.",
    "Podanie danych jest dobrowolne, ale niezbędne do złożenia wniosku i zawarcia umowy. Dane nie służą do zautomatyzowanego podejmowania decyzji ani profilowania i nie są przekazywane poza Europejski Obszar Gospodarczy.",
  ]));

  b.push(lamStrone());
  b.push(...U.naglowekSekcji("Część B", "Wzór klauzuli dla uczestników mikroprojektu"));
  b.push(U.podpowiedz("Grantobiorca jest administratorem danych uczestników swojego mikroprojektu. Wypełnia nawiasy i przekazuje klauzulę przy zapisie, na liście obecności albo w formularzu."));
  b.push(...ustepy([
    "Administratorem danych osobowych jest [NAZWA GRANTOBIORCY, ADRES, KONTAKT]. W przypadku grupy nieformalnej działającej przez organizację patronacką administratorem jest ta organizacja [NAZWA], a grupa działa w jej imieniu. W przypadku grupy nieformalnej działającej samodzielnie administratorem jest osoba do kontaktu wskazana we wniosku [IMIĘ I NAZWISKO, KONTAKT], działająca w imieniu grupy.",
    "Dane przetwarzamy w celu organizacji działań mikroprojektu [TYTUŁ], prowadzenia list obecności, dokumentowania rezultatów oraz rozliczenia mikrodotacji wobec Operatora konkursu, Fundacji Klaster Innowacji Społecznych (art. 6 ust. 1 lit. b, c i f RODO). Wizerunek przetwarzamy wyłącznie na podstawie odrębnej zgody (art. 6 ust. 1 lit. a RODO).",
    "Odbiorcami danych mogą być Operator konkursu i Instytut Roździeńskiego w ramach monitoringu i rozliczenia, a także Narodowy Instytut Wolności i Kancelaria Prezesa Rady Ministrów w ramach kontroli zadania publicznego.",
    "Dane przechowujemy przez 5 lat, licząc od początku roku następującego po roku, w którym realizowano mikroprojekt, zgodnie z obowiązkiem przechowywania dokumentacji.",
    "Masz prawo dostępu do danych, sprostowania, usunięcia, ograniczenia, przenoszenia, sprzeciwu, wycofania zgody oraz skargi do Prezesa Urzędu Ochrony Danych Osobowych. Podanie danych jest dobrowolne, ale niezbędne do udziału w działaniach.",
  ]));

  b.push(...U.naglowekSekcji("Część C", "Zgoda na wykorzystanie wizerunku, osoba dorosła"));
  b.push(U.polaKrotkie([["Imię i nazwisko", ""], ["Mikroprojekt", "tytuł i nazwa grantobiorcy"]]));
  b.push(U.akapit("Wyrażam zgodę na nieodpłatne utrwalenie mojego wizerunku w formie zdjęć i nagrań podczas działań mikroprojektu oraz na jego rozpowszechnianie w celach informacyjnych i sprawozdawczych: na stronie i w mediach społecznościowych grantobiorcy, na stronie konkursu mms.klaster.org.pl oraz w materiałach Operatora, Instytutu Roździeńskiego i Narodowego Instytutu Wolności dotyczących zadania Wielka Moc Małych Społeczności – Odporne Śląskie 2026. Zgoda obejmuje wykorzystanie bez ograniczeń czasowych i terytorialnych, bez podawania nazwiska, chyba że wyrażę na to osobną zgodę. Wiem, że mogę ją wycofać w każdej chwili, pisząc do administratora, a wycofanie nie działa wstecz.", { rozmiar: 21 }));
  b.push(U.kratka("Wyrażam zgodę"));
  b.push(U.kratka("Nie wyrażam zgody"));
  b.push(U.miejsceNaPodpis(["Data i czytelny podpis"]));

  b.push(lamStrone());
  b.push(...U.naglowekSekcji("Część D", "Zgoda rodzica albo opiekuna prawnego, osoba małoletnia"));
  b.push(U.polaKrotkie([["Imię i nazwisko dziecka", ""], ["Wiek dziecka", ""], ["Imię i nazwisko rodzica albo opiekuna", ""], ["Mikroprojekt", "tytuł i nazwa grantobiorcy"]]));
  b.push(U.akapit("Jako rodzic albo opiekun prawny wyrażam zgodę na udział dziecka w działaniach mikroprojektu oraz oświadczam, że zapoznałem się ze standardami ochrony małoletnich przyjętymi przez grantobiorcę i z klauzulą informacyjną z części B.", { rozmiar: 21 }));
  b.push(U.kratka("Wyrażam zgodę na udział dziecka w działaniach mikroprojektu"));
  b.push(U.akapit("Wyrażam zgodę na nieodpłatne utrwalenie wizerunku dziecka w formie zdjęć i nagrań podczas działań mikroprojektu oraz na jego rozpowszechnianie w celach informacyjnych i sprawozdawczych na stronie i w mediach społecznościowych grantobiorcy, na stronie konkursu mms.klaster.org.pl oraz w materiałach Operatora, Instytutu Roździeńskiego i Narodowego Instytutu Wolności, bez podawania nazwiska dziecka. Wiem, że zgodę mogę wycofać w każdej chwili, a wycofanie nie działa wstecz.", { rozmiar: 21 }));
  b.push(U.kratka("Wyrażam zgodę na wizerunek"));
  b.push(U.kratka("Nie wyrażam zgody na wizerunek, dziecko uczestniczy bez utrwalania wizerunku"));
  b.push(U.polaKrotkie([["Telefon do rodzica albo opiekuna", "na wypadek nagłej sytuacji"], ["Istotne informacje o zdrowiu dziecka", "alergie, leki, dobrowolnie"]]));
  b.push(U.akapit("Informacje o zdrowiu dziecka podaję dobrowolnie i wyrażam zgodę na ich przetwarzanie przez grantobiorcę wyłącznie w celu zapewnienia dziecku bezpieczeństwa podczas działań (art. 9 ust. 2 lit. a RODO). Zgodę mogę wycofać w każdej chwili.", { rozmiar: 21 }));
  b.push(U.kratka("Wyrażam zgodę na przetwarzanie informacji o zdrowiu dziecka w podanym zakresie"));
  b.push(U.miejsceNaPodpis(["Data i czytelny podpis rodzica albo opiekuna"]));

  b.push(...U.pasekOznaczen());
  return U.zbuduj({ tytul: "Klauzule informacyjne i wzory zgód", naglowek: "Załącznik nr 7, klauzule RODO i zgody" }, b);
}

/* =======================================================================
   ZALACZNIK 8. Pakiet oznaczen, instrukcja stosowania
   ======================================================================= */
function pakietOznaczen() {
  const b = [];
  b.push(...U.stronaTytulowa({
    tytul: "Pakiet oznaczeń",
    stempel: "Załącznik nr 8 do regulaminu, instrukcja stosowania znaków",
    uwaga: "Instrukcja dla grantobiorców, jak oznaczać mikroprojekt finansowany z konkursu. Pliki znaków są w paczce oznaczenia-mms-slaskie.zip do pobrania ze strony konkursu. Podstawa: Wytyczne promocji zadań publicznych finansowanych lub dofinansowanych z NIW-CRSO, wersja ze stycznia 2026, oraz § 20 regulaminu konkursu.",
  }));
  b.push(lamStrone());

  b.push(...U.naglowekSekcji("1", "Co musisz oznaczyć"));
  b.push(U.akapit("Każdy materiał, który powstaje w mikroprojekcie i trafia do odbiorców albo do dokumentacji, nosi zestawienie znaków i informację o finansowaniu. Dotyczy to w szczególności:"));
  [
    "plakatów, ulotek, zaproszeń, programów zajęć, list obecności, zaświadczeń i certyfikatów",
    "postów w mediach społecznościowych, stron internetowych i newsletterów",
    "prezentacji, nagrań wideo i materiałów dźwiękowych",
    "roll-upów, banerów i stoisk",
    "naklejek na sprzęt kupiony z mikrodotacji, na przykład apteczkę, defibrylator, agregat, latarki",
    "materiałów edukacyjnych, poradników, map i instrukcji",
  ].forEach((t, i) => b.push(U.punkt(L[i], t)));
  b.push(U.akapit("Wykonanie obowiązków informacyjnych sprawdzamy podczas monitoringu i przy rozliczeniu (§ 20 ust. 7 regulaminu).", { kolor: U.SZARY, rozmiar: 20 }));

  b.push(...U.naglowekSekcji("2", "Zestawienie znaków"));
  b.push(U.akapit("Używasz gotowego, skróconego zestawienia znaków z paczki. Nie składasz go samodzielnie i nie zmieniasz kolejności ani proporcji. Zestawienie zawiera, od lewej: znak Komitetu do spraw Pożytku Publicznego, znak Narodowego Instytutu Wolności – Centrum Rozwoju Społeczeństwa Obywatelskiego, znak Programu Moc Małych Społeczności."));
  b.push(obrazek("logotypy/web-mms-kolor.png", 430, 79, 6));
  b.push(U.podpowiedz("Wersja kolorowa, podstawowa. Plik: zestawienie-kolor.png, w paczce także PDF i wersja drukarska w wysokiej rozdzielczości."));
  b.push(obrazek("logotypy/web-mms-achromat.png", 430, 79, 6));
  b.push(U.podpowiedz("Wersja achromatyczna, do druku jednokolorowego i kserokopii. Plik: zestawienie-achromat.png."));
  b.push(U.akapit("Wersja w inwersji (białe znaki) służy wyłącznie na ciemne tła i jest w paczce jako zestawienie-inwersja.png. Na zdjęciach i tłach z fakturą pod zestawienie podkładasz białe pole."));
  b.push(...ustepy([
    "Minimalna wysokość zestawienia to 15 mm w druku i 70 pikseli na ekranie. Wszystkie znaki w zestawieniu są tej samej wysokości. Jeżeli materiał jest za mały, żeby zmieścić zestawienie w tej wielkości, nie umieszczaj go wcale i skontaktuj się z Operatorem.",
    "Zestawienie umieszczasz w widocznym miejscu: na plakacie u góry albo u dołu, w prezentacji na pierwszym i ostatnim slajdzie, w filmie w jednym z pierwszych albo ostatnich kadrów na białym tle, na dokumentach w nagłówku albo stopce.",
    "Jako czwarty znak, po zestawieniu, możesz dodać własne logo grantobiorcy. Nie umieszczasz znaków innych sponsorów ani partnerów w jednym rzędzie z zestawieniem.",
    "Logo Operatora konkursu i współoferenta nie jest wymagane na materiałach mikroprojektu. Jeżeli je umieszczasz, zawsze oba razem: Fundacja Klaster Innowacji Społecznych i Instytut Roździeńskiego.",
  ]));

  b.push(...U.naglowekSekcji("3", "Informacja o finansowaniu"));
  b.push(U.akapit("Pod zestawieniem albo w tekście materiału umieszczasz napis w dokładnym brzmieniu, ze znakiem półpauzy w nazwie instytucji:"));
  b.push(U.cytat("Sfinansowano ze środków Narodowego Instytutu Wolności – Centrum Rozwoju Społeczeństwa Obywatelskiego w ramach Rządowego Programu wsparcia organizacji pozarządowych Moc Małych Społeczności"));
  b.push(U.akapit("Obok informacji o finansowaniu podajesz, że materiał powstał w mikroprojekcie:"));
  b.push(U.cytat("Mikroprojekt [TYTUŁ] realizowany w ramach konkursu Moc Małych Społeczności – Śląskie, zadanie publiczne Wielka Moc Małych Społeczności – Odporne Śląskie 2026"));
  b.push(U.akapit("Na własnej stronie internetowej albo w profilu w mediach społecznościowych, jeżeli je prowadzisz, publikujesz pięć elementów z § 20 ust. 4 regulaminu: informację, że mikroprojekt jest finansowany ze środków budżetu państwa, nazwę Programu, nazwę zadania, wartość dofinansowania (kwotę mikrodotacji) oraz krótki opis mikroprojektu. Informacja zostaje opublikowana przez 90 dni od zakończenia mikroprojektu."));

  b.push(lamStrone());
  b.push(...U.naglowekSekcji("4", "Posty w mediach społecznościowych"));
  b.push(U.akapit("Zestawienie znaków umieszczasz na grafice posta. W treści posta dodajesz oznaczenia właściwe dla serwisu:"));
  b.push(U.tabelaDanych([2000, 7070], ["Serwis", "Treść w poście"], [
    ["Facebook", "Sfinansowano ze środków @narodowyinstytutwolnosci w ramach #MocMalychSpolecznosci @SpoleczenstwoObywatelskieKPRM"],
    ["Instagram", "Sfinansowano przez @niwcrso w ramach #MocMalychSpolecznosci @spoleczenstwoobywatelskie"],
    ["X", "Sfinansowano przez @niwcrso w ramach #MocMalychSpolecznosci @SO_KPRM"],
    ["Inne serwisy", "Pełny napis informacyjny z punktu 3 w treści albo w opisie"],
  ]));
  b.push(U.akapit("Każdy post o mikroprojekcie zawiera link do strony mikroprojektu albo do strony konkursu mms.klaster.org.pl. Na Instagramie, gdzie linki nie są klikalne, adres umieszczasz na grafice.", { odstep: 10 }));

  b.push(...U.naglowekSekcji("5", "Wydarzenia"));
  b.push(...ustepy([
    "W widocznym miejscu wydarzenia, na przykład przy stole prowadzącego albo przy wejściu do sali, zalecamy postawić pełnokolorowe zestawienie znaków w formie planszy, roll-upu albo wydruku, najlepiej formatu A3. Gotowy plik do druku jest w paczce.",
    "Na początku wydarzenia prowadzący odczytuje informację: „Mikroprojekt [TYTUŁ] realizowany jest w ramach konkursu Moc Małych Społeczności – Śląskie. Zadanie publiczne Wielka Moc Małych Społeczności – Odporne Śląskie 2026 sfinansowane jest ze środków Narodowego Instytutu Wolności – Centrum Rozwoju Społeczeństwa Obywatelskiego w ramach Rządowego Programu wsparcia organizacji pozarządowych Moc Małych Społeczności”.",
    "Lista obecności, program i zaświadczenia z wydarzenia noszą zestawienie znaków i napis informacyjny. Wzory list obecności z gotowym oznaczeniem są w paczce.",
    "Wydarzenia mają charakter apartyjny. W ich trakcie nie wolno promować partii politycznych ani prowadzić agitacji wyborczej.",
  ]));

  b.push(...U.naglowekSekcji("6", "Sprzęt i rzeczy kupione z mikrodotacji"));
  b.push(...ustepy([
    "Na każdym przedmiocie kupionym z mikrodotacji, którego wielkość na to pozwala, umieszczasz naklejkę z pełnym zestawieniem znaków w widocznym miejscu. Naklejka ma być trwała, odporna na warunki, w jakich sprzęt jest używany.",
    "Wzór naklejki w dwóch rozmiarach jest w paczce. Drukujesz na papierze samoprzylepnym albo zamawiasz w drukarni.",
    "Na przedmiotach zbyt małych na naklejkę oznaczasz opakowanie albo miejsce przechowywania.",
  ]));

  b.push(...U.naglowekSekcji("7", "Dowody księgowe"));
  b.push(U.akapit("Każdą fakturę i rachunek opłacony z mikrodotacji opisujesz trwale na odwrocie albo na załączonej karcie adnotacją:"));
  b.push(U.cytat("Sfinansowano ze środków Narodowego Instytutu Wolności – Centrum Rozwoju Społeczeństwa Obywatelskiego w ramach Programu MOC MAŁYCH SPOŁECZNOŚCI w wysokości ......... zł w ramach realizacji zadania określonego umową nr ........."));
  b.push(U.akapit("Numer umowy to numer Twojej umowy o powierzenie mikrodotacji. Kwota to część faktury pokryta z mikrodotacji.", { kolor: U.SZARY, rozmiar: 20 }));

  b.push(...U.naglowekSekcji("8", "Jak długo"));
  b.push(U.akapit("Informacja o finansowaniu na stronie internetowej i w profilach społecznościowych zostaje opublikowana przez 90 dni od zakończenia mikroprojektu. Jeżeli z mikrodotacji kupiono środki trwałe, naklejki na sprzęcie zostają tak długo, jak sprzęt jest w użyciu, a co najmniej przez 5 lat od dnia zakupu, przez które nie wolno go zbyć zgodnie z § 19 ust. 9 regulaminu."));

  b.push(...U.naglowekSekcji("9", "Zawartość paczki oznaczenia-mms-slaskie.zip"));
  b.push(U.tabelaDanych([3400, 5670], ["Plik", "Do czego"], [
    ["zestawienie-kolor.png, .pdf", "Podstawowa wersja na plakaty, grafiki, dokumenty"],
    ["zestawienie-achromat.png", "Druk jednokolorowy, kserokopie, pieczątki"],
    ["zestawienie-inwersja.png", "Ciemne tła, wideo na czarnym tle"],
    ["zestawienie-druk-kolor.png", "Wysoka rozdzielczość do drukarni, roll-upy, banery"],
    ["niw-pion-kolor.png, niw-poziom-kolor.png", "Sam znak NIW, tylko gdy wytyczne pozwalają, na przykład w tekście artykułu"],
    ["komitet-pozytku.svg", "Sam znak Komitetu, wektor"],
    ["flaga-godlo.png", "Barwy i godło RP do strony internetowej mikroprojektu"],
    ["klaster-logo.png, instytut-logo.png", "Znaki Operatora i współoferenta, zawsze razem, opcjonalnie"],
    ["odporne-slaskie-znak.svg, .png", "Znak konkursu, opcjonalnie obok własnego logo"],
    ["klauzula.txt", "Napisy informacyjne do skopiowania, z poprawną półpauzą"],
    ["lista-obecnosci.pdf, lista-obecnosci.docx", "Lista obecności z gotowym oznaczeniem, do druku albo do edycji"],
    ["naklejki-a4.pdf", "Arkusz A4 z naklejkami w dwóch rozmiarach do wydruku na papierze samoprzylepnym"],
    ["instrukcja-oznaczen.pdf", "Ten dokument"],
  ]));
  b.push(U.akapit("W razie wątpliwości pisz do Operatora: mms@klaster.org.pl. Pytania o same wytyczne przyjmuje też NIW-CRSO: media@niw.gov.pl.", { odstep: 10 }));

  b.push(...U.pasekOznaczen());
  return U.zbuduj({ tytul: "Pakiet oznaczeń", naglowek: "Załącznik nr 8, pakiet oznaczeń" }, b);
}

/* =======================================================================
   ZALACZNIK 9. Ankieta na wejsciu i na wyjsciu, mikroprojekty MiSLOP
   ======================================================================= */
const PYTANIA_A = [
  ["Pierwsza pomoc", "Wiem, gdzie w mojej okolicy jest najbliższy defibrylator AED i jak go użyć."],
  ["Pierwsza pomoc", "Potrafię udzielić pierwszej pomocy osobie nieprzytomnej do czasu przyjazdu karetki."],
  ["Blackout i klęski", "Wiem, co przygotować w domu na wypadek braku prądu dłuższego niż dobę."],
  ["Blackout i klęski", "Wiem, gdzie w gminie jest punkt zbiórki albo miejsce pomocy w razie powodzi lub pożaru."],
  ["Bezpieczeństwo cyfrowe", "Potrafię rozpoznać próbę oszustwa przez telefon, SMS albo internet."],
  ["Bezpieczeństwo cyfrowe", "Potrafię sprawdzić, czy informacja w internecie jest prawdziwa, zanim ją przekażę dalej."],
  ["Sieci sąsiedzkie", "Wiem, kto w moim sąsiedztwie może potrzebować pomocy w kryzysie i jak się z nim skontaktować."],
  ["Sieci sąsiedzkie", "Wiem, do kogo w sąsiedztwie mogę zwrócić się o pomoc, gdy sam jej potrzebuję."],
  ["Współpraca ze służbami", "Wiem, pod jaki numer dzwonić w jakiej sytuacji i co powiedzieć dyspozytorowi."],
  ["Współpraca ze służbami", "Wiem, jak moja społeczność może współpracować z OSP, policją albo ratownikami przed kryzysem."],
];
const PYTANIA_B = [
  ["Ile uciśnięć klatki piersiowej na minutę wykonuje się przy resuscytacji dorosłego?", "około 60", "około 100 do 120", "około 200", "b"],
  ["Ile wody na osobę warto mieć w zapasie na wypadek dłuższej przerwy w dostawie?", "1 litr łącznie", "około 3 litry na dobę", "zapas nie jest potrzebny", "b"],
  ["Bank dzwoni i prosi o podanie kodu z SMS-a, żeby zablokować podejrzany przelew. Co robisz?", "podaję kod", "rozłączam się i dzwonię na numer z karty", "podaję kod, jeśli rozmówca zna moje nazwisko", "b"],
  ["Sąsiad z wysokim ciśnieniem mieszka sam. Co ma największy sens przed kryzysem?", "nic, to jego sprawa", "ustalić z nim, kto go sprawdzi i jak dać znać, że potrzebuje pomocy", "kupić mu apteczkę", "b"],
  ["Numer 112 służy do:", "wezwania każdej służby ratunkowej", "tylko policji", "informacji o pogodzie", "a"],
];

function ankietaPrePost() {
  const b = [];
  b.push(...U.stronaTytulowa({
    tytul: "Ankieta na wejściu i na wyjściu",
    stempel: "Załącznik nr 9 do regulaminu, mikroprojekty MiŚLOP",
    duzy: false,
    uwaga: "Ankieta mierzy wzrost świadomości z zakresu odporności na sytuacje kryzysowe u odbiorców mikroprojektów prowadzonych przez małe i średnie lokalne organizacje pozarządowe. Ta sama ankieta jest wypełniana dwa razy: na pierwszym spotkaniu (wejście) i na ostatnim (wyjście). Grantobiorca MiŚLOP ma obowiązek jej użycia, zgodnie z § 19 ust. 3 regulaminu; grupy nieformalne mogą jej używać dobrowolnie.",
  }));
  b.push(lamStrone());

  b.push(...U.naglowekSekcji("", "Instrukcja dla grantobiorcy"));
  b.push(...ustepy([
    "Ankietę wypełniają dorośli odbiorcy bezpośredni mikroprojektu. Wypełnienie zajmuje około 5 minut. Nie zbieraj imion ani nazwisk; uczestnik wpisuje kod, który pozwoli połączyć ankietę z wejścia z ankietą z wyjścia.",
    "Kod uczestnika to: pierwsza litera imienia matki, pierwsza litera imienia ojca, dzień urodzenia uczestnika (dwie cyfry). Przykład: A, J, 07 daje kod AJ07. Przy tym samym uczestniku kod jest taki sam w obu ankietach.",
    "Ankietę na wejściu robisz przed pierwszym działaniem merytorycznym, ankietę na wyjściu po ostatnim. Jeżeli mikroprojekt to jedno spotkanie, ankietę na wejściu robisz na początku, a na wyjściu na końcu tego samego spotkania.",
    "Uczestnik zwiększył świadomość, jeżeli spełnia co najmniej jeden warunek: suma punktów w części A na wyjściu jest wyższa niż na wejściu, albo liczba poprawnych odpowiedzi w części B na wyjściu jest wyższa niż na wejściu.",
    "Wyniki przenosisz do tabeli zbiorczej na końcu tego załącznika i dołączasz ją do sprawozdania razem z wypełnionymi ankietami. Wskaźnik z wniosku: co najmniej dwie osoby w każdym mikroprojekcie MiŚLOP zwiększają świadomość; łącznie w konkursie co najmniej 138 osób.",
    "Możesz dodać własne pytania o temat swojego mikroprojektu, ale części A i B zostają bez zmian, bo są liczone jednakowo we wszystkich mikroprojektach.",
  ]));
  b.push(U.akapit("Klucz odpowiedzi do części B: 1 b, 2 b, 3 b, 4 b, 5 a. Nie drukuj klucza na ankiecie dla uczestnika.", { kolor: U.SZARY, rozmiar: 20, odstep: 10 }));

  const ankieta = (tytul) => {
    b.push(lamStrone());
    b.push(...U.naglowekSekcji("", tytul));
    b.push(U.polaKrotkie([["Kod uczestnika", "litera imienia matki, litera imienia ojca, dzień urodzenia, np. AJ07"], ["Mikroprojekt", ""], ["Data", ""]]));
    b.push(U.akapit("Część A. Zaznacz, w jakim stopniu zgadzasz się ze zdaniem: 1 zupełnie się nie zgadzam, 5 całkowicie się zgadzam.", { pogrub: true, odstep: 6 }));
    b.push(U.tabelaDanych([600, 6470, 400, 400, 400, 400, 400],
      ["Lp.", "Zdanie", "1", "2", "3", "4", "5"],
      PYTANIA_A.map((p, i) => [String(i + 1), p[1], "☐", "☐", "☐", "☐", "☐"]),
      { srodkujLiczby: true }));
    b.push(U.akapit("Część B. Zaznacz jedną odpowiedź.", { pogrub: true, odstep: 6 }));
    PYTANIA_B.forEach((p, i) => {
      b.push(U.ustep(i + 1, p[0]));
      b.push(U.punkt("a", p[1])); b.push(U.punkt("b", p[2])); b.push(U.punkt("c", p[3]));
    });
  };

  ankieta("Ankieta na wejściu");
  ankieta("Ankieta na wyjściu");
  b.push(U.akapit("Część C, tylko na wyjściu.", { pogrub: true, odstep: 6 }));
  b.push(...U.pole("Co z tego, czego się nauczyłem, zamierzam wykorzystać?", 3));
  b.push(...U.pole("Czego zabrakło albo co warto zrobić inaczej?", 3));

  b.push(lamStrone());
  b.push(...U.naglowekSekcji("", "Tabela zbiorcza do sprawozdania"));
  b.push(U.podpowiedz("Jeden wiersz na uczestnika, który wypełnił obie ankiety. Suma A to suma ocen z części A (10 do 50). Poprawne B to liczba trafnych odpowiedzi (0 do 5). Wzrost: TAK, gdy suma A na wyjściu jest wyższa niż na wejściu albo poprawnych B na wyjściu jest więcej niż na wejściu."));
  b.push(U.tabelaPusta([1300, 1300, 1300, 1300, 1300, 1300, 1270],
    ["Kod", "Suma A wejście", "Suma A wyjście", "Poprawne B wejście", "Poprawne B wyjście", "Wzrost TAK/NIE", "Uwagi"], 18, 260));
  b.push(U.polaKrotkie([["Liczba uczestników z obiema ankietami", ""], ["Liczba osób ze wzrostem świadomości", "ta liczba idzie do sprawozdania"]]));
  b.push(U.miejsceNaPodpis(["Data i podpis osoby sporządzającej"]));

  b.push(...U.pasekOznaczen());
  return U.zbuduj({ tytul: "Ankieta na wejściu i na wyjściu", naglowek: "Załącznik nr 9, ankieta na wejściu i na wyjściu" }, b);
}

/* =======================================================================
   Do paczki oznaczen: lista obecnosci i arkusz naklejek
   ======================================================================= */
function listaObecnosci() {
  const b = [];
  b.push(obrazek("logotypy/web-mms-kolor.png", 400, 73, 4));
  b.push(U.akapit(U.KLAUZULA + ".", { rozmiar: 18, kolor: U.SZARY, odstep: 8 }));
  b.push(...U.naglowekSekcji("", "Lista obecności"));
  b.push(U.polaKrotkie([
    ["Mikroprojekt", "tytuł i nazwa grantobiorcy"],
    ["Działanie", "nazwa spotkania, warsztatu, szkolenia"],
    ["Data i miejsce", ""],
    ["Prowadzący", ""],
  ]));
  b.push(U.podpowiedz("Podpisując listę, uczestnik potwierdza udział i przyjmuje do wiadomości klauzulę informacyjną z załącznika nr 7 do regulaminu konkursu, dostępną u prowadzącego."));
  b.push(U.tabelaPusta([600, 3600, 2800, 2070], ["Lp.", "Imię i nazwisko", "Miejscowość", "Podpis"], 22, 300));
  b.push(U.akapit("Konkurs Moc Małych Społeczności – Śląskie, zadanie publiczne Wielka Moc Małych Społeczności – Odporne Śląskie 2026. Operator: Fundacja Klaster Innowacji Społecznych, współoferent: Instytut Roździeńskiego.", { rozmiar: 17, kolor: U.SZARY, odstep: 10 }));
  return U.zbuduj({ tytul: "Lista obecności", naglowek: "Lista obecności, wzór z oznaczeniem" }, b);
}

function naklejki() {
  const b = [];
  b.push(U.akapit("Arkusz naklejek do wydruku na papierze samoprzylepnym A4. Wytnij po ramkach. Duża naklejka na sprzęt wielkości apteczki i większy, mała na latarki, powerbanki i drobne przedmioty.", { rozmiar: 19, kolor: U.SZARY, odstep: 10 }));
  const ramka = (w, h, klauzula) => new Paragraph({
    spacing: { before: 120, after: 120 },
    border: {
      top: { style: "single", size: 6, color: U.LINIA, space: 10 }, bottom: { style: "single", size: 6, color: U.LINIA, space: 10 },
      left: { style: "single", size: 6, color: U.LINIA, space: 10 }, right: { style: "single", size: 6, color: U.LINIA, space: 10 },
    },
    children: [
      new ImageRun({ type: "png", data: U.obraz("logotypy/web-mms-kolor.png"), transformation: { width: w, height: h } }),
      ...(klauzula ? [new TextRun({ break: 1 }), new TextRun({ text: U.KLAUZULA, font: U.SANS, size: 15, color: U.TUSZ })] : []),
    ],
  });
  b.push(ramka(440, 81, true));
  b.push(ramka(440, 81, true));
  b.push(ramka(260, 48, false));
  b.push(ramka(260, 48, false));
  b.push(ramka(260, 48, false));
  b.push(ramka(260, 48, false));
  return U.zbuduj({ tytul: "Naklejki na sprzęt", naglowek: "Naklejki z zestawieniem znaków, arkusz A4" }, b);
}

/* ---------- zapis ---------- */
const DOKUMENTY = [
  ["zal-6-standardy-ochrony-maloletnich.docx", standardyMaloletnich],
  ["zal-7-klauzule-rodo-i-zgody.docx", klauzuleRodo],
  ["zal-8-pakiet-oznaczen.docx", pakietOznaczen],
  ["zal-9-ankieta-wejscie-wyjscie.docx", ankietaPrePost],
  ["lista-obecnosci.docx", listaObecnosci],
  ["naklejki-a4.docx", naklejki],
];

(async () => {
  for (const [nazwa, fn] of DOKUMENTY) {
    const buf = await Packer.toBuffer(fn());
    fs.writeFileSync(path.join(__dirname, nazwa), buf);
    console.log("zapisano", nazwa, Math.round(buf.length / 1024) + " KB");
  }
})();
