const express = require("express");
const bodyParser = require('body-parser');
const app = express();
require("./config/config");


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get("/", ( req, res ) => {
    res.send({
        nombre: "jorge",
        apellido: "Abascal"
    });
});

app.post("/usuario/:id", ( req, res ) => {
    let id = req.params.id;
    res.send(`Metodo post usuarios... 2 1 3 id: ${id}`);

});

app.put("/usuarios", ( req, res ) => {
    let datos = req.body.nombre;
    res.send( datos );
});

app.delete("/usuarios", ( req, res ) => {
    res.send("Eliminando usuario... ");
});

app.listen( process.env.PORT, () => {
    console.log(`Aplicacion funcionando en el puerto ${process.env.PORT}....`);
});