const Handlebars = require("handlebars")
const fs = require('fs');
const {join : j , resolve : r} = require("path")
const site = process.env.SITE || "/submit"

const root = r();

const layout = Handlebars.compile(read(j(root, "views", "layouts", "main.hbs")))
const index = Handlebars.compile(layout({
    body: read(j(root, "views", "index.hbs"))
}), {site})

makeFreshDir(j(root, "dist"))

fs.writeFileSync(j(root, "dist", "index.html"), index());

function read(file){
    return fs.readFileSync(file).toString();
}

function makeFreshDir(dir){
    if(fs.existsSync(dir)) fs.rmSync(dir, {recursive : true});
    if(!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive : true});
}