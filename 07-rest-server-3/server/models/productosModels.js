const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const productosSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del producto es obligatorio"]
    },
    precio: {
        type: Number,
        required: [true, "El precio del producto es obligatorio"]
    },
    descripcion: {
        type: String,
        required: [true, "Agrega una descripcion del producto"]
    },
    disponible:{
        type: Boolean,
        required: true,
        default: true
    },
    img: {
        type: String,
        required: false
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "Categorias",
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    }
});

module.exports = mongoose.model("Productos", productosSchema);