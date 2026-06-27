# LUMIO Coordia Intelligence — Redesign Brief for Claude Code

**Target site:** https://c48d783d.lumio-coordia-intelligence.pages.dev/  
**Design reference:** https://www.metalab.com/  
**Goal:** Elevate the site from "functional wireframe" to premium agency-quality design, inspired by Metalab's editorial boldness, dark contrast sections, and confident visual hierarchy.

---

## What's Wrong Right Now (in priority order)

### 1. Zero visual contrast between sections
The entire page sits on one flat beige/grey background (`~#e8e4dc`). Every section bleeds into the next with no differentiation. It reads like an unstyled prototype. Metalab alternates between black and white sections dramatically — we need that same contrast.

### 2. Generic accent colour
The blue used for section labels ("Starter", "Story", "Products", "Hong Kong accounting consultancy") looks like a default browser link colour. It signals "undesigned."

### 3. Blank placeholder cards in the portfolio grid
Two portfolio cards ("Work visibility" and "Professional presence") are completely empty white boxes — no image, just text. This looks broken. They have no image so need a fallback treatment.

### 4. Pricing cards are visually identical
All four pricing tiers (Starter, Growth, Premium, Custom) look exactly the same. There's no highlighted or recommended tier. High-converting pricing sections always visually elevate one option.

### 5. Personality-free typography
The type is legible but forgettable. No premium display font. No editorial character.

### 6. No visual rhythm or motion
No scroll animations, no hover states beyond the basics, no momentum. The site feels static.

### 7. Language switcher is cluttered
The EN / 中文 / 日本語 / 한국어 buttons float awkwardly top-right, looking like an afterthought.

---

## The Fix: Section-by-Section Instructions

### Global — Colour Palette
Replace the current palette with this:

```css
:root {
  --bg-light:     #f0ede6;   /* current beige, keep for hero */
  --bg-dark:      #111111;   /* new: deep charcoal for contrast sections */
  --bg-card:      #ffffff;   /* white cards */
  --text-primary: #0d0d0d;   /* headlines on light */
  --text-light:   #f5f5f5;   /* body text on dark sections */
  --text-muted:   #6b6b6b;
  --accent:       #c8a96e;   /* warm gold — more premium than default blue */
  --accent-dark:  #a07840;
  --border:       #e0ddd6;
}
```

Remove all instances of the default blue (`#3b5bdb` or similar). Replace every blue label, link, and CTA accent with `--accent` (#c8a96e).

### Global — Typography
Import a premium display font. Add to the `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

Apply:
```css
h1, h2, h3 { font-family: 'DM Serif Display', Georgia, serif; }
body, p, nav, button, a { font-family: 'DM Sans', system-ui, sans-serif; }
```

This gives the large headlines an editorial serif quality (like Metalab's bold display text) while keeping body copy clean and readable.

### Global — Section Spacing
Increase section vertical padding from whatever it currently is to at least `120px` top and bottom on desktop. Sections need room to breathe.

---

### NAV
- Condense the language switcher: replace the 4 text buttons with a single globe icon `🌐` that opens a small dropdown. This declutters the top-right massively.
- Nav links: slightly increase letter-spacing to `0.04em`, reduce font-size to `0.875rem` for elegance.
- "Get a website" button: give it a `--accent` background instead of solid black. `background: var(--accent); color: #fff;`

---

### HERO SECTION
Keep the light beige (`--bg-light`) background but add depth:
```css
#home {
  background: var(--bg-light);
  background-image: radial-gradient(ellipse at 80% 50%, rgba(200,169,110,0.08) 0%, transparent 60%);
}
```
- The hero headline is already large — good. Just apply the new `DM Serif Display` font.
- "View our work" (outlined button): change border colour from current default to `var(--accent)` and hover to `background: var(--accent); color: white`.
- "View website plans" (solid button): change background from black to `var(--accent)`.

---

### STORY SECTION  
**This section MUST go dark.** Give it `background: var(--bg-dark)` and all text `color: var(--text-light)`.

```css
#story {
  background: var(--bg-dark);
  color: var(--text-light);
}
#story p { color: rgba(245,245,245,0.75); }
```

This creates the dramatic light-to-dark transition that makes premium agency sites feel intentional. The content is "your website should make the next step obvious" — a dark, confident section is exactly right for that.

---

### PORTFOLIO SECTION
Background: stay light (`--bg-light`) to contrast with the dark Story section above.

**Fix the blank portfolio cards:**  
For any portfolio card without an image (currently "Work visibility" and "Professional presence"), replace the empty image area with a styled gradient placeholder:
```css
.portfolio-card--no-image .card-image {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}
```
Add a subtle pattern or the section title overlaid in large faint text so it doesn't look empty.

**Card hover states:** On hover, lift the card with `transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.12);` with a `0.3s ease` transition.

**Remove orange borders** (if any `border: 1px solid orange` or similar — looks accidental).

---

### PROCESS SECTION
Give this section a very subtle warm off-white to separate it from the portfolio:
```css
#help {
  background: #faf8f4;
}
```

**Add large step numbers as background decoration:**
```css
.process-step {
  position: relative;
}
.process-step::before {
  content: attr(data-step); /* add data-step="01", "02", "03" to HTML */
  position: absolute;
  top: -20px;
  left: -10px;
  font-size: 8rem;
  font-weight: 700;
  color: rgba(0,0,0,0.04);
  font-family: 'DM Serif Display', serif;
  line-height: 1;
  pointer-events: none;
}
```

---

### PRODUCTS / PRICING SECTION
**Background:** Give it a dark background like the Story section, OR a deep warm navy like `#1a1a2e`. This makes pricing feel premium and important.

```css
#products {
  background: var(--bg-dark);
  color: var(--text-light);
}
```

**Highlight the Growth (mid) tier:**  
The "Growth" card should be the visual standout — this is typically the most popular/profitable tier for an agency.

```css
.pricing-card--featured {
  border: 2px solid var(--accent);
  background: rgba(200,169,110,0.08);
  transform: scale(1.02);
  position: relative;
}
.pricing-card--featured::before {
  content: "Most Popular";
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent);
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  padding: 4px 16px;
  border-radius: 20px;
}
```

Add `class="pricing-card--featured"` to the Growth card in the HTML.

**Pricing card CTA buttons on dark background:** Make them `background: var(--accent); color: #fff;` instead of the current solid black.

---

### CONTACT / SUPPORT SECTION
Light background again (`--bg-light`) to close the page with warmth.

Style the form inputs with a cleaner look:
```css
.contact-form input,
.contact-form select,
.contact-form textarea {
  border: 1.5px solid var(--border);
  border-radius: 6px;
  padding: 12px 16px;
  font-size: 0.95rem;
  transition: border-color 0.2s ease;
  background: white;
}
.contact-form input:focus,
.contact-form select:focus,
.contact-form textarea:focus {
  border-color: var(--accent);
  outline: none;
}
```

Submit button: `background: var(--accent); color: white;`

---

### FOOTER (if one exists / add one if not)
Dark background matching the story/products sections. Include:
- LUMIO logo (white version)
- Nav links
- Copyright line
- ABN or jurisdiction note (it's an Australian business)

---

## Scroll Animations (Add These)
Add a simple intersection-observer-based fade-in for section elements. This single change makes a huge difference to perceived quality:

```js
// Add to a <script> tag at the bottom of the HTML
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section, .portfolio-card, .process-step, .pricing-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
```

```css
.visible {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
```

---

## What NOT to change
- The copywriting is good — clear, direct, professional. Don't touch it.
- The overall page structure and section order is solid.
- Mobile nav behaviour (keep it working).
- The form functionality.

---

## Priority Order (if doing in stages)

1. **Colour sections dark/light** (Story + Products go dark) — biggest visual impact
2. **Font upgrade** (DM Serif Display for headlines) — second biggest
3. **Accent colour** (replace blue with gold `#c8a96e` everywhere)
4. **Fix blank portfolio cards** (gradient fallback)
5. **Highlight Growth pricing tier**
6. **Scroll animations**
7. **Language switcher cleanup**
8. **Form styling**
