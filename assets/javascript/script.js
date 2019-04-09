// Header script
var granimInstance = new Granim({
    element: '#canvas-image-blending',
    direction: 'top-bottom',
    isPausedWhenNotInView: true,
    // image: {
    //     source: 'https://cdn.pixabay.com/photo/2018/01/31/05/30/panoramic-3120304_1280.jpg',
    //     blendingMode: 'multiply'
    // },
    states: {
        "default-state": {
            gradients: [
                ['#F2671F', '#C91B26'],
                ['#9C0F5F', '#60047A'],
                ['#4B3D60', '#152852'],
                ['#73434B', '#40284A']
            ],
            transitionSpeed: 3000
        }
    }
});

var dateAsString;
var dateAsObject;

// Event API script 

$("#event-roulette").hide();
$("#food-roulette").hide();

buildDayList();
function buildDayList() {

    for (i = 6; i > 0; i--) {
        var dayBox = $("<div>");
        dayBox.addClass("day-box flex-container");
        dayBox.attr("data-day", "day-" + i);
        dayBox.attr("data-selected", "false");
        dayBox.attr("data-date", moment().add(i, "days").format("L"));
        dayBox.text(moment().add(i, "days").format("ddd"));
        $(".when-container").prepend(dayBox);
    }
    var todayBox = $("<div>");
    todayBox.addClass("day-box flex-container");
    todayBox.attr("data-day", "day-" + 0);
    todayBox.attr("data-selected", "false");
    todayBox.attr("data-date", moment().add(i, "days").format("L"));
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
    dateAsString = $(this).attr("data-date");
})

$('html').click(function (e) {
    if (!$(e.target).hasClass('ui-widget') && !$(e.target).hasClass('ui-corner-all') && !$(e.target).hasClass('ui-datepicker-title') && !$(e.target).hasClass('ui-datepicker-calendar') && !$(e.target).hasClass('calendar-pop-button') && !$(e.target).hasClass('ui-datepicker-month') && !$(e.target).hasClass('ui-datepicker-year')) {
        var dp = $("#datepicker");
        dp.datepicker('destroy');
        dp.html("<i class='fas fa-calendar-alt calendar-pop-button'></i>");
    }
});

$("#datepicker").click(function () {
    var dp = $(this);
    dp.datepicker({
        onSelect: function (dateText, inst) {
            dateAsString = dateText;
            dateAsObject = $(this).datepicker('getDate');
        }
    });
    dp.css("position", "relative");
    dp.css("z-index", 1000);
});

// Location Dropdown
var cities = ["Auburn", "Bellevue", "Bellingham", "Bothell", "Burien", "Edmonds", "Everett", "Federal Way", "Issaquah", "Kent", "Kirkland", "Lynnwood", "Montlake Terrace", "Olympia", "Puyallup", "Redmond", "Renton", "Seattle", "Shoreline", "Snoqualmie", "Spokane", "Tacoma", "Tukwila", "Woodinville"]

for (var i = 0; i < cities.length; i++) {
    $("#dropdownItems").append("<a href=>" + cities[i] + "<br>" + "</a>");
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

let rpLat;
let rpLon;
var categories = "";

function getCategoryCheckboxes() {
    var evCheckedCats = document.forms['event-narrow-list'].elements['eventListItem[]'];
    console.log("Event List Items: ", evCheckedCats);
    let selArr = [];
    categories = "";
    for (let i = 0; i < evCheckedCats.length; i++) {
        if (evCheckedCats[i].checked) {
            selArr.push(evCheckedCats[i].value);
            console.log("Selection Array: ", selArr);
            categories = selArr.join("%2C");
            console.log("categories: ", categories);

        }
    }
}

// Eventbrite API call
function randomEventPick() {

    getCategoryCheckboxes();

    var place = "seattle";

    var dateOfEvent;
    convDate = moment(dateAsString).format("YYYY-MM-DD");
    if (convDate) {
        dateOfEvent = convDate;
    } else {
        dateOfEvent = moment();
    }

    var dateQueryUrl = "https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.address=" + place + "&location.within=10km&categories=" + categories + "&start_date.range_start=" + dateOfEvent + "T00%3A00%3A01&start_date.range_end=" + dateOfEvent + "T23%3A59%3A59&expand=venue&token=QHBNEFWIRBGDKAUY44N7";
    console.log("EV query: " + dateQueryUrl);

    $.ajax({
        url: dateQueryUrl,
        method: "GET",
    }).then(function (response) {
        populateEvent(response);
    }).then(randomSeattleRestaurants);
}

function populateEvent(response) {
    let arr = response.events;
    let randomPick = arr[Math.floor(Math.random() * arr.length)];

    console.log("event: ", randomPick);

    let rpName = randomPick.summary;
    let rpImageEv = randomPick.logo.url;
    let rpLocation = randomPick.venue.address.address_1;
    let rpTime = moment(randomPick.start.local).calendar();
    rpLat = randomPick.venue.latitude;
    rpLon = randomPick.venue.longitude;
    let rpEvent = randomPick.url;
    let rpEvName = randomPick.name.text;

    $("#event-result").empty();
    $("#event-result").append("<p class='eventResultText'> <a id=eventResultLink href=" + rpEvent + " target=_blank>" + rpEvName + "</a> </p> <br> <p class='eventResultText'>" + rpTime + "</p> <br> <p class='eventResultText'>" + rpLocation + "</p>")
    $("#event-result").append("<img id=event-result-img src=" + rpImageEv + ">");

}

var restLat;
var restLng;
let cuisineSearchString = "";

function getFoodCheckboxes() {
    var cuisines = document.forms['food-narrow-list'].elements['cuisineListItem[]'];
    console.log("Cuisine List Items: ", cuisines);
    let selArr = [];
    cuisineSearchString = "";
    for (let i = 0; i < cuisines.length; i++) {
        if (cuisines[i].checked) {
            selArr.push(cuisines[i].value);
            console.log("Selection Array: ", selArr);
            cuisineSearchString = selArr.join(",");
            console.log("Cuisine Search String: ", cuisineSearchString);

        }
    }
}

// Yelp API call
function randomSeattleRestaurants() {

    getFoodCheckboxes();
    console.log("Search string just before query url: ", cuisineSearchString);

    let yelpQueryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=Restaurants+"+cuisineSearchString+"&location=Seattle+WA&latitude="+rpLat+"&longitude="+rpLon+"&radius=2000";

    console.log("QueryUrl: " + yelpQueryURL);

    $.ajax({
        url: yelpQueryURL,
        method: "GET",
        headers: {
            'Authorization': 'Bearer W8IP0_T7u9NtFkNEdcsD26F6YvMBIpTdxAGPPwJWuAIUGEa764q5SBRbwPDJB2ORpQfoJEtKQp2H_K4gU7AgtaQjyi20F1eIYtNcYXav7Cyk55kiKyUE4JUqGGuQXHYx'
         },
    }).then(function(response) {
        randomRestaurantPick(response);
    });

}

function randomRestaurantPick(response) {
    let arr = response.businesses;
    let randomPick = arr[Math.floor(Math.random() * arr.length)];
    let restID = randomPick.id;
    console.log("RANDOM PICK: ", randomPick.name);
    pullRestaurantInfo(restID)
}

function pullRestaurantInfo(restID) {
    let idQueryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"+restID;
    $.ajax({
        url: idQueryUrl,
        method: "GET",
        headers: {
            'Authorization': 'Bearer W8IP0_T7u9NtFkNEdcsD26F6YvMBIpTdxAGPPwJWuAIUGEa764q5SBRbwPDJB2ORpQfoJEtKQp2H_K4gU7AgtaQjyi20F1eIYtNcYXav7Cyk55kiKyUE4JUqGGuQXHYx'
         },
    }).then(function(response) {
        restLat = response.coordinates.latitude;
        restLng = response.coordinates.longitude;
        console.log("REST COORDS: " + restLat + ", " + restLng);
        populateRestaurantInfo(response);
    });
}

function populateRestaurantInfo(response) {
    let rpName = response.name;
    let rpLink = response.url;
    let rpAddress = response.location.address1 + ", " + response.location.city;
    let rpImgRef = response.image_url;
    
    let hoursButton = $('<div class="dropdown" id="rest-hours"><button class="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hours</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><p class="dropdown-item" id="mon"></p><p class="dropdown-item" id="tue"></p><p class="dropdown-item" id="wed"></p><p class="dropdown-item" id="thurs"></p><p class="dropdown-item" id="fri"></p><p class="dropdown-item" id="sat"></p><p class="dropdown-item" id="sun"></p></div></div>');

    $("#food-result").empty();
    $("#food-result").append("<p class=rest-result-text><a id=rest-result-link href=" + rpLink + " target=_blank>" + rpName + "</a></p><br><p class=rest-result-text>" + rpAddress + "</p>");
    $("#food-result").append(hoursButton);
    $("#food-result").append("<p><img id=rest-result-img src=" + rpImgRef + " alt='restaurant image'></p>");

    let schedule = response.hours[0].open;
    formatTime(schedule);
}

let openArr = ["closed", "closed", "closed", "closed", "closed", "closed", "closed"];
let closeArr = ["closed", "closed", "closed", "closed", "closed", "closed", "closed"];


function formatTime(schedule) {
    if (schedule.length <= 7) {
        for (let i = 0; i < schedule.length; i++) {
            let openTime = moment(schedule[i].start, "hhmm").format("hh:mm a");
            openArr.splice(i, 1, openTime);
            let closeTime = moment(schedule[i].end, "hhmm").format("hh:mm a");
            closeArr.splice(i, 1, closeTime);
        }
        $("#mon").text("Monday: " + openArr[0] + " - " + closeArr[0]);
        $("#tue").text("Tuesday: " + openArr[1] + " - " + closeArr[1]);
        $("#wed").text("Wednesday: " + openArr[2] + " - " + closeArr[2]);
        $("#thurs").text("Thursday: " + openArr[3] + " - " + closeArr[3]);
        $("#fri").text("Friday: " + openArr[4] + " - " + closeArr[4]);
        $("#sat").text("Saturday: " + openArr[5] + " - " + closeArr[5]);
        $("#sun").text("Sunday: " + openArr[6] + " - " + closeArr[6]);
    } 
    else {
        openArr.push("closed", "closed", "closed", "closed", "closed", "closed", "closed");
        closeArr.push("closed", "closed", "closed", "closed", "closed", "closed", "closed");

        for (let i = 0; i < schedule.length; i++) {
            let openTime = moment(schedule[i].start, "hhmm").format("hh:mm a");
            openArr.splice(i, 1, openTime);
            let closeTime = moment(schedule[i].end, "hhmm").format("hh:mm a");
            closeArr.splice(i, 1, closeTime);
        }

        $("#mon").html("Monday: " + openArr[0] + " - " + closeArr[0] + "</p><p class='tab'>" + openArr[1] + " - " + closeArr[1]);
        $("#tue").html("Tuesday: " + openArr[2] + " - " + closeArr[2] + "</p><p class='tab'>" + openArr[3] + " - " + closeArr[3]);
        $("#wed").html("Wednesday: " + openArr[4] + " - " + closeArr[4] + "</p><p class='tab'>" + openArr[5] + " - " + closeArr[5]);
        $("#thurs").html("Thursday: " + openArr[6] + " - " + closeArr[6] + "</p><p class='tab'>" + openArr[7] + " - " + closeArr[7]);
        $("#fri").html("Friday: " + openArr[8] + " - " + closeArr[8] + "</p><p class='tab'>" + openArr[9] + " - " + closeArr[9]);
        $("#sat").html("Saturday: " + openArr[10] + " - " + closeArr[10] + "</p><p class='tab'>" + openArr[11] + " - " + closeArr[11]);
        $("#sun").html("Sunday: " + openArr[12] + " - " + closeArr[12] + "</p><p class='tab'>" + openArr[13] + " - " + closeArr[13]);
    }
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

$("#event-roulette-button").click(buildEventResult);

function buildEventResult() {
    randomEventPick();
    foodRouletteSpin();
    eventRouletteSpin();
}
function eventRouletteSpin() {
    $("#event-roulette-button").off("click");
    $("#event-result").hide();
    $("#event-roulette").show();
    $("#eventCarousel").carousel("cycle");
    $("#event-result").empty();

    setTimeout(function () {
        $("#event-roulette").hide();
        $("#event-result").show();
        $("#event-roulette-button").unbind('click').on("click", buildEventResult);
    }, 3500);
}

function foodRouletteSpin() {
    $("#food-roulette-button").off("click");
    $("#food-result").hide();
    $("#rest-hours").hide();
    $("#food-roulette").show();
    $("#restaurantCarousel").carousel("cycle");

    setTimeout(function () {
        $("#food-roulette").hide();
        $("#food-result").show();
        $("#rest-hours").show();
        $("#food-roulette-button").unbind('click').on("click", buildFoodResult);
    }, 3500);
}

$("#food-roulette-button").click(buildFoodResult);

function buildFoodResult() {
    foodRouletteSpin();
    randomSeattleRestaurants("restaurant");
}
