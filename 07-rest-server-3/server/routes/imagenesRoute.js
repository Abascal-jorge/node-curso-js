const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const { verificaTokenImagen } = require("../middlewares/authentication");


app.get("/imagenes/:tipo/:img", verificaTokenImagen, ( req, res ) => {

    let img = req.params.img;
    let tipo = req.params.tipo;
    
    let direccion = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
    
    if( !fs.existsSync(direccion)  ){
        let noImage = path.resolve(__dirname, `../assets/no-image.jpg`);
        return res.sendFile(noImage);
    }

    res.sendFile(direccion);
    
});

module.exports = app;