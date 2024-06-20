import React from 'react';

const GunSelection = ({ onSelectGun }) => {
  const guns = [
    { name: 'Revólver 1', damage: 10 },
    { name: 'Revólver 2', damage: 20 },
    { name: 'Revólver 3', damage: 30 },
  ];

  return (
    <div>
      <h2>Selecciona un Revólver</h2>
      {guns.map((gun, index) => (
        <button key={index} onClick={() => onSelectGun(gun)}>
          {gun.name}
        </button>
      ))}
    </div>
  );
};

export default GunSelection;
