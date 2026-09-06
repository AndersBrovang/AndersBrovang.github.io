// ---------------------------------------------------------------
// EDIT THIS DATA to make the site yours. Everything below renders
// straight from these arrays plus the letterhead/summary text in
// index.html.
// ---------------------------------------------------------------

const SKILLS = [
  { name: "Python", level: 80, note: "pandas, data cleaning/reconciliation" },
  { name: "Excel", level: 85, note: "formulas, pivot tables, audits" },
  { name: "Data analysis", level: 70, note: "reconciliation, QA checks" },
  { name: "SQL", level: 35, note: "learning" },
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
    courses: [
      { name: "Programming and Problem Solving" },
      { name: "Discrete Mathematics and Algorithms" },
      { name: "Linear Algebra" },
      { name: "Microeconomics A" },
      { name: "Econometrics A", inProgress: true },
      { name: "Numerical Methods and Analysis", inProgress: true },
    ],
  },
  {
    period: "2022 to 2025",
    title: "Biology, Mathematics & Business Economics",
    desc: '<span lang="da">Frederiksborg Gymnasium og HF</span>.',
  },
];

const PROJECTS = [
  {
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
    .map(
      (c) => `
      <li class="course${c.inProgress ? " course--in-progress" : ""}">
        ${c.name}${c.inProgress ? '<span class="course__note">in progress</span>' : ""}
      </li>`
    )
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

function renderProjects() {
  const list = document.getElementById("projects-list");
  if (!list) return;
  list.innerHTML = PROJECTS.map((p, i) => {
    const panelId = `project-detail-${i}`;
    const toggle = p.detail
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
      ${p.detail ? projectDetailMarkup(p, panelId) : ""}
    </article>`;
  }).join("");
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

function initModel() {
  const chart = document.getElementById("model-chart");
  if (!chart) return;

  const inputs = {
    cashFlow: document.getElementById("in-cf"),
    growth: document.getElementById("in-growth"),
    discount: document.getElementById("in-discount"),
    years: document.getElementById("in-years"),
  };
  const outputs = {
    cashFlow: document.getElementById("out-cf"),
    growth: document.getElementById("out-growth"),
    discount: document.getElementById("out-discount"),
    years: document.getElementById("out-years"),
    total: document.getElementById("out-npv"),
    label: document.getElementById("model-result-label"),
  };

  function update() {
    const assumptions = {
      cashFlow: Number(inputs.cashFlow.value),
      growth: Number(inputs.growth.value),
      discount: Number(inputs.discount.value),
      years: Number(inputs.years.value),
    };

    outputs.cashFlow.textContent = "DKK " + kr.format(assumptions.cashFlow);
    outputs.growth.textContent = assumptions.growth + "%";
    outputs.discount.textContent = assumptions.discount + "%";
    outputs.years.textContent = assumptions.years;

    const { rows, presentValue } = computeDcf(assumptions);
    chart.innerHTML = dcfChartMarkup(rows);
    outputs.label.textContent =
      "Present value of " + assumptions.years + " years of cash flow";
    outputs.total.textContent = "DKK " + kr.format(presentValue);
  }

  Object.values(inputs).forEach((input) =>
    input.addEventListener("input", update)
  );
  update();
}

// ---------------------------------------------------------------
// Footer date
// ---------------------------------------------------------------

function initFooterDate() {
  const el = document.getElementById("last-updated");
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
  initProjectToggles();
  initTheme();
  initPrint();
  initReveals();
  initSkillFills();
  initModel();
  initFooterDate();
});
