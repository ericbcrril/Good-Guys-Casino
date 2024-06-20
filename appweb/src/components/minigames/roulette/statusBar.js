import React from 'react';

const StatusBar = ({ health, coins }) => {
  return (
    <div>
      <div>Salud: {health}</div>
      <div>Monedas: {coins}</div>
    </div>
  );
};

export default StatusBar;
