var express = require('express');
var clienteController = require('../controllers/cliente.controller');

var api = express.Router();

api.post('/cliente/registrar', clienteController.registrar);
api.put('/cliente/editar/:id', clienteController.editar);
api.delete('/cliente/eliminar/:id', clienteController.eliminar);
api.get('/clientes', clienteController.listar);
api.get('/cliente/:id', clienteController.get_cliente);





module.exports = api;