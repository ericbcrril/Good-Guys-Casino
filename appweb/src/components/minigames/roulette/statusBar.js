import React from 'react';

const StatusBar = ({ health, coins }) => {
  const healthPercentage = (health / 100) * 100; // Asumiendo que la salud es un valor entre 0 y 100

  return (
    <div className="status-bar">
      <div className='statusBarItem'>
        <div className="health-bar-background">
          <div className="health-bar" style={{ width: `${healthPercentage}%` }}></div>
          <span className="health-text">Salud: {health}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
