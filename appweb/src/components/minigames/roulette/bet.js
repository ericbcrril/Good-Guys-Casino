import React, { useState } from 'react';

const Bet = ({ onBet, coins }) => {
  const [amount, setAmount] = useState(20);
  const [multiplier, setMultiplier] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onBet(amount, multiplier);
  };

  return (
    <form className="bet-form game-container" onSubmit={handleSubmit}>
      <label className="bet-label" >
        Cantidad a apostar:
        <input
          className="bet-input"
          type="number"
          min={20}
          max={coins}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </label>
      <label className="bet-label" >
        Multiplicador:
        <select
          className="bet-select"
          value={multiplier}
          onChange={(e) => setMultiplier(Number(e.target.value))}
        >
          <option value={1}>x1</option>
          <option value={10}>x10</option>
          <option value={100}>x100</option>
        </select>
      </label>
      <button className="game-button" type="submit">Apostar</button>
    </form>
  );
};

export default Bet;
