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
pullRestaurantInfo("restaurant");
// cuisine search
pullRestaurantInfo("Mediterranean");
// neighborhood search
pullRestaurantInfo("Wallingford");

let restaurantImages = {
    American: "assets/images/restaurants/american.jpg",
    Italian: "assets/images/restaurants/italian.jpg",
    Chinese: "assets/images/restaurants/chinese.jpg",
    Japanese: "assets/images/restaurants/japanese.jpg",
    Thai: "assets/images/restaurants/thai.jpg",
    Vietnamese: "assets/images/restaurants/vietnamese.jpg",
    Mediterranean: "assets/images/restaurants/mediterranean.jpg",
    Mexican: "assets/images/restaurants/mexican.jpg",
    African: "assets/images/restaurants/african.jpg",
    Indian: "assets/images/restaurants/indian.jpg",
}

$(document).ready(function(){

    $("#goButton").on("click", function() {
        $("#eventCarousel").carousel("cycle");
        console.log("clickCarousel");
        $("#restaurantCarousel").carousel("cycle");
        console.log("clickRestaurant");
       
    });
    
});
 

        



