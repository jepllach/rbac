'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.precios_productos,{foreignKey:"productoId"})
      models.precios_productos.belongsTo(this)
    }
   
      
  };
  productos.init({
    producto: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    cant: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'productos',
  });
  
  return productos;
};