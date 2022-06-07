var mongoose =  require ('mongoose')
var Schema = mongoose.Schema;

var categoriaSchema = Schema ({
    titulo: String,
    descripcion: String
});

module.exports = mongoose.model('categoria', categoriaSchema);