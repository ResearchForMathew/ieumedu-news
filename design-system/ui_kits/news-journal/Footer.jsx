// Footer.jsx
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-panel">
          <div className="footer-brand-row">
            <div className="brand-mark brand-mark--on-dark" aria-hidden="true">em</div>
            <h3 className="footer-brand">이음교육저널</h3>
          </div>
          <p className="footer-tag">em · education &amp; mind journal</p>
          <p className="footer-body">
            수면, 발달, 교육현장을 중심으로 기사와 칼럼을 싣습니다. 빠른 요약보다 맥락 설명을 먼저 둡니다.
          </p>
        </div>
        <div className="footer-panel">
          <span className="footer-kicker">operating body</span>
          <p className="footer-body">발행: 이음통합평생교육원</p>
          <p className="footer-body">대표: 선애순</p>
          <p className="footer-body">광주시 서구 회재로 859, 3층</p>
          <p className="footer-body">062-655-4116</p>
        </div>
        <div className="footer-panel">
          <span className="footer-kicker">policy</span>
          <ul className="footer-links">
            <li><a href="#">신문 소개</a></li>
            <li><a href="#">정정 · 반론 · 권리구제</a></li>
            <li><a href="#">청소년보호정책</a></li>
            <li><a href="#">개인정보처리방침</a></li>
            <li><a href="#">이용약관</a></li>
            <li><a href="https://www.ieumedu.kr/">이음통합평생교육원 ↗</a></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 이음교육저널</span>
        <span>사업자등록번호 296-05-03812</span>
      </div>
    </footer>
  );
}

window.Footer = Footer;
