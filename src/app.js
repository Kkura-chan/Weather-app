const express = require("express");
const ejs = require("ejs");
const path = require("path");
const findLocation = require("./utils/findLocation");
const findMap = require("./utils/findMap");
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

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      message: "Please fill in a location!",
    });
  }
  findLocation(req.query.location, (message, data) => {
    if (message) {
      return res.send({ message });
    } else {
      return res.send(data);
    }
  });
});

app.get("/view", (req, res) => {
  findMap(req.query.lat, req.query.lng, (message, data) => {
    if (message) {
      return res.send({ message });
    } else {
      return res.send(data);
    }
  });
});

app.get("/map", (req, res) => {
  res.render("map");
});

app.get("*", (req, res) => {
  res.render("404");
});

const port = 3000;
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
