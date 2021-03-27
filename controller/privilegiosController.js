var models = require('../models/index');
const { Op } = require("sequelize");
const errorIntento = 'Hubo un error durante la operación';
exports.privilegios = async (req,res) => {
    try {
        const privilegiosTemp = await models.privilegios.findAll({
            raw: true
        });
        privilegios = Array();
        
        for(i=0;i<privilegiosTemp.length;i++){
            categoria = await models.categorias.findOne({
                where: {id: privilegiosTemp[i].categoriaId},
                raw: true
            });
            privilegiosTemp[i].categoria = categoria;
            

        }
        res.json(privilegiosTemp);
    }catch(error){
        res.status(401).json({status: 0, msg: errorIntento,error});
    }

}
exports.guardar = async (req,res) => {
    try{
        const data = req.body;
        const privilegio = await models.privilegios.findOne({
            where: {
                path: data.path
            }
        });
        if (privilegio) {
            res.json({status: 0, msg: 'El privilegio que intenta guardar ya se encuentra registrado.'})
        }else{
            await models.privilegios.create({
                categoriaId: data.categoriaId,
                privilegio: data.privilegio,
                path: data.path,
                status: data.status
            });
            res.json({status: 1});
        }
    }catch(error){
        res.status(401).json({status: 0, msg: errorIntento});
    }
}
exports.buscarPrivilegio = async (req,res) => {
    try{
        const id = req.params.id;
        const privilegio = await models.privilegios.findOne({
            where: {
                id: id
            },
            raw: true,
            nest: true
        });
        return res.json({status: 1, privilegio});
    }catch(error){
        res.status(401).json({status: 0, msg: errorIntento});
    }
}
exports.actualizar = async (req,res) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const privilegioTemp = await models.privilegios.findOne({
            where: {
                path: data.path,
                [Op.not]: [{
                    id: id
                }]
            }
        });
        if (privilegioTemp) {
            res.json({status: 0, msg: 'El path que intenta actualizar ya se encuentra en otro privilegio'});
        }else{
            const privilegio = await models.privilegios.findOne({
                where: {
                    id: id
                }
            });
            await privilegio.update({
                categoriaId: data.categoriaId,
                privilegio : data.privilegio,
                path: data.path,
                status: data.status
            });
            res.json({status: 1});
        }
    }catch(error){
        res.status(401).json({status: 0, msg: errorIntento});
    }
}
exports.eliminar = async (req,res) => {
    try{
        const id = req.params.id;
        const privilegio = await models.privilegios.findOne({
            where: {
                id: id
            }
        });
        await privilegio.destroy();
        res.json({status:1 });
    }catch(error){
        res.status(401).json({status: 0, msg: errorIntento});
    }
}