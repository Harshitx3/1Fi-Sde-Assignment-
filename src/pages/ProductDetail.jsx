import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { marketplaceProducts } from '../data/products.js'
import VariantSelector from '../components/VariantSelector.jsx'
import EMIPlanList from '../components/EMIPlanList.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = marketplaceProducts.find((p) => p.id === Number(id))
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0)
  const [selectedEmiIndex, setSelectedEmiIndex] = useState(-1)
  const [imgError, setImgError] = useState(false)

  if (!product) {
    return (
      <div className="app-shell">
        <div className="shop-page">
          <div className="shop-content">
            <div className="product-detail">
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
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <path d="M3.27 6.96 12 12.01l8.73-5.05" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <h2 className="pd-not-found-title">Product not found</h2>
                <p className="pd-not-found-text">
                  The product you're looking for doesn't exist or may have been removed.
                </p>
                <button
                  type="button"
                  className="pd-cta-btn"
                  onClick={() => navigate('/')}
                >
                  Back to Marketplace
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const selectedVariant = product.variants[selectedVariantIndex] || product.variants[0]
  const currentPrice = selectedVariant?.price ?? product.price
  const hasDiscount = product.originalPrice && product.originalPrice > currentPrice
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100)
    : 0

  const emiPlans = useMemo(() => product.emiPlans || [], [product])
  const selectedEmiPlan = selectedEmiIndex >= 0 ? emiPlans[selectedEmiIndex] : null
  const hasEmiPlans = emiPlans.length > 0
  const canProceed = selectedEmiIndex >= 0

  const handleVariantChange = (index) => {
    setSelectedVariantIndex(index)
    setSelectedEmiIndex(-1)
  }

  const handleEmiSelect = (index) => {
    setSelectedEmiIndex((current) => (current === index ? index : index))
  }

  const handleCtaClick = () => {
    if (!canProceed) return

    const variantSummary = Object.entries(selectedVariant)
      .filter(([k]) => k !== 'price')
      .map(([, v]) => v)
      .join(' · ')

    navigate('/order-summary', {
      state: {
        product: {
          id: product.id,
          name: product.name,
          image: product.image,
          category: product.category,
          store: product.store,
        },
        variant: selectedVariant,
        variantSummary,
        price: currentPrice,
        emiPlan: selectedEmiPlan,
      },
    })
  }

  return (
    <div className="app-shell">
      <div className="shop-page pd-page">
        <div className="shop-content pd-content">
          <button
            type="button"
            className="product-back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <div className="pd-image-wrap">
            {imgError ? (
              <div className="pd-image-fallback">
                {product.category?.charAt(0) || product.name.charAt(0)}
              </div>
            ) : (
              <img
                src={product.image}
                alt={product.name}
                className="pd-image"
                onError={() => setImgError(true)}
              />
            )}
            {hasDiscount && (
              <span className="pd-image-discount">-{discountPercent}%</span>
            )}
          </div>

          <section className="pd-section pd-info-section">
            <p className="pd-store">{product.store}</p>
            <h1 className="pd-name">{product.name}</h1>
            <div className="pd-rating">
              <span className="pd-rating-score">★ {product.rating}</span>
              <span className="pd-rating-count">
                ({product.ratingCount?.toLocaleString('en-IN')} ratings)
              </span>
              <span className="pd-category">{product.category}</span>
            </div>
            <p className="pd-short-desc">{product.shortDescription}</p>
            <div className="pd-price-row">
              <span className="pd-price">
                ₹{currentPrice.toLocaleString('en-IN')}
              </span>
              {hasDiscount && (
                <>
                  <span className="pd-original-price">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="pd-price-save">
                    Save ₹{(product.originalPrice - currentPrice).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>
          </section>

          <section className="pd-section">
            <h2 className="pd-section-title">Specifications</h2>
            <ul className="pd-specs">
              {product.specs?.map((spec, idx) => (
                <li key={idx} className="pd-spec-row">
                  <span className="pd-spec-label">{spec.label}</span>
                  <span className="pd-spec-value">{spec.value}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="pd-section">
            <h2 className="pd-section-title">Available Variants</h2>
            <VariantSelector
              variants={product.variants}
              selectedIndex={selectedVariantIndex}
              onChange={handleVariantChange}
            />
          </section>

          <section className={`pd-section pd-emi-section ${hasEmiPlans && selectedEmiPlan ? 'open' : ''}`}>
            <h2 className="pd-section-title">Choose EMI Plan</h2>
            <EMIPlanList
              plans={emiPlans}
              productPrice={currentPrice}
              selectedIndex={selectedEmiIndex}
              onSelect={handleEmiSelect}
            />
          </section>
        </div>

        <div className="pd-cta-bar">
          <div className="pd-cta-summary">
            {selectedEmiPlan ? (
              <>
                <span className="pd-cta-label">{selectedEmiPlan.months} month EMI</span>
                <span className="pd-cta-price">
                  ₹{selectedEmiPlan.amount.toLocaleString('en-IN')}/mo
                </span>
              </>
            ) : (
              <>
                <span className="pd-cta-label">Starting EMI</span>
                <span className="pd-cta-price">
                  ₹{Math.round(currentPrice / 12).toLocaleString('en-IN')}/mo
                </span>
              </>
            )}
          </div>
          <button
            type="button"
            className={`pd-cta-btn ${canProceed ? 'active' : 'disabled'}`}
            onClick={handleCtaClick}
            disabled={!canProceed}
            aria-disabled={!canProceed}
          >
            {canProceed ? 'Proceed' : 'Select EMI Plan'}
          </button>
        </div>
      </div>
    </div>
  )
}
