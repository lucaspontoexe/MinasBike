# ControleEstoque - Backend

API structured to supply the front-end of a management software

### Installation

Follow these steps to install and start the backend:
* Install docker CE and docker-compose.

### Setup database

Database commands:

*To drop the database:
```
docker-compose run backend yarn sequelize db:drop
```
OBS: the db:drop should return a error sometimes depending if your table exists or not, but that is fine, this is an expected error.

*To create the database:
```
docker-compose run backend yarn sequelize db:create
```

*To migrate the database:
```
docker-compose run backend yarn sequelize db:migrate
```

### Start and stop running the backend

*To start the backend:
```
docker-compose up
```

*To stop the backend:
```
docker-compose down
```


The API will point to [http://localhost:3001](http://localhost:3001).

### Debug

To debug this application using the VS code debugger by running:
```
docker-compose run backend yarn dev:debug
```

### Testing routes

The details about routes for tests are in the following file: Insomnia_xxxx-xx-xx.json
