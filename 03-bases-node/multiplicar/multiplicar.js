const fs = require("fs");
const colors = require("colors");
let tabla = "";


const listarTabla = ( base, limite ) => {
    return new Promise( ( resolve, reject ) => {
        
        if( !Number( base ) && !Number( limite ) ){
            reject("Los datos ingresados no son numeros");
        }

        let mostrar = "";

        for(let i=1; i<=limite; i++){
            mostrar += `${ base } * ${ i } = ${ base * i }\n`.green;
        }

        resolve(mostrar);
        
    });
};

const tablaMultiplicar = (base, limite) => {
    return new Promise( ( resolve, reject ) => {

        if( !Number( base ) ){
            reject("El dato Ingresado no es un numero para realizar la tabla");
            return;
        }

        for(let i=1; i <= limite; i++){
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
    tablaMultiplicar,
    listarTabla
}