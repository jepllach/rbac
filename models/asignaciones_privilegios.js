'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class asignaciones_privilegios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    
    }
  };
  asignaciones_privilegios.init({
    roleId: DataTypes.BIGINT,
    privilegioId: DataTypes.BIGINT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'asignaciones_privilegios',
  });
  return asignaciones_privilegios;
};