import { Routes, Route } from 'react-router-dom'
import Shop from './pages/Shop.jsx'
import ProductDetail from './pages/ProductDetail.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  )
}
