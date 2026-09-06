import { Routes, Route } from 'react-router-dom'
import Shop from './pages/Shop.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Shop />} />
    </Routes>
  )
}
