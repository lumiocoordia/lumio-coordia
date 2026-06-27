# LUMIO Coordia Intelligence — Redesign Implementation Brief

**Live site:** https://c48d783d.lumio-coordia-intelligence.pages.dev/
**Deploy method:** GitHub → Cloudflare Pages auto-deploy (push to main = live)
**Approved design file:** `lumio-korda.html` (in this same folder as this CLAUDE.md)

---

## Your job — one sentence

Replace the existing `index.html` with the contents of `lumio-korda.html`, add `bulb.jpg` to the repo root, then commit and push.

---

## Step 1 — Find the repo's index.html

```bash
ls -la
ls public/ 2>/dev/null || true
ls src/ 2>/dev/null || true
```

Look for `index.html`. This is a plain static site — no build step. The file is most likely at the repo root.

---

## Step 2 — Replace index.html completely

The new design is fully self-contained in `lumio-korda.html`. Replace the entire existing `index.html` with it:

```bash
cp lumio-korda.html index.html
```

**Do not merge or patch** — this is a full file replacement. All CSS and JS are inline. Google Fonts loads from CDN.

---

## Step 3 — Add bulb.jpg

The hero animation uses `<img src="bulb.jpg">` as a background layer behind the canvas orbital animation. Place `bulb.jpg` in the same directory as `index.html` (repo root).

- If the client provides `bulb.jpg`, copy it to the repo root
- If it's missing, the page still works — the canvas orbital animation runs without the image

```bash
# Example if bulb.jpg is in the same folder as this CLAUDE.md:
cp bulb.jpg /path/to/repo/bulb.jpg
```

---

## Step 4 — Verify these key details are correct in index.html

Open the newly copied `index.html` and confirm these are present as-is:

### Logo
```html
<img alt="LUMIO Coordia Intelligence"
     src="https://c48d783d.lumio-coordia-intelligence.pages.dev/assets/lumio-logo-lockup.png">
```
This URL points to the existing live site asset — it will resolve correctly after deploy. No change needed.

### Hero slogan (confirm exact text)
```
Simple websites. Serious results.
```

### Hero badge (confirm exact text)
```
Digital growth for small businesses
```

### Portfolio flip cards — confirm all 5 cards are present with correct URLs

| Card | Front title | Back screenshot URL | Visit link |
|---|---|---|---|
| 01 | Long Ieng | `https://s.wordpress.com/mshots/v1/https%3A%2F%2Flongiengma.com%2F?w=900&h=600` | https://longiengma.com/ |
| 02 | Macau World Travel | `https://s.wordpress.com/mshots/v1/https%3A%2F%2Fmacau-world-travel-agency.pages.dev%2F?w=900&h=600` | https://macau-world-travel-agency.pages.dev/ |
| 03 | Stayflow Homestay | `https://s.wordpress.com/mshots/v1/https%3A%2F%2Fstayflow-homestay-landing.pages.dev?w=900&h=600` | https://stayflow-homestay-landing.pages.dev |
| 04 | Work Visibility | — (shows "In progress") | — |
| 05 | Professional Presence | — (shows "In progress") | — |

The screenshots auto-generate via WordPress mshots — no API key needed. First load may take 5–10 seconds, then cached.

### WhatsApp link (do not change)
```
https://wa.me/60406300802
```

### Pricing tiers (do not change)
- Starter — AUD 990+
- Growth — AUD 2,500+ (featured, "Most Popular" badge)
- Premium — AUD 5,000+
- Custom — Quote

---

## Step 5 — Commit and push

```bash
git add -A
git commit -m "feat: full redesign — dark theme, canvas hero, flip card portfolio, gold accent"
git push origin main
```

Cloudflare Pages auto-deploys within ~60 seconds of the push.

**Verify live at:** https://c48d783d.lumio-coordia-intelligence.pages.dev/

---

## What changed vs the old site

| Area | Before | After |
|---|---|---|
| Hero | Video background | Full-screen atomic canvas animation, black bg |
| Hero slogan | "Make your business easy to understand…" | **"Simple websites. Serious results."** |
| Hero badge | "Websites for growing Australian businesses" | **"Digital growth for small businesses"** |
| Nav | Light beige pills | Frosted glass pills on black |
| Fonts | System sans | Inter Tight + Inter (Google Fonts) |
| Dark sections | None | Hero, Story, Process accordion, Pricing, Footer all `#000` |
| Portfolio | Horizontal rows | **Flip cards** — hover reveals live site screenshot |
| Accent colour | Blue `#3b82f6` | Gold `#c8a96e` throughout |
| Animations | None | Scroll reveal, fill sweep, accordion, marquee |
| Cursor | Default | Custom mix-blend-mode cursor |

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Canvas animation not running | Check browser console — confirm `<canvas id="hero-canvas">` exists and script at bottom of file executes |
| Logo not showing | Logo URL points to live CDN — will resolve after deploy. Check network tab post-deploy |
| bulb.jpg 404 in console | Add `bulb.jpg` to repo root, or ignore — page works without it |
| Portfolio screenshots grey/blank | Normal on first visit. mshots generates on demand. Reload after 10 seconds |
| Cloudflare not deploying | Check Cloudflare Pages dashboard → your project → Deployments for build logs |
