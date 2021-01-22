const express = require("express");
const app = express();

app.use( require("./authRoute") );
app.use( require("./usuariosRoutes") );

module.exports = app;