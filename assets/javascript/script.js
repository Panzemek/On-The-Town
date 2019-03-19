

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

    let restaurant = results.name;
    let restLatitude = results.geometry.location[lat];
    let restLongitude = results.geometry.location[lng];

    pullRestaurantInfo(restaurant,restLatitude,restLongitude)
}



function pullRestaurantInfo(name,lat,lng) {

    let QueryUrl = "https://developers.zomato.com/api/v2.1/search?q="+name+"&locations?query=seattle&lat="+lat+"&lon="+lng;

    $.ajax({  
        url: QueryUrl,
        dataType: 'json',
        method: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('user-key', 
        'c676a8f84163c31b3e525853910c4a76')}
    }).then(function(response){
        console.log(response);
        populateRestaurantInfo(response);
    });
}

function populateRestaurantInfo(response) {
    let item = response.restaurants;

    let rpName = item.restaurant.name;
    let rpLink = item.restaurant.url;
    let rpCuisine = item.restaurant.cuisines;
    let rpLocation = item.restaurant.location.locality_verbose;

    console.log (rpName, rpCuisine, rpLocation, rpLink);
    nameLink = $("<a href="+rpLink+" target=_blank>"+rpName+"</a>");
    rpImg = $("<img src="+randomPick.restaurant.thumb+">")

    $("body").append("<p><a href="+rpLink+" target=_blank>"+rpName+"</a></p>");
    $("body").append("<p>"+rpCuisine+"</p>");
    $("body").append("<p>"+rpLocation+"</p>");
    $("body").append(rpImg);
}



googleNearbyRestaurants(47.6138108,-122.3196641,"mexican");