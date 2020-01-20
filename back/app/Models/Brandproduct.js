'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Brandproduct extends Model {
  brand () {
    return this.belongsTo('App/Models/Brand')
  }

  product () {
    return this.belongsTo('App/Models/Product')
  }

  providerproducts () {
    return this.hasMany('App/Models/Providerproduct')
  }

  stock () {
    return this.hasOne('App/Models/Stock')
  }
}

module.exports = Brandproduct
