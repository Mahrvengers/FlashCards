/**
 * Einstiegspunkt für den serverseitigen Code
 * 
 */

const express = require("express");

const app = express();

// Heroku setzt den Port nach eigenem Ermessen über eine 
// Umgebungsvariable PORT... 
let port = process.env.PORT || 3000;

app.get("/", (request, response) => {
    response.send("<h2>I luv da mahrvengers.</h2>");
});

app.get("/hello", (request, response) => {
    response.send("<h2>Hello world.</h2>");
});

app.listen(port);