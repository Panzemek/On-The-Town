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

var categories = "";
var dateOfEvent;
var place = "seattle";
let rpLat;
let rpLon;

function datetimeplace() {
    convDate = moment(dateAsString).format("YYYY-MM-DD");
    if (convDate) {
        dateOfEvent = convDate;
    } else {
        dateOfEvent = moment();

    }
    console.log("runs datetimeplace");

    // the api url we use to get info back from eventbrtire api
    var dateQueryUrl = "https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.address=" + place + "&location.within=10km&categories=" + categories + "&start_date.range_start=" + dateOfEvent + "T00%3A00%3A01&start_date.range_end=" + dateOfEvent + "T23%3A59%3A59&expand=venue&token=QHBNEFWIRBGDKAUY44N7";
    console.log(dateQueryUrl)
    // ajax call
    $.ajax({
        url: dateQueryUrl,
        method: "GET",
    }).then(function (response) {
        populateEvent(response);
    }).then(randomSeattleRestaurants);
}

function randomEventPick() {
    function getCategoryCheckboxes() {
        var evCheckedCats = document.forms['event-narrow-list'].elements['eventListItem[]'];
        let selArr = [];
        categories = "";
        for (let i = 0; i < evCheckedCats.length; i++) {
            if (evCheckedCats[i].checked) {
                selArr.push(evCheckedCats[i].value);
                categories = selArr.join("%2C");
            }
        }
    }

    datetimeplace()

    getCategoryCheckboxes();



    $(document).on("click", "a", function () {
        event.preventDefault();
        if ($(this).text()) {
            place = $(this).text()
            return place;
        }

    })
}

function populateEvent(response) {
    let arr = response.events;
    console.log(arr)
    if( arr.length === 0){
    var sorryimage = "assets/images/Try_Again.jpg";
    rpImageEv = $("#event-result").append("<img id=event-result-img src='" + sorryimage + "'>")
}
else{
    let randomPick = arr[Math.floor(Math.random() * arr.length)];


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
}

var restLat;
var restLng;
let cuisineSearchString = "";

function getFoodCheckboxes() {
    var cuisines = document.forms['food-narrow-list'].elements['cuisineListItem[]'];
    let selArr = [];
    cuisineSearchString = "";
    for (let i = 0; i < cuisines.length; i++) {
        if (cuisines[i].checked) {
            selArr.push(cuisines[i].value);
            cuisineSearchString = selArr.join("+");
        }
    }
}

// Google Places API call
function randomSeattleRestaurants() {

    getFoodCheckboxes();

    queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?location=" + rpLat + "," + rpLon + "&radius=2000&type=restaurant&keyword=" + cuisineSearchString + "&key=AIzaSyDF_fqwmBu3FLIxPBFJLXZuWD5l-23ts74"

    $.ajax({
        url: queryURL,
        dataType: 'json',
        method: "GET",
    }).then(function (response) {
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
    let QueryUrl = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=" + restID + "&key=AIzaSyDF_fqwmBu3FLIxPBFJLXZuWD5l-23ts74";
    $.ajax({
        url: QueryUrl,
        dataType: 'json',
        method: "GET",
    }).then(function (response) {
        restLat = response.result.geometry.location.lat;
        restLng = response.result.geometry.location.lng;
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

    let imgLink = "https://maps.googleapis.com/maps/api/place/photo?maxheight=200&photoreference=" + rpImgRef + "&key=AIzaSyDF_fqwmBu3FLIxPBFJLXZuWD5l-23ts74";

    let hoursButton = $('<div class="dropdown" id="rest-hours"><button class="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hours</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><a class="dropdown-item" id="mon" href="#"></a><a class="dropdown-item" id="tue" href="#"></a><a class="dropdown-item" id="wed" href="#"></a><a class="dropdown-item" id="thurs" href="#"></a><a class="dropdown-item" id="fri" href="#"></a><a class="dropdown-item" id="sat" href="#"></a><a class="dropdown-item" id="sun" href="#"></a></div></div>');

    $("#food-result").empty();
    $("#food-result").append("<p class=rest-result-text><a id=rest-result-link href=" + rpLink + " target=_blank>" + rpName + "</a></p><br><p class=rest-result-text>" + rpAddress + "</p>");
    $("#food-result").append(hoursButton);
    $("#food-result").append("<p><img id=rest-result-img src=" + imgLink + " alt='restaurant image'></p>");
    
    $("#mon").text(item.opening_hours.weekday_text[0]);
    $("#tue").text(item.opening_hours.weekday_text[1]);
    $("#wed").text(item.opening_hours.weekday_text[2]);
    $("#thurs").text(item.opening_hours.weekday_text[3]);
    $("#fri").text(item.opening_hours.weekday_text[4]);
    $("#sat").text(item.opening_hours.weekday_text[5]);
    $("#sun").text(item.opening_hours.weekday_text[6]);
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
