function randomSeattleRestaurants() {

    queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+seattle&key=AIzaSyDF_fqwmBu3FLIxPBFJLXZuWD5l-23ts74"

    $.ajax({  
        url: queryURL,
        dataType: 'json',
        method: "GET",
    }).then(function(response){
        console.log("seattle restaurant search: ", response);
        randomRestaurantPick(response);
    });
    
}


function googleNearbyRestaurants(lat,lon,cuisine) {

    queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lon+"&radius=2000&type=restaurant&keyword="+cuisine+"&key=AIzaSyDF_fqwmBu3FLIxPBFJLXZuWD5l-23ts74"

    $.ajax({  
        url: queryURL,
        dataType: 'json',
        method: "GET",
    }).then(function(response){
        console.log("google places nearby search: ", response);
        randomRestaurantPick(response);
    });
    
}

function randomRestaurantPick(response) {
    let arr = response.results;
    let randomPick = arr[Math.floor(Math.random() * arr.length)];
    console.log("Random Selection from array: ", randomPick);

    let restID = randomPick.place_id;

    console.log("Place ID: ", restID)

    pullRestaurantInfo(restID)
}

function pullRestaurantInfo(restID) {

    let QueryUrl = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid="+restID+"&key=AIzaSyDF_fqwmBu3FLIxPBFJLXZuWD5l-23ts74";

    $.ajax({  
        url: QueryUrl,
        dataType: 'json',
        method: "GET",
    }).then(function(response){
        console.log("place detailed restaurant info: ", response);
        populateRestaurantInfo(response);
    });
}


function populateRestaurantInfo(response) {
    let item = response.result;
    let rpName = item.name;
    let rpLink = item.website;
    let rpLocation = item.address_components[2].long_name;
    let rpImgRef = item.photos[0].photo_reference;
    console.log("Photo ref: ", rpImgRef);
    
    let imgLink = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+rpImgRef+"&key=AIzaSyDF_fqwmBu3FLIxPBFJLXZuWD5l-23ts74";
    

    $("body").append("<p><a href="+rpLink+" target=_blank>"+rpName+"</a></p>");
    $("body").append("<p>Location: "+rpLocation+"</p>");
    $("body").append("<img src="+imgLink+">");

}


randomSeattleRestaurants();
googleNearbyRestaurants(47.6138108,-122.3196641,"italian");