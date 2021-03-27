'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     this.belongsTo(models.users);
     this.belongsTo(models.roles);
    }
  };
  users_roles.init({
    userId: DataTypes.BIGINT,
    roleId: DataTypes.BIGINT,
    status:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'users_roles',
  });
  return users_roles;
};