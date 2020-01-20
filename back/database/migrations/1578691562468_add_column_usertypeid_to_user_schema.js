'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table.integer('usertype_id').unsigned().references('id').inTable('usertypes').notNullable()
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
      table.dropColumn('usertype_id')
    })
  }
}

module.exports = UserSchema
