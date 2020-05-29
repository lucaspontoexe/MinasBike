'use strict'

const IndexBuilder = use('App/Lib/IndexBuilder')

class ServiceorderproductController {
  async index ({ request, params }) {
    const data = request.only([
      'serviceorder_id',
      'brandproduct_id',
      'brandproduct_qty'
    ])
    const modelName = 'Serviceorderproduct'
    const id = params.id
    const includes = request.only([
      'brandproduct',
      'serviceorder'
    ])

    const query = await IndexBuilder.build({ modelName, id, data, includes })

    return query
  }
}

module.exports = ServiceorderproductController
