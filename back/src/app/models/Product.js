import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        brand: Sequelize.STRING,
        price: Sequelize.INTEGER,
        price_cost: Sequelize.INTEGER,
        code: Sequelize.BIGINT,
        quantity_per_unity: Sequelize.INTEGER,
        unity: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Provider, { foreignKey: 'id_provider' });
    this.belongsTo(models.Category, { foreignKey: 'id_category' });
  }
}

export default Product;
