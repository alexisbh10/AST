var Producto = require('../models/Producto');
var fs = require('fs');
var path = require('path');
//Funciones


function registrar (req,res){
    var data = req.body;
    if (req.files.imagen){
        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('/');
        var imagen_name = name [name.length-1];

        var producto = new Producto();
        producto.titulo = data.titulo;
        producto.descripcion = data.descripcion;
        producto.imagen = imagen_name;
        producto.precio_compra = data.precio_compra;
        producto.precio_venta = data.precio_venta;
        producto.stock = data.stock;
        producto.idcategoria = data.idcategoria;
        producto.puntos = data.puntos;

        producto.save((err,producto_save)=>{
            if (err){
                res.status(500).send({error: 'Error en el servidor'});
            } else {
                if (producto_save){
                    res.status(200).send({producto: producto_save});
                } else {
                    res.status (403).send({error: 'No se ha registrado el producto'})
                }
            }
        })
    } else {
        var imagen_path = __dirname + '/../uploads/productos/default.jpg';
        var name = imagen_path.split('/');
        var imagen_name = name [name.length-1];

        var producto = new Producto();
        producto.titulo = data.titulo;
        producto.descripcion = data.descripcion;
        producto.imagen = imagen_name;
        producto.precio_compra = data.precio_compra;
        producto.precio_venta = data.precio_venta;
        producto.stock = data.stock;
        producto.idcategoria = data.idcategoria;
        producto.puntos = data.puntos;

        producto.save((err,producto_save)=>{
            if (err){
                res.status(500).send({error: 'Error en el servidor'});
            } else {
                if (producto_save){
                    res.status(200).send({producto: producto_save});
                } else {
                    res.status (403).send({error: 'No se ha registrado el producto'})
                }
            }
        })
    }
};

function listar (req,res){
    var titulo = req.params['titulo'];

    Producto.find({titulo: new RegExp(titulo,'i')}).populate('idcategoria').exec((err, producto_listado)=>{
        if (err){
            res.status(500).send({error: 'Error en el servidor'});
        } else {
            if (producto_listado){
                res.status(200).send({productos: producto_listado});
            } else {
                res.status (403).send({error: 'No hay ningún registro con ese título'})
            }
        }
    });
}

function editar (req,res){
    var id = req.params ['id'];
    var data = req.body;
    var img = req.params ['img'];

    if (req.files.imagen){

        if(img || img != null || img!=undefined || img!='default.jpg'){
            fs.unlink( __dirname + '/../uploads/productos/'+ img, (err)=>{
                if (err) throw err;
            });
        }

        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('/');
        var imagen_name = name [name.length-1];
        
        Producto.findByIdAndUpdate({_id: id}, {titulo: data.titulo, descripcion: data.descripcion, imagen: imagen_name, precio_compra: data.precio_compra, precio_venta: data.precio_venta, idcategoria: data.idcategoria, puntos: data.puntos}, (err, producto_edit)=>{
            if (err){
                res.status(500).send({error: 'Error en el servidor'});
            } else {
                if (producto_save){
                    res.status(200).send({producto: producto_edit});
                } else {
                    res.status (403).send({error: 'No se ha editado el producto'})
                }
            }
        });

    } else {
        Producto.findByIdAndUpdate({_id: id}, {titulo: data.titulo, descripcion: data.descripcion, precio_compra: data.precio_compra, precio_venta: data.precio_venta, idcategoria: data.idcategoria, puntos: data.puntos}, (err, producto_edit)=>{
            if (err){
                res.status(500).send({error: 'Error en el servidor'});
            } else {
                if (producto_edit){
                    res.status(200).send({producto: producto_edit});
                } else {
                    res.status (403).send({error: 'No se ha editado el producto'})
                }
            }
        });
    }
}

function obtener_producto (req,res){
    var id = req.params ['id'];

    Producto.findOne({_id: id}, (err,producto_data)=>{
        if (err){
            res.status(500).send({error: 'Error en el servidor'});
        } else {
            if (producto_data){
                res.status(200).send({producto: producto_data});
            } else {
                res.status (403).send({error: 'No existe el registro'})
            }
        }
    });
}

function eliminar (req,res){
    var id = req.params ['id'];

    Producto.findByIdAndRemove({_id: id}, (err, producto_delete)=>{
        if (err){
            res.status(500).send({error: 'Error en el servidor'});
        } else {
            if (producto_delete){
                fs.unlink(__dirname + '/../uploads/productos/'+ producto_delete.imagen, (err)=>{
                    if (err) throw err;
                });
                res.status(200).send({producto: producto_delete});
            } else {
                res.status (403).send({error: 'No se ha eliminado ningún registro'})
            }
        }
    });
}

function update_stock(req,res){
    let id = req.params['id'];
    let data = req.body;

    Producto.findById(id, (err,producto_data)=>{
        if (producto_data){
            Producto.findByIdAndUpdate(id,{stock: parseInt(producto_data.stock) + parseInt(data.stock)}, (err, producto_edit)=>{
                if (producto_edit){
                    res.status(200).send ({producto: producto_edit});
                } else {
                    res.status(500).send(err);
                }
            })
        }
    });
}

function get_img (req,res){
    var img = req.params['img'];

    if (img != null){
        let path_img = __dirname + '/../uploads/productos/' + img;
        res.status(200).sendFile(path.resolve(path_img));
    } else {
        let path_img = __dirname + '/../uploads/productos/default.jpg';
        res.status(200).sendFile(path.resolve(path_img));
    }
}


module.exports = {
    registrar,
    listar, 
    editar,
    obtener_producto,
    eliminar,
    update_stock,
    get_img
};