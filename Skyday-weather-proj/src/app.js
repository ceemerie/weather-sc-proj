let now = new Date();

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

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();

let currentDate = document.querySelector("div.main-city");
currentDate.innerHTML = `${day}, ${month} ${date}, ${hour}:${minutes}`;

//week 4 & 5- showing city
function displayWeatherCond(response) {
  console.log(response.data.name);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#icon-temp").innerHTML = Math.round(
    response.data.main.temp
  );

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
