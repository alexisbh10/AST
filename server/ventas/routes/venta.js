var express = require('express');
var ventaController = require('../controllers/venta.controller');

var api = express.Router();

api.post('/venta/registrar', ventaController.registrar)
api.get('/venta/:id', ventaController.datos_venta)
api.get('/ventas', ventaController.listado_ventas)
api.get('/venta/data/:id', ventaController.detalles_venta)


module.exports = api;