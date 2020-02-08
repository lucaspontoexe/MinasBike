'use strict'

const Yup = require('yup')
const FieldsValidator = use('App/Lib/FieldsValidator')
const Client = use('App/Models/Client')
const IndexBuilder = use('App/Lib/IndexBuilder')

class ClientController {
  async index ({ request, params }) {
    const data = request.only(['name', 'address', 'phone', 'email', 'birthday'])
    const modelName = 'Client'
    const id = params.id
    const includes = request.only([
      'Serviceorders',
      'Serviceorderproducts'
    ])

    const query = await IndexBuilder.build({ modelName, id, data, includes })

    return query
  }

  async store ({ request, response }) {
    const data = request.only(['name', 'address', 'phone', 'email', 'birthday'])

    // validate all fields
    const fields = [
      { name: Yup.string().strict().required() },
      { address: Yup.string().strict().required() },
      { phone: Yup.string().strict().required() },
      { email: Yup.string().strict().required() },
      { birthday: Yup.date().required() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // create and return
    const client = await Client.create(data)

    return client
  }

  async update ({ request, response, params }) {
    const data = request.only(['name', 'address', 'phone', 'email', 'birthday'])

    // get by id
    const id = params.id
    const client = await Client.findBy('id', id)

    // check if the resource exist
    if (!client) {
      return client
    }

    // validate all fields
    const fields = [
      { name: Yup.string().strict() },
      { address: Yup.string().strict() },
      { phone: Yup.string().strict() },
      { email: Yup.string().strict() },
      { birthday: Yup.date() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // update and return
    if (data.name) {
      client.name = data.name
    }
    if (data.address) {
      client.address = data.address
    }
    if (data.phone) {
      client.phone = data.phone
    }
    if (data.email) {
      client.email = data.email
    }
    if (data.birthday) {
      client.birthday = data.birthday
    }

    client.save()

    return client
  }
}

module.exports = ClientController
