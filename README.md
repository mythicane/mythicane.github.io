# mythicane.github.io

Personal portfolio site — plain HTML/CSS/JS, no build step, no dependencies. Hosted free via [GitHub Pages](https://pages.github.com/) at **https://mythicane.github.io**.

## Pages

| File | Section |
|---|---|
| `index.html` | Home — full-screen hero reel, About (headshot, profile links, CV button), section bars |
| `poster-session.html` | Old poster gallery — no longer linked from the menu (Publications replaced it) |
| `publications.html` | Publications — title / description / link |
| `projects.html` | Projects — title / description / links |
| `fiction.html` | Fiction — title / description / PDF |
| `mentorship.html` | Mentorship |
| `blog.html` | Blog posts |
| `gallery.html` | Photo Gallery — interactive scroll timeline |

## Filling in real content

Everything is currently placeholder — gradients standing in for photos/posters, and `— untitled —` text standing in for real copy. Look for the `.placeholder-note` box at the top of each page's content for exactly what to swap.

- **Hero reel** — replace the placeholder `assets/video/reel.mp4` (and `assets/img/hero-poster.jpg`) with your own; same names, no code changes. See `assets/video/README.md`.
- **Headshot** — add `assets/img/headshot.jpg` (square). It replaces the placeholder circle automatically.
- **CV / Statement of Purpose** — add `assets/pdf/cv.pdf` and `assets/pdf/statement-of-purpose.pdf`. Each download button switches on by itself.
- **Twitch** — https://www.twitch.tv/gretonthatgrind (shown as "soon" until the channel is refreshed; same swap as below).
- **Google Scholar / OpenReview / ORCID** — in `index.html`, change `<span class="pl soon">Name <small>soon</small></span>` to `<a class="pl" href="URL" target="_blank" rel="noopener">Name</a>`.
- **Photos / posters** — each placeholder is a `<div>` with an inline CSS gradient (`style="--tc1:...;--tc2:..."` or `--pc1`/`--pc2`). Replace the `<div>` with an `<img src="assets/img/your-photo.jpg" alt="...">`, or keep the div and set `background-image` instead of the gradient — either works with the existing sizing/hover CSS.
- **Text entries** (Publications/Projects/Fiction/Mentorship/Blog) — each is one `.entry` block in the relevant `.html` file; copy/paste one to add more rows.
- **Poster session** — each `.poster-card` button carries `data-title`/`data-desc` attributes that feed the lightbox; edit those plus the `.poster-frame` gradient/image.
- **Gallery timeline** — each `.timeline-entry` in `gallery.html`; add the `flip` class to alternate which side the photo/copy sits on.

## Running locally

No build step — just open `index.html` in a browser, or serve the folder so relative asset paths resolve identically to production:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Deploying

This repo *is* the deployed site (GitHub Pages serves the `main` branch root directly for a `<username>.github.io` repo — Settings → Pages should already show it as live). Push to `main` and changes go live within a minute or two.

## Custom domain (later)

To point a real domain (e.g. `gretaperezhaiek.com`) at this site instead of `mythicane.github.io`:

1. Add a `CNAME` file at the repo root containing just the domain name.
2. At your domain registrar, add a `CNAME` record pointing the domain (or `www` subdomain) at `mythicane.github.io`, or `A` records pointing the apex domain at GitHub Pages' IPs (see [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).
3. In the repo's Settings → Pages, set the custom domain and enable "Enforce HTTPS" once DNS propagates.

## Design notes

- Palette: earthy — moss green `--moss`, river blue `--river`, dusty rose `--rose`, bark brown `--bark` (top of `assets/css/style.css`).

- Fonts: [Fraunces](https://fonts.google.com/specimen/Fraunces) (display/serif) + [Inter](https://fonts.google.com/specimen/Inter) (body), loaded from Google Fonts.
- Color system and all component styles live in `assets/css/style.css` as CSS custom properties at the top — change the palette there.
- All interactivity (overlay menu, scroll reveals, hero parallax, gallery timeline progress line, poster lightbox, CV-button check) is in `assets/js/main.js`, vanilla JS, no dependencies.
