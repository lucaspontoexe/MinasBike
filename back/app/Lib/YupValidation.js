'use strict'

const Yup = require('yup')

class Batata {
  async validate ({ fields, data }) {
    let failCount = 0
    const failedFields = []
    for (const field of fields) {
      const schema = Yup.object().shape(field)
      const validationResponse = await schema.isValid(data)
      if (!validationResponse) {
        failCount += 1
        failedFields.push(Object.keys(field))
      }
    }
    if (failCount > 0) {
      return {
        success: false,
        fields: failedFields,
        error: `Invalid:Fields:${failedFields}`
      }
    } else {
      return { success: true }
    }
  }
}

module.exports = new Batata()
