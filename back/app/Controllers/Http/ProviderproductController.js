'use strict'

const Yup = require('yup')
const FieldsValidator = use('App/Lib/YupValidation')
const Providerproduct = use('App/Models/Providerproduct')
const Brandproduct = use('App/Models/Brandproduct')
const Provider = use('App/Models/Provider')

class ProviderproductController {
  async index ({ request, response, params }) {
    // get by id
    const id = params.id
    if (id) {
      try {
        const providerproduct = await Providerproduct.query()
          .where('id', id)
          .with('brandproduct')
          .with('provider')
          .fetch()

        return providerproduct
      } catch (error) {
        return response.status(400).json({ error: 'This resource does not exist' })
      }
    }
    // get by field value or getAll if no params
    const data = request.only([
      'cost_price',
      'brandproduct_id',
      'provider_id'
    ])

    const providerproducts = await Providerproduct.query()
      .where(data)
      .with('brandproduct')
      .with('provider')
      .fetch()

    return providerproducts
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

    const validation = await FieldsValidator.validate({ fields, data })

    if (!validation.success) {
      return response.status(400).json({ error: validation.error })
    }

    // check if already exists
    const checkIfBrandproductExists = await Brandproduct.findBy('id', data.brandproduct_id)
    if (!checkIfBrandproductExists) {
      return response.status(409).json({
        error: 'Invalid:Fields:brandproduct_id',
        message: 'This resource does not exist'
      })
    }
    const checkIfProviderExists = await Provider.findBy('id', data.provider_id)
    if (!checkIfProviderExists) {
      return response.status(409).json({
        error: 'Invalid:Fields:provider_id',
        message: 'This resource does not exist'
      })
    }

    const checkIfExists = await Providerproduct.query()
      .where('brandproduct_id', data.brandproduct_id)
      .where('provider_id', data.provider_id)
      .fetch()
    if (checkIfExists.first()) {
      return response.status(409).json({
        error: 'Invalid:Fields:brandproduct_id,provider_id',
        message: 'This resource already exists'
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
      return response.status(400).json({
        error: 'Invalid:Request',
        message: 'This resource does not exist'
      })
    }

    // validate all fields
    const fields = [
      { cost_price: Yup.number() },
      { provider_id: Yup.number() }
    ]

    const validation = await FieldsValidator.validate({ fields, data })

    if (!validation.success) {
      return response.status(400).json({ error: validation.error })
    }

    // check if already exists
    if (data.provider_id) {
      const checkIfProviderExists = await Provider.findBy('id', data.provider_id)
      if (!checkIfProviderExists) {
        return response.status(409).json({
          error: 'Invalid:Fields:provider_id',
          message: 'This resource does not exist'
        })
      }
      const checkIfExists = await Providerproduct.query()
        .where('brandproduct_id', providerproduct.brandproduct_id)
        .where('provider_id', data.provider_id)
        .fetch()
      if (checkIfExists.first()) {
        return response.status(409).json({
          error: 'Invalid:Fields:provider_id,brandproduct_id',
          message: 'This resource already exists'
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
