const hbs = require('hbs') ; 
 
hbs.registerHelper('getanio', () => new Date().getFullYear() );

hbs.registerHelper("getCapitalizar", texto => {
    let palabras = texto.split(" ");
    palabras.forEach( ( palabra, i) => {
        palabras[i] = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    });
    let res = palabras.join(" ");
    return res;
});