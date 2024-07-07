import React from 'react';
import { useState, useEffect } from 'react';
import Game from '../../components/minigames/roulette/game';

const App = () => {
  const [coins, setCoins] = useState(100); // Monedas o Balance
  const [screenShake, setScreenShake] = useState(false);//efecto de temblor 
  const [styleSheet, setStyleSheet] = useState('/styles/minigames/roulette.css');
  const [styleSheetGame, setStyleSheetGame] = useState('/styles/minigames/roulette.css');

    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        if (/mobile|android|iphone|ipad|tablet/.test(userAgent)) {
            setStyleSheetGame('/styles/minigames/styles-mobile.css');
            setStyleSheet('/styles/minigames/roulette-mobile.css');
        } else {
            setStyleSheetGame('/styles/minigames/styles-desktop.css');
            setStyleSheet('/styles/minigames/roulette-desktop.css');
        }
    }, []);

  return (
    <div>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href={styleSheet} />
        <link rel="stylesheet" href={styleSheetGame} />
        <p className='balance-box'>Balance: {coins}</p>
        <div className={` ${screenShake ? 'screen-shake' : ''}`}>
          <Game setScreenShake={setScreenShake} coins={coins} setCoins={setCoins} />
        </div>
    </div>
  );
};

export default App;
