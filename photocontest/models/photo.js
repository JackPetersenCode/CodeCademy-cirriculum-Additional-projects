'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Caption }) {
      // define association here
      this.hasMany(Caption, { foreignKey: 'photoId', as: 'captions' })
    }
  }
  photo.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Photo must have a url source' },
        notEmpty: { msg: 'url must not be empty' }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Photo must have a name' },
        notEmpty: { msg: 'Name must not be empty' }
      }
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
  }, {
    sequelize,
    modelName: 'photo',
  });
  return photo;
};