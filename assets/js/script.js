var APIkey = "2c092ed86d8756f9b4900572c63980277"

var searchInputEl = $('#search-input');
var searchBtn = $('#search-button');
var city;

// weather data submission
function handleCityFormSubmit (event) {
    event.preventDefault();

    city = searchInputEl.val().trim();
    console.log(city);
    searchInputEl.textContent = '';
}

searchBtn.on("click", handleCityFormSubmit);

// get weather based on city coordinates from open weather
function getweather(data){

var getUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${APIkey}`
fetch(getUrl)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    //create city name
    var cityNameEl = $('h2');
    cityNameEl.text(city);
    todayEl.append(cityNameEl);
})
}
