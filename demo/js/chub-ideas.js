$(document).ready(function(){
  loadUsername();
});

function loadUsername(){
    $.getJSON("json/rest/member/getLoggedInUserInfo",function(userData){
        data = userData.statements;
        $("#accountName").html(data.fn + "'s Account<span class='caret'></span>");
        number = 0;
        if(data.profilePercentCompleted){
            number = data.profilePercentCompleted;
        }
        $("#percentComplete").html("<h3>You have completed " + 
            number + "% of your profile.</h3>");
        $("#progress-bar").attr('aria-valuenow', number).css("width", ""+number+"%");
        $("#progress-bar").text(""+number+"%");
    })
}

$("#sendIdea").click(function(){
    $("#modalClose").hide();
    $("#myModalLabel").html("Sending Email...");
    $('#myModal').modal({
        keyboard: false,
        backdrop: 'static'
    })
    $('#myModal').modal('show');
    $("#myModalLabel").html("This demo doesn't send ideas, please email hiskingdom@hiskingdom.net instead.");
    $("#modalClose").show();
    $("#idea").val('');
})

