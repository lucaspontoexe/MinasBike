'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  category () {
    return this.belongsTo('App/Models/Category')
  }

  unity () {
    return this.belongsTo('App/Models/Unity')
  }

  brandproducts () {
    return this.hasMany('App/Models/Brandproduct')
  }

  brands () {
    return this.manyThrough('App/Models/Brandproduct', 'brand', 'id', 'product_id')
  }

  stocks () {
    return this.manyThrough('App/Models/Brandproduct', 'stock', 'id', 'product_id')
  }

  providerproducts () {
    return this.manyThrough('App/Models/Brandproduct', 'providerproducts', 'id', 'product_id')
  }
}

module.exports = Product
