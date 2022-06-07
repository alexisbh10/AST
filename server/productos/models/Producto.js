var mongoose =  require ('mongoose')
var Schema = mongoose.Schema;

var productoSchema = Schema ({
    titulo: String,
    descripcion: String,
    imagen: String,
    precio_compra: Number,
    precio_venta: Number,
    stock: Number,
    idcategoria: {type:Schema.ObjectId, ref:'categoria'},
    puntos: Number
});

module.exports = mongoose.model('producto', productoSchema);