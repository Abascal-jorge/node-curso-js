const fs = require("fs");

let listadoPorHacer = [];

const guardarDB = () => {
    
    let datos = JSON.stringify(listadoPorHacer);

        fs.writeFile(`db/data.json`, datos, error => {
            if(error){
                throw new Error(error);
            }
        });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require("../db/data.json");   
    } catch (error) {
        listadoPorHacer = [];
    }
}

const listarDB = () => {
    let datos = require("../db/data.json");
    return datos;
}

const crear = (descripcion) => {
    
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}


module.exports = {
    crear,
    guardarDB,
    listarDB
}