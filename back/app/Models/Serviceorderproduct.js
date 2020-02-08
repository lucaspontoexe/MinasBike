'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Serviceorderproduct extends Model {
  serviceorder () {
    return this.belongsTo('App/Models/Serviceorder')
  }

  brandproduct () {
    return this.belongsTo('App/Models/Brandproduct')
  }
}

module.exports = Serviceorderproduct
