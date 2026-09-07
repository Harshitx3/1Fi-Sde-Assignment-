import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { marketplaceProducts } from '../data/products.js'
import VariantSelector from '../components/VariantSelector.jsx'
import EMIPlanList from '../components/EMIPlanList.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = marketplaceProducts.find((p) => p.id === Number(id))

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedEmiIndex, setSelectedEmiIndex] = useState(-1)
  const [customerName, setCustomerName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [purchaseStatus, setPurchaseStatus] = useState('idle')
  const [imgErrors, setImgErrors] = useState({})

  const selectedVariant = product?.variants?.[selectedVariantIndex] || product?.variants?.[0]
  const galleryImages = selectedVariant?.gallery || (selectedVariant?.image ? [selectedVariant.image] : [])
  const currentImage = galleryImages[selectedImageIndex] || selectedVariant?.image || product?.image
  const currentPrice = selectedVariant?.price ?? product?.price
  const hasDiscount = product?.originalPrice && product.originalPrice > currentPrice
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100)
    : 0

  const emiPlans = selectedVariant?.emiPlans || []
  const hasEmiPlans = emiPlans.length > 0
  const selectedEmiPlan = selectedEmiIndex >= 0 ? emiPlans[selectedEmiIndex] : null

  const isNameValid = customerName.trim().length > 0
  const isMobileValid = /^[6-9]\d{9}$/.test(mobileNumber.trim())
  const canProceed =
    product != null &&
    selectedVariant != null &&
    hasEmiPlans &&
    selectedEmiIndex >= 0 &&
    isNameValid &&
    isMobileValid

  useEffect(() => {
    setSelectedEmiIndex(-1)
    setSelectedImageIndex(0)
  }, [selectedVariantIndex])

  if (!product) {
    return (
      <div className="app-shell">
        <div className="shop-page">
          <div className="shop-content">
            <div className="product-detail">
              <div className="pd-top-row">
                <button
                  type="button"
                  className="product-back-btn"
                  onClick={() => navigate('/')}
                >
                  ← Back to Marketplace
                </button>
                <ThemeToggle />
              </div>
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

  const handleVariantChange = (index) => {
    setSelectedVariantIndex(index)
  }

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index)
  }

  const handleEmiSelect = (index) => {
    setSelectedEmiIndex(index)
  }

  const handleCtaClick = () => {
    if (!canProceed) return
    setPurchaseStatus('submitting')
    setTimeout(() => {
      setPurchaseStatus('success')
    }, 600)
  }

  const handleBackToMarketplace = () => {
    setPurchaseStatus('idle')
    setCustomerName('')
    setMobileNumber('')
    setSelectedEmiIndex(-1)
    setSelectedVariantIndex(0)
    setSelectedImageIndex(0)
    navigate('/')
  }

  if (purchaseStatus === 'success') {
    const planMonthly = selectedEmiPlan?.amount ?? selectedEmiPlan?.monthlyAmount ?? 0
    const variantSummary = Object.entries(selectedVariant || {})
      .filter(([k]) => !['price', 'emiPlans', 'image', 'gallery', 'id', 'colorHex'].includes(k))
      .map(([, v]) => v)
      .join(' · ')

    return (
      <div className="app-shell">
        <div className="shop-page pd-page">
          <div className="shop-content pd-content">
            <div className="pd-top-row">
              <button
                type="button"
                className="product-back-btn"
                onClick={() => navigate(-1)}
              >
                ← Back
              </button>
              <ThemeToggle />
            </div>

            <div className="pd-success-card">
              <div className="pd-success-icon-wrap">
                <svg
                  className="pd-success-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h1 className="pd-success-title">Purchase Request Submitted</h1>

              <p className="pd-success-subtitle">
                Your request for{' '}
                <span className="pd-success-product-name">{product.name}</span>
                {variantSummary && <span className="pd-success-variant"> · {variantSummary}</span>}
                {' '}has been submitted.
              </p>

              <div className="pd-success-emi-box">
                <div className="pd-success-emi-row">
                  <span className="pd-success-emi-label">EMI</span>
                  <span className="pd-success-emi-amount">
                    ₹{planMonthly.toLocaleString('en-IN')}/month
                  </span>
                </div>
                <div className="pd-success-emi-row">
                  <span className="pd-success-emi-label">Tenure</span>
                  <span className="pd-success-emi-value">
                    {selectedEmiPlan?.months} months
                  </span>
                </div>
                <div className="pd-success-emi-row">
                  <span className="pd-success-emi-label">Type</span>
                  <span className={`pd-success-emi-tag ${selectedEmiPlan?.isNoCost ? 'nocost' : 'standard'}`}>
                    {selectedEmiPlan?.isNoCost ? 'No-cost EMI' : 'Standard EMI'}
                  </span>
                </div>
              </div>

              <p className="pd-success-contact">
                We'll contact you on your registered mobile number for the next steps.
              </p>

              <button
                type="button"
                className="pd-success-btn"
                onClick={handleBackToMarketplace}
              >
                Back to Marketplace
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const ctaMonthlyAmount = selectedEmiPlan
    ? selectedEmiPlan.amount ?? selectedEmiPlan.monthlyAmount ?? 0
    : 0

  return (
    <div className="app-shell">
      <div className="shop-page pd-page">
        <div className="shop-content pd-content pd-product-layout">
          <div className="pd-top-row">
            <button
              type="button"
              className="product-back-btn"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
            <ThemeToggle />
          </div>

          <div className="pd-image-section">
            <div className="pd-image-wrap">
              {imgErrors['main'] || !currentImage ? (
                <div className="pd-image-fallback">
                  {product.category?.charAt(0) || product.name.charAt(0)}
                </div>
              ) : (
                <img
                  src={currentImage}
                  alt={product.name}
                  className="pd-image"
                  onError={() => setImgErrors((prev) => ({ ...prev, main: true }))}
                />
              )}
              {hasDiscount && (
                <span className="pd-image-discount">-{discountPercent}%</span>
              )}
            </div>

            {galleryImages.length > 1 && (
              <div className="pd-gallery-thumbs" role="list">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="listitem"
                    className={`pd-gallery-thumb ${selectedImageIndex === idx ? 'active' : ''}`}
                    onClick={() => handleThumbnailClick(idx)}
                    aria-label={`View image ${idx + 1}`}
                    aria-pressed={selectedImageIndex === idx}
                  >
                    {imgErrors[`thumb-${idx}`] ? (
                      <div className="pd-gallery-thumb-fallback">
                        {product.category?.charAt(0)}
                      </div>
                    ) : (
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        className="pd-gallery-thumb-img"
                        onError={() =>
                          setImgErrors((prev) => ({ ...prev, [`thumb-${idx}`]: true }))
                        }
                        loading="lazy"
                      />
                    )}
                  </button>
                ))}
              </div>
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
            {product.variants && product.variants.length > 0 ? (
              <VariantSelector
                variants={product.variants}
                selectedIndex={selectedVariantIndex}
                onChange={handleVariantChange}
              />
            ) : (
              <p className="pd-empty-msg">No variants available.</p>
            )}
          </section>

          <section
            className={`pd-section pd-emi-section ${
              hasEmiPlans && selectedEmiPlan ? 'open' : ''
            }`}
          >
            <h2 className="pd-section-title">Choose EMI Plan</h2>
            <EMIPlanList
              plans={emiPlans}
              productPrice={currentPrice}
              selectedIndex={selectedEmiIndex}
              onSelect={handleEmiSelect}
            />
          </section>

          <section className="pd-section">
            <h2 className="pd-section-title">Customer Details</h2>
            <div className="pd-customer-form">
              <div className="pd-form-field">
                <label htmlFor="customerName" className="pd-form-label">
                  Full Name <span className="pd-form-required">*</span>
                </label>
                <input
                  id="customerName"
                  type="text"
                  className={`pd-form-input ${customerName && !isNameValid ? 'error' : ''}`}
                  placeholder="Enter your name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  autoComplete="name"
                />
                {customerName && !isNameValid && (
                  <p className="pd-form-error">Please enter your name.</p>
                )}
              </div>

              <div className="pd-form-field">
                <label htmlFor="mobileNumber" className="pd-form-label">
                  Mobile Number <span className="pd-form-required">*</span>
                </label>
                <input
                  id="mobileNumber"
                  type="tel"
                  className={`pd-form-input ${mobileNumber && !isMobileValid ? 'error' : ''}`}
                  placeholder="Enter 10-digit mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  inputMode="numeric"
                  maxLength={10}
                  autoComplete="tel"
                />
                {mobileNumber && !isMobileValid && (
                  <p className="pd-form-error">
                    Please enter a valid 10-digit Indian mobile number (starting with 6-9).
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>

        <div className="pd-cta-bar">
          <div className="pd-cta-summary">
            {purchaseStatus === 'submitting' ? (
              <>
                <span className="pd-cta-label">Processing</span>
                <span className="pd-cta-price">Submitting...</span>
              </>
            ) : selectedEmiPlan ? (
              <>
                <span className="pd-cta-label">{selectedEmiPlan.months} month EMI</span>
                <span className="pd-cta-price">
                  ₹{ctaMonthlyAmount.toLocaleString('en-IN')}/mo
                </span>
              </>
            ) : hasEmiPlans ? (
              <>
                <span className="pd-cta-label">Starting EMI</span>
                <span className="pd-cta-price">
                  ₹{Math.round(currentPrice / 12).toLocaleString('en-IN')}/mo
                </span>
              </>
            ) : (
              <>
                <span className="pd-cta-label">Full Payment</span>
                <span className="pd-cta-price">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>
              </>
            )}
          </div>
          <button
            type="button"
            className={`pd-cta-btn ${canProceed && purchaseStatus !== 'submitting' ? 'active' : 'disabled'}`}
            onClick={handleCtaClick}
            disabled={!canProceed || purchaseStatus === 'submitting'}
            aria-disabled={!canProceed || purchaseStatus === 'submitting'}
          >
            {purchaseStatus === 'submitting'
              ? 'Submitting...'
              : !hasEmiPlans
              ? 'No EMI Available'
              : canProceed
              ? 'Buy with EMI'
              : !selectedVariant
              ? 'Select Variant'
              : selectedEmiIndex < 0
              ? 'Select EMI Plan'
              : !isNameValid || !isMobileValid
              ? 'Enter Details'
              : 'Complete Details'}
          </button>
        </div>
      </div>
    </div>
  )
}
