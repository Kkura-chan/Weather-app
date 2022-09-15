const API_KEY = "aa0ee1354c25e2ae00a7d5d67dc450cd";
const request = require("request");

const findMap = function (lat, lon, callback) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=vi`;

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("Không thể kết nối đến máy chủ", undefined);
    } else if (res.message) {
      callback("Không tìm thấy nơi cần tìm", undefined);
    } else {
      callback(undefined, res.body);
    }
  });
};

module.exports = findMap;


