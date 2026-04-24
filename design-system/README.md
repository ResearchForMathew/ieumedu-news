# 이음교육저널 Design System

**Brand:** 이음교육저널 (Ieum Education Journal)
**Domain:** news.ieumedu.kr
**Type:** 교육·심리 online editorial journal — 인터넷신문 등록 대상
**Operating body:** 이음통합평생교육원 (separate site: ieumedu.or.kr)
**Stack:** static HTML/CSS (no build system), GitHub Pages deploy

---

## What this journal is

이음교육저널 reads the **night's emotion** and the **day's education** on a single page — an online journal that treats infant sleep, adolescent rhythm, development and attachment, and questions from educational fields in a single, integrated voice. It is explicitly **not** a health-tips site; it refuses to treat personal suffering as "self-management failure" and instead translates clinical and field language into public prose.

The overall feel is "**the digital edition of a Korean independent academic journal**" — refined editorial, unhurried, reading-first.

### Four founding principles (shown on homepage)

1. Context of emotion and development before fragmented health information.
2. Personal suffering is never framed as self-management failure.
3. The field's language, translated into public prose.
4. Cases anonymized; ads and articles kept strictly separate.

### Core subjects
- 생애주기와 수면 (sleep across the lifecycle)
- 발달과 애착 (development & attachment)
- 교육현장 (classroom / special & integrated education)
- 연구와 기록 (research archive: books, papers, media coverage)

---

## Source materials

- **Codebase (read-only, mounted):** `news.ieumedu.kr/` — static HTML/CSS site
  - `index.html`, `homepage-redesign.css` — current redesign (warm beige + pine teal)
  - `styles.css` — legacy article-page styles (warmer sepia system, being phased out)
  - `articles/*.html` — 7 articles + editor's note
  - `assets/articles/*`, `assets/archive/*` — article hero images
  - `기사화-편성안.md`, `브런치북-칼럼-검토.md`, `운영가이드.md` — editorial plans (Korean)
- **Spec document:** `uploads/CLAUDE.md` — the refactor brief defining tokens, typography,
  and the "exceed the mockup" mandate. This design system is the answer to that brief.
- **Related site:** ieumedu.or.kr — 이음통합평생교육원 (parent org, separate operation)

---

## What's in this system

| File / folder | Purpose |
|---|---|
| `colors_and_type.css` | All CSS custom properties: palette, fonts, type scale, spacing, radii, shadows, motion. Semantic text classes (`.ds-h1`, `.ds-kicker`, …). |
| `assets/articles/` | Article hero images lifted from the live site |
| `assets/archive/` | Archive cover imagery |
| `assets/books/` | Book and archive cover imagery used by the research archive mock |
| `preview/` | Small HTML cards for the Design System tab (palette, type, components, …) |
| `ui_kits/news-journal/` | Pixel-faithful recreation of news.ieumedu.kr — components + interactive index |
| `review.html` | Review hub linking foundations, UI kit, article detail, column detail, and archive pages |
| `SKILL.md` | Agent Skill manifest (cross-compatible with Claude Code) |

---

## CONTENT FUNDAMENTALS

**Language:** Korean, with English used sparingly and only as *editorial kickers* (`Latest`, `Columns`, `Archive`, `Principles`). English words are NEVER used as UI labels or CTAs — only as italicized magazine section markers.

**Voice — first person plural, stated as a publisher.** The journal speaks as "우리" by implication, rarely with an explicit pronoun. Readers are addressed as "독자" in structural notices, but body copy speaks *toward* them, not *at* them.

**Tone — 차분, 문학적, 현장어 기반.** Calm, literary, grounded in field language. Full sentences, never bullet-snippets in body copy. The prose has the cadence of an essay rather than an article.

**Examples from live copy:**
- Hero h1: *"밤의 감정과 낮의 교육을 한 지면에서 읽는다"* — declarative, no exclamation, **"읽는다"** (we read) frames the entire product as a reading practice.
- Editor's note subtitle: *"잠들지 못하는 마음에게 보내는 편지"* — a letter to the sleepless heart. Note the direct address to an emotion, not a person.
- Principle 02: *"개인의 고통을 자기관리 실패처럼 다루지 않습니다."* — a negative ethical commitment, stated plainly.
- Card subhead style: *"훈련보다 공동조절이 먼저인 이유"* — `X보다 Y가 먼저인 이유` (why Y comes before X) is a recurring rhetorical frame.

**Casing:**
- Korean body: natural sentence flow, no title case.
- English kickers: **lowercase italic** (`latest`, not `LATEST` or `Latest`). This is a departure from common editorial practice and is deliberate — it softens the magazine voice.
- Eyebrow meta (dates, bylines): uppercase, wide tracking (`.08em`).

**Pronouns & address:** "I vs you" — neither. The journal rarely uses 저 / 나 / 당신. It prefers structural subjects ("이음교육저널은…", "이 기사는…") or emotion/state as subject ("잠들지 못하는 마음에게…"). This gives the text a **second-person-by-implication** warmth without becoming familiar.

**Emoji:** **Never.** No emoji anywhere. The only inline glyphs used are the ascii arrow `→` after inline links and a stylized `■` preceding article subheads (legacy styles.css).

**What to avoid**
- Buzzwords: "혁신", "솔루션", "스마트", "AI-powered" — the brand explicitly rejects tech/startup register.
- Imperative health-tips voice: "잘 자려면 이렇게 하세요" — forbidden.
- Exclamation marks in body copy.
- "꿀팁", "필수템", any influencer register.
- English loanwords where a Korean word exists (콘텐츠 ✗ → 기사/칼럼/글 ✓).

---

## VISUAL FOUNDATIONS

### Palette — pine teal on off-white

The palette is **monochromatic-plus-one**: a warm off-white paper (`#F5F2EE`) reads the page, a deep pine teal (`#2D6A6A`) carries every accent, and a dark forest (`#0D2E2E`) holds the footer. There are no secondary or tertiary accent hues. Semantic states (error/success/warning) are intentionally **not defined** — this is a reading site, not an app, and coloured alerts would break the register.

| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#F5F2EE` | off-white page |
| `--color-surface` | `#FFFFFF` | cards, panels |
| `--color-surface-tint` | `#E4F0EC` | hero background, editor's note |
| `--color-text` | `#0D1F1F` | primary ink (nearly black, with green undertone) |
| `--color-text-muted` | `#4A5E5E` | secondary |
| `--color-text-faint` | `#8A9E9E` | tertiary, datestamps |
| `--color-accent` | `#2D6A6A` | every link, every kicker, every hover stroke |
| `--color-accent-light` | `#9FE1CB` | footer highlights |
| `--color-accent-dark` | `#0D3D3D` | editor's-note display accents |
| `--footer-bg` | `#0D2E2E` | deep forest footer |
| `--color-border` | `#D8E2DF` | card outlines, dividers (cool grey-green) |

The teal is NOT a brand-identity colour in the startup sense — it is a **print-ink accent**, deployed at the density you'd see in a typeset journal: kickers, rule lines, the occasional button.

### Typography — three voices

- **Noto Serif KR** — all headlines, card titles, numerals (01–04). The serif carries the "journal" identity; weights 400/500/600.
- **Noto Sans KR** — body, meta, nav, buttons. Clean, calm. Weights 300/400/500/700.
- **Playfair Display** — *italic, lowercase, `.18em` tracked*. Used **only** for English editorial kickers and the editor's-note sub-accent. This is the single most distinctive type decision in the system.

Numerals in the principles section use the **serif**, not the sans — this is how you know the product is journal-coded rather than app-coded. Letter-spacing on display headings is tight (`-0.025em` to `-0.035em`); spacing on kickers is wide (`+0.18em`).

**Line heights** are generous: body 1.75, article body 1.9. Reading comfort trumps density.

### Spacing, grid, rhythm

- Container max `1200px`; horizontal padding `clamp(1rem, 4vw, 2.5rem)`.
- Vertical section gap `clamp(2.5rem, 6vw, 5rem)` — the page is airy.
- Card grids use `repeat(3, 1fr)` at desktop, collapsing to 2 / 1 at 920 / 640 px.
- Base unit 4px; the `--sp-*` scale is 4/8/12/16/20/24/32/40/48/64/80/96.

### Backgrounds — editorial, never decorative

- **Page:** flat off-white. No gradients on the page body.
- **Hero:** `#E4F0EC` tint with **slow-drifting outline circles** (6 elements, opacity `.06`–`.20`, durations `5s`–`12s`). The motion is deliberately almost-imperceptible — a breath, not a flourish. The spec offers three escalations (clip-path morph, SVG stroke-dashoffset, canvas particles ≤5KB) and this system implements the CSS-only baseline with refined easing.
- **Imagery:** documentary photography — muted, natural light, cool-leaning, film-grain feel. No stock business imagery, no illustrations of people, no 3D renders. Night scenes and domestic interiors dominate. Articles lead with one hero image at 16:9 or 16:10.
- **Patterns / textures:** **none.** No paper textures, no grain overlays, no dot patterns. The off-white paper *is* the texture.

### Animation & motion

- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (`--ease-out`) is the default — a gentle deceleration, never bouncy. `--ease-spring` exists for small reveals (chip appearance, nav open) but is used sparingly.
- **Durations:** 150ms (micro — link underline), 260ms (base — card hover, button), 420ms (scene — nav state change, hero element entrance).
- **Hover states:**
  - Cards — `translateY(-3px)` + border color shifts from `--color-border` to `--color-accent`; thumbnail image `scale(1.04)` with 420ms transition. **No shadow spike.**
  - Buttons (primary) — brightness steady, translateY(-1px), shadow softens one tier.
  - Links — underline slides in from left, `text-underline-offset: 4px`.
  - Chips — background fades from `--color-surface` to `--color-accent`, text to white.
- **Press states:** `translateY(0)` and slightly darker (accent → accent-hover).
- **No bounce, no scale-up on click, no confetti/celebrations.**

### Borders, shadows, corners

- **Border radii:** cards `16–24px`; buttons `pill (999px)`; small chips `pill`; images inside cards inherit card radius. The scale reads as "editorial softness", not "app playfulness".
- **Borders:** `0.5px–1px solid var(--color-border)` on surfaces. Borders are default; shadows are additive and restrained.
- **Shadows:** four levels, all cool-toned (`rgba(13, 31, 31, …)`), max blur 48px. There is **no neon glow, no colored shadow, no inner shadow**. The system prefers borders to shadows for definition.

### Transparency & blur

- Sticky nav uses `backdrop-filter: blur(10px)` with `background: rgba(245, 242, 238, 0.92)` **only after scroll**. At page top it's fully transparent — so the hero tint reads uninterrupted.
- Editor's-note card uses `rgba(255, 255, 255, 0.55)` over the hero tint.
- Featured-note decorative dot uses a radial gradient at `rgba(109, 139, 124, 0.22)`.
- No frosted glass anywhere else.

### Cards

- Default: `background: #FFF`, `border: 1px solid var(--color-border)`, `radius: 24px`, `shadow: --shadow-md`.
- Article cards: photo-first, 16:9 or 16:10 aspect; category label in the photo's lower-left over a subtle dark protection gradient; title in serif 500; description in sans at 16px/1.7.
- Principle cards: top-border 2px accent, number in serif 32px accent-coloured, body in sans 20px/1.45.
- Topic cards: padded panels, no imagery, serif title + short paragraph.

### Layout rules

- Sticky header, 96px scroll-margin-top on section anchors so jumps land cleanly below the bar.
- Hero is **2-column asymmetric**: copy 55% / editor's-note 45% at ≥1100px, stacking below.
- Section heads always carry the pattern *`<kicker-en>` + `<section-title>` + optional `<section-desc>`* — this is the spine of the page.
- Footer is 3-column: brand + operator info + policy links.

---

## ICONOGRAPHY

The journal uses **almost no icons.** This is a deliberate decision: in a reading-first editorial product, icons are noise.

**What's actually used:**
- `→` arrow glyph after every inline link (`글 읽기 →`). Plain ASCII, inherits text color.
- `■` filled square before `<h2>` in article bodies (legacy styles.css) — functions as a typeset section mark, like you'd see in a printed essay.
- `☎` (unicode) in the footer before the phone number — one legacy unicode glyph, not part of a system.

**What's NOT used:**
- No icon font (no Material Icons, no Font Awesome, no Phosphor).
- No SVG icon library.
- No emoji, anywhere.
- No decorative line-art or hand-drawn illustrations.
- No logos for social media (there are no social links on the site).

**If you need an icon** while designing for this brand:
1. First, ask whether you actually need one. The answer is usually no — use a text label.
2. If you genuinely need one (e.g. a hamburger menu toggle, a close-X on a modal), use **a minimal inline SVG** with `stroke: currentColor`, `stroke-width: 1.5`, no fill. Match the tight-line feel of serif type.
3. For CDN fallback: **Lucide** (`https://cdn.jsdelivr.net/npm/lucide-static/…`) is the closest match in spirit — thin strokes, editorial weight. Flag the substitution to the user.

**Logo / wordmark:** The live site does not carry a finalized graphical logo. The primary mark is typographic: **"이음교육저널"** set in Noto Serif KR 600, letter-spacing `-0.025em`, with a lower italic English line, *"em · education & mind journal"*. When a compact mark is needed, use the outlined `em` monogram from `preview/brand-wordmark.html`; do not use the earlier single-character `이` tile.

---

## Index / Manifest

- `README.md` — this file
- `colors_and_type.css` — foundation tokens + semantic classes
- `SKILL.md` — Agent Skill manifest
- `review.html` — design review hub
- `preview/` — Design System tab cards (palette, type, components, motion)
- `assets/` — real article, archive, and book imagery (for use in mocks)
- `ui_kits/news-journal/` — faithful recreation of news.ieumedu.kr
  - `README.md` — kit notes
  - `index.html` — interactive homepage recreation
  - `article-detail.html`, `column-detail.html`, `archive-index.html` — detail and archive page mocks
  - `detail.css` — shared detail/archive styling
  - `Header.jsx`, `Hero.jsx`, `ArticleCard.jsx`, `SectionHead.jsx`, `PrincipleCard.jsx`, `Footer.jsx`

---

## Caveats / substitutions

- **Fonts:** Noto Serif KR, Noto Sans KR, Playfair Display are all loaded from Google Fonts. No font files are bundled — the spec calls for `@import`, which this system follows.
- **Imagery:** article images plus archive/book images are included. They have no obvious license note in the repo; treat as "brand-owned" pending confirmation.
- **Logo:** no final logotype exists. The UI kit uses the typographic wordmark plus the outlined `em` monogram explored in the latest wordmark iteration.
- **No full "production" design system:** this project documents foundations + one UI kit (the news site). The parent-org site (ieumedu.or.kr) is explicitly out of scope per the source brief.
