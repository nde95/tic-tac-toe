import './App.css'
import Gameboard from './components/gameboard/gameboard.components'
import { GameProvider } from './context/gamecontext';

function App() {

  return (
    <>
    <GameProvider>
      <Gameboard />
    </GameProvider>
    </>
  )
}

export default App
