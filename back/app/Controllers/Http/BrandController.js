'use strict'

const Yup = require('yup')
const FieldsValidator = use('App/Lib/FieldsValidator')
const Brand = use('App/Models/Brand')

class BrandController {
  async index ({ request, params }) {
    // get by id
    const id = params.id
    if (id) {
      const brand = await Brand.findBy('id', id)
      return brand
    }

    // get by field value or getAll if no params
    const data = request.only(['name'])

    const brands = await Brand.query().where(data).fetch()

    return brands
  }

  async store ({ request, response }) {
    const data = request.only(['name'])

    // validate all fields
    const fields = [
      { name: Yup.string().strict().required() }
    ]
    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // check if already exists
    const checkIfExists = await Brand.findBy('name', data.name)
    if (checkIfExists) {
      return response.status(409).json({
        success: false,
        fields: ['name'],
        message: 'Already exists'
      })
    }

    // create and return
    const brand = await Brand.create(data)
    return brand
  }

  async update ({ request, response, params }) {
    const data = request.only(['name'])

    // get by id
    const id = params.id
    const brand = await Brand.findBy('id', id)

    // check if the resource exist
    if (!brand) {
      return brand
    }

    // validate all fields
    const fields = [
      { name: Yup.string().strict().required() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // check if already exists
    if (data.name) {
      const checkIfExists = await Brand.findBy('name', data.name)
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
      brand.name = data.name
    }

    brand.save()

    return brand
  }
}

module.exports = BrandController
