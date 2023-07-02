var slides = document.querySelector(".new-item-list"),
  slide = document.querySelectorAll(".new-item-list li"),
  currentIdx = 0,
  slideCount = slide.length,
  prevBtn = document.querySelector("#prev"),
  slideWidth = 250,
  slideMargin = 100,
  nextBtn = document.querySelector("#next");

slides.style.width = (slideWidth + slideMargin) * slideCount - slideMargin + "px";

function moveSlide(num) {
  slides.style.left = -num * 350 + "px";
  currentIdx = num;
}

nextBtn.addEventListener("click", function () {
  if (currentIdx < slideCount - 4) {
    moveSlide(currentIdx + 1);
  } else {
    moveSlide(0);
  }
});

prevBtn.addEventListener("click", function () {
  if (currentIdx > 0) {
    moveSlide(currentIdx - 1);
  } else {
    moveSlide(slideCount - 5);
  }
});

//회원정보
const user = JSON.parse(sessionStorage.getItem("user"));
console.log(user);

//아래부터 날씨api

const savedWeatherData = JSON.parse(localStorage.getItem("saved-weather"));
const savedTodoList = JSON.parse(localStorage.getItem("saved-items"));

const createTodo = function (storageData) {
  let todoContents = todoInput.value;
  if (storageData) {
    todoContents = storageData.contents;
  }
};

// const weatherDataActive = function ({ location, weather }) {
//   const weatherMainList = [
//     "Clear",
//     "Clouds",
//     "Drizzle",
//     "Rain",
//     "Snow",
//     "Thunderstorm",
//   ];
//   weather = weatherMainList.includes(weather) ? weather : "Fog";
//   const locationNameTag = document.querySelector("#location-name-tag");

//   locationNameTag.textContent = location;
//   document.body.style.backgroundImage = `url('./images/${weather}.jpg')`;

//   if (
//     !savedWeatherData ||
//     savedWeatherData?.location !== location ||
//     savedWeatherData?.weather !== weather
//   ) {
//     localStorage.setItem(
//       "saved-weather",
//       JSON.stringify({ location, weather })
//     );
//   }
// };

// const weatherSearch = function ({ latitude, longitude }) {
//   fetch(
//     `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid={API Key}`
//   )
//     .then((res) => {
//       return res.json();
//     })
//     .then((json) => {
//       const weatherData = {
//         location: json.name,
//         weather: json.weather[0].main,
//       };
//       weatherDataActive(weatherData);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const hiDiv = document.querySelector(".hi");

// window.addEventListener("DOMContentLoaded", (event) => {
//   hiDiv.textContent = weatherData.weather;
// });

// const accessToGeo = function ({ coords }) {
//   const { latitude, longitude } = coords;
//   // shorthand property
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
      document.querySelector("#yourLocation").textContent = place;
      document.querySelector("#yourTemp").textContent = mainTemp.toFixed(0) + `도`;
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
