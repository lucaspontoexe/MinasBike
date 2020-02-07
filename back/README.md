# Adonis API application
The "relation include" query params must be sent with the value ```true```
All the models have a field "created_at" and "updated_at" in their schemas 


## Brand
schema:
- name: ```string```

### GET: /brands or /brands/id
accepted parameters: 
- fields to get by value value: 
```name```
- relations to include: 
```products, brandproducts, providerproducts```

### POST: /brands
accepted body object:
- fields to create: 
```name```

### PUT: /brands/id
accepted body object:
- fields to update: 
```name```


## Brandproduct
schema:
- ```price: integer```
- ```code: bigInt```
- ```brand_id: integer```
- ```product_id: integer```

### GET: /brandproducts or /brandproducts/id
accepted parameters: 
- fields to get by value value:
```price, code, product_id, brand_id```
- relations to include: 
```product, brand, stock, providerproducts, providers, receivedproviderproducts```

### POST: /brandproducts
accepted body object:
- fields to create: 
```price, code, product_id, brand_id```

### PUT: /brandproducts/id
accepted body object:
- fields to update: 
```price, code, brand_id```


## Category
schema:
- ```name: string```
- ```description: string```

### GET: /categories or /categories/id
accepted parameters: 
- fields to get by value value: 
```name, description```
- relations to include: 
```products, brandproducts```

### POST: /categories
accepted body object:
- fields to create: 
```name, description```

### PUT: /categories/id
accepted body object:
- fields to update: 
```name, description```


## Location
schema:
- ```city: string```
- ```state: string```

### GET: /locations or /locations/id
accepted parameters: 
- fields to get by value value: 
```city, state```
- relations to include: 
```providerproducts, providers```


## Product
schema:
- ```name: string```
- ```description: string```
- ```unity_id: integer```
- ```category_id: integer```

### GET: /products or /products/id
accepted parameters: 
- fields to get by value value: 
```name, description, category_id, unity_id```
- relations to include: 
```category, unity, brands, providerproducts, brandproducts, stocks```

### POST: /products
accepted body object:
- fields to create: 
```name, description, category_id, unity_id```

### PUT: /products/id
accepted body object:
- fields to update: 
```name, description, category_id, unity_id```


## Provider
schema:
- ```name: string```
- ```contact: string```
- ```phone: string```
- ```email: string```
- ```location_id: integer```

### GET: /providers or /providers/id
accepted parameters: 
- fields to get by value value: 
```name, contact, email, phone, location_id```
- relations to include: 
```location, providerproducts, brandproducts, receivedproviderproducts```

### POST: /providers
accepted body object:
- fields to create: 
```name, contact, email, phone, location_id```

### PUT: /providers/id
accepted body object:
- fields to update: 
```name, contact, email, phone, location_id```


## Providerproduct
schema:
- ```cost_price: integer```
- ```brandproduct_id: integer```
- ```provider_id: integer```

### GET: /providerproducts or /providerproducts/id
accepted parameters: 
- fields to get by value value: 
```cost_price, brandproduct_id, provider_id```
- relations to include: 
```brandproduct, provider```

### POST: /providerproducts
accepted body object:
- fields to create: 
```cost_price, brandproduct_id, provider_id```

### PUT: /providerproducts/id
accepted body object:
- fields to update: 
```cost_price, provider_id```


## Stock
schema:
- ```min_qty: integer```
- ```current_qty: integer```
- ```initial_qty: integer```
- ```brandproduct_id: integer```
- ```modified_by: integer```

### GET: /stocks or /stocks/id
accepted parameters: 
- fields to get by value value: 
```min_qty, initial_qty, current_qty, brandproduct_id, modified_by```
- relations to include: 
```brandproduct, (user)bug```

### POST: /stocks
accepted body object:
- fields to create: 
```min_qty, initial_qty, current_qty, brandproduct_id```

### PUT: /stocks/id
accepted body object:
- fields to update: 
```min_qty, initial_qty, current_qty, brandproduct_id```


## Unity
schema:
- ```acronym: string```
- ```description: string```

### GET: /unities or /unities/id
accepted parameters: 
- fields to get by value value: 
```acronym, description```
- relations to include: 
```products, brandproducts```


## User
schema:
- ```active: boolean```
- ```name: string```
- ```login: string```
- ```email: string```
- ```password: string```
- ```usertype_id: integer```

### GET: /users or /users/id
accepted parameters: 
- fields to get by value value: 
```active, name, login, email, usertype_id```
- relations to include: 
```usertype, (stocks)bug```

### POST: /users
accepted body object:
- fields to create: 
```active, name, login, email, password, usertype_id```

### PUT: /users/id
accepted body object:
- fields to update: 
```name, login, password, old_password```


## Usertype
schema:
- ```name: string```
- ```access_level: integer```

### GET: /usertypes or /usertypes/id
accepted parameters: 
- fields to get by value value: 
```name, access_level```
- relations to include: 
```users```


## Receivement
schema:
- ```description: string```
- ```total_value: integer```
- ```delivery_time: date```

### GET: /receivements or /receivements/id
accepted parameters: 
- fields to get by value value: 
```description, delivery_time, total_value```
- relations to include: 
```receivedproviderproducts, providerproducts```

### POST: /receivements
accepted body object:
- fields to create: 
```description, delivery_time, total_value```
- special value: 
```receivedproviderproducts``` must be a array of Receivedproviderproduct objects

### PUT: /receivements/id
accepted body object:
- fields to update: 
```description, delivery_time```


## Receivedproviderproduct
schema:
- ```providerproduct_qty: integer```
- ```providerproduct_id: integer```
- ```receivement_id: integer```

### GET: /receivedproviderproducts or /receivedproviderproducts/id
accepted parameters: 
- fields to get by value value: 
```receivement_id, providerproduct_id, providerproduct_qty```
- relations to include: 
```providerproduct, receivement```


## Client
schema:
- ```name: string```
- ```address: string```
- ```phone: string```
- ```email: string```
- ```birthday: date```

### GET: /clients or /clients/id
accepted parameters: 
- fields to get by value value: 
```name, address, phone, email, birthday```
- relations to include: 
```Serviceorders, Serviceorderproducts```

### POST: /clients
accepted body object:
- fields to create: 
```name, address, phone, email, birthday```

### PUT: /clients/id
accepted body object:
- fields to update: 
```name, address, phone, email, birthday```


## Serviceorder
schema:
- ```description: string```
- ```delivery_time: date```
- ```total_value: integer```
- ```client_id: integer```

### GET: /serviceorders or /serviceorders/id
accepted parameters: 
- fields to get by value value: 
```description, delivery_time, total_value, client_id```
- relations to include: 
```client, serviceorderproducts, brandproducts```

### POST: /serviceorders
accepted body object:
- fields to create: 
```description, delivery_time, total_value, client_id```
- special value: 
```serviceorderproducts``` must be a array of Serviceorderproduct objects

### PUT: /serviceorders/id
accepted body object:
- fields to update: 
```description, delivery_time```


## Serviceorderproduct
schema:
- ```brandproduct_qty: integer```
- ```serviceorder_id: integer```
- ```brandproduct_id: integer```

### GET: /serviceorderproducts or /serviceorderproducts/id
accepted parameters: 
- fields to get by value value: 
```brandproduct_qty, serviceorder_id, brandproduct_id```
- relations to include: 
```brandproduct, serviceorder```
