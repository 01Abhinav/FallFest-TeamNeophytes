const path = require("path");
const app = express();
const port = 3000;
var express = require("express"), 
	mongoose = require("mongoose"), 
	passport = require("passport"), 
	bodyParser = require("body-parser"), 
	LocalStrategy = require("passport-local"), 
	passportLocalMongoose = 
	require("passport-local-mongoose"), 
	User = require("./models/user");
	//Change =  require("./models/hospital");/////////////////

/////
mongoose.set('useNewUrlParser', true); 
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true); 
mongoose.set('useUnifiedTopology', true); 
mongoose.connect("mongodb://localhost/auth_demo_app");
var db=mongoose.connection;///////////////////
/////


app.use(express.static("./public"));
// create application/json parser
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const sumBeds = 85;
  res.render("index", { totalBeds: sumBeds, totalVentilators: 40 });
});

app.get("/add", (req, res) => {
  res.render("form");
});

app.post("/add", (req, res) => {
  // add to database
  console.log(req.body);

  res.redirect("/");
});

app.get("/update", (req, res) => {
  res.render("update");
});

app.post("/update", (req, res) => {
  // add to database
  console.log(req.body);

  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  // add to database
  console.log(req.body);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//var app = express();
//app.set("view engine", "ejs"); 
//app.use(bodyParser.urlencoded({ extended: true })); 

/* app.use(require("express-session")({ 
	secret: "Rusty is a dog", 
	resave: false, 
	saveUninitialized: false
}));  */

app.use(passport.initialize()); 
app.use(passport.session()); 

passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 

//===================== 
// ROUTES 
//===================== 

// Showing home page 
app.get("/", function (req, res) { 
	res.render("home"); 
}); 

// Showing secret page 
app.get("/update", isLoggedIn, function (req, res) { 
	res.render("update"); 
}); 

// Showing register form 
app.get("/register", function (req, res) { 
	res.render("register"); 
}); 
// Handling user signup 
app.post("/register", function (req, res) { 
	username = req.body.username 
	var password = req.body.password
	var regno = req.body.regno
	User.register(new User({username: username,password: password,regno:regno}),password,function(err,user){
		if (err) { 
			console.log(err); 
			return res.render("register"); 
		} 

		passport.authenticate("local")( 
			req, res, function () { 
			res.render("home"); 
		}); 
	}); 
}); 

//Showing login form 
app.get("/login", function (req, res) { 
	res.render("login"); 
}); 

//Handling user login 
app.post("/login", passport.authenticate("local", { 
	successRedirect: "/update", 
	failureRedirect: "/login"
}), function (req, res) { 
	res.render("update")
}); 

//Handling update
/* var username="blah";
app.post('/update',function(req,res){
	var data = {
		Name: username,
		Beds: req.body.Beds,
		Vents: req.body.Vents,
		Surgeons: req.body.Surgeons,
		Doctors: req.body.Doctors,
		Cards: req.body.Cards,
		Psychs: req.body.Psychs,
		Orthos: req.body.Orthos,
		Gyns: req.body.Gyns
		}
	console.log(req.body.Beds);
	db.collection('hospitals').findOneAndUpdate({Name: username}, data, {upsert: true}, function(err, doc) {
		if (err) {console.log('dodo');return res.send(500, {error: err});}
		return res.send('Succesfully saved.');
	});
}) */














//Handling user logout 
app.get("/logout", function (req, res) { 
	req.logout(); 
	res.redirect("/"); 
}); 

function isLoggedIn(req, res, next) { 
	if (req.isAuthenticated()) return next(); 
	res.redirect("/login"); 
}

var port = process.env.PORT || 3000; 
app.listen(port, function () { 
	console.log("Server Has Started!"); 
}); 
