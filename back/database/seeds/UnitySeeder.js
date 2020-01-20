'use strict'

/*
|--------------------------------------------------------------------------
| UnitySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')

const Unity = use('App/Models/Unity')

class UnitySeeder {
  async run () {
    await Unity.createMany([
      { acronym: 'Cm', description: 'centímetro' },
      { acronym: 'Kg', description: 'quilo' },
      { acronym: 'U', description: 'unidade' },
      { acronym: 'M', description: 'metro' }
    ])
  }
}

module.exports = UnitySeeder
