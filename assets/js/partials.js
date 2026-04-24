// Injects shared Header & Footer into any page with <div id="site-header"></div>/<div id="site-footer"></div>.
// Plain JS — no React needed for the article/policy pages.
(function(){
  function initHeader(){
    const mount = document.getElementById('site-header');
    if(!mount) return;
    mount.innerHTML = `
<header class="site-header" id="hdr">
  <div class="container header-inner">
    <a class="brand-wrap" href="/">
      <div class="brand-mark" aria-hidden="true">em</div>
      <div class="brand-text">
        <div class="brand-name">이음교육저널</div>
        <div class="brand-tag">em · education &amp; mind journal</div>
      </div>
    </a>
    <nav class="main-nav" aria-label="주요 메뉴">
      <a href="/#latest">최신 기사</a>
      <a href="/#columns">칼럼</a>
      <a href="/archive/">아카이브</a>
      <a href="/#topics">다루는 주제</a>
      <a href="/#principles">독자 안내</a>
    </nav>
    <a class="outbound-link" href="https://www.ieumedu.kr/">
      이음통합평생교육원 <span aria-hidden="true">↗</span>
    </a>
  </div>
</header>`;
    const hdr = document.getElementById('hdr');
    const onScroll = () => {
      if(window.scrollY > 24) hdr.classList.add('site-header--scrolled');
      else hdr.classList.remove('site-header--scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initFooter(){
    const mount = document.getElementById('site-footer');
    if(!mount) return;
    mount.innerHTML = `
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-panel">
      <div class="footer-brand-row">
        <div class="brand-mark brand-mark--on-dark" aria-hidden="true">em</div>
        <h3 class="footer-brand">이음교육저널</h3>
      </div>
      <p class="footer-tag">em · education &amp; mind journal</p>
      <p class="footer-body">
        수면, 발달, 교육현장을 중심으로 기사와 칼럼을 싣습니다. 빠른 요약보다 맥락 설명을 먼저 둡니다.
      </p>
    </div>
    <div class="footer-panel">
      <span class="footer-kicker">operating body</span>
      <p class="footer-body">발행: 이음통합평생교육원</p>
      <p class="footer-body">대표: 선애순</p>
      <p class="footer-body">광주시 서구 회재로 859, 3층</p>
      <p class="footer-body">062-655-4116</p>
    </div>
    <div class="footer-panel">
      <span class="footer-kicker">policy</span>
      <ul class="footer-links">
        <li><a href="/newsroom-about.html">신문 소개</a></li>
        <li><a href="/rights-and-corrections.html">정정 · 반론 · 권리구제</a></li>
        <li><a href="/youth-protection-policy.html">청소년보호정책</a></li>
        <li><a href="/privacy-policy.html">개인정보처리방침</a></li>
        <li><a href="/terms.html">이용약관</a></li>
        <li><a href="https://www.ieumedu.kr/">이음통합평생교육원 ↗</a></li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <span>© 2026 이음교육저널</span>
    <span>사업자등록번호 296-05-03812</span>
  </div>
</footer>`;
  }

  function initShareActions(){
    document.querySelectorAll('.rail-share').forEach((group) => {
      const buttons = Array.from(group.querySelectorAll('button'));
      buttons.forEach((button) => {
        const action = button.textContent.trim().toLowerCase();
        if(action === 'copy link'){
          button.setAttribute('aria-label', '현재 기사 링크 복사');
          button.addEventListener('click', async () => {
            const url = window.location.href.split('#')[0];
            try {
              await navigator.clipboard.writeText(url);
              const original = button.textContent;
              button.textContent = 'copied';
              window.setTimeout(() => { button.textContent = original; }, 1800);
            } catch (_) {
              window.prompt('기사 링크를 복사하세요.', url);
            }
          });
        }
        if(action === 'email'){
          button.setAttribute('aria-label', '현재 기사를 이메일로 공유');
          button.addEventListener('click', () => {
            const subject = encodeURIComponent(document.title);
            const body = encodeURIComponent(window.location.href.split('#')[0]);
            window.location.href = `mailto:?subject=${subject}&body=${body}`;
          });
        }
        if(action === 'print'){
          button.setAttribute('aria-label', '현재 기사 인쇄');
          button.addEventListener('click', () => window.print());
        }
      });
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => { initHeader(); initFooter(); initShareActions(); });
  } else {
    initHeader(); initFooter();
    initShareActions();
  }
})();
