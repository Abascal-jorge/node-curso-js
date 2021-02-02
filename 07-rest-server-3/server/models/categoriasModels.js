const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const categoriasSchema = new Schema({
     categoria : {
         type: String,
         required: [true, "No puedes duplicar las categorias"],
         unique: true
     },
     precio: {
         type: Number,
         required: [true, "El precio es obligatorio"]
     },
     usuario: {
         type: Schema.Types.ObjectId,
         ref: 'Usuario',
         required: [true, "El id de usuario es obligatorio"]
     }
});




categoriasSchema.plugin(uniqueValidator, { message: `{PATH} debe de ser unico`});


module.exports = mongoose.model("Categorias", categoriasSchema);