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
    period: "2025 to present",
    title: "Student Assistant, Data & Logistics",
    desc: "University hospital. Quality assurance and preparation of an equipment procurement list (20M+ DKK), including risk management and safety checks for operating-room equipment.",
  },
];

const EDUCATION = [
  {
    period: "2022 to 2025",
    title: "Biology, Mathematics & Business Economics",
    desc: "Frederiksborg Gymnasium og HF.",
  },
  {
    period: "2025 to 2028",
    title: "BSc Computer Science & Economics",
    desc: "University of Copenhagen.",
  },
];

const PROJECTS = [
  {
    title: "Financial Modelling Dashboard",
    tag: "Streamlit",
    desc: "An interactive Streamlit app for learning financial modelling hands-on: a loan/investment amortization calculator, a DCF valuation model, and a linked three-statement model, driven by typed assumptions or an uploaded CSV.",
    link: "https://github.com/AndersBrovang/financial-modelling-dashboard",
    linkLabel: "View on GitHub",
  },
  {
    title: "Stock EDA Dashboard",
    tag: "yfinance",
    desc: "A Streamlit dashboard for exploring any stock ticker: candlestick charts with 20/50-day moving averages, a volatility histogram of daily returns, and one-click CSV export, pulling live data from Yahoo Finance.",
    link: "https://github.com/AndersBrovang/Aktie-Dashboard",
    linkLabel: "View on GitHub",
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

function renderTimelineList(items, elementId) {
  const list = document.getElementById(elementId);
  if (!list) return;
  list.innerHTML = items.map(
    (t) => `
    <li class="timeline__item reveal">
      <span class="timeline__marker"></span>
      <span class="timeline__period mono">${t.period}</span>
      <h3 class="timeline__title">${t.title}</h3>
      <p class="timeline__desc">${t.desc}</p>
    </li>`
  ).join("");
}

function renderProjects() {
  const list = document.getElementById("projects-list");
  if (!list) return;
  list.innerHTML = PROJECTS.map(
    (p) => `
    <article class="project reveal">
      <div class="project__head">
        <h3 class="project__title">${p.title}</h3>
        <span class="project__tag mono">${p.tag}</span>
      </div>
      <p class="project__desc">${p.desc}</p>
      <a class="project__link" href="${p.link}" target="_blank" rel="noopener">${p.linkLabel}</a>
    </article>`
  ).join("");
}

// ---------------------------------------------------------------
// Theme toggle (persists via localStorage)
// ---------------------------------------------------------------

function initTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored || (prefersDark ? "dark" : "light");

  root.setAttribute("data-theme", initial);
  toggle.setAttribute("aria-pressed", String(initial === "dark"));

  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    toggle.setAttribute("aria-pressed", String(next === "dark"));
    toggle.setAttribute(
      "aria-label",
      next === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  });
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
  initTheme();
  initReveals();
  initSkillFills();
  initFooterDate();
});
