const dbConnection = require("../config/config");


exports.postProductos = async ( req, res ) => {

    const datos = req.body;
    
    if( Object.keys(datos).length === 0){
        return res.json({
            ok: false,
            error: "Ingresa los datos especificados"
        });
    }

    const connection = await dbConnection();
    

    connection.query('INSERT INTO productos SET ?', datos, (err, result) => {
        if(err) return err;

        res.json({
            ok: true,
            id_producto: result.insertId
        });

    });

    connection.end();


};

exports.getProductos = async ( req, res ) => {

    const connection = await dbConnection();

    connection.query('Select * from productos', (error, results, fields) => {

        if (error) return error;

        res.json({
            ok: true,
            results
        });
    
        //console.log('The solution is: ', results[0].solution);

    });

    connection.end();
};

exports.deleteProductos = async ( req, res ) => {
    const id = req.params.id;

    const connection = await dbConnection();

    connection.query(
        'DELETE FROM productos WHERE id = ?', [id], (err, result) => {
        if (err) return  err;
           res.json({
               ok: true,
               result
           });
        }
    );

    connection.end();
};

exports.updateProductos = async ( req, res )  => {

    const id = req.params.id;
    const datos = req.body;
    const { nombre, telefono, direccion, apellido } = datos;

    const connection = await dbConnection();

    connection.query(
        'UPDATE productos SET ? Where ID = ?', [datos, id], (err, result) => {
          if (err) throw err;
            
          res.json({
              ok: true,
              result
          });
          //console.log(`Changed ${result.changedRows} row(s)`);
        }
    );

    connection.end();

};