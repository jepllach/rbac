'use strict';
var bcrypt = require("bcrypt")
var bcrypt_salt_rounds =10
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    let contrasenaTemp = await bcrypt.hashSync("123456",bcrypt_salt_rounds)
    await queryInterface.changeColumn('users', 'contrasena', {
      type: Sequelize.STRING,
      defaultValue: contrasenaTemp 
    })
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
