import React, { useState, useEffect } from 'react';
import Game from '../../components/minigames/blackjack/game';

const App = () => {
    const [coins, setCoins] = useState(100); // Monedas o Balance
    const [styleSheet, setStyleSheet] = useState('/styles/minigames/blackjack.css');
    const [styleSheetGame, setStyleSheetGame] = useState('/styles/minigames/blackjack.css');

    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        if (/mobile|android|iphone|ipad|tablet/.test(userAgent)) {
            setStyleSheetGame('/styles/minigames/styles-mobile.css');
            setStyleSheet('/styles/minigames/blackjack-mobile.css');
        } else {
            setStyleSheetGame('/styles/minigames/styles-desktop.css');
            setStyleSheet('/styles/minigames/blackjack-desktop.css');
        }
    }, []);

    return (
        <div>
            <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href={styleSheetGame} />
            <link rel="stylesheet" href={styleSheet} />
            <p className='balance-box'>Balance: {coins}</p>
            <Game coins={coins} setCoins={setCoins}/>
        </div>
    );
};

export default App;
