'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Caption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, photo }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
      this.belongsTo(photo, { foreignKey: 'photoId' })
    }
  }
  Caption.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'captions',
    modelName: 'Caption',
  });
  return Caption;
};