<br />
<div align="center">
  <a href="https://github.com/ericbcrril/Good-Guys-Casino">
    <img src="logoGgAnimated.gif" alt="Logo" width="280" height="280">
  </a>

  <h3 align="center">Good Guys Casino</h3>
</div>

### Empezando:
Estas instrucciones te ayudarán a obtener una copia del proyecto y ejecutarlo en tu máquina local.

### Prerrequisitos:
  - Node.js 
  - npm
  - MongoDB
  
### Instalación:
 * Clona el repositorio:
  ```sh
   git clone https://github.com/ericbcrril/Good-Guys-Casino.git
   ```

 * Instala todas las dependencias:
  ```sh
   cd nombre_de_carpeta
   ```
   ```sh
   npm install
   ```

### Ejecución:
 * Frontend (appweb):
  ```sh
   cd appweb 
   ```
   ```sh
  npx nodemon start 
   ```
  
 * Backend (Backend):
  ```sh
   cd Backend 
   ```
   ```sh
  npx nodemon start 
   ```
 * Aplicacion movil (AppMovil):
  ```sh
   cd AppMovil 
   ```
   ```sh
  npm start 
   ```

## Generar AAB (Android App Bundle)

Para generar un archivo AAB de la aplicación móvil con Expo, sigue estos pasos:

1. Asegúrate de estar en la carpeta raíz de tu proyecto:
   ```sh
   cd AppMovil
   ```
2. Instala expo-cli globalmente si no lo tienes ya instalado:
  ```sh
  npm install -g expo-cli
  ```
3. Configura tu cuenta de Expo: Asegúrate de haber iniciado sesión en Expo. Si aún no lo has hecho, usa:
  ```sh
  eas login
  ```
4. Genera el archivo AAB: Ejecuta el siguiente comando para iniciar el proceso de compilación:
  ```sh
  eas build -p android --profile testing
  ```
Este comando solicitará la creación de un archivo AAB con el profile testing declarado en tu eas.json .
Expo gestionará el proceso de construcción en la nube, por lo que el archivo AAB estará disponible para descargar cuando finalice.
Descarga el archivo AAB: Una vez completado, Expo proporcionará un enlace donde podrás descargar el archivo AAB. Usa el enlace para descargarlo.

### Construido con:

* Frontend (Interfaz de usuario web):
  * [![React][React.js]][React-url] - Utilizado para construir la interfaz de usuario web.

* Backend (Servidor):
  * [![Node.js][Node.js]][Node-url] - Entorno de tiempo de ejecución de JavaScript utilizado para el backend del proyecto.
  * [![MongoDB][MongoDB]][MongoDB-url] - Base de datos NoSQL utilizada para almacenar datos.

* Aplicación móvil:
  * [![React Native][React-Native]][React-Native-url] - Utilizado para desarrollar la aplicación móvil nativa.
  * Expo y Babel - Usados para simplificar el desarrollo y la configuración de la aplicación en dispositivos móviles.


* Integración con [Jira](https://ericbecerril1234.atlassian.net/jira/software/projects/GGC/boards/1) - Gestión de proyectos y seguimiento de problemas.
* Integración con [OneDrive](https://1drv.ms/f/s!AleP2zq51ljrhMxFiTdCVOpRCp_Vng) - Almacenamiento en la nube de archivos.


[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/

[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/

[React-Native]: https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-Native-url]: https://reactnative.dev/

