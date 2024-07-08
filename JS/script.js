
let city=""; 
let url="";
let APIkey="";
let queryurl ="";
let currenturl = "";
let citiesDiv = document.getElementById("cityInput");
//start with empty array
let cities = []; 
init(); 
listClicker(); 
searchClicker(); 

//run function to pull saved cities from local storage and fill array with it
function init(){
    let saved_cities = JSON.parse(localStorage.getItem("cities"));

    if (saved_cities !== null){
        cities = saved_cities
    }   
    
    renderButtons(); 
}

//sets localstorage item to cities array 
function storeCities(){
    localStorage.setItem("cities", JSON.stringify(cities)); 
}