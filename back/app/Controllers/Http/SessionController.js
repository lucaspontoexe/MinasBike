'use strict'

const Yup = require('yup')
const FieldsValidator = use('App/Lib/YupValidation')
const User = use('App/Models/User')

class SessionController {
  async store ({ request, response, auth }) {
    try {
      const data = request.only(['login', 'email', 'password'])

      // validates all fields
      const fields = [
        { login: Yup.string().strict() },
        { email: Yup.string().strict() },
        { password: Yup.string().strict().required() }
      ]

      const validation = await FieldsValidator.validate({ fields, data })

      if (!validation.success) {
        return response.status(400).json({ error: `Invalid:Fields:${validation.fields}` })
      }

      if (data.login) {
        try {
          const user = await User.findBy('login', data.login)
          data.email = user.email
        } catch (error) {
          return response.status(401).json({ error: 'Invalid:Fields:login' })
        }
      }
      const token = auth.attempt(data.email, data.password)

      return token
    } catch (error) {
      return response.status(400).json({ error: 'Invalid:Request' })
    }
  }
}

module.exports = SessionController
