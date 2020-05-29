'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceorderproductSchema extends Schema {
  up () {
    this.create('serviceorderproducts', (table) => {
      table.increments()
      table.integer('brandproduct_qty')
      table
        .integer('brandproduct_id')
        .unsigned()
        .references('id')
        .inTable('brandproducts')
        .notNullable()
      table
        .integer('serviceorder_id')
        .unsigned()
        .references('id')
        .inTable('serviceorders')
        .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('serviceorderproducts')
  }
}

module.exports = ServiceorderproductSchema
