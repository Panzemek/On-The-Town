// Header script
var granimInstance = new Granim({
    element: '#canvas-image-blending',
    direction: 'top-bottom',
    isPausedWhenNotInView: true,
    image: {
        source: 'https://cdn.pixabay.com/photo/2018/01/31/05/30/panoramic-3120304_1280.jpg',
        blendingMode: 'multiply'
    },
    states: {
        "default-state": {
            gradients: [
                ['#F2671F', '#C91B26'],
                ['#9C0F5F', '#60047A'],
                ['#4B3D60', '#152852'],
                ['#73434B', '#40284A']
            ],
            transitionSpeed: 7000
        }
    }
});



// Event API script 

$("#event-roulette").hide();
$("#food-roulette").hide();
$("#event-narrow-container").hide();
$("#food-narrow-container").hide();

buildDayList();
function buildDayList() {

    for (i = 6; i > 0; i--) {
        var dayBox = $("<div>");
        dayBox.addClass("day-box flex-container");
        dayBox.attr("data-day", "day-" + i);
        dayBox.attr("data-selected", "false");
        dayBox.attr("data-date", moment().add(i, "days").format("YYYYMMDD"));
        dayBox.text(moment().add(i, "days").format("ddd"));
        console.log(dayBox);
        $(".when-container").prepend(dayBox);
    }
    var todayBox = $("<div>");
    todayBox.addClass("day-box flex-container");
    todayBox.attr("data-day", "day-" + 0);
    todayBox.attr("data-selected", "false");
    todayBox.attr("data-date", moment().add(i, "days").format("YYYYMMDD"));
    todayBox.text("Today");
    $(".when-container").prepend(todayBox);

    var todayText = $("<div>");
    todayText.addClass("flex-container");
    todayText.attr("id", "select-when-text");
    todayText.text("When's your night?");
    $(".when-container").prepend(todayText);
}

$(".day-box").click(function () {
    $(".day-box").attr("data-selected", "false");
    $(this).attr("data-selected", "true");
})

var placeQueryUrl = "https://www.eventbriteapi.com/v3/events/search/?location.address=" + place + "&location.within=5km&expand=venue&token=QHBNEFWIRBGDKAUY44N7";

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
    "music": 103,
    "business & professional": 101,
    "food & drink": 110,
    "community & culture": 113,
    "performance & visual arts": 105,
    "film & media entertainment": 104,
    "sports & fitness": 108,
    "health & wellness": 107,
    "science & technology": 102,
    "travel & outdoor": 109,
    "charity & causes": 111,
    "religion & spirituality": 114,
    "family & education": 115,
    "seasonal & holiday": 116,
    "government & politics": 112,
    "fashion & beauty": 106,
    "home & lifestyle": 117,
    "auto, boat, & air": 118,
    "Hobbies & Special Interests": 119,
    "other": 199,
    "school Activites": 120
}

var categories
var place
var userI
var userI2
var userI3
var dateOfEvent
$("#sub").on("click", function (event) {
    event.preventDefault();
    userI = $("#cate").val().trim();
    console.log("userinput", userI);
    categories = catObj[userI];
    console.log("numberid", categories);
    userI2 = $("#dateOf").val();
    console.log("userinput2", userI2);
    dateOfEvent = userI2;
    userI3 = $("#loc").val().trim();
    place = userI3;
});

var dateQueryUrl = "https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.address=" + place + "&location.within=10km&categories=" + categories + "&start_date.range_start=" + dateOfEvent + "T00%3A00%3A01&start_date.range_end=" + dateOfEvent + "T23%3A59%3A59&expand=venue&token=QHBNEFWIRBGDKAUY44N7";

$.ajax({
    url: dateQueryUrl,

    method: "GET",
}).then(function (response) {
    console.log(response)
    randomEventPick(response);
})

// Google API below

var restLat;
var restLng;

function randomSeattleRestaurants() {

    queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+seattle&key=AIzaSyDF_fqwmBu3FLIxPBFJLXZuWD5l-23ts74"

    $.ajax({  
        url: queryURL,
        dataType: 'json',
        method: "GET",
    }).then(function(response){
        randomRestaurantPick(response);
    });
    
}

function randomRestaurantPick(response) {
    let arr = response.results;
    let randomPick = arr[Math.floor(Math.random() * arr.length)];
    let restID = randomPick.place_id;

    pullRestaurantInfo(restID)
}

function pullRestaurantInfo(restID) {

    let QueryUrl = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid="+restID+"&key=AIzaSyDF_fqwmBu3FLIxPBFJLXZuWD5l-23ts74";

    $.ajax({  
        url: QueryUrl,
        dataType: 'json',
        method: "GET",
    }).then(function(response){
        restLat = response.result.geometry.location.lat;
        restLng = response.result.geometry.location.lng;
        console.log(restLat, restLng);
        populateRestaurantInfo(response);
    });
}

function populateRestaurantInfo(response) {
    let item = response.result;
    let rpName = item.name;
    let rpLink = item.website;
    let rpLocation = item.address_components[2].long_name;
    let rpImgRef = item.photos[0].photo_reference;
    let rpAddress = item.vicinity;
    
    let imgLink = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxheight=200&photoreference="+rpImgRef+"&key=AIzaSyDF_fqwmBu3FLIxPBFJLXZuWD5l-23ts74";

    $("#mon").text(item.opening_hours.weekday_text[0]);
    $("#tue").text(item.opening_hours.weekday_text[1]);
    $("#wed").text(item.opening_hours.weekday_text[2]);
    $("#thurs").text(item.opening_hours.weekday_text[3]);
    $("#fri").text(item.opening_hours.weekday_text[4]);
    $("#sat").text(item.opening_hours.weekday_text[5]);
    $("#sun").text(item.opening_hours.weekday_text[6]);

    $("#food-result").empty();
    $("#food-result").append("<p class=rest-result-text><a id=rest-result-link href="+rpLink+" target=_blank>"+rpName+"</a> &nbsp "+rpLocation+"</p><br><p class=rest-result-text>"+rpAddress+"</p>");
    $("#food-result").append("<img id=rest-result-img src="+imgLink+">");

}

let cuisineArr = ["American", "Italian", "Chinese", "Japanese", "Thai", "Vietnamese", "Mediterranean", "Mexican", "African", "Indian"]

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

buildEventResult();
buildFoodResult();

$("#event-roulette-button").click(buildEventResult);

function buildEventResult() {
    $(this).off("click");
    $("#event-narrow-container").hide();
    $("#event-result").hide();
    $("#event-roulette").show();
    $("#eventCarousel").carousel("cycle");
    $("#event-result").empty();

    setTimeout(function () {
        $("#event-roulette").hide();
        $("#event-result").show();
        $("#event-roulette-button").on("click", buildEventResult);
    }, 2000);
}

$("#narrow-event").click(function () {
    $("#event-narrow-container").show();
});

$("#food-roulette-button").click(buildFoodResult);

function buildFoodResult() {
    $(this).off("click");
    $("#food-narrow-container").hide();
    $("#food-result").hide();
    $("#rest-hours").hide();
    $("#food-roulette").show();
    $("#restaurantCarousel").carousel("cycle");
    randomSeattleRestaurants("restaurant");

    setTimeout(function () {
        $("#food-roulette").hide();
        $("#food-result").show();
        $("#rest-hours").show();
        $("#food-roulette-button").on("click", buildFoodResult);
    }, 2000);
}

$("#narrow-food").click(function () {
    $("#food-narrow-container").show();
});