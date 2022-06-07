var Categoria = require ('../models/categoria');

function registrar (req,res){
    var data = req.body;
    
    var categoria = new Categoria();
    categoria.titulo = data.titulo;
    categoria.descripcion = data.descripcion;

    categoria.save((err,categoria_save)=>{
        if (err){
            res.status(500).send({error: 'Error en el servidor'});
        } else {
            if (categoria_save){
                res.status(200).send({categoria: categoria_save});
            } else {
                res.status (403).send({error: 'La categoría no se pudo registrar'})
            }
        }
    });
}

function obtener_categoria(req,res){
    var id = req.params['id'];

    Categoria.findById({_id: id},(err,categoria_data) =>{
        if (err){
            res.status(500).send({error: 'Error en el servidor'});
        } else {
            if (categoria_save){
                res.status(200).send({categoria: categoria_data});
            } else {
                res.status (403).send({error: 'La categoría no existe'})
            }
        }
    });
}

function editar_categoria (req,res){
    var id = req.params['id'];
    var data = req.body;

    Categoria.findByIdAndUpdate({_id: id}, {titulo: data.titulo, descripcion: data.descripcion}, (err, categoria_edit)=>{
        if (err){
            res.status(500).send({error: 'Error en el servidor'});
        } else {
            if (categoria_edit){
                res.status(200).send({categoria: categoria_edit});
            } else {
                res.status (403).send({error: 'La categoría no se ha podido actualizar'})
            }
        }
    })
}

function eliminar_categoria (req,res){
    var id = req.params ['id'];

    Categoria.findByIdAndRemove({_id: id}, (err, categoria_delete)=>{
        if (err){
            res.status(500).send({error: 'Error en el servidor'});
        } else {
            if (categoria_delete){
                res.status(200).send({categoria: categoria_delete});
            } else {
                res.status (403).send({error: 'La categoría no se ha podido eliminar'})
            }
        }
    });
}

function listar_categoria (req, res){
    var nombre = req.params ['nombre'];

    Categoria.find({titulo: new RegExp(nombre,'i')}, (err,categoria_listado)=>{
        if (err){
            res.status(500).send({error: 'Error en el servidor'});
        } else {
            if (categoria_listado){
                res.status(200).send({categorias: categoria_listado});
            } else {
                res.status (403).send({error: 'No hay registros con ese título'})
            }
        }
    });
}

module.exports = {
    registrar,
    obtener_categoria,
    editar_categoria, 
    eliminar_categoria,
    listar_categoria
}