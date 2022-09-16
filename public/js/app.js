const container = document.querySelector(".container");

const btn_location = document.querySelector(".btn-location");
const btn_map = document.querySelector(".btn-map");
const btn_search = document.querySelector(".btn-search");

const search_form = document.querySelector(".search-form");
const search_input = document.querySelector(".search-input");

const details = document.querySelector(".details");

btn_location.addEventListener("click", function (e) {
  if (search_form.classList.contains("none")) {
    search_form.classList.remove("none");
  } else {
    search_form.classList.add("none");
  }
});

search_form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const location = search_input.value;
  const res = await fetch(`http://localhost:3000/weather?location=${location}`);
  const data = await res.json();
  const details = document.querySelector(".details");
  if (details) {
    details.classList.add("none");
  }
  if (data.message) {
    const html = `<div class="details"><span class="err-msg">${data.message}</span></div>`;
    search_form.insertAdjacentHTML("afterEnd", html);
    search_input.value = "";
    return;
  }
  const html = `<div class="details">
  <div class="time">${new Date(data.dt * 1000).toLocaleTimeString()}</div>
  <div class="place">${data.name}-${data.sys.country}</div>
  <div class="temp">${data.main.temp}°C</div>
  <div class="description" style="display:flex">${
    data.weather[0].description
  } <img src="../img/${data.weather[0].icon}@2x.png" style="width:25px"/></div>
  <div class="humidity">Độ ẩm ${data.main.humidity}%</div>
    </div>`;

  search_form.insertAdjacentHTML("afterEnd", html);
  search_input.value = "";
});
