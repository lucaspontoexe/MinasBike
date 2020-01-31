'use strict'

const Yup = require('yup')
const FieldsValidator = use('App/Lib/FieldsValidator')
const Providerproduct = use('App/Models/Providerproduct')
const Brandproduct = use('App/Models/Brandproduct')
const Provider = use('App/Models/Provider')
const IndexBuilder = use('App/Lib/IndexBuilder')

class ProviderproductController {
  async index ({ request, params }) {
    const data = request.only([
      'cost_price',
      'brandproduct_id',
      'provider_id'
    ])
    const modelName = 'Providerproduct'
    const id = params.id
    const includes = request.only([
      'brandproduct',
      'provider'
    ])

    const query = await IndexBuilder.build({ modelName, id, data, includes })

    return query
  }

  async store ({ request, response }) {
    const data = request.only([
      'cost_price',
      'brandproduct_id',
      'provider_id'
    ])

    // validate all fields
    const fields = [
      { cost_price: Yup.number().required() },
      { brandproduct_id: Yup.number().required() },
      { provider_id: Yup.number().required() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // check if exists
    const checkIfBrandproductExists = await Brandproduct.findBy('id', data.brandproduct_id)
    if (!checkIfBrandproductExists) {
      return response.status(409).json({
        success: false,
        fields: ['brandproduct_id'],
        message: 'does not exists'
      })
    }
    const checkIfProviderExists = await Provider.findBy('id', data.provider_id)
    if (!checkIfProviderExists) {
      return response.status(409).json({
        success: false,
        fields: ['provider_id'],
        message: 'does not exists'
      })
    }

    const checkIfExists = await Providerproduct.query()
      .where('brandproduct_id', data.brandproduct_id)
      .where('provider_id', data.provider_id)
      .fetch()

    if (checkIfExists.first()) {
      return response.status(409).json({
        success: false,
        fields: ['brandproduct_id', 'provider_id'],
        message: 'Already exists'
      })
    }

    // create and return
    const providerproduct = await Providerproduct.create(data)

    return providerproduct
  }

  async update ({ request, response, params }) {
    const data = request.only([
      'cost_price',
      'provider_id'
    ])

    // get by id
    const id = params.id
    const providerproduct = await Providerproduct.findBy('id', id)

    // check if the resource exist
    if (!providerproduct) {
      return providerproduct
    }

    // validate all fields
    const fields = [
      { cost_price: Yup.number() },
      { provider_id: Yup.number() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // check if already exists
    if (data.provider_id) {
      const checkIfProviderExists = await Provider.findBy('id', data.provider_id)
      if (!checkIfProviderExists) {
        return response.status(409).json({
          success: false,
          fields: ['provider_id'],
          message: 'does not exists'
        })
      }

      const checkIfExists = await Providerproduct.query()
        .where('brandproduct_id', providerproduct.brandproduct_id)
        .where('provider_id', data.provider_id)
        .fetch()
      if (checkIfExists.first()) {
        return response.status(409).json({
          success: false,
          fields: ['brandproduct_id', 'provider_id'],
          message: 'Already exists'
        })
      }
    }

    // update and return
    if (data.cost_price) {
      providerproduct.cost_price = data.cost_price
    }
    if (data.provider_id) {
      providerproduct.provider_id = data.provider_id
    }

    providerproduct.save()

    return providerproduct
  }
}

module.exports = ProviderproductController
