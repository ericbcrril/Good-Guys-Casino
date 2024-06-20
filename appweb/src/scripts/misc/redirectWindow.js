import React from 'react';
import ReactDOM from 'react-dom';

function renderInPopup(Component) {
  // Crear una nueva ventana emergente
  const popup = window.open('', '', 'width=375,height=667');//Dimensiones de un celular (comunmente)

  // Asegurarse de que el contenido de la ventana esté limpio
  popup.document.body.innerHTML = '';

  // Crear un contenedor div para React
  const div = document.createElement('div');
  popup.document.body.appendChild(div);

  // Renderizar el componente en la ventana emergente
  ReactDOM.render(<Component />, div);
}

export default renderInPopup;
