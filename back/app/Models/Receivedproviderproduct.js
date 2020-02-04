'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Receivedproviderproduct extends Model {
  receivement () {
    return this.belongsTo('App/Models/Receivement')
  }

  providerproduct () {
    return this.belongsTo('App/Models/Providerproduct')
  }
}

module.exports = Receivedproviderproduct
