# ControleEstoque

Store management application built in react and a nodejs API.

### Start running the application

Follow these steps to install and start the backend:
* Install docker CE and docker-compose.

Run these commands:

* To start the app containers:
```
docker-compose up
```
Well done, now your application is running!

* If the database was not created yet, you can create and migrate running:
```
docker-compose run backend yarn sequelize db:create
docker-compose run backend yarn sequelize db:migrate
```

### Stopping the application and reseting database

* To stop running the application, run:
```
docker-compose down
```
* To drop the database and recreate, run:
```
docker-compose run backend yarn sequelize db:drop
docker-compose run backend yarn sequelize db:create
docker-compose run backend yarn sequelize db:migrate
```

The Backend will point to [http://localhost:3001](http://localhost:3001).
The Frontend will point to [http://localhost:3000](http://localhost:3000).

### Testing routes using insomnia

The details about routes for tests are in the following file on backend folder:
* Insomnia_xxxx-xx-xx.json
