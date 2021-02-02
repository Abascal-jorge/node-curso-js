const express = require("express");
const fileUpload = require('express-fileupload');
const Usuario = require("../models/usuarioModels");
const Productos = require("../models/productosModels");
const fs = require("fs");
const path = require("path");
const app = express();

// default options
app.use(fileUpload({ useTempFiles: true}));

app.put('/upload/:tipo/:id', (req, res) => {

    let datosImagen = req.files.archivo.name.split(".");
    let extencionesValidas = ["jpg", "png", "gif", "psd", "bmp"];
    let tipo = req.params.tipo;
    let id = req.params.id;
    //Validar tipos
    let tiposValidos = ["producto", "usuario"];
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let archivo = req.files.archivo;
    /*Agregando un nombre diferente a la imagen*/
    let nombreArchivo = `${ id }-${new Date().getMilliseconds()}.${datosImagen[1]}`;


    //Si el req.files no trae nada se manda este error
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            error: {
                message: "No estas subiendo ningun archivo o imagen"
            }
        });
    }
    // Si el req.params no trae el tipo se manda este error
    if( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            error: {
                message: `Debes incluir un tipo de dato valido, tipos validos: ${tiposValidos.join(", ")}`
            },
            tipo
        });
    }
    //Si la extension del archivo no es valida se manda este error
    if(!extencionesValidas.includes(datosImagen[1])){
        return res.status(400).json({
            ok: false,
            error: {
                message: `Formato no valido, los formatos validos son ${extencionesValidas.join(", ")}`
            },
            ext: datosImagen[1]
        });
    }

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(`uploads/${ tipo }/${nombreArchivo}`, (error)  => {

            if(error){
                return res.status(500).json({
                    ok: false,
                    error
                });
            }

            //Aqui la imagen ya se creo
            if(tipo === "usuario"){
                imagenUsuario(id, res, nombreArchivo);
            }else{
                imagenProducto(id, res, nombreArchivo);
            }
    });

});

function imagenUsuario(id, res, nombreArchivo){
    Usuario.findById(id, ( error, usuarioDB ) => {
        if(error){
            borrarArchivo("usuario", nombreArchivo);
            return res.status(500).json({
                ok: false,
                error
            });
        }

        if(!usuarioDB){
            borrarArchivo("usuario", nombreArchivo);
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Usuario no encontrado..."
                }
            });
        }

        borrarArchivo("usuario", usuarioDB.img);

        usuarioDB.img = nombreArchivo;

        usuarioDB.save( ( error, usuarioAct ) => {

            if(error){
                return res.status(500).json({
                    ok: false,
                    error
                });
            }

            res.json({
                ok: true,
                usuario: usuarioAct
            });
        } );

    } )
}

function imagenProducto(id, res, nombreArchivo){
    Productos.findById(id, ( error, productoDB ) => {

        if(error){
            borrarArchivo("producto", nombreArchivo);
            return res.status(500).json({
                ok: false,
                error
            });
        }

        if(!productoDB){
            borrarArchivo("producto", nombreArchivo);
            return res.status(400).json({
                ok: false,
                error: {
                    message: "No se encontro un producto..."
                }
            });
        }

        borrarArchivo("producto", productoDB.img);

        productoDB.img = nombreArchivo;

        productoDB.save( ( error, productoAct ) => {
            if(error){
                return res.status(500).json({
                    ok: false,
                    error
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            });
        });
    });
}

function borrarArchivo(tipo, nombreImg){
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImg}`);
    if(fs.existsSync(pathImagen)){
        fs.unlinkSync(pathImagen);
    }
}

module.exports = app;