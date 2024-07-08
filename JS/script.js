
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


//render buttons for each element in cities array as a search history for user
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
//on click function for search history buttons
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
    //return from function early if form is blank
    if (city == ""){
        return; 
    }
    APIcalls();
    storeCities(); 
    renderButtons();
})
}