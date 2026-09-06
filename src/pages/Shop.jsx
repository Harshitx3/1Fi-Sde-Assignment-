import { useState } from 'react'
import '../styles/Shop.css'
import PromoBanner from '../components/PromoBanner.jsx'
import TabNav from '../components/TabNav.jsx'
import SearchBar from '../components/SearchBar.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import BrandCard from '../components/BrandCard.jsx'
import BottomNav from '../components/BottomNav.jsx'
import { topBrands } from '../data/brands.js'

const TABS = ['Top Brands', 'Nearby Stores']

export default function Shop() {
  const [activeTab, setActiveTab] = useState('Top Brands')

  return (
    <div className="app-shell">
      <div className="shop-page">
        <div className="shop-content">
          <PromoBanner />

          <TabNav
            tabs={TABS}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          <SearchBar placeholder="Search online stores..." />

          {activeTab === 'Top Brands' ? (
            <section>
              <SectionHeading
                title="Top Brands"
                linkText="See All"
              />
              <div className="brand-list">
                {topBrands.map((brand) => (
                  <BrandCard key={brand.id} brand={brand} />
                ))}
              </div>
            </section>
          ) : (
            <section>
              <SectionHeading title="Nearby Stores" />
              <div
                style={{
                  padding: '32px 20px',
                  textAlign: 'center',
                  color: 'var(--color-text-muted)',
                  fontSize: 14,
                  border: '1px dashed var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                Nearby stores coming soon.
              </div>
            </section>
          )}
        </div>
      </div>

      <BottomNav active="shop" />
    </div>
  )
}
