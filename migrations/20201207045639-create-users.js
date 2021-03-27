'use strict';
var bcrypt = require("bcrypt")
var bcrypt_salt_rounds =10
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let contrasenaTemp = await bcrypt.hashSync("123456",bcrypt_salt_rounds)
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      apellidos: {
        type: Sequelize.STRING
      },
      nombres: {
        type: Sequelize.STRING
      },
      telf: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      contrasena: {
        type: Sequelize.STRING,
        defaultValue:contrasenaTemp
      },
      status:{
        type:Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('users');
  }
};