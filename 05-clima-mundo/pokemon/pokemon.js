const axios = require("axios");


const mostrarPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/ditto`;

    const respuesta = await axios.get(url);


    console.log(respuesta.data);
}

module.exports = {
    mostrarPokemon
}