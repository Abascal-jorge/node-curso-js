const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let port = process.env.PORT || 4000; 


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.use( require("./routes/correoRoutes") );


app.listen( port, () => {

    console.log(`Conectado en el puerto ${port}`);

});