const express = require("express");
const Usuario = require("../models/usuarioModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();


app.post("/auth", ( req, res ) => {
    let datos = req.body;
    Usuario.findOne({email: datos.email}, ( error, usuario ) => {
        if(error){
            return res.status(500).json({
                ok:false,
                error
            });
        }
        
        if(!usuario){
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Usuario o contraseña no validos"
                }
            });
        }

        //Comparar la contraseña encryptadas
        if( !bcrypt.compareSync( datos.password, usuario.password ) ){
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Contraseña no valida"
                }
            });
        }

        //Generar un json web token
        let token = jwt.sign({
            usuario
        }, process.env.SEED,{ expiresIn: process.env.CADUCIDAD_TOKEN } );

        res.json({
            ok: true,
            usuario,
            token
        });
    });


});

module.exports = app;