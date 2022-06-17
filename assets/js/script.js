
var hoursOfOperation = document.getElementById("getHours")
var entranceFee = document.getElementById("getEntryFee")
var getParkName = document.getElementById("getParkName")
var getAddress= document.getElementById("getAddress")
var getHours = document.getElementById("getHours")
var entranceFee = document.getElementById("getEntryFee")
var parkWeatherInfo = document.getElementById("park-weather-info")
var searchInputEl = document.getElementById("user-search")
var searchBtn = document.getElementById("search-btn")
const APIKeyWeather = "2e27f5eeea840778c702353221406";
const APIKeyPark = "yVqeZRUKh9PqcUDw5hZeYAUCPybXvqL3cGbSjcIh"

const parkOptions = {
    headers: {
        'X-Api-Key': 'yVqeZRUKh9PqcUDw5hZeYAUCPybXvqL3cGbSjcIh',
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

            console.log(data.data)
            //var entranceFee = document.createElement("p")
            var parkCost = data.data[0].entranceFees[0].cost
            var parkDescription = data.data[0].entranceFees[0].description
            var parkTitle = data.data[0].entranceFees[0].title
            getEntryFee.innerHTML = `Entrance Fee: $${parkCost} ${parkDescription}` //${parkTitle}`

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
            
         })
        //.catch(err => console.error(err));
}
searchBtn.addEventListener("click", function() {
    userSearch = searchInputEl.value
    getPark(userSearch);
    event.preventDefault()
})

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



// function getWeatherData () {

//   const APIKeyWeather = "a4d995d10a3e4d37b4522008221606"
//   var weatherUrl = "http://api.weatherapi.com/v1/future.json?key=a4d995d10a3e4d37b4522008221606&q=dallas&dt=2022-07-1"

  
//   fetch(weatherUrl)
//       .then(response => {
//           return response.json() })
//           .then(data => {
//               console.log(data)
//           // icon
//           // var weatherIcon = data.current.condition.icon
//           // weatherIconImg = document.createElement("img")
//           // weatherIconImg.setAttribute("src", "//cdn.weatherapi.com/weather/64x64/night/113.png")
//           // weatherDataEl.append(weatherIconImg)
//           // current temp
//           var currentTemp = document.createElement("p")
//           currentTemp.innerHTML = ` Temp: ${data.current.temp_f} ${"\u00B0F"}`
//           weatherDataEl.append(currentTemp)
//           // feels like temp
//           var feelsLike = document.createElement("p")
//           feelsLike.innerHTML = ` Feels Like: ${data.current.feelslike_f} ${"\u00B0F"}`
//           weatherDataEl.append(feelsLike)
//           // humidity
//           var humidity = document.createElement("p")
//           humidity.innerHTML = ` Humidty: ${data.current.humidity}${"%"}`
//           weatherDataEl.append(humidity)
//           // wind
//           var wind = document.createElement("p")
//           wind.innerHTML = ` Wind: ${data.current.wind_mph}${"mph"}`
//           weatherDataEl.append(wind)
//           // uv
//           var wind = document.createElement("p")
//           wind.innerHTML = `UV Index: ${data.current.uv}`
//           weatherDataEl.append(wind)
//       })
// }

