const express = require('express');
const rolesRoutes = express();
const rolesController = require('../controller/rolesController');
const verificarToken = require('../middleware/verificarToken');

rolesRoutes.get('/roles',verificarToken,rolesController.roles);
rolesRoutes.post('/guardarRol',verificarToken,rolesController.guardar);
rolesRoutes.get('/buscarRol/:id',verificarToken,rolesController.buscarRol);
rolesRoutes.put('/actualizarRol/:id',verificarToken,rolesController.actualizar);
rolesRoutes.delete('/eliminarRol/:id',verificarToken,rolesController.eliminar);
module.exports = rolesRoutes;
