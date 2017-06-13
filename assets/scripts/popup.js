$(document).ready(function($){

$(document).ready(function() {
	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});
  $.extend(true, $.magnificPopup.defaults, {
      iframe: {
          patterns: {
            vimeo: {
             index: 'vimeo.com/',
             id: '/',
             src: 'https://player.vimeo.com/video/%id%?autoplay=1'
            }
          }
      }
  });

});



});
