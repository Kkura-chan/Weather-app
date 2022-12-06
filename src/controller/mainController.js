const findByLocation = require("../utils/findByLocation");
const findByMap = require("../utils/findByMap");

const locationService = (req, res) => {
  if (!req.query.location) {
    return res.send({
      message: "Please fill in a location!",
    });
  }
  findByLocation(req.query.location, (message, data) => {
    if (message) {
      return res.send({ message });
    } else {
      return res.send(data);
    }
  });
};

const mapService = (req, res) => {
  findByMap(req.query.lat, req.query.lng, (message, data) => {
    if (message) {
      return res.send({ message });
    } else {
      return res.send(data);
    }
  });
};

const mainController = {
  locationService,
  mapService,
};

module.exports = mainController;
