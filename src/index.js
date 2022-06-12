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
  console.log(response.data);
  document.querySelector("#city-entered").innerHTML = response.data.name;
  document.querySelector("#city-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#city-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#temperature-today").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#condition-today").innerHTML =
    response.data.weather[0].description;
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

let city = document.querySelector("#enter-city");
city.addEventListener("submit", requestCityTemp);

let locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", getCurrentLocation);

search("New York");
