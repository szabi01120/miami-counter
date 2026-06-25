import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Niki from './pages/Niki'
import Szabi from './pages/Szabi'

export default function App() {
  return (
    <BrowserRouter basename="/miami-counter">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/niki" element={<Niki />} />
        <Route path="/szabi" element={<Szabi />} />
      </Routes>
    </BrowserRouter>
  )
}
