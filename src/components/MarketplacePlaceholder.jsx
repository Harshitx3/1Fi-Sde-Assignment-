export default function MarketplacePlaceholder() {
  const products = [
    {
      id: 1,
      store: 'Poorvika Mobiles',
      title: 'Apple iPhone 16 (128 GB) - White',
      price: 79900,
      emiMonths: 12,
      emiStart: 6659,
      badge: 'No Cost EMI',
      rating: 4.6,
      ratingCount: 12840,
    },
    {
      id: 2,
      store: 'Croma',
      title: 'Samsung Galaxy S25 Ultra 5G (256GB, Titanium Black)',
      price: 129999,
      emiMonths: 12,
      emiStart: 10834,
      badge: 'No Cost EMI',
      rating: 4.7,
      ratingCount: 8320,
    },
    {
      id: 3,
      store: 'Vijay Sales',
      title: 'Sony WH-1000XM6 Wireless Noise Cancelling Headphones',
      price: 34990,
      emiMonths: 6,
      emiStart: 5832,
      badge: 'No Cost EMI',
      rating: 4.8,
      ratingCount: 4210,
    },
  ]

  return (
    <div className="marketplace">
      <section className="marketplace-header">
        <div className="marketplace-header-bar">
          <span className="marketplace-header-pill">1Fi Marketplace</span>
          <span className="marketplace-header-count">{products.length} products</span>
        </div>
      </section>

      <ul className="product-list">
        {products.map((p) => (
          <li key={p.id} className="product-card">
            <div className="product-media" aria-hidden="true">
              <span className="product-media-badge">{p.badge}</span>
            </div>
            <div className="product-body">
              <p className="product-store">{p.store}</p>
              <h3 className="product-title">{p.title}</h3>
              <div className="product-rating">
                <span className="product-rating-score">★ {p.rating}</span>
                <span className="product-rating-count">
                  ({p.ratingCount.toLocaleString('en-IN')})
                </span>
              </div>
              <div className="product-price-row">
                <span className="product-price">
                  ₹{p.price.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="product-emi">
                <span className="product-emi-label">EMI starts at</span>
                <span className="product-emi-value">
                  ₹{p.emiStart.toLocaleString('en-IN')}/mo
                </span>
                <span className="product-emi-tenure">· {p.emiMonths} months</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
