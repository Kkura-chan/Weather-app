const container = document.querySelector(".container");

const btn_location = document.querySelector(".btn-location");
const btn_map = document.querySelector(".btn-map");
const btn_search = document.querySelector(".btn-search");

const search_form = document.querySelector(".search-form");
const search_input = document.querySelector(".search-input");

search_form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const location = search_input.value;
  const res = await fetch(`http://localhost:3000/weather?location=${location}`);
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
  const html = `
<div class="details">
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
        <span class="parameter-value">${data.main.temp_min}</span>
      </div>
    </div>
  </div>

</div>`;
  search_form.insertAdjacentHTML("afterEnd", html);
  search_input.value = "";
});
