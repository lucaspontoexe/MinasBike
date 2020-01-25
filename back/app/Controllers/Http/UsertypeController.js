/* eslint-disable camelcase */
'use strict'

const Usertype = use('App/Models/Usertype')

class UsertypeController {
  // store only by seeds
  async index ({ request, params }) {
    // get by id
    const id = params.id

    if (id) {
      const usertypes = await Usertype.findBy('id', id)
      return usertypes
    }

    // get by field value or getAll if no params
    const data = request.only(['name', 'access_level'])

    const usertypes = await Usertype.query().where(data).fetch()

    return usertypes
  }
}

module.exports = UsertypeController
