import React from 'react';
import './players.styles.css';

const PlayerX = ({ animate }) => {
  return (
    <svg className={`x ${animate ? 'animate' : ''}`} viewBox="0 0 100 100">
      <path className="x-path" d="M10,10 L90,90 M90,10 L10,90" />
    </svg>
  );
};

export default PlayerX;