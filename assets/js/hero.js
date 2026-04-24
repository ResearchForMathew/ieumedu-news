// Mouse-responsive dotfield + 3D tilt for the editor's note card.
(function(){
  function initDotfield(){
    const field = document.querySelector('.hero-dotfield');
    if(!field) return;
    // deterministic scatter (seeded rng)
    const rng = (s) => { const x = Math.sin(s) * 10000; return x - Math.floor(x); };
    const dots = Array.from({length:28}, (_,i)=>({
      x: rng(i*7.13)*100, y: rng(i*11.7+1)*100,
      r: 3 + rng(i*3.1)*22,
      stroke: rng(i*5.9) > 0.4,
      depth: 0.3 + rng(i*2.2)*1.0,
      drift: 4 + rng(i*8.8)*6,
      delay: rng(i*1.4)*4,
    }));
    dots.forEach(d=>{
      const el = document.createElement('span');
      el.className = 'hero-dot ' + (d.stroke ? 'hero-dot--stroke' : 'hero-dot--fill');
      Object.assign(el.style,{
        left: d.x+'%', top: d.y+'%',
        width: (d.r*2)+'px', height: (d.r*2)+'px',
        animationDuration: d.drift+'s',
        animationDelay: d.delay+'s',
      });
      el._depth = d.depth;
      field.appendChild(el);
    });
    let tx=0.5, ty=0.5, cx=0.5, cy=0.5, raf=0;
    const onMove = (e)=>{
      const r = field.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
    };
    const onLeave = ()=>{ tx=0.5; ty=0.5; };
    const tick = ()=>{
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      [...field.children].forEach(el=>{
        const d = el._depth || 1;
        const dx = (cx - 0.5) * 40 * d;
        const dy = (cy - 0.5) * 28 * d;
        el.style.transform = `translate(-50%,-50%) translate(${dx}px,${dy}px)`;
      });
      raf = requestAnimationFrame(tick);
    };
    field.addEventListener('mousemove', onMove);
    field.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);
  }

  function initTilt(){
    const el = document.querySelector('.editors-note');
    if(!el) return;
    el.addEventListener('mousemove',(e)=>{
      const r = el.getBoundingClientRect();
      const mx = (e.clientX - r.left)/r.width - 0.5;
      const my = (e.clientY - r.top)/r.height - 0.5;
      el.style.setProperty('--tilt-x', (-my*4)+'deg');
      el.style.setProperty('--tilt-y', (mx*5)+'deg');
      el.style.setProperty('--shine-x', ((mx+0.5)*100)+'%');
      el.style.setProperty('--shine-y', ((my+0.5)*100)+'%');
    });
    el.addEventListener('mouseleave',()=>{
      el.style.setProperty('--tilt-x','0deg');
      el.style.setProperty('--tilt-y','0deg');
    });
  }

  function initCardHover(){
    document.querySelectorAll('.article-card').forEach(c=>{
      c.addEventListener('mousemove',(e)=>{
        const r = c.getBoundingClientRect();
        c.style.setProperty('--mx', (e.clientX-r.left)+'px');
        c.style.setProperty('--my', (e.clientY-r.top)+'px');
      });
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ()=>{ initDotfield(); initTilt(); initCardHover(); });
  } else {
    initDotfield(); initTilt(); initCardHover();
  }
})();
