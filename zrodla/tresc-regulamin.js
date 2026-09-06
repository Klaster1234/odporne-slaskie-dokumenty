/**
 * Tresc regulaminu konkursu mikrodotacji "Odporne Slaskie 2026".
 * Zrodlo faktow: wniosek nr 97594 (Priorytet 2 MMS 2026) oraz
 * Wytyczne promocji zadan publicznych NIW-CRSO ze stycznia 2026.
 *
 * Struktura: paragrafy, w kazdym ustepy (u), w ustepach punkty (p).
 */

const KLAUZULA =
  "Sfinansowano ze środków Narodowego Instytutu Wolności – Centrum Rozwoju Społeczeństwa " +
  "Obywatelskiego w ramach Rządowego Programu wsparcia organizacji pozarządowych " +
  "Moc Małych Społeczności";

/** Nazwa konkursu narzucona przez § 1 ust. 4 umowy nr 12/2/MMS/2026. Nie zmieniac. */
const KONKURS = "Moc Małych Społeczności – Śląskie";

const META = {
  tytul: "Regulamin konkursu na mikrodotacje",
  podtytul: KONKURS,
  konkurs: KONKURS,
  zadanie: "Wielka Moc Małych Społeczności – Odporne Śląskie 2026",
  umowa: "12/2/MMS/2026",
  wniosek: "97594",
  priorytet: "Priorytet 2",
  wersja: "wersja 1.6",
  data: "6 września 2026",
  klauzula: KLAUZULA,
};

const PARAGRAFY = [
  {
    nr: 1,
    tytul: "Postanowienia ogólne",
    u: [
      "Niniejszy regulamin określa zasady przyznawania, wydatkowania i rozliczania mikrodotacji w konkursie „Moc Małych Społeczności – Śląskie”, zwanym dalej Konkursem.",
      "Nazwa Konkursu brzmi „Moc Małych Społeczności – Śląskie” i jest stosowana jednolicie w ogłoszeniu o naborze, w regulaminie, w formularzach oraz we wszystkich materiałach informacyjnych, zgodnie z § 1 ust. 4 umowy nr 12/2/MMS/2026. Określenie „Odporne Śląskie 2026” jest skróconą nazwą zadania publicznego i hasłem kampanii informacyjnej, nie zastępuje nazwy Konkursu.",
      "Organizatorem Konkursu, zwanym dalej Operatorem, jest Fundacja Klaster Innowacji Społecznych z siedzibą w Gliwicach przy ulicy o. Jana Siemińskiego 22, 44-100 Gliwice, wpisana do Krajowego Rejestru Sądowego pod numerem 0000577540, NIP 6312658876, działająca jako lider oferty wspólnej.",
      "Współoferentem, będącym stroną umowy o realizację zadania publicznego, jest Instytut Roździeńskiego z siedzibą w Katowicach przy ulicy Mariackiej 6/7, 40-014 Katowice, wpisany do Krajowego Rejestru Sądowego pod numerem 0000576508, NIP 6312658793.",
      "Konkurs jest elementem zadania publicznego „Wielka Moc Małych Społeczności – Odporne Śląskie 2026”, realizowanego na podstawie oferty wspólnej nr 97594 oraz umowy nr 12/2/MMS/2026 zawartej z Narodowym Instytutem Wolności – Centrum Rozwoju Społeczeństwa Obywatelskiego.",
      "Zadanie jest finansowane ze środków Narodowego Instytutu Wolności – Centrum Rozwoju Społeczeństwa Obywatelskiego w ramach Rządowego Programu wsparcia organizacji pozarządowych Moc Małych Społeczności, Priorytet 2.",
      "Konkurs jest prowadzony w trybie art. 16a ustawy z dnia 24 kwietnia 2003 r. o działalności pożytku publicznego i o wolontariacie.",
      "Konkurs obejmuje obszar województwa śląskiego.",
      "Nabór wniosków, ocena, zawarcie umowy oraz rozliczenie mikrodotacji odbywają się w całości w postaci elektronicznej, w systemie konkursowym Operatora. Wnioskodawca nie składa dokumentów w postaci papierowej.",
    ],
  },
  {
    nr: 2,
    tytul: "Słowniczek",
    wstep: "Ilekroć w regulaminie jest mowa o:",
    u: [
      { t: "mikrodotacji, rozumie się przez to środki finansowe powierzone Grantobiorcy na realizację mikroprojektu, w kwocie od 1 000 zł do 10 000 zł;" },
      { t: "mikroprojekcie, rozumie się przez to inicjatywę lokalną realizowaną przez Grantobiorcę, zawierającą obowiązkowy komponent odporności;" },
      { t: "MiŚLOP, rozumie się przez to małe i średnie lokalne organizacje pozarządowe, to jest stowarzyszenia, fundacje, koła gospodyń wiejskich, ochotnicze straże pożarne posiadające osobowość prawną oraz kluby sportowe, których średni roczny przychód z trzech ostatnich zamkniętych lat budżetowych nie przekroczył 200 000 zł oraz które są zarejestrowane i prowadzą działalność na terenach wiejskich albo w miejscowościach liczących nie więcej niż 100 000 mieszkańców;" },
      { t: "grupie nieformalnej, rozumie się przez to co najmniej trzy osoby fizyczne działające wspólnie, nieposiadające osobowości prawnej, zamieszkałe na terenie województwa śląskiego;" },
      { t: "organizacji patronackiej, rozumie się przez to podmiot posiadający osobowość prawną, który użycza jej grupie nieformalnej i przyjmuje na siebie odpowiedzialność za rozliczenie mikrodotacji;" },
      { t: "komponencie odporności, rozumie się przez to element mikroprojektu dotyczący odporności społecznej, bezpieczeństwa lokalnego albo reagowania na sytuacje kryzysowe;" },
      { t: "subregionie, rozumie się przez to jeden z czterech obszarów podziału puli: zachodni, południowy, centralny albo północny, zgodnie z § 7 ustęp 4;" },
      { t: "systemie konkursowym, rozumie się przez to narzędzie elektroniczne Operatora służące do składania wniosków, oceny, zawierania umów i rozliczeń;" },
      { t: "Grantobiorcy, rozumie się przez to podmiot uprawniony wymieniony w § 4, z którym Operator zawarł umowę o powierzenie mikrodotacji." },
    ],
  },
  {
    nr: 3,
    tytul: "Cel Konkursu",
    u: [
      "Celem Konkursu jest zwiększenie odporności małych społeczności województwa śląskiego na kryzysy przez powierzenie mikrodotacji na oddolne inicjatywy lokalne.",
      "Operator powierzy mikrodotacje na co najmniej 104 inicjatywy, w tym co najmniej 69 realizowanych przez MiŚLOP.",
    ],
  },
  {
    nr: 4,
    tytul: "Podmioty uprawnione do udziału",
    u: [
      {
        t: "O mikrodotację mogą ubiegać się:",
        p: [
          "MiŚLOP;",
          "lokalne grupy nieformalne liczące co najmniej trzy osoby, działające samodzielnie albo za pośrednictwem organizacji patronackiej;",
          "organizacje patronackie działające na rzecz grup nieformalnych.",
        ],
      },
      "Warunkiem udziału jest siedziba albo miejsce zamieszkania w województwie śląskim, w miejscowości liczącej nie więcej niż 100 000 mieszkańców. Przy grupie nieformalnej działającej samodzielnie liczy się miejsce zamieszkania osoby do kontaktu wskazanej we wniosku.",
      "Liczbę mieszkańców ustala się na podstawie danych Głównego Urzędu Statystycznego według stanu na dzień 31 grudnia roku poprzedzającego ogłoszenie Konkursu.",
      "Jeden podmiot może złożyć jeden wniosek i otrzymać jedną mikrodotację. Zasada dotyczy również podmiotu występującego jako organizacja patronacka dla więcej niż jednej grupy nieformalnej.",
      "Grupa nieformalna działająca przez organizację patronacką wskazuje ją we wniosku. Stroną umowy o powierzenie mikrodotacji jest wówczas organizacja patronacka.",
    ],
  },
  {
    nr: 5,
    tytul: "Wyłączenia z udziału",
    u: [
      {
        t: "Z udziału w Konkursie wyłączone są podmioty:",
        p: [
          "wpisane do rejestru podmiotów wykluczonych z możliwości otrzymania środków publicznych;",
          "zalegające z należnościami publicznoprawnymi;",
          "wobec których toczy się postępowanie egzekucyjne dotyczące zobowiązań publicznoprawnych;",
          "niespełniające warunków formalnych Rządowego Programu wsparcia organizacji pozarządowych Moc Małych Społeczności.",
        ],
      },
      "Spełnienie warunków, o których mowa w ustępie 1, weryfikuje się na etapie oceny formalnej na podstawie oświadczeń wnioskodawcy złożonych pod rygorem odpowiedzialności karnej za podanie danych niezgodnych ze stanem faktycznym lub prawnym.",
      "Członkowie komisji oceniającej, osoby zatrudnione u Operatora oraz u współoferenta, a także podmioty, w których osoby te pełnią funkcje w organach zarządzających lub kontrolnych, nie mogą ubiegać się o mikrodotację.",
    ],
  },
  {
    nr: 6,
    tytul: "Obowiązkowy komponent odporności",
    u: [
      "Każdy mikroprojekt musi zawierać co najmniej jeden element dotyczący odporności społecznej, bezpieczeństwa lokalnego albo reagowania na sytuacje kryzysowe.",
      "Obecność komponentu odporności jest kryterium dopuszczającym o charakterze zero-jedynkowym. Wniosek pozbawiony komponentu nie podlega ocenie merytorycznej.",
      {
        t: "Dla ujednolicenia oceny Operator odwołuje się do obszarów Poradnika Bezpieczeństwa Ministerstwa Spraw Wewnętrznych i Administracji. Mikroprojekt spełnia warunek, jeżeli dotyczy co najmniej jednego z obszarów:",
        p: [
          "pierwsza pomoc i obsługa automatycznego defibrylatora zewnętrznego;",
          "klęski żywiołowe oraz długotrwała przerwa w dostawie prądu;",
          "bezpieczeństwo cyfrowe, dezinformacja i oszustwa;",
          "sieci sąsiedzkie i wolontariat spontaniczny;",
          "współpraca ze służbami oraz z jednostkami ochotniczych straży pożarnych.",
        ],
      },
      "Na etapie oceny merytorycznej ocenie podlega jakość komponentu, to jest jego powiązanie ze zdiagnozowaną potrzebą lokalną oraz trwałość efektu. Komponent wskazany wyłącznie formalnie, bez powiązania z zaplanowanymi działaniami, skutkuje niską punktacją w kryterium pierwszym.",
    ],
  },
  {
    nr: 7,
    tytul: "Pula środków i podział na subregiony",
    u: [
      "Pula Konkursu wynosi 854 000 zł.",
      "Operator zawiera 108 umów o powierzenie mikrodotacji, aby zabezpieczyć rozliczenie co najmniej 104 mikroprojektów mimo możliwych rezygnacji.",
      "Pulę dzieli się na cztery subregiony, z odrębnym limitem środków oraz odrębną listą rankingową dla każdego z nich. Limit dla każdego subregionu wynosi 213 500 zł.",
      {
        t: "Przyporządkowanie do subregionu wynika z siedziby wnioskodawcy, a przy grupie nieformalnej działającej samodzielnie z miejsca zamieszkania osoby do kontaktu wskazanej we wniosku:",
        p: [
          "subregion zachodni obejmuje powiaty raciborski, rybnicki, wodzisławski oraz miasta Żory i Jastrzębie-Zdrój;",
          "subregion południowy obejmuje powiaty bielski, cieszyński, żywiecki i pszczyński;",
          "subregion centralny obejmuje powiaty będziński, gliwicki, tarnogórski, mikołowski i bieruńsko-lędziński oraz miejscowości aglomeracji poniżej progu 100 000 mieszkańców;",
          "subregion północny obejmuje powiaty częstochowski, kłobucki, myszkowski, zawierciański i lubliniecki.",
        ],
      },
      "Wniosek konkuruje o środki wyłącznie z wnioskami złożonymi w tym samym subregionie.",
      "Środki niewykorzystane w jednym subregionie Operator może przenieść do subregionu, w którym lista rezerwowa nie została wyczerpana. Przeniesienie następuje po zamknięciu kontraktacji we wszystkich subregionach i wymaga pisemnej decyzji Operatora, publikowanej na stronie Konkursu.",
      "Operator prowadzi w każdym subregionie wyodrębnioną pulę dla MiŚLOP, tak aby osiągnąć minimum 69 mikrodotacji dla tej kategorii podmiotów w skali Konkursu. Jeżeli na liście rankingowej subregionu liczba wniosków MiŚLOP rekomendowanych w limicie środków jest niższa niż 18, Operator rekomenduje kolejne wnioski MiŚLOP z listy rezerwowej tego subregionu, w kolejności liczby punktów, w miejsce najniżej ocenionych wniosków innych podmiotów, aż do osiągnięcia 18 wniosków MiŚLOP.",
    ],
  },
  {
    nr: 8,
    tytul: "Wysokość mikrodotacji",
    u: [
      "Kwota mikrodotacji wynosi od 1 000 zł do 10 000 zł.",
      "Wartość przeciętna zakładana przez Operatora wynosi około 7 900 zł. Wartość ta ma charakter planistyczny i nie stanowi kwoty gwarantowanej ani zalecanej.",
      "Mikrodotacja jest powierzeniem w rozumieniu art. 16a ustawy o działalności pożytku publicznego i o wolontariacie. Grantobiorca nie wnosi wkładu własnego.",
      "Operator nie przyznaje mikrodotacji w kwocie wyższej niż wnioskowana.",
      "Środki mikrodotacji Grantobiorca przeznacza wyłącznie na działalność pożytku publicznego.",
      "Grantobiorca nie pobiera od odbiorców mikroprojektu żadnych świadczeń pieniężnych. Udział w działaniach finansowanych z mikrodotacji jest bezpłatny.",
    ],
  },
  {
    nr: 9,
    tytul: "Koszty kwalifikowalne",
    u: [
      "Kwalifikowalne są koszty bezpośrednio związane z realizacją mikroprojektu, poniesione w okresie realizacji wskazanym w umowie, udokumentowane, racjonalne oraz zgodne z budżetem stanowiącym załącznik do umowy.",
      {
        t: "Kwalifikowalne są w szczególności:",
        p: [
          "wynagrodzenia osób prowadzących działania, w tym trenerów, ratowników i edukatorów;",
          "materiały, wyposażenie i sprzęt służące realizacji mikroprojektu;",
          "wynajem sal i sprzętu;",
          "koszty transportu i dojazdu;",
          "druk i opracowanie materiałów informacyjnych;",
          "wyżywienie uczestników w zakresie niezbędnym dla realizacji działania;",
          "koszty promocji mikroprojektu, w tym oznaczeń wymaganych regulaminem.",
        ],
      },
      "Wszystkie płatności są dokonywane bezgotówkowo, z rachunku bankowego Grantobiorcy, organizacji patronackiej albo członka grupy nieformalnej wskazanego w umowie.",
    ],
  },
  {
    nr: 10,
    tytul: "Koszty niekwalifikowalne",
    u: [
      {
        t: "Niekwalifikowalne są w szczególności:",
        p: [
          "wydatek majątkowy o wartości jednostkowej przekraczającej 10 000 zł;",
          "koszty poniesione przed dniem rozpoczęcia i po dniu zakończenia realizacji mikroprojektu;",
          "kary umowne, grzywny, odsetki od zobowiązań oraz koszty postępowań sądowych;",
          "zakup napojów alkoholowych i wyrobów tytoniowych;",
          "wydatki pokryte z innego źródła publicznego, stanowiące podwójne finansowanie;",
          "zakup nieruchomości oraz koszty prac budowlanych;",
          "wydatki niezwiązane z realizacją mikroprojektu.",
        ],
      },
      "Stwierdzenie poniesienia kosztu niekwalifikowalnego skutkuje żądaniem zwrotu odpowiedniej części mikrodotacji na zasadach określonych w § 25.",
    ],
  },
  {
    nr: 11,
    tytul: "Rozwój instytucjonalny Grantobiorcy",
    u: [
      "MiŚLOP mogą przeznaczyć nie więcej niż 50 procent mikrodotacji na rozwój własnej organizacji, w szczególności na sprzęt biurowy, oprogramowanie, stronę internetową, szkolenie zarządu oraz opracowanie dokumentacji wewnętrznej.",
      "Lokalne grupy nieformalne przeznaczają całość środków na działania merytoryczne. Nie mogą finansować rozwoju instytucjonalnego ani nabywać środków trwałych.",
      "Wydatek na rozwój instytucjonalny wnioskodawca opisuje we wniosku i uzasadnia jego związek ze zdolnością organizacji do prowadzenia działalności po zakończeniu mikroprojektu.",
    ],
  },
  {
    nr: 12,
    tytul: "Nabór wniosków",
    u: [
      "Nabór trwa co najmniej 30 dni i jest prowadzony wyłącznie w systemie konkursowym Operatora.",
      "Wnioskodawca zakłada konto, wypełnia formularz, sporządza budżet, składa wymagane oświadczenia i przesyła wniosek. System potwierdza złożenie automatycznie, nadając wnioskowi numer oraz znacznik czasu.",
      "Pole wskazujące obszar komponentu odporności jest obowiązkowe i podlega weryfikacji przy zapisie wniosku.",
      "System konkursowy spełnia wymagania dostępności cyfrowej na poziomie WCAG 2.1 AA.",
      "Wnioskodawca może korzystać z bezpłatnego wsparcia: infolinii Operatora czynnej od poniedziałku do piątku w godzinach od 10:00 do 16:00 pod numerem 539 644 192, całodobowego asystenta AI w systemie konkursowym, szkoleń i webinariów Akademii Odporności, indywidualnego mentoringu oraz kontaktu mailowego z biurem Operatora pod adresem mms@klaster.org.pl.",
      "Wnioski złożone po terminie nie podlegają rozpatrzeniu. O zachowaniu terminu decyduje znacznik czasu nadany przez system konkursowy.",
      "Terminy Konkursu ogłasza Operator na stronie Konkursu. Terminy mogą ulec zmianie. O każdej zmianie Operator informuje na stronie Konkursu oraz mailem do osób zapisanych na powiadomienia.",
    ],
  },
  {
    nr: 13,
    tytul: "Ocena formalna",
    u: [
      "Oceny formalnej dokonuje jeden ekspert wskazany przez Operatora.",
      {
        t: "Ocena formalna obejmuje sprawdzenie:",
        p: [
          "uprawnienia podmiotu do udziału w Konkursie;",
          "kompletności wniosku;",
          "zgodności wniosku z regulaminem, w tym z limitami kwotowymi;",
          "obecności obowiązkowego komponentu odporności;",
          "złożenia wszystkich wymaganych oświadczeń.",
        ],
      },
      "Braki formalne podlegają jednokrotnemu uzupełnieniu w terminie 3 dni roboczych od dnia wysłania wezwania w systemie konkursowym.",
      "Wniosek nieuzupełniony w terminie, wniosek złożony przez podmiot nieuprawniony oraz wniosek pozbawiony komponentu odporności pozostawia się bez rozpatrzenia.",
      "Wynik oceny formalnej Operator udostępnia wnioskodawcy w systemie konkursowym wraz z uzasadnieniem.",
    ],
  },
  {
    nr: 14,
    tytul: "Ocena merytoryczna",
    u: [
      "Wnioski ocenia komisja licząca 12 ekspertów, wyłonionych w zapytaniu ofertowym. Kryteriami wyboru ekspertów są doświadczenie w ocenie projektów społecznych, znajomość specyfiki regrantingu oraz znajomość tematyki bezpieczeństwa i zarządzania kryzysowego.",
      "Każdy ekspert przed przystąpieniem do oceny składa oświadczenie o bezstronności, braku konfliktu interesów oraz o zachowaniu poufności.",
      "Ekspert podlega wyłączeniu od oceny wniosku, jeżeli pozostaje z wnioskodawcą w stosunku, który może budzić wątpliwości co do bezstronności. Wyłączenie odnotowuje się w dokumentacji Konkursu.",
      "Każdy wniosek oceniają dwaj niezależni eksperci, przyznając niezależnie od siebie nie więcej niż 50 punktów. Wynikiem oceny jest średnia arytmetyczna obu ocen.",
      "Jeżeli różnica między ocenami przekracza 25 punktów, wniosek kieruje się do trzeciego eksperta, którego ocena jest rozstrzygająca.",
      "Ekspert nie ma wglądu w oceny pozostałych ekspertów przed zakończeniem własnej oceny.",
    ],
  },
  {
    nr: 15,
    tytul: "Kryteria oceny merytorycznej",
    wstep:
      "Ocena merytoryczna odbywa się według jawnej karty oceny, stanowiącej załącznik nr 3 do regulaminu. Karta obejmuje pięć kryteriów o łącznej maksymalnej punktacji 50 punktów, opracowanych na podstawie oferty realizacji zadania.",
    tabela: {
      naglowki: ["Kryterium", "Maksimum", "Minimum"],
      wiersze: [
        ["1. Trafność diagnozy lokalnej potrzeby oraz jakość komponentu odporności", "15", "6"],
        ["2. Spójność i racjonalność zaplanowanych działań", "10", "4"],
        ["3. Mierzalność i trwałość rezultatów", "10", "4"],
        ["4. Racjonalność i efektywność kosztów", "10", "4"],
        ["5. Potencjał realizatora do wykonania inicjatywy", "5", "2"],
        ["Razem", "50", "20"],
      ],
    },
    u2: [
      "Do dofinansowania rekomenduje się wnioski, które uzyskały co najmniej 25 punktów, to jest 50 procent możliwej punktacji, oraz osiągnęły minimum punktowe w każdym z pięciu kryteriów w każdej ze złożonych kart oceny.",
      "Wniosek, który nie osiągnął minimum w choćby jednym kryterium, nie może zostać rekomendowany niezależnie od sumy punktów.",
      "Ekspert uzasadnia ocenę w każdym kryterium, nie mniej niż 100 znaków na kryterium i nie mniej niż 500 znaków dla całej karty.",
      "Ekspert może rekomendować wniosek warunkowo, z korektą budżetu. Korekta dotyczy wyłącznie pozycji niekwalifikowalnych z § 10 albo pozycji wskazanych przez eksperta jako nieuzasadnione. Ekspert wskazuje te pozycje i ich wartość w karcie oceny, a Operator obniża kwotę mikrodotacji o ich wartość przed zawarciem umowy. Korekta nie zmienia punktacji ani miejsca na liście rankingowej.",
    ],
  },
  {
    nr: 16,
    tytul: "Listy rankingowe i listy rezerwowe",
    u: [
      "Z ocen merytorycznych powstaje odrębna lista rankingowa w każdym z czterech subregionów, uszeregowana malejąco według liczby punktów.",
      "Wnioski mieszczące się w limicie środków subregionu otrzymują rekomendację do dofinansowania. Pozostałe wnioski rekomendowane trafiają na listę rezerwową tego samego subregionu.",
      "Jeżeli pozostała kwota limitu subregionu jest niższa od wnioskowanej, Operator proponuje wnioskodawcy mikrodotację w wysokości pozostałej kwoty, nie niższej niż 1 000 zł. Brak zgody w terminie 3 dni roboczych oznacza przejście do kolejnego wniosku z listy.",
      "Przy równej liczbie punktów o kolejności decyduje wyższa punktacja w kryterium pierwszym, a w dalszej kolejności w kryterium trzecim.",
      "Listy rankingowe i listy rezerwowe Operator publikuje na stronie Konkursu, wskazując nazwę podmiotu, subregion, tytuł mikroprojektu, wnioskowaną kwotę oraz liczbę punktów.",
      "Rezygnacja Grantobiorcy albo rozwiązanie umowy skutkuje wyborem kolejnego podmiotu z listy rezerwowej danego subregionu, bez ponawiania naboru.",
    ],
  },
  {
    nr: 17,
    tytul: "Procedura odwoławcza",
    u: [
      "Wnioskodawcy przysługuje prawo wglądu w kartę oceny własnego wniosku, udostępnianą przez Operatora na żądanie.",
      "Od wyniku oceny formalnej oraz od wyniku oceny merytorycznej przysługuje odwołanie, składane w systemie konkursowym w terminie 5 dni roboczych od dnia opublikowania wyniku.",
      "Odwołanie rozpatruje ekspert, który nie uczestniczył w pierwotnej ocenie danego wniosku, w terminie 5 dni roboczych od dnia wpływu odwołania.",
      "Rozstrzygnięcie odwołania jest ostateczne. Uwzględnienie odwołania skutkuje korektą listy rankingowej danego subregionu, którą Operator publikuje wraz z datą zmiany.",
    ],
  },
  {
    nr: 18,
    tytul: "Umowa o powierzenie mikrodotacji",
    u: [
      "Operator zawiera umowy po zamknięciu oceny i opublikowaniu pełnych list rankingowych w danym subregionie, co zapewnia równe traktowanie wnioskodawców.",
      "Umowa jest zawierana w postaci elektronicznej w systemie konkursowym.",
      "Operator nie wymaga weksla ani innego zabezpieczenia rzeczowego. Zabezpieczeniem są oświadczenia Grantobiorcy złożone przy zawarciu umowy.",
      "Stroną umowy w przypadku grupy nieformalnej działającej przez organizację patronacką jest ta organizacja. Odpowiedzialność za wydatkowanie i rozliczenie mikrodotacji ponosi organizacja patronacka.",
      "Umowa określa kwotę mikrodotacji, okres realizacji, wskaźniki rezultatu, obowiązki informacyjne, zasady rozliczenia oraz tryb zwrotu środków.",
      "Mikrodotację Operator wypłaca jednorazowo, w całości, w terminie 3 dni roboczych od dnia zawarcia umowy, przelewem na rachunek bankowy wskazany w umowie.",
      "Grupa nieformalna działająca samodzielnie wskazuje w umowie rachunek bankowy jednego ze swoich członków, na który Operator przekazuje mikrodotację. Umowę w imieniu grupy podpisują osoby wskazane we wniosku jako uprawnione do jej reprezentacji. Osoby tworzące grupę odpowiadają za wydatkowanie i rozliczenie mikrodotacji solidarnie.",
      "Niepodpisanie umowy w terminie 5 dni roboczych od dnia jej udostępnienia w systemie konkursowym jest równoznaczne z rezygnacją z mikrodotacji.",
    ],
  },
  {
    nr: 19,
    tytul: "Realizacja mikroprojektu",
    u: [
      "Grantobiorca realizuje mikroprojekt zgodnie z wnioskiem, budżetem i harmonogramem stanowiącymi załączniki do umowy.",
      "Grantobiorca prowadzi listy obecności odbiorców bezpośrednich, odrębnie dla każdego działania.",
      "W mikroprojektach realizowanych przez MiŚLOP Grantobiorca przeprowadza wśród uczestników działań odpornościowych ankietę na wejściu i na wyjściu, obejmującą co najmniej dwie osoby.",
      "Przesunięcia w budżecie do 20 procent wartości pozycji nie wymagają zgody Operatora. Przesunięcia większe oraz zmiana zakresu działań wymagają zgody wyrażonej w systemie konkursowym przed dokonaniem wydatku.",
      "Grantobiorca niezwłocznie informuje Operatora o okolicznościach zagrażających realizacji mikroprojektu albo osiągnięciu wskaźników.",
      "Wydarzenia organizowane w ramach mikroprojektu mają charakter apartyjny. Zabronione jest promowanie partii politycznych oraz prowadzenie agitacji wyborczej. Zakaz nie wyklucza działań zachęcających do udziału w wyborach.",
      "Grantobiorca w miarę możliwości zapewnia dostępność działań osobom ze szczególnymi potrzebami, w szczególności wybiera miejsca bez barier architektonicznych i przygotowuje materiały czytelne dla osób słabowidzących.",
      "Grantobiorca przechowuje dokumentację mikroprojektu, w tym dokumentację finansowo-księgową, przez okres 5 lat, licząc od początku roku następującego po roku, w którym realizował mikroprojekt.",
      "Rzeczy zakupione ze środków mikrodotacji Grantobiorca zobowiązuje się nie zbywać przez okres 5 lat od dnia zakupu. Zgodę na wcześniejsze zbycie może wyrazić Operator, pod warunkiem przeznaczenia uzyskanych środków na cele statutowe Grantobiorcy.",
    ],
  },
  {
    nr: 20,
    tytul: "Obowiązki informacyjne i promocyjne",
    u: [
      "Grantobiorca oznacza wszystkie materiały informacyjne, promocyjne i szkoleniowe związane z mikroprojektem, a także dokumenty podawane do wiadomości publicznej, w tym zaproszenia, programy spotkań, listy obecności, dyplomy i zaświadczenia.",
      {
        t: "Oznaczenie obejmuje zestawienie znaków w kolejności: znak Komitetu do spraw Pożytku Publicznego, znak Narodowego Instytutu Wolności, znak Programu Moc Małych Społeczności, oraz napis informacyjny o treści:",
        cytat: KLAUZULA,
      },
      "Zestawienie znaków umieszcza się w górnej albo dolnej części materiału. Minimalna wysokość zestawienia wynosi 15 mm w druku oraz 70 pikseli na ekranie. Wszystkie znaki w zestawieniu mają tę samą wielkość.",
      "Grantobiorca prowadzący stronę internetową lub profil w serwisie społecznościowym umieszcza tam informację o finansowaniu mikroprojektu ze środków budżetu państwa, nazwę Programu, nazwę zadania, wartość dofinansowania oraz krótki opis mikroprojektu. Informacja pozostaje opublikowana przez 90 dni od dnia zakończenia mikroprojektu.",
      "Na początku każdego wydarzenia organizowanego w ramach mikroprojektu Grantobiorca przedstawia informację o finansowaniu zadania publicznego ze środków Narodowego Instytutu Wolności w ramach Programu Moc Małych Społeczności.",
      "Operator udostępnia w systemie konkursowym gotowy pakiet oznaczeń wraz z plikami znaków i instrukcją ich stosowania.",
      "Wykonanie obowiązków informacyjnych podlega sprawdzeniu podczas monitoringu oraz przy rozliczeniu mikrodotacji.",
    ],
  },
  {
    nr: 21,
    tytul: "Standardy ochrony małoletnich",
    u: [
      "Grantobiorca prowadzący działania z udziałem małoletnich wdraża standardy ochrony małoletnich zgodnie z ustawą z dnia 13 maja 2016 r. o przeciwdziałaniu zagrożeniom przestępczością na tle seksualnym i ochronie małoletnich.",
      "Grantobiorca weryfikuje osoby pracujące z małoletnimi w Rejestrze Sprawców Przestępstw na Tle Seksualnym oraz przechowuje dokumentację tej weryfikacji.",
      "Operator udostępnia wzór standardów w dokumentacji konkursowej. Oświadczenie o wdrożeniu standardów podlega sprawdzeniu na etapie oceny formalnej oraz przy rozliczeniu.",
    ],
  },
  {
    nr: 22,
    tytul: "Ochrona danych osobowych",
    u: [
      "Administratorem danych osobowych wnioskodawców i Grantobiorców jest Fundacja Klaster Innowacji Społecznych.",
      "Dane są przetwarzane w zakresie niezbędnym do przeprowadzenia Konkursu, zawarcia i rozliczenia umów oraz ewaluacji zadania, na terytorium Rzeczypospolitej Polskiej.",
      "Grantobiorca jest administratorem danych osobowych uczestników swojego mikroprojektu i odpowiada za zgodne z prawem ich przetwarzanie, w tym za pozyskanie zgód na wykorzystanie wizerunku.",
      "Szczegółowe informacje zawiera klauzula informacyjna dostępna w systemie konkursowym.",
    ],
  },
  {
    nr: 23,
    tytul: "Monitoring",
    u: [
      "Monitoringiem obejmuje się co najmniej 20 procent mikroprojektów, to jest około 24 wizyty w terenie.",
      "Próbę dobiera się tak, aby była reprezentatywna dla typów podmiotów oraz dla subregionów. Próba obejmuje obowiązkowo mikroprojekty realizowane przez podmioty ubiegające się o mikrodotację po raz pierwszy, mikroprojekty o najwyższej wartości oraz te, w których wystąpiły sygnały opóźnień.",
      {
        t: "Wizyta monitoringowa jest prowadzona na jednolitej karcie monitoringu i obejmuje sprawdzenie:",
        p: [
          "zgodności realizowanych działań z umową i harmonogramem;",
          "faktycznego występowania komponentu odporności;",
          "prawidłowości wydatkowania i dokumentowania kosztów;",
          "prowadzenia list obecności i dokumentacji rezultatów;",
          "wykonania obowiązków informacyjnych;",
          "stosowania standardów ochrony małoletnich, jeżeli w działaniach uczestniczą małoletni.",
        ],
      },
      "Ustalenia z wizyty zapisuje się w karcie monitoringu. W razie potrzeby Operator formułuje zalecenia z terminem wdrożenia, a ich wykonanie weryfikuje przy rozliczeniu.",
      "Część monitoringu na obszarze objętym własnymi działaniami prowadzi Instytut Roździeńskiego, według tej samej karty i w tym samym systemie sprawozdawczym.",
      "Grantobiorca poddaje się kontroli prowadzonej przez Operatora, przez Narodowy Instytut Wolności oraz przez Kancelarię Prezesa Rady Ministrów, umożliwia wizytę w miejscu realizacji mikroprojektu i udostępnia dokumentację na żądanie kontrolującego w wyznaczonym terminie. Uniemożliwienie kontroli jest równoznaczne z wykorzystaniem mikrodotacji niezgodnie z przeznaczeniem.",
      "Grantobiorca opisuje dowody księgowe mikroprojektu w sposób trwały, umieszczając na nich adnotację: „Sfinansowano ze środków Narodowego Instytutu Wolności – Centrum Rozwoju Społeczeństwa Obywatelskiego w ramach Programu MOC MAŁYCH SPOŁECZNOŚCI w wysokości ......... w ramach realizacji zadania określonego umową nr .........”.",
    ],
  },
  {
    nr: 24,
    tytul: "Sprawozdanie i rozliczenie",
    u: [
      "Grantobiorca składa sprawozdanie końcowe w systemie konkursowym, w terminie wskazanym w umowie, wraz z opisanymi dokumentami finansowymi, listami obecności oraz dokumentacją potwierdzającą osiągnięcie rezultatów.",
      "System kontroluje kompletność załączników automatycznie. W razie braków Operator wzywa do jednokrotnego uzupełnienia w wyznaczonym terminie.",
      "Rozliczenie ocenia się dwutorowo: merytorycznie, pod kątem osiągnięcia rezultatów, oraz finansowo, pod kątem kwalifikowalności i prawidłowości wydatków.",
      {
        t: "Stosuje się jednolity próg wskaźnikowy:",
        p: [
          "rozliczenie prawidłowe, jeżeli Grantobiorca wykonał wszystkie zaplanowane działania i osiągnął co najmniej 80 procent wskaźników rezultatu;",
          "rozliczenie proporcjonalne, jeżeli poziom osiągnięcia wskaźników wynosi od 50 do 80 procent; Grantobiorca rozlicza wówczas część mikrodotacji odpowiadającą stopniowi realizacji, a pozostałą część zwraca;",
          "zwrot całości mikrodotacji, jeżeli poziom osiągnięcia wskaźników jest niższy niż 50 procent.",
        ],
      },
      "Osiągnięcie wskaźników potwierdzają: listy obecności, ankiety na wejściu i na wyjściu oraz dokumentacja działań, a w mikroprojektach objętych monitoringiem także karta obserwacji.",
      "Zatwierdzenie sprawozdania Operator potwierdza w systemie konkursowym.",
    ],
  },
  {
    nr: 25,
    tytul: "Zwrot środków i nieprawidłowości",
    u: [
      "W przypadku stwierdzenia wydatków niekwalifikowalnych, wykorzystania środków niezgodnie z umową albo niezrealizowania działań, Operator wzywa Grantobiorcę do zwrotu odpowiedniej części mikrodotacji wraz z odsetkami liczonymi jak od zaległości podatkowych.",
      "Termin zwrotu wynosi 14 dni od dnia doręczenia wezwania.",
      "Środki niewykorzystane Grantobiorca zwraca w terminie wskazanym w umowie, bez odrębnego wezwania.",
      "Stwierdzone nieprawidłowości Operator dokumentuje i uwzględnia przy ocenie potencjału realizatora w kolejnych naborach.",
    ],
  },
  {
    nr: 26,
    tytul: "Postanowienia końcowe",
    u: [
      "Operator prowadzi rejestr umów, list rankingowych i rezerwowych oraz statusów rozliczeń, w podziale na cztery subregiony.",
      "Zestawienie dofinansowanych inicjatyw, obejmujące nazwę podmiotu, subregion, kwotę, tytuł mikroprojektu oraz wskazany obszar odporności, Operator publikuje po rozstrzygnięciu naboru.",
      "Operator zastrzega prawo zmiany regulaminu w zakresie wynikającym z umowy o realizację zadania publicznego albo ze zmiany przepisów. Zmiany publikuje się na stronie Konkursu. Zmiana nie działa na niekorzyść wniosków już złożonych.",
      "Operator zastrzega prawo unieważnienia Konkursu, jeżeli nie dojdzie do zawarcia umowy o realizację zadania publicznego albo jeżeli umowa ta zostanie rozwiązana.",
      "W sprawach nieuregulowanych stosuje się przepisy ustawy z dnia 24 kwietnia 2003 r. o działalności pożytku publicznego i o wolontariacie, postanowienia Programu Moc Małych Społeczności oraz przepisy Kodeksu cywilnego.",
      "Regulamin wchodzi w życie z dniem publikacji na stronie Konkursu, 6 września 2026, i obowiązuje od pierwszego dnia naboru.",
    ],
  },
];

const ZALACZNIKI = [
  "Wzór wniosku o mikrodotację",
  "Karta oceny formalnej",
  "Karta oceny merytorycznej",
  "Wzór umowy o powierzenie mikrodotacji",
  "Wzór sprawozdania końcowego",
  "Wzór standardów ochrony małoletnich",
  "Klauzule informacyjne RODO i wzory zgód",
  "Pakiet oznaczeń wraz z plikami znaków i instrukcją stosowania",
  "Wzór ankiety na wejściu i na wyjściu dla mikroprojektów MiŚLOP",
];

module.exports = { META, PARAGRAFY, ZALACZNIKI, KLAUZULA };
