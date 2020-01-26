'use strict'

const Yup = require('yup')
const FieldsValidator = use('App/Lib/FieldsValidator')
const Brandproduct = use('App/Models/Brandproduct')
const Brand = use('App/Models/Brand')
const Product = use('App/Models/Product')

class BrandproductController {
  async index ({ request, params }) {
    // get by id
    const id = params.id
    if (id) {
      const brandproduct = await Brandproduct.query()
        .where('id', id)
        .with('brand')
        .with('product')
        .fetch()

      return brandproduct
    }
    // get by field value or getAll if no params
    const data = request.only([
      'price',
      'code',
      'product_id',
      'brand_id'
    ])
    const brandproducts = await Brandproduct.query()
      .where(data)
      .with('brand')
      .with('product')
      .fetch()

    return brandproducts
  }

  async store ({ request, response }) {
    const data = request.only([
      'price',
      'code',
      'product_id',
      'brand_id'
    ])

    // validate all fields
    const fields = [
      { price: Yup.number().required() },
      { code: Yup.number().required() },
      { product_id: Yup.number().required() },
      { brand_id: Yup.number().required() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // check if already exists
    const checkIfBrandExists = await Brand.findBy('id', data.brand_id)
    if (!checkIfBrandExists) {
      return response.status(409).json({
        success: false,
        fields: ['brand_id'],
        message: 'does not exist'
      })
    }
    const checkIfProductExists = await Product.findBy('id', data.product_id)
    if (!checkIfProductExists) {
      return response.status(409).json({
        success: false,
        fields: ['product_id'],
        message: 'does not exist'
      })
    }

    const checkIfExists = await Brandproduct.query()
      .where('product_id', data.product_id)
      .where('brand_id', data.brand_id)
      .fetch()

    if (checkIfExists.first()) {
      return response.status(409).json({
        success: false,
        fields: ['product_id', 'brand_id'],
        message: 'already exists'
      })
    }

    // create and return
    const brandproduct = await Brandproduct.create(data)

    return brandproduct
  }

  async update ({ request, response, params }) {
    const data = request.only([
      'price',
      'code',
      'brand_id'
    ])

    // get by id
    const id = params.id
    const brandproduct = await Brandproduct.findBy('id', id)

    // check if the resource exist
    if (!brandproduct) {
      return brandproduct
    }

    // validate all fields
    const fields = [
      { price: Yup.number() },
      { code: Yup.number() },
      { brand_id: Yup.number() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // check if already exists
    if (data.brand_id) {
      const checkIfBrandExists = await Brand.findBy('id', data.brand_id)
      if (!checkIfBrandExists) {
        return response.status(409).json({
          success: false,
          fields: ['brand_id'],
          message: 'does not exist'
        })
      }

      const checkIfExists = await Brandproduct.query()
        .where('product_id', brandproduct.product_id)
        .where('brand_id', data.brand_id)
        .fetch()

      if (checkIfExists.first()) {
        return response.status(409).json({
          success: false,
          fields: ['brand_id'],
          message: 'Already exists'
        })
      }
    }

    // update and return
    if (data.price) {
      brandproduct.price = data.price
    }
    if (data.code) {
      brandproduct.code = data.code
    }
    if (data.brand_id) {
      brandproduct.brand_id = data.brand_id
    }

    brandproduct.save()

    return brandproduct
  }
}

module.exports = BrandproductController
