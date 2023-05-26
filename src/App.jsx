import { useState } from 'react'
import './App.css'
import Gameboard from './components/gameboard/gameboard.components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Gameboard />
    </>
  )
}

export default App
