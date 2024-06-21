import React from 'react';

const StatusBar = ({ health, coins, styles }) => {
  return (
    <div className="status-bar" style={styles.statusBar}>
      <div style={styles.statusBarItem}>Salud: {health}</div>
      <div style={styles.statusBarItem}>Monedas: {coins}</div>
    </div>
  );
};

export default StatusBar;
