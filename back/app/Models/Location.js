'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Location extends Model {
  providers () {
    return this.hasMany('App/Models/Provider')
  }

  providerproducts () {
    return this.manyThrough('App/Models/Provider', 'providerproducts', 'id', 'location_id')
  }
}

module.exports = Location
