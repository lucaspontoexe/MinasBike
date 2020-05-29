'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReceivementSchema extends Schema {
  up () {
    this.create('receivements', (table) => {
      table.increments()
      table.string('description')
      table.date('delivery_time')
      table.integer('total_value')
      table.timestamps()
    })
  }

  down () {
    this.drop('receivements')
  }
}

module.exports = ReceivementSchema
