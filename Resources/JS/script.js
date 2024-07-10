
let city=""; 
let url="";
let APIkey="";
let queryurl ="";
let currenturl = "";
let citiesDiv = document.getElementById("cityInput");

let cities = []; 
init(); 
listClicker(); 
searchClicker(); 

function init(){
    let saved_cities = JSON.parse(localStorage.getItem("cities"));

    if (saved_cities !== null){
        cities = saved_cities
    }   
    
    renderButtons(); 
}

function storeCities(){
    localStorage.setItem("cities", JSON.stringify(cities)); 
}

function renderButtons(){
    citiesDiv.innerHTML = ""; 
    if(cities == null){
        return;
    }
    let unique_cities = [...new Set(cities)];
    for(let i=0; i < unique_cities.length; i++){
        let cityName = unique_cities[i]; 

        let buttonEl = document.createElement("button");
        buttonEl.textContent = cityName; 
        buttonEl.setAttribute("class", "listbtn"); 

        citiesDiv.appendChild(buttonEl);
        listClicker();
      }
    }
function listClicker(){
$(".listbtn").on("click", function(event){
    console.log("anybody home?")
    event.preventDefault();
    console.log("hello?");
    city = $(this).text().trim();
    APIcalls(); 
})
}




function searchClicker() {
$("#searchBtn").on("click", function(event){
    event.preventDefault();
    city = $(this).prev().val().trim()
    

    cities.push(city);

    if(cities.length > 8){
        cities.shift()
    }
    if (city == ""){
        return; 
    }
    APIcalls();
    storeCities(); 
    renderButtons();
})
}

function APIcalls(){
    
    url = "https://api.openweathermap.org/data/2.5/forecast?q=";    
    currenturl = "https://api.openweathermap.org/data/2.5/weather?q=";
    APIkey = "&appid=415b84251ecbdd72a99fe543464542a8";
    queryurl = url + city + APIkey;
    current_weather_url = currenturl + city + APIkey; 
    
    $("#cityName").text("Today's Weather in " + city);
    $.ajax({
        url: queryurl,
        method: "GET",
        
    }).then(function(response){
        let day_number = 0; 
        
        for(let i=0; i< response.list.length; i++){
            
            if(response.list[i].dt_txt.split(" ")[1] == "15:00:00")
            {

                let day = response.list[i].dt_txt.split("-")[2].split(" ")[0];
                let month = response.list[i].dt_txt.split("-")[1];
                let year = response.list[i].dt_txt.split("-")[0];
                $("#" + day_number + "date").text(month + "/" + day + "/" + year); 
                let temp = Math.round(((response.list[i].main.temp - 273.15) *9/5+32));
                $("#" + day_number + "five_Daytemp").text("Temp: " + temp + String.fromCharCode(176)+"F");
                $("#" + day_number + "five_Dayhumidity").text("Humidity: " + response.list[i].main.humidity);
                $("#" + day_number + "five_Dayicon").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                console.log(response.list[i].dt_txt.split("-"));
                console.log(day_number);
                console.log(response.list[i].main.temp);
                day_number++; 
                        }   
        }
    });

        //function to display data in main div 
        $.ajax({
            url:current_weather_url,
            method: "GET", 
        }).then(function(current_data){
            console.log(current_data);
            let temp = Math.round(((current_data.main.temp - 273.15) * 9/5 + 32))
            console.log("The temperature in " + city + " is: " + temp);
            $("#todaysTemp").text("Temperature: " + temp + String.fromCharCode(176)+"F");
            $("#todaysHumidity").text("Humidity: " + current_data.main.humidity);
            $("#todaysWindspeed").text("Wind Speed: " + current_data.wind.speed);
            $("#todaysWeathericon").attr({"src": "http://openweathermap.org/img/w/" + current_data.weather[0].icon + ".png",
             "height": "100px", "width":"100px"});
        })
       
   
   }
   