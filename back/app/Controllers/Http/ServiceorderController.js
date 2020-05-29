'use strict'

const Yup = require('yup')
const FieldsValidator = use('App/Lib/FieldsValidator')
const Serviceorder = use('App/Models/Serviceorder')
const Client = use('App/Models/Client')
const IndexBuilder = use('App/Lib/IndexBuilder')
const Brandproduct = use('App/Models/Brandproduct')
const Serviceorderproduct = use('App/Models/Serviceorderproduct')

class ServiceorderController {
  async index ({ request, params }) {
    const data = request.only([
      'description',
      'delivery_time',
      'total_value',
      'client_id'
    ])
    const modelName = 'Serviceorder'
    const id = params.id
    const includes = request.only([
      'client',
      'serviceorderproducts',
      'brandproducts'
    ])

    const query = await IndexBuilder.build({ modelName, id, data, includes })

    return query
  }

  async store ({ request, response }) {
    const data = request.only([
      'description',
      'delivery_time',
      'total_value',
      'client_id'
    ])

    // validate all fields
    let fields = [
      { description: Yup.string().strict().required() },
      { total_value: Yup.number().required() },
      { delivery_time: Yup.date().required() },
      { client_id: Yup.number().required() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // check if exists
    const checkIfClientExists = await Client.findBy('id', data.client_id)
    if (!checkIfClientExists) {
      return response.status(409).json({
        success: false,
        fields: ['client_id'],
        message: 'does not exists'
      })
    }

    // // check the stock and alter
    // AlterStock.check()

    // serviceorderproducts validation
    const serviceorderproductsData = request.only(['serviceorderproducts'])

    if (!serviceorderproductsData.serviceorderproducts) {
      return response.status(409).json({
        success: false,
        fields: ['serviceorderproducts'],
        message: 'Invalid field(s)'
      })
    }

    fields = [
      { brandproduct_id: Yup.number().required() },
      { brandproduct_qty: Yup.number().required() }
    ]

    for (const data of serviceorderproductsData.serviceorderproducts) {
      const serviceorderproductsValidation = await FieldsValidator.validate({
        fields,
        data,
        response
      })

      if (serviceorderproductsValidation !== true) {
        return serviceorderproductsValidation
      }
    }

    // check if brandproducts exists
    for (const serviceorderproduct of serviceorderproductsData.serviceorderproducts) {
      const checkIfBrandproductExists = await Brandproduct.findBy(
        'id',
        serviceorderproduct.brandproduct_id
      )

      if (!checkIfBrandproductExists) {
        return response.status(409).json({
          success: false,
          fields: ['brandproduct_id'],
          message: 'does not exists'
        })
      }
    }

    // create serviceorder
    const serviceorder = await Serviceorder.create(data)
    const dataToReturn = { serviceorder: 'teste', serviceorderproducts: [] }
    dataToReturn.serviceorder = serviceorder

    for (const serviceorderproduct of serviceorderproductsData.serviceorderproducts) {
      serviceorderproduct.serviceorder_id = serviceorder.id
      const createdServiceorderproduct = await Serviceorderproduct.create(serviceorderproduct)
      dataToReturn.serviceorderproducts.push(createdServiceorderproduct)
    }

    return dataToReturn
  }

  async update ({ request, response, params }) {
    const data = request.only([
      'description',
      'delivery_time'
    ])

    // get by id
    const id = params.id
    const serviceorder = await Serviceorder.findBy('id', id)

    // check if the resource exist
    if (!serviceorder) {
      return serviceorder
    }

    // validate all fields
    const fields = [
      { description: Yup.string().strict() },
      { delivery_time: Yup.date() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // update and return
    if (data.description) {
      serviceorder.description = data.description
    }
    if (data.delivery_time) {
      serviceorder.delivery_time = data.delivery_time
    }

    serviceorder.save()

    return serviceorder
  }
}

module.exports = ServiceorderController
