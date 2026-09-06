// ---------------------------------------------------------------
// EDIT THIS DATA to make the site yours. Everything below renders
// straight from these three arrays plus the hero/about text in
// index.html.
// ---------------------------------------------------------------

const SKILLS = [
  { name: "Python", level: 80, note: "pandas, data cleaning/reconciliation" },
  { name: "Excel", level: 85, note: "formulas, pivot tables, audits" },
  { name: "Data analysis", level: 70, note: "reconciliation, QA checks" },
  { name: "SQL", level: 35, note: "learning" },
  { name: "Power BI", level: 40, note: "basic dashboards" },
];

const TIMELINE = [
  {
    period: "2025 — 2028",
    title: "BSc Computer Science & Economics",
    desc: "University of Copenhagen.",
  },
  {
    period: "2025 — present",
    title: "Student Assistant, Data & Logistics",
    desc: "University hospital. Quality assurance and preparation of an equipment procurement list (20M+ DKK), including risk management and safety checks for operating-room equipment.",
  },
  {
    period: "2025",
    title: "Sterile tray reconciliation project",
    desc: "Wrote a Python script to reconcile tray counts between an old and a newly rebuilt inventory sheet, matched by product number, to catch discrepancies before rollout.",
  },
];

const PROJECTS = [
  {
    title: "Sterile tray reconciliation tool",
    tag: "Python",
    desc: "A script that compares two versions of a hospital inventory spreadsheet — old and rebuilt — matches items by product number, and flags mismatched tray counts before the new sheet goes live.",
    link: "#",
    linkLabel: "View on GitHub",
  },
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
  list.innerHTML = SKILLS.map(
    (s) => `
    <li class="skill__row reveal" data-level="${s.level}">
      <span class="skill__name">${s.name}<br><span class="skill__note">${s.note}</span></span>
      <span class="skill__track"><span class="skill__fill"></span></span>
      <span class="skill__pct mono">${s.level}%</span>
    </li>`
  ).join("");
}

function renderTimeline() {
  const list = document.getElementById("timeline");
  list.innerHTML = TIMELINE.map(
    (t, i) => `
    <li class="timeline__item reveal">
      <span class="timeline__marker mono">${i + 1}</span>
      <span class="timeline__period mono">${t.period}</span>
      <h3 class="timeline__title">${t.title}</h3>
      <p class="timeline__desc">${t.desc}</p>
    </li>`
  ).join("");
}

function renderProjects() {
  const list = document.getElementById("projects-list");
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
// Scroll-triggered reveals (timeline, projects, skill bars)
// ---------------------------------------------------------------

function initReveals() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          const level = entry.target.getAttribute("data-level");
          if (level) {
            const fill = entry.target.querySelector(".skill__fill");
            if (fill) fill.style.width = level + "%";
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  items.forEach((item) => observer.observe(item));
}

// ---------------------------------------------------------------
// Hero stamp landing animation (once, on load)
// ---------------------------------------------------------------

function initStamp() {
  const stamp = document.querySelector(".stamp-svg");
  requestAnimationFrame(() => stamp.classList.add("stamp-in"));
}

// ---------------------------------------------------------------
// Footer date
// ---------------------------------------------------------------

function initFooterDate() {
  const el = document.getElementById("last-updated");
  el.textContent = new Date().toISOString().slice(0, 10);
}

// ---------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderTimeline();
  renderProjects();
  initTheme();
  initReveals();
  initStamp();
  initFooterDate();
});
