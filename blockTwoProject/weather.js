const migraineButton = document.getElementById('migraineBtn');
const hourContainer = document.getElementById('hourContainer');

migraineButton.addEventListener('click', startWeatherFetch);

function startWeatherFetch(){
    window.navigator.geolocation.getCurrentPosition(fetchWeatherByCoord);
    document.getElementById('btnContainer').classList.add("hide");
}

function fetchWeatherByCoord (pos) {
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;

    hourContainer.innerHTML = ``;

    let adjustedNow = ~~(Date.now() / 1000);

    fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${long}&dt=${adjustedNow}&appid=51c68784f1251d893077cc4f52143c83`)
    .then(response => response.json())
    .then(data => {

        /*---Current Data---*/
        hourContainer.innerHTML += `
        <div class="data-card">
            <h2>Current Conditions ${new Date(data.current.dt * 1000).toLocaleTimeString()}</h2>
            <div>${kelvinToFaherenheit(data.current.temp)}&#176F</div>
            <div>${pascalToMercury(data.current.pressure)}in.</div>
        </div>
        `;

        /*---Add radio buttons---*/
        hourContainer.innerHTML += `
        <h2>Compare To:</h2>
        <input type="radio" value="Now">
        <label for="now">Now</label>
        <input type="radio" value="HourByHour">
        <label for="hourbyhour">Hour-by-Hour</label>
        `;
        
        /*---Add Reset Button---*/
        hourContainer.innerHTML += `
        <button class="resetBtn" id="resetBtn">Reset</button>
        `;

        /*---Hour Looper---*/
        for(let i=data.hourly.length - 1; i > 0; i--){
            hourContainer.innerHTML += `
            <div class="data-card">
                <h2>Conditions at: ${new Date(data.hourly[i].dt * 1000).toLocaleTimeString()}</h2>
                <div>Meas: ${kelvinToFaherenheit(data.hourly[i].temp)}&#176F</div>
                <div>${pascalToMercury(data.hourly[i].pressure)}in.</div>
                <div>Diff: ${tempDifference(data.current.temp, data.hourly[i].temp)}&#176F</div>
                <div>${pressureDifference(data.current.pressure, data.hourly[i].pressure)}in.</div>
            </div>
            `;
        }
        // callback(hourLoopNow);
    })
    .then( () => {
        document.getElementById('resetBtn').addEventListener('click', reset);
    })
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

function hourLoopNow(data) {
    for(let i=data.hourly.length - 1; i > 0; i--){
        hourContainer.innerHTML += `
        <div class="data-card">
            <h2>Conditions at: ${new Date(data.hourly[i].dt * 1000).toLocaleTimeString()}</h2>
            <div>Meas: ${kelvinToFaherenheit(data.hourly[i].temp)}&#176F</div>
            <div>${pascalToMercury(data.hourly[i].pressure)}in.</div>
            <div>Diff: ${tempDifference(data.current.temp, data.hourly[i].temp)}&#176F</div>
            <div>${pressureDifference(data.current.pressure, data.hourly[i].pressure)}in.</div>
        </div>
        `;
    }
}

function hourLoopByHour(data) {
    for(let i=data.hourly.length - 1; i > 0; i--){
        hourContainer.innerHTML += `
        <div class="data-card">
            <h2>Conditions at: ${new Date(data.hourly[i].dt * 1000).toLocaleTimeString()}</h2>
            <div>Meas: ${kelvinToFaherenheit(data.hourly[i].temp)}&#176F</div>
            <div>${pascalToMercury(data.hourly[i].pressure)}in.</div>
            <div>Diff: ${tempDifference(data.current.temp, data.hourly[i].temp)}&#176F</div>
            <div>${pressureDifference(data.current.pressure, data.hourly[i].pressure)}in.</div>
        </div>
        `;
    }
}

function reset(){
    hourContainer.innerHTML = ``;
    document.getElementById("btnContainer").classList.remove("hide");
}