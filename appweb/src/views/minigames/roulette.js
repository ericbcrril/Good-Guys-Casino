import React from 'react';
import { useState } from 'react';
import Game from '../../components/minigames/roulette/game';

const App = () => {
  const [screenShake, setScreenShake] = useState(false);//efecto de temblor 

  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="/styles/minigames/roulette.css" />
      <h1 className="game-title">Ruleta Rusa</h1>
      <div id="game-container" className={`gameContainer ${screenShake ? 'screen-shake' : ''}`}>
        <Game setScreenShake={setScreenShake}/>
      </div>
    </div>
  );
};

export default App;
