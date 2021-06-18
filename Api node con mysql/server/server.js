const express = require("express");
const app = express();
<<<<<<< HEAD
//const dbConnection = require("../config/config");

//dbConnection();
app.use(express.urlencoded({ extended: false }));
=======

>>>>>>> c10aa47091b338406d9bbf3ad5747d9070aa7202
app.use( require("../route/index") );

app.listen( 4000, "0.0.0.0", () => {
    console.log("Todo funcionano correctamente");
});