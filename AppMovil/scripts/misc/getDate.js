import React, { useState, useEffect } from 'react';

const Clock = () => {
  // Estado local para almacenar la fecha y hora actual
  const [fechaHoraActual, setFechaHoraActual] = useState(new Date());

  // Función para obtener la fecha y hora actual
  const obtenerFechaHoraActual = () => {
    return new Date().toLocaleString();
  };

  // Efecto de efecto secundario para actualizar la fecha y hora cada segundo
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFechaHoraActual(new Date());
    }, 1000);

    // Limpieza del intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  return (
    <p>{fechaHoraActual.toLocaleString()}</p>
);
};

export default Clock
