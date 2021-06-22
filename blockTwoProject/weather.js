const migraineButton = document.getElementById('migraineBtn');
const currentTemp_elmnt = document.getElementById('currentTemp');

window.navigator.geolocation.getCurrentPosition(fetchWeatherByCoord);

function fetchWeatherByCoord (pos) {
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=51c68784f1251d893077cc4f52143c83`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        currentTemp_elmnt.textContent = kelvinToFaherenheit(data.main.temp);
    });
}

function fetchWeatherByCityState(city, state) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=51c68784f1251d893077cc4f52143c83`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        currentTemp_elmnt.textContent = kelvinToFaherenheit(data.main.temp);
    });
}

function kelvinToFaherenheit(temp){
    return (temp - 273.15) * 1.8 + 32;
}