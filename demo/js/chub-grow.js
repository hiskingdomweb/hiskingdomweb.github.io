$(document).ready(function(){
    loadUsername();
});

$("#spiritualJourneyMix").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val());
})

$("#wantsMissions").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val());
  $("#wantsMissionsLabel").css("color","white");
})

$("#beenOnMissions").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val());
  $("#beenOnMissionsLabel").css("color","white");
})

$("#spiritualJourney").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val());
  $("#spiritualJourneyLabel").css("color","white"); 
})

$("#spiritualGifts").click(function(){
    if($("#spiritualGifts").text().indexOf("Retake")>=0){
      $('#sureModal').modal({
        keyboard: false,
        backdrop: 'static'
        })
      $('#sureModal').modal('show');
    }
    else{
      location.href = 'spiritGifts.html';
    }
    
})

$("#submit").click(function(){
  window.location.href = '/member/groups.html';
})

function saveProfileValue(name,value){
  $.post("/rest/member/editLoggedInUserProfile",{page:"grow",key:name,value:value},
        function(data){
    })
}


function loadUsername(){
    $.getJSON("/rest/member/getLoggedInUserInfo",function(userData){
        data = userData.statements;
        loadBanner(data);
        if(data.desiredDynamicSpiritual){
          $("#spiritualJourneyMixLabel").css("color","white");
          $('#spiritualJourneyMix').val(data.desiredDynamicSpiritual);
        }
        else{
          $("#spiritualJourneyMixLabel").css("color","red");
        }
        if(data.growthAreas){
          $("#growthAreasLabel").css("color","white");
          $("#growthAreas").val(data.growthAreas.split(','));
        }
        else{
          $("#growthAreasLabel").css("color","red");
        }
        if(data.hasCompletedSurvey && data.hasCompletedSurvey.indexOf("spiritualGifts")>=0){
          $("#spiritualGifts").text("Retake Spiritual Gifts Survey");
          if(data.spiritualGifts && data.spiritualGifts.length > 0){
            spiritGiftsHTML = "<ul>";
            spiritGiftsList = data.spiritualGifts.split(',');
            $.each(spiritGiftsList, function(key,spiritGift){
              spiritGiftsHTML+="<li>"+spiritGift+"</li>";
            })
     
            $("#spiritualGiftsListed").html(spiritGiftsHTML+"</ul>");
          }
          else{
            $("#spiritualGiftsListed").html("None");
          }
        }
        $("#spiritualJourney").val(data.spiritualJourney);
        if(data.spiritualJourney){
          $("#spiritualJourneyLabel").css("color","white");
        }
        else{
          $("#spiritualJourneyLabel").css("color","red");
        }
        var mq = window.matchMedia('only screen and (min-device-width: 320px) and (max-device-width: 1024px)');
        if(!mq.matches) {
          $('#growthAreas').multiselect({
            buttonWidth: '200px',
            maxHeight: '200',
            onDropdownHide: function(event) {
              if($('#growthAreas').val()){
                  saveProfileValue($('#growthAreas').attr('id'),$('#growthAreas').val().toString());
                  $("#growthAreasLabel").css("color","white");
              }
              else{
                  saveProfileValue($('#growthAreas').attr('id'),""); 
                  $("#growthAreasLabel").css("color","red");
              }
            },
          });
        } 
        else {
          $("#growthAreas").change(function(){
            if($('#growthAreas').val()){
                saveProfileValue($('#growthAreas').attr('id'),$('#growthAreas').val().toString());
                $("#growthAreasLabel").css("color","white");
            }
            else{
                saveProfileValue($('#growthAreas').attr('id'),""); 
                $("#growthAreasLabel").css("color","red");
            }
          })
          
        }

        


        $("#beenOnMissions").val(data.beenOnMissions); 
        if(data.beenOnMissions){
          $("#beenOnMissionsLabel").css("color","white");
        }
        else{
          $("#beenOnMissionsLabel").css("color","red");
        }
        $("#wantsMissions").val(data.wantsMissions); 
        if(data.wantsMissions){
          $("#wantsMissionsLabel").css("color","white");
        }
        else{
          $("#wantsMissionsLabel").css("color","red");
        }
        
    })
}
