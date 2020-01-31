'use strict'

const IndexBuilder = use('App/Lib/IndexBuilder')

class LocationController {
  async index ({ request, params }) {
    const data = request.only(['city', 'state'])
    const modelName = 'Location'
    const id = params.id
    const includes = request.only([
      'providerproducts',
      'providers'
    ])

    const query = await IndexBuilder.build({ modelName, id, data, includes })

    return query
  }
}

module.exports = LocationController
