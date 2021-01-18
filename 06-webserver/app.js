const express = require('express');
const app = express();
const hbs = require('hbs') ; 
require("./hbs/helpers");
 
const port = process.env.PORT || 4000;

app.use( express.static( __dirname + "/public" ));

hbs.registerPartials( __dirname + '/views/partials');
app.set('view engine', 'hbs');


app.get('/', (req, res) =>  {
    res.render("index", {
        nombre: "Jorge Abascal López"
    });
});


app.get('/about', (req, res) =>  {
    res.render("about", {
        nombre: "Jorge Abascal López"
    });
});


/*app.get('/perros', (req, res) =>  {
    res.send("Hola desde perros");
});*/
 
app.listen( port , () => {
    console.log(`Escuchando desde el puerto ${port}...`);
});