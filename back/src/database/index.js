import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Category from '../app/models/Category';
import Location from '../app/models/Location';
import Product from '../app/models/Product';
import Provider from '../app/models/Provider';
import Stock from '../app/models/Stock';

const models = [User, Category, Location, Product, Provider, Stock];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
