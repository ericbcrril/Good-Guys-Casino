import React from 'react';
import ReactDOM from 'react-dom';

function renderInPopup(Component, iconUrl, popupUrl) {
  // Opciones para la ventana emergente
  const options = {
    width: 375,
    height: 667,
    resizable: 'no'
  };

  // Crear una cadena de opciones para la ventana emergente
  const optionsString = `width=${options.width},height=${options.height},resizable=${options.resizable}`;

  // Abrir la ventana emergente con las opciones especificadas
  const popup = window.open(popupUrl || '', '', optionsString);

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

  // Función para mantener el tamaño de la ventana
  function enforceSize() {
    if (popup.outerWidth !== options.width || popup.outerHeight !== options.height) {
      popup.resizeTo(options.width, options.height);
    }
  }

  // Configurar el evento de redimensionamiento
  popup.addEventListener('resize', enforceSize);

  // Bloquear la maximización de la ventana
  popup.addEventListener('maximize', enforceSize);

  // Asegurarse de que la ventana tenga el tamaño correcto desde el inicio
  enforceSize();
}

export default renderInPopup;
