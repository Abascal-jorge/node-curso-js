const express = require("express");
const Usuario = require("../models/usuarioModels");
const app = express();

app.post("/usuarios", ( req, res ) => {
    let datos = req.body;

    let usuario = new Usuario({
        nombre: datos.nombre,
        email: datos.email,
        password: datos.password,
        role: datos.role
    });

    usuario.save( ( error, usuarioDB ) => {
        if(error){
            return res.status(400).json({ 
                ok: "false", 
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});


app.get("/usuarios", ( req, res ) => {
    //let id = req.params.id;
    res.send(`Hola usuario con el id: ${id}`);
});


module.exports = app;