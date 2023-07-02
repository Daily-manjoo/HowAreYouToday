// const savedWeatherData = JSON.parse(localStorage.getItem("saved-weather"));
// const savedTodoList = JSON.parse(localStorage.getItem("saved-items"));

// const createTodo = function (storageData) {
//   let todoContents = todoInput.value;
//   if (storageData) {
//     todoContents = storageData.contents;
//   }
// };

// const weatherDataActive = function ({ location, weather, temperature }) {
//   const weatherMainList = ["Clear", "Clouds", "Drizzle", "Rain", "Snow", "Thunderstorm"];
//   weather = weatherMainList.includes(weather) ? weather : "Fog";
//   const locationNameTag = document.querySelector("#location-name-tag");
//   const temperatureTag = document.querySelector("#temperature-tag");

//   locationNameTag.textContent = location;

//   if (temperature) {
//     temperatureTag.textContent = `${temperature}°C`;
//   }

//   document.body.style.backgroundImage = `url('./images/${weather}.jpg')`;

//   if (
//     !savedWeatherData ||
//     savedWeatherData.location !== location ||
//     savedWeatherData.weather !== weather ||
//     savedWeatherData.temperature !== temperature
//   ) {
//     localStorage.setItem("saved-weather", JSON.stringify({ location, weather, temperature }));
//   }
// };

// const weatherSearch = function ({ latitude, longitude }) {
//   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7a940c40f2bbdfd8cbac5abf9a4bb2a6`)
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error("Failed to fetch weather data. Response status: " + res.status);
//       }
//       return res.json();
//     })
//     .then((json) => {
//       if (json.cod === 200) {
//         const temperature = json.main && json.main.temp ? Math.round(json.main.temp - 273.15) : undefined;
//         const weather = json.weather && json.weather.length > 0 ? json.weather[0].main : undefined;

//         if (json.name && weather && temperature !== undefined) {
//           const weatherData = {
//             location: json.name,
//             weather: weather,
//             temperature: temperature,
//           };
//           console.log("Weather Data:", weatherData);
//           weatherDataActive(weatherData);
//         }
//       }
//     });
// };

// const hiDiv = document.querySelector(".hiWeather");

// const accessToGeo = function ({ coords }) {
//   const { latitude, longitude } = coords;
//   const positionObj = {
//     latitude,
//     longitude,
//   };

//   weatherSearch(positionObj);
// };

// const askForLocation = function () {
//   navigator.geolocation.getCurrentPosition(accessToGeo, (err) => {
//     console.log(err);
//   });
// };

// askForLocation();

// if (savedWeatherData) {
//   weatherDataActive(savedWeatherData);
// }

// document.addEventListener("DOMContentLoaded", (event) => {
//   if (savedWeatherData) {
//     weatherDataActive(savedWeatherData);
//     hiDiv.textContent = `${savedWeatherData.weather} ${savedWeatherData.location} ${savedWeatherData.temperature}°C`;
//   } else {
//     hiDiv.textContent = "Loading...";
//   }
// });

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d4f4ee831ac62620a304680995373423`)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);
      const temp = json.main.temp;
      const mainTemp = temp - 273.15;
      const place = json.name;
      const main = json.weather[0].main;
      document.querySelector("#location-name-tag").textContent = "지역: " + place;
      document.querySelector("#temperature-tag").textContent = "온도: " + mainTemp.toFixed(2);
      console.log("현재 날씨:" + main);
      console.log("현재 위치:" + place);
      console.log(mainTemp.toFixed(2)); //소수 두번째 자리까지 표시
    });
}
const askForLocation = navigator.geolocation.getCurrentPosition(
  function (position) {
    console.log(position);
    const currentLat = String(position.coords.latitude);
    const currentLon = String(position.coords.longitude);
    getWeather(currentLat, currentLon);
  },
  function (error) {
    console.log("error");
  }
);

askForLocation();
