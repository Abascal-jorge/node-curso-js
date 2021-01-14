const { argv } = require("./config/yargs");
const colors = require("colors");
const { tablaMultiplicar, listarTabla } = require("./multiplicar/multiplicar");


switch ( argv._[0] ) {
    case "listar":
        let tabla = argv.base;
        let limite = argv.limite;

        listarTabla(tabla, limite)
            .then( res => console.log( res ) )
            .catch( error => console.log( error ) )
        break;
        
    case "crear":
        let resultadoArray = argv.base;
        let limite2 = argv.l;

        tablaMultiplicar(resultadoArray, limite2)
            .then( res => console.log(res.red) )
            .catch( error => console.log( error ) )
        break;
    default:
        break;
}

//let argv = process.argv;