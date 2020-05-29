'use strict'

const IndexBuilder = use('App/Lib/IndexBuilder')

class UnityController {
  async index ({ request, params }) {
    const data = request.only(['acronym', 'description'])
    const modelName = 'Unity'
    const id = params.id
    const includes = request.only([
      'products',
      'brandproducts'
    ])

    const query = await IndexBuilder.build({ modelName, id, data, includes })

    return query
  }
}

module.exports = UnityController
