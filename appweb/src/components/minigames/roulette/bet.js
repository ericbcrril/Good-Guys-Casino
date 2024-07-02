import React, { useState } from 'react';

const Bet = ({ onBet, coins }) => {
  const [amount, setAmount] = useState(20);
  const [multiplier, setMultiplier] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onBet(amount, multiplier);
  };

  return (
    <div>
      <h1 className="game-title">Ruleta Rusa</h1>
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
          <button className="game-button" type="submit">Apostar</button>
      </form>
    </div>
  );
};

export default Bet;
