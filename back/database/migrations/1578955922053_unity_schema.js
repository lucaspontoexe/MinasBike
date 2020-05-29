'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UnitySchema extends Schema {
  up () {
    this.create('unities', (table) => {
      table.increments()
      table.string('acronym').notNullable().unique()
      table.string('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('unities')
  }
}

module.exports = UnitySchema
