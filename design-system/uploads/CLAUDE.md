# CLAUDE.md — ieumedu-news 리팩토링 지시사항

> 이 파일은 `ieumedu-news` 레포지토리 루트에 배치하는 Claude Code 전용 지시 문서다.
> Claude Code는 작업 착수 전 이 파일을 반드시 먼저 읽고, 각 단계를 순서대로 이행한다.

---

## ★ Claude Code에게 — 설계 방향 총론

이 프로젝트는 단순한 CSS 정리가 아니다.
**이 문서에 포함된 목업 스펙은 최소 기준선(baseline)이다. Claude Code는 이를 참고하되 반드시 뛰어넘어야 한다.**

구체적으로 요구되는 수준:

- 목업보다 타이포그래피 위계가 더 정교해야 한다 (크기·자간·행간 모두 의도적으로 설계)
- 동적 배경은 단순 floating circle 이상의 섬세하고 유기적인 표현이어야 한다
- 카드, 섹션 전환, hover 상태에 micro-motion이 적용되어야 한다
- 전체 색채 시스템이 `tokens.css` 하나로 완전히 제어되어야 한다
- 인쇄 매체를 참조한 에디토리얼 질감이 화면 전체에서 느껴져야 한다
- 완성물을 처음 보았을 때 "한국 독립 학술 저널의 디지털 판"이라는 인상이 즉각 전달되어야 한다

**목업보다 나은 결과물을 만들어라. 목업은 방향 확인용이지 최종 기준이 아니다.**
Phase 5 완료 후 "목업 대비 자체 개선점 3가지 이상"을 코멘트로 출력할 것.

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 사이트명 | 이음교육저널 |
| 도메인 | news.ieumedu.kr (GitHub Pages) |
| 성격 | 교육·심리 온라인 저널 (인터넷신문 등록 대상) |
| 기술 스택 | 순수 정적 HTML/CSS (빌드 시스템 없음) |
| JS 원칙 | 최소화. 모바일 메뉴 토글, 동적 배경(선택) 외에는 CSS-only |
| 배포 | GitHub Pages, `main` 브랜치 루트 = 사이트 루트 |
| 연관 사이트 | ieumedu.or.kr (교육원 본체, 분리 운영) |

---

## 2. 현재 코드베이스 진단

작업 착수 전 아래 항목을 점검하고 결과를 출력한다.

```
- [ ] styles.css / homepage-redesign.css 중복·충돌 규칙 식별
- [ ] 각 HTML 파일 <head> 메타태그 일관성 확인
- [ ] 공통 nav/footer 하드코딩 여부 확인
- [ ] articles/ 하위 파일 목록 및 마크업 구조 파악
- [ ] assets/ 하위 이미지 파일 목록 파악
- [ ] 접근성 (aria, skip-link, alt text) 현황 점검
- [ ] 모바일 뷰포트 대응 여부 점검
```

---

## 3. 디자인 시스템 — 전체 스펙

### 3-1. 디자인 방향

**에디토리얼 / 인쇄 매체 참조 — 한국 독립 학술 저널의 디지털 판.**

- **톤**: Refined Editorial. 군더더기 없이 읽기에 집중된 레이아웃
- **차별점**: 섹션 kicker (`Latest`, `Columns`)를 이탤릭 serif + `letter-spacing: .18em`으로 처리해 인쇄 잡지 질감 구현. 숫자 요소(원칙 01~04, 날짜)에 serif 활용
- **절대 금지**: Inter/Roboto/Arial 폰트, 파란색-흰색 gradient, 보라 계열 포인트, 그림자 남용

### 3-2. 폰트 시스템

```css
/* base.css 최상단에 1회만 @import */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500;600&family=Noto+Sans+KR:wght@400;500&family=Playfair+Display:ital,wght@0,500;1,400&display=swap');

/* tokens.css */
--font-serif:   'Noto Serif KR', 'Nanum Myeongjo', Georgia, serif;
--font-sans:    'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;
--font-display: 'Playfair Display', serif;  /* 영문 kicker, 에디터스 노트 accent */
```

**사용 규칙**:

| 용도 | 폰트 | 비고 |
|------|------|------|
| h1, h2, 카드 제목 | `var(--font-serif)` | |
| 섹션 kicker 영문 | `var(--font-display)` italic | letter-spacing `.18em` |
| 숫자 강조 (01~04) | `var(--font-serif)` | teal 컬러 |
| 본문, 메타, 버튼, nav | `var(--font-sans)` | |
| 에디터스 노트 부제 | `var(--font-display)` | |

### 3-3. 컬러 토큰 (tokens.css 전체)

```css
:root {
  /* ── Palette ── */
  --color-bg:            #F5F2EE;   /* 오프화이트 페이지 배경 */
  --color-surface:       #FFFFFF;
  --color-surface-tint:  #E4F0EC;   /* 히어로, 에디터스노트 배경 */
  --color-text:          #0D1F1F;
  --color-text-muted:    #4A5E5E;
  --color-text-faint:    #8A9E9E;
  --color-border:        #D8E2DF;
  --color-border-focus:  #2D6A6A;

  /* ── Accent (Teal) ── */
  --color-accent:         #2D6A6A;
  --color-accent-light:   #9FE1CB;
  --color-accent-dark:    #0D3D3D;
  --color-accent-surface: #E4F0EC;

  /* ── Hero dynamic bg ── */
  --hero-bg:              #E4F0EC;
  --hero-circle-stroke:   rgba(45, 106, 106, 0.18);
  --hero-circle-fill:     rgba(45, 106, 106, 0.06);
  --hero-text-deep:       #0D2E2E;

  /* ── Footer ── */
  --footer-bg:            #0D2E2E;
  --footer-text:          #C8E8E0;
  --footer-muted:         #5DCAA5;
  --footer-heading:       #E4F0EC;

  /* ── Typography Scale ── */
  --text-xs:   0.6875rem;
  --text-sm:   0.75rem;
  --text-base: 0.875rem;
  --text-md:   1rem;
  --text-lg:   1.125rem;
  --text-xl:   1.25rem;
  --text-2xl:  1.5rem;
  --text-3xl:  2rem;
  --text-4xl:  clamp(2rem, 5vw, 3rem);

  /* ── Spacing ── */
  --sp-1: .25rem;  --sp-2: .5rem;   --sp-3: .75rem;
  --sp-4: 1rem;    --sp-6: 1.5rem;  --sp-8: 2rem;
  --sp-12: 3rem;   --sp-16: 4rem;   --sp-24: 6rem;

  /* ── Layout ── */
  --container-max:  1200px;
  --container-pad:  clamp(1rem, 4vw, 2.5rem);
  --grid-gap:       1.25rem;
  --card-radius:    8px;
  --section-gap:    clamp(2.5rem, 6vw, 5rem);

  /* ── Motion ── */
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --dur-fast:  150ms;
  --dur-base:  260ms;
  --dur-slow:  420ms;

  /* ── Letter spacing ── */
  --ls-tight:  -0.02em;
  --ls-kicker:  0.18em;
  --ls-meta:    0.08em;
}
```

---

## 4. 동적 배경 — 히어로 & 네임플레이트

### 4-1. 설계 원칙

동적 배경은 **콘텐츠를 방해하지 않으면서 생동감을 부여**하는 것이 목적이다.
opacity `.06 ~ .20` 범위를 엄수하고, 애니메이션 속도는 `5s ~ 12s`로 느리게 유지한다.

아래 코드는 **최소 기준선**이다. Claude Code는 더 정교한 방식으로 자유롭게 개선할 수 있다.

### 4-2. CSS-only 기본 구현 (최소 기준)

```css
/* components.css 내 hero 동적 배경 */

@keyframes float-a {
  0%,100% { transform: translateY(0) translateX(0) rotate(0deg); opacity: .13; }
  33%     { transform: translateY(-22px) translateX(10px) rotate(70deg); opacity: .20; }
  66%     { transform: translateY(10px) translateX(-14px) rotate(-40deg); opacity: .08; }
}
@keyframes float-b {
  0%,100% { transform: translateY(0) rotate(0deg); opacity: .08; }
  50%     { transform: translateY(-30px) rotate(180deg); opacity: .17; }
}
@keyframes float-c {
  0%,100% { transform: translateY(0) translateX(0); opacity: .06; }
  40%     { transform: translateY(-12px) translateX(18px); opacity: .14; }
  80%     { transform: translateY(16px) translateX(-8px); opacity: .07; }
}

.hero-bg-circle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  will-change: transform, opacity;
}
.hero-bg-circle:nth-child(1) {
  width: 180px; height: 180px;
  border: 1px solid var(--hero-circle-stroke);
  top: -40px; right: 10%;
  animation: float-a 8s var(--ease-out) infinite;
}
.hero-bg-circle:nth-child(2) {
  width: 90px; height: 90px;
  border: 1px solid var(--hero-circle-stroke);
  bottom: 10px; right: 22%;
  animation: float-b 5.5s var(--ease-out) infinite 1.2s;
}
.hero-bg-circle:nth-child(3) {
  width: 300px; height: 300px;
  border: 0.5px solid var(--hero-circle-stroke);
  top: 10px; right: -5%;
  animation: float-a 12s var(--ease-out) infinite 2.5s;
}
.hero-bg-circle:nth-child(4) {
  width: 44px; height: 44px;
  background: var(--hero-circle-fill);
  bottom: 50px; left: 28%;
  animation: float-c 7s var(--ease-out) infinite 0.8s;
}
.hero-bg-circle:nth-child(5) {
  width: 18px; height: 18px;
  background: var(--color-accent);
  opacity: .12;
  top: 55px; left: 58%;
  animation: float-b 6s var(--ease-out) infinite 3s;
}
.hero-bg-circle:nth-child(6) {
  width: 120px; height: 120px;
  border: 0.5px solid var(--hero-circle-stroke);
  bottom: -25px; left: 15%;
  animation: float-c 9s var(--ease-out) infinite 1s;
}

.hero-section {
  position: relative;
  overflow: hidden;
  background: var(--hero-bg);
  padding: clamp(3rem, 7vw, 5.5rem) var(--container-pad);
}
.hero-content {
  position: relative;
  z-index: 1;
}
```

```html
<!-- index.html 히어로 마크업 -->
<section class="hero-section">
  <div class="hero-bg-circle" aria-hidden="true"></div>
  <div class="hero-bg-circle" aria-hidden="true"></div>
  <div class="hero-bg-circle" aria-hidden="true"></div>
  <div class="hero-bg-circle" aria-hidden="true"></div>
  <div class="hero-bg-circle" aria-hidden="true"></div>
  <div class="hero-bg-circle" aria-hidden="true"></div>
  <div class="hero-content"> <!-- 실제 콘텐츠 --> </div>
</section>
```

### 4-3. 고급 구현 — Claude Code 권장 옵션

기본 구현보다 더 정교하게 만들 것을 권장한다. 아래 중 하나 이상 선택.

**옵션 A — clip-path morph 다각형 배경**
원형 대신 `clip-path: polygon(...)` + `@keyframes`로 모프(morph)하는 유기적 도형.

```css
@keyframes morph {
  0%,100% { clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%); }
  50%     { clip-path: polygon(40% 5%, 95% 15%, 95% 65%, 80% 95%, 20% 95%, 5% 65%, 5% 15%); }
}
.hero-morph {
  position: absolute;
  width: 420px; height: 420px;
  background: var(--hero-circle-fill);
  animation: morph 14s ease-in-out infinite;
  top: -120px; right: -80px;
  pointer-events: none;
}
```

**옵션 B — SVG stroke-dashoffset 선 궤적 배경**
`<svg>` 안에 `<path>` stroke-dashoffset 애니메이션으로 선이 천천히 그려지는 효과.

**옵션 C — canvas 파티클 (경량 JS)**
`assets/js/hero-bg.js` 단독 파일, canvas 파티클 50개 이하, requestAnimationFrame.
조건: 파일 크기 5KB 이하, 외부 라이브러리 미사용.

---

## 5. 파일 구조 목표

```
ieumedu-news/
├── CLAUDE.md
├── CNAME
├── index.html
├── newsroom-about.html
├── archive-author-research.html
├── rights-and-corrections.html
├── privacy-policy.html
├── terms.html
├── youth-protection-policy.html
├── assets/
│   ├── css/
│   │   ├── tokens.css       ← CSS Custom Properties 전체
│   │   ├── base.css         ← @import 폰트, reset, 전역 타이포그래피
│   │   ├── layout.css       ← container, section, grid 시스템
│   │   ├── components.css   ← card, nav, footer, button, chip, hero-bg
│   │   └── pages/
│   │       └── article.css  ← 기사 페이지 전용
│   ├── js/
│   │   ├── main.js          ← 모바일 메뉴 토글 (필수)
│   │   └── hero-bg.js       ← canvas 파티클 (옵션 C 선택 시)
│   ├── articles/
│   └── icons/
├── articles/
└── _snippets/
    ├── head-meta.html
    ├── nav.html
    └── footer.html
```

---

## 6. 단계별 작업 지시

### Phase 1 — CSS 통합 및 토큰 구축

1. `styles.css` + `homepage-redesign.css` 분석 → 중복 목록 출력
2. `tokens.css` 생성 (§3-3 스펙 완전 적용)
3. `base.css` — Google Fonts @import 1회, CSS reset, body/html 전역 스타일
4. `layout.css` — `.container`, `.section`, grid 시스템, 반응형 브레이크포인트
5. `components.css` — nav, footer, card, button, chip, hero-bg 포함 모든 컴포넌트
6. 기존 CSS 파일 삭제, 모든 HTML `<link>` 교체 (tokens → base → layout → components 순)

### Phase 2 — index.html 전면 리디자인

**목업 수준을 뛰어넘는 구현이어야 한다.**

#### Header / Nav

- `position: sticky; top: 0; z-index: 100`
- 스크롤 감지 → `.header--scrolled` 토글
  - 기본: 투명 배경, border 없음
  - 스크롤 후: `background: rgba(245,242,238,.92); backdrop-filter: blur(10px); border-bottom: 0.5px solid var(--color-border)`
- 저널명: `var(--font-serif)`, `letter-spacing: var(--ls-tight)`
- 태그라인: `var(--font-display)` italic, `var(--text-xs)`
- 모바일 (< 768px): hamburger → slide-down nav

#### Hero Section

- §4에서 선택한 동적 배경 방식 적용 (옵션 A~C 중 최선)
- 2-column asymmetric: 카피 55% / 에디터스 노트 45%
- h1: `var(--font-serif)`, `var(--text-4xl)`, `line-height: 1.4`, `letter-spacing: var(--ls-tight)`
- 에디터스 노트 카드: `background: rgba(255,255,255,.55)`, `border: 0.5px solid rgba(45,106,106,.25)`
- topic chips hover: `background: var(--color-accent)`, `color: var(--color-accent-surface)`, `transition: var(--dur-base)`

#### Section Kicker 패턴 (전체 섹션 공통)

```html
<div class="section-kicker-wrap">
  <span class="kicker-en">Latest</span>
  <h2 class="section-title">최신 기사</h2>
  <p class="section-desc">현장에서 가장 자주 마주치는 질문과 해답을 묶었습니다.</p>
</div>
```

```css
.kicker-en {
  font-family: var(--font-display);
  font-style: italic;
  font-size: var(--text-xs);
  letter-spacing: var(--ls-kicker);
  color: var(--color-accent);
  text-transform: lowercase;
  display: block;
  margin-bottom: var(--sp-2);
}
```

#### 기사 카드

- 썸네일: `aspect-ratio: 16/9`, `object-fit: cover`, overflow hidden
- hover: 이미지 `scale(1.04)` + 카드 `border-color: var(--color-accent)`, 동시 transition
- 카테고리 태그: 썸네일 좌하단 absolute 배치, 반투명 배경
- 제목: `var(--font-serif)`, `-webkit-line-clamp: 2`

#### Principles Section

- 번호: `var(--font-serif)`, `var(--text-3xl)`, `color: var(--color-accent)`
- 카드: `border-top: 2px solid var(--color-accent)` 상단 라인 강조

#### Footer

- `background: var(--footer-bg)`
- 저널명: `var(--font-serif)`, `color: var(--footer-heading)`
- 링크 hover: `color: var(--color-accent-light)` 전환
- 하단 법적 라인: `border-top: 0.5px solid rgba(255,255,255,.1)`

### Phase 3 — 기사 페이지 표준화

```css
/* article.css */
.article-body {
  max-width: 680px;
  margin-inline: auto;
  font-family: var(--font-sans);
  font-size: var(--text-md);
  line-height: 1.9;
  color: var(--color-text);
}
.article-body h2 {
  font-family: var(--font-serif);
  font-size: var(--text-2xl);
  margin-top: var(--sp-12);
  padding-bottom: var(--sp-2);
  border-bottom: 1px solid var(--color-border);
}
.article-body blockquote {
  border-left: 3px solid var(--color-accent);
  padding-left: var(--sp-6);
  margin-left: 0;
  color: var(--color-text-muted);
  font-style: italic;
  font-family: var(--font-serif);
}
```

표준 기사 마크업:

```html
<article class="article-page">
  <header class="article-header">
    <span class="article-category">카테고리</span>
    <h1 class="article-title">제목</h1>
    <p class="article-lead">리드 문장</p>
    <div class="article-meta">
      <time datetime="YYYY-MM-DD">발행일</time>
    </div>
  </header>
  <figure class="article-hero">
    <img src="../assets/articles/..." alt="..." loading="lazy">
  </figure>
  <div class="article-body"><!-- 본문 --></div>
</article>
```

### Phase 4 — 공통 요소 동기화

모든 HTML `<head>` 통일 구조:

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="[페이지별]">
<meta property="og:title" content="[제목] | 이음교육저널">
<meta property="og:description" content="[설명]">
<meta property="og:type" content="website">
<meta property="og:url" content="https://news.ieumedu.kr/[경로]">
<link rel="canonical" href="https://news.ieumedu.kr/[경로]">
<link rel="stylesheet" href="./assets/css/tokens.css">
<link rel="stylesheet" href="./assets/css/base.css">
<link rel="stylesheet" href="./assets/css/layout.css">
<link rel="stylesheet" href="./assets/css/components.css">
```

모든 페이지 nav/footer → `_snippets/` 기준으로 동기화.

### Phase 5 — 접근성·성능 점검

```
접근성
- [ ] 모든 <img> alt 속성 (장식: alt="")
- [ ] :focus-visible 스타일 모든 인터랙티브 요소
- [ ] skip-link (#main) 전 페이지 존재
- [ ] aria-label 누락 nav/button 없음
- [ ] 동적 배경 요소 전체 aria-hidden="true"
- [ ] color contrast WCAG AA (4.5:1) 이상

성능
- [ ] loading="lazy" (hero 이미지 제외)
- [ ] Google Fonts @import 1회 (base.css 최상단만)
- [ ] 사용하지 않는 CSS 규칙 없음
- [ ] 인라인 style 잔존 없음
- [ ] will-change: transform 은 애니메이션 요소에만 사용
```

---

## 7. 작업 원칙

1. **콘텐츠 불변**: 텍스트, 링크 href, 파일명 변경 금지. 불가피한 경우 사전 확인.
2. **토큰 우선**: 색상·간격·폰트 하드코딩 금지. `tokens.css` 변수만 사용.
3. **JS 최소화**: 모바일 메뉴 토글, hero-bg.js(옵션) 외 JS 금지. 외부 라이브러리 금지.
4. **삭제 전 이전 확인**: 기존 CSS 삭제 전 모든 규칙이 새 파일에 이전됐는지 검증.
5. **Phase별 커밋**: 형식 `refactor(phase-N): 설명`.
6. **진행 보고**: Phase 완료마다 변경 파일 목록 + 주요 변경 내용 요약 출력.
7. **목업 초과 의무**: 결과물은 반드시 이 문서 §"설계 방향 총론"의 기준을 충족해야 한다. 목업과 동일한 수준은 미완성이다.

---

## 8. 완료 조건

- [ ] `assets/css/` 모듈 4개 파일 존재, 루트 CSS 파일 제거
- [ ] `index.html` 동적 배경 + 토큰 완전 적용, 반응형 정상 동작
- [ ] sticky nav 스크롤 상태 전환 동작 확인
- [ ] `articles/` 기사 페이지 표준 레이아웃 적용
- [ ] 전 HTML 공통 nav/footer 일치
- [ ] Phase 5 체크리스트 전 항목 pass
- [ ] `python3 -m http.server` 로컬 렌더링 정상 확인
- [ ] **목업 대비 개선점 3가지 이상 자체 코멘트 출력**

---

*Last updated: 2026-04-24 | Maintainer: ResearchForMathew*
