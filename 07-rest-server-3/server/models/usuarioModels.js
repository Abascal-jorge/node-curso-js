const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre : {
        type: String,
        required: [true, "El nombre es necesario"],
    },
    email :  {
        type: String,
        required: [true, "el correo es necesario"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    img:{
        type: String,
        require: false
    },
    role:{
        type: String,
        default: "USER_ROLE"
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Usuario", usuarioSchema);