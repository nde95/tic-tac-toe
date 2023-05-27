import { useState } from 'react';
import Swal from 'sweetalert2';

const useGameOver = (currentPlayer, setCurrentPlayer, resetGame) => {
  const [gameOver, setGameOver] = useState(false);

  const handleWin = () => {
    setGameOver(true);
    Swal.fire({
      title: currentPlayer + ' wins!',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Let Toby go first!',
      denyButtonText: `I want to go first!`,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        setCurrentPlayer('O');
        resetGame();
      } else if (result.isDenied) {
        setCurrentPlayer('X');
        resetGame();
      }
    });
  };

  const handleDraw = () => {
    setGameOver(true);
    Swal.fire({
      title: 'It\'s a draw!',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Let Toby go first!',
      denyButtonText: `I want to go first!`,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        setCurrentPlayer('O');
        resetGame();
      } else if (result.isDenied) {
        setCurrentPlayer('X');
        resetGame();
      }
    });
  };

  return { gameOver, handleWin, handleDraw };
};

export default useGameOver;
