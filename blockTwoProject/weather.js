const migraineButton = document.getElementById('migraineBtn');

const currentTemp_elmnt = document.getElementById('currentTemp');
const currentPressure_elmnt = document.getElementById('currentPressure');

const hourTemp_elmnt = document.getElementById('hourTemp');
const hourPressure_elmnt = document.getElementById('hourPressure');

const threeTemp_elmnt = document.getElementById('threeTemp');
const threePressure_elmnt = document.getElementById('threePressure');

const sixTemp_elmnt = document.getElementById('sixTemp');
const sixPressure_elmnt = document.getElementById('sixPressure');

const twelveTemp_elmnt = document.getElementById('twelveTemp');
const twelvePressure_elmnt = document.getElementById('twelvePressure');

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
        console.log(data);

        /*---Current Data---*/
        currentTemp_elmnt.textContent = kelvinToFaherenheit(data.current.temp);
        currentPressure_elmnt.textContent = pascalToMercury(data.current.pressure);


        /*---Past Hour Data---*/
        let pastHourData = "";

        data.hourly.forEach(element => {
            if(adjustedNow - element.dt <= 7200 && adjustedNow - element.dt >= 3600){
                pastHourData = element;
            }
        });

        hourTemp_elmnt.textContent = `Previous Temp:${kelvinToFaherenheit(pastHourData.temp)},  
        Difference:${kelvinToFaherenheit(data.current.temp) - kelvinToFaherenheit(pastHourData.temp)}`;
        hourPressure_elmnt.textContent = `Previous Pressure:${pascalToMercury(pastHourData.pressure)},
        Difference:${(pascalToMercury(data.current.pressure) - pascalToMercury(pastHourData.pressure)).toFixed(2)}`;


        /*---Past Three Hours Data---*/
        let threeHourData = "";

        data.hourly.forEach(element => {
            if(adjustedNow - element.dt <= 10800 && adjustedNow - element.dt >= 7200){
                threeHourData = element;
            }
        });

        threeTemp_elmnt.textContent = `Previous Temp:${kelvinToFaherenheit(threeHourData.temp)},  
        Difference:${kelvinToFaherenheit(data.current.temp) - kelvinToFaherenheit(threeHourData.temp)}`;
        threePressure_elmnt.textContent = `Previous Pressure:${pascalToMercury(threeHourData.pressure)},
        Difference:${(pascalToMercury(data.current.pressure) - pascalToMercury(threeHourData.pressure)).toFixed(2)}`;

        /*---Past Six Hours Data---*/
        let sixHourData = "";

        data.hourly.forEach(element => {
            if(adjustedNow - element.dt <= 25200 && adjustedNow - element.dt >= 21600){
                sixHourData = element;
            }
        });

        sixTemp_elmnt.textContent = `Previous Temp:${kelvinToFaherenheit(sixHourData.temp)},  
        Difference:${kelvinToFaherenheit(data.current.temp) - kelvinToFaherenheit(sixHourData.temp)}`;
        sixPressure_elmnt.textContent = `Previous Pressure:${pascalToMercury(sixHourData.pressure)},
        Difference:${(pascalToMercury(data.current.pressure) - pascalToMercury(sixHourData.pressure)).toFixed(2)}`;


        /*---Past Twelve Hours Data---*/
        let twelveHourData = "";

        data.hourly.forEach(element => {
            if(adjustedNow - element.dt <= 46800 && adjustedNow - element.dt >= 43200){
                twelveHourData = element;
            }
        });

        twelveTemp_elmnt.textContent = `Previous Temp:${kelvinToFaherenheit(twelveHourData.temp)},  
        Difference:${kelvinToFaherenheit(data.current.temp) - kelvinToFaherenheit(twelveHourData.temp)}`;
        twelvePressure_elmnt.textContent = `Previous Pressure:${pascalToMercury(twelveHourData.pressure)},
        Difference:${(pascalToMercury(data.current.pressure) - pascalToMercury(twelveHourData.pressure)).toFixed(2)}`;
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

function kelvinToFaherenheit(temp){
    return Math.trunc((temp - 273.15) * 1.8 + 32);
}

function pascalToMercury(pressure){
    return (pressure * 0.02953).toFixed(2);
}