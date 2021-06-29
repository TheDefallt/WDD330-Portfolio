const migraineButton = document.getElementById('migraineBtn');
const hourContainer = document.getElementById('hourContainer');

const currentTemp_elmnt = document.getElementById('currentTemp');
const currentPressure_elmnt = document.getElementById('currentPressure');

// const hourTemp_elmnt = document.getElementById('hourTemp');
// const hourPressure_elmnt = document.getElementById('hourPressure');

// const threeTemp_elmnt = document.getElementById('threeTemp');
// const threePressure_elmnt = document.getElementById('threePressure');

// const sixTemp_elmnt = document.getElementById('sixTemp');
// const sixPressure_elmnt = document.getElementById('sixPressure');

// const twelveTemp_elmnt = document.getElementById('twelveTemp');
// const twelvePressure_elmnt = document.getElementById('twelvePressure');

migraineButton.addEventListener('click', startWeatherFetch);

function startWeatherFetch(){
    window.navigator.geolocation.getCurrentPosition(fetchWeatherByCoord, fetchWeatherByCityState);
}

function fetchWeatherByCoord (pos) {
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;

    let adjustedNow = ~~(Date.now() / 1000);

    console.log("Requested Now: " + adjustedNow);

    fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${long}&dt=${adjustedNow}&appid=51c68784f1251d893077cc4f52143c83`)
    .then(response => response.json())
    .then(data => {

        /*---Current Data---*/
        currentTemp_elmnt.innerHTML = `${kelvinToFaherenheit(data.current.temp)}&#176F`;
        currentPressure_elmnt.innerHTML = `${pascalToMercury(data.current.pressure)}in.`;

        /*---Hour Looper---*/
        console.log(data.hourly[0].dt);
        for(let i=data.hourly.length - 1; i > 0; i--){
            hourContainer.innerHTML += `
            <div class="data-card">
                <h2>${new Date(data.hourly[i].dt * 1000).toLocaleTimeString()}</h2>
                <div>Meas: ${kelvinToFaherenheit(data.hourly[i].temp)}&#176F</div>
                <div>${pascalToMercury(data.hourly[i].pressure)}in.</div>
                <div>Diff: ${tempDifference(data.current.temp, data.hourly[i].temp)}&#176F</div>
                <div>${pressureDifference(data.current.pressure, data.hourly[i].pressure)}in.</div>
            </div>
            `;
        }
    })
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

function kelvinToFaherenheit(temp){
    return Math.trunc((temp - 273.15) * 1.8 + 32);
}

function pascalToMercury(pressure){
    return (pressure * 0.02953).toFixed(2);
}

function tempDifference(currentTemp, pastTemp){
    return kelvinToFaherenheit(currentTemp) - kelvinToFaherenheit(pastTemp);
}

function pressureDifference(currentPressure, pastPressure){
    return (pascalToMercury(currentPressure) - pascalToMercury(pastPressure)).toFixed(2);
}