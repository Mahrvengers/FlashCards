/**
 * Einstiegspunkt für den serverseitigen Code
 * 
 */

const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded( { extended : false } ));
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

app.get("/hello", (request, response) => {
    response.render("hello", {});
});

app.post("/hello", (request, response) => {
    response.render("hello", { name : request.body.username });
});

app.listen(port);