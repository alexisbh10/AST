var Venta = require ('../models/venta');
var DetalleVenta = require ('../models/detalleventa');
var Producto = require ('../models/Producto')
var axios = require ('axios');

// USUARIOS




// VENTAS

function registrar (req,res){
    let data = req.body;
    var venta = new Venta();
    venta.idcliente = data.idcliente;
    venta.iduser = data.iduser;

    venta.save ((err,venta_save)=>{
        if (venta_save){
            let detalles = data.detalles;
            console.log(detalles)

            detalles.forEach((element,index)=> {
                var detalleventa = new DetalleVenta();
                detalleventa.idproducto = element.idproducto;
                detalleventa.cantidad = element.cantidad;
                detalleventa.venta = venta_save._id;

                detalleventa.save ((err,detalle_save)=>{
                    if (detalle_save){
                        Producto.findById({_id:element.idproducto},(err,producto_data)=>{
                            if (producto_data){
                                Producto.findByIdAndUpdate({_id:producto_data._id},{stock: parseInt(producto_data.stock) - parseInt(element.cantidad)},(err,producto_edit)=>{
                                    res.end();
                                })
                            } else {
                                res.send ('No se ha encontrado el producto');
                            }
                        })
                    } else {
                        res.send ('No se han podido registrar los datos');
                    }
                })
            })
        } else {
            res.send ('No se han podido registrar los datos');
        }
    })
}

function datos_venta(req,res){
    var id = req.params['id'];
    console.log(res.data);
        
        Venta.findById(id).populate('idcliente')/*populate('iduser')*/.exec((err,data_ventas)=>{
        if(data_ventas){
           
            DetalleVenta.find({venta:data_ventas._id}).populate('idproducto').exec({idventa:id},(err,data_detalles)=>{
                if(data_detalles){
                    res.status(200).send(
                        {
                            data : {
                                venta: data_ventas,
                                detalles: data_detalles
                            }
                        }
                    );
                }
            });
        }
    });
}

function listado_ventas(req,res){
    Venta.find()/*.populate('idcliente').populate('iduser')*/.exec((err,data_venta)=>{
        if (data_venta){
            res.status(200).send({ventas: data_venta})
        } else {
            res.status(404).send({message: 'No hay ningún registro de venta'});
        }
    });
}

function detalles_venta(req,res){
    var id = req.params['id'];

    DetalleVenta.find({venta: id}).populate('idproducto').exec((err,data_detalles)=>{
        if(data_detalles){
            res.status(200).send({detalles:data_detalles});
        }else{
            res.status(404).send({message: "No hay ningun registro de venta"});
        }
    });
}

module.exports = {
    registrar,
    datos_venta,
    listado_ventas,
    detalles_venta
}