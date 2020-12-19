const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(express.static("./public"));
// create application/json parser
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

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
