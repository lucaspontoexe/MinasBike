import Sequelize, { Model } from 'sequelize';

class Stock extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        contact_name: Sequelize.STRING,
        current_qty: Sequelize.INTEGER,
        minimum_qty: Sequelize.INTEGER,
        maximum_qty: Sequelize.INTEGER,
        restock: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: 'id_product' });
  }
}

export default Stock;
