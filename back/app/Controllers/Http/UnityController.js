'use strict'

const Unity = use('App/Models/Unity')

class UnityController {
  async index ({ request, params }) {
    // get by id
    const id = params.id
    if (id) {
      const unity = await Unity.findBy('id', id)
      return unity
    }

    // get by field value or getAll if no params
    const data = request.only(['acronym', 'description'])

    const unities = await Unity.query().where(data).fetch()

    return unities
  }
}

module.exports = UnityController
