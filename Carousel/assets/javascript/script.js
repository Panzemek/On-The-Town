$(document).ready(function(){
    $("#goButton").on("click", function() {
        $("#eventCarousel").carousel("cycle");
        console.log("clickCarousel");
        $("#restaurantCarousel").carousel("cycle");
        console.log("clickRestaurant");
       
    });
    
});
 

        



