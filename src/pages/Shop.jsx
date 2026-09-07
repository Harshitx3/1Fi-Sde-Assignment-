import { useState } from 'react'
import '../styles/Shop.css'
import PromoBanner from '../components/PromoBanner.jsx'
import TabNav from '../components/TabNav.jsx'
import Marketplace from './Marketplace.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'

const TABS = ['Top Brands', 'Nearby Stores', 'Marketplace']

export default function Shop() {
  const [activeTab, setActiveTab] = useState('Marketplace')

  return (
    <div className="app-shell">
      <div className="shop-page">
        <div className="shop-content">
          <div className="shop-top-row">
            <PromoBanner />
            <ThemeToggle />
          </div>

          <TabNav
            tabs={TABS}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {activeTab === 'Marketplace' && <Marketplace />}
        </div>
      </div>
    </div>
  )
}
