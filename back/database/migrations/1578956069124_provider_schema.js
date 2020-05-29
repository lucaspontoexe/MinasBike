'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProviderSchema extends Schema {
  up () {
    this.create('providers', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.string('contact').notNullable()
      table.string('phone').notNullable()
      table.string('email').notNullable()
      table
        .integer('location_id')
        .unsigned()
        .references('id')
        .inTable('locations')
        .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('providers')
  }
}

module.exports = ProviderSchema
