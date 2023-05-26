import { useContext, useEffect } from "react";
import { GameContext } from "../../context/gamecontext";

const Toby = ({ currentPlayer, setCurrentPlayer }) => {
    const {gameState, setGameState} = useContext(GameContext);

    const makeTobyMove = () => {
        // Check if it's PlayerO's turn
        if (currentPlayer === 'O') {
          // Get the indices of all empty squares
          const emptySquares = [];
          gameState.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
              if (cell === '') {
                emptySquares.push([rowIndex, colIndex]);
              }
            });
          });
      
          // Randomly select an empty square
          const randomIndex = Math.floor(Math.random() * emptySquares.length);
          const [randomRowIndex, randomColIndex] = emptySquares[randomIndex];
      
          // Update the game state with Toby's move
          const updatedGameState = gameState.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              if (rowIndex === randomRowIndex && colIndex === randomColIndex) {
                return 'O';
              }
              return cell;
            })
          );
          setGameState(updatedGameState);

          // switch turn to X after making a move
          setCurrentPlayer('X');
        }
      };

    useEffect(() => {
      makeTobyMove();
    }, [currentPlayer]);

    return null; 
}

export default Toby;