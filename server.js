//-----  dependencies--------

var express = require("express");

//creating our server with node.
var app = express();

//our listener port ..
var PORT = process.env.PORT || 8080;

//express boiler plate cont.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//requiring our routes for the proper navigation of webpages.
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//Listener that will let us know if our server is running || started  :) 

app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
});