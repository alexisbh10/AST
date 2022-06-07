var Cliente = require('../models/cliente');

function listar(req,res){
    Cliente.find((err,cliente_data)=>{
        if (cliente_data){
            res.status(200).send({clientes: cliente_data});
        } else {
            res.status(403).send({message: 'No hay clientes en la base de datos'});
        }
    })
}

function get_cliente(req,res){
    var id = req.params['id'];

    Cliente.findById(id,(err,cliente_data)=>{
        if(cliente_data){
            res.status(200).send({cliente: cliente_data});
        } else {

        }
    })
}

function registrar (req,res){
    let data = req.body;
    var cliente = new Cliente();
    cliente.nombre = data.nombre;
    cliente.correo = data.correo;
    cliente.dni = data.dni;
    cliente.puntos = 10;
    
    cliente.save((err,cliente_save)=>{
        if (cliente_save){
            res.status(200).send({cliente: cliente_save});
        } else {
            res.status(500).send(err);
        }
    });
}

function editar (req,res){
    let id = req.params['id'];
    let data = req.body;

    Cliente.findByIdAndUpdate(id,{nombre: data.nombre, dni: data.dni, correo: data.correo}, (err,cliente_edit)=>{
        if (cliente_edit){
            res.status(200).send({cliente: cliente_edit});
        } else {
            res.status(500).send(err);
        }
    });
}

function eliminar (req,res){
    let id = req.params['id'];
    
    Cliente.findByIdAndRemove(id, (err,cliente_delete)=>{
        if (cliente_delete){
            res.status(200).send({cliente: cliente_delete});
        } else {
            res.status(500).send(err);
        }
    })
}

module.exports = {
    registrar, 
    editar,
    eliminar,
    listar,
    get_cliente
}