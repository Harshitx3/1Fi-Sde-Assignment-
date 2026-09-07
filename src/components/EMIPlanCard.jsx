export default function EMIPlanCard({ plan, productPrice, selected = false, onSelect }) {
  const monthlyAmount = plan.amount
  const months = plan.months
  const totalPayable = monthlyAmount * months
  const isNoCost = plan.isNoCost
  const extraPaid = totalPayable - productPrice

  return (
    <button
      type="button"
      className={`emi-plan-card ${selected ? 'selected' : ''}`}
      onClick={onSelect}
      aria-pressed={selected}
      role="radio"
      aria-checked={selected}
    >
      <div className="emi-plan-main">
        <div className="emi-plan-amount-row">
          <span className="emi-plan-amount">
            ₹{monthlyAmount.toLocaleString('en-IN')}
            <span className="emi-plan-amount-suffix"> / month</span>
          </span>
          <div className={`emi-plan-radio ${selected ? 'checked' : ''}`} aria-hidden="true">
            {selected && <div className="emi-plan-radio-dot" />}
          </div>
        </div>
        <div className="emi-plan-tenure">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            width="14"
            height="14"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>{months} months</span>
        </div>
      </div>

      <div className="emi-plan-footer">
        <div className="emi-plan-type">
          {isNoCost ? (
            <span className="emi-plan-tag emi-plan-tag-nocost">
              No-cost EMI
            </span>
          ) : (
            <span className="emi-plan-tag emi-plan-tag-interest">
              Standard EMI
            </span>
          )}
        </div>
        <div className="emi-plan-total">
          <span className="emi-plan-total-label">Total payable</span>
          <span className="emi-plan-total-value">
            ₹{totalPayable.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {!isNoCost && extraPaid > 0 && (
        <div className="emi-plan-interest-note">
          Includes ₹{extraPaid.toLocaleString('en-IN')} interest
        </div>
      )}
    </button>
  )
}
