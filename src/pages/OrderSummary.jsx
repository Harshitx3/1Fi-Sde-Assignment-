import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function OrderSummary() {
  const location = useLocation()
  const navigate = useNavigate()
  const [confirmed, setConfirmed] = useState(false)
  const state = location.state

  if (!state || !state.product || !state.emiPlan) {
    return (
      <div className="app-shell">
        <div className="shop-page">
          <div className="shop-content">
            <div className="os-wrapper">
              <button
                type="button"
                className="product-back-btn"
                onClick={() => navigate('/')}
              >
                ← Back to Marketplace
              </button>
              <div className="pd-not-found">
                <div className="pd-not-found-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    width="48"
                    height="48"
                  >
                    <path d="M9 11H3v10h18V11h-6" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                </div>
                <h2 className="pd-not-found-title">No order details found</h2>
                <p className="pd-not-found-text">
                  Please start by selecting a product from the Marketplace.
                </p>
                <button
                  type="button"
                  className="pd-cta-btn"
                  onClick={() => navigate('/')}
                >
                  Go to Marketplace
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const { product, variantSummary, price, emiPlan } = state
  const emiMonthly = emiPlan.amount ?? emiPlan.monthlyAmount ?? 0
  const emiIsNoCost = emiPlan.isNoCost ?? (emiPlan.type === 'No-cost EMI')
  const totalPayable =
    emiPlan.totalAmount ?? emiPlan.totalPayable ?? emiMonthly * emiPlan.months
  const interest = totalPayable - price
  const [imgError, setImgError] = useState(false)

  const handleContinue = () => {
    setConfirmed(true)
  }

  const handleBackToMarketplace = () => {
    navigate('/')
  }

  return (
    <div className="app-shell">
      <div className="shop-page pd-page">
        <div className="shop-content pd-content pd-order-layout">
          <button
            type="button"
            className="product-back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <header className="os-header">
            <h1 className="os-title">
              {confirmed ? 'Order Placed' : 'Order Summary'}
            </h1>
            <p className="os-subtitle">
              {confirmed
                ? 'Your purchase request has been recorded.'
                : 'Review your selection before proceeding.'}
            </p>
          </header>

          {confirmed && (
            <div className="os-success-badge">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                width="22"
                height="22"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Request Submitted</span>
            </div>
          )}

          <section className="pd-section os-product-section">
            <div className="os-product-card">
              <div className="os-product-thumb">
                {imgError ? (
                  <div className="pd-image-fallback" style={{ fontSize: '32px' }}>
                    {product.category?.charAt(0) || 'P'}
                  </div>
                ) : (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="os-product-thumb-img"
                    onError={() => setImgError(true)}
                  />
                )}
              </div>
              <div className="os-product-info">
                <p className="os-product-store">{product.store}</p>
                <h2 className="os-product-name">{product.name}</h2>
                {variantSummary && (
                  <p className="os-product-variant">{variantSummary}</p>
                )}
                <div className="os-product-price">
                  <span className="os-product-price-value">
                    ₹{price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="pd-section">
            <h2 className="pd-section-title">Selected EMI Plan</h2>
            <div className="os-emi-card">
              <div className="os-emi-row">
                <span className="os-emi-label">Monthly EMI</span>
                <span className="os-emi-value os-emi-amount">
                  ₹{emiMonthly.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="os-emi-row">
                <span className="os-emi-label">Tenure</span>
                <span className="os-emi-value">{emiPlan.months} months</span>
              </div>
              <div className="os-emi-row">
                <span className="os-emi-label">Plan type</span>
                <span className={`os-emi-tag ${emiIsNoCost ? 'nocost' : 'interest'}`}>
                  {emiIsNoCost ? 'No-cost EMI' : 'Standard EMI'}
                </span>
              </div>
              <div className="os-emi-row os-emi-total-row">
                <span className="os-emi-label">Total payable</span>
                <span className="os-emi-value os-emi-total">
                  ₹{totalPayable.toLocaleString('en-IN')}
                </span>
              </div>
              {!emiIsNoCost && interest > 0 && (
                <div className="os-emi-row">
                  <span className="os-emi-label">Interest</span>
                  <span className="os-emi-value os-emi-interest">
                    + ₹{interest.toLocaleString('en-IN')}
                  </span>
                </div>
              )}
            </div>
          </section>

          {!confirmed && (
            <section className="pd-section os-breakdown-section">
              <h2 className="pd-section-title">Payment Breakdown</h2>
              <div className="os-breakdown">
                <div className="os-breakdown-row">
                  <span className="os-breakdown-label">Product price</span>
                  <span className="os-breakdown-value">
                    ₹{price.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="os-breakdown-row">
                  <span className="os-breakdown-label">
                    {emiIsNoCost ? 'EMI processing' : 'Interest charges'}
                  </span>
                  <span className="os-breakdown-value">
                    {emiIsNoCost
                      ? '₹0'
                      : `₹${interest.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="os-breakdown-row os-breakdown-total">
                  <span className="os-breakdown-label">Total</span>
                  <span className="os-breakdown-value">
                    ₹{totalPayable.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </section>
          )}
        </div>

        <div className="pd-cta-bar os-cta-bar">
          <div className="pd-cta-summary">
            {confirmed ? (
              <>
                <span className="pd-cta-label">Next step</span>
                <span className="pd-cta-price">Activation pending</span>
              </>
            ) : (
              <>
                <span className="pd-cta-label">x {emiPlan.months} months</span>
                <span className="pd-cta-price">
                  ₹{emiMonthly.toLocaleString('en-IN')}/mo
                </span>
              </>
            )}
          </div>
          <button
            type="button"
            className="pd-cta-btn active"
            onClick={confirmed ? handleBackToMarketplace : handleContinue}
          >
            {confirmed ? 'Back to Marketplace' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  )
}
