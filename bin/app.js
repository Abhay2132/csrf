const express = require("express")
const app = express();
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

module.exports = app;