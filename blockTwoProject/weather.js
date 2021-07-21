const migraineButton = document.getElementById('migraineBtn');
const hourContainer = document.getElementById('hourContainer');
const currentContainer = document.getElementById('currentContainer');

let weatherData = [];

let presElements = [];
let tempElements = [];

migraineButton.addEventListener('click', startWeatherFetch);

/*---Gather user's location and start weather fetch---*/
function startWeatherFetch(){
    window.navigator.geolocation.getCurrentPosition(fetchWeatherByCoord);
    document.getElementById('btnContainer').classList.add("hide");
}

/*---Fetch weather from OpenWeather API and render page---*/
function fetchWeatherByCoord (pos) {
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;

    currentContainer.innerHTML = '';
    hourContainer.innerHTML = ``;

    let adjustedNow = Math.floor(Date.now() / 1000) - 60;

    fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${long}&dt=${adjustedNow}&appid=51c68784f1251d893077cc4f52143c83`)
    .then(response => response.json())
    .then(data => {

        weatherData = data;

        /*---Current Data---*/
        currentContainer.innerHTML += `
        <div class="data-card data-heading">
            <h1>${new Date(data.current.dt * 1000).toLocaleTimeString()} (Current)</h1>
            <div>${kelvinToFaherenheit(data.current.temp)}&#176F</div>
            <div>${pascalToMercury(data.current.pressure)}in.</div>
        </div>
        `;

        /*---Add radio buttons---*/
        currentContainer.innerHTML += `
        <fieldset class="compare">
        <legend>Compare To:</legend>
        <input type="radio" value="HourByHour" name="compareRadios" id="radioHour" onchange="renderNumbers(this.value, weatherData)" checked>
        <label class="compare-label" for="radioHour">Hour-by-Hour</label>
        <input type="radio" value="Now" name="compareRadios" id="radioNow" onchange="renderNumbers(this.value, weatherData)">
        <label class="compare-label" for="radioNow">Now</label>
        </fieldset>
        `;
        
        /*---Add Reset Button---*/
        currentContainer.innerHTML += `
        <button class="reset-btn" id="resetBtn">Reset</button>
        `;
        
        /*---Hour Looper---*/
        for(let i=data.hourly.length - 1; i > 0; i--){
            
            let card = document.createElement("div");
            card.classList.add("data-card");
            
            card.innerHTML += `
            <h1>Conditions at: ${new Date(data.hourly[i].dt * 1000).toLocaleTimeString()}</h1>
            <div>${kelvinToFaherenheit(data.hourly[i].temp)}&#176F</div>
            <div>${pascalToMercury(data.hourly[i].pressure)}in.</div>
            `;

            let tempElement = document.createElement("div");
            card.appendChild(tempElement);
            tempElements.unshift(tempElement);

            let presElement = document.createElement("div");
            card.appendChild(presElement);
            presElements.unshift(presElement);

            hourContainer.appendChild(card);
        }
    })
    .then( () => {
        renderNumbers('HourByHour', weatherData);
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

function renderNumbers(value, data){
    switch (value){
    case `Now`:
        for(let i=0; i < tempElements.length; i++){
            tempElements[i].innerHTML = `Diff: ${tempDifference(data.current.temp, data.hourly[i + 1].temp)}&#176F`;
            presElements[i].innerHTML = `${pressureDifference(data.current.pressure, data.hourly[i + 1].pressure)}in.`;
        }
        break;
    case `HourByHour`:
        for(let i=0; i < tempElements.length; i++){
            tempElements[i].innerHTML = `Diff: ${tempDifference(data.hourly[i + 1].temp, data.hourly[i].temp)}&#176F`;
            presElements[i].innerHTML = `${pressureDifference(data.hourly[i + 1].pressure, data.hourly[i].pressure)}in.`;
        }
        break;
    }
}

function reset(){
    currentContainer.innerHTML = ``;
    hourContainer.innerHTML = ``;
    weatherData = [];
    presElements = [];
    tempElements = [];
    document.getElementById("btnContainer").classList.remove("hide");
}