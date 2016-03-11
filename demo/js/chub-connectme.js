$(document).ready(function(){
    $("#numKids").val(0);
    $("#oneOrOther .btn").removeClass("active");
    $("#commonDiverse .btn").removeClass("active");
    $('.meetingTime').prop('disabled',true);
    loadUsername();

});

$("#maritalStatus").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val().replace("+","%2B"));
  $("#ageRangeLabel").css("color","white");
})

$("#ageRange").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val().replace("+","%2B"));
  $("#ageRangeLabel").css("color","white");
})

$("#gender").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val());
  $("#genderLabel").css("color","white");
})

$("#numKids").change(function(){
     numKids = $("#numKids").val();
     addChildInfo(numKids);
})


$(".meetingDay").change(function(){
  $("#meetingTimeLabel").css("color","red");
  $(this).siblings('.meetingTime').prop('disabled',false);
  $(this).siblings('.meetingTime').val("-");
})


$(".meetingTime").change(function(){
  $("#meetingTimeLabel").css("color","white");
  saveProfileValue($(this).attr('id'),$(this).siblings('.meetingDay').val()+","+$(this).val());
})

$("#groupDynamic").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val());
})

$(".hobby").click(function(){
  saveProfileValue($(this).val(),this.checked);
  $("#hobbyLabel").css("color","white");
  if($(".hobby:checked").length == 0){
    $("#hobbyLabel").css("color","red");
  }
})

$("#alertFrequency").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val());
  $("#alertFrequencyLabel").css("color","white"); 
})

$("#desiredDynamicFamily").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val());
  $("#familyMixLabel").css("color","white"); 
})

$("#desiredDynamicInterests").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val());
  $("#interestsMixLabel").css("color","white"); 
})

function saveAddress(){
    name = $("#searchableLocationName").html();
    address = $("#searchableLocationAddress").html();
    lat = $("#searchableLocationLat").val();
    lng = $("#searchableLocationLng").val();
    percent = changeProgressBar(false);
    /*
    $.post("/rest/member/editLoggedInUserLocation",
        { name:name,
          address:address,
          lat:lat,
          lng:lng,
          percent:percent},
        function(data){
    })*/
  $("#searchableLocationLabel").css("color","white"); 
}



$("#submit").click(function(){
    window.location.href = "/member/groups.html";
})

function saveProfileValue(name,value){
  /*
  $.post("/rest/member/editLoggedInUserProfile",{page:"connect",key:name,value:value},
        function(data){
    })
  */
}

function addChildInfo(numKids){
       $("#ageOfKids").html("");
     if(numKids>0){
        $(".kidLabels").css("color","red");
        $("#ageOfKids").html("<label class='kidLabels' style='color:red;'>Gender/Age of Child(ren):</label>");
     }
     for(var i=0;i<numKids;i++){
        var newdiv = document.createElement('div');
            newdiv.innerHTML = 
            '<select class="kidGender">'+
            '<option selected disabled>-</option>'+
              '<option val="Male">Male</option>'+
              '<option val="Female">Female</option>'+
            '</select>'+
            '<select class="kidAge" disabled>'+
            '<option selected disabled>-</option>'+
              '<option val="0-3">0-3</option>'+
              '<option val="Pre-K">Pre-K</option>'+
              '<option val="Elementary">Elementary</option>'+
              '<option val="Middle">Middle</option>'+
              '<option val="HS">HS</option>'+
              '<option val="College">College</option>'+
              '<option val="Empty Nest">Empty Nest</option>'+
              '<option val="Grandchild">Grandchild</option>'+
            '</select>';
          $("#ageOfKids").append(newdiv);
     }
    $(".kidGender").change(function(){
      $(this).siblings('.kidAge').prop('disabled',false);
      $(this).siblings('.kidAge').val("-");
    })
    $(".kidAge").change(function(){
      valid = true;
      $('.kidAge').each(function(){
        if(!$(this).val()){valid = false;}});
      if(valid){
        $(".kidLabels").css("color","white");
        saveProfileValue("kidGenderAgeGroup",getKidGenderAgeGroup());
      }
    })
}

function getKidGenderAgeGroup(){
    kidGenderAgeGroup = '';
    $(".kidAge").each(function(key,val){
      ageGroup = $(this).val();
      gender = $(this).siblings('.kidGender').val();
      if(key == 0){
            kidGenderAgeGroup += gender + "," + ageGroup 
        }
        else{
            kidGenderAgeGroup += ";" + gender + "," + ageGroup
        }
    })
    return kidGenderAgeGroup;
}

function setKidGenderAgeGroup(kidGenderAgeGroups){
  genderAgeArray = kidGenderAgeGroups;
   $("#numKids").val(kidGenderAgeGroups.length);
    addChildInfo(kidGenderAgeGroups.length);
    for(var i=0;i<kidGenderAgeGroups.length;i++){
      kidGenderAgeGroup = kidGenderAgeGroups[i].split(',');
      $('.kidGender').eq(i).val(kidGenderAgeGroup[0]);
      $('.kidAge').eq(i).val(kidGenderAgeGroup[1]);
    }
    $('.kidAge').prop('disabled',false);
    $(".kidLabels").css("color","white");
    return kidGenderAgeGroups;
}


function loadUsername(){
    $.getJSON("json/rest/member/getLoggedInUserInfo",function(userData){
        data = userData.statements;
        loadBanner(data);
        $("#occupation").val(data.occupation);
        if(data.occupation){
          $("#occupationLabel").css("color","white");
        }
        else{
          $("#occupationLabel").css("color","red");
        }
        $("#education").val(data.education);
        if(data.education){
          $("#educationLabel").css("color","white");
        }
        else{
          $("#educationLabel").css("color","red");
        }
        $("#maritalStatus").val(data.maritalStatus); 
        if(data.maritalStatus){
          $("#maritalStatusLabel").css("color","white");
        }
        else{
          $("#maritalStatusLabel").css("color","red");
        }
        if(data.maritalStatus == 'Married'){
          $("#spouseEmailDiv").show();
        }
        if(data.location){
          $("#searchableLocationConnect").val(data.location);
          $("#searchableLocationName").html(data.location);
        }
        if(data.locationAddress){
          $('#searchableLocationAddress').html(data.locationAddress);
        }

        $("#gender").val(data.gender); 
        if(data.gender){
          $("#genderLabel").css("color","white");
        }
        else{
          $("#genderLabel").css("color","red");
        }
        $("#ageRange").val(data.ageRange); 
        if(data.ageRange){
          $("#ageRangeLabel").css("color","white");
        }
        else{
          $("#ageRangeLabel").css("color","red");
        }
        if(data.personHasPrimaryChurchOrg){
          loadChurchOrgs(data.personHasPrimaryChurchOrg,data.churchOrgs);
          $("#primaryChurchOrg").html(data.personHasPrimaryChurchOrg);
          $("#primaryChurchOrgLabel").css("color","white");
        }
        else{
          $("#primaryChurchOrgLabel").css("color","red");
        }
        if(data.kidGenderAgeGroup){
            setKidGenderAgeGroup(data.kidGenderAgeGroup); 
        }



        if(data.desiredDynamicInterests){
          $('#desiredDynamicInterests').val(data.desiredDynamicInterests);
          $("desiredDynamicInterestsLabel").css("color","white");
        }
        if(data.desiredDynamicFamily){
          $('#desiredDynamicFamily').val(data.desiredDynamicFamily);
          $("desiredDynamicFamilyLabel").css("color","white");
        }
        
        $("#hobbyLabel").css("color","red");
        if(data.hobbyMusicLover == "true"){
           $("input:checkbox[value=hobbyMusicLover]").prop("checked", data.hobbyMusicLover === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbyStressRelief == "true"){
           $("input:checkbox[value=hobbyStressRelief]").prop("checked", data.hobbyStressRelief === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbyKidsFamily == "true"){
           $("input:checkbox[value=hobbyKidsFamily]").prop("checked", data.hobbyKidsFamily === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbySportsFitness == "true"){
           $("input:checkbox[value=hobbySportsFitness]").prop("checked", data.hobbySportsFitness === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbyOutdoors == "true"){
           $("input:checkbox[value=hobbyOutdoors]").prop("checked", data.hobbyOutdoors === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbySharpenTheMind == "true"){
           $("input:checkbox[value=hobbySharpenTheMind]").prop("checked", data.hobbySharpenTheMind === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbyCraftersArtists == "true"){
           $("input:checkbox[value=hobbyCraftersArtists]").prop("checked", data.hobbyCraftersArtists === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbyHistoryBuffs == "true"){
           $("input:checkbox[value=hobbyHistoryBuffs]").prop("checked", data.hobbyHistoryBuffs === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbyScienceAndNature == "true"){
           $("input:checkbox[value=hobbyScienceAndNature]").prop("checked", data.hobbyScienceAndNature === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbyAdventureSeekers == "true"){
           $("input:checkbox[value=hobbyAdventureSeekers]").prop("checked", data.hobbyAdventureSeekers === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbySocial == "true"){
           $("input:checkbox[value=hobbySocial]").prop("checked", data.hobbySocial === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbyEntrepreneur == "true"){
           $("input:checkbox[value=hobbyEntrepreneur]").prop("checked", data.hobbyEntrepreneur === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbyMotorsports == "true"){
           $("input:checkbox[value=hobbyMotorsports]").prop("checked", data.hobbyMotorsports === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbyCollectors == "true"){
           $("input:checkbox[value=hobbyCollectors]").prop("checked", data.hobbyCollectors === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.groupType){
          $("#groupTypeLabel").css("color","white");
          $("#groupType").val(data.groupType.split(','));
        }
        else{
          $("#groupTypeLabel").css("color","red");
        }
        
 
        var mq = window.matchMedia('only screen and (min-device-width: 320px) and (max-device-width: 1024px)');
        if(!mq.matches) {
            $('#groupType').multiselect({
            buttonWidth: '200px',
            maxHeight: '200',
            onDropdownHide: function(event) {
              if($('#groupType').val()){
                  saveProfileValue($('#groupType').attr('id'),$('#groupType').val().toString());
                  $("#groupTypeLabel").css("color","white"); 
              }
              else{
                  saveProfileValue($('#groupType').attr('id'),""); 
                  $("#groupTypeLabel").css("color","red"); 
              }
            },
          });
           

        }
        else {
         
          $("#groupType").change(function(){
           if($('#groupType').val()){
                saveProfileValue($('#groupType').attr('id'),$('#groupType').val().toString());
                $("#groupTypeLabel").css("color","white"); 
            }
            else{
                saveProfileValue($('#groupType').attr('id'),""); 
                $("#groupTypeLabel").css("color","red"); 
            }
          })
        }

        
        $("#alertFrequency").val(data.alertFrequency); 
        if(data.alertFrequency){
          $("#alertFrequencyLabel").css("color","white");
        }
        else{
          $("#alertFrequencyLabel").css("color","red");
        }

        if(data.profileCompleted){
          setProgressBarValue(data.profilePercentCompleted,true); 
        }
        else{
          if(data.profilePercentCompleted){
            setProgressBarValue(data.profilePercentCompleted,false); 
          }
          else{
           setProgressBarValue("0",false);  
          }
          $("#progress-bar").css("background-color","red");
        }
        
    })
}


function changeProgressBar(predictionsUpdated){
  complete = 0;
  total = 0;

  if($("#maritalStatus").val()){
    complete += 1;
  }
  total +=1;

  if($("#ageRange").val()){
    complete += 1;
  }
  total +=1;

  if($("#searchableLocationName").text().length>0){
    complete += 1;
  }
  total +=1;

  if($("#gender").val()){
    complete += 1;
  }
  total +=1;
  console.debug(complete+":"+total);
  if($("#familyMix").val()){
    complete += 1;
  }
  total +=1;

  if($("#interestsMix").val()){
    complete += 1;
  }
  total +=1;

  hobbyCompleted = false;
  $('.hobby').each(function () {
      if(this.checked){
        hobbyCompleted = true;
      }
  });
  if(hobbyCompleted){
    complete += 1;
  }
  total+=1;

  if($("#groupType").val()){
    complete+= 1;
  };
  total+=1;

  if($("#alertFrequency").val()){
    complete+= 1;
  };
  total+=1;

  number = Math.round(complete/total*100);
  setProgressBarValue(number,predictionsUpdated);
  return number;
}

function setProgressBarValue(number,predictionsUpdated){
  
  $("#progress-bar").attr('aria-valuenow', number).css("width", ""+number+"%");
  if(predictionsUpdated){
    $("#progress-bar").text(""+number+"%");
  }
  else{
    $("#progress-bar").text(""+number+"% Submit Update");
    $("#progress-bar").css("background-color","red");
  }

}

function loadChurchOrgs(primaryChurchOrg,churchOrgs){
      $.getJSON('json/rest/member/listChurchOrgs', function(data){
        orgHTML = '';
        $.each(data.statements, function (key,val){
          if(val.id != primaryChurchOrg.id){
            orgHTML += '<option value="'+val.id+'">'+val.orgName+'</option>'; 
          }
        })
        $('#primaryChurchOrg').html(primaryChurchOrg.orgName);
        $('#secondaryChurchOrgs').html(orgHTML);
        if(churchOrgs){
          churchOrgArray = []
          $.each(churchOrgs, function (key,val){
            churchOrgArray.push(val.id);
          })
          $("#secondaryChurchOrgs").val(churchOrgArray);
          $("#churchOrgLabel").css("color","white");
        }
        $('#secondaryChurchOrgs').multiselect({
          maxHeight: '200',
          buttonWidth: '300',
          numberDisplayed: 1,
          nSelectedText: 'Selected',
          onDropdownHide: function(event) {
            if($('#secondaryChurchOrgs').val()){
              churchOrgs = "";
                for(var i=0;i<$('#secondaryChurchOrgs').val().length;i++){
                  if(i == 0){
                    churchOrgs = $('#secondaryChurchOrgs').val()[i];
                  }
                  else{
                    churchOrgs += ';'+$('#secondaryChurchOrgs').val()[i];
                  }
                }
                saveProfileValue($('#secondaryChurchOrgs').attr('id'),churchOrgs);
                $("#churchOrgLabel").css("color","white");
            }
            else{
                saveProfileValue($('#secondaryChurchOrgs').attr('id'),""); 
                $("#churchOrgLabel").css("color","red");
            }
          },
        });
    })
}

function loadSecondaryChurchOrgs(primaryChurchOrg){
      $.getJSON('json/rest/member/listChurchOrgs', function(data){
        orgHTML = '';
        $.each(data.statements, function (key,val){
          if(val.orgName != primaryChurchOrg){
            orgHTML += '<option value="'+val.id+'">'+val.orgName+'</option>'; 
          }
        })
        $('#secondaryChurchOrgs').html(orgHTML);
        $('#secondaryChurchOrgs').multiselect('destroy');
        $('#secondaryChurchOrgs').multiselect({
          maxHeight: '200',
          numberDisplayed: 1,
          nSelectedText: 'Selected',
          onDropdownHide: function(event) {
            if($('#secondaryChurchOrgs').val()){
                churchOrgs = "";
                for(var i=0;i<$('#secondaryChurchOrgs').val().length;i++){
                  if(i == 0){
                    churchOrgs = $('#secondaryChurchOrgs').val()[i];
                  }
                  else{
                    churchOrgs += ';'+$('#secondaryChurchOrgs').val()[i];
                  }
                }
                saveProfileValue($('#secondaryChurchOrgs').attr('id'),churchOrgs);
                $("#churchOrgLabel").css("color","white");
            }
            else{
                saveProfileValue($('#secondaryChurchOrgs').attr('id'),""); 
                $("#churchOrgLabel").css("color","red");
            }
          },
        });
    })
}