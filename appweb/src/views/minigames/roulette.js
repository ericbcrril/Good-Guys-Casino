import React from 'react';
import Game from '../../components/minigames/roulette/game';

const App = () => {
  const styles = {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: "'Press Start 2P', cursive",
      backgroundColor: '#2D0130',
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundSize: 'cover',
    },
    gameTitle: {
      fontSize: '48px',
      color: '#FFFFFF',
      textShadow: '2px 2px #000000',
      marginBottom: '20px',
    },
    gameContainer: {
      textAlign: 'center',
      border: '4px solid #FF33CC',
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    gameButton: {
      display: 'block',
      width: '200px',
      padding: '10px',
      margin: '10px auto',
      fontSize: '16px',
      color: '#FFFFFF',
      backgroundColor: '#FF33CC',
      border: '2px solid #FF33CC',
      borderRadius: '5px',
      cursor: 'pointer',
      textTransform: 'uppercase',
      textShadow: '2px 2px #000000',
      transition: 'background-color 0.3s, transform 0.3s',
    },
    gameButtonHover: {
      backgroundColor: '#CC00FF',
      transform: 'scale(1.1)',
    },
    gameButtonActive: {
      backgroundColor: '#9900CC',
      transform: 'scale(1.05)',
    },
    statusBar: {
      display: 'flex',
      justifyContent: 'space-around',
      marginBottom: '20px',
    },
    statusBarItem: {
      fontSize: '16px',
      padding: '5px 10px',
      backgroundColor: '#FF33CC',
      border: '2px solid #FF33CC',
      borderRadius: '5px',
      textShadow: '1px 1px #000000',
    },
    betInput: {
      width: '100px',
      padding: '5px',
      margin: '10px',
      fontSize: '16px',
      color: '#FFFFFF',
      backgroundColor: '#2D0130',
      border: '2px solid #FF33CC',
      borderRadius: '5px',
      textAlign: 'center',
    },
    betLabel: {
      fontSize: '16px',
    },
    betForm: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    betFormLabel: {
      marginBottom: '5px',
    },
    gameOverMessage: {
      fontSize: '24px',
      color: '#FF33CC',
      textShadow: '2px 2px #000000',
      margin: '20px 0',
    },
    gameOverText: {
      fontSize: '18px',
      color: '#FFFFFF',
      textShadow: '1px 1px #000000',
      margin: '10px 0',
    },
    resetButton: {
      backgroundColor: '#FF3333',
      border: '2px solid #FF3333',
    },
    resetButtonHover: {
      backgroundColor: '#FF0000',
    },
    resetButtonActive: {
      backgroundColor: '#CC0000',
    },
  };

  return (
    <div className="App" style={styles.body}>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"></link>
      <h1 className="game-title" style={styles.gameTitle}>Ruleta Rusa</h1>
      <div id="game-container" style={styles.gameContainer}>
        <Game styles={styles} />
      </div>
    </div>
  );
};

export default App;
