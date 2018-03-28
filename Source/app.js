/**
 * Einstiegspunkt für den serverseitigen Code
 * 
 */

const express = require("express");
var path = require('path');

const app = express();
app.set("view engine", "pug");
app.set('views', path.join(__dirname, './views'));

// Heroku setzt den Port nach eigenem Ermessen über eine 
// Umgebungsvariable PORT... 
let port = process.env.PORT || 3000;

app.get("/", (request, response) => {
    response.render("index");
});

app.get("/cards", (request, response) => {
    response.render("card", {
        prompt : "Who is buried in Grant's tomb?",
        hint : "Whose tomb is it?"
    });
});

app.listen(port);