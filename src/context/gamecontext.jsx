import React, { createContext, useState } from 'react';

const GameContext = createContext();

const GameProvider = ({ children }) => {
    const initialGameState = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
    
      const [gameState, setGameState] = useState(initialGameState);
    
      return (
        <GameContext.Provider value={{gameState, setGameState}}>
          {children}
        </GameContext.Provider>
      );
    };

export { GameContext, GameProvider };