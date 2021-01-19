require("./config/config");
const express = require("express");
const body_parser = require('body-parser');
const mongoose = require("mongoose");
const app = express();

app.use(body_parser.urlencoded({extended:true}));

app.use( require("./routes/usuarioRoute") );

mongoose.connect('mongodb://localhost/cafe2', ( error ) => {
    if(error){
        throw new Error(error);
    }
    console.log(`Conexion a la base de datos exitosamente...`);
});

app.listen(process.env.PORT, () => {
    console.log(`Conectado desde el puerto ${process.env.PORT}`);
});

//Comentario obligatorio por git 