# :notebook: Documentacion del backend
:warning: advertencia se recomienda tener conocimientos previos de las siguientes tecnologia para no morir en el intento de instalar y correr la api.

* Nodejs
* NPM
* Docker
* PostgreSQL
## :clipboard: Lista de programas mas su version para poder correr la API

| programas      | version  |
|----------------|----------|
| Nodejs         | 18.2.0   |
| PostgreSQL     | v14      |
| TypeScript     | 4.7.4    |
| Docker         | 20.10.17 |
| Docker Desktop | ultima   |

## Variables de entorno de la api
```javascript
NODE_ENV = ""       //<= Esta variable le indicara al diver de postgres que DB va ha usar deja esta variable vacia
PORT = ""           //<= El puerto que utilisara express 
IP_SERVER= ""       //<= Ip del servidor o host de la API
DB_HOST= ""         //<= Ip del servidor o host de la DB
DB_PORT = ""        //<= Puerto que utiliza la DB
DB_NAME_PRO = ""    //<= Nombre de la DB de produccion
DB_NAME_DEV = ""    //<= Nombre de la DB de desarrollo
DB_NAME_TEST = ""   //<= Nombre de la DB de test
DB_USER = ""        //<= Nombre de usuario para acceder a la DB
DB_PASS = ""        //<= Clave del usuario para acceder a la DB
CLAVE_SECRETA = ""  //<= Clave secreta para encriptar los token
SAL_CRIPTO = ""     //<= Numero de sal para la desincrptacion de los token
```

# Instalacion de dependencia de la api sin docker
npm install : para instalar las dependencia de la api.

## Lista de Script para ejecutar la api
* start: para ejecutar el proyecto en producion.
* test: para ejecutar las pruebas Unit test del proyecto.
* test:w : para ejecutar las pruebas Unit test del proyecto pero en modo watch.
* dev: para ejecutar en modo desarrollo.
* dev:nm : para ejecutar en modo desarrollo pero en modo watch.
* ts:w : para traspilar el codigo de TypeScript a JavaScript pero en modo watch.

# Instalacion de la api con docker

## Configuracion del docker compose
```yml
version: '20.10.17'
services:
  api:
    build: .
    ports:
      - "5000:8080"                 # Puerto de acceso a la api
    links:
      - "postgres"
  postgres:
    image: postgres:14
    ports:
      - "5001:5432"                 # Puerto de acceso a postgresql
    environment:
      - POSTGRES_PASSWORD=pass      # Clave de usuario postgresql
      - POSTGRES_USER=user_postgres # Nombre de usuario postgresql
      - POSTGRES_DB=postgres        # Nombre de db por defecto postgresql
    volumes:
      - ./backend/sql:/home/app     # Volumen para tener acceso a los fichero sql del proyecto
```

## Configuracion del Dockerfile
```Dockerfile
FROM node:18                     #  Descargar la imagen y version

RUN mkdir -p /home/app           #  Crea el directorio en donde se alojara la api

WORKDIR /home/app                #  Crea un en lace simbolico

COPY ./backend ./                #  Copiar el contenido de la carpeta backend y pegarlo en /home/app 

RUN npm install                  # Instalar las dependencias de la api

CMD ["npm", "run", "comando"]    # Correr unos de los script del package como el start o el dev
```

## :whale: Comando para ejecutar los docker compose de la api
comando: docker compose -f docker-compose-custom.yml up -d 

Al ejecutar el **docker compose up** el fichero docker-compose va a ejecutar su corespondiente **Dockerfile**, que ejecuta el comando npm install que instalar las dependecia de la api y despues de instalar las dependencias levanta el servidor para su posterior uso.

Si quieres borrar los contenedores creador puedes usar el siguiente comando.

comando: docker compose -f docker-compose-custom.yml down.

:warning: advertencia esto solo borrar los contenedores y la red que creo el docker compose pero no borrar los volumens y las images que se haya descargados de tu equipo.

## Comandos para entrar al contenedor docker de postgresql y crear la base de datos

 docker ps: comando para listar los contenedores que estan corriendo, esto con el objetivo de ver cual es el id del contendor de postgres .

docker exec -it CONTAINER ID bash : con este comando entras al contenedor en el que esta corriendo postgres en modo bash.

En esta ruta esta el fichero sql que contiene todas las sentencias sql de la creacion de las tablas **/home/app/db.sql**.

psql -h host -U user_post -W pass_post -D nombre_db < db.sql : con este comando ejecutas todas las sentencias sql que estan el archivo db.sql, ojo previamente tiene que tener la base de dato ya creada para que este comando funcione .

## Diagrama de la Base de Datos
En proceso de crear el diagrama esta en pendiente
