const express = require("express");
const app = express();
const enviarCorreo  = require("../middleware/correoEnvios");

app.get("/correo", async (req, res) => {
    let datos = req.body;
    await enviarCorreo(req, res);
    //res.json(datos);
});

module.exports = app;