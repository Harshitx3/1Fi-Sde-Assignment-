import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products, loading = false }) {
  if (loading) {
    return (
      <div className="product-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="product-card product-card-skeleton">
            <div className="product-media skeleton-media" />
            <div className="product-body">
              <div className="skeleton-line skeleton-store" />
              <div className="skeleton-line skeleton-title" />
              <div className="skeleton-line skeleton-title-short" />
              <div className="skeleton-line skeleton-rating" />
              <div className="skeleton-line skeleton-desc" />
              <div className="skeleton-line skeleton-price" />
              <div className="skeleton-line skeleton-emi" />
              <div className="skeleton-line skeleton-btn" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="product-empty">
        <div className="product-empty-icon">
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
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
        <h3 className="product-empty-title">No products found</h3>
        <p className="product-empty-text">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
