$(document).ready(function(){
    loadUsername();
});


$("#submit").click(function(){
    $('#myModal2').modal({
        keyboard: false,
        backdrop: 'static'
    })
    whatCanWeDoHTML= "<ul>";
    $.each($('.whatCanWeDo:checked'),function(key,val){
      whatCanWeDoHTML+= "<li>"+$($(val).parent()).text()+"</li>";
    });
    whatCanWeDoHTML += "</ul>";

    otherText = '';
    newToChurch = '';
    if($('#newToChurch').prop('checked')){
      newToChurch="I am new to the church. ";
    }
    if($('#privatePrayer').prop('checked')){
      otherText+="I'd like to keep my prayer requests private."
    }

    $.post("/rest/member/submitBeginProfile",{
      whatCanWeDo:whatCanWeDoHTML,
      howCanWeHelp:$('#churchHelp').val(),
      otherText:otherText,
      newToChurch:newToChurch},
        function(data){
          window.location.href = "/member/index.html";
    })
  
})

function loadUsername(){
    $.getJSON("/rest/member/getLoggedInUserInfo",function(userData){
        data = userData.statements;
        if(data.beginPercentComplete != "100"){
         $('#topSiteName').html("Begin Here");
        }
        loadBanner(data);
        $('#userName').val(data.fn);
        $('#newToChurchDiv').html("<label><input type='checkbox' id='newToChurch'>&nbsp;&nbsp;I am new to " + 
          data.personHasPrimaryChurchOrg.orgName+".</label>");
        $('#betterConnectedLabel').html("<input type='checkbox' class='whatCanWeDo'>&nbsp;&nbsp;"+
          "I'd like to get better CONNECTed at "+data.personHasPrimaryChurchOrg.orgName+".");
    })
}



