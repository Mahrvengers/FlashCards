/**
 * Einstiegspunkt für den serverseitigen Code
 * 
 */

const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "pug");
app.set('views', path.join(__dirname, './views'));

// Heroku setzt den Port nach eigenem Ermessen über eine 
// Umgebungsvariable PORT... 
let port = process.env.PORT || 3000;

app.get("/", (request, response) => {
    let username = request.cookies.username;

    if (username === undefined) {
        response.redirect("/hello");
        return;
    }

    response.render("index", { name: username });
});

app.get("/cards", (request, response) => {
    response.render("card", {
        prompt: "Who is buried in Grant's tomb?",
        hint: "Whose tomb is it?"
    });
});

app.get("/hello", (request, response) => {
    response.render("hello", { name: request.cookies.username });
});

app.post("/hello", (request, response) => {
    response.cookie("username", request.body.username);
    response.redirect("/");
});

app.listen(port);