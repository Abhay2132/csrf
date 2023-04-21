const express = require("express")
const {Router} = express
const site = process.env.SITE || "/submit"
var beautify = require("json-beautify");
 
router = Router();

router.use((req, res, next) => {
    let it = performance.now();
    res.on("finish", () => {
        console.log(res.statusCode, req.method, req.url, (performance.now() - it).toFixed(2) + "ms");
    })
    res.sendJson = sendJson;
    next();
})

router.post("/submit", (req, res) => {
    // console.log("post /submit");
    res.sendJson({ ...req.body, cookies: req.headers.cookie })
})

router.get("/cookies", (req, res) => { 
    // console.log(req.headers.cookie)
    res.sendJson({ cookie:req.headers.cookie});
});

router.get("/", (req,res)=>{
    // console.log({site})
    res.render("index", {site})
})

module.exports = router;

function sendJson(obj){
    if(typeof obj != "object") return this.end(obj);
    
    let json = beautify(obj, null, 2, 80)
    this.setHeader("Content-Type", "application/json")
    this.setHeader("Content-Length", json.length)

    this.end(json)
}