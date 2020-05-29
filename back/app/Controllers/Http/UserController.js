'use strict'

const Yup = require('yup')
const FieldsValidator = use('App/Lib/FieldsValidator')
const User = use('App/Models/User')
const Usertype = use('App/Models/Usertype')
const IndexBuilder = use('App/Lib/IndexBuilder')

class UserController {
  async index ({ request, params, auth }) {
    const data = request.only([
      'active',
      'name',
      'login',
      'email',
      'usertype_id'
    ])
    const modelName = 'User'
    const id = params.id
    let includes = request.only([
      'usertype'
    ])

    // check logged user
    const loggedUser = await auth.getUser()
    // check if it is an admin
    // eslint-disable-next-line eqeqeq
    if (loggedUser.usertype_id == 1) {
      includes = request.only([
        'stocks',
        'usertype'
      ])
    }

    // check if it is the correct user
    if (id) {
      // eslint-disable-next-line eqeqeq
      if (loggedUser.usertype_id == 1) {
        includes = request.only([
          'stocks',
          'usertype'
        ])
      } else {
        // eslint-disable-next-line eqeqeq
        if (!(id == loggedUser.id)) {
          includes = request.only([
            'stocks',
            'usertype'
          ])
        }
      }
    }

    const query = await IndexBuilder.build({ modelName, id, data, includes })

    return query
  }

  async store ({ request, response }) {
    const data = request.only([
      'active',
      'name',
      'login',
      'email',
      'password',
      'usertype_id'
    ])
    data.usertype_id = 1
    data.active = 1

    // validate all fields
    const fields = [
      { active: Yup.boolean().required() },
      { name: Yup.string().strict().required() },
      { login: Yup.string().strict().required() },
      { email: Yup.string().strict().required() },
      { password: Yup.string().strict().required() },
      { usertype_id: Yup.number().required() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // check if already exists
    const checkIfLoginExists = await User.findBy('login', data.login)
    if (checkIfLoginExists) {
      return response.status(409).json({
        success: false,
        fields: ['login'],
        message: 'Already exists'
      })
    }
    const checkIfEmailExists = await User.findBy('email', data.email)
    if (checkIfEmailExists) {
      return response.status(409).json({
        success: false,
        fields: ['email'],
        message: 'Already exists'
      })
    }

    const checkIfUsertypeExists = await Usertype.findBy('id', data.usertype_id)
    if (!checkIfUsertypeExists) {
      return response.status(409).json({
        success: false,
        fields: ['usertype_id'],
        message: 'does not exists'
      })
    }

    // create and return
    const user = await User.create(data)
    return user
  }

  async update ({ request, response, auth, params }) {
    const data = request.only([
      'name',
      'login',
      'password',
      'old_password'
    ])

    // get by id
    const id = params.id
    const user = await User.findBy('id', id)

    // check if the resource exist
    if (!user) {
      return user
    }

    // check if logged user is the params user
    const loggedUser = await auth.getUser()
    try {
      // eslint-disable-next-line eqeqeq
      if (!(id == loggedUser.id)) {
        return response.status(401)
      }
    } catch (error) {
      return response.status(401)
    }

    // validate all fields
    const fields = [
      { name: Yup.string().strict() },
      { login: Yup.string().strict() },
      { password: Yup.string().strict() },
      { old_password: Yup.string().strict() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // check if already exists
    if (data.login) {
      const checkIfLoginExists = await User.findBy('login', data.login)
      if (checkIfLoginExists) {
        return response.status(409).json({
          success: false,
          fields: ['login'],
          message: 'Already exists'
        })
      }
    }

    // check old password
    if (data.password) {
      await auth.attempt(user.email, data.old_password)
    }

    // update and return
    if (data.login) {
      user.login = data.login
    }
    if (data.password) {
      user.password = data.password
    }
    if (data.name) {
      user.name = data.name
    }

    user.save()

    return user
  }
}

module.exports = UserController
