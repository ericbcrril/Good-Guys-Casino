function openWindow(component) {
    const componentName = component.displayName || component.name || 'Componente';

    const popupWindow = window.open('', '_blank', 'width=800,height=600');

    popupWindow.document.write(`
        <html>
            <head>
                <title>Good Guys Casino</title>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.production.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js"></script>
            </head>
            <body>
                <div id="popup-root"></div>
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        const ComponentToRender = ${component.toString()};
                        ReactDOM.render(React.createElement(ComponentToRender), document.getElementById('popup-root'));
                    });
                </script>
            </body>
        </html>
    `);
}

export default openWindow;
