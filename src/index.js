function newWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let cityElement = document.querySelector("#city");
  let searchInputElement = document.querySelector("#search-input");
  let emojiElement = document.querySelector("#emoji");

  let city = searchInputElement.value;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  emojiElement.innerHTML = `<img src="${response.data.condition.emoji_url}" class="emoji" />`;
  axios.get(apiUrl).then(newWeather);
  cityElement.innerHTML = city;
  getForecast(response.data.city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function searchCity(city) {
  let apiKey = "t12ab478ea9e3e17dd09edoc3cbff520";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(newWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "t12ab478ea9e3e17dd09edoc3cbff520";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let days = ["Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="row">
        <div class="col-2">
          <div class="forecast-day">
            ${day}
          </div>
    <img src="https://img.freepik.com/premium-vector/sun-with-cloud-illustration_637394-1545.jpg?w=740" alt="" width="30px"/>
    <div class="forecast-temperature">
      <span class="forecast-temperature-max">
        18°
      </span>
      <span class="forecast-temperature-min">
        12°
      </span> 
    </div>
    </div>
    </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

displayForecast();
