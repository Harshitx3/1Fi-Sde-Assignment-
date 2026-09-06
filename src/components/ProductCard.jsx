import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false)
  const navigate = useNavigate()

  const startingEmi = product.emiPlans
    ? product.emiPlans.reduce((min, plan) =>
        plan.amount < min.amount ? plan : min
      )
    : { amount: Math.round(product.price / 12), months: 12, isNoCost: true }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`)
  }

  return (
    <div className="product-card">
      <div className="product-media">
        {imgError ? (
          <div className="product-media-fallback">
            {product.category?.charAt(0) || product.name.charAt(0)}
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="product-media-img"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}
        {hasDiscount && (
          <span className="product-media-discount">-{discountPercent}%</span>
        )}
        {startingEmi.isNoCost && (
          <span className="product-media-badge">No Cost EMI</span>
        )}
      </div>

      <div className="product-body">
        <p className="product-store">{product.store}</p>

        <h3 className="product-title">{product.name}</h3>

        <div className="product-rating">
          <span className="product-rating-score">★ {product.rating}</span>
          <span className="product-rating-count">
            ({product.ratingCount?.toLocaleString('en-IN')})
          </span>
        </div>

        <p className="product-description">{product.shortDescription}</p>

        <div className="product-price-row">
          <span className="product-price">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {hasDiscount && (
            <span className="product-original-price">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        <div className="product-emi">
          <span className="product-emi-label">EMI starts at</span>
          <span className="product-emi-value">
            ₹{startingEmi.amount.toLocaleString('en-IN')}/mo
          </span>
          <span className="product-emi-tenure">· {startingEmi.months} months</span>
        </div>

        <button
          type="button"
          className="product-view-btn"
          onClick={handleViewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  )
}
