import { useParams, useNavigate } from 'react-router-dom'
import { marketplaceProducts } from '../data/products.js'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = marketplaceProducts.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <div className="app-shell">
        <div className="shop-page">
          <div className="shop-content">
            <div className="product-detail-not-found">
              <button
                type="button"
                className="product-back-btn"
                onClick={() => navigate(-1)}
              >
                ← Back to Marketplace
              </button>
              <h2>Product not found</h2>
              <p>The product you're looking for doesn't exist.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <div className="shop-page">
        <div className="shop-content">
          <div className="product-detail-placeholder">
            <button
              type="button"
              className="product-back-btn"
              onClick={() => navigate(-1)}
            >
              ← Back to Marketplace
            </button>
            <div className="product-detail-card">
              <h2 className="product-detail-title">{product.name}</h2>
              <p className="product-detail-store">{product.store}</p>
              <div className="product-detail-price">
                ₹{product.price.toLocaleString('en-IN')}
              </div>
              <p className="product-detail-note">
                Product detail screen coming in the next step. This is a placeholder route transition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
