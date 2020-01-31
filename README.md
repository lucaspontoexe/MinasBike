# Minas Bike Management application

Store management application built in react and a nodejs API.

### Start running the application

Follow these steps to install and start the backend:
* Install docker CE and docker-compose.

Run these commands to setup the application and start:

```
docker-compose run frontend yarn
docker-compose run backend npm i
docker-compose up
```
Go to your favorite database manager, and create a table named ```adonis```
Then, run:
```
docker-compose run backend adonis migration:run
docker-compose run backend adonis seed
```

Congrats, your application is running!

### Stopping the application and reseting database

* To stop running the application, you can use ctrl+c on the running terminal, or run on the application directory:
```
docker-compose stop
```

* To stop running the application RESETING ALL DATA, run:
```
docker-compose down
```
Remember to follow all the first steps to run the application again.

The Backend will point to [http://localhost:3001](http://localhost:3001).
The Database will point to [http://localhost:5433](http://localhost:5433).
The Frontend will point to [http://localhost:3000](http://localhost:3000).