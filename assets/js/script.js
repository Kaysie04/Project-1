
var hoursOfOperation = document.getElementById("getHours")
var entranceFee = document.getElementById("getEntryFee")
var getParkName = document.getElementById("getParkName")
var getAddress= document.getElementById("getAddress")
var getHours = document.getElementById("getHours")
var entranceFee = document.getElementById("getEntryFee")
var parkWeatherInfo = document.getElementById("park-weather-info")
var searchInputEl = document.getElementById("user-search")
var searchBtn = document.getElementById("search-btn")
const APIKeyWeather = "a4d995d10a3e4d37b4522008221606"
const APIKeyPark = "yVqeZRUKh9PqcUDw5hZeYAUCPybXvqL3cGbSjcIh"

const parkOptions = {
    headers: {
        'X-Api-Key': `${APIKeyPark}`,
        'X-RapidAPI-Key': 'cadac08ed3msh40326c56fe6e32bp134535jsn59a066c9993d',
        'X-RapidAPI-Host': 'jonahtaylor-national-park-service-v1.p.rapidapi.com'
    }
};


function getPark (userSearch) {
    var parkUrl = `https://jonahtaylor-national-park-service-v1.p.rapidapi.com/parks?parkCode=${userSearch}`
    fetch( parkUrl, parkOptions)
    .then(response =>  {
             return response.json() })
        .then(data => {
            console.log(data)
            var lat = data.data[0].latitude
            var long = data.data[0].longitude
            var latLong = `${lat},${long}`
           
            // create a variable and element for the park name and append it to the correct html div
            getParkName.innerHTML = data.data[0].fullName

            // create a variable and element for the park address and append it to the correct html div
            var street = data.data[0].addresses[0].line1
            var city = data.data[0].addresses[0].city
            var state = data.data[0].addresses[0].stateCode
            var postalCode = data.data[0].addresses[0].postalCode
            getAddress.innerHTML = `Address: ${street} ${city} ${state} ${postalCode}`

            // create a variable and element for the park hours and append it to the correct html div
            getHours.innerHTML = `Park Hours: ${data.data[0].operatingHours[0].description}`

            // create a variable and element for the park weather description from park API and append it to the correct html div
            parkWeatherInfo.innerHTML = `Seasonal Weather Info: ${data.data[0].weatherInfo}`

              //var entranceFee = document.createElement("p")
              var parkCost = data.data[0].entranceFees[0].cost
              var parkDescription = data.data[0].entranceFees[0].description
              getEntryFee.innerHTML = `Entrance Fee: $${parkCost} ${parkDescription}`

              
        var weatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${APIKeyWeather}&q=${latLong}&days=7`

        fetch(weatherUrl)
            .then(response => {
                return response.json() })
                .then(data => {
                    console.log(data)
               
                //TODAY'S WEATHER
               
                var currentTemp = document.getElementById("currentTemp")
                currentTemp.innerHTML = ` Temp: ${data.current.temp_f} ${"\u00B0F"}`
        
                // feels like temp
                var feelsLike = document.getElementById("feelsLike")
                feelsLike.innerHTML = ` Feels Like: ${data.current.feelslike_f} ${"\u00B0F"}`
             
                // humidity
                var humidity = document.getElementById("humidity")
                humidity.innerHTML = ` Humidity: ${data.current.humidity}${"%"}`
    
                // wind
                var wind = document.getElementById("wind")
                wind.innerHTML = ` Wind: ${data.current.wind_mph}${"mph"}`

                // uv
                var uvIndex = document.getElementById("uv")
                uvIndex.innerHTML = `UV Index: ${data.current.uv}`

                // DAY 1 WEATHER
                // let date = new Date(`${data.forecast.forecastday[1].date_epoch * 1000}`)
                // console.log(date)
                // // var dayOneDate = document.getElementById("day1-date")
                // // dayOneDate.innerHTML =  date
                
                var dayOneTemp = document.getElementById("day1-temp")
                dayOneTemp.innerHTML = ` Average Temp: ${data.forecast.forecastday[1].day.avgtemp_f}${"\u00B0F"}`

                var dayOneHumidity = document.getElementById("day1-humidity")
                dayOneHumidity.innerHTML = `Humidity: ${data.forecast.forecastday[1].day.avghumidity}${"%"}`

                var dayOneWind = document.getElementById("day1-wind")
                dayOneWind.innerHTML = `Wind Speed: ${data.forecast.forecastday[1].day.maxwind_mph}${"mph"}`

                var dayOneUv = document.getElementById("day1-uv")
                dayOneUv.innerHTML = `UV Index: ${data.forecast.forecastday[1].day.uv}`

                 // DAY 2 WEATHER

                 var dayTwoDate = document.getElementById("day2-date")
                 dayTwoDate.innerHTML = `${data.forecast.forecastday[2].date}`
 
                 var dayTwoTemp = document.getElementById("day2-temp")
                 dayTwoTemp.innerHTML = ` Average Temp: ${data.forecast.forecastday[2].day.avgtemp_f}${"\u00B0F"}`
 
                 var dayTwoHumidity = document.getElementById("day2-humidity")
                 dayTwoHumidity.innerHTML = `Humidity: ${data.forecast.forecastday[2].day.avghumidity}${"%"}`
 
                 var dayTwoWind = document.getElementById("day2-wind")
                 dayTwoWind.innerHTML = `Wind Speed: ${data.forecast.forecastday[2].day.maxwind_mph}${"mph"}`
 
                 var dayTwoUv = document.getElementById("day2-uv")
                 dayTwoUv.innerHTML = `UV Index: ${data.forecast.forecastday[2].day.uv}`
            })
            
         })
        //.catch(err => console.error(err));
}

// save to local storage

const storageInput = document.querySelector('#user-search')
const text = document.querySelector('.park-input')
const storedInput = localStorage.getItem('text')

storageInput.addEventListener('input', letter => {
    text.textContent = letter.target.value

})

const saveToLocalStorage = () => {
    localStorage.setItem('textinput', text.textContent)
}

searchBtn.addEventListener('click', saveToLocalStorage)

// fetch data based on park name search
searchBtn.addEventListener("click", function(event) {
    userSearch = searchInputEl.value
    getPark(userSearch)
    searchInputEl.innerHTML = " "
    event.preventDefault()
})



