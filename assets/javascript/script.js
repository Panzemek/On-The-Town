// var place = "seattle"

    
// var queryUrl =  "https://www.eventbriteapi.com/v3/events/search/?location.address="+place+"&location.within=5km&expand=venue&token=QHBNEFWIRBGDKAUY44N7";

// $.ajax({  
//     url: queryUrl,
//     dataType: 'json',
//     method: "GET",
// }).then(function(response){
//     console.log(response);
    
//     function randomEventPick(response) {
//         let arr = response.events;
//         let randomPick = arr[Math.floor(Math.random() * arr.length)];

//         let rpName = randomPick.summary;
//         let rpImage = randomPick.logo.url;
//         let rpLocation = randomPick.venue.address.address_1;

//         console.log(rpName);
//         console.log(rpImage);
//         console.log(rpLocation)
//     }


// randomEventPick(response)

// }); 


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
})


var queryUrl =  "https://www.eventbriteapi.com/v3/categories/music/&token=QHBNEFWIRBGDKAUY44N7";

$.ajax({  
    url: queryUrl,
    dataType: 'json',
    method: "GET",
}).then(function(response){
    console.log(response)
})




