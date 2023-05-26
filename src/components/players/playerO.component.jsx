import React from 'react';
import './players.styles.css';

const PlayerO = ({ animate }) => {
  return (
    <div className={`o-container ${animate ? 'animate' : ''}`}>
      <svg className="o" viewBox="0 0 100 100">
        <circle className="o-circle" cx="50" cy="50" r="40" />
      </svg>
    </div>
  );
};

export default PlayerO;