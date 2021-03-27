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
   await queryInterface.bulkInsert('asignaciones_privilegios', [
    {
      roleId: 1,
      privilegioId: 1,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date() 
     
    },
    {
      roleId: 1,
      privilegioId: 2,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date() 
     
    },
    {
      roleId: 1,
      privilegioId: 3,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date() 
     
    }
    ,
    {
      roleId: 2,
      privilegioId: 4,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date() 
     
    }
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
