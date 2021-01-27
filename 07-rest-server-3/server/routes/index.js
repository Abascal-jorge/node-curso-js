const express = require("express");
const app = express();

app.use( require("./authRoute") );
app.use( require("./usuariosRoutes") );
app.use( require("./categorias") );

module.exports = app;