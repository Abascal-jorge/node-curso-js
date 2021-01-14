/*setTimeout(() => {
    console.log("hola");
}, 3000);*/

function primerCallbacks(id, callback){

    const usuario = {
        nombre: "Jorge",
        id
    }

    if(id === 20){
        callback(`El id: ${id} de usuario no existe`);
    }else{
        callback(null, usuario);
    }
}

primerCallbacks(2, (error, usuario) => {

    if(error){
        console.log(error);
        return;
    }
    console.log("El usuario existe: " , usuario);
    
});
