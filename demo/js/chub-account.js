$(document).ready(function(){
    loadUsername();
});

$("#editUserSubmit").click(function(){
    name = $("#name").val();
    tel = $("#phone").val();
    email = $("#email").val();
    $('#sureModal').modal({
        keyboard: false,
        backdrop: 'static'
    })
    $('#loadingText').html("Updating account... Please wait a moment");
    $('#modalClose').hide();
    $('#loadingText').html("This is only a demo.");
    $('#modalClose').show();
})

$("#newPassword").click(function(){
    $('#passwordClose').show();
    $('#passwordUpdateSubmit').show();
    $('#modalPassValidation').html("");
    $('#newPasswordDiv').show();
    $('#passwordText').html("");
    $('#myModalPass').modal({
        keyboard: false,
        backdrop: 'static'
    })
})


function loadUsername(){
    $.getJSON("json/rest/member/getLoggedInUserInfo",function(userData){
        data = userData.statements;
        loadBanner(data);
        $("#accountName").html(data.fn + "'s Account<span class='caret'></span>");
        $("#name").val(data.fn);
        $("#phone").val(data.tel);
        $("#email").val(data.email);
    })
}

$('#passwordUpdateSubmit').click(function(){
    $('#modalPassValidation').css("color","red");
    $('#modalPassValidation').html("");
    password = $("#password").val();
    passwordCheck = $("#passwordCheck").val()
    validationString = "";
    valid = true;
    if(password != passwordCheck){
        validationString+="Passwords don't match.<br>";
        valid = false;
    }
    if(password.length<8){
        validationString+="Password must be at least 8 characters.<br>";
        valid = false;
    }
    if(password.match(/[0-9]/g) == null){
        validationString+="Password must contain a number.<br>";
        valid = false;
    }
    if(password.indexOf(' ')>=0){
        validationString+="Password must not contain any spaces.<br>";
        valid = false;
    }
    if(password == password.toUpperCase()){
        validationString+="Password must contain a lower case letter.<br>";
        valid = false; 
    }
    if(password == password.toLowerCase()){
        validationString+="Password must contain an upper case letter.<br>";
        valid = false; 
    }
    if(password.indexOf("#")<0 && password.indexOf("@")<0 && password.indexOf("!")<0 && password.indexOf("$")<0 
        && password.indexOf("?")<0 && password.indexOf("%")<0){
        validationString+="Password must have one of the following special characters: !@#$%?<br>";
        valid = false;
    }
    if(!valid){
        $('#modalPassValidation').html(validationString);
    }
    else{
        $('#newPasswordDiv').hide();
        $('#passwordUpdateSubmit').hide();
        $('#passwordClose').hide();
        $('#passwordText').html("Password being updated... Please wait a moment.");
        var shaObj = new jsSHA(password, "TEXT");
        var hash = shaObj.getHash("SHA-512", "HEX");
        $('#passwordText').html("This is only a demo.");
        $('#passwordClose').show();
    }
})
