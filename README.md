# ControleEstoque

Store management application built in react and a nodejs API.

### Start running the application

Follow these steps to install and start the backend:
* Install docker CE and docker-compose.

Run these commands to setup the application and start:

```
docker-compose up
docker-compose run backend yarn sequelize db:create
docker-compose run backend yarn sequelize db:migrate
```
OBS: the "up" command will lock your terminal, the other commands must be executed in another tab.

### Stopping the application and reseting database

* To stop running the application, and start again, run:
```
docker-compose stop
docker-compose up
```

* To stop running the application RESETING ALL DATA, run:
```
docker-compose down
```

The Backend will point to [http://localhost:3001](http://localhost:3001).
The Frontend will point to [http://localhost:3000](http://localhost:3000).

### Testing routes using insomnia

The details about routes for tests are in the following file on backend folder:
* Insomnia_xxxx-xx-xx.json
