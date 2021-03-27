'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /*
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsToMany(models.users,{through: 'users_roles'});
      this.belongsToMany(models.users, {through: models.users_roles})
      models.roles.belongsToMany(models.privilegios, {through: models.asignaciones_privilegios});
       
    }
    
  };
  roles.init({
    rol: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};