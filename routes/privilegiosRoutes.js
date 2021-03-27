const express = require('express');
const verificarToken = require('../middleware/verificarToken');
const privilegiosController = require('../controller/privilegiosController');
const privilegiosRoutes = express();

privilegiosRoutes.get('/privilegios',verificarToken,privilegiosController.privilegios);
privilegiosRoutes.post('/guardarPrivilegio',verificarToken,privilegiosController.guardar);
privilegiosRoutes.get('/buscarPrivilegio/:id',verificarToken,privilegiosController.buscarPrivilegio);
privilegiosRoutes.put('/actualizarPrivilegio/:id',verificarToken,privilegiosController.actualizar);
privilegiosRoutes.delete('/eliminarPrivilegio/:id',verificarToken,privilegiosController.eliminar);


module.exports = privilegiosRoutes;