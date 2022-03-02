Procesos por los que voy a poder subir mis archivos estáticos a la nube.

## FTP Y SFTP - Subir los archivos estáticos de manera manual.

FTP - es un protocolo para poder transferir ficheros de cliente a servidor. Tiene dos versiones FTP y SFTP, como http y https. Se encarga de transferir esos ficheros.
Lo que hacemos es conectar de mi puerto local con un servidor FTP en la nube. Así los archivos van a terminar en el servidor. Es como arrastrar y solar ficheros.

create server folder para servir esos archivos estáticos.

- a continuación creamos un entorno de nodeJS haciendo npm init -y.
- instalamos express > npm install express --save

Para poder crear un servidor creamos un fichero index.js

```JS
              const express = require('express');
              const path = require('path');

              const app = express();

              //este es el lugar donde se encuentran mis ficheros estáticos.
              const staticFilesPath = path.resolve(__dirname, './public');
              //aquí le estoy diciendo que cuando llegue el servidor use lo que hay dentro de esa dirección
              app.use('/', express.static(staticFilesPath))

              //aquí indicamos un puerto y creamos el servidor
              const PORT = process.env.PORT || 8081;
              app.listen(PORT, ()=>{
                console.log(`app running on http://localhost:${PORT}`)
              })
```

Este proyecto corre en nodeJS por lo que para ejecutarlo vamos a tener que invocar a node.
Así creamos un script en en el package.json que se llame "start":"node index.js"
También tenemos que crear dentro de SERVER la carpeta public con todos los ficheros que vamos a querer exponer fuera.

Si hacemos npm start veremos como nuestra aplicación se va a ejecutar. Además, si vamos al puerto 8081, veremos como nuestra aplicación ya está funcionando.

Ahora la vamos a desplegar en Azure. Para ellos hacemos min 1.15

1. "App Services".
2. "Create"
3. Rellenar los campos con el nombre de la app (el nombre debe de ser único). También se puede comprar un dominio y desplegarlo.
4. resource group mete un nombre
5. publish. Por ahora, en esta opción vamos a hacerlo con la opción "code".
6. en Runtime Stack tendremos que poner Node 12 o 14, que es una versión estable.
7. elegir el sistema operativo (linux es gratis).
8. la region es bueno que la dejemos en europa, por la latencia.
9. Al final hay que tener cuidado porque en el service plan te da un servicio que cuesta dinero. Hay que cambiarlo a F1 para no pagar.
10. Hacer click en "Review + create"
11. Hacer click en "create"
12. Ahora podemos ir a "go to resources" para ir al dominio.

13. Por ahora en mi dominio no hay nada. Vamos a subir nuestros archivos a FTPS a través del "deployment Center" y "FTP credentials".

14. Nos bajamos filezilla y con este programita vamos a poder vincular nuestro puerto local con Azure.
15. copiamos FTPS endpoint y lo copiamos en "servidor" de fileZilla.
16. copiamos usuario y lo pegamos en usuario de fileZille.
17. copiamos contraseña y la pegamos en contraseña.
18. hacemos Click en conexión rápida (saldrá un mensaje en filezille). Aceptamos certificado.
19. A continuación vamos a ver que aparece una carpeta con el archivo HTML de la página que aparece en mi dominio comprado en Azure.
20. Tenemos que pegar en ese lugar todo lo que existe dentro de SERVER, incluido node_modules, que es quien tiene express y es el que va a servir los ficheros.

Vamos a usar ahora github y github pages en vez de FTP y AZURE. min 1.36
En este modo también vamos a arrastrar los ficheros. En esta opción no necesitamos subir la carpeta de Node_modules, el solo te los publica.

1. En este caso no vamos a usar la carpeta SERVER, solo el archivo compilado que tenemos en dist.
2. En github creamos un nuevo repositorio, público. Iniciamos el repositorio totalmente vacío, sin readme ni nada.
3. Vamos a coger la dirección https para clonar el repositorio.
4. Vamos a nuestro fichero en local y hago cd en mi terminal hasta situarme en la carpeta raiz.
5. En mi terminal hago "git init" (en este momento se me crea una carpeta .git)
6. En mi terminal hago "git remote add origin http://.........".
7. Hacemos "git add ." para traquear todos los ficheros.
8. Hacemos "git commit -m "initial commit"".
9. Hacemos "git push -u origin master" (creamos rama master)
10. Creamos una nueva rama clicando en el simbolito de github abajo a la izquierda (donde pone el nombre de la rama donde nos encontramos) y en el desplegable que nos aparece clickamos en "create New Branch" le ponemos un nombre, por ejemplo "gh-pages"
11. En esta rama vamos a dejar únicamente los archivos estáticos, así que lo borramos todo salvo la carpeta dist. Movemos además los ficheros de la carpeta dist al directorio principal.
12. A continuación hacemos un commit y un push.
    min 1.56
13. Si entro en esta rama y clicko en el tick verde de arriba a la derecha, me va a salir un desplegable con dos opciones. La primera es para ver como ha ido el despliegue, la segunda, "details" es directamente la URL del sitio web.

Vamos a desplegar ahora la aplicación en Heroku

1. Clicamos en "create new app"
2. Rellenamos el campo con el nombre de la aplicación (subdominio)
3. Le damos a crear aplicación.
4. en el dashboard del proyecto vamos al settings. "Add buildpack" selecciona el servidor que queremos que se ejecute. En esta opción únicamente subimos los ficheros estáticos.https://elements.heroku.com/buildpacks
   En esta dirección nos encontramos servidores para contener nuestros proyectos. Vamos a usar "heroku-buildpack-static"
5. HAcemos click y en la parte de arriba de la página que aparece hacemos click sobre "CLI Install Details". Esto nos va a llevar a un comando sobre fondo negro con una URL (repositorio a github).
6. Con ese link nos vamos a buildpack y lo pegamos en la URL de "Add buildpack".
7. Con esto le hemos indicado que sea un servidor que sirva ficheros estáticos.
8. Abajo del todo aparece el link de nuestro sitio web.
9. Ahora nos clonamos el repositorio que aparece en settings "Heroku git URL".
10. Nos vamos a VS, archivo nuevo, en el command pallete clicamos en git clone y a continuación pegamos el link.
11. Elegimos una carpeta donde ponerlo.Hacemos una carpeta nueva y pegamos en este repositorio mis ficheros estáticos.
12. Además, como hemos usado el buildpack de ficheros estáticos, tenemos que añadir un JSON super simple con nombre "static.json", al mismo nivel. Esto es para indicar donde se encuentra mi fichero principal.
    {"root": "./"}.
13. Para poder subir cosas a ese repositorio tenemos que Heroku nos tiene que dar acceso. Para ello tenemos que identificarnos en Heroku en nuestra máquina local. Para ello instalamos heroku en nuestra máquina. npm install -g heroku
14. Una vez instalada la CLI hacemos "heroku login" en terminal. Presiona tecla para acceder al navegador.
15. Hacemos un git add ., git commit -m"", git push.
16. Si quiero subir mi propio servidor con Node por ejemplo. min 2.30
17. en el buildpack eliminamos el que ya tenemos y hacemos click en Add Builpack otra vez.
18. Hacemos click en Node y guardamos cambios.
19. Ahora necesitamos todos los archivos, sin incluir los archivos de node_modules (dentro de server tengo mi public, mi index y mi package.json)
20. copiamos estos archivos en el repositorio de Heroku (es el mismo que antes)
21. Si queremos podemos crear un archivo .gitignore con "node_modules" escrito dentro.
22. Hacemos git add, commit y push.

En la parte del frontend, en el build, las variables de entorno se graban a fuego dentro del build. Tanto si webpack está en desarrollo como si está en producción, cogerá esas variables y las grabará a fuego dentro de nuestro código, en la carpeta dist.
En backEnd sí que tirará de variables de entorno.



