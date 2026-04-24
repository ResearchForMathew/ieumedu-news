# News Journal UI kit

Pixel-faithful recreation of **news.ieumedu.kr** — the interactive homepage plus
modular JSX components. Designed against the refactor brief in `/uploads/CLAUDE.md`
and the live source in `news.ieumedu.kr/`.

## Files
- `index.html` — interactive homepage demo with sticky nav (scrolled state), hero with drifting circles, article grid with hover motion, principles, archive, and footer. All text is real content from the live site.
- `article-detail.html`, `column-detail.html`, `archive-index.html` — detail and archive page explorations for the same visual system
- `detail.css` — shared styles for article, column, and archive page explorations
- `Header.jsx` — sticky top bar, scroll-detection, wordmark + nav + outbound link
- `Hero.jsx` — asymmetric two-column hero + drifting-circle animation + editor's note card
- `SectionHead.jsx` — italic English kicker + serif title + muted description
- `ArticleCard.jsx` — 16:10 photo card with category label + hover scale on image
- `PrincipleCard.jsx` — serif numeral + top-border accent
- `Footer.jsx` — deep-forest three-column footer

## Interactions modeled
- Sticky header toggles `.header--scrolled` (transparent → frosted glass) based on `scrollY > 24`.
- Article cards: image `scale(1.04)` + border shift to teal on hover (420ms).
- Topic chips: fill with accent + text to light surface on hover.
- Inline links: underline slides on hover (`text-underline-offset: 4px`).
- "글 읽기 →" arrow nudges 2px right on parent hover.
- Anchor links scroll to section with top offset baked in (`scroll-margin-top: 96px`).

## Deliberately out of scope
- Mobile hamburger menu — shape only (no animated drawer) because the brief marks it as "toggle only".
- Search, tagging, pagination — do not exist on the live product.
