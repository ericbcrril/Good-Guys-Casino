import React, { useState } from 'react';

const Bet = ({ onBet }) => {
  const [amount, setAmount] = useState(20);
  const [multiplier, setMultiplier] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onBet(amount, multiplier);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Cantidad a apostar:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </label>
      <label>
        Multiplicador:
        <select
          value={multiplier}
          onChange={(e) => setMultiplier(Number(e.target.value))}
        >
          <option value={1}>x1</option>
          <option value={10}>x10</option>
          <option value={100}>x100</option>
        </select>
      </label>
      <button type="submit">Apostar</button>
    </form>
  );
};

export default Bet;
