import "./gameboard.styles.css";
import StyledCell from "../../Cells/cell.component";
import { useState } from "react";


const Gameboard = () => {
    const [board, setBoard] = useState(Array(9).fill(''));
    // default player is X
    const [currentPlayer, setCurrentPlayer] = useState('X');

    const handleCellClick = (index) => {
       if (board[index] === '') {
        const updatedBoard = [...board];
        // keeping track of player's turn
        updatedBoard[index] = currentPlayer;
        setBoard(updatedBoard);
        // turn switching on cell click
        setCurrentPlayer(currentPlayer === 'X'? 'O' : 'X');
       } else {
        return
       }
      };

    return (
    <div className="game-board">
      <StyledCell
        className="cell top-left"
        onClick={() => handleCellClick(0)}
        value={board[0]}
      />
      <StyledCell
        className="cell top-center"
        onClick={() => handleCellClick(1)}
        value={board[1]}
      />
      <StyledCell
        className="cell top-right"
        onClick={() => handleCellClick(2)}
        value={board[2]}
      />
      <StyledCell
        className="cell middle-left"
        onClick={() => handleCellClick(3)}
        value={board[3]}
      />
      <StyledCell
        className="cell middle-center"
        onClick={() => handleCellClick(4)}
        value={board[4]}
      />
      <StyledCell
        className="cell middle-right"
        onClick={() => handleCellClick(5)}
        value={board[5]}
      />
      <StyledCell
        className="cell bottom-left"
        onClick={() => handleCellClick(6)}
        value={board[6]}
      />
      <StyledCell
        className="cell bottom-center"
        onClick={() => handleCellClick(7)}
        value={board[7]}
      />
      <StyledCell
        className="cell bottom-right"
        onClick={() => handleCellClick(8)}
        value={board[8]}
      />
    </div>
    )
}

export default Gameboard;