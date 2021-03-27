
var models = require('../models/index');

const errorIntento = 'Hubo un error durante la operación';
exports.categorias = async (req,res) => {
    try{
        const categorias = await models.categorias.findAll({
            raw: true
        });
        res.json(categorias);
    }catch(error){
        res.status(401).json({status: 0, msg: errorIntento, error:error});
    }
}
exports.guardar = async (req,res) => {
    const data = req.body;
    console.log('en el server');
    try{
        const categoria = await models.categorias.findOne({
            where: {
                categoria: data.categoria
            }
        });
        if (categoria){
            res.json({status: 0, msg: 'La categiría que intenta guardar ya se encuentra registrado.'});
        }else{
            await models.categorias.create({
                categoria: data.categoria,
                status: data.status
            });
            res.json({status:1});
        }
    }catch(error){
        res.status(401).json({status:0, msg: 'Hubo un error durante la operación.',error});
    }
}
exports.buscarCategoria = async (req,res) => {
    try{
        const id = req.params.id;
        const categoria = await models.categorias.findOne({
            where: {
                id: id
            },
            raw: true
        });
        res.json({status: 1, categoria});
    }catch(error){
        res.status(401).json({status:0, msg: 'Hubo un error durante la operación.'})
    }
}
exports.actualizar = async (req,res) => {
    try{
        const id = req.params.id;
        const data = req.body
        const categoria = await models.categorias.findOne({
            where: {
                id: id
            }
        });
        categoria.update({
            categoria: data.categoria,
            status: data.status
        });
        res.json({status: 1});
    }catch(error){
        res.status(401).json({status: 0, msg: 'Hubo un error durante la operación',error});
    }
}
exports.eliminar = async (req,res) => {
    try{

        const id = req.params.id;
        const categoria = await models.categorias.findOne({
            where: {
                id: id
            }
        });
        await categoria.destroy();
        res.json({status: 1});
    }catch(error){
        res.status(401).json({status: 0, msg: 'Hubo un error durante la operación.'})
    }

}