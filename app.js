var express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
methodOverride = require("method-override"),
app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"));


app.set("view engine", "ejs");


//db section
//Hosted mongoose database
mongoose.connect('mongodb://Andy:Mchacks2019@ds119755.mlab.com:19755/mcstudy');

//defining schema for a user
var profileSchema = new mongoose.Schema({
	UID: Number,
	Name: String,
	email: String,
	year: {type: String, default: "unspecified"},
	classes: {type: Array, default: []},
	friends: {type: Array, default: []}
});

var Profile = mongoose.model("Profile", profileSchema);

//defining schema for a class
var courseSchema = new mongoose.Schema({
	CID: String,
	students: Array
});

var Course = mongoose.model("Course", courseSchema);






// var andy = new Profile({
// 	UID: "1",
// 	Name: "Andy",
// 	age: 20,
// 	friends: ["Yunxi", "Dylan"]
// });

// // andy.save(function(err, profile){
// // 	if(err){
// // 		console.log("Error Encountered!");
// // 	} else {
// // 		console.log("Saving profile to DB");
// // 		console.log(profile);
// // 	}
// // });


// //create function
// Profile.create({
// 	UID: "1",
// 	Name: "Andy",
// 	age: 20,
// 	friends: ["Yunxi", "Dylan"]
// }, function(err, profile){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(profile);
// 	}
// });


// //retrieve all info from database
// Profile.find({}, function(err, profiles){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log()
// 	}
// })



//RESTFUL Routes

//order of routes matters, always put important route first
// "/" => "Hi there"

//RESTFUL Routes
app.get("/", function(req, res){
	res.render("home");
});

// INDEX Route
app.get("/courses", function(req, res){

	Course.find({}, function(err, Allcourses){
		if(err){
			console.log("can't load courses");
		} else {
			res.render("index", {courses: Allcourses});
		}
	});

});

// NEW Route
app.get("/courses/new", function(req, res){
	res.render("new");
});

// CREATE Route
app.post("/courses", function(req, res){
	//create a new course
	Course.create(req.body.course, function(err, newCourse){
		if(err){
			res.render("new");
		} else{
			res.redirect("/courses");
		}
	});
});

// SHOW ROUTE
app.get("/courses/:id", function(req, res){
	Course.findById(req.params.id, function(err, foundCourse){
		if(err){
			res.redirect("/courses");
		} else {
			res.render("show", {course: foundCourse});
		}
	});
});

// EDIT Route
app.get("/courses/:id/edit", function(req, res){
	Course.findById(req.params.id, function(err, foundCourse){
		if(err){
			res.redirect("/courses");
		} else {
			res.render("edit", {course: foundCourse});
		}
	});
});

//Update Route
app.put("/courses/:id", function(req, res){
	Course.findByIdAndUpdate(req.params.id, req.body.course, function(err, updatedCourse){
		if(err){
			console.log(err);
			res.redirect("/courses");
		} else {
			res.redirect("/courses/" + req.params.id);
		}
	});
});



app.get("/signup", function(req, res){
	//show all available classes 
	Course.find({}, function(err, Allcourses){
		if(err){
			console.log("can't load classes");
		} else {
			res.render("signup", {courses:Allcourses});
		}
	})
});

app.post("/signup", function(req, res){
	var UID = req.body.UID;
	var Name = req.body.Name;
	var email = req.body.email;
	var year = req.body.year;
	var classes = req.body.classes;

	var newUsr = {
		UID: UID,
		Name: Name,
		email: email,
		year: year,
		classes: [classes],
	};

	Profile.create(newUsr, function(err, created){
		if(err){
			console.log(err);
		} else {

			var newCourse = {
				CID: classes,
				students: [Name]
			}
			//also post to Class
			Course.create(newCourse);
			res.redirect("/signup");
		}
	})
});



// app.post("/addfriend", function(req, res){
// 	var newFriend = req.body.newfriend;
// 	friends.push(newFriend);
// 	res.redirect("/friends");
// });

app.get("/friends", function(req, res){
	res.render("friends", {friends: friends});
});
// //pattern match page
// app.get("/lib/:libName", function(req, res){
// 	var libName = req.params.libName;
// 	res.render("lib", {libName: libName});
// });




//error message page
app.get("*", function(req,res){
	res.send("You current request is not supported")
});



// 3000 is the set port number
app.listen(8100, process.env.IP, function(){
	console.log("McStudy server has started");
});

