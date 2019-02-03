var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();

//db section
//Hosted mongoose database
mongoose.connect('mongodb://Andy:Mchacks2019@ds119755.mlab.com:19755/mcstudy');

//defining schema for a user
var profileSchema = new mongoose.Schema({
	UID: Number,
	Name: String,
	age: Number,
	friends: Array,
})

var Profile = mongoose.model("Profile", profileSchema);

var andy = new Profile({
	UID: "1",
	Name: "Andy",
	age: 20,
	friends: ["Yunxi", "Dylan"]
});

// andy.save(function(err, profile){
// 	if(err){
// 		console.log("Error Encountered!");
// 	} else {
// 		console.log("Saving profile to DB");
// 		console.log(profile);
// 	}
// });


//create function
Profile.create({
	UID: "1",
	Name: "Andy",
	age: 20,
	friends: ["Yunxi", "Dylan"]
}, function(err, profile){
	if(err){
		console.log(err);
	} else {
		console.log(profile);
	}
});


//retrieve all info from database
Profile.find({}, function(err, profiles){
	if(err){
		console.log(err);
	} else {
		console.log()
	}
})











//routing section
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
	res.redirect("/friends");
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
	console.log("McStudy server has started");
});

