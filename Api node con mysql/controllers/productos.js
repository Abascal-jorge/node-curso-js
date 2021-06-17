const dbConnection = require("../config/config");

exports.getProductos = async ( req, res ) => {

    const connection = await dbConnection();

    connection.query('Select * from productos', (error, results, fields) => {

        if (error) return error;

        results.forEach( res => {
            console.log(res.nombre);
        });
        //console.log('The solution is: ', results[0].solution);

    });

    connection.end();

    res.json({
        ok: true,
        nombre: "jorge"
    });

};