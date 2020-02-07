'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Serviceorder extends Model {
  client () {
    return this.belongsTo('App/Models/client')
  }

  serviceorderproducts () {
    return this.hasMany('App/Models/Serviceorderproduct')
  }

  brandproducts () {
    return this.manyThrough(
      'App/Models/Serviceorderproduct',
      'brandproducts',
      'id',
      'serviceorder_id'
    )
  }
}

module.exports = Serviceorder
