import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import CategoryController from './app/controllers/CategoryController';

const routes = new Router();

// root
routes.get('/', (req, res) => {
  res.json({ messsage: 'It is working' });
});
// sessions
routes.post('/sessions', SessionController.store);
// users
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
// categories
routes.get('/categories', CategoryController.index);

// authenticated routes
routes.use(authMiddleware);

// users
routes.put('/users', UserController.update);
// categories
routes.post('/categories', CategoryController.store);
routes.put('/categories/:id', CategoryController.update);
routes.delete('/categories/:id', CategoryController.delete);

export default routes;
