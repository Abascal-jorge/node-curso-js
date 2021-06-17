const express = require("express");
const app = express();
const Productos = require("../controllers/productos");

app.get(
    "/productos",
    Productos.getProductos
)

module.exports = app;


