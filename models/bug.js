'use strict';
const {
  Model, DatabaseError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bug extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  bug.init({
    error: DataTypes.TEXT,
    location: DataTypes.STRING,
    activity: DataTypes.STRING,
    user: DataTypes.STRING,
    line: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bug',
  });
  return bug;
};