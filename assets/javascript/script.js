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
        dayBox.attr("data-day","day-" + i);
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

$(".day-box").click(function() {
    $(".day-box").attr("data-selected", "false");
    $(this).attr("data-selected", "true");
})

var place = "seattle"

var placeQueryUrl = "https://www.eventbriteapi.com/v3/events/search/?location.address=" + place + "&location.within=5km&expand=venue&token=QHBNEFWIRBGDKAUY44N7";

function randomEventPick(response) {
    let arr = response.events;
    let randomPick = arr[Math.floor(Math.random() * arr.length)];

    let rpName = randomPick.summary;
    let rpImage = randomPick.logo.url;
    let rpLocation = randomPick.venue.address.address_1;
}
$.ajax({
    url: placeQueryUrl,
    dataType: 'json',
    method: "GET",
}).then(function (response) {
    randomEventPick(response)
});

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
var userI
$("#sub").on("click", function (event) {
    event.preventDefault();
    userI = $("#cate").val();
    categories = catObj[userI];

    var catQueryUrl = "https://www.eventbriteapi.com/v3/events/search/?location.address=" + place + "&location.within=5km&expand=venue&token=QHBNEFWIRBGDKAUY44N7&categories=" + categories;

    $.ajax({
        url: catQueryUrl,
        dataType: 'json',
        method: "GET",
    }).then(function (response) {
        randomEventPick(response);

    })

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