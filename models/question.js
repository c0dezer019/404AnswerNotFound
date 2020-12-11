'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class question extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.question.belongsTo(models.user, {
				foreignKey: 'createdBy',
				target: 'username',
			});
			models.question.hasMany(models.answer, {
				foreignKey: 'QID',
			});
		}
	}
	question.init(
		{
			category: {
				type: DataTypes.STRING,
			},
			createdBy: {
				type: DataTypes.STRING,
			},
			lastModifiedBy: {
				type: DataTypes.STRING,
			},
			lastModifiedDate: {
				type: DataTypes.DATE,
			},
			summary: {
				type: DataTypes.STRING,
				validate: {
					len: {
						args: [100 - 255],
						msg: 'Must be between 100 to 255 characters',
					},
					min: {
						args: 100,
						msg: 'Must be at least 100 characters long to ensure quality control.',
					},
					max: {
						args: 255,
						msg: 'Must be 255 characters or less.',
					},
				},
			},
			details: {
				type: DataTypes.TEXT,
				validation: {
					min: {
						args: 300,
						msg: 'Details need to be at least 300 characters.',
					},
					
				}
			},
			upVotes: DataTypes.INTEGER,
			downVotes: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'question',
		}
	);
	return question;
};
