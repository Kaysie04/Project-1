let map: google.maps.Map;
function initMap(): void {
  map = new google.maps.Map(document.getElementById("map").HTMLElement {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}
declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
var hoursOfOperation = document.getElementById("getHours")
var entranceFee = document.getElementById("getEntryFee")
var getParkName = document.getElementById("getParkName")
var  getAddress= document.getElementById("getAddress")
var getHours = document.getElementById("getHours")
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
var parkUrl =  'https://jonahtaylor-national-park-service-v1.p.rapidapi.com/parks?parkCode=arches'
var parkUrl = 'https://jonahtaylor-national-park-service-v1.p.rapidapi.com/parks?parkCode=arches'
function getPark () {
    fetch( parkUrl, parkOptions)
    .then(response =>  {
             return response.json() })
        .then(data => {
            console.log(data.data)
            var entranceFee = document.createElement("p")
            var parkCost = data.data[0].entranceFees[0].cost
            var parkDescription = data.data[0].entranceFees[0].description
            var parkTitle = data.data[0].entranceFees[0].title
            entranceFee.innerHTML = `${parkCost} ${parkDescription} ${parkTitle}`
            getEntryFee.append(entranceFee)
            console.log(data)
            // create a variable and element for the park name and append it to the correct html div
            var parkName = document.createElement("p")
            parkName.innerHTML = data.data[0].fullName
            getParkName.append(parkName)
            // create a variable and element for the park address and append it to the correct html div
            var address = document.createElement("p")
            var street = data.data[0].addresses[0].line1
            var city = data.data[0].addresses[0].city
            var state = data.data[0].addresses[0].stateCode
            var postalCode = data.data[0].addresses[0].postalCode
            address.innerHTML = `${street} ${city} ${state} ${postalCode}`
            getAddress.append(address)
            // create a variable and element for the park hours and append it to the correct html div
            var hoursOfOperation = document.createElement("p")
            hoursOfOperation.innerHTML = data.data[0].operatingHours[0].description
            getHours.append(hoursOfOperation)
            // create a variable and element for the park weather description from park API and append it to the correct html div
            var parkWeather = document.createElement("p")
            parkWeather.innerHTML = data.data[0].weatherInfo
            parkWeatherInfo.append(parkWeather)
         })
        //.catch(err => console.error(err));
}
searchBtn.addEventListener("click", function() {
    userSearch = searchInputEl.value
    getWeatherData(userSearch);
})
getPark()

