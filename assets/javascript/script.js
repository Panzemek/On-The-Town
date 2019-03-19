

function randomEventPick(response) {
            let arr = response.events;
            let randomPick = arr[Math.floor(Math.random() * arr.length)];
    
            let rpName = randomPick.summary;
            let rpImage = randomPick.logo.url;
            let rpLocation = randomPick.venue.address.address_1;
            let rpTime = randomPick.start.local;
            let rpLat = randomPick.venue.latitude;
            let rpLon = randomPick.venue.longitude;
    
            console.log(rpName);
            console.log(rpImage);
            console.log(rpLocation);
            console.log(rpTime);
            console.log(rpLat);
            console.log(rpLon);
}
 

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
var place
var userI 
var userI2
var userI3
var dateOfEvent
$("#sub").on("click", function (event){
    event.preventDefault();
    userI = $("#cate").val().trim();
    console.log("userinput" , userI);
    categories = catObj[userI];
    console.log("numberid" , categories);
    userI2 = $("#dateOf").val();
    console.log("userinput2" , userI2);
    dateOfEvent = userI2;
    userI3 = $("#loc").val().trim();
    place = userI3;
 

var dateQueryUrl ="https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.address="+place+"&location.within=10km&categories="+categories+"&start_date.range_start="+dateOfEvent+"T00%3A00%3A01&start_date.range_end="+dateOfEvent+"T23%3A59%3A59&expand=venue&token=QHBNEFWIRBGDKAUY44N7";




$.ajax({  
    url: dateQueryUrl,

    method: "GET",
}).then(function(response){
    console.log(response)
    randomEventPick(response);
       
})
 

})

