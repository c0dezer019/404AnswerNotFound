'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class answer extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.answer.belongsTo(models.user, {
				foreignKey: 'createdBy',
				target: 'username',
			});
		}
	}
	answer.init(
		{
			createdBy: DataTypes.INTEGER,
			lastModifiedBy: DataTypes.INTEGER,
			lastModifiedDate: DataTypes.DATE,
			content: DataTypes.TEXT,
			upVotes: DataTypes.INTEGER,
			downVotes: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'answer',
		}
	);
	return answer;
};
