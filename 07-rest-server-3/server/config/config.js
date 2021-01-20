/*
==================================================
        Configurando puerto globalmente
==================================================
*/

process.env.PORT = process.env.PORT || 4000;

/*
==================================================
        Configurando entorno
==================================================
*/

process.env.NODE_ENV = process.env.NODE_ENV || `dev`;


/*
==================================================
        base de datos
==================================================
*/

let urlDB;

if(process.env.NODE_ENV === `dev`){
      urlDB = `mongodb://localhost:27017/cafe`;
}else{
      urlDB =  "mongodb+srv://jorge:abascal12345@cluster0.9wy9i.mongodb.net/cafe";
}

process.env.URLDB = urlDB;
