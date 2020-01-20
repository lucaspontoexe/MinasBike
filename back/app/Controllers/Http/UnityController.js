'use strict'

const Unity = use('App/Models/Unity')

class UnityController {
  async index ({ request, response, params }) {
    // get by id
    const id = params.id
    try {
      if (id) {
        const unity = await Unity.findBy('id', id)
        return unity
      }
    } catch (error) {
      return response.status(400).json({ error: 'This resource does not exist' })
    }
    // get by field value or getAll if no params
    const data = request.only(['acronym', 'description'])
    const unities = await Unity.query().where(data).fetch()
    return unities
  }
}

module.exports = UnityController
