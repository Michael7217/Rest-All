import { useState } from 'react'
import './App.css'
import { Sidebar } from './components'
import { Home } from './pages'
// import { Rotas } from './routes'


function App() {
  const [isActive, setIsActive] = useState(false)
  const handletoogle = () => {
    setIsActive(!isActive)
  }
  return (
    <>
    {/* <Rotas/> */}
    <Sidebar ativo={isActive}/>
    <Home isactivesidebar={isActive} toogle={handletoogle}/>
    </>
  )
}

export default App
