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

//아래부터 날씨api

const savedWeatherData = JSON.parse(localStorage.getItem("saved-weather"));
const savedTodoList = JSON.parse(localStorage.getItem("saved-items"));

const createTodo = function (storageData) {
  let todoContents = todoInput.value;
  if (storageData) {
    todoContents = storageData.contents;
  }
};

const weatherDataActive = function ({ location, weather }) {
  const weatherMainList = ["Clear", "Clouds", "Drizzle", "Rain", "Snow", "Thunderstorm"];
  weather = weatherMainList.includes(weather) ? weather : "Fog";
  const locationNameTag = document.querySelector("#location-name-tag");

  locationNameTag.textContent = location;
  document.body.style.backgroundImage = `url('./images/${weather}.jpg')`;

  if (!savedWeatherData || savedWeatherData?.location !== location || savedWeatherData?.weather !== weather) {
    localStorage.setItem("saved-weather", JSON.stringify({ location, weather }));
  }
};

const weatherSearch = function ({ latitude, longitude }) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid={API Key}`)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      const weatherData = {
        location: json.name,
        weather: json.weather[0].main,
      };
      weatherDataActive(weatherData);
    })
    .catch((err) => {
      console.log(err);
    });
};

const hiDiv = document.querySelector(".hi");

window.addEventListener("DOMContentLoaded", (event) => {
  hiDiv.textContent = weatherData.weather;
});

const accessToGeo = function ({ coords }) {
  const { latitude, longitude } = coords;
  // shorthand property
  const positionObj = {
    latitude,
    longitude,
  };

  weatherSearch(positionObj);
};

const askForLocation = function () {
  navigator.geolocation.getCurrentPosition(accessToGeo, (err) => {
    console.log(err);
  });
};
askForLocation();
if (savedWeatherData) {
  weatherDataActive(savedWeatherData);
}
