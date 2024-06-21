import React from 'react';

const StatusBar = ({ health, coins, styles }) => {
  return (
    <div className="status-bar">
      <div className='statusBarItem'>Salud: {health}</div>
      <div className='statusBarItem'>Monedas: {coins}</div>
    </div>
  );
};

export default StatusBar;
