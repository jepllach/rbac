var models = require("../models/index");
const {Sequelize } = require("sequelize");
exports.buscarAsignacionesPrivilegios = async (req, res) => {
    const roleId = req.params.roleId;
    const asignaciones = await models.roles.findAll({
        where: {
            id: roleId
        },
        include: [{
            model: models.privilegios,
        }],
        nest: true,
        raw: true
    });
   
    const privilegios = await models.privilegios.findAll({
        raw: true
    });
    
    for(i = 0; i < privilegios.length; i++){
        if(asignaciones.length === 0) {
            privilegios[i].asignado = false;
        }
        for(j = 0 ; j < asignaciones.length ; j++){
           
            if (privilegios[i].id === asignaciones[j].privilegios.id) {
                privilegios[i].asignado = true;
                break;
            }else{
                privilegios[i].asignado = false;
            }
        }
    }
    
    res.json(privilegios);
}
exports.guardar = async (req, res) => {
    const data = req.body;
    try{
        await models.asignaciones_privilegios.destroy({
            where: {
                roleId: data.roleId
            }
        });
        for(i = 0 ; i < data.privilegiosId.length; i++){
            await models.asignaciones_privilegios.create({
                roleId: data.roleId,
                privilegioId: data.privilegiosId[i],
                status : true
            });
        }
        
        res.json({status: 1});
    }catch(error){
        res.status(401).json({status: 0, msg: 'Hubo un error durante la operación', error});
    }
}
exports.getMenu = async (req,res) => {
    const arrRoles = req.body.arrRoles;
    try{
        const asignaciones = await models.privilegios.findAll({
            attributes: [ Sequelize.literal('DISTINCT ON("privilegios"."id") 1'), '*' ],
            as: 'privilegios',
            include: [
                {
                    model: models.roles,
                    where: {
                        id: arrRoles
                    },
                }
            ],
            nest:true,
            raw: true
        });
     
        arrMenu = Array();
       
        for(var i = 0; i < asignaciones.length; i++){
            if(!Array.isArray(arrMenu[asignaciones[i].categoriaId])){
                arrMenu[asignaciones[i].categoriaId] = Array();
            }
            const categoria = await models.categorias.findOne({
                where: { id: asignaciones[i].categoriaId},
                raw: true
            });
            arrMenu[asignaciones[i].categoriaId].push( {
                categoria: categoria.categoria,
                privilegio: asignaciones[i].privilegio,
                path: asignaciones[i].path
            });

                      
        }
        arrMenuTemp = arrMenu.filter(function(val){return val});
        res.json({status: 1, arrMenu:arrMenuTemp});

    }catch(error){
        res.status(401).json({status: 0, msg: 'Hubo un error durante la operación', error});
    }
}