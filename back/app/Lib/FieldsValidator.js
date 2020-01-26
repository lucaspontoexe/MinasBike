'use strict'

const Yup = require('yup')

class Validator {
  async validate ({ fields, data, response }) {
    let failCount = 0
    const failedFields = []
    for (const field of fields) {
      const schema = Yup.object().shape(field)
      const validationResponse = await schema.isValid(data)
      if (!validationResponse) {
        failCount += 1
        failedFields.push(Object.keys(field)[0])
      }
    }
    if (failCount > 0) {
      return response.status(409).json({
        success: false,
        fields: failedFields,
        message: 'Invalid field(s)'
      })
    }
    return true
  }
}

module.exports = new Validator()
