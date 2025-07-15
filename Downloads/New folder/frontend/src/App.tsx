import { Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import CountryPage from './CountryPage'
import StateDetailPage from './StateDetailPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/country/:countryName" element={<CountryPage />} />
      <Route path="/country/:countryName/state/:stateName" element={<StateDetailPage />} />
    </Routes>
  )
}

export default App 