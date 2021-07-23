require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

let port = process.env.PORT || 4000; 


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Habilitar cors
const opcionesCors = {
    origin: process.env.FRONTEND
}

app.use( cors(opcionesCors) );

app.use( require("./routes/correoRoutes") );


app.listen( port, () => {

    console.log(`Conectado en el puerto ${port}`);

});