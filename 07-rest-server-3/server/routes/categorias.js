const express = require("express");
const Categorias = require("../models/categoriasModels");
const { verificaToken } = require("../middlewares/authentication");
const app = express();


app.post("/categoria", verificaToken, ( req, res ) => {
    let datos = req.body;
    datos.usuario = req.usuario._id;

    let categorias = new Categorias({
        categoria: datos.categoria,
        precio: datos.precio,
        usuario: datos.usuario
    });

    categorias.save( ( error, categoriaDB ) => {
        
        if(error){ 
            return res.status(400).json({
                ok: false,
                error
            });
        }

        if(!categoriaDB){
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});

app.get("/categoria", verificaToken, ( req, res ) => {

    Categorias.find({})
        .sort("categoria")
        .populate("usuario", "nombre email")
        .exec( ( error, categoriaDB ) => {
            if(error){
                return res.status(500).json({
                    ok: true,
                    error
                });
            }

            if(!categoriaDB){
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: "No se encontraron elementos"
                    }
                });
            }

            res.json({
                ok: true,
                categoria: categoriaDB
            });
        })
});

app.get("/categorias/:id", verificaToken, ( req, res ) => {
    let id = req.params.id;

    Categorias.findById(id)
        .populate("usuario", "nombre email")
        .exec( ( error, categoriaDB ) => {
            if(error){
                return res.status(400).json({
                    ok: false,
                    error
                });
            }
    
            if(!categoriaDB){
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: "No se encontro una categoria con ese ID"
                    }
                });
            }
    
            res.json({
                ok: true,
                categoria: categoriaDB
            });
        });
   

});

app.put("/categoria/:id", ( req, res ) => {
    let id = req.params.id;
    let datos = req.body;
    
    Categorias.findByIdAndUpdate(id, datos, { new: true}, ( error, categoriaDB) => {
        if(error){
            return res.status(500).json({
                ok: false,
                error
            })
        }

        if(!categoriaDB){
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Elemento no actualizado, ID no encontrado"
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

app.delete("/categoria/:id", verificaToken, ( req, res ) => {
    let id = req.params.id;

    Categorias.findByIdAndRemove(id, ( error, eliminado ) => {
        if( error ){
            return res.status(400).json({
                ok: false,
                error
            });
        }

        if(!eliminado){
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Elemento no encontrado"
                }
            });
        }

        res.json({
            ok: true,
            categoria: eliminado
        });

    });

});

module.exports = app;