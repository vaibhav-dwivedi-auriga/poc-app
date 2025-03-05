
export default function BenefitsCard({ benefit, onCardClick }) {
  return (
    <div className="benefit-card" onClick={(e)=>{e.stopPropagation();onCardClick(benefit)}}>
      <div className="benefit-title">
        <span>{benefit?.title}</span>
      </div>
    </div>
  );
}
