const express = require("express");
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuarioModels");
const app = express();

//Agregar un usuario nuevo
app.post("/usuarios", ( req, res ) => {
    let datos = req.body;

    let usuario = new Usuario({
        nombre: datos.nombre,
        email: datos.email,
        password: bcrypt.hashSync(datos.password, 10),
        role: datos.role
    });

    usuario.save( ( error, usuarioDB ) => {
        if(error){
            return res.status(400).json({ 
                ok: "false", 
                error
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

//Actualizar un usuario
app.put("/usuarios/:id", ( req, res ) => {
    let id = req.params.id;
    let datos = req.body;
    
    Usuario.findByIdAndUpdate(id, datos, { new: true },( error, usuarioDB ) => {
        if(error){
            return res.status(400).json({
                ok: false,
                error
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
    res.send(`Hola usuario con el id`);
});


module.exports = app;