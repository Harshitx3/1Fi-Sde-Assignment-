import { useState } from 'react'
import '../styles/Shop.css'
import PromoBanner from '../components/PromoBanner.jsx'
import TabNav from '../components/TabNav.jsx'
import BottomNav from '../components/BottomNav.jsx'
import Marketplace from './Marketplace.jsx'

const TABS = ['Top Brands', 'Nearby Stores', '1Fi Marketplace']

export default function Shop() {
  const [activeTab, setActiveTab] = useState('1Fi Marketplace')

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

          {activeTab === '1Fi Marketplace' ? <Marketplace /> : null}
        </div>
      </div>

      <BottomNav active="shop" />
    </div>
  )
}
