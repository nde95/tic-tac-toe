import React, { createContext, useState } from 'react';

const GameContext = createContext();

const GameProvider = ({ children }) => {
    const initialGameState = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
    
      const [gameState, setGameState] = useState(initialGameState);
      const [gameOver, setGameOver] = useState(false);

      const resetGame = () => {
        setGameState(initialGameState);
        setGameOver(false);
      };

      const checkWin = (player, gameState) => {
        // Check rows
        for (let row = 0; row < 3; row++) {
          if (gameState[row][0] === player && gameState[row][1] === player && gameState[row][2] === player) {
            return true;
          }
        }
        // Check columns
        for (let col = 0; col < 3; col++) {
          if (gameState[0][col] === player && gameState[1][col] === player && gameState[2][col] === player) {
            return true;
          }
        }
        // Check diagonals
        if (gameState[0][0] === player && gameState[1][1] === player && gameState[2][2] === player) {
          return true;
        }
        if (gameState[2][0] === player && gameState[1][1] === player && gameState[0][2] === player) {
          return true;
        }
        return false;
      };

      const checkDraw = (gameState) => {
        const isBoardFull = gameState.every(row => row.every(cell => cell !== ''));
        if (isBoardFull && !checkWin('X', gameState) && !checkWin('O', gameState)) {
          return true;
        }
        return false;
      };
      
    
      return (
        <GameContext.Provider value={{gameState, setGameState, gameOver, resetGame, setGameOver, checkWin, checkDraw}}>
          {children}
        </GameContext.Provider>
      );
    };

export { GameContext, GameProvider };