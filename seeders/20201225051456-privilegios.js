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
    await queryInterface.bulkInsert('privilegios', [
      {
        categoriaId: 1,
        privilegio: 'Roles',
        path: 'roles',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoriaId: 1,
        privilegio: 'Categorias',
        path: 'categorias',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoriaId: 1,
        privilegio: 'Privilegios',
        path: 'privilegios',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoriaId: 1,
        privilegio: 'Rutas',
        path: 'rutas',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoriaId: 2,  
        privilegio: 'Producto',
        path: 'productos',
        status:  true,
        createdAt: new Date(),
        updatedAt: new Date()
       },
      {
        categoriaId: 2,
        privilegio: 'Personas',
        path: 'usuarios',
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
