import { useContext, useEffect } from "react";
import { GameContext } from "../../context/gamecontext";
import useGameOver from "../game-over-alert/game-over-alert.component";

const Toby = ({ currentPlayer, setCurrentPlayer }) => {
    const {gameState, setGameState, gameOver, setGameOver, checkDraw, checkWin, resetGame} = useContext(GameContext);
    const { handleWin, handleDraw } = useGameOver(currentPlayer, setCurrentPlayer, resetGame);

    useEffect(() => {
      if (checkWin(currentPlayer)) {
        setGameOver(true)
        handleWin();
      } else if (checkDraw()) {
        setGameOver(true)
        handleDraw();
      }
    }, [currentPlayer]);

    const makeTobyMove = () => {

        if (currentPlayer !== 'O' || gameOver) {
            return;
        }

        // Check if it's PlayerO's turn
         else if (currentPlayer === 'O') {
            // If X has won or the game has been drawn, don't make a move
            if (checkWin('X') || checkDraw()) {
                // pull the alert and force turn back to X to disable game board
                handleWin();
                setCurrentPlayer('X')
                return;
            }
          // Get the indices of all empty squares
          const emptySquares = [];
          gameState.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
              if (cell === '') {
                emptySquares.push([rowIndex, colIndex]);
              }
            });
          });

           // Check if there are no more empty squares (board is full)
           if (emptySquares.length === 0) {
            // Update the game over state
            setGameOver(true);
            return; // Exit the function, no more moves can be made
          } else if (gameOver) {
            return; // Exit the function, no more moves can be made
          }
      
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

           // Check if Toby has won after making his move
            if (checkWin('O', updatedGameState)) {
                setGameState(updatedGameState);
                setGameOver(true);
                handleWin();
                return; // Exit the function as the game is over
            } else if (checkDraw(updatedGameState)) {
                setGameState(updatedGameState);
                setGameOver(true);
                handleDraw();
                return; // Exit the function as the game is over
            }

            // If Toby hasn't won and the game is not a draw, update the gameState and switch turn to X
            setGameState(updatedGameState);
            setCurrentPlayer('X');
        }
      };

    useEffect(() => {
      makeTobyMove();
    }, [currentPlayer, gameOver]);


    return null; 
}

export default Toby;
