// PrincipleCard.jsx
function PrincipleCard({ num, text }) {
  return (
    <article className="principle-card">
      <div className="principle-card__num">{num}</div>
      <p className="principle-card__text">{text}</p>
    </article>
  );
}

window.PrincipleCard = PrincipleCard;
