import "./gameboard.styles.css";
import StyledCell from "../Cells/cell.component";
import { useState } from "react";
import PlayerX from "../players/playerX.component";
import PlayerO from "../players/playerO.component";


const Gameboard = () => {
    const [board, setBoard] = useState(Array(9).fill(''));
    // default player is X
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [animateX, setAnimateX] = useState(false);
    const [animateO, setAnimateO] = useState(false);

    const handleCellClick = (index) => {
       if (board[index] === '') {
        const updatedBoard = [...board];
        // keeping track of player's turn
        updatedBoard[index] = currentPlayer;
        setBoard(updatedBoard);
        setAnimateX(true);
        // animate player's turn
        if (currentPlayer === 'X') {
            setAnimateX(true);
          } else {
            setAnimateO(true);
          }
        // turn switching on cell click
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');


        setTimeout(() => {
            setAnimateO(false);
            setAnimateX(false);
          }, 1000);
       } else {
        return;
       }
      };

    return (
    <div className="game-board">
      <StyledCell
        className="cell top-left"
        onClick={() => handleCellClick(0)}
        value={board[0] === 'X' ? <PlayerX animate={animateX} /> : (board[0] === 'O' ? <PlayerO animate={animateO} /> : '')}
      />
      <StyledCell
        className="cell top-center"
        onClick={() => handleCellClick(1)}
        value={board[1] === 'X' ? <PlayerX animate={animateX} /> : (board[1] === 'O' ? <PlayerO animate={animateO} /> : '')}
      />
      <StyledCell
        className="cell top-right"
        onClick={() => handleCellClick(2)}
        value={board[2] === 'X' ? <PlayerX animate={animateX} /> : (board[2] === 'O' ? <PlayerO animate={animateO} /> : '')}
      />
      <StyledCell
        className="cell middle-left"
        onClick={() => handleCellClick(3)}
        value={board[3] === 'X' ? <PlayerX animate={animateX} /> : (board[3] === 'O' ? <PlayerO animate={animateO} /> : '')}
      />
      <StyledCell
        className="cell middle-center"
        onClick={() => handleCellClick(4)}
        value={board[4] === 'X' ? <PlayerX animate={animateX} /> : (board[4] === 'O' ? <PlayerO animate={animateO} /> : '')}
      />
      <StyledCell
        className="cell middle-right"
        onClick={() => handleCellClick(5)}
        value={board[5] === 'X' ? <PlayerX animate={animateX} /> : (board[5] === 'O' ? <PlayerO animate={animateO} /> : '')}
      />
      <StyledCell
        className="cell bottom-left"
        onClick={() => handleCellClick(6)}
        value={board[6] === 'X' ? <PlayerX animate={animateX} /> : (board[6] === 'O' ? <PlayerO animate={animateO} /> : '')}
      />
      <StyledCell
        className="cell bottom-center"
        onClick={() => handleCellClick(7)}
        value={board[7] === 'X' ? <PlayerX animate={animateX} /> : (board[7] === 'O' ? <PlayerO animate={animateO} /> : '')}
      />
      <StyledCell
        className="cell bottom-right"
        onClick={() => handleCellClick(8)}
        value={board[8] === 'X' ? <PlayerX animate={animateX} /> : (board[8] === 'O' ? <PlayerO animate={animateO} /> : '')}
      />
    </div>
    
    )
}

export default Gameboard;