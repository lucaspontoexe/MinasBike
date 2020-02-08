/* eslint-disable no-unused-vars */
/* eslint-disable no-eval */
'use strict'
const Brand = use('App/Models/Brand')
const Brandproduct = use('App/Models/Brandproduct')
const Category = use('App/Models/Category')
const Location = use('App/Models/Location')
const Product = use('App/Models/Product')
const Provider = use('App/Models/Provider')
const Providerproduct = use('App/Models/Providerproduct')
const Stock = use('App/Models/Stock')
const Unity = use('App/Models/Unity')
const User = use('App/Models/User')
const Usertype = use('App/Models/Usertype')
const Receivement = use('App/Models/Receivement')
const Receivedproviderproduct = use('App/Models/Receivedproviderproduct')
const Client = use('App/Models/Client')
const Serviceorder = use('App/Models/Serviceorder')
const Serviceorderproduct = use('App/Models/Serviceorderproduct')

class IndexBuilder {
  async build ({ modelName, id, data, includes }) {
    let query = eval(modelName).query()
    if (id) {
      query = query.where('id', id)
    }

    for (const modelToInclude of Object.keys(includes)) {
      query = query.with(modelToInclude)
    }

    query = query.where(data)

    return query.fetch()
  }
}

module.exports = new IndexBuilder()
