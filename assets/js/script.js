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

var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${APIkey}`
fetch(requestUrl)
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

    // get current temp data and display
    var currentCityTemp = data.current.temp;
    var currentTempEl = $('<p>')
    currentTempEl.text(`Temp: ${currentCityTemp}°C`)
    todayEl.append(currentTempEl);

    // get current wind speed and display
    var currentCityWind = data.current.wind_speed;
    var currentWindEl = $('<p>')
    currentWindEl.text(`Wind: ${currentCityWind} KPH`)
    todayEl.append(currentWindEl);

    // get current humidity and display
    var currentCityHumidity = data.current.humidity;
    var currentHumidityEl = $('<p>')
    currentHumidityEl.text(`Humidity: ${currentCityHumidity}%`)
    todayEl.append(currentHumidityEl);
    
    
    //5-day forecast data
    var fiveDayForecastHeaderEl = $('#fiveDayForecastHeader');
            var fiveDayHeaderEl = $('<h2>');
            fiveDayHeaderEl.text('5-Day Forecast:');
            fiveDayForecastHeaderEl.append(fiveDayHeaderEl);

            var forecastEl = $('#forecast');
        
            for (var i = 1; i <=5; i++) {
                var date;
                var temp;
                var icon;
                var wind;
                var humidity;

                date = data.daily[i].dt;
                date = moment.unix(date).format("MM/DD/YYYY");

                temp = data.daily[i].temp.day;
                icon = data.daily[i].weather[0].icon;
                wind = data.daily[i].wind_speed;
                humidity = data.daily[i].humidity;
            
                var card = document.createElement('div');
                card.classList.add('card', 'col-2', 'm-1', 'bg-primary', 'text-white');
                
                // create card body and append
                var cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
                cardBody.innerHTML = `<h6>${date}</h6>
                                      <img src= "http://openweathermap.org/img/wn/${icon}.png"> </><br>
                                       ${temp}°C<br>
                                       ${wind} KPH <br>
                                       ${humidity}%`
                
                card.appendChild(cardBody);
                forecastEl.append(card);}


})
return;
}
