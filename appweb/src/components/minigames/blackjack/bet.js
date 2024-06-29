import React, { useState } from 'react';

const Bet = ({ onBet, coins }) => {
    const [amount, setAmount] = useState(20);

    const handleSubmit = (e) => {
        e.preventDefault();
        onBet(amount);
      };

    return (
        <div>
            <h1 className="game-title">Blackjack</h1>
            <form className="bet-form game-container" onSubmit={handleSubmit}>
            <label className="bet-label" >Cantidad a apostar:</label>
                <input
                    className="bet-input"
                    type="number"
                    min={20}
                    max={coins}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
                <button className="game-button"  type='submit'>Apostar</button>
            </form>
        </div>
    );
};

export default Bet;
