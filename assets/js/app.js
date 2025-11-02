(function () {
  "use strict";

  const STORE_KEY = "a320_pro_ru_v11_unified_aio";
  const THEME_KEY = `${STORE_KEY}_theme`;
  const IMAGE_PREFIX = "img_";
  const DATA = [
    {
      id: "briefing",
      title: "0) Краткий брифинг (PF ↔ PM)",
      badge: "PF/PM/ATC",
      items: [
        {
          where: "PF",
          what: "Маршрут/Погода/Аэропорты: DEP RWY, SID, CRZ FL, ALT, ARR RWY, STAR, APPR (ILS/RNAV/LOC)",
          why: "Общая картина и ожидания",
          en: "Route/Weather/Alternates; SID/STAR; approach type",
          crit: true,
        },
        {
          where: "PF",
          what: "Уход на второй круг: высота/курс/тяга, LNAV/VNAV стратегия",
          why: "Безопасность при нестабильном заходе",
          en: "Go-around: thrust/attitude/track",
          crit: true,
        },
        {
          where: "PM",
          what: "Особенности: NOTAM, сложные TAXI, горячие точки",
          why: "Риск-менеджмент на земле",
          en: "NOTAM & taxi hot-spots",
          crit: false,
        },
        {
          where: "Оба",
          what: "Anti-ice политика; автотормоза; флапс; пакеты; APU; единый темп",
          why: "Единые ожидания в экипаже",
          en: "Anti-ice, autobrake, flaps, packs, APU",
          crit: false,
        },
      ],
    },
    {
      id: "cockpitprep",
      title: "1) Подготовка кабины (Cold & Dark → Powered)",
      badge: "OVHD/MCDU",
      items: [
        {
          where: "OVHD → BAT 1/2; EXT PWR",
          what: "BAT 1/2 ON; EXT PWR ON (если AVAIL)",
          why: "Питание бортсети до запуска",
          en: "Batteries ON; EXT PWR ON",
          crit: true,
        },
        {
          where: "APU → MASTER/START; APU BLEED",
          what: "APU START; APU BLEED ON",
          why: "Собственный воздух/электро",
          en: "APU START; BLEED ON",
          crit: true,
        },
        {
          where: "ADIRS 1/2/3",
          what: "NAV; MCDU POS INIT — SET IRS POS",
          why: "Выравнивание; не двигать самолёт",
          en: "ADIRS NAV; IRS position",
          crit: true,
        },
        {
          where: "SIGNS/EMER",
          what: "SEAT BELTS ON; EMER LIGHTS ARM",
          why: "Норматив и безопасность",
          en: "Seat belts; EMER lights ARM",
          crit: false,
        },
        {
          where: "MCDU → INIT/F-PLN/INIT B",
          what: "Загрузка плана, ZFW/CG, ALTN, FUEL",
          why: "Основа навигации и масс",
          en: "Route; ZFW/CG; fuel",
          crit: true,
        },
        {
          where: "MCDU → PERF TO",
          what: "V1/VR/V2; FLAPS/THS; FLEX/TOGA",
          why: "Параметры взлёта",
          en: "TO speeds; flaps/THS; thrust",
          crit: true,
        },
        {
          where: "FCU → BARO / SPD/HDG/ALT",
          what: "QNH; преднастройки по схеме",
          why: "Исключить сюрпризы",
          en: "Set QNH, initial ALT/HDG",
          crit: false,
        },
        {
          where: "ECAM → STATUS",
          what: "RECALL & проверка",
          why: "Нет неисправностей",
          en: "ECAM recall",
          crit: true,
        },
      ],
    },
    {
      id: "beforestart",
      title: "2) Перед запуском (Before Start)",
      badge: "BEACON/PACKS/DOORS",
      items: [
        {
          where: "Doors & Windows",
          what: "Закрыты/задраены",
          why: "Готовность к запуску",
          en: "Doors/windows closed",
          crit: true,
        },
        {
          where: "BEACON",
          what: "ON",
          why: "Сигнал персоналу",
          en: "Beacon ON",
          crit: true,
        },
        {
          where: "PACKS",
          what: "OFF (или по SOP)",
          why: "Поток воздуха для стартера",
          en: "Packs OFF",
          crit: true,
        },
        {
          where: "PUSHBACK",
          what: "Запрос/клир; PARK BRK SET",
          why: "Организация запуска",
          en: "Request push; park brake",
          crit: false,
        },
        {
          where: "TRANSPONDER/TCAS",
          what: "Code set; STBY",
          why: "Готовность",
          en: "XPDR set; STBY",
          crit: false,
        },
      ],
    },
    {
      id: "enginestart",
      title: "3) Запуск двигателей",
      badge: "IGN/START 2→1",
      items: [
        {
          where: "ENG MODE",
          what: "IGN/START",
          why: "Режим запуска",
          en: "ENG MODE IGN/START",
          crit: true,
        },
        {
          where: "ENG 2 MASTER",
          what: "ON; мониторинг N2/FF/EGT; стабилизация",
          why: "Контроль параметров",
          en: "Start ENG 2; monitor",
          crit: true,
        },
        {
          where: "ENG 1 MASTER",
          what: "ON после стабилизации 2",
          why: "Последовательность 2→1",
          en: "Then start ENG 1",
          crit: true,
        },
        {
          where: "PACKS / APU",
          what: "PACKS ON; APU OFF если не нужен",
          why: "Комфорт/экономия",
          en: "Packs ON; APU OFF",
          crit: true,
        },
        {
          where: "ANTI-ICE",
          what: "AS REQ (OAT/влага)",
          why: "Предотвращение обледенения",
          en: "Engine/Wing anti-ice as req",
          crit: false,
        },
      ],
    },
    {
      id: "afterstart",
      title: "4) После запуска (After Start)",
      badge: "F/CTL/TRIM/TO CONFIG",
      items: [
        {
          where: "FLIGHT CONTROLS",
          what: "CHECK (полный ход)",
          why: "Свободное отклонение",
          en: "F/CTL full free movement",
          crit: false,
        },
        {
          where: "FLAPS/SPOILERS/TRIM",
          what: "SET/ARM/SET (по PERF TO)",
          why: "Конфигурация взлёта",
          en: "Flaps; spoilers ARM; trim",
          crit: true,
        },
        {
          where: "AUTO BRK",
          what: "MAX",
          why: "RTO на разбеге",
          en: "Autobrake MAX",
          crit: true,
        },
        {
          where: "ECAM → TO CONFIG",
          what: "PRESS — ECAM MEMO: T.O. NO BLUE",
          why: "Ничего не забыто",
          en: "T.O. CONFIG OK",
          crit: true,
        },
        {
          where: "TAXI",
          what: "Разрешение; TAXI LIGHTS ON",
          why: "Начало руления",
          en: "Taxi clearance; lights",
          crit: false,
        },
      ],
    },
    {
      id: "taxi",
      title: "5) Руление",
      badge: "BRK/STEER/LIGHTS",
      items: [
        {
          where: "BRAKES/STEER",
          what: "CHECK; NOSE L/G STEER ON",
          why: "Управляемость",
          en: "Brakes/steering check",
          crit: false,
        },
        {
          where: "FLT INST",
          what: "PFD/ND — сравнить/совместить",
          why: "Согласованность приборов",
          en: "PFD/ND alignment",
          crit: false,
        },
        {
          where: "CABIN",
          what: "DING (предупредить)",
          why: "Готовность салона",
          en: "Advise cabin",
          crit: false,
        },
      ],
    },
    {
      id: "beforeto",
      title: "6) Перед взлётом (до линии)",
      badge: "TCAS/LIGHTS/A-THR",
      items: [
        {
          where: "TCAS/XPDR",
          what: "TA/RA; ALT ON",
          why: "Антистолкновение",
          en: "TCAS TA/RA; XPDR ALT",
          crit: true,
        },
        {
          where: "EXT LIGHTS",
          what: "LANDING ON; STROBE AUTO/ON",
          why: "Взлётные огни",
          en: "Landing/Strobe ON",
          crit: true,
        },
        {
          where: "A/THR & FD",
          what: "ARM; FD ON (обоих)",
          why: "Готовность автоматик",
          en: "Arm A/THR; FD ON",
          crit: true,
        },
        {
          where: "PACKS",
          what: "AS SOP (обычно ON для NEO)",
          why: "Режим двигателя/комфорт",
          en: "Packs as SOP",
          crit: false,
        },
        {
          where: "LINE UP",
          what: "На ВПП — хронометр START",
          why: "Отсчёт времени",
          en: "Start chrono",
          crit: false,
        },
      ],
    },
    {
      id: "takeoff",
      title: "7) Взлёт (PF/PM callouts + FMA)",
      badge: "FLEX/TOGA · SRS/NAV",
      items: [
        {
          where: "Thrust (PF)",
          what: "«SET THRUST» → FLEX/TOGA",
          why: "Тяга по расчёту",
          en: "Set thrust FLEX/TOGA",
          crit: true,
        },
        {
          where: "FMA (PM)",
          what: "«MAN FLEX/TOGA, SRS, RWY, A/THR BLUE»",
          why: "Подтверждение режимов",
          en: "Call FMA indications",
          crit: true,
        },
        {
          where: "100 kt (PM)",
          what: "«ONE HUNDRED» — PF: «CHECKED»",
          why: "Контроль",
          en: "100 kt — Checked",
          crit: true,
        },
        {
          where: "V1 (PM)",
          what: "«V1» (руки PF остаются)",
          why: "Решение на взлёт",
          en: "V1 call",
          crit: true,
        },
        {
          where: "VR (PM)",
          what: "«ROTATE» — PF: плавный подъём 3°/сек → 15°",
          why: "Оптимальный отрыв",
          en: "Rotate ~3°/s to 15°",
          crit: true,
        },
        {
          where: "Positive climb (PM)",
          what: "«POSITIVE CLIMB» — PF: «GEAR UP»",
          why: "Уборка шасси",
          en: "Gear up",
          crit: true,
        },
        {
          where: "400 ft AGL",
          what: "NAV/HDG (по задаче)",
          why: "Наведение",
          en: "Select NAV/HDG",
          crit: false,
        },
        {
          where: "S-speed",
          what: "Убирать FLAPS по скоростям S/F",
          why: "Чистая конфигурация",
          en: "Retract on S/F",
          crit: false,
        },
        {
          where: "ACC ALT",
          what: "THR CLB; ускорение",
          why: "Переход на набор",
          en: "CLB thrust; accelerate",
          crit: false,
        },
      ],
    },
    {
      id: "climbcruise",
      title: "8) Набор и Крейсер",
      badge: "CLB/CRZ",
      items: [
        {
          where: "FCU",
          what: "Установить CRZ ALT; NAV по SID",
          why: "Профиль полёта",
          en: "Set CRZ ALT; follow SID",
          crit: false,
        },
        {
          where: "SEAT BELTS",
          what: "AS REQ (турбулентность — ON)",
          why: "Комфорт/безопасность",
          en: "Seat belts as req",
          crit: false,
        },
        {
          where: "FUEL/ECAM",
          what: "Мониторинг расхода/систем",
          why: "Ситуационная осведомлённость",
          en: "Monitor fuel/systems",
          crit: false,
        },
      ],
    },
    {
      id: "descent",
      title: "9) Снижение (TOD−)",
      badge: "STAR/Brief/MINIMA",
      items: [
        {
          where: "ATIS & QNH",
          what: "Получить погоду; BARO SET",
          why: "Корректная высота",
          en: "ATIS; set QNH",
          crit: true,
        },
        {
          where: "BRIEF",
          what: "Подтвердить STAR/апп., мин./MDA/DA",
          why: "Безопасность по карте",
          en: "Confirm STAR/approach, minima",
          crit: true,
        },
        {
          where: "MCDU",
          what: "Вставить STAR/APPR, ограничения",
          why: "Верный профиль",
          en: "Insert STAR/APPR",
          crit: true,
        },
        {
          where: "AUTO BRK",
          what: "LO/MED по условиям",
          why: "Длина ВПП, покрытие",
          en: "Autobrake LO/MED",
          crit: false,
        },
        {
          where: "APPR PHASE",
          what: "ACTIVATE при необходимости",
          why: "Профиль скорости",
          en: "Activate APPR phase",
          crit: false,
        },
      ],
    },
    {
      id: "approach",
      title: "10) Заход (ILS/RNAV/LOC)",
      badge: "LOC/GS · Config",
      items: [
        {
          where: "FINAL APP",
          what: "ARM APPR при перехвате",
          why: "Захват LOC/GS или FINAL",
          en: "APPR push",
          crit: true,
        },
        {
          where: "CONFIG",
          what: "GEAR DOWN; FLAPS 1→2→3→FULL",
          why: "Посадочная конфигурация",
          en: "Gear down; flaps as req",
          crit: true,
        },
        {
          where: "SPEED/MANAGED",
          what: "VAPP по PERF (ветер/сдвиг)",
          why: "Стабильность",
          en: "Target VAPP",
          crit: false,
        },
        {
          where: "MINIMA",
          what: "CALL «MINIMUM» — решение",
          why: "Видимость/решение",
          en: "Minimum — Continue/Go-around",
          crit: true,
        },
      ],
    },
    {
      id: "landing",
      title: "11) Посадка и пробег",
      badge: "RETARD/REV/SPOILERS",
      items: [
        {
          where: "RETARD",
          what: "IDLE по callout",
          why: "Техника Airbus",
          en: "Idle at RETARD",
          crit: true,
        },
        {
          where: "SPOILERS/REV",
          what: "SPOILERS — DEPLOY; REVERSE — AS REQ",
          why: "Эффективное торможение",
          en: "Spoilers; reverse as req",
          crit: true,
        },
        {
          where: "AUTO BRK",
          what: "MONITOR; мануал при необходимости",
          why: "Контроль скорости",
          en: "Monitor decel",
          crit: false,
        },
        {
          where: "60 kt",
          what: "REVERSERS — IDLE; потом FWD IDLE",
          why: "Защита двигателей",
          en: "Reduce reverse ~60 kt",
          crit: false,
        },
      ],
    },
    {
      id: "afterlanding",
      title: "12) После посадки",
      badge: "CLEAN/LIGHTS/APU",
      items: [
        {
          where: "RWY clear",
          what: "LANDING OFF; STROBE OFF; TAXI ON",
          why: "Послепосадочные огни",
          en: "Post-runway lights",
          crit: false,
        },
        {
          where: "FLAPS / SPOILERS",
          what: "RETRACT; DISARM",
          why: "Чистая конфигурация",
          en: "Flaps up; spoilers disarm",
          crit: false,
        },
        {
          where: "APU",
          what: "START при необходимости",
          why: "Питание у гейта",
          en: "APU as req",
          crit: false,
        },
        {
          where: "TCAS",
          what: "STBY",
          why: "На земле",
          en: "TCAS STBY",
          crit: false,
        },
      ],
    },
    {
      id: "parking",
      title: "13) Стоянка (Shutdown)",
      badge: "ENG OFF/GPU",
      items: [
        {
          where: "PARK BRK / Chocks",
          what: "SET; установить колодки",
          why: "Фиксация борта",
          en: "Park brake; chocks",
          crit: true,
        },
        {
          where: "ENG MODE / ENG 1–2",
          what: "MODE NORM; ENG OFF",
          why: "Остановка",
          en: "Shut down engines",
          crit: true,
        },
        {
          where: "ELEC",
          what: "EXT PWR ON (если доступно); APU OFF",
          why: "Передача питания",
          en: "GPU on; APU off",
          crit: false,
        },
        {
          where: "FUEL / SIGNS / LIGHTS",
          what: "Fuel pumps OFF; belts OFF; beacon OFF",
          why: "Завершение",
          en: "Complete shutdown",
          crit: false,
        },
        {
          where: "BAT",
          what: "BAT 1/2 OFF (cold & dark)",
          why: "Полное обесточивание",
          en: "Batteries OFF",
          crit: true,
        },
      ],
    },
    {
      id: "memory",
      title: "14) Памятка (Memory Items, кратко)",
      badge: "TCAS/WS/GPWS/UNREL SPD/ENG FIRE",
      items: [
        {
          where: "TCAS RA",
          what: "FOLLOW RA (PF); PM — «MONITOR V/S, RA»",
          why: "Антистолкновение",
          en: "Follow TCAS RA; report",
          crit: true,
        },
        {
          where: "Windshear",
          what: "TOGA; крен 0; тангаж 17°; не менять конфиг",
          why: "Выход из сдвига",
          en: "TOGA, pitch ~17°, wings level",
          crit: true,
        },
        {
          where: "GPWS «PULL UP»",
          what: "TOGA; тангаж 20–25°; крен 0; MAX climb",
          why: "Избежать CFIT",
          en: "TOGA; pitch for climb",
          crit: true,
        },
        {
          where: "Unreliable Speed",
          what: "Установить ориентиры тангажа/тяги; AP/FD/A-THR — OFF; держать безопасный тангаж",
          why: "Ложные показания",
          en: "Pitch/Thrust tables; AP/FD/A-THR off",
          crit: true,
        },
        {
          where: "ENG FIRE/SEV.DAMAGE",
          what: "На безопасной высоте — ENG MASTER OFF; AGENT DISCH (по ECAM)",
          why: "Локализация пожара",
          en: "Master OFF; extinguish (ECAM)",
          crit: true,
        },
      ],
    },
  ];
  const DEFAULT_BRIEF = `DEP RWY:____  SID:____  ENG OUT:___  STOP (RTO):___\nCRZ FL:____  CI:___  ALT:____\nARR RWY:____  STAR:____  APPR: ILS/RNAV/LOC  MINIMA: DA/MDA ___\nGO-AROUND: Thrust TOGA; Att 15°; NAV/HDG ___; Accel Alt ___\nAutobrake: LO/MED  Flaps TO: ___  Anti-Ice: ___  Packs: ON/OFF`;

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
      this.sidebarToggle = document.querySelector('[data-action="toggleSidebar"]');
      this.saveStateDebounced = debounce(() => this.saveState());
      this.lastFocusedCheckboxId = null;
      this.observer = null;
      this.currentTheme = this.getStoredTheme();
      this.currentQuery = (this.state._q || "").toLowerCase();
    }

    init() {
      this.prepareEnvironment();
      this.bindGlobalEvents();
      this.renderAll();
      this.restoreImages();
      if (this.app) this.app.hidden = false;
      this.updateToggleStates();
      this.updateProgress();
      this.restoreSearchQuery();
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
      if (this.sidebarToggle) {
        const isHidden = document.body.classList.contains("is-sidebar-hidden");
        this.sidebarToggle.setAttribute("aria-pressed", String(isHidden));
      }
    }

    renderAll() {
      if (!this.content || !this.nav) return;
      this.content.innerHTML = "";
      this.nav.innerHTML = "";
      const showFavoritesOnly = !!this.state._favs;
      const withEN = !!this.state._withEN;
      this.currentQuery = (this.state._q || "").toLowerCase();

      this.data.forEach((section, sectionIndex) => {
        const isFavorite = !!this.state[`fav_${section.id}`];
        if (showFavoritesOnly && !isFavorite) return;
        const card = this.renderSection(section, sectionIndex, { withEN, query: this.currentQuery });
        if (!card) return;

        const navLink = document.createElement("a");
        navLink.href = `#${section.id}`;
        navLink.dataset.section = section.id;
        navLink.innerHTML = `<span>${section.title}</span><span class="nav__badge">${section.badge}${isFavorite ? " · ★" : ""}</span>`;
        this.nav.appendChild(navLink);

        this.content.appendChild(card);
      });

      if (!this.nav.children.length) {
        const empty = document.createElement("section");
        empty.className = "card";
        empty.innerHTML = `<header class="card__header"><h2 class="card__title">Ничего не найдено</h2></header><div class="card__body">Измените запрос или отключите фильтры.</div>`;
        this.content.prepend(empty);
      }

      this.observeSections();
      this.restoreImages();
      this.updateToggleStates();
      this.updateProgress();
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
        <div>ГДЕ</div>
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

      const row = document.createElement("div");
      row.className = "checklist__row";
      row.dataset.sectionIndex = String(sectionIndex);
      row.dataset.itemIndex = String(itemIndex);
      row.dataset.stateKey = stateKey;
      if (isCritical) row.classList.add("is-critical");

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
      whereCell.innerHTML = this.decorateSearch(item.where, query);

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
        default:
          break;
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
      if (this.searchInput) this.searchInput.value = "";
      this.saveStateDebounced();
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
            this.saveStateDebounced();
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

    updateProgress() {
      let total = 0;
      let done = 0;
      this.data.forEach((section, sectionIndex) => {
        const isFavorite = !!this.state[`fav_${section.id}`];
        if (this.state._favs && !isFavorite) return;
        const items = section.items || [];
        let sectionDone = 0;
        let sectionTotal = 0;
        items.forEach((item, itemIndex) => {
          const critKey = `crit_${sectionIndex}_${itemIndex}`;
          const isCritical = Object.prototype.hasOwnProperty.call(this.state, critKey)
            ? !!this.state[critKey]
            : !!item.crit;
          if (this.state._crit && !isCritical) return;
          sectionTotal += 1;
          const key = `c_${sectionIndex}_${itemIndex}`;
          total += 1;
          if (this.state[key]) {
            done += 1;
            sectionDone += 1;
          }
        });
        const bar = this.content.querySelector(`[data-section-progress="${section.id}"]`);
        if (bar) {
          const denominator = this.state._crit ? sectionTotal : items.length;
          const percentage = denominator ? Math.round((sectionDone / denominator) * 100) : 0;
          bar.style.width = `${percentage}%`;
        }
      });
      const percentage = total ? Math.round((done / total) * 100) : 0;
      if (this.progressBar) this.progressBar.style.width = `${percentage}%`;
      if (this.progressContainer) this.progressContainer.setAttribute("aria-valuenow", String(percentage));
      if (this.miniBar) this.miniBar.style.width = `${percentage}%`;
      if (this.miniPct) this.miniPct.textContent = `${percentage}%`;
      if (this.stats) this.stats.textContent = `Прогресс: ${percentage}% · Отмечено: ${done} / ${total}`;
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

    decorateSearch(value, query) {
      if (!value) return "";
      if (!query) return value;
      const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
      return value.replace(regex, '<mark class="highlight">$1</mark>');
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
