'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('roles', 
    [
      {
        rol: 'Administrador',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        rol: 'Promotor',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        rol: 'Deliver',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('roles', null, {});
  }
};
