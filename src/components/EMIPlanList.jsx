import EMIPlanCard from './EMIPlanCard.jsx'

export default function EMIPlanList({ plans = [], productPrice, selectedIndex, onSelect }) {
  if (!plans || plans.length === 0) {
    return (
      <div className="emi-plan-empty">
        <div className="emi-plan-empty-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            width="36"
            height="36"
          >
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <p className="emi-plan-empty-title">No EMI plans available for this product.</p>
        <p className="emi-plan-empty-text">
          Please check back later or choose a different product.
        </p>
      </div>
    )
  }

  return (
    <div className="emi-plan-list" role="radiogroup" aria-label="Select EMI plan">
      {plans.map((plan, index) => (
        <EMIPlanCard
          key={plan.id || `${plan.months}-${plan.amount || plan.monthlyAmount}-${index}`}
          plan={plan}
          productPrice={productPrice}
          selected={selectedIndex === index}
          onSelect={() => onSelect(index)}
        />
      ))}
    </div>
  )
}
