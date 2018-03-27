/**
 * Einstiegspunkt für den serverseitigen Code
 * 
 */

const express = require("express");

const app = express();

// Heroku setzt den Port nach eigenem Ermessen über eine 
// Umgebungsvariable PORT... 
let port = process.env.PORT || 3000;

app.listen(port);