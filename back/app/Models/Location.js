'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Location extends Model {
  providers () {
    return this.hasMany('App/Models/Provider')
  }
}

module.exports = Location
