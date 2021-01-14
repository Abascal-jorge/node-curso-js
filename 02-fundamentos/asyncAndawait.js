let usuario = () => {
    return new Promise( ( resolve ) => {
        setTimeout(() => {
            resolve("Jorge");
        }, 3000);
    });
}


let bienvenidoUsuario = async () => {
    
    let nombre = await usuario();

    return nombre;
}


bienvenidoUsuario()
        .then( resolve => console.log(resolve) )