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
    url: "https://www.eventbriteapi.com/v3/events/search/?location.address=seattle&location.within=10km&expand=venue&token=QHBNEFWIRBGDKAUY44N7",
    dataType: 'json',
    method: "GET",
}).then(function(response){
    console.log(response);
});