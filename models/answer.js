'use strict';
const {
	Model
} = require('sequelize');
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
	answer.init({
		createdBy: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastModifiedBy: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastModifiedDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				notNull: true,
				notEmpty: true,
			}
		},
		upVotes: DataTypes.INTEGER,
		downVotes: DataTypes.INTEGER,
	 	qid: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	}, {
		sequelize,
		modelName: 'answer',
	});
	return answer;
};