'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceorderSchema extends Schema {
  up () {
    this.create('serviceorders', (table) => {
      table.increments()
      table.string('description')
      table.date('delivery_time')
      table.integer('total_value')
      table
        .integer('client_id')
        .unsigned()
        .references('id')
        .inTable('clients')
        .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('serviceorders')
  }
}

module.exports = ServiceorderSchema
