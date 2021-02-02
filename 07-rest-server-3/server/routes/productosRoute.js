const express = require("express");
const { verificaToken } = require("../middlewares/authentication");
const Productos = require("../models/productosModels");
const app = express();


app.post("/productos", verificaToken, ( req, res ) => {
    let body = req.body;

    let producto = new Productos({
        nombre: body.nombre,
        precio: body.precio,
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save( ( error, productoDB ) => {
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


app.put("/productos/:id", verificaToken, ( req, res ) => {
    let id = req.params.id;
    let body = req.body;

    let datos = {
        nombre: body.nombre,
        precio: body.precio,
        descripcion: body.descripcion
    }

    Productos.findByIdAndUpdate(id, datos, { new : true, runValidators: true }, ( error, productoDB ) => {
        if(error){
            return res.status(500).json({
                ok: false,
                error
            });
        }

        if(!productoDB){
            return res.status(400).json({
                ok: false,
                error: {
                    message: "No se encontro producto para actualizar"
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });

});


app.get("/productos", verificaToken, ( req, res ) => {

    let limite = Number(req.query.limite) || 0;
    let salto = Number(req.query.salto) || 0;

    Productos.find({disponible: true})
        .skip(salto)
        .limit(limite)
        .populate("categoria", "categoria")
        .populate("usuario", "nombre email")
        .exec( (error, productoDB ) => {
            if(error){
                return res.status(400).json({
                    ok: false,
                    error
                });
            }

            if(!productoDB){
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: "No existen productos en esta categoria"
                    }
                });
            }

            Productos.count({disponible: true}, (error, total)=>{
                if(error){
                    return res.status(500).json({
                        ok: false,
                        error
                    });
                }

                if(!total){
                    return res.status(400).json({
                        ok: false,
                        error:{
                            message: "No hay elementos"
                        }
                    });
                }

                res.json({
                    ok: true,
                    count: total,
                    producto: productoDB
                });
            });
        });
});



app.get("/productos/:id", ( req, res ) => {
    let id = req.params.id;

    Productos.findById(id)
        .populate("categoria", "categoria")
        .populate("usuario", "nombre email")
            .exec( (error, productoDB) => {
                if(error){
                    return res.status(500).json({
                        ok: false,
                        error
                    });
                }

                if(!productoDB){
                    return res.status(400).json({
                        ok: false,
                        error: {
                            message: "No se encontro un elemento"
                        }
                    });
                }

                res.json({
                    ok: true,
                    producto: productoDB
                });
            });
});

app.delete("/productos/:id", verificaToken, ( req, res ) => {

    let id = req.params.id;

    let datos = {
        disponible: false
    }

    Productos.findByIdAndUpdate(id, datos, {new: true}, ( error, productoDB) => {
        if(error){
            return res.status(500).json({
                ok: false,
                error
            });
        }

        if(!productoDB){
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Producto no encontrado"
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });
});

module.exports = app;