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
      <div class="date">${new Intl.DateTimeFormat(data.sys.country, {
        dateStyle: "full",
        timeStyle: "long",
      }).format(data.dt * 1000)}</div>
      <div class="place">${data.name}-${data.sys.country}</div>
      <div class="temp">${data.main.temp}°C</div>
      <div class="humidity">Độ ẩm ${data.main.humidity}%</div>
      <div class="description" style="display:flex">${
        data.weather[0].description
      } <img src="../img/${
        data.weather[0].icon
      }@2x.png" style="width:100px" /></div>
        </div>`;
      home_page.insertAdjacentHTML("afterEnd", html);
    });
  });
}
