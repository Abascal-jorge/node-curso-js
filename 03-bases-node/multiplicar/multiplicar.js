const fs = require("fs");
let tabla = "";

const tablaMultiplicar = (base, limite) => {
    return new Promise( ( resolve, reject ) => {

        let limit = Number(limite) || 10;

        if( !Number( base ) ){
            reject("El dato Ingresado no es un numero para realizar la tabla");
            return;
        }

        for(let i=1; i<= limit; i++){
            tabla += `${base} * ${i} = ${base*i}\n`;
            //console.log(`${base} * ${i} = ${base*i}`);
        }

        fs.writeFile(`tablas/tabla${base}.txt`, tabla, err =>{
            if(err){
                reject(err);
            }else{
                resolve(`tabla${base}`);
            }
        });
        
    });
};

module.exports = {
    tablaMultiplicar
}