const api = {
  key: "5cad8cd8cb6e24a608015746b35826d3",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchBox.value);
    console.log(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((res) => {
      return res.json();
    })
    .then(getWeather);
}

function getWeather(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");

  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");

  date.innerHTML = dateBuilder(now);
  console.log(now);

  let temp = document.querySelector(".temp");

  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°</span>c`;

  let weatherE1 = document.querySelector(".weather");
  weatherE1.innerHTML = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");

  hilow.innerHTML = `${Math.round(
    weather.main.temp_min
  )} <span>°</span>c / ${Math.round(weather.main.temp_max)} <span>°</span>c`;
}

function dateBuilder(s) {
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
    "October ",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  console.log(s);

  let day = days[s.getDay()];
  let date = s.getDate();
  let month = months[s.getMonth()];
  let year = s.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
