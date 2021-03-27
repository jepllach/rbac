const express = require('express');
const productosRoutes = express();
const productosController = require('./../controller/productosController');
const verificarToken = require('./../middleware/verificarToken');

productosRoutes.get('/productos',verificarToken,productosController.productos);
productosRoutes.post('/guardarProducto',verificarToken,productosController.guardar);
productosRoutes.delete('/eliminarProducto/:id',verificarToken,productosController.eliminar);
productosRoutes.get('/buscarProducto/:id',verificarToken,productosController.buscarProducto);
productosRoutes.put('/actualizarProducto/:id',verificarToken,productosController.actualizar);
module.exports = productosRoutes