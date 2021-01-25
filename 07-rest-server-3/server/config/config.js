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


/**
 Vencimiento del token
**/
process.env.CADUCIDAD_TOKEN = "1h";

/*Definir la palabra secreta */
process.env.SEED = process.env.SEED || "secret-palabra-token";
/*secret-palabra-token-heroku
==================================================
        base de datos
==================================================
*/

let urlDB;

if(process.env.NODE_ENV === `dev`){
      urlDB = `mongodb://localhost:27017/cafe`;
}else{
      urlDB =  process.env.MONGO_URL;
}

process.env.URLDB = urlDB;


/*
==================================================
        configurando idclient google
==================================================
*/

process.env.CLIENT_ID = "967684378270-udba3p6ua4hv3oc9ourv83pfeo2brvn4.apps.googleusercontent.com";
