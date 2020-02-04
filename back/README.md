# Adonis API application

## routes get schema example:
/route or /route/id
  - list os queryparams accepted to return included relations
  - list of queryparams with required authentication permissions

The query param must be sent with the value ```true```

all routes below are restricted, only can be accessed by active users
/brands or /brands/id 
  - products, brandproducts, providerproducts

/brandproducts or /brandproducts/id 
  - brand, product, stock, providerproducts, providers, receivedproviderproducts

/categories or /categories/id 
  - products, brandproducts

/locations or /locations/id 
  - providers, providerproducts

/products or /products/id 
  - category, unity, brandproducts, brands, stocks, providerproducts

/providers or /providers/id 
  - location, providerproducts, brandproducts, receivedproviderproducts

/providerproducts or /providerproducts/id 
  - provider, brandproduct

/stocks or /stocks/id 
  - brandproduct, user

/unities or /unities/id 
  - products, brandproducts

/users or /users/id 
  - usertype
  - stocks (it requires to be the owner of the stocks to see, or admin to see all the stocks)

/usertypes or /usertypes/id 
  - users

/receivements or /receivements/id
  - receivedproviderproducts, providerproducts

/receivedproviderproducts or /receivedproviderproducts/id
  - receivement, providerproduct
