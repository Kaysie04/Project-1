var hoursOfOperation = document.getElementById("getHours")
var entranceFee = document.getElementById("getEntryFee")





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

        // var parkList = document.querySelector(".park-list")
        // var parkListData = document.createElement("p")
        // parkListData.innerHTML = data.data[0-28]
        // parkList.append(parkListData)
         })
        //.catch(err => console.error(err));

}

getPark()

