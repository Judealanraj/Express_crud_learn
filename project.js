const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");
require("dotenv").config();


const app = express();

//create port
const port = process.env.port || 5000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//use static files in express
app.use(express.static("public"));

//Template engin to render css stylings
const handlebars = exphbs.create({extname:".hbs"});
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");




const routes = require("./server/routes/users");
app.use('/',routes);
//listen to port
app.listen(port,()=>{
    console.log("Listening Port : "+port)
});



