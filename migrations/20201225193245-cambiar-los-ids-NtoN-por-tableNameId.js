'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.renameColumn('users_roles','id_rol','roleId');
    queryInterface.renameColumn('users_roles','id_user','userId');
    queryInterface.renameColumn('roles_privilegios','id_rol','roleId');
    queryInterface.renameColumn('roles_privilegios','id_privilegio','privilegioId');
    queryInterface.renameColumn('precios_productos','id_producto','productoId');
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
