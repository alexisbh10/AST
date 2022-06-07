var express = require('express');
var categoriaController = require('../controllers/categoria.controller');

var api = express.Router();

api.post('/categoria/registrar', categoriaController.registrar);
api.get('/categoria/:id', categoriaController.obtener_categoria);
api.put('/categoria/editar/:id', categoriaController.editar_categoria);
api.delete('/categoria/eliminar/:id', categoriaController.eliminar_categoria);
api.get('/categorias/:titulo?', categoriaController.listar_categoria);



module.exports = api;