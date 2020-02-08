'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Client extends Model {
  Serviceorders () {
    return this.hasMany('App/Models/Serviceorder')
  }

  Serviceorderproducts () {
    return this.manyThrough(
      'App/Models/Serviceorder',
      'Serviceorderproducts',
      'id',
      'client_id'
    )
  }
}

module.exports = Client
