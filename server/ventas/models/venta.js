var mongoose =  require ('mongoose')
var Schema = mongoose.Schema;

var ventaSchema = Schema ({
    idcliente: {type: Schema.ObjectId, ref: 'cliente'},
    iduser: {type: Schema.ObjectId, ref: 'user'},
    fecha: {type: Date, default: Date.now}
});

module.exports = mongoose.model('venta', ventaSchema);