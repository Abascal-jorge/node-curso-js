const express = require("express");
const _ = require("underscore");
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuarioModels");
const app = express();

//Agregar un usuario nuevo
app.post("/usuarios", ( req, res ) => {
    let datos = req.body;
    //console.log(datos);
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
    let datos = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

    //console.log(datos);
    
    Usuario.findByIdAndUpdate(id, datos, { new: true, runValidators: true },( error, usuarioDB ) => {

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
    let limite = Number(req.query.limite) || 5;
    let salto = Number(req.query.salto) || 5;
    Usuario.find({})
    .limit(limite)
    .skip(salto)
    .exec( ( error, usuario ) => {
        if(error){
            return res.status(400).json({
                ok: false,
                error
            });
        } 

        Usuario.count({}, (error, conteo) => {
            res.json({
                ok: true,
                usuario,
                cuantos: conteo
            });
        });
    });
});


module.exports = app;