// initialize
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

// creating arrays for the list
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

// setting up route
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// Main page
app.get("/", function(req, res) {
  const day = date.getDate();
  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {
  const item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
  res.redirect("/");
})

// Work page
app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
})

app.post("/work", function(req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

// About page
app.get("/about", function(req, res) {
  res.render("about")
})

// Host
app.listen(3000, function() {
  console.log("server started on port 3000");
});
