import React from 'react';
import ReactDOM from 'react-dom';

function renderInPopup(Component, iconUrl, popupUrl) {
  // Opciones para la ventana emergente
  const options = {
    width: 375,
    height: 667,
    resizable: 'no'  // Establecer la ventana como no redimensionable
  };

  // Abrir la ventana emergente con las opciones especificadas
  const popup = window.open(popupUrl || '', '', `width=${options.width},height=${options.height},resizable=${options.resizable}`);

  // Asegurarse de que el contenido de la ventana esté limpio
  popup.document.body.innerHTML = '';

  // Crear un contenedor div para React
  const div = popup.document.createElement('div');
  popup.document.body.appendChild(div);

  // Si se proporciona un iconUrl, establecer el icono de la ventana emergente
  if (iconUrl) {
    const iconLink = popup.document.createElement('link');
    iconLink.rel = 'shortcut icon';
    iconLink.href = iconUrl;
    popup.document.head.appendChild(iconLink);
  }

  // Renderizar el componente en la ventana emergente
  ReactDOM.render(<Component />, div);
}

export default renderInPopup;
