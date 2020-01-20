'use strict'

/*
|--------------------------------------------------------------------------
| UsertypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Usertype = use('App/Models/Usertype')

class UsertypeSeeder {
  async run () {
    await Usertype.createMany([
      { name: 'admin', access_level: 3 },
      { name: 'manager', access_level: 2 }
    ])
  }
}

module.exports = UsertypeSeeder
