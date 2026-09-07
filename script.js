// ---------------------------------------------------------------
// EDIT THIS DATA to make the site yours. Everything below renders
// straight from these arrays plus the letterhead/summary text in
// index.html.
// ---------------------------------------------------------------

const SKILLS = [
  { name: "Python", level: 65, note: "pandas, data cleaning/reconciliation" },
  { name: "Excel", level: 85, note: "formulas, pivot tables, audits" },
  { name: "Data analysis", level: 70, note: "reconciliation, QA checks" },
];

const EXPERIENCE = [
  {
    period: "2026 to present",
    title: "Student Assistant (Temporary), Capital Region of Denmark",
    bullets: [
      "Responsible for quality assurance and preparation of a procurement list exceeding DKK 40 million, including risk management and safety checks on equipment.",
      "Participated in data extraction and systematic data cleaning and structuring in Python and Excel, with a focus on data quality prior to analysis.",
      "Developed a data-driven dashboard in Python that gave management a consolidated overview of key metrics and supported decision-making.",
    ],
  },
];

const EDUCATION = [
  {
    period: "2025 to 2028",
    title: "BSc Computer Science & Economics",
    desc: "University of Copenhagen.",
    coursesLabel: "Selected coursework",
    // Titles are the English equivalents of the Danish course names;
    // each link goes to the KU course description.
    courses: [
      {
        name: "Programming and Problem Solving",
        url: "https://kurser.ku.dk/course/ndab15009u/2025-2026",
      },
      {
        name: "Discrete Mathematics and Algorithms",
        url: "https://kurser.ku.dk/course/ndab23002u/2025-2026",
      },
      {
        name: "Linear Algebra",
        url: "https://kurser.ku.dk/course/nmab15002u/2025-2026",
      },
      {
        name: "Basic Statistics and Probability Theory",
        url: "https://kurser.ku.dk/course/ndab19003u/2025-2026",
      },
      {
        name: "Microeconomics A",
        url: "https://kurser.ku.dk/course/ndab19004u/2025-2026",
      },
      {
        name: "Econometrics A",
        url: "https://kurser.ku.dk/course/ndab20005u/2026-2027",
        inProgress: true,
      },
      {
        name: "Numerical Methods",
        url: "https://kurser.ku.dk/course/ndab22009u/2026-2027",
        inProgress: true,
      },
    ],
  },
  {
    period: "2022 to 2025",
    title: "Biology, Mathematics & Business Economics",
    desc: '<span lang="da">Frederiksborg Gymnasium og HF</span>.',
  },
];

// `group` decides which section of projects.html a project lands in.
// The CV page ignores it and just takes the first few.
const PROJECTS = [
  {
    group: "finance",
    title: "Financial Modelling Dashboard",
    tag: "Streamlit",
    desc: "Three financial models in one Streamlit app: a loan amortization schedule, a DCF valuation with terminal value, and a three-statement model linking income statement, cash flow and balance sheet. Each model runs either from typed assumptions or an uploaded CSV or Excel file, compares multiple scenarios side by side, and exports the full schedule as CSV.",
    link: "https://github.com/AndersBrovang/financial-modelling-dashboard",
    linkLabel: "View on GitHub",
    detail: {
      stack: ["Python", "Streamlit", "pandas", "numpy-financial", "Plotly", "openpyxl"],
      points: [
        "The amortization model builds a period-by-period schedule, splits every payment into interest and principal, and charts the remaining balance over the full term.",
        "The DCF model projects cash flows at a growth rate, discounts each year back to present value, and breaks the valuation down year by year rather than reporting a single number.",
        "The three-statement model takes revenue and debt assumptions and links them through to cash, PP&E, debt and equity, so the balance sheet moves when the assumptions do.",
        "Every model accepts an uploaded CSV or Excel file to run several scenarios at once, and exports its full schedule back out as CSV. Sample files are committed so it runs without any setup.",
      ],
    },
  },
  {
    group: "finance",
    title: "Stock EDA Dashboard",
    tag: "yfinance",
    desc: "Pulls live market data for any ticker from Yahoo Finance and renders it across three views: a Plotly candlestick chart with 20 and 50-day moving averages, a 50-bin histogram of daily returns for reading volatility, and a cleaned data table with one-click CSV export.",
    link: "https://github.com/AndersBrovang/Aktie-Dashboard",
    linkLabel: "View on GitHub",
    detail: {
      stack: ["Python", "Streamlit", "yfinance", "pandas", "Plotly"],
      points: [
        "Fetches OHLC history for any ticker on demand, then derives the 20 and 50-day simple moving averages and daily percentage returns with pandas rolling windows.",
        "Separates the technical view from the risk view deliberately: candlesticks answer where the price went, the returns histogram answers how violently it got there.",
        "The cleaned and derived dataset is downloadable as CSV, so the dashboard doubles as a data-prep step for further analysis.",
        "Built with a Danish interface.",
      ],
    },
  },
  {
    group: "numerical",
    title: "Simple Linear Regression",
    tag: "NumPy",
    desc: "Estimates y = β₀ + β₁x + u two independent ways so the answers can be checked against each other: the closed-form covariance solution, and the matrix normal equations (X'X)⁻¹X'y. Also reports R², the share of variation in y explained by x.",
    link: "https://github.com/AndersBrovang/slr",
    linkLabel: "View on GitHub",
    detail: {
      stack: ["Python", "NumPy"],
      points: [
        "slr_direct computes β₁ = cov(x, y) / var(x) and β₀ = ȳ - β₁x̄, the closed form you derive by hand.",
        "slr_matrix solves the same problem as β = (X'X)⁻¹X'y with X built as [1, x]. Same answer, but this is the form that generalises: adding regressors just means adding columns to X.",
        "Running both and checking they agree is the point of the exercise. Two derivations that must produce the same number give you a free test of whether either was implemented correctly.",
        "R² is computed as 1 - SSR/SST rather than pulled from a library, so the decomposition of variation stays visible.",
      ],
    },
  },
  {
    group: "numerical",
    title: "LU Decomposition",
    tag: "NumPy",
    desc: "Factors a square matrix into L and U with Gaussian elimination and partial pivoting, so that A = LU up to row order. L is unit lower triangular and doubles as a record of the elimination multipliers; U is what elimination leaves behind.",
    link: "https://github.com/AndersBrovang/LU-decomposition",
    linkLabel: "View on GitHub",
    detail: {
      stack: ["Python", "NumPy"],
      points: [
        "L is never computed separately. Every entry below the diagonal is the multiplier used to eliminate that position, so L ends up being a record of the elimination steps themselves.",
        "Partial pivoting picks the largest-magnitude entry in each column as the pivot before eliminating with it. Back-substitution divides by the pivot, so a pivot close to zero amplifies whatever rounding error already exists by roughly 1/pivot.",
        "Elimination runs on a float copy of A rather than on A itself, and each row swap is applied to both U and the already-filled part of L.",
        "Same underlying concern as the catastrophic cancellation experiment below: the algebra is exact, the arithmetic is not, and the implementation has to account for the gap.",
      ],
    },
  },
  {
    group: "numerical",
    title: "Catastrophic Cancellation",
    tag: "Python",
    desc: "A numerical-analysis experiment in floating point precision. Computing √(x+1) - √x directly loses most of its significant digits as x grows, because subtracting two near-equal numbers leaves mostly rounding error. Benchmarks the naive form against an algebraically equivalent rewrite at x from 10⁶ up to 10¹².",
    link: "https://github.com/AndersBrovang/catastrophic-cancellation",
    linkLabel: "View on GitHub",
    detail: {
      stack: ["Python"],
      points: [
        "Uses the identity √(x+1) - √x = 1 / (√(x+1) + √x). Both forms are exact in real arithmetic, but only one of them survives floating point.",
        "The direct form subtracts two numbers that agree in almost every significant digit, so the matching digits cancel and what is left is mostly rounding error. The rewrite removes the subtraction entirely.",
        "Evaluated at x = 10⁶, 10⁸, 10¹⁰ and 10¹², where the two forms visibly diverge as x grows.",
        "The same failure mode turns up in finance whenever you difference two large, nearly equal quantities, which is why it is worth recognising rather than debugging from scratch later.",
      ],
    },
  },
];

// The skills page. Every claim points at something a reader can go
// and check, rather than a number I assigned myself.
const SKILL_GROUPS = [
  {
    name: "Languages",
    skills: [
      {
        name: "Python",
        summary:
          "My main language. Used daily at work for cleaning and reconciling inventory data, and for every data or finance tool I build outside it.",
        evidence: [
          { label: "Financial Modelling Dashboard", url: "https://github.com/AndersBrovang/financial-modelling-dashboard" },
          { label: "Stock EDA Dashboard", url: "https://github.com/AndersBrovang/Aktie-Dashboard" },
          { label: "Simple Linear Regression", url: "https://github.com/AndersBrovang/slr" },
          { label: "LU Decomposition", url: "https://github.com/AndersBrovang/LU-decomposition" },
        ],
      },
    ],
  },
  {
    name: "Data and analysis",
    skills: [
      {
        name: "pandas",
        summary:
          "Rolling windows, derived columns, grouping and reshaping. Used for the moving averages and daily return series in the stock dashboard, and for cleaning at work.",
        evidence: [
          { label: "Stock EDA Dashboard", url: "https://github.com/AndersBrovang/Aktie-Dashboard" },
        ],
      },
      {
        name: "NumPy",
        summary:
          "Matrix work rather than array convenience: building design matrices, solving normal equations, and running elimination by hand instead of calling a solver.",
        evidence: [
          { label: "Simple Linear Regression", url: "https://github.com/AndersBrovang/slr" },
          { label: "LU Decomposition", url: "https://github.com/AndersBrovang/LU-decomposition" },
        ],
      },
      {
        name: "Data cleaning and reconciliation",
        summary:
          "Extracting, cleaning and structuring data so it can be trusted before anyone analyses it. This is the bulk of what I do at the Capital Region of Denmark.",
        evidence: [],
      },
      {
        name: "Excel",
        summary:
          "Formulas, pivot tables and audit work. Used alongside Python on the procurement list, where the spreadsheet is still the format everyone else works in.",
        evidence: [],
      },
      {
        name: "Numerical methods",
        summary:
          "Knowing where floating point arithmetic quietly breaks and how to work around it: rewriting an expression to avoid cancellation, or pivoting so elimination does not divide by something near zero.",
        evidence: [
          { label: "Catastrophic Cancellation", url: "https://github.com/AndersBrovang/catastrophic-cancellation" },
          { label: "LU Decomposition", url: "https://github.com/AndersBrovang/LU-decomposition" },
        ],
      },
      {
        name: "Regression",
        summary:
          "Ordinary least squares from both sides: the closed form you derive by hand, and the matrix formulation that generalises to more regressors. Currently taking Econometrics A.",
        evidence: [
          { label: "Simple Linear Regression", url: "https://github.com/AndersBrovang/slr" },
        ],
      },
    ],
  },
  {
    name: "Financial modelling",
    skills: [
      {
        name: "DCF valuation",
        summary:
          "Projecting cash flows, discounting them back to present value, and handling terminal value. Built as a model rather than a spreadsheet formula.",
        evidence: [
          { label: "Financial Modelling Dashboard", url: "https://github.com/AndersBrovang/financial-modelling-dashboard" },
          { label: "Live model", url: "models.html" },
        ],
      },
      {
        name: "Amortization schedules",
        summary:
          "Period-by-period loan and investment schedules, splitting each payment into interest and principal.",
        evidence: [
          { label: "Financial Modelling Dashboard", url: "https://github.com/AndersBrovang/financial-modelling-dashboard" },
        ],
      },
      {
        name: "Three-statement modelling",
        summary:
          "Linking revenue and debt assumptions through the income statement, cash flow and balance sheet so the three move together.",
        evidence: [
          { label: "Financial Modelling Dashboard", url: "https://github.com/AndersBrovang/financial-modelling-dashboard" },
        ],
      },
    ],
  },
  {
    name: "Tools",
    skills: [
      {
        name: "Streamlit",
        summary: "The front end for both dashboards: inputs, tabs, file upload and CSV export.",
        evidence: [],
      },
      {
        name: "Plotly",
        summary: "Candlestick charts, histograms and interactive figures.",
        evidence: [],
      },
      {
        name: "Git and GitHub",
        summary: "Version control for everything here, including this site.",
        evidence: [],
      },
    ],
  },
  {
    name: "Currently learning",
    skills: [
      {
        name: "SQL",
        summary:
          "Selects, filtering and joins so far. Not yet at the point where I would put it on the list above.",
        evidence: [],
      },
      {
        name: "Machine learning",
        summary:
          "Starting from the regression end rather than the framework end, so that the statistics are in place before the tooling.",
        evidence: [],
      },
      {
        name: "Financial modelling",
        summary:
          "Building the models has taught me the mechanics. The valuation theory underneath them is what I am working through next.",
        evidence: [],
      },
    ],
  },
];

// ---------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------

function renderSkills() {
  const list = document.getElementById("skills-list");
  if (!list) return;
  list.innerHTML = SKILLS.map(
    (s) => `
    <li class="skill__row reveal" data-level="${s.level}">
      <span class="skill__name">${s.name}<br><span class="skill__note">${s.note}</span></span>
      <span class="skill__track"><span class="skill__fill"></span></span>
      <span class="skill__pct mono">${s.level}%</span>
    </li>`
  ).join("");
}

function courseListMarkup(item) {
  const chips = item.courses
    .map((c) => {
      // Add a `url` to a course to turn its chip into a real link.
      const classes =
        "course" +
        (c.inProgress ? " course--in-progress" : "") +
        (c.url ? " course--link" : "");
      const inner =
        c.name +
        (c.inProgress ? '<span class="course__note">in progress</span>' : "");

      return c.url
        ? `<li><a class="${classes}" href="${c.url}" target="_blank" rel="noopener">${inner}</a></li>`
        : `<li><span class="${classes}">${inner}</span></li>`;
    })
    .join("");

  return `
    <div class="courses">
      <span class="courses__label">${item.coursesLabel || "Selected coursework"}</span>
      <ul class="courses__list">${chips}</ul>
    </div>`;
}

function renderTimelineList(items, elementId) {
  const list = document.getElementById(elementId);
  if (!list) return;
  list.innerHTML = items.map(
    (t) => `
    <li class="timeline__item reveal">
      <span class="timeline__marker"></span>
      <span class="timeline__period mono">${t.period}</span>
      <h3 class="timeline__title">${t.title}</h3>
      ${t.desc ? `<p class="timeline__desc">${t.desc}</p>` : ""}
      ${t.bullets ? `<ul class="timeline__bullets">${t.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>` : ""}
      ${t.courses ? courseListMarkup(t) : ""}
    </li>`
  ).join("");
}

function projectDetailMarkup(project, panelId) {
  const stack = project.detail.stack
    ? `<ul class="project__stack">${project.detail.stack
        .map((s) => `<li class="mono">${s}</li>`)
        .join("")}</ul>`
    : "";
  const points = `<ul class="project__points">${project.detail.points
    .map((p) => `<li>${p}</li>`)
    .join("")}</ul>`;

  return `
    <div class="project__detail" id="${panelId}">
      <div class="project__detail-inner">
        ${stack}
        ${points}
      </div>
    </div>`;
}

// Each container declares what it wants through data attributes:
// data-group picks one section of PROJECTS, data-detail="false" drops
// the expandable panels, data-limit caps how many are shown. That way
// every page calls this the same way.
function renderProjects() {
  document.querySelectorAll("[data-projects]").forEach((list) => {
    const group = list.dataset.group;
    const withDetail = list.dataset.detail !== "false";
    const limit = Number(list.dataset.limit) || PROJECTS.length;
    const chosen = PROJECTS.filter((p) => !group || p.group === group).slice(0, limit);

    list.innerHTML = chosen.map((p) => {
      // Index into PROJECTS, so panel ids stay unique across containers.
      const panelId = `project-detail-${PROJECTS.indexOf(p)}`;
    const showDetail = withDetail && p.detail;
    const toggle = showDetail
      ? `<button class="project__toggle" type="button"
                 aria-expanded="false" aria-controls="${panelId}">
           <svg class="project__chevron" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" aria-hidden="true">
             <polyline points="6 9 12 15 18 9"/>
           </svg>
           <span class="project__toggle-label">More detail</span>
         </button>`
      : "";

    return `
    <article class="project reveal">
      <div class="project__head">
        <h3 class="project__title">${p.title}</h3>
        <span class="project__tag mono">${p.tag}</span>
      </div>
      <p class="project__desc">${p.desc}</p>
      <div class="project__actions">
        <a class="project__link" href="${p.link}" target="_blank" rel="noopener">${p.linkLabel}</a>
        ${toggle}
      </div>
      ${showDetail ? projectDetailMarkup(p, panelId) : ""}
    </article>`;
    }).join("");
  });
}

function renderSkillGroups() {
  const list = document.getElementById("skill-groups");
  if (!list) return;
  list.innerHTML = SKILL_GROUPS.map(
    (group) => `
    <section class="cv-block skill-group">
      <h2 class="cv-block__title">${group.name}</h2>
      <div class="skill-group__items">
        ${group.skills
          .map(
            (s) => `
          <article class="skill-card reveal">
            <h3 class="skill-card__name">${s.name}</h3>
            <p class="skill-card__summary">${s.summary}</p>
            ${
              s.evidence && s.evidence.length
                ? `<div class="skill-card__evidence">
                     <span class="skill-card__evidence-label">Where I have used it</span>
                     <ul class="skill-card__links">
                       ${s.evidence
                         .map((e) => {
                           const external = e.url.startsWith("http");
                           const attrs = external
                             ? ' target="_blank" rel="noopener"'
                             : "";
                           return `<li><a class="course course--link" href="${e.url}"${attrs}>${e.label}</a></li>`;
                         })
                         .join("")}
                     </ul>
                   </div>`
                : ""
            }
          </article>`
          )
          .join("")}
      </div>
    </section>`
  ).join("");
}

// Progressive disclosure: keep the CV scannable, but let a reader who
// is actually interested open up the detail.
function initProjectToggles() {
  document.querySelectorAll(".project__toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const panel = document.getElementById(
        toggle.getAttribute("aria-controls")
      );
      if (!panel) return;

      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.classList.toggle("is-open", !open);
      panel.classList.toggle("is-open", !open);
      toggle.querySelector(".project__toggle-label").textContent = open
        ? "More detail"
        : "Less detail";
    });
  });
}

// ---------------------------------------------------------------
// Theme toggle (persists via localStorage)
// ---------------------------------------------------------------

// The theme itself is applied by the inline script in <head> so there
// is no flash of the wrong theme on load. This only wires the button.
function initTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const syncLabel = (theme) => {
    toggle.setAttribute("aria-pressed", String(theme === "dark"));
    toggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  };

  syncLabel(root.getAttribute("data-theme"));

  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    syncLabel(next);
  });
}

// ---------------------------------------------------------------
// Collapsible nav rail
//
// The collapsed state is applied by the inline script in <head> so the
// layout does not jump on load. This only wires the button.
// ---------------------------------------------------------------

function initNavToggle() {
  const toggle = document.getElementById("nav-toggle");
  if (!toggle) return;
  const root = document.documentElement;

  const sync = () => {
    const collapsed = root.classList.contains("nav-collapsed");
    toggle.setAttribute("aria-expanded", String(!collapsed));
    toggle.setAttribute(
      "aria-label",
      collapsed ? "Expand navigation" : "Collapse navigation"
    );
  };

  sync();

  toggle.addEventListener("click", () => {
    const collapsed = root.classList.toggle("nav-collapsed");
    try {
      localStorage.setItem("nav", collapsed ? "collapsed" : "open");
    } catch (e) {}
    sync();
  });
}

// ---------------------------------------------------------------
// Print / save as PDF
// ---------------------------------------------------------------

function initPrint() {
  const button = document.getElementById("print-cv");
  if (!button) return;
  button.addEventListener("click", () => window.print());
}

// ---------------------------------------------------------------
// Scroll-triggered reveals (timeline, projects, skill rows)
// ---------------------------------------------------------------

function initReveals() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  items.forEach((item) => observer.observe(item));
}

// ---------------------------------------------------------------
// Skill bar fill — runs once on load so it never depends on
// scrolling a row into view first.
// ---------------------------------------------------------------

function initSkillFills() {
  const fills = document.querySelectorAll(".skill__fill");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      fills.forEach((fill) => {
        const level = fill.closest(".skill__row").getAttribute("data-level");
        fill.style.width = level + "%";
      });
    });
  });
}

// ---------------------------------------------------------------
// Live DCF model
//
// Same discounting maths as the Financial Modelling Dashboard:
// each year's cash flow grows at `growth`, then gets discounted back
// to today at `discount`. Drawn as an inline SVG, no chart library.
// ---------------------------------------------------------------

const kr = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });

function computeDcf({ cashFlow, growth, discount, years }) {
  const rows = [];
  let presentValue = 0;

  for (let year = 1; year <= years; year++) {
    const nominal = cashFlow * Math.pow(1 + growth / 100, year - 1);
    const discounted = nominal / Math.pow(1 + discount / 100, year);
    presentValue += discounted;
    rows.push({ year, nominal, discounted });
  }

  return { rows, presentValue };
}

function dcfChartMarkup(rows) {
  const width = 320;
  const height = 116;
  const baseline = height - 16; // leave room for the year labels
  const top = 6;
  const peak = Math.max(...rows.map((r) => r.nominal));
  const slot = width / rows.length;
  const nominalWidth = Math.min(slot * 0.62, 30);
  const valueWidth = nominalWidth * 0.56;

  const scale = (value) => ((value / peak) * (baseline - top)) || 0;

  return rows
    .map((row) => {
      const centre = slot * (row.year - 0.5);
      const nominalHeight = scale(row.nominal);
      const valueHeight = scale(row.discounted);

      return `
        <rect class="model__bar-nominal"
              x="${(centre - nominalWidth / 2).toFixed(2)}"
              y="${(baseline - nominalHeight).toFixed(2)}"
              width="${nominalWidth.toFixed(2)}"
              height="${nominalHeight.toFixed(2)}" rx="1.5"/>
        <rect class="model__bar-value"
              x="${(centre - valueWidth / 2).toFixed(2)}"
              y="${(baseline - valueHeight).toFixed(2)}"
              width="${valueWidth.toFixed(2)}"
              height="${valueHeight.toFixed(2)}" rx="1.5"/>
        <text class="model__axis" x="${centre.toFixed(2)}" y="${height - 4}"
              text-anchor="middle">${row.year}</text>`;
    })
    .join("") +
    `<line class="model__baseline" x1="0" y1="${baseline}" x2="${width}" y2="${baseline}"/>`;
}

// Seeded generator, so nudging a slider widens or narrows the same
// fan instead of reshuffling every path. "Resample" draws a new seed.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Box-Muller: two uniforms in, one normal draw out.
function normalDraw(random, mean, sd) {
  let u = 0;
  let v = 0;
  while (u === 0) u = random();
  while (v === 0) v = random();
  return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function simulateDcf(assumptions, volatility, runs, seed) {
  const { cashFlow, growth, discount, years } = assumptions;
  const random = mulberry32(seed);
  const rate = 1 + discount / 100;
  const paths = [];
  const values = [];

  for (let run = 0; run < runs; run++) {
    const path = [cashFlow];
    let presentValue = cashFlow / rate;

    for (let year = 2; year <= years; year++) {
      const drawn = normalDraw(random, growth, volatility) / 100;
      // A year can wipe out most of the cash flow, but not flip its sign.
      const next = path[path.length - 1] * (1 + Math.max(drawn, -0.95));
      path.push(next);
      presentValue += next / Math.pow(rate, year);
    }

    paths.push(path);
    values.push(presentValue);
  }

  return { paths, values };
}

function percentile(sorted, p) {
  if (!sorted.length) return 0;
  const index = Math.min(
    sorted.length - 1,
    Math.max(0, Math.round((p / 100) * (sorted.length - 1)))
  );
  return sorted[index];
}

function simChartMarkup(paths, values, years) {
  const width = 640;
  const height = 190;
  const baseline = height - 18;
  const top = 8;

  // Scale to the 95th percentile of all plotted points so a couple of
  // runaway paths cannot flatten everything else into the floor.
  const allPoints = paths.flat().sort((a, b) => a - b);
  const ceiling = percentile(allPoints, 95) || 1;
  const stepX = years > 1 ? width / (years - 1) : width;
  const toY = (value) =>
    baseline - Math.min(value / ceiling, 1.08) * (baseline - top);

  const pointsFor = (path) =>
    path.map((v, i) => `${(i * stepX).toFixed(1)},${toY(v).toFixed(1)}`).join(" ");

  // Statistics use every run; only a sample gets drawn, to keep the
  // fan readable and the re-render cheap.
  const drawLimit = 100;
  const stride = Math.max(1, Math.ceil(paths.length / drawLimit));
  let fan = "";
  for (let i = 0; i < paths.length; i += stride) {
    fan += `<polyline class="sim__path" points="${pointsFor(paths[i])}"/>`;
  }

  // Highlight a real path: the one whose present value is the median.
  const ranked = values
    .map((value, index) => ({ value, index }))
    .sort((a, b) => a.value - b.value);
  const medianPath = paths[ranked[Math.floor(ranked.length / 2)].index];

  const axis = Array.from({ length: years }, (_, i) => {
    const x = Math.min(Math.max(i * stepX, 8), width - 8);
    return `<text class="sim__axis" x="${x.toFixed(1)}" y="${height - 4}"
             text-anchor="middle">${i + 1}</text>`;
  }).join("");

  return `
    <clipPath id="sim-clip"><rect x="0" y="0" width="${width}" height="${baseline}"/></clipPath>
    <g clip-path="url(#sim-clip)">
      ${fan}
      <polyline class="sim__median" points="${pointsFor(medianPath)}"/>
    </g>
    <line class="sim__baseline" x1="0" y1="${baseline}" x2="${width}" y2="${baseline}"/>
    ${axis}`;
}

function initModel() {
  const chart = document.getElementById("model-chart");
  if (!chart) return;

  const simChart = document.getElementById("sim-chart");

  const inputs = {
    cashFlow: document.getElementById("in-cf"),
    growth: document.getElementById("in-growth"),
    discount: document.getElementById("in-discount"),
    years: document.getElementById("in-years"),
    volatility: document.getElementById("in-vol"),
    runs: document.getElementById("in-runs"),
  };
  const outputs = {
    cashFlow: document.getElementById("out-cf"),
    growth: document.getElementById("out-growth"),
    discount: document.getElementById("out-discount"),
    years: document.getElementById("out-years"),
    volatility: document.getElementById("out-vol"),
    runs: document.getElementById("out-runs"),
    total: document.getElementById("out-npv"),
    label: document.getElementById("model-result-label"),
    p10: document.getElementById("sim-p10"),
    p50: document.getElementById("sim-p50"),
    p90: document.getElementById("sim-p90"),
  };

  let seed = 20260906;
  let queued = false;

  function render() {
    const assumptions = {
      cashFlow: Number(inputs.cashFlow.value),
      growth: Number(inputs.growth.value),
      discount: Number(inputs.discount.value),
      years: Number(inputs.years.value),
    };
    const volatility = Number(inputs.volatility.value);
    const runs = Number(inputs.runs.value);

    outputs.cashFlow.textContent = "DKK " + kr.format(assumptions.cashFlow);
    outputs.growth.textContent = assumptions.growth + "%";
    outputs.discount.textContent = assumptions.discount + "%";
    outputs.years.textContent = assumptions.years;
    outputs.volatility.textContent = "±" + volatility + "%";
    outputs.runs.textContent = kr.format(runs);

    // Deterministic view.
    const { rows, presentValue } = computeDcf(assumptions);
    chart.innerHTML = dcfChartMarkup(rows);
    outputs.label.textContent =
      "Present value of " + assumptions.years + " years of cash flow";
    outputs.total.textContent = "DKK " + kr.format(presentValue);

    // Simulated view.
    const { paths, values } = simulateDcf(assumptions, volatility, runs, seed);
    simChart.innerHTML = simChartMarkup(paths, values, assumptions.years);

    const sorted = values.slice().sort((a, b) => a - b);
    outputs.p10.textContent = "DKK " + kr.format(percentile(sorted, 10));
    outputs.p50.textContent = "DKK " + kr.format(percentile(sorted, 50));
    outputs.p90.textContent = "DKK " + kr.format(percentile(sorted, 90));
  }

  // Dragging a slider fires continuously; only redraw once per frame.
  function update() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      render();
    });
  }

  Object.values(inputs).forEach((input) =>
    input.addEventListener("input", update)
  );

  const resample = document.getElementById("sim-resample");
  if (resample) {
    resample.addEventListener("click", () => {
      seed = (Math.random() * 4294967296) >>> 0;
      render();
    });
  }

  render();
}

// ---------------------------------------------------------------
// Footer date
// ---------------------------------------------------------------

function initFooterDate() {
  const el = document.getElementById("last-updated");
  if (!el) return;
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  el.textContent = `${dd}/${mm}/${now.getFullYear()}`;
}

// ---------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderTimelineList(EXPERIENCE, "experience-list");
  renderTimelineList(EDUCATION, "education-list");
  renderProjects();
  renderSkillGroups();
  initProjectToggles();
  initTheme();
  initNavToggle();
  initPrint();
  initReveals();
  initSkillFills();
  initModel();
  initFooterDate();
});
