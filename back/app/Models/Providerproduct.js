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
}

module.exports = Providerproduct
