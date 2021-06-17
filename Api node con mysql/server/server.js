const express = require("express");
const app = express();

app.use( require("../route/index") );

app.listen( 4000, "0.0.0.0", () => {
    console.log("Todo funcionano correctamente");
});