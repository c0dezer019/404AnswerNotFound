'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    title: DataTypes.STRING,
    quote: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    bio: DataTypes.STRING,
    rating: DataTypes.STRING,
    points: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};