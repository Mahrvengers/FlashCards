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

/* middleware.. */

app.use((request, response, next) => {
    /* test for error handling */
    //let error = new Error("Oh noes. An error! Everyone to the escape pods!") 
    //error.status = 500;
    //next(error);
    //return;
    /**/

    console.log(request.originalUrl);
    next();
});

/* */

/* Error middleware */

app.use((error, request, response, next) => {
    
    response.locals.error = error;
    response.status(500);
    response.render("error");
    
});

/* */


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
    const username = request.cookies.username;

    if ( username !== undefined ) {
        response.redirect("/");
        return;
    }

    response.render("hello", { name: request.cookies.username });
});

app.post("/hello", (request, response) => {
    response.cookie("username", request.body.username);
    response.redirect("/");
});

app.post("/logout", (request, response) => {
    response.clearCookie("username");
    response.redirect("/hello");
});

/* Der 404 error handler wird ganz am Ende eingefügt,
   also auch nach den normalen Routes. 
   Damit wird er zuletzt ausgeführt, wenn sonst alles
   durch ist und damit wissen wir: für diesen Request
   gibt es keinen Handler..! 
 */

app.use((request, response, next) => {
    
    response.locals.error = new Error("Page not found");
    response.locals.error.status = 404;
    response.status(404);
    response.render("error");
    
});

/* */

app.listen(port);