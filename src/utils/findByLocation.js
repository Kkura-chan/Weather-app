const API_KEY = "aa0ee1354c25e2ae00a7d5d67dc450cd";
const request = require("request");

const findByLocation = function (location, callback) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&lang=vi&units=metric`;

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("Can't connect to the server!", undefined);
    } else {
      callback(undefined, res.body);
    }
  });
};

module.exports = findByLocation;
