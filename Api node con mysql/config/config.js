// Instalamos mysql   npm i mysql 
// Si marca error     npm i mysqljs / mysql
const mysql = require('mysql');


const dbConnection = async () => {

    try {
        let connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'productos'
        });
           
        await connection.connect( ( error ) => {
            if( error ){
                console.log( error.stack );
                return;
            }
            console.log("Estas conectado a la base mysql productos");
        });
          
        return connection;
        //connection.end();
    } catch (error) {
        console.log(error)
    }

}

module.exports = dbConnection;