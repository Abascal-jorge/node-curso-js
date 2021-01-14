const fs = require("fs");

let listadoPorHacer = [];

const crear = (descripcion) => {
    
    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);
    
    return porHacer;
    /*return new Promise( ( resolve, reject ) => {

        if(!descripcion){
            reject("Agregue una descricion");
            return;
        }

        fs.writeFile(`tarea/tareas`, descripcion, error => {
            if(error){
                reject(error);
            }else{
                resolve("Tarea creada correctamente");
            }
        });

    });*/
}

module.exports = {
    crear
}