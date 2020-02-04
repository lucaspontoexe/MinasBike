'use strict'

const Yup = require('yup')
const FieldsValidator = use('App/Lib/FieldsValidator')
const Provider = use('App/Models/Provider')
const Location = use('App/Models/Location')
const IndexBuilder = use('App/Lib/IndexBuilder')

class ProviderController {
  async index ({ request, params }) {
    const data = request.only([
      'name',
      'contact',
      'email',
      'phone',
      'location_id'
    ])
    const modelName = 'Provider'
    const id = params.id
    const includes = request.only([
      'location',
      'providerproducts',
      'brandproducts',
      'receivedproviderproducts'
    ])

    const query = await IndexBuilder.build({ modelName, id, data, includes })

    return query
  }

  async store ({ request, response }) {
    const data = request.only([
      'name',
      'contact',
      'email',
      'phone',
      'location_id'
    ])

    // validate all fields
    const fields = [
      { name: Yup.string().strict().required() },
      { contact: Yup.string().strict().required() },
      { email: Yup.string().strict().required() },
      { phone: Yup.string().strict().required() },
      { location_id: Yup.number().required() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // check if already exists
    const checkIfExists = await Provider.findBy('name', data.name)
    if (checkIfExists) {
      return response.status(409).json({
        success: false,
        fields: ['name'],
        message: 'Already exists'
      })
    }

    const checkIfLocationExists = await Location.findBy('id', data.location_id)
    if (!checkIfLocationExists) {
      return response.status(409).json({
        success: false,
        fields: ['location_id'],
        message: 'does not exists'
      })
    }

    // create and return
    const provider = await Provider.create(data)

    return provider
  }

  async update ({ request, response, params }) {
    const data = request.only([
      'name',
      'contact',
      'email',
      'phone',
      'location_id'
    ])

    // get by id
    const id = params.id
    const provider = await Provider.findBy('id', id)

    // check if the resource exist
    if (!provider) {
      return provider
    }

    // validate all fields
    const fields = [
      { name: Yup.string().strict() },
      { contact: Yup.string().strict() },
      { email: Yup.string().strict() },
      { phone: Yup.string().strict() },
      { location_id: Yup.number() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // check if already exists
    if (data.name) {
      const checkIfExists = await Provider.findBy('name', data.name)
      if (checkIfExists) {
        return response.status(409).json({
          success: false,
          fields: ['name'],
          message: 'Already exists'
        })
      }
    }

    if (data.location_id) {
      const checkIfLocationExists = await Location.findBy('id', data.location_id)
      if (!checkIfLocationExists) {
        return response.status(409).json({
          success: false,
          fields: ['location_id'],
          message: 'does not exists'
        })
      }
    }

    // update and return
    if (data.name) {
      provider.name = data.name
    }
    if (data.contact) {
      provider.contact = data.contact
    }
    if (data.email) {
      provider.email = data.email
    }
    if (data.phone) {
      provider.phone = data.phone
    }
    if (data.location_id) {
      provider.location_id = data.location_id
    }

    provider.save()

    return provider
  }
}

module.exports = ProviderController
