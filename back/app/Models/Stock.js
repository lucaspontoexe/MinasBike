'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Stock extends Model {
  brandproduct () {
    return this.belongsTo('App/Models/Brandproduct')
  }

  user () {
    return this.belongsTo('App/Models/User', 'modified_by', 'id')
  }
}

module.exports = Stock
