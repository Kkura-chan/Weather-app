const express = require("express");
const ejs = require("ejs");
const path = require("path");
const mainController = require("./controller/mainController");
const app = express();

const viewsPath = path.join("__dirname", "../views");

const publicPath = path.join("__dirname", "../public");
app.use(express.static(publicPath));

//set view engine
app.set("view engine", "ejs");
app.set("views", viewsPath);

//set router
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/weather", mainController.locationService);

app.get("/view", mainController.mapService);

app.get("/map", (req, res) => {
  res.render("map");
});

app.get("*", (req, res) => {
  res.render("404");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
