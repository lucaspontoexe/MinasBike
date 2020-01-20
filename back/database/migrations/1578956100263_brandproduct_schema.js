'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BrandproductSchema extends Schema {
  up () {
    this.create('brandproducts', (table) => {
      table.increments()
      table.integer('price').unsigned()
      table.bigInteger('code')
      table
        .integer('brand_id')
        .unsigned()
        .references('id')
        .inTable('brands')
        .notNullable()
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('brandproducts')
  }
}

module.exports = BrandproductSchema
