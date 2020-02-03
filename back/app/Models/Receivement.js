'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Receivement extends Model {
  receivedproviderproducts () {
    return this.hasMany('App/Models/Receivedproviderproduct')
  }

  providerproducts () {
    return this.manyThrough(
      'App/Models/Receivedproviderproduct',
      'providerproduct',
      'id',
      'receivement_id'
    )
  }
}

module.exports = Receivement
