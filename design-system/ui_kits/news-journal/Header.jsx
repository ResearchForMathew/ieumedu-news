// Header.jsx — sticky top bar, scroll-detects frosted state
const { useState, useEffect } = React;

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="container header-inner">
        <a className="brand-wrap" href="#top">
          <div className="brand-mark" aria-hidden="true">em</div>
          <div className="brand-text">
            <div className="brand-name">이음교육저널</div>
            <div className="brand-tag">em · education &amp; mind journal</div>
          </div>
        </a>
        <nav className="main-nav" aria-label="주요 메뉴">
          <a href="#latest">최신 기사</a>
          <a href="#columns">칼럼</a>
          <a href="#archive">아카이브</a>
          <a href="#topics">다루는 주제</a>
          <a href="#principles">독자 안내</a>
        </nav>
        <a className="outbound-link" href="https://www.ieumedu.kr/">
          이음통합평생교육원 <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}

window.Header = Header;
