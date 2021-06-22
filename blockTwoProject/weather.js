const migraineButton = document.getElementById('migraineBtn');
const currentTemp_elmnt = document.getElementById('currentTemp');
const currentPressure_elmnt = document.getElementById('currentPressure');

migraineButton.addEventListener('click', startWeatherFetch);

function startWeatherFetch(){
    window.navigator.geolocation.getCurrentPosition(fetchWeatherByCoord, fetchWeatherByCityState);
}

function fetchWeatherByCoord (pos) {
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;

    let startTime = ~~(Date.now() / 1000) - 1440 * 60;

    fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${long}&dt=${startTime}&appid=51c68784f1251d893077cc4f52143c83`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        currentTemp_elmnt.textContent = kelvinToFaherenheit(data.current.temp);
        currentPressure_elmnt.textContent = pascalToMercury(data.current.pressure);
    });
}

function fetchWeatherByCityState() {
    //Get values from page elements

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=51c68784f1251d893077cc4f52143c83`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        currentTemp_elmnt.textContent = kelvinToFaherenheit(data.main.temp);
    });
}

function fetchOneHourWeather(){

}

function kelvinToFaherenheit(temp){
    return Math.trunc((temp - 273.15) * 1.8 + 32);
}

function pascalToMercury(pressure){
    return (pressure * 0.02953).toFixed(2);
}