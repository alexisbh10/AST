
var mongoose = require ('mongoose');
var app = require ('../productos/app')


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