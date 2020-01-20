'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsertypeSchema extends Schema {
  up () {
    this.create('usertypes', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.integer('access_level').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('usertypes')
  }
}

module.exports = UsertypeSchema
