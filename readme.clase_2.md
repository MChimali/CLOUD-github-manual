Qué ES CI y CD?
CI es integración continua que abarca la creación de código, el build y la parte del testing.
El siguiente paso es la entrega continua (continuos delivery) que es generar ese paquete para poder hacer el deployment.
El último plaso es el continuos deployment que es el despliegue continio. Básicamente se refiere a automatizar este proceso.

GitHub actions > automatiza flujos de trabajo. Generan flujos de trabajo para hacer lo de antes automáticamente.

WorkFlows son flujos de trabajo, de procesos que se ejecutan cuando pasa algo. Cuando hacemos un oull request pasará un workflow. Un workflow es un conjunto de jobs, un conjunto de pasos. Estos pasos pueden ser una acción de github directamente. Podemos crear nuestros comandos propios. por ejemplo, haz la instalación, haz los test, etc. Los jobs de la integración continua serán el de checkput repot, setUp node, npm isntall y npm test.

Los checkouts que pertenecen al CD son los de Docker Login y Docker push.

Estas acciones las desarrolla el propio equipo de github. Una acción de github no es más que una funcionalidad concreta. Por ejemplo "Checkout repo" es una funcionalidad que clona nuestro repositorio.

Los runners son los que luego nos van a ejecutar todas estas acciones. Github nos ofrece dos tipos de runner, uno es el que me da por defecto sin tener que ejecutar nada. Podemos elegir entre 3 sistemas operativos.

Vamos a realizar el mismo ejemplo que hicimos ayer en gitHub pero automatizándola. PAra todo esto no necesitamos la carpeta SERVER.

1. Creamos un nuevo repositorio sin nada dentro (no readme no nada, totalmente vacío).
2. En una carpeta nueva cogemos todos los archivos y hacemos un nuevo git init, git remote add origin "URL", git add ., git commit -m"initial commit", git push -u origin master
3. En este punto tenemos el código subido.
4. Hasta este punto es igual que lo que hicimos en el ejemplo manual. En este momento creábamos manualmente una rama manual. Ahora vamos a crear esta rama de manera automática.
5. vamos a importar una librería para crear una nueva rama en nuestro repositorio, llamarla como queramos y desplegar únicamente los ficheros que nos interese. npm install gh-pages --save-dev
6. Nos creamos un script que se llame "deploy"
   "deploy": "gh-pages -d dist",
   En esta opción invocamos gh-pages y le indicamos los archivos que tenemos que subir.
7. En este momento podemos ejecutar nosotros mismos npm run deploy, sin embargo lo interesante es que se haga por sí solo. Esto se va a hacer cuando haya un push a master.
8. Para eso vamos a crearnos nuestra gitHub Action. Vamos a crear un workflow de github.
9. Creamos nueva carpeta en carpeta raiz que se llame ".github". Dentro de esta carpeta vamos a crear otra carpeta que se llame "workflows". En esta carpeta vamos a tener todos los ficheros que queremos que ejecute github por nosotros cuando ocurra un evento en concreto.
10. Dentro de workflows vamos a crear un fichero con el nombre que queramos. Los ficheros tienen extensión ".yml". Es recomendable instalarse YAML (min 34.20 para ver foto).

En steps podemos poner acciones predefinidias de github. Una muy típica es "checkout". Esta acción nos permite clonarnos el repositoroi actual. Cuando nosotros ejecutamos un flujo, lo que github nos proporciona es una máquina virtual con cosas instaladas, node por ejemplo.


Lo siguiente será arrancado por github cuando hagamos un push a master. Me levanta una máquina virtual con mi SO (en este caso Ubuntu) que va a simular ser mi máquina de trabajo. Los steps van a ser:
1. clonar el repositorio.
2. Cuando clonas este repositorio, todo se instala sin node_modules, así que tenemos que hacer npm install.
3. luego hacemos npm run build para generar la carpeta dist.
4. en este máquina nueva tenemos que identificarnos para poder hacer un git push en un archivo que en principio no nos pertenece (por eso tenemos que identificarnos). Lo más clave para esto es usar una clave SSH.
5. Para identificarnos vamos a escribir en nuestro terminal "ssh-keygen -m PEM -t rsa -C "cd-user@myapp.com"". Con este comando vamos a generar u par de claves SSH pública/privada.
6. Cuando le damos a intro nos va a pedir que indiquemos donde queremos guardar esta llave SSH. Por defecto nos va a guardar esa clave en un sitio dentro de Users. Sin embargo podemos decirle que la guarde dentro de nuestro proyecto raiz escribiendo únicamente "./id_rsa". Así creamos un fichero que se llama id_sra con la frase dentro.
7. Creamos una contraseña o le damos a intro y otra vez a intro para dejarlo sin contraseña.
8. a continuación nos ha creado dos archivos. Uno con clave pública indicando el email al que va a dar permiso. Todo lo que hay aquí vamos a copiarlo y en github, en el reposirotio, nos vamos a "deploy KEys". Aquí vamos a poder añadir las keys para añadir permiso. Hacemos "add deploy key" y pegamos. Le damos un título. También hacemos click en "allow write access".
9. ahora le damos a "add key"

```YAML
      name: Continuos Deployment workflow
      //name :nombre del workflow
      on:
        push:
          branches:
            - master
      jobs:
        cd:
          runs-on: ubuntu-latest
          steps:
            - name: Clone repository
              uses: actions/checkout@v2
            - name: instalar dependencias
              run: npm install
            - name: Build
              run: npm run build
            - name: deploy
              run: npm run deploy
```
