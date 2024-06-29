import { React, useState } from 'react';
import Game from '../../components/minigames/blackjack/game';

const App = () => {
    const [coins, setCoins] = useState(100); // Monedas o Balance

    return (
        <div>
            <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="/styles/minigames/blackjack.css" />
            <p className='balance-box'>Balance: {coins}</p>
            <Game coins={coins} setCoins={setCoins}/>
        </div>
    );
};

export default App;
