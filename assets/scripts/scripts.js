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

var offset = $('.nav-open').offset().top;
var navbar = $('.header');

$(document).scroll(function() {
	position = $(this).scrollTop();
  if (position < offset)
  	navbar.removeClass("header-solid");
  else
		navbar.addClass("header-solid");
});




});
