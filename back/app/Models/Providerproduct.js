'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Providerproduct extends Model {
  provider () {
    return this.belongsTo('App/Models/Provider')
  }

  brandproduct () {
    return this.belongsTo('App/Models/Brandproduct')
  }

  receivedproviderproducts () {
    return this.hasMany('App/Models/Receivedproviderproduct')
  }

  receivements () {
    return this.manyThrough(
      'App/Models/Receivedproviderproduct',
      'receivement',
      'id',
      'providerproduct_id'
    )
  }
}

module.exports = Providerproduct
