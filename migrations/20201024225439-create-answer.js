'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      upVotes: {
        type: Sequelize.INTEGER
      },
      downVotes: {
        type: Sequelize.INTEGER
      },
      qid: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable('answers');
  }
};