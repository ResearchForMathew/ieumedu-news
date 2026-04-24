// ArticleCard.jsx
function ArticleCard({ href, img, alt, category, title, desc, kicker }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <article className="article-card" onMouseMove={onMove}>
      <a className="article-card__thumb" href={href} aria-label={title}>
        <img src={img} alt={alt} loading="lazy" />
        <span className="article-card__cat">{category}</span>
      </a>
      <div className="article-card__body">
        {kicker && <span className="kicker">{kicker}</span>}
        <h3 className="article-card__title">{title}</h3>
        <p className="article-card__desc">{desc}</p>
        <a className="inline-link" href={href}>기사 보기 <span aria-hidden="true">→</span></a>
      </div>
    </article>
  );
}

window.ArticleCard = ArticleCard;
