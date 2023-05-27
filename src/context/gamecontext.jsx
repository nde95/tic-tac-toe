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
    
      return (
        <GameContext.Provider value={{gameState, setGameState, gameOver, resetGame, setGameOver}}>
          {children}
        </GameContext.Provider>
      );
    };

export { GameContext, GameProvider };