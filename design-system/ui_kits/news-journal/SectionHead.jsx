// SectionHead.jsx
function SectionHead({ kicker, title, desc, action }) {
  return (
    <div className="section-head">
      <div>
        <span className="kicker">{kicker}</span>
        <h2 className="section-title">{title}</h2>
        {desc && <p className="section-desc">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

window.SectionHead = SectionHead;
