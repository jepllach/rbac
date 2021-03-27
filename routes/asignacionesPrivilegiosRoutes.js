const express = require("express");
const verificarToken = require("../middleware/verificarToken");
const asignacionesPrivilegiosController = require("../controller/asignacionPrivilegiosController");
const asignacionesPrivilegiosRoutes = express();

asignacionesPrivilegiosRoutes.get("/buscarAsignacionesPrivilegios/:roleId" , verificarToken, asignacionesPrivilegiosController.buscarAsignacionesPrivilegios);
asignacionesPrivilegiosRoutes.post("/guardarAsignacionesPrivilegios", verificarToken, asignacionesPrivilegiosController.guardar);
asignacionesPrivilegiosRoutes.post("/getMenu",verificarToken,asignacionesPrivilegiosController.getMenu);
module.exports = asignacionesPrivilegiosRoutes;