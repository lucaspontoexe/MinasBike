'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.string('description').notNullable()
      table
        .integer('unity_id')
        .unsigned()
        .references('id')
        .inTable('unities')
        .notNullable()
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
