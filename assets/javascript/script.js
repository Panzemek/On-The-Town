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
// // neighborhood search
// pullRestaurantInfo("Wallingford");
