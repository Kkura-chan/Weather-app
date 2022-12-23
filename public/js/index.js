const container = document.querySelector(".container");

const btn_location = document.querySelector(".btn-location");
const btn_map = document.querySelector(".btn-map");
const btn_search = document.querySelector(".btn-search");

const search_form = document.querySelector(".search-form");
const search_input = document.querySelector(".search-input");

search_form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const location = search_input.value;
  const res = await fetch(`/weather?location=${location}`);
  const data = await res.json();
  const details = document.querySelector(".details");
  if (details) {
    details.remove();
  }
  if (data.message) {
    const html = `<div class="details err"><span class="err-msg">${data.message}</span></div>`;
    search_form.insertAdjacentHTML("afterEnd", html);
    search_input.value = "";
    return;
  }
  function calcTime(offset) {
    // create Date object for current location
    var d = new Date();

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + 3600000 * offset);

    // return time as a string
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return nd.toLocaleString(options);
  }
  const dateTime = calcTime(data.timezone / 3600);
  const html = `
<div class="details">
  <div class="top">
    <div>
      <p class="date">${dateTime}</p>
      <p class="place">${data.name}-${data.sys.country}</p>
      <p class="description">${data.weather[0].description}</p>
    </div>
    <img alt="weather" class="weather-icon" src="../img/${
      data.weather[0].icon
    }@2x.png"/>
  </div>
  <div class="bottom">
    <p class="temp">${data.main.temp}°C</p>
    <div class="more-details">
      <div class="parameter-row">
        <span class="parameter-label">Độ ẩm</span>
        <span class="parameter-value">${data.main.humidity}%</span>
      </div>
      <div class="parameter-row">
        <span class="parameter-label">Tầm nhìn xa trên</span>
        <span class="parameter-value">${data.visibility / 1000} Km</span>
      </div>
      <div class="parameter-row">
        <span class="parameter-label">Nhiệt độ cao nhất</span>
        <span class="parameter-value">${data.main.temp_max}°C</span>
      </div>
      <div class="parameter-row">
        <span class="parameter-label">Sức gió</span>
        <span class="parameter-value">${data.wind.speed} m/s</span>
      </div>
    </div>
  </div>

</div>`;
  search_form.insertAdjacentHTML("afterEnd", html);
  search_input.value = "";
});
