# 발달지연 조기 발견 기사 리뷰 기록

- 작성 시각: 2026-04-26 01:21:32 KST
- 대상 URL: https://news.ieumedu.kr/articles/development-delay-early-signals.html
- 소스: `articles/development-delay-early-signals.html`
- 대표 이미지: `assets/articles/development-delay.png`

## 현재 확인 상태

- 라이브 기사 URL은 `200 OK`로 응답한다.
- 대표 이미지 `/assets/articles/development-delay.png`는 `200 OK`로 응답한다.
- 상세 기사 CSS `/assets/css/detail.css`와 공통 partial JS `/assets/js/partials.js`도 `200 OK`로 응답한다.
- 본문 제목, 저자, 날짜, 대표 이미지, 요약, 본문, 관련 기사 영역은 렌더링 가능한 구조로 들어가 있다.
- 공통 footer는 `partials.js` 경로를 통해 로드되므로, 최근 정정한 `광주광역시 서구 회재로 859, 3층` 표기와 연결된다.

## 후속 개선 반영

- `copy link`, `email`, `print` 버튼에 실제 클릭 동작을 연결했다.
- 기사별 `canonical`, `og:*`, `article:*`, `twitter:*` 메타를 추가했다.
- 남은 항목은 상세 기사 템플릿 통일과 운영 문서 정리다.

## 리뷰 결과

### P2. 공유 버튼이 보이지만 동작 코드가 없다

`articles/development-delay-early-signals.html`의 reading rail에는 `copy link`, `email`, `print` 버튼이 렌더링된다. 하지만 이 페이지 하단 스크립트는 읽기 진행률과 관련 카드 hover만 처리하고, 공유 버튼 클릭 핸들러가 없다.

비교 기준으로 `articles/infant-sleep-coregulation.html`에는 `share-copy`, `rail-copy`, `rail-print`, `mailto`, `navigator.clipboard`, `window.print()` 처리가 이미 들어가 있다. 따라서 현재 페이지는 사용자가 버튼을 눌러도 기대한 공유 동작이 발생하지 않는 상태다.

권장 조치: 공유 기능을 공통 JS로 빼거나, 최소한 이 기사 페이지에 `copy link`, `email`, `print` 핸들러를 같은 방식으로 추가한다.

상태: 이 기사 페이지에는 후속 개선으로 버튼 핸들러를 추가했다. 여러 기사에 반복되는 로직은 추후 공통 JS로 빼는 것이 남은 정리 항목이다.

### P2. 소셜 공유 메타 정보가 부족하다

현재 기사 head에는 `title`과 `meta description`은 있지만 `canonical`, `og:title`, `og:description`, `og:image`, `twitter:card` 계열 메타가 없다.

이 기사는 외부 공유 가능성이 있는 주제형 기사이므로, 카카오톡/메신저/검색 결과에서 제목과 대표 이미지가 안정적으로 잡히도록 기사별 OG 메타를 추가하는 것이 좋다.

권장 조치: 기사 상세 페이지 템플릿 기준을 정하고 모든 기사에 동일한 canonical/OG/Twitter 메타 세트를 넣는다.

상태: 이 기사 페이지에는 후속 개선으로 기사별 canonical/OG/Twitter 메타를 추가했다. 다른 상세 기사까지 일괄 정리하는 작업은 별도 템플릿 통일 항목으로 남긴다.

### P3. 상세 기사 템플릿 정합성 점검이 필요하다

홈페이지 hero motion과 아카이브 책자 포맷은 최근 정리되었지만, 이 상세 기사 페이지는 아직 비교적 오래된 detail 구조에 머물러 있다. 자체적으로 깨진 구조는 아니지만, 최신 기사인 `infant-sleep-coregulation.html`과 비교하면 공유/상단 액션/상세 인터랙션 수준이 다르다.

권장 조치: 기사 상세 템플릿을 하나로 정하고, 기존 기사들을 순차적으로 맞춘다. 우선순위는 공유 버튼과 메타 태그처럼 사용자에게 직접 보이는 기능부터 둔다.

### P3. 운영 문서가 현재 운영 현실과 일부 다르다

현재 작업 기준은 `news.ieumedu.kr`이고 이 repo가 뉴스 사이트의 권위 작업본이다. 그런데 `운영가이드.md`에는 과거 도메인/배포 설명이 일부 남아 있어, 새 작업자가 보면 현재 배포 구조를 오해할 수 있다.

권장 조치: 기사 기능 수정과 별개로 운영 문서에서 도메인, 배포, 사이트 역할 설명을 현재 구조에 맞게 정리한다.

## 편집 품질 메모

- 본문 톤은 발달지연을 단정하거나 낙인찍지 않고, 관찰과 협력 중심으로 설명하고 있어 사이트 방향과 맞는다.
- 핵심 문장인 "기다림과 미루기는 다르다"는 본문과 pull quote에서 잘 기능한다.
- 의학적 진단을 직접 지시하는 표현은 강하지 않으며, 필요한 경우 전문가 연결을 말하는 수준이라 현재 기사 성격에는 무리가 없다.
- 다만 발달/조기 개입 주제는 민감하므로, 향후 기사에는 "진단 목적이 아니라 관찰과 지원 방향을 위한 정보"라는 문장을 더 명시해도 좋다.

## 검증 근거

- `curl -I https://news.ieumedu.kr/articles/development-delay-early-signals.html` 결과: `200 OK`
- `curl -I https://news.ieumedu.kr/assets/articles/development-delay.png` 결과: `200 OK`
- `curl -I https://news.ieumedu.kr/assets/css/detail.css` 결과: `200 OK`
- `curl -I https://news.ieumedu.kr/assets/js/partials.js` 결과: `200 OK`
- `rg -n "rail-share|copy link|mailto|print|clipboard|share-copy|og:title|canonical|twitter:" articles/development-delay-early-signals.html articles/infant-sleep-coregulation.html`

## 다음 작업 후보

1. 상세 기사 템플릿을 최신 기사 기준으로 통일.
2. 여러 상세 기사에 반복되는 공유 로직을 공통 JS로 정리.
3. 전체 기사에 canonical/OG/Twitter 메타를 일괄 적용.
4. `운영가이드.md`와 `README.md`의 오래된 운영 설명 정리.
