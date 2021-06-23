const migraineButton = document.getElementById('migraineBtn');

const currentTemp_elmnt = document.getElementById('currentTemp');
const currentPressure_elmnt = document.getElementById('currentPressure');

const hourTemp_elmnt = document.getElementById('hourTemp');
const hourPressure_elmnt = document.getElementById('hourPressure');

migraineButton.addEventListener('click', startWeatherFetch);

function startWeatherFetch(){
    window.navigator.geolocation.getCurrentPosition(fetchWeatherByCoord, fetchWeatherByCityState);
}

function fetchWeatherByCoord (pos) {
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;

    let adjustedNow = ~~(Date.now() / 1000);
    let pastDay = adjustedNow - 1440 * 60;

    console.log("Requested Now: " + adjustedNow);

    let currentData = "";
    let pastData = "";

    // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=51c68784f1251d893077cc4f52143c83`)
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    //     currentData = data;
    //     currentTemp_elmnt.textContent = kelvinToFaherenheit(data.main.temp);
    //     currentPressure_elmnt.textContent = pascalToMercury(data.main.pressure);
    // });

    fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${long}&dt=${adjustedNow}&appid=51c68784f1251d893077cc4f52143c83`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        currentTemp_elmnt.textContent = kelvinToFaherenheit(data.current.temp);
        currentPressure_elmnt.textContent = pascalToMercury(data.current.pressure);

        let pastHourData = "";

        data.hourly.forEach(element => {
            console.log(adjustedNow - element.dt);
            if(adjustedNow - element.dt <= 7200 && adjustedNow - element.dt >= 3600){
                pastHourData = element;
                // console.log(element);
            }
        });

        console.log(pastHourData);
        hourTemp_elmnt.textContent = `Previous Temp:${kelvinToFaherenheit(pastHourData.temp)},  
        Difference:${kelvinToFaherenheit(data.current.temp) - kelvinToFaherenheit(pastHourData.temp)}`;
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