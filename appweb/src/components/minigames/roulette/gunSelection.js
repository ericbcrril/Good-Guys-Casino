import React, { useState } from 'react';

const GunSelection = ({ onSelectGun }) => {
  const [numShots, setNumShots] = useState(1);
  const guns = [
    { name: 'Revólver 1', damage: 25,   multiplier: 1 },
    { name: 'Revólver 2', damage: 50,   multiplier: 10 },
    { name: 'Revólver 3', damage: 100,  multiplier: 100 },
  ];

  return (
    <div className='game-container'>
      <label className="bet-label">Cantidad de Balas:</label>
        <input
          className="bet-input"
          type="number"
          value={numShots}
          min={1}
          max={5}
          onChange={(e) => setNumShots(Number(e.target.value))}
        />
      {guns.map((gun, index) => (
        <button
          key={index}
          className="game-button"
          onClick={() => onSelectGun(gun, numShots)}
        >
          {gun.name}
        </button>
      ))}
    </div>
  );
};

export default GunSelection;
