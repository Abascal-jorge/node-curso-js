const argv = require("yargs")
             .command("listar", "Ingresa la tabla que deseas conocer",{
                 base: {
                     demand: true,
                     alias: "b"
                 },
                 limite: {
                     demand: false,
                     alias: "l"
                 }
             }).argv;

const { tablaMultiplicar } = require("./multiplicar/multiplicar");


//let argv = process.argv;
let resultadoArray = argv.base;
let limiteTabla = argv.l;
//let resultadoArray = argv[2].split("=")[1];


tablaMultiplicar(resultadoArray, limiteTabla)
    .then( res => console.log(res) )
    .catch( error => console.log( error ) )
