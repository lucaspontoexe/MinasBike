'use strict'

const Yup = require('yup')
const FieldsValidator = use('App/Lib/FieldsValidator')
const User = use('App/Models/User')

class SessionController {
  async store ({ request, response, auth }) {
    const data = request.only(['login', 'email', 'password'])

    // validates all fields
    const fields = [
      { login: Yup.string().strict() },
      { email: Yup.string().strict() },
      { password: Yup.string().strict().required() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    if (data.login) {
      try {
        const user = await User.findBy('login', data.login)
        data.email = user.email
      } catch (error) {
        return response.status(409).json({
          success: false,
          fields: ['login'],
          message: 'does not exists'
        })
      }
    }

    if (!data.email) {
      return response.status(409).json({
        success: false,
        fields: ['email'],
        message: 'does not exists'
      })
    }

    const token = auth.attempt(data.email, data.password)

    return token
  }
}

module.exports = SessionController
