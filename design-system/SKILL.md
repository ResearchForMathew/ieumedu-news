---
name: ieumedu-journal-design
description: Use this skill to generate well-branded interfaces and assets for 이음교육저널 (Ieum Education Journal, news.ieumedu.kr), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping a refined editorial Korean journal in a pine-teal-on-off-white palette.
user-invocable: true
---

Read the `README.md` file within this skill first, and explore the other available files (`colors_and_type.css` for tokens, `ui_kits/news-journal/` for components, `preview/` for visual specimens, `assets/` for real imagery).

Core principles to enforce:

- **Refined editorial, not startup UI.** Korean independent academic journal, digital edition. Calm, unhurried, reading-first.
- **Monochromatic palette + one accent.** Pine teal (`#2D6A6A`) on off-white (`#F5F2EE`); deep forest footer (`#0D2E2E`). No secondary colors, no gradients on page body, no semantic state colors.
- **Three voices in type.** Noto Serif KR for headlines and numerals; Noto Sans KR for body/UI; Playfair Display italic lowercase `.18em` tracked for English editorial kickers (`latest`, `columns`, etc.). Kickers are ALWAYS lowercase italic — this is the signature.
- **Numerals are serif.** 01–04, dates, principle numbers — always Noto Serif KR in accent teal.
- **No emoji. No icons.** Use `→` glyph after inline links; everything else is a text label. If an icon is unavoidable, flag the substitution and use thin-stroke Lucide (`stroke-width: 1.5`, no fill).
- **Animation is a breath, not a flourish.** Hero drifting circles at opacity .06–.20 over 5–12s. Hover states shift border to teal + translateY(-3px); image cards scale image 1.04x over 420ms. No bounce, no spike.
- **Voice is Korean, calm, structural-subject.** "잠들지 못하는 마음에게 보내는 편지." Never imperative health-tips. Never exclamation. Never "꿀팁", "솔루션", "스마트".

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out of `assets/` and `ui_kits/` and create static HTML files for the user to view — link `colors_and_type.css` for tokens and the UI kit's `kit.css` for component styles. If working on production code (static HTML/CSS for `news.ieumedu.kr`), copy the tokens from `colors_and_type.css` into the project's `tokens.css` and use the UI kit components as reference implementations.

If the user invokes this skill without any other guidance, ask them:
1. What are they building — an article page, a new section on the homepage, a policy/disclosure page, or a throwaway mock?
2. Do they want new variations to explore, or a faithful extension of the existing system?
3. Is this for `news.ieumedu.kr` (this skill) or the parent-org site `ieumedu.or.kr` (not covered — flag and stop)?

Then act as an expert editorial designer who outputs HTML artifacts or production-ready static HTML/CSS, depending on the need.
