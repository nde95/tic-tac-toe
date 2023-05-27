import './App.css'
import Gameboard from './components/gameboard/gameboard.components'
import { GameProvider } from './context/gamecontext';
import Logo from './components/logo/logo.component';

function App() {

  return (
    <>
     <Logo />
    <GameProvider>
      <Gameboard />
    </GameProvider>
    </>
  )
}

export default App
