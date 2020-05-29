'use strict'

const Yup = require('yup')
const FieldsValidator = use('App/Lib/FieldsValidator')
const Category = use('App/Models/Category')
const IndexBuilder = use('App/Lib/IndexBuilder')

class CategoryController {
  async index ({ request, params }) {
    const data = request.only(['name', 'description'])
    const modelName = 'Category'
    const id = params.id
    const includes = request.only([
      'products',
      'brandproducts'
    ])

    const query = await IndexBuilder.build({ modelName, id, data, includes })

    return query
  }

  async store ({ request, response }) {
    const data = request.only(['name', 'description'])

    // validate all fields
    const fields = [
      { name: Yup.string().strict().required() },
      { description: Yup.string().strict().required() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // check if already exists
    const checkIfExists = await Category.findBy('name', data.name)
    if (checkIfExists) {
      return response.status(409).json({
        success: false,
        fields: ['name'],
        message: 'Already exists'
      })
    }

    // create and return
    const category = await Category.create(data)

    return category
  }

  async update ({ request, response, params }) {
    const data = request.only(['name', 'description'])

    // get by id
    const id = params.id
    const category = await Category.findBy('id', id)

    // check if the resource exist
    if (!category) {
      return category
    }

    // validate all fields
    const fields = [
      { name: Yup.string().strict() },
      { description: Yup.string().strict() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // check if already exists
    if (data.name) {
      const checkIfExists = await Category.findBy('name', data.name)
      if (checkIfExists) {
        return response.status(409).json({
          success: false,
          fields: ['name'],
          message: 'Already exists'
        })
      }
    }

    // update and return
    if (data.name) {
      category.name = data.name
    }
    if (data.description) {
      category.description = data.description
    }

    category.save()

    return category
  }
}

module.exports = CategoryController
