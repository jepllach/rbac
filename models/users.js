'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsToMany(models.roles,{through: 'users_roles'});
      this.belongsToMany(models.roles, {through: models.users_roles})

    }
    
  };
  
  users.init({
    apellidos: DataTypes.STRING,
    nombres: DataTypes.STRING,
    telf: DataTypes.STRING,
    email: DataTypes.STRING,
    contrasena: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};