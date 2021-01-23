const express = require("express");
const _ = require("underscore");
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuarioModels");
const { verificaToken } = require("../middlewares/authentication");
const { usuarioRol } = require("../middlewares/rolUsuario");
const app = express();

//Agregar un usuario nuevo
//[ verificaToken, usuarioRol ]
app.post("/usuarios",[ verificaToken, usuarioRol ],( req, res ) => {
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
app.put("/usuarios/:id", [verificaToken, usuarioRol ],( req, res ) => {

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


app.get("/usuarios", verificaToken, ( req, res ) => {
    //let id = req.params.id;
    let limite = Number(req.query.limite) || 5;
    let salto = Number(req.query.salto) || 5;
    Usuario.find({estado: true})
    //.limit(limite)
    //.skip(salto)
    .exec( ( error, usuario ) => {
        if(error){
            return res.status(400).json({
                ok: false,
                error
            });
        } 

        Usuario.count({estado: true}, (error, conteo) => {
            res.json({
                ok: true,
                usuario,
                cuantos: conteo
            });
        });
    });
});

app.delete("/usuarios/:id", verificaToken,( req, res ) => {
    let id = req.params.id;
    let datos = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, datos, {new: true}, ( error, usuarioDB) => {
        if(error){
            return res.status(400).json({
                ok: false,
                error
            });
        }

        if(!usuarioDB.estado){
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Usuario no encontrado, verifica el id"
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

    /*Eliminando fisicamente de la base de datos 
    Usuario.findByIdAndRemove(id, ( error, resultado ) => {
        if(error){
            return res.status(400).json({ 
                ok: false, 
                error});
        }

        if(!resultado){
            return res.status(400).json({ 
                ok: false, 
                error: {
                    message: "Usuario no encontrado"
                }
            });
        }

        res.json({ 
            ok: true,
            usuario: resultado
        });
    });
    */
    
    /*=================================================== */
    /*=================================================== */
});


module.exports = app;