'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProviderproductSchema extends Schema {
  up () {
    this.create('providerproducts', (table) => {
      table.increments()
      table.integer('cost_price').unsigned()
      table
        .integer('brandproduct_id')
        .unsigned()
        .references('id')
        .inTable('brandproducts')
        .notNullable()
      table
        .integer('provider_id')
        .unsigned()
        .references('id')
        .inTable('providers')
        .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('providerproducts')
  }
}

module.exports = ProviderproductSchema
