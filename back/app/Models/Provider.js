'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Provider extends Model {
  location () {
    return this.belongsTo('App/Models/Location')
  }

  providerproducts () {
    return this.hasMany('App/Models/Providerproduct')
  }

  brandproducts () {
    return this.manyThrough('App/Models/Providerproduct', 'brandproduct', 'id', 'provider_id')
  }

  receivedproviderproducts () {
    return this.manyThrough('App/Models/Providerproduct', 'receivedproviderproducts', 'id', 'provider_id')
  }
}

module.exports = Provider
