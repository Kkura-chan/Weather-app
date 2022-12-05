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
      const res = await fetch(
        `http://localhost:3000/view?lat=${lat}&lng=${lng}`
      );
      const data = await res.json();
      const home_page = document.querySelector(".home-page");
      const details = document.querySelector(".details");
      if (details) {
        details.remove();
      }
      const html = `<div class="details">
      <div class="top">
        <div>
          <p class="date">${new Intl.DateTimeFormat(data.sys.country, {
            dateStyle: "full",
            timeStyle: "medium",
          }).format(data.dt * 1000)}</p>
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
          <span class="parameter-label">Nhiệt độ thấp nhất</span>
          <span class="parameter-value">${data.main.temp_min}°C</span>
          </div>
        </div>
      </div>
    
    </div>`;
      home_page.insertAdjacentHTML("afterEnd", html);
    });
  });
}
