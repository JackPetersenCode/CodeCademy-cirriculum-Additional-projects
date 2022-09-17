'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Business.init({
    name: DataTypes.STRING,
    stars: DataTypes.INTEGER,
    picture: DataTypes.STRING,
    hours: DataTypes.STRING,
    phone: DataTypes.STRING,
    website: DataTypes.STRING,
    reviews: DataTypes.STRING,
    menu: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'Businesses',
    modelName: 'Business',
  });
  return Business;
};