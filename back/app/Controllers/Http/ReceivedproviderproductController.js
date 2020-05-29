'use strict'

const IndexBuilder = use('App/Lib/IndexBuilder')

class ReceivedproviderproductController {
  async index ({ request, params }) {
    const data = request.only([
      'receivement_id',
      'providerproduct_id',
      'providerproduct_qty'
    ])
    const modelName = 'Receivedproviderproduct'
    const id = params.id
    const includes = request.only([
      'providerproduct',
      'receivement'
    ])

    const query = await IndexBuilder.build({ modelName, id, data, includes })

    return query
  }
}

module.exports = ReceivedproviderproductController
