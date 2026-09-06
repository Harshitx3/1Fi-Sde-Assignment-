import { useState, useMemo, useEffect } from 'react'
import MarketplaceSearch from '../components/MarketplaceSearch.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { marketplaceProducts, productCategories } from '../data/products.js'

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  const filteredProducts = useMemo(() => {
    return marketplaceProducts.filter((product) => {
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.store.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        activeCategory === 'All' || product.category === activeCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, activeCategory])

  return (
    <div className="marketplace">
      <section className="marketplace-hero">
        <div className="marketplace-hero-top">
          <span className="marketplace-hero-pill">1Fi Marketplace</span>
          <span className="marketplace-hero-count">
            {loading ? '...' : `${marketplaceProducts.length} products`}
          </span>
        </div>
        <h2 className="marketplace-hero-title">Shop now, pay later with 1Fi EMI</h2>
        <p className="marketplace-hero-subtitle">
          Browse products across smartphones, laptops, TVs and appliances. Pay in easy monthly installments using your mutual funds. No credit score required.
        </p>
      </section>

      <MarketplaceSearch
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search smartphones, laptops, TVs..."
      />

      <div className="category-filters">
        {productCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-filter ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="marketplace-results-bar">
        <span className="marketplace-results-text">
          {loading
            ? 'Loading products...'
            : `${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'} found`}
        </span>
        {searchQuery && (
          <button
            type="button"
            className="marketplace-reset-btn"
            onClick={() => {
              setSearchQuery('')
              setActiveCategory('All')
            }}
          >
            Reset filters
          </button>
        )}
      </div>

      <ProductGrid products={filteredProducts} loading={loading} />
    </div>
  )
}
