var express = require("express");
var app = express();

//order of routes matters, always put important route first
// "/" => "Hi there"
app.get("/", function(req, res){
	res.render("home.ejs");
});

//pattern match page
app.get("/lib/:libName", function(req, res){
	var libName = req.params.libName;

	res.render("lib.ejs", {libName: libName});
});




//error message page
app.get("*", function(req,res){
	res.send("You current request is not supported")
});



// 3000 is the set port number
app.listen(8100, process.env.IP, function(){
	console.log("listening service has started");
});

