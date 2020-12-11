'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      createdBy: {
        type: Sequelize.STRING
      },
      lastModifiedBy: {
        type: Sequelize.STRING
      },
      lastModifiedDate: {
        type: Sequelize.DATE
      },
      summary: {
        type: Sequelize.STRING
      },
      details: {
        type: Sequelize.TEXT
      },
      upVotes: {
        type: Sequelize.INTEGER
      },
      downVotes: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('questions');
  }
};