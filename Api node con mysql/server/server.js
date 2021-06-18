const express = require("express");
const app = express();
//const dbConnection = require("../config/config");

//dbConnection();
app.use(express.urlencoded({ extended: false }));
app.use( require("../route/index") );

app.listen( 4000, "0.0.0.0", () => {
    console.log("Todo funcionano correctamente");
});