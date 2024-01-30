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
    
   // current weather
    var todayEl = $('#today');
    todayEl.addClass('border border-primary');

    //create city name
    var cityNameEl = $('h2');
    cityNameEl.text(city);
    todayEl.append(cityNameEl);

    // get date from results and append to city name element
    var currentCityDate = data.current.dt;
    currentCityDate = dayjs.unix(currentCityDate).format("D MMM YYYY, HH:mm:ss");
    var currentDateEl = $('<span>');
    currentDateEl.text(` (${currentCityDate}) `);
    cityNameEl.append(currentDateEl);

})
}
