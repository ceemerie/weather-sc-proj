function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//showing city and date
function displayWeatherCond(response) {
  console.log(response.data.name);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#icon-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  //Humidity & wind
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

//show celsius

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#icon-temp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature - 32) / 1.8);
}

//show city

function showCity(event) {
  event.preventDefault();
  let apiKey = "97bd85c32c1ec21b87b19aebc5449af9";
  let inputCity = document.querySelector("#input-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCond);

  let h1 = document.querySelector("h1");
  h1.innerHTML = inputCity.value;
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", showCity);

//current location
function searchLocation(position) {
  let apiKey = "97bd85c32c1ec21b87b19aebc5449af9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeatherCond);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// celsius link
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let city = "#input-city";
let units = "imperial";
