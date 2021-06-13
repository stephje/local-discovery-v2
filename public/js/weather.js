//Get current weather for Perth
getWeather();

function getWeather() {
    var myAPIkey = "ab1af9bd1a8500447caf0bf0f0a1518d";
    //Perth coordinates
    const currentLat = -31.83744;
    const currentLon = 115.813938;

    var requestUV = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentLat}&lon=${currentLon}&units=metric&appid=${myAPIkey}`;

    fetch(requestUV)
        .then(function (func) {
            return func.json();
        })
        .then(function (weatherNow) {
            //Display weather on page
            var currentTemp = document.getElementById("weatherTemp");
            currentTemp.innerHTML =
                "Tmp: " + Math.round(weatherNow.daily[0].temp.day) + " deg";

            var maxTemp = document.getElementById("weatherMax");
            maxTemp.innerHTML =
                "Max: " + Math.round(weatherNow.daily[0].temp.max) + " deg";

            var minTemp = document.getElementById("weatherMin");
            minTemp.innerHTML =
                "Min: " + Math.round(weatherNow.daily[0].temp.min) + " deg";

            //Weather Icon
            weatherIcon = weatherNow.daily[0].weather[0].icon;
            iconElement = document.querySelector("#weatherIcon");
            iconElement.src =
                "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
        });
}
