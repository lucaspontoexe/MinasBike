# ControleEstoque - Backend

API structured to supply the front-end of a management software

### Installation

Follow these steps to install and start the app:
* Install docker CE, NPM, node, nodejs and yarn. (all by the official websites)
* Run this command to create a docker container with postgres:
```
docker run --name database  -e POSTGRES_PASSWORD=minasbike -p 5433:5432 -d postgres:11
```
OBS: the container will point the database to the port 5433 of your machine.


### Start the app

On the app directory, run this commands:
*To install all dependencies and setup database:
```
yarn
yarn sequelize db:drop
yarn sequelize db:create
yarn sequelize db:migrate
```
OBS: the db:drop should return a error sometimes depending if your table exists or not, but that is fine, it is a preventive command to drop the existing database, and this is an expected error.

*To start running the app:
```
yarn dev
```


You can find your app now by pointing your browser to [http://localhost:3001](http://localhost:3001).

### Debug

You can debug this application using the VS code debugger by running:
```
yarn dev:debug
```

### Testing routes

The routes for tests are in the following file: Insomnia_2019-11-25.json
