const express = require("express")
const app = express();
// import express from 'express';
// import { engine } from 'express-handlebars';
const {engine } = require("express-handlebars")

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(require("./router"))
app.use(express.static(__dirname + "/public"))

app.listen(3000, () => {
    console.log("API server started at http://localhost:3000");
})