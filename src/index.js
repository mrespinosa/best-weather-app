let now = new Date();
let dateToday = document.querySelector("#date-today");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
dateToday.innerHTML = `${day} ${hours}:${minutes}`;

function showTemperature(response) {
  document.querySelector("#city-entered").innerHTML = response.data.name;
  document.querySelector("#city-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#city-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  fahrenheitTemperature = response.data.main.temp;
  document.querySelector("#temperature-today").innerHTML = Math.round(
    fahrenheitTemperature
  );
  document.querySelector("#condition-today").innerHTML =
    response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );
}
function search(city) {
  let apiKey = "d623ebf54f63b0240f122eda2edf85ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function requestCityTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function showPosition(position) {
  let apiKey = "d623ebf54f63b0240f122eda2edf85ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature-today");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function showFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature-today");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let city = document.querySelector("#enter-city");
city.addEventListener("submit", requestCityTemp);

let locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", getCurrentLocation);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let fahrenheitTemperature = null;

search("New York");
