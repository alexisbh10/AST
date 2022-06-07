
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require ('mongoose');
var port = process.env.PORT || 3002;

//var db = require('../database/database');

var app = express();

//var user_routes = require ('./routes/user');
//var categoria_routes = require ('./routes/categoria');
//var producto_routes = require ('./routes/productos.routes');
//var cliente_routes = require ('./routes/cliente');
var venta_routes = require ('./routes/venta');



mongoose.connect('mongodb://localhost:27017/TiendaAST',{useUnifiedTopology: true, useNewUrlParser: true},(err,res)=>{
    if (err){
        console.log ('err');
        throw (err);

    }
    else {
        console.log ('Servidor iniciado');
        app.listen(port,function(){
            console.log ('Servidor iniciado en el puerto ' + port);
        });
    }
});


//ROUTES

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use((req,res,next)=>{
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

//app.use('/api',user_routes);
//app.use('/api',categoria_routes);
//app.use('/api',producto_routes);
//app.use('/api',cliente_routes);
app.use('/api',venta_routes);




module.exports = app;
