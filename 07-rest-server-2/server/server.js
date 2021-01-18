require("../config/config");
const express = require("express");
const body_parser = require('body-parser');
const app = express();

app.use(body_parser.urlencoded({extended:true}));

app.get("/usuarios/:id", ( req, res ) => {
    let id = req.params.id;
    res.send(`El id del usuario es ${id}`);
});

app.post("/usuarios", ( req, res ) => {
    let datos = req.body;
    res.send(datos);
});

app.listen(process.env.PORT, () => {
    console.log(`Conectado desde el puerto ${process.env.PORT}`);
});