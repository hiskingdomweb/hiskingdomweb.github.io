$(document).ready(function(){

	$("#menu").hide();

	$("#menu_icn").click(function(){
		$("#menu").fadeIn(150);
	});
	
	$("#close_menu, #menu").click(function(){
		$("#menu").fadeOut(150);
	});

});