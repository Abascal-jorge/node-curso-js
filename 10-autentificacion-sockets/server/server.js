const express = require("express");
const path = require("path");
const app = express();

let port = process.env.PORT || 4000;

app.use( express.static(path.join(__dirname, "../public")) );

app.get("/usuarios", ( req, res ) => {
    res.send("Funcionando correctamente todo");
});


app.listen(port, () => {
    console.log(`Estas conectado en el puerto ${port}`);
});