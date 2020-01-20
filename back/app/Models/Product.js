'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  brandproduct () {
    return this.hasOne('App/Models/Brandproduct')
  }

  category () {
    return this.belongsTo('App/Models/Category')
  }

  unity () {
    return this.belongsTo('App/Models/Unity')
  }
}

module.exports = Product
