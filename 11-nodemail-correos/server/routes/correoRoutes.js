const express = require("express");
const app = express();
const enviarCorreo  = require("../middleware/correoEnvios");

app.post("/correo", async (req, res) => {
    await enviarCorreo(req, res);
});

module.exports = app;