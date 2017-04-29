$(document).ready(function($){

/*------------------------------------------
	 Navigation
-------------------------------------------*/
var open = 0;

$('.menuButton').bind('click', function(){
  $('.btn').toggleClass('activeBtn');
  if (open===0) {
          $("#overmenu").animate({"margin-right": '+=101%'});
          $('.wrapper').addClass("fixedPosition");
          open=1;
        } else {
          $("#overmenu").animate({"margin-right": '-=101%'});
		  $('.wrapper').removeClass("fixedPosition");
          open=0;
        }
})

$("#overmenu").on("click", "a", function(event){
   $('.btn').toggleClass('activeBtn');
        if (open===0) {
          $("#overmenu").animate({"margin-right": '+=101%'});
          open=1;
        } else {
          $("#overmenu").animate({"margin-right": '-=101%'});
          open=0;
        }
});


// var offset = $('.video-btn').offset().top;
// var navbar = $('.header');
//
// $(document).scroll(function() {
// 	position = $(this).scrollTop();
//   if (position < offset)
//   	navbar.css({'background-color': 'rgba(255, 255, 255, 0)', 'box-shadow': '0px 0px 0px 0px rgba(255, 255, 255, 0)'});
//   else
//     navbar.css({'background-color': '#fff', 'box-shadow': '0px 2px 10px 0px rgba(88, 82, 71, 0.25)'});
// });

// var offset = $('.video-btn').offset().top;
// var navbar = $('.header');

// $(document).scroll(function() {
// 	position = $(this).scrollTop();
//   if (position < offset)
//   	navbar.removeClass("header-solid");
//   else
// 		navbar.addClass("header-solid");
// });


/*------------------------------------------
	 Big Banner
-------------------------------------------*/
$(document).ready(function() {
  function setHeight() {
    windowHeight = $(window).innerHeight();
    $('.banner-c').css('height', windowHeight);
  };
  setHeight();

  $(window).resize(function() {
    setHeight();
  });
});


});
