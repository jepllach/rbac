const express = require("express");

const router = express()
//RUTAS
const usersRoutes = require("./usersRoutes")
const productosRoutes = require("./productosRoutes")
const rolesRoutes = require('./rolesRoutes');
const privilegiosRoutes = require("./privilegiosRoutes");
const categoriasRoutes = require("./categoriasRoutes");
const asignacionesPrivilegiosRoutes = require("./asignacionesPrivilegiosRoutes");
//USES
router.use(usersRoutes)
router.use(productosRoutes)
router.use(rolesRoutes);
router.use(privilegiosRoutes);
router.use(categoriasRoutes);
router.use(asignacionesPrivilegiosRoutes);
module.exports = router;