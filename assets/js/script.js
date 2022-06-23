
var getParkName = document.getElementById("getParkName")
var getAddress= document.getElementById("getAddress")
var getHours = document.getElementById("getHours")
var entranceFee = document.getElementById("getEntryFee")
var parkWeatherInfo = document.getElementById("park-weather-info")
var searchInputEl = document.getElementById("user-search")
var searchBtn = document.getElementById("search-btn")
var weatherColumns = document.querySelector("#weather-columns")
var parkColumns = document.querySelector("#park-columns")
const APIKeyWeather = "a4d995d10a3e4d37b4522008221606"
const APIKeyPark = "yVqeZRUKh9PqcUDw5hZeYAUCPybXvqL3cGbSjcIh"
var searchHistory = []
var userSearch = ""
var userSearchForm = document.querySelector("#search-form")
const options = {
    headers: {
        'X-Api-Key': `${APIKeyPark}`,
        'X-RapidAPI-Key': 'cadac08ed3msh40326c56fe6e32bp134535jsn59a066c9993d',
        'X-RapidAPI-Host': 'jonahtaylor-national-park-service-v1.p.rapidapi.com'
    }
};

function getPark (userSearch) {
    var parkUrl = `https://jonahtaylor-national-park-service-v1.p.rapidapi.com/parks?parkCode=${userSearch}`
    fetch( parkUrl, options)

    
    
    // error response for search values less than 4
    .then(response =>  {
       
        if (userSearch.length <=3) { 
            window.location.reload()
             
        } else { 
            return response.json ()}
     })  
             .then(data => {
                // save to storage when search button is clicked
            searchHistory.push(data.data[0].fullName)
            localStorage.setItem("parkName", searchHistory)
            var lat = data.data[0].latitude
            var long = data.data[0].longitude
            var latLong = `${lat},${long}`


            // remove css style display:none
                weatherColumns.removeAttribute("id", "weather-columns")
                currentWeatherDisplay = document.querySelector("#current-weather-placeholder")
                currentWeatherDisplay.setAttribute("id", "current-weather-display")
                dayOneWeatherDisplay = document.getElementById("day1-weather-placeholder")
                dayOneWeatherDisplay.setAttribute("id", "day1-weather-display")
                dayTwoWeatherDisplay = document.getElementById("day2-weather-placeholder")
                dayTwoWeatherDisplay.setAttribute("id", "day2-weather-display")
                parkColumns.removeAttribute("id", "park-columns")
               

                       
            // create a variable and element for the park name and append it to the correct html div
            var parkName = data.data[0].fullName
            getParkName.innerHTML= parkName
            getParkName.setAttribute("id", "park-name-style")

            // create a variable and element for the park address and append it to the correct html div
            var street = data.data[0].addresses[0].line1
            var city = data.data[0].addresses[0].city
            var state = data.data[0].addresses[0].stateCode
            var postalCode = data.data[0].addresses[0].postalCode
            getAddress.innerHTML = `<p id = "park-address-style"> Address </p> ${street} ${city} ${state} ${postalCode}`

            // create a variable and element for the park hours and append it to the correct html div
            getHours.innerHTML = `<p id = "park-hours-style"> Park Hours </p> ${data.data[0].operatingHours[0].description}`

            // create a variable and element for the park weather description from park API and append it to the correct html div
            parkWeatherInfo.innerHTML =  ` <p id = "seasonal-weather-style"> Seasonal Weather Information </p> ${data.data[0].weatherInfo}`

              //var entranceFee = document.createElement("p")
              var parkCost = data.data[0].entranceFees[0].cost
              var parkDescription = data.data[0].entranceFees[0].description
              getEntryFee.innerHTML = `<p id ="entrance-fee-style"> Entrance Fee </p> $${parkCost} ${parkDescription}`

              
        // get data from weather API
        var weatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${APIKeyWeather}&q=${latLong}&days=7`
        
        fetch(weatherUrl)
            .then(response => {
                return response.json() })
                .then(data => {

               
                //TODAY'S WEATHER
                var todayTitle = document.getElementById("currentWeatherTitle")
                todayTitle.textContent = "Today's Forecast"

                //var currentDateMoment = moment(data.forecast.forecastday[0].date).format('MMMM Do, YYYY')

                //var currentDate = document.getElementById("current-date")
                //currentDate.innerHTML = `${currentDateMoment}`

                var currentTemp = document.getElementById("currentTemp")
                currentTemp.innerHTML = ` Temp: ${data.current.temp_f} ${"\u00B0F"}`
        
                // feels like temp
                var feelsLike = document.getElementById("feelsLike")
                feelsLike.innerHTML = ` Feels Like: ${data.current.feelslike_f} ${"\u00B0F"}`
             
                // humidity
                var humidity = document.getElementById("humidity")
                //humidity.innerHTML = `Humidity: ${data.current.humidity}${"%"}`
    
                // wind
                var wind = document.getElementById("wind")
                wind.innerHTML = ` Wind Speed: ${data.current.wind_mph}${"mph"}`

                // uv
                var uvIndex = document.getElementById("uv")
                uvIndex.innerHTML = `UV Index: ${data.current.uv}`

                // DAY 1 WEATHER
                
                var dayOneDateMoment = moment(data.forecast.forecastday[1].date).format('MMMM Do, YYYY')

                var dayOneDate = document.getElementById("day1-date")
                dayOneDate.innerHTML = `${dayOneDateMoment}`
                
                var dayOneTemp = document.getElementById("day1-temp")
                dayOneTemp.innerHTML = ` Average Temp: ${data.forecast.forecastday[1].day.avgtemp_f}${"\u00B0F"}`

                var dayOneHumidity = document.getElementById("day1-humidity")
                dayOneHumidity.innerHTML = `Humidity: ${data.forecast.forecastday[1].day.avghumidity}${"%"}`

                var dayOneWind = document.getElementById("day1-wind")
                dayOneWind.innerHTML = `Wind Speed: ${data.forecast.forecastday[1].day.maxwind_mph}${"mph"}`

                var dayOneUv = document.getElementById("day1-uv")
                dayOneUv.innerHTML = `UV Index: ${data.forecast.forecastday[1].day.uv}`

                 // DAY 2 WEATHER

                 var dayTwoDateMoment = moment(data.forecast.forecastday[2].date).format('MMMM Do, YYYY')

                var dayTwoDate = document.getElementById("day2-date")
                dayTwoDate.innerHTML = `${dayTwoDateMoment}`

                 var dayTwoTemp = document.getElementById("day2-temp")
                 dayTwoTemp.innerHTML = ` Average Temp: ${data.forecast.forecastday[2].day.avgtemp_f}${"\u00B0F"}`
 
                 var dayTwoHumidity = document.getElementById("day2-humidity")
                 dayTwoHumidity.innerHTML = `Humidity: ${data.forecast.forecastday[2].day.avghumidity}${"%"}`
 
                 var dayTwoWind = document.getElementById("day2-wind")
                 dayTwoWind.innerHTML = `Wind Speed: ${data.forecast.forecastday[2].day.maxwind_mph}${"mph"}`
 
                 var dayTwoUv = document.getElementById("day2-uv")
                 dayTwoUv.innerHTML = `UV Index: ${data.forecast.forecastday[2].day.uv}`

                 // reset search input box
                 var searchHistoryItem = document.querySelector("#user-search")
                 searchHistoryItem.value = ""
                 
            })
        })
}

// fetch data based on park name search

searchBtn.addEventListener("click", function(event) {
    event.preventDefault()
    userSearch = searchInputEl.value  
    getPark(userSearch)
})
    
