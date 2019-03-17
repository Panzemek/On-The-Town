$(document).ready(function(){

    
    // function createSlick(){
    
        console.log("hello");

        // $('.goButton').on('click', function() {
        //     slick.slickNext();
        // });

        $('.slick-next').on('click', function () {
            slick.slickNext();
        });

        $('#eventWheel').not('.slick-initialized').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            settings: {
                arrows: true,
            }
            
          });

});
       
        // $('.eventWheel').slick({
        //     centerMode: true,
        //     centerPadding: 0,
        //     slidesToShow: 3,
            
        //     responsive: [
        //     {
        //         breakpoint: 768,
        //     settings: {
        //         arrows: false,
        //     centerMode: true,
        //     centerPadding: '5px',
        //     slidesToShow: 3
        //     }
        //     },
        //     {
        //         breakpoint: 480,
        //     settings: {
        //         arrows: false,
        //     centerMode: true,
        //     centerPadding: '5px',
        //     slidesToShow: 1
        //     }
        //     }
        //     ]
        // })

        // $('.restaurantWheel').slick({
        //     centerMode: true,
        //     centerPadding: '5px',
        //     slidesToShow: 3,
            
        //     responsive: [
        //     {
        //         breakpoint: 768,
        //     settings: {
        //         arrows: false,
        //     centerMode: true,
        //     centerPadding: '5px',
        //     slidesToShow: 3
        //     }
        //     },
        //     {
        //         breakpoint: 480,
        //     settings: {
        //         arrows: false,
        //     centerMode: true,
        //     centerPadding: '5px',
        //     slidesToShow: 1
        //     }
        //     }
        //     ]
        // })

      
    // }
    // createSlick();  

        



