const express = require("express");
const Categorias = require("../models/categoriasModels");
const { verificaToken } = require("../middlewares/authentication");
const app = express();


app.post("/categoria", verificaToken, ( req, res ) => {
    let datos = req.body;
    datos.idusuario = req.usuario._id;

    let categorias = new Categorias({
        categoria: datos.categoria,
        precio: datos.precio,
        idusuario: datos.idusuario
    });

    categorias.save( ( error, categoriaDB ) => {
        
        if(error){
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

    Categorias.find({}, ( error, categoriasDB ) => {

        if(error){
            return res.status(500).json({
                ok: false,
                error
            });
        }

        if(categoriasDB.length <= 0){
            return res.status(400).json({
                ok: false,
                error: {
                    message: "No hay categorias activas"
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriasDB
        });
    });
});

app.get("/categorias/:id", ( req, res ) => {
    let id = req.params.id;

    Categorias.findOne({id}, (error, categoriaDB ) => {
        if(error){
            res.status(500).json({
                ok: false,
                error
            });
        }

        if(!categoriaDB){
            res.status(400).json({
                ok: false,
                error: {
                    message: "No se encontraron resultados"
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
    res.send(id);
});

app.delete("/categoria", ( req, res ) => {

    res.send("Desde eliminar categoria");

});

module.exports = app;