'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Brand extends Model {
  brandproducts () {
    return this.hasMany('App/Models/Brandproduct')
  }
}

module.exports = Brand
