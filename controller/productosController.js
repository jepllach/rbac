
var models = require('./../models/index');
exports.guardar = async (req, res) => {
    const data = req.body;
    try{
        await models.productos.create({
            producto: data.producto,
            descripcion: data.descripcion,
            cant: data.cant,
        });
        const producto = await models.productos.findOne({
            order: [["createdAt", "DESC"]],
            raw: true,
        });
        models.precios_productos.create({
            productoId: producto.id,
            precio: data.precio
        });
        res.json({status:1});
    }catch(error){
        res.json({status: 0});
    }
}
exports.actualizar = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try{
        let producto = await models.productos.findOne({
            where: {
                id: id
            }
        });
        await producto.update({
            producto: data.producto,
            descripcion: data.descripcion,
            cant: data.cant,
        });
        await models.precios_productos.create({
            productoId: id,
            precio: data.precio
        });
        res.json({status: 1});
        

        
    }catch(error){
        res.json({status:0});
    }
}
exports.productos = async (req,res) => {
    
    let productos = await models.productos.findAll({
        order: [["producto","ASC"]],
        raw: true
    });
    for(i = 0; i < productos.length; i++ ) {
        let precio = await models.precios_productos.findOne({
            where: {
                productoId: productos[i].id
            },
            order: [["createdAt","DESC"]]
            });
            if (precio){
                productos[i].precio = precio.precio;
            }else{
                productos[i].precio = 0;
            }
    }
    
    res.json(productos);
}
exports.buscarProducto = async (req, res) => {
    const id = req.params.id;
    try{
        let producto = await models.productos.findOne({
            where: {
                id:id
            },
            raw: true,
            nest: true
        });
        const precio = await models.precios_productos.findOne({
            where: {
                productoId:id
            },
            order: [['createdAt','DESC']],
            raw: true,
            nest: true
        });
        
        producto.precio = precio.precio;
        res.json({status: 1, producto});
    }catch(error){
        res.json({status:0});
    }   
}
exports.eliminar = async (req, res) => {
    
    const id = req.params.id;
    try{
        const producto = await models.productos.findOne({
            where: {
                id:id
            }
        })
        await producto.destroy();
        res.json({status:1});
    }catch(error){
        
        res.json({status:0});
    }
}