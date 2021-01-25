require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser')
const app = express();


//Habilitando cors
const opcionesCors = {
    origin: "http://localhost:3000"
}
app.use( cors(opcionesCors) );

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());


//Llamando rutas
app.use( require("./routes/index") );


//Conectando a la base de datos mongooDB
mongoose.connect(process.env.URLDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
    , ( error, res ) => {
    
    if(error) throw error;
    console.log(`Base de datos ONLINE`);
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando desde el puerto ${process.env.PORT}....`);
});
