'use strict'

const Yup = require('yup')
const FieldsValidator = use('App/Lib/FieldsValidator')
const Receivement = use('App/Models/Receivement')
const Receivedproviderproduct = use('App/Models/Receivedproviderproduct')
const Providerproduct = use('App/Models/Providerproduct')
const IndexBuilder = use('App/Lib/IndexBuilder')

class ReceivementController {
  async index ({ request, params }) {
    const data = request.only(['description', 'delivery_time', 'total_value'])
    const modelName = 'Receivement'
    const id = params.id
    const includes = request.only([
      'receivedproviderproducts',
      'providerproducts'
    ])

    const query = await IndexBuilder.build({ modelName, id, data, includes })

    return query
  }

  async store ({ request, response }) {
    const data = request.only(['description', 'delivery_time', 'total_value'])

    // validate all fields of receivement
    let fields = [
      { description: Yup.string().strict().required() },
      { total_value: Yup.number().required() },
      { delivery_time: Yup.date().required() }
    ]
    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // validate all fields of receivedproviderproduct
    const receivedproviderproductsData = request.only(['receivedproviderproducts'])

    if (!receivedproviderproductsData.receivedproviderproducts) {
      return response.status(409).json({
        success: false,
        fields: ['receivedproviderproducts'],
        message: 'Invalid field(s)'
      })
    }

    fields = [
      { providerproduct_id: Yup.number().required() },
      { providerproduct_qty: Yup.number().required() }
    ]

    for (const data of receivedproviderproductsData.receivedproviderproducts) {
      const receivedproviderproductsValidation = await FieldsValidator.validate({
        fields,
        data,
        response
      })

      if (receivedproviderproductsValidation !== true) {
        return receivedproviderproductsValidation
      }
    }

    // check if providerproducts exists
    for (const receivedproviderproduct of receivedproviderproductsData.receivedproviderproducts) {
      const checkIfProviderproductExists = await Providerproduct.findBy(
        'id',
        receivedproviderproduct.providerproduct_id
      )

      if (!checkIfProviderproductExists) {
        return response.status(409).json({
          success: false,
          fields: ['providerproduct_id'],
          message: 'does not exists'
        })
      }
    }

    // create receivement
    const receivement = await Receivement.create(data)
    const dataToReturn = { receivement: 'teste', receivedproviderproducts: [] }
    dataToReturn.receivement = receivement

    for (const receivedproviderproduct of receivedproviderproductsData.receivedproviderproducts) {
      receivedproviderproduct.receivement_id = receivement.id
      const createdrpp = await Receivedproviderproduct.create(receivedproviderproduct)
      dataToReturn.receivedproviderproducts.push(createdrpp)
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
    const receivement = await Receivement.findBy('id', id)

    // check if the resource exist
    if (!receivement) {
      return receivement
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
      receivement.description = data.description
    }
    if (data.delivery_time) {
      receivement.delivery_time = data.delivery_time
    }

    receivement.save()

    return receivement
  }
}

module.exports = ReceivementController
