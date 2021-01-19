const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const usuarioSchema = new Schema({
    nombre:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        unique: true
    }
});

module.exports = mongoose.model("Usuario", usuarioSchema);