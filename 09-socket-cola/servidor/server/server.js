const express = require("express");
const path = require("path");
const app = express();


let pathPublico = path.resolve( __dirname, "../public" );

app.get("/usuario", ( req, res ) => {
    res.json({
        nombre: "jorge",
        apellido: "abascal"
    });
});

app.use(express.static(pathPublico));


app.listen(4000, () => {
    console.log("Conectado al servidor 4000");
});

