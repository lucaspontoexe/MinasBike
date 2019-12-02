import Sequelize, { Model } from 'sequelize';

class Location extends Model {
  static init(sequelize) {
    super.init(
      {
        city: Sequelize.STRING,
        state: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Location;
