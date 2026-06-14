'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	class user extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.user.hasMany(models.question, {
				foreignKey: 'createdBy',
				target: 'username',
			});
			models.user.hasMany(models.answer, {
				foreignKey: {
					name: 'createdBy',
				},
			});
		}

		validPassword(passwordTyped) {
			return bcrypt.compareSync(passwordTyped, this.password);
		}

		toJSON() {
			let userData = this.get();
			delete userData.password;
			return userData;
		}
  }

	user.init(
		{
			username: {
				type: DataTypes.STRING(25),
				allowNull: false,
				unique: true,
				validate: {
					len: {
						args: [5, 25],
						msg:
							'Username must be between 5 and 25 characters',
					},
					min: {
						args: 5,
						msg: 'Username must be at least 5 characters',
					},
					max: {
						args: 25,
						msg: "Username can't be more than 25 characters.",
					},
					isAlphanumeric: true,
					notEmpty: true,
					notNull: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: {
						args: [8, 99],
						msg: 'Must be 8 to 99 characters.',
					},
					notContains: ' ',
					min: {
						args: 8,
						msg: 'Must contain at least 8 characters.',
					},
					max: {
						args: 99,
						msg: 'Must contain at least 99 characters.',
					},
					notEmpty: true,
					notNull: true,
				},
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isAlpha: true,
					notNull: true,
					notEmpty: true,
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isAlpha: true,
					notNull: true,
					notEmpty: true,
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notNull: true,
					notEmpty: true,
					isEmail: true,
				},
			},
			title: {
				type: DataTypes.STRING(25),
				allowNull: true,
				validate: {
					max: {
						args: 25,
						msg: 'Can only be between 0 and 25 characters.',
					},
				},
			},
			quote: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					max: {
						args: 255,
						msg: 'Can only be 255 characters long.',
					},
					isAlphanumeric: true,
				},
			},
			jobTitle: {
				type: DataTypes.STRING(25),
				allowNull: true,
				validate: {
					max: {
						args: 25,
						msg: 'Can only be 25 characters long.',
					},
					isAlpha: true,
				},
			},
			bio: {
				type: DataTypes.STRING(500),
				allowNull: true,
				validate: {
					max: {
						args: 500,
						msg: 'Can only be 500 characters long.',
					},
				},
			},
			profilePicture: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			rating: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			points: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'user',
		}
	);

	user.beforeCreate((pendingUser, options) => {
		// if a user exists and if user has a password.
		if (pendingUser && pendingUser.password) {
			// hash password
			let hash = bcrypt.hashSync(pendingUser.password, 12);
			// store hash as password
			pendingUser.password = hash;
		}
  });

	return user;
};
