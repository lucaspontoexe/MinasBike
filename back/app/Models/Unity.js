'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Unity extends Model {
  products () {
    return this.hasMany('App/Models/Product')
  }
}

module.exports = Unity
