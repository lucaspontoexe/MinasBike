'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// root
Route.get('/', () => { return { message: "It's working" } })

// routes without auth
// users
Route.post('/users', 'UserController.store')
// sessions
Route.post('/sessions', 'SessionController.store')

Route.group(() => {
  // usertypes
  Route.get('/usertypes', 'UsertypeController.index')
  Route.get('/usertypes/:id', 'UsertypeController.index')
  // users
  Route.get('/users', 'UserController.index')
  Route.get('/users/:id', 'UserController.index')
  Route.put('/users/:id', 'UserController.update')
  // units
  Route.get('/unities', 'UnityController.index')
  Route.get('/unities/:id', 'UnityController.index')
  // locations
  Route.get('/locations', 'LocationController.index')
  Route.get('/locations/:id', 'LocationController.index')
  // categories
  Route.get('/categories', 'CategoryController.index')
  Route.get('/categories/:id', 'CategoryController.index')
  Route.post('/categories', 'CategoryController.store')
  Route.put('/categories/:id', 'CategoryController.update')
  // brands
  Route.get('/brands', 'BrandController.index')
  Route.get('/brands/:id', 'BrandController.index')
  Route.post('/brands', 'BrandController.store')
  Route.put('/brands/:id', 'BrandController.update')
  // providers
  Route.get('/providers', 'ProviderController.index')
  Route.get('/providers/:id', 'ProviderController.index')
  Route.post('/providers', 'ProviderController.store')
  Route.put('/providers/:id', 'ProviderController.update')
  // products
  Route.get('/products', 'ProductController.index')
  Route.get('/products/:id', 'ProductController.index')
  Route.post('/products', 'ProductController.store')
  Route.put('/products/:id', 'ProductController.update')
  // brandproducts
  Route.get('/brandproducts', 'BrandproductController.index')
  Route.get('/brandproducts/:id', 'BrandproductController.index')
  Route.post('/brandproducts', 'BrandproductController.store')
  Route.put('/brandproducts/:id', 'BrandproductController.update')
  // stocks
  Route.get('/stocks', 'StockController.index')
  Route.get('/stocks/:id', 'StockController.index')
  Route.post('/stocks', 'StockController.store')
  Route.put('/stocks/:id', 'StockController.update')
  // providerproducts
  Route.get('/providerproducts', 'ProviderproductController.index')
  Route.get('/providerproducts/:id', 'ProviderproductController.index')
  Route.post('/providerproducts', 'ProviderproductController.store')
  Route.put('/providerproducts/:id', 'ProviderproductController.update')
  // providerproducts
  Route.get('/receivedproviderproducts', 'ReceivedproviderproductController.index')
  Route.get('/receivedproviderproducts/:id', 'ReceivedproviderproductController.index')
  // providerproducts
  Route.get('/receivements', 'ReceivementController.index')
  Route.get('/receivements/:id', 'ReceivementController.index')
  Route.post('/receivements', 'ReceivementController.store')
  Route.put('/receivements/:id', 'ReceivementController.update')
  // clients
  Route.get('/clients', 'ClientController.index')
  Route.get('/clients/:id', 'ClientController.index')
  Route.post('/clients', 'ClientController.store')
  Route.put('/clients/:id', 'ClientController.update')
  // serviceorders
  Route.get('/serviceorders', 'ServiceorderController.index')
  Route.get('/serviceorders/:id', 'ServiceorderController.index')
  Route.post('/serviceorders', 'ServiceorderController.store')
  Route.put('/serviceorders/:id', 'ServiceorderController.update')
  // serviceorderproducts
  Route.get('/serviceorderproducts', 'ServiceorderproductController.index')
  Route.get('/serviceorderproducts/:id', 'ServiceorderproductController.index')
  Route.post('/serviceorderproducts', 'ServiceorderproductController.store')
  Route.put('/serviceorderproducts/:id', 'ServiceorderproductController.update')
}).middleware(['auth'])
