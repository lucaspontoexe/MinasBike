'use strict'

const Location = use('App/Models/Location')

class LocationController {
  async index ({ request, params }) {
    // get by id
    const id = params.id
    if (id) {
      const location = await Location.findBy('id', id)
      return location
    }

    // get by field value or getAll if no params
    const data = request.only(['name', 'description'])
    const locations = await Location.query().where(data).fetch()

    return locations
  }
}

module.exports = LocationController
