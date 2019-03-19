// Zomato API key: c676a8f84163c31b3e525853910c4a76
// Eventbrite API key: QHBNEFWIRBGDKAUY44N7
// Google API key: AIzaSyDF_fqwmBu3FLIxPBFJLXZuWD5l-23ts74
// Yelp API key: W8IP0_T7u9NtFkNEdcsD26F6YvMBIpTdxAGPPwJWuAIUGEa764q5SBRbwPDJB2ORpQfoJEtKQp2H_K4gU7AgtaQjyi20F1eIYtNcYXav7Cyk55kiKyUE4JUqGGuQXHYx


// initial seach success with zomato api
$.ajax({  
    url: "https://developers.zomato.com/api/v2.1/search?q=pizza&cities?id=279",
    dataType: 'json',
    method: "GET",
    beforeSend: function(xhr){xhr.setRequestHeader('user-key', 
    'c676a8f84163c31b3e525853910c4a76')}
}).then(function(response){
    console.log("initial zomato search: ", response);
});


// initial search success with eventbrite api
$.ajax({  
    url: "https://www.eventbriteapi.com/v3/events/search/?token=QHBNEFWIRBGDKAUY44N7&location.address=seattle&expand=venue",
    dataType: 'json',
    method: "GET",
}).then(function(response){
    console.log("initial eventbrite search: ", response);
});



// searching restaurants by latitude & longitude- radius does not work
function geocodeRestaurantSearch(lat, lon) {

    let QueryUrl = "https://developers.zomato.com/api/v2.1/search?q=restaurant&locations?query=seattle&lat="+lat+"&lon="+lon+"&radius=500";

    $.ajax({  
        url: QueryUrl,
        dataType: 'json',
        method: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('user-key', 
        'c676a8f84163c31b3e525853910c4a76')}
    }).then(function(response){
        console.log("Zomato lat&lon restaurant search: ", response);
    });
}
// hard coded as taproot theater in greenwood for testing
geocodeRestaurantSearch(47.690755, -122.356263);


// Geocode search url that returns neighborhood by address search:
// https://maps.googleapis.com/maps/api/geocode/json?address=1136+south+albro+place,+seattle,+WA&key=AIzaSyDF_fqwmBu3FLIxPBFJLXZuWD5l-23ts74


function playingWithYelp() {

    let QueryUrl = "https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972";

    $.ajax({  
        url: QueryUrl,
        dataType: 'json',
        method: "GET",
        headers: {
            'Authorization':'Bearer W8IP0_T7u9NtFkNEdcsD26F6YvMBIpTdxAGPPwJWuAIUGEa764q5SBRbwPDJB2ORpQfoJEtKQp2H_K4gU7AgtaQjyi20F1eIYtNcYXav7Cyk55kiKyUE4JUqGGuQXHYx',
        },    
    }).then(function(response){
        console.log("Yelp response: ", response);
    });
}

playingWithYelp();


// multiple parameters
$.ajax({  
    url: "https://developers.zomato.com/api/v2.1/search?q=mexican+italian&cities?id=279",
    dataType: 'json',
    method: "GET",
    beforeSend: function(xhr){xhr.setRequestHeader('user-key', 
    'c676a8f84163c31b3e525853910c4a76')}
}).then(function(response){
    console.log("Mulitple parameters: ", response);
});