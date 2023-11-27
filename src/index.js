function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#current-city");
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;
  let apiKey = "t12ab478ea9e3e17dd09edoc3cbff520";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  cityElement.innerHTML = city;
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

function displayForecast {
  let forecast = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function(day) {
    forecastHtml = forecastHtml +
    "
    <div class="row">
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
    ;
  });

  forecastElement.innerHTML = forecastHtml;
}

displayForecast();


