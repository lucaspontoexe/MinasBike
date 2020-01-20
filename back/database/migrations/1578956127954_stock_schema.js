'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StockSchema extends Schema {
  up () {
    this.create('stocks', (table) => {
      table.increments()
      table.integer('min_qty').unsigned()
      table.integer('current_qty').unsigned()
      table.integer('initial_qty').unsigned()
      table
        .integer('brandproduct_id')
        .unsigned()
        .references('id')
        .inTable('brandproducts')
        .notNullable()
        .unique()
      table
        .integer('modified_by')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('stocks')
  }
}

module.exports = StockSchema
