// render map
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const map = L.map("map").setView([lat, lng], 6);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    let marker = L.marker([lat, lng]).addTo(map).openPopup();
    map.on("click", async function (mapEvent) {
      if (marker !== null) {
        map.removeLayer(marker);
      }
      const { lat, lng } = mapEvent.latlng;
      marker = L.marker([lat, lng]).addTo(map);
      const res = await fetch(`/view?lat=${lat}&lng=${lng}`);
      const data = await res.json();
      const home_page = document.querySelector(".home-page");
      const details = document.querySelector(".details");
      if (details) {
        details.remove();
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
      const html = `<div class="details">
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
        <span class="parameter-label">Tầm nhìn</span>
        <span class="parameter-value">${data.visibility / 1000} Km</span>
          </div>
          <div class="parameter-row">
          <span class="parameter-label">Nhiệt độ cao nhất</span>
          <span class="parameter-value">${data.main.temp_max}°C</span>
          </div>
          <div class="parameter-row">
          <span class="parameter-label">Sức gió</span>
          <span class="parameter-value">${data.wind.speed} m/s </span>
          </div>
        </div>
      </div>
    
    </div>`;
      home_page.insertAdjacentHTML("afterEnd", html);
    });
  });
}
