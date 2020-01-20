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
}

module.exports = Provider
