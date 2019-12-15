import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import CategoryController from './app/controllers/CategoryController';
import LocationController from './app/controllers/LocationController';
import ProductController from './app/controllers/ProductController';
import ProviderController from './app/controllers/ProviderController';
import StockController from './app/controllers/StockController';
import FileController from './app/controllers/FileController';

const routes = new Router();

const upload = multer(multerConfig).single('file');

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
routes.get('/categories/:id', CategoryController.index);

// locations
routes.get('/locations', LocationController.index);
// products
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.index);
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

// file upload
routes.post('/files', (req, res) => {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'failed to get the request file' });
    }
    if (err) {
      return res
        .status(500)
        .json({ error: 'A Multer error occurred when uploading.' });
    }
    // Everything went fine.
    return FileController.store(req, res);
  });
});

export default routes;
