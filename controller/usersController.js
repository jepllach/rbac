require('dotenv').config();

const jwt = require('jsonwebtoken')
var models = require('../models/index');
const { Op,Sequelize } = require("sequelize");
var bcrypt = require('bcrypt');
var bcrypt_salt_rounds = 10;
exports.getAllUsers = async (req, res) => {
    let results = await models.users.findAll();
    res.json(results)
}
exports.checkUser = async (req, res) => {
    var data = req.body;
    let user = await models.users.findOne({
        where: {
            email: data.email,
        }
    });
    if(user){
        let coincidencia = await bcrypt.compare(data.contrasena, user.contrasena);
        if(!coincidencia){
            res.json({status: 0, msg: 'Usuario y/o contraseña errados'});
        }else{
            id_user = user.id;
            user = await models.users.findOne({
                where: {
                    id: id_user
                },
            });
            roles = await user.getRoles({raw:true, nest: true});
            user = user.get({plain: true});
            user.roles = roles;

            
            const token = jwt.sign(user,process.env.LLAVE_SECRETA, {expiresIn: 60*60*24});
            res.json({status:1, user, token});
        }
    }else{
        res.json({status:0,msg:'Usuario y/o contraseña errados'});
    }
    
}

exports.findUser = async (req, res) => {
    let id = req.params.id;
    let user = await models.users.findOne({
        where:{
            id: id
        }
    });
    let roles = await user.getRoles({nest: true, raw: true});
    if(!user){
        res.json({status: 0, msg: 'no existe el registro.'});
    }else{
        user = user.get({plain: true});
        user.roles = roles;
        res.json(user);
    }
    
}
exports.createUser = async (req, res) => {
    let data = req.body
    data.contrasena = await bcrypt.hashSync('123456', bcrypt_salt_rounds);
    let result = await models.users.findOne({where: {email: data.email}});
    if(!result){
        await models.users.create({
            apellidos: data.apellidos,
            nombres: data.nombres,
            telf: data.telf,
            email: data.email,
            contrasena: data.contrasena,
            status: data.status
        });
        const user = await models.users.findOne({
            where: {
                email: data.email
            },
            raw: true,
            nest: true
        });
        data.rolId.forEach(async (rolId) => {
            await models.users_roles.create({
                userId: user.id,
                roleId: rolId
            });
        });
        
        res.json({status: 1});
    }else{
        res.json({status: 0,msg: 'El e-mail ya se encuentra registrado.'});
    }
}
exports.updateUser = async (req, res) => {
    let id = req.params.id;
    let data = req.body;
    let result = await models.users.findOne({
        where: {
            email: data.email,
            [Op.not]: [{
                id: id
            }]
        }
    });
    if(result){
        res.json({status: 0, msg: 'Error, el e-mail está siendo utilizado por otro usuario'});
    }else{
        let user = await models.users.findByPk(id);
        user.update({
            apellidos: data.apellidos,
            nombres: data.nombres,
            telf: data.telf,
            email: data.email,
            status: data.status
        });
        await models.users_roles.destroy({
            where : {
                userId:id
            }
        })
        data.rolId.forEach(async (rolId) => {
            await models.users_roles.create({
                userId: id,
                roleId: rolId
            });
        });
        res.json({status: 1});
    }
    
}
exports.deleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        await models.users_roles.destroy({
            where:{
                userId: id
            }
        });
        await models.users.destroy({
            where: { id: id}
        });
        res.json({status: 1});
    }catch(error){
        res.json({status: 0, msg: 'Hubo un error durante la operación.', error: error});
    }
}

exports.actualizarStatus = async (req,res) => {
    try{
        const id = req.params.id;
        const user = await models.users.findByPk(id);
        let nuevoStatus = true
        if (user.status === true) {
            nuevoStatus = false
        }else{
            nuevoStatus = true;
        }
        await user.update({
            status: nuevoStatus
        });
        res.json({status: 1});
    }catch(error){
        res.json({status: 0, msg: 'Hubo un error durante la operación.', error});
    }
}
exports.checkPath = async (req, res) => {
    
    res.json({status: 1, check: true});
}
exports.getRoleId = async (req, res) => {
    const token = req.body.token;
    try{
        jwt.verify(token,process.env.LLAVE_SECRETA, async (error,decode) => {
            const roles = decode.roles;             
            let arrRoles = [];
            for(i=0;i<roles.length;i++){
                arrRoles.push(roles[i].id);
            }
            
            res.json({status: 1, arrRoles});
            
        });
    }catch{

    }
    
}
