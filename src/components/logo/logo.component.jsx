import React from 'react';
import logoImage from '../../assets/tictactoby.png';
import './logo.styles.css';

const Logo = () => {
  return (
    <img className='tttlogo' src={logoImage} alt="logo" />
  );
}

export default Logo;
