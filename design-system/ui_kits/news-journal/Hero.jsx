// Hero.jsx — mouse-responsive dotfield + parallax editor's-note card
const { useState, useEffect, useRef, useMemo } = React;

function HeroDotfield() {
  const ref = useRef(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5, active: false });

  // 28 dots in a loose scatter — deterministic so layout is stable
  const dots = useMemo(() => {
    const rng = (s) => { let x = Math.sin(s) * 10000; return x - Math.floor(x); };
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: rng(i * 7.13) * 100,
      y: rng(i * 11.7 + 1) * 100,
      r: 3 + rng(i * 3.1) * 22,        // radius 3–25
      stroke: rng(i * 5.9) > 0.4,      // outlined vs filled
      depth: 0.3 + rng(i * 2.2) * 1.0, // parallax weight
      drift: 4 + rng(i * 8.8) * 6,     // animation duration 4–10s
      delay: rng(i * 1.4) * 4,
    }));
  }, []);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    let raf = 0, targetX = 0.5, targetY = 0.5, curX = 0.5, curY = 0.5;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width;
      targetY = (e.clientY - rect.top) / rect.height;
    };
    const onLeave = () => { targetX = 0.5; targetY = 0.5; };
    const tick = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      setMouse({ x: curX, y: curY, active: true });
      raf = requestAnimationFrame(tick);
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="hero-dotfield" aria-hidden="true">
      {dots.map(d => {
        const dx = (mouse.x - 0.5) * 40 * d.depth;
        const dy = (mouse.y - 0.5) * 28 * d.depth;
        return (
          <span
            key={d.id}
            className={`hero-dot ${d.stroke ? 'hero-dot--stroke' : 'hero-dot--fill'}`}
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: `${d.r * 2}px`,
              height: `${d.r * 2}px`,
              transform: `translate(-50%,-50%) translate(${dx}px,${dy}px)`,
              animationDuration: `${d.drift}s`,
              animationDelay: `${d.delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function Hero() {
  const noteRef = useRef(null);
  useEffect(() => {
    const el = noteRef.current; if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const mx = (e.clientX - r.left) / r.width - 0.5;
      const my = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--tilt-x', `${-my * 4}deg`);
      el.style.setProperty('--tilt-y', `${mx * 5}deg`);
      el.style.setProperty('--shine-x', `${(mx + 0.5) * 100}%`);
      el.style.setProperty('--shine-y', `${(my + 0.5) * 100}%`);
    };
    const onLeave = () => {
      el.style.setProperty('--tilt-x', `0deg`);
      el.style.setProperty('--tilt-y', `0deg`);
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section className="hero-section" id="top">
      <HeroDotfield />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="kicker">editor&rsquo;s note</span>
          <h1 className="hero-title">밤의 감정과 낮의 교육을<br/>한 지면에서 읽는다</h1>
          <p className="hero-lead">
            영유아 수면, 청소년 리듬, 발달과 애착, 교육현장의 질문을 해설과 기록으로 엮습니다.
          </p>
          <div className="hero-actions">
            <a className="btn btn--primary" href="#latest">최신 기사 보기</a>
            <a className="btn btn--secondary" href="#archive">아카이브 보기</a>
          </div>
          <div className="topic-chips">
            <span className="chip">영유아 수면</span>
            <span className="chip">청소년 리듬</span>
            <span className="chip">발달과 애착</span>
            <span className="chip">통합교육</span>
          </div>
        </div>

        <aside ref={noteRef} className="editors-note" aria-label="대표 글">
          <span className="editors-note__shine" aria-hidden="true" />
          <span className="editors-note__label">editor&rsquo;s note</span>
          <h2 className="editors-note__title">잠들지 못하는 마음에게<br/>보내는 편지</h2>
          <p className="editors-note__body">
            잠을 잘 자고 싶다는 말이 왜 마음을 쉬게 하고 싶다는 말과 닮아 있는지부터 이야기를 시작합니다.
          </p>
          <a className="inline-link" href="#">글 읽기 <span aria-hidden="true">→</span></a>
        </aside>
      </div>
    </section>
  );
}

window.Hero = Hero;
