var mongoose =  require ('mongoose')
var Schema = mongoose.Schema;

var clienteSchema = Schema ({
   nombre: String,
   dni: String,
   correo: String,
   puntos: String,
   createAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('cliente', clienteSchema);