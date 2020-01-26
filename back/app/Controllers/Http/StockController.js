'use strict'

const Yup = require('yup')
const FieldsValidator = use('App/Lib/FieldsValidator')
const Stock = use('App/Models/Stock')
const Brandproduct = use('App/Models/Brandproduct')

class StockController {
  async index ({ request, params }) {
    // get by id
    const id = params.id

    if (id) {
      const stock = await Stock.query()
        .where('id', id)
        .with('brandproduct')
        .fetch()

      return stock
    }

    // get by field value or getAll if no params
    const data = request.only([
      'min_qty',
      'initial_qty',
      'current_qty',
      'brandproduct_id',
      'modified_by'
    ])

    const stocks = await Stock.query()
      .where(data)
      .with('brandproduct')
      .fetch()

    return stocks
  }

  async store ({ request, response, auth }) {
    const data = request.only([
      'min_qty',
      'initial_qty',
      'current_qty',
      'brandproduct_id'
    ])

    // get logged user
    try {
      const loggedUser = await auth.getUser()
      data.modified_by = loggedUser.id
    } catch (error) {
      return response.status(401)
    }

    // validate all fields
    const fields = [
      { min_qty: Yup.number().required() },
      { initial_qty: Yup.number().required() },
      { current_qty: Yup.number().required() },
      { brandproduct_id: Yup.number().required() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // check if already exists
    const checkIfBrandproductExists = await Brandproduct.findBy('id', data.brandproduct_id)
    if (!checkIfBrandproductExists) {
      return response.status(409).json({
        success: false,
        fields: ['brandproduct_id'],
        message: 'does not exists'
      })
    }

    const checkIfExists = await Stock.query()
      .where('brandproduct_id', data.brandproduct_id)
      .fetch()
    if (checkIfExists.first()) {
      return response.status(409).json({
        success: false,
        fields: ['brandproduct_id'],
        message: 'already exists'
      })
    }

    // create and return
    const stock = await Stock.create(data)

    return stock
  }

  async update ({ request, response, params, auth }) {
    const data = request.only([
      'min_qty',
      'initial_qty',
      'current_qty',
      'brandproduct_id'
    ])

    // get logged user
    try {
      const loggedUser = await auth.getUser()
      data.modified_by = loggedUser.id
    } catch (error) {
      return response.status(401).json({ error: 'Failed:Auth' })
    }

    // get by id
    const id = params.id
    const stock = await Stock.findBy('id', id)

    // check if the resource exist
    if (!stock) {
      return stock
    }

    // validate all fields
    const fields = [
      { min_qty: Yup.number() },
      { initial_qty: Yup.number() },
      { current_qty: Yup.number() },
      { brandproduct_id: Yup.number() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // check if already exists
    if (data.brandproduct_id) {
      const checkIfBrandproductExists = await Brandproduct.findBy('id', data.brandproduct_id)
      if (!checkIfBrandproductExists) {
        return response.status(409).json({
          success: false,
          fields: ['brandproduct_id'],
          message: 'does not exists'
        })
      }

      const checkIfExists = await Stock.query()
        .where('brandproduct_id', data.brandproduct_id)
        .fetch()
      if (checkIfExists.first()) {
        return response.status(409).json({
          success: false,
          fields: ['brandproduct_id'],
          message: 'already exists'
        })
      }
    }

    // update and return
    if (data.min_qty) {
      stock.min_qty = data.min_qty
    }
    if (data.current_qty) {
      stock.current_qty = data.current_qty
    }
    if (data.initial_qty) {
      stock.initial_qty = data.initial_qty
    }
    if (data.brandproduct_id) {
      stock.brandproduct_id = data.brandproduct_id
    }

    stock.save()

    return stock
  }
}

module.exports = StockController
