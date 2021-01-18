const http = require("http");


http.createServer( ( req, res ) => {

    res.writeHead(200, {"Content-Type": "application/json"});

    let datos = {
        nombre : "Jorge",
        apellido : "Abascal",
        url : req.url
    }

    res.write( JSON.stringify(datos) );

    res.end();
}).listen(4000);

console.log("Escuchando en el puerto 4000");