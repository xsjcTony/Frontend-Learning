'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Tony',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lily',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Aelita',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null)
  }
};
