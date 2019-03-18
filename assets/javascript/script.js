
var place = "seattle"

    
var placeQueryUrl =  "https://www.eventbriteapi.com/v3/events/search/?location.address="+place+"&location.within=5km&expand=venue&token=QHBNEFWIRBGDKAUY44N7";

function randomEventPick(response) {
            let arr = response.events;
            let randomPick = arr[Math.floor(Math.random() * arr.length)];
    
            let rpName = randomPick.summary;
            let rpImage = randomPick.logo.url;
            let rpLocation = randomPick.venue.address.address_1;
    
            console.log(rpName);
            console.log(rpImage);
            console.log(rpLocation)
}
$.ajax({  
    url: placeQueryUrl,
    dataType: 'json',
    method: "GET",
}).then(function(response){
    console.log(response);
    
    

randomEventPick(response)
});
 


var catObj = {
    "music" : 103,
    "business & professional" : 101,
    "food & drink" : 110,
    "community & culture" : 113,
    "performance & visual arts" : 105,
    "film & media entertainment" : 104,
    "sports & fitness" : 108,
    "health & wellness" : 107,
    "science & technology" : 102,
    "travel & outdoor" : 109,
    "charity & causes" : 111,
    "religion & spirituality" : 114,
    "family & education" : 115,
    "seasonal & holiday" : 116,
    "government & politics" : 112,
    "fashion & beauty" : 106,
    "home & lifestyle" : 117,
    "auto, boat, & air" : 118,
    "Hobbies & Special Interests" : 119,
    "other" : 199,
    "school Activites" : 120
}
var categories
var userI 
$("#sub").on("click", function (event){
    event.preventDefault();
    userI = $("#cate").val();
    console.log("userinput" , userI);
    categories = catObj[userI];
    console.log("numberid" , categories)
    



var catQueryUrl =  "https://www.eventbriteapi.com/v3/events/search/?location.address="+place+"&location.within=5km&expand=venue&token=QHBNEFWIRBGDKAUY44N7&categories="+ categories;

$.ajax({  
    url: catQueryUrl,
    dataType: 'json',
    method: "GET",
}).then(function(response){
    console.log(response)
    randomEventPick(response);
       
})
 

})
  
// Zomato API below

  let cuisineArr = ["American", "Italian", "Chinese", "Japanese", "Thai", "Vietnamese", "Mediterranean", "Mexican", "African", "Indian"]
let neighborhoodArr = ["Downtown", "University District", "Ballard", "Belltown", "Central District", "Fremont", "Greenwood/Phinney", "Magnolia", "Columbia City", "Broadview/Bitter Lake", "Interbay", "Beacon Hill", "Sodo", "Maple Leaf", "Ravenna", "Capitol Hill", "West Seattle", "International District", "Wallingford", "Georgetown", "Lake City", "Northgate", "South Lake Union", "Queen Anne: Lower", "White Center", "Queen Anne: Upper", "Rainier Valley", "Madison Park", "Green Lake", "Madrona/Leschi"]

function randomRestaurantPick(response) {
    let arr = response.restaurants;
    let randomPick = arr[Math.floor(Math.random() * arr.length)];

    let rpName = randomPick.restaurant.name;
    let rpLink = randomPick.restaurant.url;
    let rpCuisine = randomPick.restaurant.cuisines;
    let rpLocation = randomPick.restaurant.location.locality_verbose;

    console.log (rpName, rpCuisine, rpLocation, rpLink);
    nameLink = $("<a href="+rpLink+" target=_blank>"+rpName+"</a>");
    rpImg = $("<img src="+randomPick.restaurant.thumb+">")
    
    $("#food-result").append("<p><a href="+rpLink+" target=_blank>"+rpName+"</a></p>");
    $("#food-result").append("<p>"+rpCuisine+"</p>");
    $("#food-result").append("<p>"+rpLocation+"</p>");
    $("#food-result").append(rpImg);
}

function pullRestaurantInfo(param) {

    let QueryUrl = "https://developers.zomato.com/api/v2.1/search?q=" + param + "&cities?q=seattle";

    $.ajax({  
        url: QueryUrl,
        dataType: 'json',
        method: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('user-key', 
        'c676a8f84163c31b3e525853910c4a76')}
    }).then(function(response){
        console.log(response);
        randomRestaurantPick(response);
    });
}

// random seattle restaurant
$("#food-roulette-button").click(buildFoodResult);

function buildFoodResult() {
    $("#food-result").empty();
    pullRestaurantInfo("restaurant");
}
// cuisine search
// pullRestaurantInfo("Mediterranean");
// neighborhood search
// pullRestaurantInfo("Wallingford");

