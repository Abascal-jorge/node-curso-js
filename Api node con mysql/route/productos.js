const express = require("express");
const app = express();
const Productos = require("../controllers/productos");

app.get(
    "/productos",
    Productos.getProductos
);

app.post(
    "/productos",
    Productos.postProductos
);

app.delete(
    "/productos/:id",
    Productos.deleteProductos    
);

app.put(
    "/productos/:id",
    Productos.updateProductos
);

module.exports = app;


