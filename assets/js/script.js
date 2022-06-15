const APIKeyWeather = "2e27f5eeea840778c702353221406";
const APIKeyPark = "yVqeZRUKh9PqcUDw5hZeYAUCPybXvqL3cGbSjcIh"
const parkOptions = {
    headers: {
        'X-Api-Key': 'yVqeZRUKh9PqcUDw5hZeYAUCPybXvqL3cGbSjcIh',
        'X-RapidAPI-Key': 'cadac08ed3msh40326c56fe6e32bp134535jsn59a066c9993d',
        'X-RapidAPI-Host': 'jonahtaylor-national-park-service-v1.p.rapidapi.com'
    }
};

var parkUrl =  'https://jonahtaylor-national-park-service-v1.p.rapidapi.com/parks' 

function getPark () {
    fetch( parkUrl, parkOptions)

    .then(response =>  {
             return response.json() })
        .then(data => {
            console.log(data)

        // var parkList = document.querySelector(".park-list")
        // var parkListData = document.createElement("p")
        // parkListData.innerHTML = data.data[0-28]
        // parkList.append(parkListData)
         })
        //.catch(err => console.error(err));

}

getPark()

