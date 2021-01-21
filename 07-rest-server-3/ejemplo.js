let vinicial = 0;
let vsecundario = 1;
let mostrar = 0;

console.log(vinicial);

for(let i=0; i<101; i++){

    if(vinicial == 0){
        console.log(1);
    }
    
    mostrar = vinicial + vsecundario;
    vinicial = vsecundario;
    vsecundario = mostrar;
    console.log(mostrar);
}





/*const texto = "hola me llamo jorge";

let textoArray = texto.split(" ");

for(let i=0; i<textoArray.length; i++){
    textoArray[i] = textoArray[i].charAt(0).toUpperCase() + textoArray[i].slice(1).toLowerCase();
}

console.log( textoArray.join( " " ) );

*/