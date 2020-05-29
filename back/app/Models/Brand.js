'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Brand extends Model {
  brandproducts () {
    return this.hasMany('App/Models/Brandproduct')
  }

  products () {
    return this.manyThrough('App/Models/Brandproduct', 'product', 'id', 'brand_id')
  }

  providerproducts () {
    return this.manyThrough('App/Models/Brandproduct', 'providerproducts', 'id', 'brand_id')
  }
}

module.exports = Brand
