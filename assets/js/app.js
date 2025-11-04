(function () {
  "use strict";

  const STORE_KEY = "a320_pro_ru_v11_unified_aio";
  const THEME_KEY = `${STORE_KEY}_theme`;
  const IMAGE_PREFIX = "img_";
  const DATA = [
    {
      id: "briefing",
      title: "0) Экипажный брифинг (PF ↔ PM)",
      badge: "PF/PM/ATC/CAB",
      items: [
        {
          where: "PF",
          what: "ATIS/TAF, активная ВПП, ожидаемый SID, ограничения по высотам/шуму",
          why: "Согласованная картина вылета",
          en: "ATIS, active RWY, expected SID, altitude & noise limits",
          crit: true,
        },
        {
          where: "PM",
          what: "Статус борта: MEL/CDL, записи в Tech Log, остаток топлива, масса ZFW/ZFM",
          why: "Понимание ограничений самолёта",
          en: "Aircraft status: MEL/CDL, logbook, fuel on board, ZFW/ZFM",
          crit: true,
        },
        {
          where: "Оба",
          what: "План руления, горячие точки, последовательность pushback/taxi, удержания",
          why: "Снижение угроз на земле",
          en: "Taxi route, hotspots, push/taxi sequence, hold points",
          crit: false,
        },
        {
          where: "PF",
          what: "План автоматизации: ручной/управляемый режимы, использование AP/FD/A/THR",
          why: "Избежать сюрпризов от автоматик",
          en: "Automation plan: manual vs managed, AP/FD/A-THR usage",
          crit: false,
        },
        {
          where: "PM",
          what: "Распределение обязанностей, callouts, подтверждения FMA",
          why: "Чёткие роли и ожидания",
          en: "Duties, callouts, FMA confirmations",
          crit: true,
        },
        {
          where: "Оба",
          what: "Уход на второй круг: высота, курс, режим тяги, стратегия LNAV/VNAV",
          why: "Готовность к нестабильному заходу",
          en: "Go-around: attitude, thrust, track, LNAV/VNAV strategy",
          crit: true,
        },
        {
          where: "Оба",
          what: "RTO/Engine fail at V1: решение до/после V1, действия PF/PM, связь с ATC",
          why: "Единая реакция на критичные отказы",
          en: "RTO/Engine fail at V1: decision points, PF/PM actions, ATC call",
          crit: true,
        },
        {
          where: "Cabin",
          what: "Статус салона, особые пассажиры, опасные грузы, время «Cabin ready»",
          why: "Координация с бортпроводниками",
          en: "Cabin status, special pax, dangerous goods, cabin ready timing",
          crit: false,
        },
      ],
    },
    {
      id: "cockpitprep",
      title: "1) Safety & Cockpit Prep (Cold & Dark)",
      badge: "FLT DECK SAFETY",
      items: [
        {
          where: "Cockpit",
          what: "Документы, Tech Log, ручной тормоз SET, колодки/конусы на месте",
          why: "Юридическая и физическая готовность",
          en: "Docs & logbook checked, park brake set, chocks in place",
          crit: true,
        },
        {
          where: "Pedestal",
          what: "Тяги IDLE, реверс заперт, SPEED BRAKE RET, FLAPS UP, PARK BRK SET",
          why: "Безопасное начальное состояние",
          en: "Thrust idle, reverse locked, spoilers RET, flaps UP, park brake set",
          crit: true,
        },
        {
          where: "OVHD → ELEC",
          what: "BAT 1/2 OFF, напряжение >25.5V (BAT TEST при необходимости)",
          why: "Хорошее состояние батарей",
          en: "Battery voltage >25.5V before power-up",
          crit: true,
        },
        {
          where: "OVHD → ADIRS",
          what: "IR 1/2/3 OFF, флаги OFF подтверждены",
          why: "Правильное состояние перед выравниванием",
          en: "IRS selectors OFF, OFF flags noted",
          crit: false,
        },
        {
          where: "OVHD → FIRE",
          what: "ENG FIRE pb, APU FIRE pb, RCL pb — защитные колпачки целы",
          why: "Предотвращение ложного пуска",
          en: "Fire handles & RCL guarded",
          crit: true,
        },
        {
          where: "Side Consoles",
          what: "Оборудование (кислород, фонари, жилеты, топор) — на месте и пломбировано",
          why: "Готовность аварийных средств",
          en: "Oxygen, torches, vests, axe present and sealed",
          crit: false,
        },
        {
          where: "Seats/Pedals",
          what: "Регулировка кресел, педалей, ремни закреплены",
          why: "Эргономика и безопасность",
          en: "Adjust seats/pedals, belts fastened",
          crit: false,
        },
        {
          where: "Audio",
          what: "INT/RAD громкость установлена, гарнитуры проверены",
          why: "Готовность связи",
          en: "INT/RAD volumes set, headset check",
          crit: false,
        },
      ],
    },
    {
      id: "powerup",
      title: "2) Электропитание и тесты (Power Up)",
      badge: "ELEC/APU/TEST",
      items: [
        {
          where: "OVHD → BAT 1/2",
          what: "BAT 1/2 ON, проверить ECAM ELEC page на нормальный ток",
          why: "Стабильное питание на батареях",
          en: "BAT 1/2 ON, monitor ECAM ELEC load",
          crit: true,
        },
        {
          where: "EXT PWR",
          what: "Если AVAIL → ON, подтверждение исчезновения индикатора AVAIL",
          why: "Подключение внешнего питания",
          en: "EXT PWR AVAIL then ON",
          crit: false,
        },
        {
          where: "APU",
          what: "MASTER SW ON → START; ждать APU AVAIL, включить APU BLEED",
          why: "Собственный источник электро- и воздухоснабжения",
          en: "APU start, wait AVAIL, APU BLEED ON",
          crit: true,
        },
        {
          where: "FIRE TEST",
          what: "ENG 1/2 + APU FIRE TEST, звуковые/световые сигналы подтверждены",
          why: "Исправность пожарной системы",
          en: "ENG/APU fire tests complete",
          crit: true,
        },
        {
          where: "OXY",
          what: "Кислородные маски — тест давления/интерком у PF и PM",
          why: "Готовность к дыму/разгерметизации",
          en: "Crew oxygen mask & intercom test",
          crit: true,
        },
        {
          where: "OVHD → LIGHTS",
          what: "ANN LT TEST, все лампы загораются, диммеры по необходимости",
          why: "Контроль индикации",
          en: "Annunciator light test",
          crit: false,
        },
        {
          where: "Air Cond",
          what: "PACK 1/2 ON, TEMP заданы, PROBE/WINDOW HEAT AUTO",
          why: "Кондиционирование и защита датчиков",
          en: "Packs ON, temps set, probe/window heat AUTO",
          crit: false,
        },
        {
          where: "Wipers",
          what: "WIPERS OFF, RAIN RPLNT OFF",
          why: "Защита стеклоочистителей",
          en: "Wipers OFF, rain repellent OFF",
          crit: false,
        },
      ],
    },
    {
      id: "fms",
      title: "3) Программирование MCDU/FMS",
      badge: "INIT/F-PLN/PERF",
      items: [
        {
          where: "ADIRS 1/2/3",
          what: "NAV, INSERT IRS POS из GPS/Gate, контроль таймеров ALIGN",
          why: "Корректная инициализация инерциальных систем",
          en: "IRS selectors NAV, set align position",
          crit: true,
        },
        {
          where: "MCDU → INIT A",
          what: "FROM/TO, ALTN, CI, CRZ FL, TEMP ISA, проверка базы данных",
          why: "Базовые параметры рейса",
          en: "Set FROM/TO, ALTN, CI, CRZ FL, temp",
          crit: true,
        },
        {
          where: "MCDU → F-PLN",
          what: "SID, маршрут, STAR, ограничения высоты/скорости занесены",
          why: "Точный план полёта",
          en: "Insert SID, route, STAR with constraints",
          crit: true,
        },
        {
          where: "MCDU → RAD NAV",
          what: "Проверить автонастройки; при необходимости ввести VOR/ILS вручную",
          why: "Подготовка навигации",
          en: "Check auto-tuning, manual VOR/ILS if required",
          crit: false,
        },
        {
          where: "MCDU → PERF TO",
          what: "V1/VR/V2, THR FLEX/TOGA, FLAPS/THS, ENGINE OUT PROC",
          why: "Расчёт взлётных параметров",
          en: "Enter V-speeds, thrust, flaps, THS, eng-out",
          crit: true,
        },
        {
          where: "SEC F-PLN",
          what: "Подготовить запасной маршрут (обратная ВПП/альтернативный аэродром)",
          why: "Готовность к возврату",
          en: "Prepare SEC F-PLN for return/alternate",
          crit: false,
        },
        {
          where: "MCDU → PROG",
          what: "Проверить навигационную точность, установить STEP ALT при необходимости",
          why: "Контроль точности навигации",
          en: "Check navigation accuracy, set STEP ALT",
          crit: false,
        },
        {
          where: "ATSU/ACARS",
          what: "Запросить D-ATIS/PDC, загрузить план, проверить OFP",
          why: "Снижение нагрузки на голос",
          en: "Request D-ATIS/PDC, review OFP",
          crit: false,
        },
      ],
    },
    {
      id: "beforestart",
      title: "4) Перед запуском (Before Start до линии)",
      badge: "FUEL/DOORS/SEATS",
      items: [
        {
          where: "Fuel Panel",
          what: "FUEL PUMPS ON (все баки с топливом)",
          why: "Подача топлива к двигателям",
          en: "Fuel pumps ON per fuel distribution",
          crit: true,
        },
        {
          where: "SIGNS",
          what: "SEAT BELTS ON, NO SMOKING ON, EMER LIGHTS ARM",
          why: "Безопасность пассажиров",
          en: "Seat belts ON, no smoking ON, emer lights ARM",
          crit: false,
        },
        {
          where: "Doors/Slides",
          what: "Все двери CLOSED, CAB PRESS зелёный, SLIDES ARMED",
          why: "Готовность к рулению",
          en: "Doors closed, cabin press green, slides armed",
          crit: true,
        },
        {
          where: "Windows",
          what: "Окна пилотов закрыты и заблокированы, столики убраны",
          why: "Безопасность при запуске",
          en: "Pilot windows locked, tables stowed",
          crit: true,
        },
        {
          where: "Transponder",
          what: "Код установлен, XPDR STBY, TCAS TEST если требуется",
          why: "Готовность к рулению",
          en: "XPDR code set, STBY, TCAS test as required",
          crit: false,
        },
        {
          where: "BEACON",
          what: "ANTI-COLLISION ON перед запуском",
          why: "Предупреждение персоналу",
          en: "Beacon ON prior to start",
          crit: true,
        },
        {
          where: "Brakes",
          what: "PARK BRK SET, давление аккумулятора проверено",
          why: "Удержание самолёта",
          en: "Park brake set, accumulator pressure checked",
          crit: true,
        },
        {
          where: "Pushback",
          what: "Клиренс push/taxi получен, связь с перроном подтверждена",
          why: "Организация запуска",
          en: "Pushback clearance obtained, ground intercom",
          crit: false,
        },
      ],
    },
    {
      id: "enginestart",
      title: "5) Запуск двигателей",
      badge: "BLEED/IGN/SEQUENCE",
      items: [
        {
          where: "Bleed",
          what: "APU BLEED ON, PACKS OFF (или одна OFF по SOP)",
          why: "Обеспечение старта",
          en: "APU bleed ON, packs OFF per SOP",
          crit: true,
        },
        {
          where: "ENG MODE",
          what: "ENG MODE SEL → IGN/START",
          why: "Подготовка к запуску",
          en: "Engine mode to IGN/START",
          crit: true,
        },
        {
          where: "ENG 2",
          what: "MASTER ON при N2 > 20%, контролировать FF/EGT/вибрации",
          why: "Нормальный запуск",
          en: "Start ENG 2, monitor N2, FF, EGT",
          crit: true,
        },
        {
          where: "ENG 1",
          what: "MASTER ON после стабилизации ENG 2",
          why: "Последовательность 2→1",
          en: "Start ENG 1 after ENG 2 stabilized",
          crit: true,
        },
        {
          where: "After Start",
          what: "PACKS ON, APU BLEED OFF, APU OFF при ненадобности",
          why: "Переход на нормальную схему",
          en: "Packs ON, APU bleed OFF, APU OFF if not required",
          crit: true,
        },
        {
          where: "Anti-Ice",
          what: "ENGINE/ WING AS REQ, PROBE/WINDOW HEAT AUTO",
          why: "Предотвращение обледенения",
          en: "Engine/wing anti-ice as required",
          crit: false,
        },
      ],
    },
    {
      id: "afterstart",
      title: "6) После запуска (Below the line)",
      badge: "F/CTL/TRIM/ECAM",
      items: [
        {
          where: "Flight Controls",
          what: "Проверить полный ход элеронов, руля высоты, руля направления",
          why: "Свободное отклонение",
          en: "Full flight control check",
          crit: false,
        },
        {
          where: "ECAM → F/CTL",
          what: "Наблюдать индикацию во время проверки",
          why: "Подтверждение по системам",
          en: "Monitor ECAM F/CTL page",
          crit: false,
        },
        {
          where: "Pitch Trim",
          what: "Установить THS по PERF (например UP 0.8)",
          why: "Центровка на взлёт",
          en: "Set THS per PERF data",
          crit: true,
        },
        {
          where: "Rudder Trim",
          what: "TRIM 0, RUD TRIM reset",
          why: "Нейтраль на взлёте",
          en: "Rudder trim zero",
          crit: false,
        },
        {
          where: "Flaps/Spoilers",
          what: "FLAPS по расчёту, SPOILERS ARM",
          why: "Конфигурация взлёта",
          en: "Set flaps, arm spoilers",
          crit: true,
        },
        {
          where: "ECAM STATUS",
          what: "RECALL, подтвердить T.O. CONFIG NO BLUE",
          why: "Нет outstanding сообщений",
          en: "ECAM recall, T.O. CONFIG",
          crit: true,
        },
        {
          where: "Weather/Terrain",
          what: "PREDICTIVE WINDSHEAR AUTO, TERR ON ND (PM)",
          why: "Предупреждение опасных явлений",
          en: "Predictive WS AUTO, TERR ON ND",
          crit: false,
        },
      ],
    },
    {
      id: "taxi",
      title: "7) Руление",
      badge: "BRAKES/FLIGHT INST",
      items: [
        {
          where: "Brakes",
          what: "Проверка тормозов (левый/правый) при начале движения",
          why: "Работоспособность системы",
          en: "Brake check left/right",
          crit: true,
        },
        {
          where: "Nose Wheel",
          what: "Проверить отклик руления носовой стойки",
          why: "Контроль управляемости",
          en: "Check nose wheel steering",
          crit: false,
        },
        {
          where: "Flight Instruments",
          what: "PFD/ND сверены: курс, QNH, FD bars, навигация",
          why: "Согласование приборов",
          en: "Cross-check PFD/ND heading/QNH",
          crit: false,
        },
        {
          where: "AUTO BRK",
          what: "MAX/RTO установлен, зеленый индикатор",
          why: "Готовность к прерванному взлёту",
          en: "Autobrake MAX/RTO set",
          crit: true,
        },
        {
          where: "Cabin",
          what: "Сообщить «Cabin crew, prepare for takeoff»",
          why: "Координация с салоном",
          en: "Advise cabin for takeoff",
          crit: false,
        },
        {
          where: "Lights",
          what: "TAXI ON, RWY TURN OFF при необходимости, носовая фара T/O в прямой",
          why: "Видимость и сигнализация",
          en: "Taxi lights ON, runway turn-off as required",
          crit: false,
        },
        {
          where: "Takeoff Data",
          what: "Сверить V-speeds, FLEX, RWY, SID с табличкой/планшетом",
          why: "Подтверждение расчётов",
          en: "Cross-check takeoff data",
          crit: true,
        },
      ],
    },
    {
      id: "beforeto",
      title: "8) Перед взлётом (у линии ожидания)",
      badge: "CONFIG/LIGHTS/TCAS",
      items: [
        {
          where: "Brake Temp",
          what: "ECAM WHEEL — температуры в норме",
          why: "Избежать перегрева",
          en: "Check brake temps normal",
          crit: false,
        },
        {
          where: "Exterior Lights",
          what: "RWY TURN OFF, LANDING ON, STROBE AUTO/ON",
          why: "Сигнализация на взлёте",
          en: "Set landing & strobe lights",
          crit: true,
        },
        {
          where: "TCAS",
          what: "TA/RA, XPDR AUTO, ALT RPTG ON",
          why: "Антистолкновение",
          en: "TCAS TA/RA, transponder AUTO",
          crit: true,
        },
        {
          where: "Engine Mode",
          what: "Selector NORM или IGN/START (осадки/обледенение)",
          why: "Защита двигателей",
          en: "Engine mode selector as required",
          crit: false,
        },
        {
          where: "PACKS",
          what: "ON для стандартного взлёта (PACK OFF по SOP)",
          why: "Соблюдение процедуры",
          en: "Packs ON unless pack-off takeoff",
          crit: false,
        },
        {
          where: "Chrono",
          what: "PF запускает хронометр при выруливании на ВПП",
          why: "Контроль времени",
          en: "Start chrono on line-up",
          crit: false,
        },
        {
          where: "Before TO Checklist",
          what: "Challenge/response «До линии / Ниже линии»",
          why: "Подтверждение готовности",
          en: "Complete Before Takeoff checklist",
          crit: true,
        },
      ],
    },
    {
      id: "takeoff",
      title: "9) Взлёт и начальный набор",
      badge: "CALLS/FMA/GEAR",
      items: [
        {
          where: "PF",
          what: "«Set thrust» → FLEX/TOGA, контролировать симметрию",
          why: "Правильный режим тяги",
          en: "Set thrust FLEX/TOGA, monitor symmetry",
          crit: true,
        },
        {
          where: "PM",
          what: "FMA: «MAN FLEX/TOGA – SRS – RWY – A/THR BLUE»",
          why: "Контроль автоматик",
          en: "Call FMA modes",
          crit: true,
        },
        {
          where: "80 kt",
          what: "PM: «Eighty knots»; PF: «Checked»",
          why: "Симметрия приборов",
          en: "80 kt callout",
          crit: true,
        },
        {
          where: "V1",
          what: "PM объявляет «V1», руки PF остаются",
          why: "Точка принятия решения",
          en: "Call V1",
          crit: true,
        },
        {
          where: "VR",
          what: "PM: «Rotate»; PF ~3°/сек до 15°",
          why: "Оптимальный отрыв",
          en: "Rotate 3°/s to target attitude",
          crit: true,
        },
        {
          where: "Positive climb",
          what: "PM: «Positive climb» → PF: «Gear up»",
          why: "Уборка шасси",
          en: "Positive climb – gear up",
          crit: true,
        },
        {
          where: "400 ft AGL",
          what: "PF выбирает NAV/HDG, подтверждение PM",
          why: "Следование SID",
          en: "Select NAV/HDG",
          crit: false,
        },
        {
          where: "ACC ALT",
          what: "THR CLB, ускорение, уборка конфигурации по S/F",
          why: "Переход в набор",
          en: "Set CLB thrust, retract flaps on schedule",
          crit: false,
        },
        {
          where: "After TO Checklist",
          what: "PM выполняет «После взлёта»",
          why: "Подтверждение конфигурации",
          en: "Complete After Takeoff checklist",
          crit: true,
        },
      ],
    },
    {
      id: "climb",
      title: "10) Набор",
      badge: "10K/TRANS/CLB",
      items: [
        {
          where: "Autopilot",
          what: "AP1 ON после стабилизации, контролировать FMA",
          why: "Снижение нагрузки PF",
          en: "Engage AP1 when appropriate, monitor FMA",
          crit: false,
        },
        {
          where: "Engine Mode",
          what: "ENG MODE селектор NORM, если был IGN/START",
          why: "Возврат к нормальной схеме",
          en: "Engine mode back to NORM",
          crit: false,
        },
        {
          where: "10 000 ft",
          what: "LANDING LIGHTS OFF, NOSE LIGHT TAXI, SEAT BELTS AS REQ",
          why: "Переход в крейсерский режим",
          en: "Landing lights OFF, belts as required",
          crit: false,
        },
        {
          where: "Transition Alt",
          what: "STD SET обеим пилотам, кроссчек QNH",
          why: "Единая настройка давления",
          en: "Set STD and cross-check",
          crit: true,
        },
        {
          where: "ECAM",
          what: "Проверить системные страницы, fuel used vs planned",
          why: "Мониторинг систем",
          en: "Review ECAM systems, fuel vs plan",
          crit: false,
        },
        {
          where: "Climb Checklist",
          what: "Выполнить при первой возможности",
          why: "Подтверждение перехода",
          en: "Complete climb checklist",
          crit: false,
        },
      ],
    },
    {
      id: "cruise",
      title: "11) Крейсер",
      badge: "SYSTEMS/FUEL/NAV",
      items: [
        {
          where: "Navigation",
          what: "Сверка пути: PROG page, позиция GPS, радионавигация",
          why: "Контроль точности",
          en: "Check PROG page, GPS accuracy",
          crit: false,
        },
        {
          where: "Fuel",
          what: "Сравнить фактический расход с OFP, рассчитать остаток",
          why: "Управление топливом",
          en: "Compare fuel burn to OFP, compute remaining",
          crit: false,
        },
        {
          where: "Systems",
          what: "ECAM системный обзор (HYD, ELEC, PRESS)",
          why: "Раннее обнаружение неисправностей",
          en: "Review ECAM systems",
          crit: false,
        },
        {
          where: "ATC",
          what: "Позиционные доклады/CPDLC, мониторинг частот",
          why: "Соблюдение процедур",
          en: "Position reports/CPDLC, monitor frequencies",
          crit: false,
        },
        {
          where: "Cabin",
          what: "Статус салона, обслуживание, особые запросы",
          why: "Комфорт пассажиров",
          en: "Check cabin status and requests",
          crit: false,
        },
      ],
    },
    {
      id: "descent",
      title: "12) Подготовка к снижению (TOD−10 мин)",
      badge: "WEATHER/PERF/BRIEF",
      items: [
        {
          where: "ATIS/Weather",
          what: "Получить ATIS/TAF, NOTAM, ветер/видимость",
          why: "Планирование захода",
          en: "Obtain ATIS/TAF, NOTAM, winds/visibility",
          crit: true,
        },
        {
          where: "MCDU",
          what: "Вставить STAR/APPR, ограничения, проверить переходные высоты",
          why: "Верный профиль",
          en: "Insert STAR/APPR with constraints",
          crit: true,
        },
        {
          where: "Performance",
          what: "Вычислить посадочную дистанцию, AUTOBRAKE LO/MED/MAX",
          why: "Соответствие длине ВПП",
          en: "Compute landing distance, set autobrake",
          crit: true,
        },
        {
          where: "Pressurization",
          what: "CAB PRESS — задать DEST/QNH, разница высот",
          why: "Плавная разгерметизация",
          en: "Set landing elevation/QNH",
          crit: false,
        },
        {
          where: "Seat Belts",
          what: "SEAT BELTS ON, Cabin crew advised",
          why: "Подготовка пассажиров",
          en: "Seat belts ON, advise cabin",
          crit: false,
        },
        {
          where: "Briefing",
          what: "PF повторяет заход, угрозы, минимумы, missed approach",
          why: "Общая стратегия",
          en: "Review approach, threats, minima, missed approach",
          crit: true,
        },
      ],
    },
    {
      id: "approach",
      title: "13) Заход (ILS/RNAV/LOC)",
      badge: "APPR/LS/BARO",
      items: [
        {
          where: "LS/Approach",
          what: "LS pb ON (для ILS), APPR ARM при перехвате",
          why: "Захват сигналов",
          en: "Press LS, arm APPR",
          crit: true,
        },
        {
          where: "Baro",
          what: "MINIMUMS заданы PF/PM (BARO/RADIO), QNH подтвержден",
          why: "Решение на высоте",
          en: "Set minima and cross-check QNH",
          crit: true,
        },
        {
          where: "Config",
          what: "FLAPS 1/2/3/FULL по скоростям, GEAR DOWN по команда PF",
          why: "Посадочная конфигурация",
          en: "Extend flaps and gear on schedule",
          crit: true,
        },
        {
          where: "Speed",
          what: "MANAGED/SELECTED VAPP, добавить ветер по SOP",
          why: "Стабильность на глиссаде",
          en: "Set VAPP with wind additives",
          crit: false,
        },
        {
          where: "Autopilot",
          what: "AP/FD по плану (двойной AP для CAT II/III)",
          why: "Соответствие категории захода",
          en: "Set AP/FD usage per minima",
          crit: false,
        },
        {
          where: "Approach Checklist",
          what: "Выполнить challenge/response",
          why: "Подтверждение готовности",
          en: "Complete approach checklist",
          crit: true,
        },
      ],
    },
    {
      id: "final",
      title: "14) Финальный этап",
      badge: "STABILIZED/MINIMA",
      items: [
        {
          where: "1000 ft AGL",
          what: "PF/PM подтверждают «Stabilized» или уход на второй круг",
          why: "Критерии стабильного захода",
          en: "At 1000 ft AGL call stabilized or go around",
          crit: true,
        },
        {
          where: "500 ft AGL",
          what: "Cross-check LOC/GS, скорость ±5 kt, призыв «Landing»",
          why: "Окончательная оценка",
          en: "Verify LOC/GS and speed, call Landing",
          crit: true,
        },
        {
          where: "MINIMUM",
          what: "PM: «Minimum» → PF: «Continue»/«Go-around»",
          why: "Решение по видимости",
          en: "Call Minimum, respond Continue/Go-around",
          crit: true,
        },
        {
          where: "100 ft",
          what: "PM мониторит тренд, готов к callout «RETARD»",
          why: "Подготовка к flare",
          en: "Monitor rate, prepare RETARD call",
          crit: false,
        },
      ],
    },
    {
      id: "landing",
      title: "15) Посадка и пробег",
      badge: "RETARD/REV/SPOILERS",
      items: [
        {
          where: "RETARD",
          what: "PM: «RETARD»; PF переводит тягу в IDLE",
          why: "Правильная техника Airbus",
          en: "RETARD call, thrust levers idle",
          crit: true,
        },
        {
          where: "Touchdown",
          what: "PF удерживает нос до 2–3° pitch, избегая slam",
          why: "Мягкое касание",
          en: "Maintain gentle pitch at touchdown",
          crit: false,
        },
        {
          where: "Spoilers/Reverse",
          what: "PM: «Spoilers»/«Reverse green»; PF — максимум до 70 kt",
          why: "Эффективное торможение",
          en: "Confirm spoilers, reverse as required",
          crit: true,
        },
        {
          where: "Auto Brk",
          what: "Контроль DECEL, при необходимости manual braking",
          why: "Соблюдение дистанции",
          en: "Monitor DECEL, take manual braking if needed",
          crit: false,
        },
        {
          where: "70/60 kt",
          what: "Сбросить реверс до IDLE, плавно управлять носом",
          why: "Защита двигателей",
          en: "Reduce reverse to idle by 70-60 kt",
          crit: false,
        },
      ],
    },
    {
      id: "goaround",
      title: "16) Уход на второй круг",
      badge: "TOGA/CLB/CONFIG",
      items: [
        {
          where: "PF",
          what: "TOGA, шаг 15°, удерживать крен 0",
          why: "Максимальный набор",
          en: "Press TOGA, pitch 15°, wings level",
          crit: true,
        },
        {
          where: "PM",
          what: "«Go-around, TOGA» + подтверждение FMA",
          why: "Координация экипажа",
          en: "Call Go-around, confirm FMA",
          crit: true,
        },
        {
          where: "Gear",
          what: "PF: «Go-around, flaps» → PM: FLAPS step; при положительном наборе — GEAR UP",
          why: "Чистая конфигурация",
          en: "Retract flaps/gear as commanded",
          crit: true,
        },
        {
          where: "Acceleration Alt",
          what: "THR CLB, ускорение, уборка остаточных закрылков",
          why: "Переход в набор",
          en: "Set CLB thrust, clean up",
          crit: false,
        },
        {
          where: "After TO",
          what: "Checklist «После взлёта» повторно",
          why: "Стандартная конфигурация",
          en: "Run After Takeoff checklist",
          crit: true,
        },
      ],
    },
    {
      id: "afterlanding",
      title: "17) После посадки",
      badge: "CLEAN/LIGHTS/APU",
      items: [
        {
          where: "Runway Vacated",
          what: "STROBE OFF, LANDING OFF, TAXI ON, NOSE LIGHT TAXI",
          why: "Сигнализация после посадки",
          en: "Strobe OFF, landing lights OFF, taxi ON",
          crit: false,
        },
        {
          where: "Spoilers/Flaps",
          what: "SPOILERS DISARM, FLAPS UP",
          why: "Возврат в чистую конфигурацию",
          en: "Disarm spoilers, flaps up",
          crit: false,
        },
        {
          where: "APU",
          what: "APU START при необходимости, дождаться AVAIL",
          why: "Питание на стоянке",
          en: "Start APU if required",
          crit: false,
        },
        {
          where: "TCAS",
          what: "XPDR STBY, TA ONLY на рулёжке",
          why: "Избежать ложных RA",
          en: "Set TCAS STBY or TA only",
          crit: false,
        },
        {
          where: "Brake Fan",
          what: "При необходимости включить BRAKE FAN",
          why: "Охлаждение тормозов",
          en: "Use brake fan if temp high",
          crit: false,
        },
        {
          where: "After Landing Checklist",
          what: "Выполнить challenge/response",
          why: "Подтверждение конфигурации",
          en: "Complete After Landing checklist",
          crit: true,
        },
      ],
    },
    {
      id: "parking",
      title: "18) Стоянка (Shutdown)",
      badge: "ENG OFF/GPU",
      items: [
        {
          where: "Parking",
          what: "PARK BRK SET, колодки запросить",
          why: "Фиксация борта",
          en: "Park brake set, request chocks",
          crit: true,
        },
        {
          where: "ENG MODE",
          what: "NORM, затем ENG 1/2 MASTER OFF",
          why: "Корректная остановка",
          en: "Engine mode NORM, masters OFF",
          crit: true,
        },
        {
          where: "APU/EXT",
          what: "EXT PWR AVAIL → ON, затем APU BLEED OFF/ APU OFF",
          why: "Передача питания",
          en: "Connect EXT PWR, shut down APU",
          crit: false,
        },
        {
          where: "Fuel Pumps",
          what: "OFF всех баков, кроме задействованных",
          why: "Избежать перекачки",
          en: "Fuel pumps OFF",
          crit: false,
        },
        {
          where: "SIGNS/LIGHTS",
          what: "SEAT BELTS OFF (по SOP), BEACON OFF после остановки двигателей",
          why: "Оповещение пассажиров",
          en: "Seat belts OFF as required, beacon OFF",
          crit: false,
        },
        {
          where: "Parking Checklist",
          what: "Challenge/response",
          why: "Завершение этапа",
          en: "Complete parking checklist",
          crit: true,
        },
      ],
    },
    {
      id: "secure",
      title: "19) Консервация (Secure)",
      badge: "COLD & DARK",
      items: [
        {
          where: "IRS",
          what: "IR 1/2/3 OFF после 5 мин охлаждения",
          why: "Продление ресурса гироскопов",
          en: "IRS selectors OFF after cooldown",
          crit: false,
        },
        {
          where: "ADIRS",
          what: "ADR панели OFF, навигационные огни OFF",
          why: "Полное обесточивание",
          en: "ADR off, nav lights OFF",
          crit: false,
        },
        {
          where: "OVHD → ELEC",
          what: "EXT PWR OFF (если не требуется), BAT 1/2 OFF",
          why: "Безопасное отключение",
          en: "EXT PWR OFF if clear, BAT 1/2 OFF",
          crit: true,
        },
        {
          where: "CB/Equipment",
          what: "Проверить закрытие шторок, убрать ключи/карты, логбук заполнен",
          why: "Сохранность самолёта",
          en: "Secure cockpit, complete logbook",
          crit: false,
        },
        {
          where: "Cabin",
          what: "Передать смену, особые замечания экипажу/техникам",
          why: "Непрерывность информации",
          en: "Handover notes to crew/maintenance",
          crit: false,
        },
      ],
    },
    {
      id: "memory",
      title: "20) Памятка (Memory Items, кратко)",
      badge: "TCAS/WS/GPWS/UNREL SPD/ENG FIRE/LOSS BRAKE",
      items: [
        {
          where: "TCAS RA",
          what: "Следовать RA, PM: «Monitor V/S, RA»",
          why: "Избежать столкновения",
          en: "Follow RA, PM monitors V/S",
          crit: true,
        },
        {
          where: "Windshear",
          what: "TOGA, 17° тангаж, крен 0, не менять конфигурацию",
          why: "Выход из сдвига",
          en: "TOGA, pitch 17°, wings level",
          crit: true,
        },
        {
          where: "GPWS «PULL UP»",
          what: "TOGA, тангаж 20–25°, крен 0, не уходить в конфигурационные изменения",
          why: "Избежать CFIT",
          en: "TOGA, pitch 20-25°, wings level",
          crit: true,
        },
        {
          where: "Unreliable Speed",
          what: "Pitch/Thrust таблицы: TOGA 15°/85% N1, AP/FD/A-THR OFF",
          why: "Сохранение контроля",
          en: "Use pitch/thrust tables, AP/FD/A-THR OFF",
          crit: true,
        },
        {
          where: "ENG FIRE",
          what: "На безопасной высоте: THR IDLE, ENG MASTER OFF, AGENT DISCH 1/2",
          why: "Локализация пожара",
          en: "Thrust idle, master OFF, agent discharge",
          crit: true,
        },
        {
          where: "LOSS OF BRAKING",
          what: "MAX REV, BRAKE PEDAL RELEASE, A/SKID OFF, 1000 PSI MAX",
          why: "Остановка самолёта",
          en: "Max reverse, pedals release, A/SKID OFF, apply brakes",
          crit: true,
        },
        {
          where: "EMER DESCENT",
          what: "OXY MASKS ON, SIGNS ON, IDLE, SPEED BRAKE FULL, descend",
          why: "Быстрое снижение",
          en: "Oxygen on, idle thrust, speed brake full, descend",
          crit: true,
        },
      ],
    },
  ];

  const PHASE_GROUPS = {
    all: {
      label: "Все фазы",
      sections: DATA.map((section) => section.id),
    },
    ground: {
      label: "Земля",
      sections: [
        "briefing",
        "cockpitprep",
        "powerup",
        "fms",
        "beforestart",
        "enginestart",
        "afterstart",
        "taxi",
        "beforeto",
      ],
    },
    departure: {
      label: "Взлёт и набор",
      sections: ["takeoff", "climb"],
    },
    cruise: {
      label: "Крейсер",
      sections: ["cruise"],
    },
    arrival: {
      label: "Заход/посадка",
      sections: [
        "descent",
        "approach",
        "final",
        "landing",
        "goaround",
        "afterlanding",
        "parking",
        "secure",
      ],
    },
    abnormal: {
      label: "Нестандартные",
      sections: ["memory"],
    },
  };

  const PHASE_KEYS = Object.keys(PHASE_GROUPS);

  const PANEL_INFO = {
    all: {
      title: "Все панели",
      short: "ALL",
      hint: "Показывать все шаги",
      description: "Снимает фильтр по расположению и показывает полный чек-лист.",
    },
    overhead: {
      title: "Overhead (OVHD)",
      short: "OVHD",
      hint: "Верхняя панель: электрика, топливо, кондиционирование, антиоблед.",
      description: "Расположена над лобовым стеклом: BAT, ELEC, FUEL, HYD, AIR CON, APU, LIGHTS, ANTI-ICE, SIGNS.",
    },
    glareshield: {
      title: "FCU / Glareshield",
      short: "FCU",
      hint: "Перед пилотами: скорость/курс/баро, кнопки APPR/LOC/LS.",
      description: "Панель автопилота под лобовым стеклом: SPD/HDG/ALT, push/pull, AP/FD/A/THR режимы, BARO и LS.",
    },
    pedestal: {
      title: "Центральный пульт (Pedestal)",
      short: "PDS",
      hint: "Между креслами: тяги, спойлеры, TCAS, радиостанции, автотормоза.",
      description: "Панель между креслами: тяги, ENGINE MASTER, SPEED BRAKE, FLAPS, AUTOBRAKE, TCAS/XPNDR и радиопанели.",
    },
    mcdu: {
      title: "MCDU / FMS",
      short: "MCDU",
      hint: "Блоки FMS слева и справа педестала.",
      description: "Компьютеры управления полётом: INIT, F-PLN, PERF, RAD NAV, SEC F-PLN, DCDU/ACARS.",
    },
    ecam: {
      title: "ECAM / SD",
      short: "ECAM",
      hint: "Центральные дисплеи систем и сообщения.",
      description: "В центральной панели: верхний ECAM с предупреждениями и нижний SD с системными страницами и мемо.",
    },
    cabin: {
      title: "Связь с салоном",
      short: "CAB",
      hint: "Табло, брифинг и взаимодействие с бортпроводниками.",
      description: "Системы взаимодействия с салоном: табло SEAT BELTS/NO SMOKING, interphone, Cabin Ready.",
    },
    exterior: {
      title: "Внешние операции",
      short: "EXT",
      hint: "Огни, наземные операции, обход, pushback.",
      description: "Действия вне кабины: внешние огни, pushback, запросы перрону, контроль тормозов при рулении/посадке.",
    },
    crew: {
      title: "PF/PM распределение",
      short: "CREW",
      hint: "Брифинги и взаимодействие экипажа.",
      description: "Голосовые действия и координация PF/PM: распределение обязанностей, callouts, проверки FMA.",
    },
    callouts: {
      title: "Callouts и чек-листы",
      short: "CALL",
      hint: "Голосовые callouts, FMA подтверждения и challenge-response.",
      description: "Шаги, где главное — озвучивание: V1, VR, «Positive climb», чек-листы и подтверждения режимов.",
    },
    flightdeck: {
      title: "Общие проверки кабины",
      short: "FDK",
      hint: "Документы, кресла, педали, маски, общее состояние.",
      description: "Пункты без привязки к панели: безопасность, документы, кресла, кислород, общие проверки кабины.",
    },
  };

  const PANEL_ORDER = [
    "all",
    "overhead",
    "glareshield",
    "pedestal",
    "mcdu",
    "ecam",
    "cabin",
    "exterior",
    "crew",
    "callouts",
    "flightdeck",
  ];

  const PANEL_RULES = [
    {
      key: "overhead",
      tests: [
        /ovhd/,
        /overhead/,
        /apu/,
        /pack/,
        /bleed/,
        /elec/,
        /adirs/,
        /sign/,
        /seat belt/,
        /emer/,
        /window/,
        /anti-?ice/,
        /pressur/,
        /fuel/,
        /hyd/,
        /wing/,
        /probe/,
        /\bir\b/,
        /\bbat\b/,
        /door/,
        /slide/,
        /light/,
      ],
    },
    {
      key: "mcdu",
      tests: [/mcdu/, /f-?pln/, /init/, /perf/, /sec f-?pln/, /acars/, /atsu/, /datac/, /prog/],
    },
    {
      key: "glareshield",
      tests: [/fcu/, /glareshield/, /baro/, /\bhdg\b/, /\bspd\b/, /vs/, /fpa/, /\balt\b/, /appr/, /loc/, /ls/, /fma/, /chrono/],
    },
    {
      key: "pedestal",
      tests: [
        /pedestal/,
        /thrust/,
        /speed brake/,
        /spoiler/,
        /flap/,
        /trim/,
        /rudder/,
        /brake/,
        /tiller/,
        /tcas/,
        /transponder/,
        /xpdr/,
        /radio/,
        /freq/,
        /park brk/,
        /parking brake/,
        /autobrake/,
        /auto brk/,
        /engine mode/,
        /master/,
        /ign/,
        /reverse/,
        /toga/,
      ],
    },
    {
      key: "ecam",
      tests: [/ecam/, /status/, /memo/, /sd/, /system display/, /f\/?ctl/, /engine page/, /bleed page/],
    },
    {
      key: "cabin",
      tests: [/cabin/, /бортпровод/, /пассаж/, /салон/, /crew call/],
    },
    {
      key: "exterior",
      tests: [/strobe/, /landing light/, /logo light/, /nav light/, /beacon/, /anti-?collision/, /outside/, /runway vacated/, /walkaround/, /pushback/, /external/, /deicing/, /наруж/],
    },
    {
      key: "crew",
      tests: [/\bpf\b/, /\bpm\b/, /оба/, /обязан/, /брифинг/, /briefing/],
    },
    {
      key: "callouts",
      tests: [
        /minimum/,
        /rotate/,
        /positive climb/,
        /gear up/,
        /gear down/,
        /\bv1\b/,
        /one hundred/,
        /hundred/,
        /retard/,
        /go-?around/,
        /acceleration alt/,
        /after to checklist/,
        /after landing checklist/,
        /approach checklist/,
        /landing checklist/,
        /climb checklist/,
        /before to checklist/,
        /touchdown/,
        /80 kt/,
        /70\/60/,
        /s-?speed/,
        /f-?speed/,
        /callout/,
        /ready/,
        /stabilized/,
      ],
    },
    {
      key: "flightdeck",
      tests: [/cockpit/, /documents/, /logbook/, /seat/, /pedal/, /oxygen/, /audio/, /wipers/, /windows/, /brakes/, /parking/, /safety/, /маск/, /ремн/, /фонар/, /тормоз/],
    },
  ];

  const DEFAULT_BRIEF = `DEP RWY:____  SID:____  TRANS ALT:____\nTAXI / HOTSPOTS: ______________________________\nTAKEOFF PERF → V1 ___  VR ___  V2 ___  FLEX/TOGA ___  FLAPS ___  THS ___\nENG OUT: Straight ahead to ____ ; Turn ____ ; ACC ALT ____ ; EO ALT ____\nCRZ FL:____  CI:___  STEP: ___  WIND/TEMP: __________\nARR RWY:____  STAR:____  APPR: ILS/RNAV/LOC ___  MINIMA BARO ___ / RADIO ___\nLANDING PERF: LDG DIST ___m  AUTOBRAKE ___  REV strategy ___\nGO-AROUND: TOGA; Pitch ___°; Track ____; Missed Alt ____\nTHREATS / TEM: WX ____ ; Terrain ____ ; MEL/CDL ____ ; Pax/Cargo ____`;

  const debounce = (fn, wait = 250) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), wait);
    };
  };

  const safeJSONParse = (value) => {
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch (error) {
      console.warn("Не удалось распарсить сохранённые данные", error);
      return null;
    }
  };

  const escapeRegExp = (value = "") => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapeHTML = (value = "") =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const showErrorOverlay = (message, stack) => {
    const overlay = document.getElementById("errorOverlay");
    if (!overlay) return;
    const messageNode = document.getElementById("errorMessage");
    const stackNode = document.getElementById("errorStack");
    overlay.hidden = false;
    if (messageNode) messageNode.textContent = message || "Неизвестная ошибка";
    if (stackNode) stackNode.textContent = stack || "";
  };

  window.addEventListener("error", (event) => {
    const err = event.error || event.message;
    showErrorOverlay(err?.message || String(err), err?.stack);
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason || "Unhandled promise rejection";
    showErrorOverlay(reason?.message || String(reason), reason?.stack);
  });
  class ChecklistApp {
    constructor(data) {
      this.data = data;
      this.state = this.loadState();
      this.app = document.getElementById("app");
      this.nav = document.getElementById("nav");
      this.content = document.getElementById("content");
      this.stats = document.getElementById("stats");
      this.progressBar = document.getElementById("progressBar");
      this.miniBar = document.getElementById("miniBar");
      this.miniPct = document.getElementById("miniPct");
      this.progressContainer = document.querySelector(".progress[role=progressbar]");
      this.topbar = document.querySelector(".topbar");
      this.searchInput = document.getElementById("searchInput");
      this.filterCritical = document.getElementById("filterCritical");
      this.filterFavorites = document.getElementById("filterFavorites");
      this.toggleEnButton = document.querySelector('[data-action="toggleEN"]');
      this.focusButton = document.querySelector('[data-action="focusMode"]');
      this.sidebarToggle = document.querySelector('[data-action="toggleSidebar"]');
      this.phaseFilters = document.getElementById("phaseFilters");
      this.timeline = document.getElementById("timeline");
      this.dashboard = document.getElementById("dashboard");
      this.nextStep = document.getElementById("nextStep");
      this.panelBoard = document.getElementById("panelBoard");
      this.panelGuide = document.getElementById("panelGuide");
      this.panelGuideList = document.getElementById("panelGuideList");
      this.saveStateDebounced = debounce(() => this.saveState());
      this.lastFocusedCheckboxId = null;
      this.observer = null;
      this.currentTheme = this.getStoredTheme();
      this.currentQuery = (this.state._q || "").toLowerCase();
      this.activePhase = PHASE_GROUPS[this.state._phase] ? this.state._phase : "all";
      this.activePanel = PANEL_INFO[this.state._panel] ? this.state._panel : "all";
      this.isFocusMode = !!this.state._focusMode;
      this.focusSectionId = this.state._focusSection || null;
      this.lastStats = null;
    }

    init() {
      this.prepareEnvironment();
      this.bindGlobalEvents();
      this.renderPhaseFilters();
      this.renderPanelBoard();
      this.renderPanelGuide();
      this.updatePanelFilterState();
      this.renderAll();
      this.restoreImages();
      if (this.app) this.app.hidden = false;
      this.updateToggleStates();
      this.updateProgress();
      this.restoreSearchQuery();
      document.body.classList.toggle("is-focus-mode", this.isFocusMode);
    }

    prepareEnvironment() {
      this.applyTheme(this.currentTheme);
      this.ensureManifest();
      this.registerServiceWorker();
    }

    getStoredTheme() {
      const saved = localStorage.getItem(THEME_KEY);
      return saved || document.documentElement.getAttribute("data-theme") || "auto";
    }
    applyTheme(theme) {
      const root = document.documentElement;
      if (theme === "auto") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.setAttribute("data-theme", prefersDark ? "dark" : "light");
      } else {
        root.setAttribute("data-theme", theme);
      }
      localStorage.setItem(THEME_KEY, theme);
      this.currentTheme = theme;
    }

    ensureManifest() {
      try {
        const manifest = {
          name: "A320neo · UNIFIED",
          short_name: "A320neo",
          lang: "ru",
          display: "standalone",
          background_color: "#0b0f1c",
          theme_color: "#0b0f1c",
          icons: [
            {
              src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAK0lEQVR4nO3BMQEAAADCoPVPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAAJ8GAAE1wq5cAAAAAElFTkSuQmCC",
              sizes: "192x192",
              type: "image/png",
            },
          ],
        };
        const blob = new Blob([JSON.stringify(manifest)], { type: "application/manifest+json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("link");
        link.rel = "manifest";
        link.href = url;
        document.head.appendChild(link);
      } catch (error) {
        console.warn("Не удалось создать manifest", error);
      }
    }

    registerServiceWorker() {
      if (!("serviceWorker" in navigator) || !window.isSecureContext) return;
      try {
        const script = "self.addEventListener('install',e=>self.skipWaiting());self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));";
        const url = URL.createObjectURL(new Blob([script], { type: "text/javascript" }));
        navigator.serviceWorker.register(url).catch((error) => console.warn("SW register error", error));
      } catch (error) {
        console.warn("SW init error", error);
      }
    }

    loadState() {
      const raw = localStorage.getItem(STORE_KEY);
      const parsed = safeJSONParse(raw) || {};
      if (!Object.prototype.hasOwnProperty.call(parsed, "_withEN")) parsed._withEN = true;
      return parsed;
    }

    saveState() {
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(this.state));
      } catch (error) {
        alert("Нет места в хранилище (заметки/фото). Очистите память и попробуйте снова.");
        console.error("Ошибка сохранения", error);
      }
    }
    updateToggleStates() {
      if (this.filterCritical) this.filterCritical.checked = !!this.state._crit;
      if (this.filterFavorites) this.filterFavorites.checked = !!this.state._favs;
      if (this.toggleEnButton) this.toggleEnButton.setAttribute("aria-pressed", String(!!this.state._withEN));
      if (this.focusButton) this.focusButton.setAttribute("aria-pressed", String(this.isFocusMode));
      if (this.sidebarToggle) {
        const isHidden = document.body.classList.contains("is-sidebar-hidden");
        this.sidebarToggle.setAttribute("aria-pressed", String(isHidden));
      }
      document.body.classList.toggle("is-focus-mode", this.isFocusMode);
      this.updatePhaseFilterState();
    }

    renderPhaseFilters() {
      if (!this.phaseFilters) return;
      this.phaseFilters.innerHTML = "";
      PHASE_KEYS.forEach((key) => {
        const { label } = PHASE_GROUPS[key];
        const button = document.createElement("button");
        button.type = "button";
        button.className = "chip";
        button.dataset.action = "phaseFilter";
        button.dataset.phase = key;
        button.setAttribute("aria-pressed", String(this.activePhase === key));
        button.textContent = label;
        this.phaseFilters.appendChild(button);
      });
    }

    updatePhaseFilterState() {
      if (!this.phaseFilters) return;
      this.phaseFilters.querySelectorAll("[data-phase]").forEach((button) => {
        const phase = button.getAttribute("data-phase");
        button.setAttribute("aria-pressed", String(phase === this.activePhase));
      });
    }

    renderPanelBoard() {
      if (!this.panelBoard) return;
      this.panelBoard.innerHTML = "";
      PANEL_ORDER.forEach((key) => {
        const info = PANEL_INFO[key];
        if (!info) return;
        const card = document.createElement("button");
        card.type = "button";
        card.className = "panelboard__card";
        card.dataset.action = "panelFilter";
        card.dataset.panel = key;
        card.setAttribute("aria-pressed", String(this.activePanel === key));

        const title = document.createElement("span");
        title.className = "panelboard__title";
        const badge = document.createElement("span");
        badge.className = `panel-badge panel-badge--${key}`;
        badge.textContent = info.short;
        title.append(badge, document.createTextNode(` ${info.title}`));

        const hint = document.createElement("span");
        hint.className = "panelboard__hint";
        hint.textContent = info.hint;

        const meta = document.createElement("span");
        meta.className = "panelboard__meta";
        meta.dataset.panelMeta = key;
        meta.textContent = "0 / 0";

        const progress = document.createElement("div");
        progress.className = "panelboard__progress";
        progress.innerHTML = `<i data-panel-progress="${key}"></i>`;

        card.append(title, hint, meta, progress);
        this.panelBoard.appendChild(card);
      });
    }

    renderPanelGuide() {
      if (!this.panelGuideList) return;
      this.panelGuideList.innerHTML = "";
      PANEL_ORDER.filter((key) => key !== "all").forEach((key) => {
        const info = PANEL_INFO[key];
        if (!info) return;
        const item = document.createElement("article");
        item.className = "panel-guide__item";

        const heading = document.createElement("h3");
        const badge = document.createElement("span");
        badge.className = `panel-badge panel-badge--${key}`;
        badge.textContent = info.short;
        heading.append(badge, document.createTextNode(` ${info.title}`));

        const hint = document.createElement("p");
        hint.textContent = info.hint;

        const description = document.createElement("p");
        description.textContent = info.description;

        item.append(heading, hint, description);
        this.panelGuideList.appendChild(item);
      });
    }

    updatePanelFilterState() {
      if (this.activePanel && this.activePanel !== "all") {
        document.body.setAttribute("data-panel-filter", this.activePanel);
      } else {
        document.body.removeAttribute("data-panel-filter");
      }
      if (!this.panelBoard) return;
      this.panelBoard.querySelectorAll("[data-panel]").forEach((button) => {
        const key = button.getAttribute("data-panel");
        const isActive = key === this.activePanel;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });
    }

    updatePanelBoard(stats) {
      if (!this.panelBoard || !stats?.perPanel) return;
      this.panelBoard.querySelectorAll("[data-panel]").forEach((button) => {
        const key = button.getAttribute("data-panel");
        const panelStats = stats.perPanel.get(key) || {
          total: 0,
          done: 0,
          filteredTotal: 0,
          filteredDone: 0,
        };
        const denominator = panelStats.filteredTotal || panelStats.total || 0;
        const numerator = panelStats.filteredTotal ? panelStats.filteredDone : panelStats.done;
        const meta = button.querySelector(`[data-panel-meta="${key}"]`);
        if (meta) meta.textContent = `${numerator} / ${denominator}`;
        const progress = button.querySelector(`[data-panel-progress="${key}"]`);
        if (progress) {
          const pct = denominator ? Math.round((numerator / denominator) * 100) : 0;
          progress.style.width = `${pct}%`;
        }
        const isActive = key === this.activePanel;
        button.classList.toggle("is-active", isActive);
        button.classList.toggle("is-dimmed", this.activePanel !== "all" && key !== this.activePanel);
        button.classList.toggle("is-empty", denominator === 0);
        button.setAttribute("aria-pressed", String(isActive));
      });
    }

    panelMatches(panelKey) {
      return this.activePanel === "all" || panelKey === this.activePanel;
    }

    sectionMatchesPanel(section) {
      if (this.activePanel === "all") return true;
      return (section.items || []).some((item) => this.panelMatches(this.getPanelKey(item.where, item.what)));
    }

    getPanelKey(where = "", what = "") {
      const text = `${where || ""} ${what || ""}`.toLowerCase();
      for (const rule of PANEL_RULES) {
        if (rule.tests.some((test) => test.test(text))) {
          return rule.key;
        }
      }
      return "flightdeck";
    }

    renderAll() {
      if (!this.content || !this.nav) return;
      this.content.innerHTML = "";
      this.nav.innerHTML = "";
      const showFavoritesOnly = !!this.state._favs;
      const withEN = !!this.state._withEN;
      this.currentQuery = (this.state._q || "").toLowerCase();

      this.renderPanelBoard();
      this.updatePanelFilterState();

      const filteredSections = [];
      this.data.forEach((section, sectionIndex) => {
        const isFavorite = !!this.state[`fav_${section.id}`];
        if (showFavoritesOnly && !isFavorite) return;
        const matchesPhase = this.activePhase === "all" || PHASE_GROUPS[this.activePhase]?.sections.includes(section.id);
        if (!matchesPhase) return;
        if (!this.sectionMatchesPanel(section)) return;
        filteredSections.push({ section, sectionIndex, isFavorite });
      });

      if (this.isFocusMode) {
        const hasFocus = filteredSections.some((entry) => entry.section.id === this.focusSectionId);
        if (!hasFocus) {
          this.focusSectionId = filteredSections[0]?.section.id || null;
          if (this.focusSectionId) {
            this.state._focusSection = this.focusSectionId;
            this.saveStateDebounced();
          } else {
            delete this.state._focusSection;
            this.saveStateDebounced();
          }
        }
      } else if (this.focusSectionId) {
        this.focusSectionId = null;
        delete this.state._focusSection;
        this.saveStateDebounced();
      }

      const renderedIds = [];
      const visibleIds = [];

      filteredSections.forEach((entry) => {
        const { section, isFavorite } = entry;
        visibleIds.push(section.id);
        const navLink = document.createElement("a");
        navLink.href = `#${section.id}`;
        navLink.dataset.section = section.id;
        navLink.innerHTML = `<span>${section.title}</span><span class="nav__badge">${section.badge}${isFavorite ? " · ★" : ""}</span>`;
        this.nav.appendChild(navLink);
        entry.navLink = navLink;
      });

      const sectionsToRender = this.isFocusMode && this.focusSectionId
        ? filteredSections.filter((entry) => entry.section.id === this.focusSectionId)
        : filteredSections;

      sectionsToRender.forEach((entry) => {
        const { section, sectionIndex, navLink } = entry;
        const card = this.renderSection(section, sectionIndex, { withEN, query: this.currentQuery });
        if (!card) {
          if (navLink) navLink.classList.add("is-muted");
          return;
        }
        renderedIds.push(section.id);
        if (this.isFocusMode) card.classList.add("is-focus-target");
        if (navLink) navLink.classList.remove("is-muted");
        this.content.appendChild(card);
      });

      if (!renderedIds.length) {
        const empty = document.createElement("section");
        empty.className = "card";
        empty.innerHTML = `<header class="card__header"><h2 class="card__title">Ничего не найдено</h2></header><div class="card__body">Измените запрос или отключите фильтры.</div>`;
        this.content.prepend(empty);
      }

      this.renderTimeline(renderedIds, visibleIds);
      this.observeSections();
      this.restoreImages();
      this.updateToggleStates();
      this.updateProgress();
    }

    renderTimeline(renderedIds = [], visibleIds = []) {
      if (!this.timeline) return;
      const visibleSet = new Set(visibleIds);
      const renderedSet = new Set(renderedIds);
      this.timeline.innerHTML = "";
      this.data.forEach((section, index) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "timeline__item";
        item.dataset.action = "jumpSection";
        item.dataset.section = section.id;
        const position = String(index + 1).padStart(2, "0");
        item.innerHTML = `
          <span class="timeline__index">${position}</span>
          <span class="timeline__title">${section.title}</span>
          <span class="timeline__meta">0/0</span>
          <div class="timeline__progress"><i></i></div>
        `;
        if (!visibleSet.has(section.id)) {
          item.classList.add("is-muted");
        } else if (!renderedSet.has(section.id)) {
          item.classList.add("is-ghost");
        }
        if (this.isFocusMode && this.focusSectionId === section.id) {
          item.classList.add("is-active");
        }
        this.timeline.appendChild(item);
      });
    }
    renderSection(section, sectionIndex, { withEN, query }) {
      const card = document.createElement("section");
      card.className = "card";
      card.id = section.id;
      card.dataset.sectionIndex = String(sectionIndex);

      const header = document.createElement("header");
      header.className = "card__header";

      const title = document.createElement("h2");
      title.className = "card__title";
      title.innerHTML = `<span>${section.title}</span> <span class="card__badge">· ${section.badge}</span>`;

      const favButton = document.createElement("button");
      favButton.className = "card__fav";
      favButton.type = "button";
      favButton.textContent = "★";
      favButton.dataset.action = "toggleFavorite";
      favButton.dataset.section = section.id;
      favButton.setAttribute("aria-label", "Добавить секцию в избранное");
      favButton.setAttribute("aria-pressed", String(!!this.state[`fav_${section.id}`]));

      const toolbar = document.createElement("div");
      toolbar.className = "card__toolbar";
      toolbar.innerHTML = `
        <button class="btn btn--small" data-action="checkSection" data-section-index="${sectionIndex}">✓ все</button>
        <button class="btn btn--small" data-action="uncheckSection" data-section-index="${sectionIndex}">✗ снять</button>
        <button class="btn btn--small" data-action="resetSection" data-section-index="${sectionIndex}">Сбросить секцию</button>
      `;

      const headerLeft = document.createElement("div");
      headerLeft.style.display = "flex";
      headerLeft.style.alignItems = "center";
      headerLeft.style.gap = "10px";
      headerLeft.append(favButton, title);

      header.append(headerLeft, toolbar);
      card.appendChild(header);

      const body = document.createElement("div");
      body.className = "card__body";

      if (section.id === "briefing") {
        body.appendChild(this.renderBriefingCard());
      }

      const head = document.createElement("div");
      head.className = "checklist__head";
      head.innerHTML = `
        <div></div>
        <div>ПАНЕЛЬ · ГДЕ</div>
        <div>ЧТО сделать${withEN ? " / EN" : ""}</div>
        <div>ПОЧЕМУ</div>
        <div></div>
      `;
      body.appendChild(head);

      const checklist = document.createElement("div");
      checklist.className = "checklist";

      let visibleItems = 0;
      section.items.forEach((item, itemIndex) => {
        const row = this.renderItem(sectionIndex, itemIndex, item, { withEN, query });
        if (!row) return;
        visibleItems += 1;
        checklist.appendChild(row);
      });

      if (!visibleItems) {
        if (this.currentQuery) return null;
      }

      body.appendChild(checklist);
      body.appendChild(this.renderFigure(section.id, section.title));

      const progress = document.createElement("div");
      progress.className = "progress progress--section";
      progress.innerHTML = `<i data-section-progress="${section.id}"></i>`;
      body.appendChild(progress);

      card.appendChild(body);
      return card;
    }
    renderBriefingCard() {
      const container = document.createElement("div");
      container.className = "card";
      container.innerHTML = `
        <div class="card__body">
          <div class="checklist__note">
            <div class="topbar__subtitle" style="font-size:13px;margin-bottom:6px;color:var(--muted);">
              Брифинг PF (редактируемый шаблон, сохраняется локально)
            </div>
            <textarea id="briefTextarea" placeholder="DEP RWY…">${this.state._brief || DEFAULT_BRIEF}</textarea>
            <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
              <button class="btn btn--small" data-action="saveBrief">Сохранить</button>
              <button class="btn btn--small btn--ghost" data-action="clearBrief">Очистить</button>
            </div>
          </div>
        </div>`;
      return container;
    }

    renderItem(sectionIndex, itemIndex, item, { withEN, query }) {
      const critKey = `crit_${sectionIndex}_${itemIndex}`;
      const stateKey = `c_${sectionIndex}_${itemIndex}`;
      const noteKey = `n_${sectionIndex}_${itemIndex}`;
      const isCritical = Object.prototype.hasOwnProperty.call(this.state, critKey)
        ? !!this.state[critKey]
        : !!item.crit;

      if (this.state._crit && !isCritical) return null;

      const searchText = `${item.where} ${item.what} ${item.en || ""} ${item.why}`.toLowerCase();
      const matches = !query || searchText.includes(query);
      if (!matches) return null;

      const panelKey = this.getPanelKey(item.where, item.what);
      if (!this.panelMatches(panelKey)) return null;
      const panelInfo = PANEL_INFO[panelKey] || PANEL_INFO.flightdeck;
      const isPanelActive = this.activePanel !== "all" && panelKey === this.activePanel;

      const row = document.createElement("div");
      row.className = "checklist__row";
      row.dataset.sectionIndex = String(sectionIndex);
      row.dataset.itemIndex = String(itemIndex);
      row.dataset.stateKey = stateKey;
      row.dataset.panel = panelKey;
      if (isCritical) row.classList.add("is-critical");
      if (isPanelActive) row.classList.add("is-panel-focus");

      const checkboxCell = document.createElement("div");
      checkboxCell.className = "checklist__checkbox";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.dataset.id = stateKey;
      checkbox.checked = !!this.state[stateKey];
      checkbox.setAttribute("aria-label", "Отметить шаг");
      checkboxCell.appendChild(checkbox);

      const whereCell = document.createElement("div");
      whereCell.className = "checklist__cell where";
      const panelWrap = document.createElement("div");
      panelWrap.className = "where__panel";

      const panelButton = document.createElement("button");
      panelButton.type = "button";
      panelButton.className = "panel-chip";
      panelButton.dataset.action = "panelFocus";
      panelButton.dataset.panel = panelKey;
      panelButton.setAttribute("aria-pressed", String(this.activePanel === panelKey));
      panelButton.setAttribute("aria-label", `Показать шаги панели «${panelInfo.title}»`);
      panelButton.title = panelInfo.description;
      const badge = document.createElement("span");
      badge.className = `panel-badge panel-badge--${panelKey}`;
      badge.textContent = panelInfo.short;
      const label = document.createElement("span");
      label.className = "panel-chip__label";
      label.textContent = panelInfo.title;
      panelButton.append(badge, label);
      panelWrap.appendChild(panelButton);

      const whereHint = document.createElement("span");
      whereHint.className = "where__hint";
      whereHint.textContent = panelInfo.hint;
      panelWrap.appendChild(whereHint);

      const wherePath = document.createElement("div");
      wherePath.className = "where__path";
      wherePath.innerHTML = this.formatWhere(item.where, query);

      whereCell.append(panelWrap, wherePath);

      const whatCell = document.createElement("div");
      whatCell.className = "checklist__cell what";
      whatCell.innerHTML = this.decorateSearch(item.what, query);
      if (withEN && item.en) {
        const en = document.createElement("div");
        en.className = "what__en";
        en.innerHTML = this.decorateSearch(item.en, query);
        whatCell.appendChild(en);
      }

      const whyCell = document.createElement("div");
      whyCell.className = "checklist__cell why";
      whyCell.innerHTML = this.decorateSearch(item.why, query);

      const note = document.createElement("div");
      note.className = "checklist__note";
      note.innerHTML = `
        <details ${this.state[noteKey] ? "open" : ""}>
          <summary>Заметка</summary>
          <textarea data-note="${noteKey}" placeholder="Моя подсказка / значения...">${this.state[noteKey] || ""}</textarea>
        </details>`;
      whyCell.appendChild(note);

      const toggle = document.createElement("button");
      toggle.className = "checklist__toggle";
      toggle.type = "button";
      toggle.dataset.action = "toggleCritical";
      toggle.dataset.sectionIndex = String(sectionIndex);
      toggle.dataset.itemIndex = String(itemIndex);
      toggle.setAttribute("aria-label", "Пометить как критичный");
      toggle.setAttribute("aria-pressed", String(isCritical));
      toggle.textContent = "!";

      row.append(checkboxCell, whereCell, whatCell, whyCell, toggle);
      return row;
    }
    renderFigure(sectionId, sectionTitle) {
      const figure = document.createElement("div");
      figure.className = "figure";
      figure.innerHTML = `
        <div class="figure__thumb"><img id="img_${sectionId}" alt="${sectionTitle}" /></div>
        <div class="figure__meta">
          <div>Фото-слот: добавьте изображение панели/схемы. Хранится локально.</div>
          <div class="figure__actions">
            <label class="btn btn--ghost">
              <input type="file" accept="image/*" data-action="uploadImage" data-section="${sectionId}" hidden />
              <span>Загрузить</span>
            </label>
            <button class="btn btn--ghost" data-action="removeImage" data-section="${sectionId}">Удалить</button>
          </div>
        </div>`;
      return figure;
    }
    bindGlobalEvents() {
      document.body.addEventListener("click", (event) => this.handleClick(event));
      document.body.addEventListener("change", (event) => this.handleChange(event));
      document.body.addEventListener("input", (event) => this.handleInput(event));
      this.content.addEventListener("focusin", (event) => this.handleFocus(event));
      if (this.nav) this.nav.addEventListener("click", (event) => this.handleNavClick(event));
      document.addEventListener("keydown", (event) => this.handleKeydown(event));
      window.addEventListener("scroll", () => this.handleScroll());
      this.initSearch();
    }

    handleScroll() {
      if (!this.topbar) return;
      this.topbar.classList.toggle("is-scrolled", window.scrollY > 12);
    }

    handleClick(event) {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const actionEl = target.closest("[data-action]");
      if (!actionEl) return;
      const action = actionEl.getAttribute("data-action");

      switch (action) {
        case "toggleFavorite":
          this.toggleFavorite(actionEl.getAttribute("data-section"));
          break;
        case "checkSection":
          this.toggleSectionChecks(actionEl.getAttribute("data-section-index"), true);
          break;
        case "uncheckSection":
          this.toggleSectionChecks(actionEl.getAttribute("data-section-index"), false);
          break;
        case "resetSection":
          this.resetSection(actionEl.getAttribute("data-section-index"));
          break;
        case "toggleCritical":
          this.toggleCritical(actionEl.getAttribute("data-section-index"), actionEl.getAttribute("data-item-index"));
          break;
        case "saveBrief":
          this.saveBrief();
          break;
        case "clearBrief":
          this.clearBrief();
          break;
        case "removeImage":
          this.removeImage(actionEl.getAttribute("data-section"));
          break;
        case "theme":
          this.cycleTheme();
          break;
        case "compact":
          this.toggleCompactMode();
          break;
        case "toggleSidebar":
          this.toggleSidebar();
          break;
        case "expandAll":
          this.expandAll();
          break;
        case "collapseAll":
          this.collapseAll();
          break;
        case "resetAll":
          this.resetAll();
          break;
        case "toggleEN":
          this.toggleEN();
          break;
        case "export":
          this.exportJSON();
          break;
        case "import":
          this.importJSON();
          break;
        case "print":
          window.print();
          break;
        case "scrollTop":
          window.scrollTo({ top: 0, behavior: "smooth" });
          break;
        case "scrollBottom":
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
          break;
        case "closeError":
          document.getElementById("errorOverlay").hidden = true;
          break;
        case "phaseFilter":
          this.setPhase(actionEl.getAttribute("data-phase"));
          break;
        case "panelFilter":
          this.setPanel(actionEl.getAttribute("data-panel"));
          break;
        case "panelFocus":
          this.setPanel(
            this.activePanel === actionEl.getAttribute("data-panel") ? "all" : actionEl.getAttribute("data-panel"),
          );
          break;
        case "panelGuide":
          this.openPanelGuide();
          break;
        case "panelGuideClose":
          this.closePanelGuide();
          break;
        case "jumpSection":
          this.jumpToSection(actionEl.getAttribute("data-section"));
          break;
        case "focusMode":
          this.toggleFocusMode();
          break;
        default:
          break;
      }
    }

    handleNavClick(event) {
      const link = event.target.closest("a[data-section]");
      if (!link) return;
      if (this.isFocusMode) {
        event.preventDefault();
        this.setFocusSection(link.getAttribute("data-section"));
      }
    }
    handleChange(event) {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      if (target.matches("input[type=checkbox][data-id]")) {
        const id = target.getAttribute("data-id");
        if (!id) return;
        if (target instanceof HTMLInputElement) {
          if (target.checked) this.state[id] = true;
          else delete this.state[id];
          this.saveStateDebounced();
          this.updateProgress();
        }
        return;
      }

      if (target.matches("input[type=file][data-action=uploadImage]")) {
        const input = target;
        const section = input.getAttribute("data-section");
        if (!section || !(input instanceof HTMLInputElement) || !input.files?.length) return;
        const file = input.files[0];
        const MAX_SIZE = 1.8 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
          alert("Изображение больше 1.8 MB. Уменьшите и повторите попытку.");
          input.value = "";
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          try {
            localStorage.setItem(`${IMAGE_PREFIX}${section}`, reader.result);
            this.restoreImages();
          } catch (error) {
            alert("Недостаточно места для сохранения изображения.");
            console.error(error);
          }
        };
        reader.readAsDataURL(file);
        return;
      }

      if (target === this.filterCritical) {
        this.state._crit = this.filterCritical.checked;
        this.saveStateDebounced();
        this.renderAll();
        return;
      }

      if (target === this.filterFavorites) {
        this.state._favs = this.filterFavorites.checked;
        this.saveStateDebounced();
        this.renderAll();
      }
    }

    handleInput(event) {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      if (target.matches("textarea[data-note]")) {
        const key = target.getAttribute("data-note");
        if (!key) return;
        this.state[key] = target.value;
        this.saveStateDebounced();
        return;
      }

      if (target.id === "briefTextarea") {
        this.state._brief = target.value;
        this.saveStateDebounced();
      }
    }

    handleFocus(event) {
      const target = event.target;
      if (target instanceof HTMLInputElement && target.type === "checkbox" && target.dataset.id) {
        this.lastFocusedCheckboxId = target.dataset.id;
      }
    }
    handleKeydown(event) {
      const active = document.activeElement;
      const isTyping = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA");
      if (isTyping && !event.ctrlKey && !event.metaKey) return;

      if (event.key === "Escape" && this.panelGuide && !this.panelGuide.hidden) {
        event.preventDefault();
        this.closePanelGuide();
        return;
      }

      if (event.key === "/") {
        event.preventDefault();
        this.focusSearch();
        return;
      }

      if (event.key.toLowerCase() === "j") {
        event.preventDefault();
        this.jumpSection(1);
        return;
      }

      if (event.key.toLowerCase() === "k") {
        event.preventDefault();
        this.jumpSection(-1);
        return;
      }

      if (event.key === " " && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        this.toggleFocusedCheckbox();
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        this.exportJSON();
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "o") {
        event.preventDefault();
        this.importJSON();
      }
    }

    initSearch() {
      if (!this.searchInput) return;
      this.searchInput.addEventListener(
        "input",
        debounce(() => {
          this.state._q = this.searchInput.value.trim();
          this.saveStateDebounced();
          this.renderAll();
        }, 140),
      );
    }

    focusSearch() {
      if (!this.searchInput) return;
      this.searchInput.focus();
      this.searchInput.select();
    }
    toggleFavorite(sectionId) {
      if (!sectionId) return;
      const key = `fav_${sectionId}`;
      this.state[key] = !this.state[key];
      this.saveStateDebounced();
      this.renderAll();
    }

    toggleSectionChecks(sectionIndex, value) {
      const index = Number(sectionIndex);
      if (Number.isNaN(index)) return;
      const items = this.data[index]?.items || [];
      items.forEach((_, itemIndex) => {
        const key = `c_${index}_${itemIndex}`;
        if (value) this.state[key] = true;
        else delete this.state[key];
      });
      this.saveStateDebounced();
      this.renderAll();
    }

    resetSection(sectionIndex) {
      if (!confirm("Сбросить галочки и заметки в этой секции?")) return;
      const index = Number(sectionIndex);
      if (Number.isNaN(index)) return;
      const items = this.data[index]?.items || [];
      items.forEach((_, itemIndex) => {
        delete this.state[`c_${index}_${itemIndex}`];
        delete this.state[`n_${index}_${itemIndex}`];
        delete this.state[`crit_${index}_${itemIndex}`];
      });
      this.saveStateDebounced();
      this.renderAll();
    }

    toggleCritical(sectionIndex, itemIndex) {
      const s = Number(sectionIndex);
      const i = Number(itemIndex);
      if (Number.isNaN(s) || Number.isNaN(i)) return;
      const key = `crit_${s}_${i}`;
      this.state[key] = !this.state[key];
      this.saveStateDebounced();
      const row = this.content.querySelector(`.checklist__row[data-section-index="${s}"][data-item-index="${i}"]`);
      if (row) row.classList.toggle("is-critical", !!this.state[key]);
      if (this.state._crit) this.renderAll();
      else this.updateProgress();
    }

    saveBrief() {
      const textarea = document.getElementById("briefTextarea");
      if (textarea) {
        this.state._brief = textarea.value;
        this.saveStateDebounced();
      }
    }

    clearBrief() {
      const textarea = document.getElementById("briefTextarea");
      if (textarea) {
        textarea.value = "";
        this.state._brief = "";
        this.saveStateDebounced();
      }
    }

    removeImage(sectionId) {
      if (!sectionId) return;
      localStorage.removeItem(`${IMAGE_PREFIX}${sectionId}`);
      this.restoreImages();
    }

    restoreImages() {
      this.data.forEach((section) => {
        const img = document.getElementById(`img_${section.id}`);
        if (!img) return;
        const stored = localStorage.getItem(`${IMAGE_PREFIX}${section.id}`);
        if (stored) {
          img.src = stored;
          img.style.opacity = "1";
          img.alt = `Фото секции: ${section.title}`;
        } else {
          img.removeAttribute("src");
          img.style.opacity = "0.5";
          img.alt = `${section.title} — фото не загружено`;
        }
      });
    }

    cycleTheme() {
      const order = ["auto", "dark", "light"];
      const index = order.indexOf(this.currentTheme);
      const next = order[(index + 1) % order.length];
      this.applyTheme(next);
    }

    toggleCompactMode() {
      document.body.classList.toggle("is-compact");
    }

    toggleSidebar() {
      document.body.classList.toggle("is-sidebar-hidden");
      this.updateToggleStates();
    }

    setPhase(phase) {
      const next = PHASE_GROUPS[phase] ? phase : "all";
      if (this.activePhase === next) return;
      this.activePhase = next;
      this.state._phase = next;
      this.saveStateDebounced();
      this.renderAll();
    }

    setPanel(panel) {
      const next = PANEL_INFO[panel] ? panel : "all";
      if (this.activePanel === next) return;
      this.activePanel = next;
      if (next === "all") delete this.state._panel;
      else this.state._panel = next;
      this.saveStateDebounced();
      this.updatePanelFilterState();
      this.renderAll();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    openPanelGuide() {
      if (!this.panelGuide) return;
      this.panelGuide.hidden = false;
      document.body.classList.add("is-modal-open");
      const closeButton = this.panelGuide.querySelector('[data-action="panelGuideClose"]');
      if (closeButton instanceof HTMLElement) closeButton.focus();
    }

    closePanelGuide() {
      if (!this.panelGuide) return;
      this.panelGuide.hidden = true;
      document.body.classList.remove("is-modal-open");
    }

    toggleFocusMode() {
      this.isFocusMode = !this.isFocusMode;
      this.state._focusMode = this.isFocusMode;
      if (!this.isFocusMode) {
        this.focusSectionId = null;
        delete this.state._focusSection;
      }
      this.saveStateDebounced();
      this.updateToggleStates();
      this.renderAll();
      if (this.isFocusMode && this.focusSectionId) {
        this.scrollToSection(this.focusSectionId);
      }
    }

    setFocusSection(sectionId) {
      if (!sectionId) return;
      if (!this.isFocusMode) {
        this.scrollToSection(sectionId);
        return;
      }
      if (this.focusSectionId === sectionId) {
        this.scrollToSection(sectionId);
        return;
      }
      this.focusSectionId = sectionId;
      this.state._focusSection = sectionId;
      this.saveStateDebounced();
      this.renderAll();
      this.scrollToSection(sectionId);
    }

    jumpToSection(sectionId) {
      if (!sectionId) return;
      if (this.isFocusMode) {
        this.setFocusSection(sectionId);
      } else {
        this.scrollToSection(sectionId);
      }
    }

    scrollToSection(sectionId) {
      if (!sectionId) return;
      requestAnimationFrame(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    expandAll() {
      this.content.querySelectorAll(".card").forEach((card) => card.classList.remove("is-collapsed"));
    }

    collapseAll() {
      this.content.querySelectorAll(".card").forEach((card) => card.classList.add("is-collapsed"));
    }

    resetAll() {
      if (!confirm("Полный сброс прогресса (кроме фото/брифинга)?")) return;
      Object.keys(this.state).forEach((key) => {
        if (/^(c_|n_|crit_|fav_|done_)/.test(key)) delete this.state[key];
      });
      this.state._q = "";
      this.state._phase = "all";
      delete this.state._panel;
      delete this.state._focusMode;
      delete this.state._focusSection;
      this.activePhase = "all";
      this.activePanel = "all";
      this.isFocusMode = false;
      this.focusSectionId = null;
      document.body.classList.remove("is-focus-mode");
      if (this.searchInput) this.searchInput.value = "";
      this.saveStateDebounced();
      this.renderPhaseFilters();
      this.updatePanelFilterState();
      this.renderAll();
    }
    toggleEN() {
      this.state._withEN = !this.state._withEN;
      this.saveStateDebounced();
      this.renderAll();
    }

    exportJSON() {
      const blob = new Blob([JSON.stringify(this.state, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "a320neo_msfs24_v11_progress.json";
      link.click();
      URL.revokeObjectURL(url);
    }

    importJSON() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "application/json";
      input.addEventListener("change", () => {
        const file = input.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const imported = JSON.parse(reader.result);
            Object.assign(this.state, imported);
            this.activePhase = PHASE_GROUPS[this.state._phase] ? this.state._phase : "all";
            this.activePanel = PANEL_INFO[this.state._panel] ? this.state._panel : "all";
            this.isFocusMode = !!this.state._focusMode;
            this.focusSectionId = this.state._focusSection || null;
            document.body.classList.toggle("is-focus-mode", this.isFocusMode);
            this.saveStateDebounced();
            this.renderPhaseFilters();
            this.updatePanelFilterState();
            this.updateToggleStates();
            this.renderAll();
            this.restoreSearchQuery();
          } catch (error) {
            alert("Неверный JSON-файл.");
            console.error(error);
          }
        };
        reader.readAsText(file);
      });
      input.click();
    }

    recalculateStats() {
      const stats = {
        global: {
          total: 0,
          done: 0,
          fullTotal: 0,
          fullDone: 0,
          criticalTotal: 0,
          criticalDone: 0,
        },
        perSection: new Map(),
        perPanel: new Map(),
        nextItem: null,
        visibleSections: [],
      };

      this.data.forEach((section, sectionIndex) => {
        const isFavorite = !!this.state[`fav_${section.id}`];
        const matchesPhase = this.activePhase === "all" || PHASE_GROUPS[this.activePhase]?.sections.includes(section.id);
        const sectionEligible = (!this.state._favs || isFavorite) && matchesPhase;
        const sectionMatchesPanel = this.sectionMatchesPanel(section);
        const sectionVisible = sectionEligible && sectionMatchesPanel;
        if (sectionVisible) stats.visibleSections.push(section.id);

        const items = section.items || [];
        const sectionStats = {
          total: items.length,
          done: 0,
          filteredTotal: 0,
          filteredDone: 0,
          criticalTotal: 0,
          criticalDone: 0,
          visible: sectionVisible,
        };

        items.forEach((item, itemIndex) => {
          const key = `c_${sectionIndex}_${itemIndex}`;
          const isDone = !!this.state[key];
          const critKey = `crit_${sectionIndex}_${itemIndex}`;
          const isCritical = Object.prototype.hasOwnProperty.call(this.state, critKey)
            ? !!this.state[critKey]
            : !!item.crit;
          const matchesCriticalFilter = !this.state._crit || isCritical;
          const searchText = `${item.where} ${item.what} ${item.en || ""} ${item.why}`.toLowerCase();
          const matchesSearch = !this.currentQuery || searchText.includes(this.currentQuery);
          const panelKey = this.getPanelKey(item.where, item.what);
          const matchesPanelFilter = this.panelMatches(panelKey);
          const matchesSharedFilters = sectionEligible && matchesCriticalFilter && matchesSearch;

          stats.global.fullTotal += 1;
          if (isDone) stats.global.fullDone += 1;
          if (isCritical) {
            stats.global.criticalTotal += 1;
            if (isDone) stats.global.criticalDone += 1;
          }

          if (isDone) sectionStats.done += 1;
          if (isCritical) {
            sectionStats.criticalTotal += 1;
            if (isDone) sectionStats.criticalDone += 1;
          }

          if (matchesCriticalFilter && matchesPanelFilter) {
            sectionStats.filteredTotal += 1;
            if (isDone) sectionStats.filteredDone += 1;
            if (sectionVisible) {
              stats.global.total += 1;
              if (isDone) stats.global.done += 1;
            }
          }

          if (sectionVisible && matchesCriticalFilter && matchesPanelFilter && matchesSearch && !isDone && !stats.nextItem) {
            stats.nextItem = {
              section,
              sectionIndex,
              item,
              itemIndex,
              isCritical,
              panelKey,
            };
          }

          const panelStats = stats.perPanel.get(panelKey) || {
            total: 0,
            done: 0,
            filteredTotal: 0,
            filteredDone: 0,
          };
          panelStats.total += 1;
          if (isDone) panelStats.done += 1;
          if (matchesSharedFilters) {
            panelStats.filteredTotal += 1;
            if (isDone) panelStats.filteredDone += 1;
          }
          stats.perPanel.set(panelKey, panelStats);
        });

        stats.perSection.set(section.id, sectionStats);
      });

      let panelFilteredTotal = 0;
      let panelFilteredDone = 0;
      stats.perPanel.forEach((panelStats) => {
        panelFilteredTotal += panelStats.filteredTotal;
        panelFilteredDone += panelStats.filteredDone;
      });
      stats.perPanel.set("all", {
        total: stats.global.fullTotal,
        done: stats.global.fullDone,
        filteredTotal: panelFilteredTotal,
        filteredDone: panelFilteredDone,
      });

      this.lastStats = stats;
      return stats;
    }

    updateProgress() {
      const stats = this.recalculateStats();
      stats.perSection.forEach((sectionStats, sectionId) => {
        const bar = this.content.querySelector(`[data-section-progress="${sectionId}"]`);
        if (!bar) return;
        const useFiltered = this.state._crit || this.activePanel !== "all";
        const denominator = useFiltered ? sectionStats.filteredTotal : sectionStats.total;
        const numerator = useFiltered ? sectionStats.filteredDone : sectionStats.done;
        const percentage = denominator ? Math.round((numerator / denominator) * 100) : 0;
        bar.style.width = `${percentage}%`;
      });

      const percentage = stats.global.total ? Math.round((stats.global.done / stats.global.total) * 100) : 0;
      if (this.progressBar) this.progressBar.style.width = `${percentage}%`;
      if (this.progressContainer) this.progressContainer.setAttribute("aria-valuenow", String(percentage));
      if (this.miniBar) this.miniBar.style.width = `${percentage}%`;
      if (this.miniPct) this.miniPct.textContent = `${percentage}%`;
      if (this.stats) this.stats.textContent = `Прогресс: ${percentage}% · Отмечено: ${stats.global.done} / ${stats.global.total}`;

      this.updateTimeline(stats);
      this.updateDashboard(stats);
      this.updateNextStep(stats);
      this.updatePanelBoard(stats);
    }

    updateTimeline(stats) {
      if (!this.timeline) return;
      stats.perSection.forEach((sectionStats, sectionId) => {
        const item = this.timeline.querySelector(`[data-section="${sectionId}"]`);
        if (!item) return;
        item.classList.remove("is-muted", "is-ghost", "is-active");
        if (!sectionStats.visible) item.classList.add("is-muted");
        else if (!document.getElementById(sectionId)) item.classList.add("is-ghost");
        if (this.isFocusMode && this.focusSectionId === sectionId) item.classList.add("is-active");

        const useFiltered = this.state._crit || this.activePanel !== "all";
        const denominator = useFiltered ? sectionStats.filteredTotal : sectionStats.total;
        const numerator = useFiltered ? sectionStats.filteredDone : sectionStats.done;
        const pct = denominator ? Math.round((numerator / denominator) * 100) : 0;
        const progress = item.querySelector(".timeline__progress i");
        if (progress) progress.style.width = `${pct}%`;
        const meta = item.querySelector(".timeline__meta");
        if (meta) meta.textContent = `${numerator}/${denominator || 0}`;
      });
    }

    updateDashboard(stats) {
      if (!this.dashboard) return;
      const setValue = (metric, value) => {
        const el = this.dashboard.querySelector(`[data-metric="${metric}"] .dashboard__value`);
        if (el) el.textContent = value;
      };
      setValue("total", String(stats.global.total));
      setValue("done", String(stats.global.done));
      setValue("remaining", String(Math.max(stats.global.total - stats.global.done, 0)));
      setValue(
        "critical",
        `${stats.global.criticalDone}/${stats.global.criticalTotal}`,
      );
      const overallPct = stats.global.fullTotal ? Math.round((stats.global.fullDone / stats.global.fullTotal) * 100) : 0;
      setValue("overall", `${overallPct}%`);
      const panelInfo = PANEL_INFO[this.activePanel] || PANEL_INFO.all;
      const panelStats = stats.perPanel.get(this.activePanel) || stats.perPanel.get("all") || {
        total: 0,
        done: 0,
        filteredTotal: 0,
        filteredDone: 0,
      };
      const panelDenominator = panelStats.filteredTotal || panelStats.total || 0;
      const panelNumerator = panelStats.filteredTotal ? panelStats.filteredDone : panelStats.done;
      const panelSuffix = panelDenominator ? ` · ${panelNumerator} / ${panelDenominator}` : "";
      setValue("panel", `${panelInfo.title}${panelSuffix}`);
    }

    updateNextStep(stats) {
      if (!this.nextStep) return;
      const body = document.getElementById("nextStepBody");
      const button = this.nextStep.querySelector('[data-action="jumpSection"]');
      if (!body || !button) return;

      if (!stats.global.total) {
        body.innerHTML = '<p class="inspector__placeholder">Нет шагов в текущем фильтре.</p>';
        button.disabled = true;
        button.dataset.section = "";
        this.nextStep.hidden = false;
        return;
      }

      if (!stats.nextItem) {
        body.innerHTML = '<p class="inspector__placeholder">Все шаги выполнены! 🎉</p>';
        button.disabled = true;
        button.dataset.section = "";
        this.nextStep.hidden = false;
        return;
      }

      const { section, item, isCritical, panelKey } = stats.nextItem;
      const resolvedPanelKey = panelKey || this.getPanelKey(item.where, item.what);
      const panelInfo = PANEL_INFO[resolvedPanelKey] || PANEL_INFO.flightdeck;
      const wherePath = this.formatWhere(item.where, this.currentQuery);
      const whatText = this.decorateSearch(item.what, this.currentQuery);
      const whyText = this.decorateSearch(item.why, this.currentQuery);
      const enText = this.state._withEN && item.en ? this.decorateSearch(item.en, this.currentQuery) : "";
      body.innerHTML = `
        <span class="inspector__section">${escapeHTML(section.title)}</span>
        <span class="inspector__panel"><span class="panel-badge panel-badge--${resolvedPanelKey}">${escapeHTML(panelInfo.short)}</span>${escapeHTML(panelInfo.hint)}</span>
        <span class="inspector__where where__path">${wherePath}</span>
        <span class="inspector__what">${whatText}</span>
        <span class="inspector__why">${whyText}</span>
        ${enText ? `<span class="inspector__en">${enText}</span>` : ""}
        ${isCritical ? '<span class="inspector__critical">Критичный пункт</span>' : ""}
      `;
      button.disabled = false;
      button.dataset.section = section.id;
      this.nextStep.hidden = false;
    }

    observeSections() {
      if (!("IntersectionObserver" in window)) return;
      if (this.observer) this.observer.disconnect();
      const sections = this.content.querySelectorAll(".card[id]");
      this.observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          if (!visible.length) return;
          const id = visible[0].target.id;
          this.nav.querySelectorAll("a").forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
          });
        },
        { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
      );
      sections.forEach((section) => this.observer.observe(section));
    }

    restoreSearchQuery() {
      if (this.searchInput && this.state._q) {
        this.searchInput.value = this.state._q;
      }
    }

    jumpSection(direction) {
      const links = Array.from(this.nav.querySelectorAll("a"));
      if (!links.length) return;
      const currentHash = window.location.hash;
      let index = links.findIndex((link) => link.getAttribute("href") === currentHash);
      if (index < 0) index = 0;
      const next = links[(index + direction + links.length) % links.length];
      if (next) {
        next.focus();
        next.click();
        const targetId = next.getAttribute("href").slice(1);
        const section = document.getElementById(targetId);
        if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    toggleFocusedCheckbox() {
      if (this.lastFocusedCheckboxId) {
        const checkbox = this.content.querySelector(`input[type=checkbox][data-id="${this.lastFocusedCheckboxId}"]`);
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event("change", { bubbles: true }));
          return;
        }
      }
      const firstCheckbox = this.content.querySelector("input[type=checkbox][data-id]");
      if (firstCheckbox) {
        firstCheckbox.checked = !firstCheckbox.checked;
        firstCheckbox.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }

    formatWhere(where = "", query = "") {
      if (!where) return "";
      const segments = where
        .split(/(?:→|->|›|»|>)/)
        .map((part) => part.trim())
        .filter(Boolean);
      if (!segments.length) segments.push(where.trim());
      return segments
        .map((segment) => `<span class="where__segment">${this.decorateSearch(segment, query)}</span>`)
        .join('<span class="where__arrow">→</span>');
    }

    decorateSearch(value, query) {
      if (!value) return "";
      const safe = escapeHTML(value);
      if (!query) return safe;
      const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
      return safe.replace(regex, '<mark class="highlight">$1</mark>');
    }
  }
  document.addEventListener("DOMContentLoaded", () => {
    try {
      const app = new ChecklistApp(DATA);
      app.init();
    } catch (error) {
      showErrorOverlay(error?.message || String(error), error?.stack);
    }
  });
})();
