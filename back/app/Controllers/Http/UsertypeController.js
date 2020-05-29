/* eslint-disable camelcase */
'use strict'

const IndexBuilder = use('App/Lib/IndexBuilder')

class UsertypeController {
  // store only by seeds
  async index ({ request, params }) {
    const data = request.only(['name', 'access_level'])
    const modelName = 'Usertype'
    const id = params.id
    const includes = request.only([
      'users'
    ])

    const query = await IndexBuilder.build({ modelName, id, data, includes })

    return query
  }
}

module.exports = UsertypeController
