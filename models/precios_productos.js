'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class precios_productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
    }
  };
  precios_productos.init({
    precio: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'precios_productos',
  });
  return precios_productos;
};