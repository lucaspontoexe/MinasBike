'use strict'

const Yup = require('yup')
const FieldsValidator = use('App/Lib/YupValidation')
const Category = use('App/Models/Category')

class CategoryController {
  async index ({ request, response, params }) {
    // get by id
    const id = params.id
    try {
      if (id) {
        const category = await Category.findBy('id', id)
        return category
      }
    } catch (error) {
      return response.status(400).json({ error: 'This resource does not exist' })
    }
    // get by field value or getAll if no params
    const data = request.only(['name', 'description'])
    const categories = await Category.query().where(data).fetch()
    return categories
  }

  async store ({ request, response }) {
    const data = request.only(['name', 'description'])

    // validate all fields
    const fields = [
      { name: Yup.string().strict().required() },
      { description: Yup.string().strict().required() }
    ]

    const validation = await FieldsValidator.validate({ fields, data })

    if (!validation.success) {
      return response.status(400).json({ error: validation.error })
    }

    // check if already exists
    const checkIfExists = await Category.findBy('name', data.name)
    if (checkIfExists) {
      return response.status(409).json({
        error: 'Invalid:Fields:name',
        message: 'This resource already exists'
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
      return response.status(400).json({
        error: 'Invalid:Request',
        message: 'This resource does not exist'
      })
    }

    // validate all fields
    const fields = [
      { name: Yup.string().strict() },
      { description: Yup.string().strict() }
    ]

    const validation = await FieldsValidator.validate({ fields, data })

    if (!validation.success) {
      return response.status(400).json({ error: validation.error })
    }

    // check if already exists
    if (data.name) {
      const checkIfExists = await Category.findBy('name', data.name)
      if (checkIfExists) {
        return response.status(409).json({
          error: 'Invalid:Fields:name',
          message: 'This resource already exists'
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
