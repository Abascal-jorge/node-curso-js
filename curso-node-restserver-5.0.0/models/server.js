const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const http = require("http");
const { socketController } = require("../sockets/socketController");
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io = require("socket.io")(this.server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        });

        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',
            uploads:    '/api/uploads',
        }


        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        //Sockets
        this.sockets();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        //this.app.use( express.static('public') );

        // Fileupload - Carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.buscar, require('../routes/buscar'));
        this.app.use( this.paths.categorias, require('../routes/categorias'));
        this.app.use( this.paths.productos, require('../routes/productos'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        this.app.use( this.paths.uploads, require('../routes/uploads'));
        
    }

    sockets(){
        this.io.on( "connection", socketController);
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
}


/*
PORT=4000
MONGODB_CNN=mongodb+srv://jorge:abascal12345@cluster0.9wy9i.mongodb.net/cafe
SECRETORPRIVATEKEY=Est03sMyPublicK3y23@913

GOOGLE_CLIENT_ID=967684378270-lovb56upvdlhp729pjdihr92pfhd5lb4.apps.googleusercontent.com
GOOGLE_SECRET_ID=w4lisH68B_8GMfoxgPdNiNQc


*/




module.exports = Server;
