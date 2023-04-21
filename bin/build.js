const Handlebars = require("handlebars")
const fs = require('fs');
const {join : j , resolve : r} = require("path")
const site = process.env.SITE || "/submit"

const root = r();

const layout = Handlebars.compile(read(j(root, "views", "layouts", "main.hbs")))
const index = Handlebars.compile(layout({
    body: read(j(root, "views", "index.hbs"))
}))
const indexhtm = index({site})

makeFreshDir(j(root, "dist"))
makeFreshDir(j(root, "public"))

fs.writeFileSync(j(root, "dist", "index.html"), indexhtm);
fs.writeFileSync(j(root, "public", "index.html"), indexhtm);

function read(file){
    return fs.readFileSync(file).toString();
}

function makeFreshDir(dir){
    if(fs.existsSync(dir)) fs.rmSync(dir, {recursive : true});
    if(!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive : true});
}