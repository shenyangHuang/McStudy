var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.set("view engine", "ejs");
//order of routes matters, always put important route first
// "/" => "Hi there"

var friends = [];


app.get("/", function(req, res){
	res.render("home");
});

app.post("/addfriend", function(req, res){
	var newFriend = req.body.newfriend;
	friends.push(newFriend);
	res.send("You are trying to post");
});


app.get("/friends", function(req, res){
	res.render("friends", {friends: friends});
});
//pattern match page
app.get("/lib/:libName", function(req, res){
	var libName = req.params.libName;
	res.render("lib", {libName: libName});
});




//error message page
app.get("*", function(req,res){
	res.send("You current request is not supported")
});



// 3000 is the set port number
app.listen(8100, process.env.IP, function(){
	console.log("listening service has started");
});

