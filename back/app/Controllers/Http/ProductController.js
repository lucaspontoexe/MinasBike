'use strict'

const Yup = require('yup')
const FieldsValidator = use('App/Lib/FieldsValidator')
const Product = use('App/Models/Product')
const Unity = use('App/Models/Unity')
const Category = use('App/Models/Category')

class ProductController {
  async index ({ request, params }) {
    // get by id
    const id = params.id
    if (id) {
      const product = await Product.query()
        .where('id', id)
        .with('category')
        .with('unity')
        .fetch()

      return product
    }
    // get by field value or getAll if no params
    const data = request.only([
      'name',
      'description',
      'category_id',
      'unity_id'
    ])

    const products = await Product.query()
      .where(data)
      .with('category')
      .with('unity')
      .fetch()

    return products
  }

  async store ({ request, response }) {
    const data = request.only([
      'name',
      'description',
      'category_id',
      'unity_id'
    ])

    // validate all fields
    const fields = [
      { name: Yup.string().strict().required() },
      { description: Yup.string().strict().required() },
      { category_id: Yup.number().required() },
      { unity_id: Yup.number().required() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // check if already exists
    const checkIfExists = await Product.findBy('name', data.name)
    if (checkIfExists) {
      return response.status(409).json({
        success: false,
        fields: ['name'],
        message: 'Already exists'
      })
    }

    const checkIfUnityExists = await Unity.findBy('id', data.unity_id)
    if (!checkIfUnityExists) {
      return response.status(409).json({
        success: false,
        fields: ['unity_id'],
        message: 'does not exists'
      })
    }
    const checkIfCategoryExists = await Category.findBy('id', data.category_id)
    if (!checkIfCategoryExists) {
      return response.status(409).json({
        success: false,
        fields: ['category_id'],
        message: 'does not exists'
      })
    }

    // create and return
    const product = await Product.create(data)

    return product
  }

  async update ({ request, response, params }) {
    const data = request.only([
      'name',
      'description',
      'category_id',
      'unity_id'
    ])

    // get by id
    const id = params.id
    const product = await Product.findBy('id', id)

    // check if the resource exist
    if (!product) {
      return product
    }

    // validate all fields
    const fields = [
      { name: Yup.string().strict() },
      { description: Yup.string().strict() },
      { category_id: Yup.number() },
      { unity_id: Yup.number() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // check if already exists
    if (data.name) {
      const checkIfExists = await Product.findBy('name', data.name)
      if (checkIfExists) {
        return response.status(409).json({
          success: false,
          fields: ['name'],
          message: 'Already exists'
        })
      }
    }

    if (data.unity_id) {
      const checkIfUnityExists = await Unity.findBy('id', data.unity_id)
      if (!checkIfUnityExists) {
        return response.status(409).json({
          success: false,
          fields: ['unity_id'],
          message: 'does not exist'
        })
      }
    }
    if (data.category_id) {
      const checkIfCategoryExists = await Category.findBy('id', data.category_id)
      if (!checkIfCategoryExists) {
        return response.status(409).json({
          success: false,
          fields: ['category_id'],
          message: 'does not exist'
        })
      }
    }

    // update and return
    if (data.name) {
      product.name = data.name
    }
    if (data.description) {
      product.description = data.description
    }
    if (data.unity_id) {
      product.unity_id = data.unity_id
    }
    if (data.category_id) {
      product.category_id = data.category_id
    }

    product.save()

    return product
  }
}

module.exports = ProductController
