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
    cargarDB();
    return listadoPorHacer;
}

const actualizarDB = (descripcion, completado) => {
    cargarDB();

    const nuevo = listadoPorHacer.find( lista => lista.descripcion === descripcion);

    if(nuevo){
        nuevo.completado = completado;
        const nuevoArreglo = listadoPorHacer.filter( lista => lista.descripcion === descripcion ? nuevo : lista);
        listadoPorHacer = nuevoArreglo;
        guardarDB();
        return true;
    }else{
        return false;
    }
}

const eliminarTarea = ( descripcion ) => {
    cargarDB();
    const existente = listadoPorHacer.findIndex( lista => lista.descripcion === descripcion);
    if(existente >= 0){
        const tareasNuevas = listadoPorHacer.filter( lista => lista.descripcion !== descripcion);
        listadoPorHacer = tareasNuevas;   
        guardarDB();
        return true;
    }else{
        return false;
    }
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
    listarDB,
    actualizarDB,
    eliminarTarea
}