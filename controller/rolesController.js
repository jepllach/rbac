
var models = require('../models/index');

exports.roles = async (req,res) => {
    const roles = await models.roles.findAll({
        raw:true,
    });
    res.json(roles);
}
exports.guardar = async (req,res) => {
    const data = req.body;
    try{
        const rol = await models.roles.findOne({
            where: {
                rol: data.rol
            }
        });
        if (rol){
            res.json({status: 0, msg: 'El rol que intenta guardar ya se encuentra registrado.'});
        }else{
            await models.roles.create({
                rol: data.rol,
                status: data.status
            });
            res.json({status:1});
        }
    }catch(error){
        res.status(401).json({status:0, msg: 'Hubo un error durante la operación.'});
    }
}
exports.buscarRol = async (req,res) => {
    try{
        const id = req.params.id;
        const rol = await models.roles.findOne({
            where: {
                id: id
            },
            raw: true
        });
        res.json({status: 1, rol});
    }catch(error){
        res.status(401).json({status:0, msg: 'Hubo un error durante la operación.'})
    }
}
exports.actualizar = async (req,res) => {
    try{
        const id = req.params.id;
        const data = req.body
        const rol = await models.roles.findOne({
            where: {
                id: id
            }
        });
        rol.update({
            rol: data.rol,
            status: data.status
        });
        res.json({status: 1});
    }catch(error){
        res.status(401).json({status: 0, msg: 'Hubo un error durante la operación'});
    }
}
exports.eliminar = async (req,res) => {
    try{

        const id = req.params.id;
        const rol = await models.roles.findOne({
            where: {
                id: id
            }
        });
        await rol.destroy();
        res.json({status: 1});
    }catch(error){
        res.status(401).json({status: 0, msg: 'Hubo un error durante la operación.'})
    }

}