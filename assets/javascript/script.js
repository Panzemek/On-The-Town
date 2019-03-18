$.ajax({  
    url: "https://developers.zomato.com/api/v2.1/search?q=pizza&cities?id=279",
    dataType: 'json',
    method: "GET",
    beforeSend: function(xhr){xhr.setRequestHeader('user-key', 
    'c676a8f84163c31b3e525853910c4a76')}
}).then(function(response){
    console.log(response);
});

$.ajax({  
    url: "https://www.eventbriteapi.com/v3/events/search/?token=QHBNEFWIRBGDKAUY44N7&categories=103&location.address=seattle",
    dataType: 'json',
    method: "GET",
}).then(function(response){
    console.log(response);
});



function geocodeRestaurantSearch(lat, lon) {

    let QueryUrl = "https://developers.zomato.com/api/v2.1/search?q=restaurant&locations?query=seattle&lat="+lat+"&lon="+lon;

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

geocodeRestaurantSearch(47.690755, -122.356263);