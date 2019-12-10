import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import CategoryController from './app/controllers/CategoryController';
import LocationController from './app/controllers/LocationController';
import ProductController from './app/controllers/ProductController';
import ProviderController from './app/controllers/ProviderController';
import StockController from './app/controllers/StockController';

const routes = new Router();

// root
routes.get('/', (req, res) => {
  res.json({ messsage: 'It is working' });
});
// sessions
routes.post('/sessions', SessionController.store);
// users
routes.post('/users', UserController.store);
// categories
routes.get('/categories', CategoryController.index);
// locations
routes.get('/locations', LocationController.index);
// products
routes.get('/products', ProductController.index);
// providers
routes.get('/providers', ProviderController.index);
// stocks
routes.get('/stocks', StockController.index);

// authenticated routes
routes.use(authMiddleware);
// users
routes.get('/users', UserController.index);
routes.put('/users', UserController.update);
// categories
routes.post('/categories', CategoryController.store);
routes.put('/categories/:id', CategoryController.update);
routes.delete('/categories/:id', CategoryController.delete);
// locations
routes.post('/locations', LocationController.store);
routes.put('/locations/:id', LocationController.update);
routes.delete('/locations/:id', LocationController.delete);
// products
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);
// providers
routes.post('/providers', ProviderController.store);
routes.put('/providers/:id', ProviderController.update);
routes.delete('/providers/:id', ProviderController.delete);
// stocks
routes.post('/stocks', StockController.store);
routes.put('/stocks/:id', StockController.update);
routes.delete('/stocks/:id', StockController.delete);

export default routes;
