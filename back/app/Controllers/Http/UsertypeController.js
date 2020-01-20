/* eslint-disable camelcase */
'use strict'

const Usertype = use('App/Models/Usertype')

class UsertypeController {
  // store only by seeds
  async index ({ request, response, params }) {
    // get by id
    const id = params.id
    try {
      if (id) {
        const usertypes = await Usertype.findBy('id', id)
        return usertypes
      }
    } catch (error) {
      return response.status(400).json({ error: 'This resource does not exist' })
    }
    // get by field value or getAll if no params
    const data = request.only(['name', 'access_level'])
    const usertypes = await Usertype.query().where(data).fetch()
    return usertypes
  }
}

module.exports = UsertypeController
