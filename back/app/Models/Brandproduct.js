'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Brandproduct extends Model {
  brand () {
    return this.belongsTo('App/Models/Brand')
  }

  product () {
    return this.belongsTo('App/Models/Product')
  }

  stock () {
    return this.hasOne('App/Models/Stock')
  }

  providerproducts () {
    return this.hasMany('App/Models/Providerproduct')
  }

  providers () {
    return this.manyThrough('App/Models/Providerproduct', 'provider', 'id', 'brandproduct_id')
  }

  receivedproviderproducts () {
    return this.manyThrough('App/Models/Providerproduct', 'receivedproviderproducts', 'id', 'brandproduct_id')
  }
}

module.exports = Brandproduct
