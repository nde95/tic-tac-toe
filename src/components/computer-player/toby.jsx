import { useContext, useEffect } from "react";
import { GameContext } from "../../context/gamecontext";
import useGameOver from "../game-over-alert/game-over-alert.component";

const Toby = ({ currentPlayer, setCurrentPlayer }) => {
    const {gameState, setGameState, gameOver, setGameOver, checkDraw, checkWin, resetGame} = useContext(GameContext);
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

    // Helper function to find a move given a certain condition
        const findMove = (gameState, condition) => {
            for (let rowIndex = 0; rowIndex < gameState.length; rowIndex++) {
                for (let colIndex = 0; colIndex < gameState[rowIndex].length; colIndex++) {
                    if (gameState[rowIndex][colIndex] === '') {
                        // Create a copy of the game state and apply the move
                        const copiedGameState = JSON.parse(JSON.stringify(gameState));
                        copiedGameState[rowIndex][colIndex] = 'O';
        
                        // Check if the condition is met
                        if (condition(copiedGameState, gameState, rowIndex, colIndex)) {
                            return [rowIndex, colIndex];
                        }
                    }
                }
            }
            return null;  // No move found
        }
    
        
        // Function to find a winning move
        const findWinningMove = (gameState) => {
            return findMove(gameState, (potentialGameState, originalGameState, rowIndex, colIndex) => {
                // ensure the cell was empty in the original game state
                if (originalGameState[rowIndex][colIndex] !== '') return false;
                return checkWin('O', potentialGameState);
            });
        }

        // Function to find a blocking move
        const findBlockingMove = (gameState) => {
            return findMove(gameState, (potentialGameState, originalGameState, rowIndex, colIndex) => {
                // ensure the cell was empty in the original game state
                if (originalGameState[rowIndex][colIndex] !== '') return false;
        
                // Create a new game state where X plays at the current cell
                const newGameState = JSON.parse(JSON.stringify(originalGameState));
                newGameState[rowIndex][colIndex] = 'X';
        
                // Check if this move would make X win
                return checkWin('X', newGameState);
            });
        }
        
        // Function to find a random move
        const findRandomMove = (gameState) => {
            const emptySquares = [];
            gameState.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === '') {
                emptySquares.push([rowIndex, colIndex]);
                }
            });
            });
            if (emptySquares.length === 0) {
            return null;
            }
            const randomIndex = Math.floor(Math.random() * emptySquares.length);
            return emptySquares[randomIndex];
        }

const makeTobyMove = () => {

    if (currentPlayer !== 'O' || gameOver) {
        return;
    }
  
    // Check if it's PlayerO's turn
    else if (currentPlayer === 'O') {
        // If X has won or the game has been drawn, don't make a move
        if (checkWin('X', gameState) || checkDraw(gameState)) {
            // pull the alert and force turn back to X to disable game board
            handleWin();
            setCurrentPlayer('X')
            return;
        }

         // Try to make a winning move
         const winningMove = findWinningMove(gameState);
         if (winningMove) {
             console.log("making a winning move");
             const [winningRowIndex, winningColIndex] = winningMove;
             const updatedGameState = gameState.map((row, rowIndex) =>
                 row.map((cell, colIndex) => {
                 if (rowIndex === winningRowIndex && colIndex === winningColIndex) {
                     return 'O';
                 }
                 return cell;
                 })
             );
             setGameState(updatedGameState);
   
             // check win condition and update gameState
             if (checkWin('O', updatedGameState)) {
                 setGameOver(true);
                 handleWin();
                 return;
             } else if (checkDraw(updatedGameState)) {
                 setGameOver(true);
                 handleDraw();
                 return;
             }
             setCurrentPlayer('X');
             return;
         }
  
        // Try to make a blocking move
        const blockingMove = findBlockingMove(gameState);
        if (blockingMove) {
            console.log('Blocking move');
            const [blockingRowIndex, blockingColIndex] = blockingMove;
            const updatedGameState = gameState.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                if (rowIndex === blockingRowIndex && colIndex === blockingColIndex) {
                    return 'O';
                }
                return cell;
                })
            );
            setGameState(updatedGameState);
  
            // check win condition and update gameState
            if (checkWin('O', updatedGameState)) {
                setGameOver(true);
                handleWin();
                return;
            } else if (checkDraw(updatedGameState)) {
                setGameOver(true);
                handleDraw();
                return;
            }
            setCurrentPlayer('X');
            return;
        }

  
        // If there's no winning or blocking move, make a random move
        const randomMove = findRandomMove(gameState);
        if (randomMove) {
            console.log("making random move");
            const [randomRowIndex, randomColIndex] = randomMove;
            const updatedGameState = gameState.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                if (rowIndex === randomRowIndex && colIndex === randomColIndex) {
                    return 'O';
                }
                return cell;
                })
            );
            setGameState(updatedGameState);
  
            // check win condition and update gameState
            if (checkWin('O', updatedGameState)) {
                setGameOver(true);
                handleWin();
                return;
            } else if (checkDraw(updatedGameState)) {
                setGameOver(true);
                handleDraw();
                return;
            }
            setCurrentPlayer('X');
            return;
        }
    }
  };

    useEffect(() => {
      makeTobyMove();
    }, [currentPlayer, gameOver]);


    return null; 
}

export default Toby;
