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

// function that pulls a random event from the eventbrite api within the specified parameters (location, date, event type)
function randomEventPick(response) {
    let arr = response.events;
    //randomizer to choose one of the random events
    let randomPick = arr[Math.floor(Math.random() * arr.length)];

    // pulls summary of the event
    let rpName = randomPick.summary;
    // pulls the events image
    let rpImageEv = randomPick.logo.url;
    // pulls the events address
    let rpLocation = randomPick.venue.address.address_1;
    // pulls time the event starts
    let rpTime = randomPick.start.local;
    // pulls the locations latitude
    let rpLat = randomPick.venue.latitude;
    // pulls the locations longitude
    let rpLon = randomPick.venue.longitude;
    // pulls the url to eventbrite for actual event
    let rpEvent = randomPick.venue.address.resource_uri;
    // pulls name of the event
    let rpEvName = randomPick.name.text;


    

    $("#event-result").empty();
    $("#event-result").append("<a href=" + rpEvent + " target=_blank>" + rpEvName + "</a>")
    $("#event-result").append("<p>" + rpTime + "</p>");
    $("#event-result").append("<p>" + rpLocation + "</p>");
    $("#event-result").append("<img src=" + rpImageEv + ">");


    console.log(rpName);
    console.log(rpImageEv);
    console.log(rpLocation);
    console.log(rpTime);
    console.log(rpLat);
    console.log(rpLon);
    console.log(rpEvent);
    console.log(rpEvName);
}

// object of all the categories that eventbrite recognizes and the code in the form of a number that is passed into the api in the form of a number
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


// variables for on click event
var categories
var place
var dateOfEvent
// user inputs 1 2 and 3
var userI
var userI2
var userI3

// on click function that passes in info to api
// $("#sub").on("click", function (event) {
//     event.preventDefault();
//     // gets category info
//     userI = $("#cate").val().trim();
//     console.log("userinput", userI);
//     // takes category info and turns it into a value from object
//     categories = catObj[userI];
//     console.log("numberid", categories);
//     // gets a date for the event
//     userI2 = $("#dateOf").val();
//     console.log("userinput2", userI2);
//     dateOfEvent = userI2;
//     // gets location info in the form of a city
//     userI3 = $("#location-form").val().trim();
//     place = userI3;
// });

var place = "seattle";
var categories = "103";
var dateOfEvent = "2019-03-30"

// TODO:
// the api url we use to get info back from eventbrtire api
var dateQueryUrl = "https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.address="+place+"&location.within=10km&categories="+categories+"&start_date.range_start="+dateOfEvent+"T00%3A00%3A01&start_date.range_end="+dateOfEvent+"T23%3A59%3A59&expand=venue&token=QHBNEFWIRBGDKAUY44N7";

// ajax call
$.ajax({
    url: dateQueryUrl,
    method: "GET",
}).then(function (response) {
    console.log(response)
    randomEventPick(response);
})

// Zomato API below

let cuisineArr = ["American", "Italian", "Chinese", "Japanese", "Thai", "Vietnamese", "Mediterranean", "Mexican", "African", "Indian"]
let neighborhoodArr = ["Downtown", "University District", "Ballard", "Belltown", "Central District", "Fremont", "Greenwood/Phinney", "Magnolia", "Columbia City", "Broadview/Bitter Lake", "Interbay", "Beacon Hill", "Sodo", "Maple Leaf", "Ravenna", "Capitol Hill", "West Seattle", "International District", "Wallingford", "Georgetown", "Lake City", "Northgate", "South Lake Union", "Queen Anne: Lower", "White Center", "Queen Anne: Upper", "Rainier Valley", "Madison Park", "Green Lake", "Madrona/Leschi"]

function randomRestaurantPick(response) {
    let arr = response.restaurants;
    let randomPick = arr[Math.floor(Math.random() * arr.length)];

    let rpName = randomPick.restaurant.name;
    let rpLink = randomPick.restaurant.url;
    let rpCuisine = randomPick.restaurant.cuisines;
    let rpLocation = randomPick.restaurant.location.locality_verbose;

    nameLink = $("<a href=" + rpLink + " target=_blank>" + rpName + "</a>");
    rpImg = $("<img src=" + randomPick.restaurant.thumb + ">")

    $("#food-result").empty();
    $("#food-result").append("<p><a href=" + rpLink + " target=_blank>" + rpName + "</a></p>");
    $("#food-result").append("<p>" + rpCuisine + "</p>");
    $("#food-result").append("<p>" + rpLocation + "</p>");
    $("#food-result").append(rpImg);
}

function pullRestaurantInfo(param) {
    let QueryUrl = "https://developers.zomato.com/api/v2.1/search?q=" + param + "&cities?q=seattle";

    $.ajax({
        url: QueryUrl,
        dataType: 'json',
        method: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('user-key',
                'c676a8f84163c31b3e525853910c4a76')
        }
    }).then(function (response) {
        randomRestaurantPick(response);
    });
}

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
    $("#food-roulette").show();
    $("#restaurantCarousel").carousel("cycle");
    pullRestaurantInfo("restaurant");

    setTimeout(function () {
        $("#food-roulette").hide();
        $("#food-result").show();
        $("#food-roulette-button").on("click", buildFoodResult);
    }, 2000);
}

$("#narrow-food").click(function () {
    $("#food-narrow-container").show();
});