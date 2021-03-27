const express = require('express')
const userRoutes = express()
const usersControler = require('../controller/usersController');
const verificarToken  = require('./../middleware/verificarToken');
userRoutes.get('/getAllUsers',verificarToken,usersControler.getAllUsers);
userRoutes.get('/findUser/:id',verificarToken,usersControler.findUser);
userRoutes.get('/actualizarStatusUser/:id',verificarToken,usersControler.actualizarStatus);
userRoutes.post('/getRoleId',verificarToken, usersControler.getRoleId);
userRoutes.post('/checkPath',verificarToken,usersControler.checkPath);
userRoutes.post('/checkUser',usersControler.checkUser);
userRoutes.post('/createUser',verificarToken,usersControler.createUser);
userRoutes.put('/updateUser/:id',verificarToken,usersControler.updateUser);
userRoutes.delete('/deleteUser/:id',verificarToken,usersControler.deleteUser);

module.exports = userRoutes;