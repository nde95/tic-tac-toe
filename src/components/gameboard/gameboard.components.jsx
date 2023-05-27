import "./gameboard.styles.css";
import StyledCell from "../Cells/cell.component";
import { useState, useContext, useEffect } from "react";
import PlayerX from "../players/playerX.component";
import PlayerO from "../players/playerO.component";
import Toby from "../computer-player/toby";
import { GameContext } from "../../context/gamecontext";
import useGameOver from "../game-over-alert/game-over-alert.component";

const Gameboard = () => {
  const {gameState, setGameState, gameOver, setGameOver, resetGame, checkWin, checkDraw} = useContext(GameContext);

  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [animateX, setAnimateX] = useState(false);
  const [animateO, setAnimateO] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const { handleWin, handleDraw } = useGameOver(currentPlayer, setCurrentPlayer, resetGame);

  useEffect(() => {
    if (checkWin(currentPlayer, gameState)) {
      setGameOver(true)
      handleWin();
    } else if (checkDraw(gameState)) {
      setGameOver(true)
      handleDraw();
    }
  }, [currentPlayer]);


  const handleCellClick = (index) => {
    if (isAnimating) {
      return;
    } else if (gameOver) {
      return;
    }


  
    const row = Math.floor(index / 3);
    const col = index % 3;
  
    if (gameState[row][col] === '') {
      const updatedGameState = gameState.map((rowArr, rowIndex) =>
        rowArr.map((cell, colIndex) => {
          if (rowIndex === row && colIndex === col) {
            return currentPlayer;
          }
          return cell;
        })
      );
  
      setGameState(updatedGameState);
      setAnimateX(true);
      setAnimateO(true);
      setIsAnimating(true);
  
      setTimeout(() => {
        setAnimateO(false);
        setAnimateX(false);
        setIsAnimating(false);
       // Perform a check to see if 'X' has won, if not, switch turns
       if (!checkWin('X', gameState)) {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
      }, 1000);
    }
  };
  

  const getValue = (index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    if (gameState[row][col] === 'X') {
      return <PlayerX animate={animateX} />;
    } else if (gameState[row][col] === 'O') {
      return <PlayerO animate={animateO} />;
    } else {
      return '';
    }
  }

  return (
    <div className="game-board">
      {[...Array(9).keys()].map(index => (
        <StyledCell
          className={`cell ${index}`}
          onClick={() => handleCellClick(index)}
          value={getValue(index)}
        />
      ))}
      {currentPlayer === 'O' && <Toby currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} />}
    </div>
  )
}

export default Gameboard;
