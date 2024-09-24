var findInput = document.getElementById("findInput");
var today = document.getElementById("today");
var datebsday = document.getElementById("datebsday");
var databsmonth = document.getElementById("databsmonth");
var locationbg = document.getElementById("locationbg");
var numbg = document.getElementById("numbg");
var clearbg = document.getElementById("clearbg");
var humiditybg = document.getElementById("humiditybg");
var windespeedtoday = document.getElementById("windespeedtoday");
var directiontoday = document.getElementById("directiontoday");
var imgtoday = document.getElementById("forecastbg");
var forecastday = document.getElementById("forecastday");
var forecasticon = document.getElementById("forecasticon");
var degreetempmax = document.getElementById("degreetempmax");
var degreetempmin = document.getElementById("degreetempmin");
var customsunny = document.getElementById("customsunny");
var forecastaftertomoro = document.getElementById("forecastaftertomoro");
var degreemax = document.getElementById("degreemax");
var degreemin = document.getElementById("degreemin");
var cusunny = document.getElementById("cusunny");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (pos) {
    var latitude = pos.coords.latitude;
    var longitude = pos.coords.longitude;

    getWeatherData(`${latitude},${longitude}`);
  });
} else {
  alert(`geolocation not in pc`);
}

async function getWeatherData(query) {
  var res =
    await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=4d15b8da2bc4442a9f7172458242309
`);
  var data = await res.json();

  displayTOdayWeather(data);
  displayTommoro(data);
  displayAfterTommoro(data);
}

findInput.addEventListener("input", function (eventinfo) {
  getWeatherData(eventinfo.target.value);
});

function displayTOdayWeather(data) {
  console.log(data, "from displayTOdayWeather");

  var datetoday = data.current.last_updated;
  var date = new Date(datetoday);
  var todayWeekDay = date.toLocaleString(`en-us`, { weekday: `long` }); // اسم يوم الاسبوع
  var todayDay = date.getDate(); // يوم كام ف الشهر
  var todayMonth = date.toLocaleString(`en-us`, { month: `long` }); // اسم الشهر
  var cityName = data.location.name;
  var temp = data.current.temp_c;
  var clear = data.current.condition.text;
  var humidity = data.current.humidity;
  var windespeed = data.current.wind_kph;
  var direction = data.current.wind_dir;
  var imgDay = data.current.condition.icon;

  datebsday.innerHTML = todayWeekDay;
  databsmonth.innerHTML = `${todayDay} ${todayMonth}`;
  locationbg.innerHTML = cityName;

  numbg.innerHTML = `${temp}<sup>o</sup>C`;
  clearbg.innerHTML = clear;
  humiditybg.innerHTML = ` <img src="assets/img/icon-umberella.png" alt=""> ${humidity}%`;
  windespeedtoday.innerHTML = ` <img src="assets/img/icon-wind.png" alt=""> ${windespeed}km/h`;
  directiontoday.innerHTML = `<img src="assets/img/icon-compass.png" alt=""> ${direction}`;
  imgtoday.setAttribute(`src`, imgDay);
}

function displayTommoro({ forecast }) {
  console.log(forecast, "forcast");

  forecastday.innerHTML = new Date(forecast.forecastday[1].date).toLocaleString(
    "en-us",
    { weekday: "long" }
  );

  forecasticon.setAttribute(`src`, forecast.forecastday[1].day.condition.icon);
  degreetempmax.innerHTML = `${forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C`;
  degreetempmin.innerHTML = `${forecast.forecastday[1].day.mintemp_c}<sup>o</sup>`;
  customsunny.innerHTML = forecast.forecastday[1].day.condition.text;
}

function displayAfterTommoro({ forecast }) {
  forecastaftertomoro.innerHTML = new Date(
    forecast.forecastday[2].date
  ).toLocaleString("en-us", { weekday: "long" });

  forecasticon.setAttribute(`src`, forecast.forecastday[2].day.condition.icon);
  degreemax.innerHTML = `${forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C`;
  degreemin.innerHTML = `${forecast.forecastday[2].day.mintemp_c}<sup>o</sup>`;
  cusunny.innerHTML = forecast.forecastday[2].day.condition.text;
}
