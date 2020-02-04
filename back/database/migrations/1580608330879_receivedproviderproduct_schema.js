'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReceivedproviderproductSchema extends Schema {
  up () {
    this.create('receivedproviderproducts', (table) => {
      table.increments()
      table
        .integer('providerproduct_id')
        .unsigned()
        .references('id')
        .inTable('providerproducts')
        .notNullable()
      table
        .integer('receivement_id')
        .unsigned()
        .references('id')
        .inTable('receivements')
        .notNullable()
      table.integer('providerproduct_qty')
      table.timestamps()
    })
  }

  down () {
    this.drop('receivedproviderproducts')
  }
}

module.exports = ReceivedproviderproductSchema
