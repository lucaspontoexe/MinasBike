import Sequelize, { Model } from 'sequelize';

class Provider extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        contact_name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Location, { foreignKey: 'id_location' });
  }
}

export default Provider;
