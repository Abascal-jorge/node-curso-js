const axios = require("axios");

async function dataAPI(descricion){

    /* const instance = axios.create({
        baseURL: 'https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=new+york',
        timeout: 1000,
        headers: {'x-rapidapi-key': 'b2b572779bmsh21323d4e27bd96ap13550fjsn44e272fd21ae'}
    });

    const res = await instance.get();

    const { Results } = res.data; */

    //if( !Results ){
    //    throw new Error("Los datos ingresados no proporcionaron ningun valor");
    //}

    return{
        direccion: "New York City, New York",
        lat: "40.750000", 
        lng: "-74.000000"
    }
    
}

async function obtenerClima({lat, lng}){
    const apiKey = `d26894095eb9d4a1091bdc1ed91de5e2`;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`;

    const respuesta = await axios.get(url);

    return respuesta.data.main;
}

module.exports = {
    dataAPI,
    obtenerClima
}