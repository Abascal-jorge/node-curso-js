const texto = "hola me llamo jorge";

let textoArray = texto.split(" ");

for(let i=0; i<textoArray.length; i++){
    textoArray[i] = textoArray[i].charAt(0).toUpperCase() + textoArray[i].slice(1).toLowerCase();
}

console.log( textoArray.join( " " ) );