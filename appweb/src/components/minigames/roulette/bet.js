import React, { useState } from 'react';

const Bet = ({ onBet, styles }) => {
  const [amount, setAmount] = useState(20);
  const [multiplier, setMultiplier] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onBet(amount, multiplier);
  };

  return (
    <form className="bet-form" style={styles.betForm} onSubmit={handleSubmit}>
      <label className="bet-label" style={styles.betLabel}>
        Cantidad a apostar:
        <input
          className="bet-input"
          style={styles.betInput}
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </label>
      <label className="bet-label" style={styles.betLabel}>
        Multiplicador:
        <select
          className="bet-select"
          style={styles.betInput}
          value={multiplier}
          onChange={(e) => setMultiplier(Number(e.target.value))}
        >
          <option value={1}>x1</option>
          <option value={10}>x10</option>
          <option value={100}>x100</option>
        </select>
      </label>
      <button className="game-button" style={styles.gameButton} type="submit">Apostar</button>
    </form>
  );
};

export default Bet;
