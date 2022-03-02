const express = require('express');
const path = require('path');

const app = express();

//este es el lugar donde se encuentran mis ficheros estáticos.
//dirname en este caso es donde se está ejecutando este proceso, básicamente es justo dentro de la carpeta SERVER
//dentro de SERVER vamos a crear una carpeta donde se van a alojar todos los ficheros estáticos que queremos exponer hacia
const staticFilesPath = path.resolve(__dirname, './public');
//aquí le estoy diciendo que cuando llegue el servidor use lo que hay dentro de esa dirección
app.use('/', express.static(staticFilesPath))

//aquí indicamos un puerto y creamos el servidor
const PORT = process.env.PORT || 8081;
app.listen(PORT, ()=>{
  console.log(`app running on http://localhost:${PORT}`)
})


