# CV site

Plain HTML/CSS/JS, no build step, no dependencies except two Google Fonts
loaded via CDN link. Three files: `index.html`, `style.css`, `script.js`.

## Deploy to GitHub Pages (5 minutes)

1. Create a new repo on GitHub named exactly `yourusername.github.io`
   (replace `yourusername` with your actual GitHub username — this exact
   naming is what makes GitHub serve it automatically, no config needed).
2. Put these three files in the root of that repo.
3. Push:
   ```
   git init
   git add .
   git commit -m "first version of cv site"
   git branch -M main
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git push -u origin main
   ```
4. Wait about a minute, then visit `https://yourusername.github.io`.

If you'd rather keep it as a project page instead of your main profile site
(e.g. repo named `cv-site` instead), push the same way, then go to
**Settings → Pages** in the repo and set the source to the `main` branch —
it'll be live at `https://yourusername.github.io/cv-site`.

## What to edit before you publish

**In `index.html`:**
- Replace "Alex Nielsen" (appears in `<title>`, header, hero) with your name.
- Rewrite the hero headline and lede paragraph — they're written from a
  specific angle (data + logistics + QA). Adjust if your emphasis differs.
- Update the `<meta name="description">` tag.
- Replace the email, GitHub, and LinkedIn links in the contact section.

**In `script.js`:**
- `SKILLS` — name, level (0–100, drives the bar length), and note per skill.
- `TIMELINE` — period, title, description. Order matters, it renders top to
  bottom.
- `PROJECTS` — title, tag, description, and a real link per project. Add or
  remove entries freely; the layout handles any number.

Nothing else needs touching — all three lists render themselves.

## Notes

- Dark mode is saved in the visitor's browser (`localStorage`) and otherwise
  follows their OS preference on first visit.
- Timeline and project cards animate in on scroll; this respects
  `prefers-reduced-motion` for visitors who have that OS setting on.
- No analytics, no tracking, no cookies — nothing to disclose.
