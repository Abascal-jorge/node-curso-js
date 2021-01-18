const argv = require("yargs").options({
    direccion : {
        alias: "d",
        desc: "Direccion de la ciudad",
        demand: true
    }
}).argv;
const { mostrarPokemon } = require("./pokemon/pokemon");
const { dataAPI, obtenerClima } = require("./lugar/lugar");


const mostrarInformacion = async ( direccion ) => {


    try {
        const coordenadas = await dataAPI(direccion);
        const inforClima = await obtenerClima(coordenadas);

        const { temp_min, temp_max, temp} = inforClima;

        console.log(`===El clima de ${direccion} es de: ====`);
        console.log(`===Tempearatura minima: ${temp_min} ===`);
        console.log(`===La temperatura maxima es de: ${temp_max} ==`);
        console.log(`===La temperatura actual es: ${temp} ===`);   
    } catch (error) {
        return error;
    }
}

//mostrarInformacion(argv.direccion);
mostrarPokemon();