const express = require('express');
const verificarToken = require('../middleware/verificarToken');
const categoriasController = require('../controller/categoriasController');
const categoriasRoutes = express();

categoriasRoutes.get('/categorias',verificarToken,categoriasController.categorias);
categoriasRoutes.post('/guardarCategoria',verificarToken,categoriasController.guardar);
categoriasRoutes.get('/buscarCategoria/:id',verificarToken,categoriasController.buscarCategoria);
categoriasRoutes.put('/actualizarCategoria/:id',verificarToken,categoriasController.actualizar);
categoriasRoutes.delete('/eliminarCategoria/:id',verificarToken,categoriasController.eliminar);


module.exports = categoriasRoutes;