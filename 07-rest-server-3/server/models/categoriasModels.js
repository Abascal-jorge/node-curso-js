const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const categoriasSchema = new Schema({
     categoria : {
         type: String,
         require: [true, "No puedes duplicar las categorias"],
         unique: true
     },
     precio: {
         type: Number,
         require: [true, "El precio es obligatorio"]
     },
     idusuario: {
         type: String,
         require: [true, "El id de usuario es obligatorio"]
     }
});


module.exports = mongoose.model("Categorias", categoriasSchema);