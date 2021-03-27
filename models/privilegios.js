'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class privilegios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
      models.privilegios.belongsToMany(models.roles, {through: models.asignaciones_privilegios} );
     
    }
  };
  privilegios.init({
    categoriaId: DataTypes.BIGINT,
    privilegio: DataTypes.STRING,
    path: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'privilegios',
  });
  return privilegios;
};