import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import TxGraph from './pages/tx'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tx' element={<TxGraph />} />
    </Routes>
    </>
  )
}

export default App