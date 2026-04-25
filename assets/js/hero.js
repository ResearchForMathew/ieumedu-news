// Mouse-responsive hero scene + 3D tilt for the editor's note card.
(function(){
  function initHeroScene(){
    const field = document.querySelector('.hero-dotfield');
    if(!field) return;
    field.innerHTML = `
      <div class="hero-scene" aria-hidden="true">
        <span class="hero-scene__glow hero-scene__glow--night"></span>
        <span class="hero-scene__glow hero-scene__glow--day"></span>
        <span class="hero-scene__orb hero-scene__orb--moon"></span>
        <span class="hero-scene__orb hero-scene__orb--sun"></span>
        <span class="hero-scene__thread hero-scene__thread--emotion"></span>
        <span class="hero-scene__thread hero-scene__thread--education"></span>
        <div class="hero-scene__page">
          <span class="hero-scene__page-spine"></span>
          <span class="hero-scene__page-line hero-scene__page-line--one"></span>
          <span class="hero-scene__page-line hero-scene__page-line--two"></span>
          <span class="hero-scene__page-line hero-scene__page-line--three"></span>
          <span class="hero-scene__page-line hero-scene__page-line--four"></span>
        </div>
        <div class="hero-scene__constellation">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="hero-scene__classroom">
          <span></span><span></span><span></span><span></span>
        </div>
      </div>
    `;
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
      field.querySelectorAll('[data-depth]').forEach(el=>{
        const d = Number(el.dataset.depth) || 1;
        const dx = (cx - 0.5) * 38 * d;
        const dy = (cy - 0.5) * 26 * d;
        el.style.setProperty('--scene-x', dx.toFixed(2)+'px');
        el.style.setProperty('--scene-y', dy.toFixed(2)+'px');
      });
      raf = requestAnimationFrame(tick);
    };
    field.querySelector('.hero-scene__glow--night')?.setAttribute('data-depth','0.45');
    field.querySelector('.hero-scene__glow--day')?.setAttribute('data-depth','0.55');
    field.querySelector('.hero-scene__orb--moon')?.setAttribute('data-depth','1.2');
    field.querySelector('.hero-scene__orb--sun')?.setAttribute('data-depth','1.0');
    field.querySelector('.hero-scene__page')?.setAttribute('data-depth','0.75');
    field.querySelector('.hero-scene__constellation')?.setAttribute('data-depth','1.45');
    field.querySelector('.hero-scene__classroom')?.setAttribute('data-depth','0.9');
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
    document.addEventListener('DOMContentLoaded', ()=>{ initHeroScene(); initTilt(); initCardHover(); });
  } else {
    initHeroScene(); initTilt(); initCardHover();
  }
})();
