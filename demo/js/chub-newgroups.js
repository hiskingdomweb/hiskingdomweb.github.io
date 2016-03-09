var autocomplete;
$(document).ready(function(){
    $("#groupForm")[0].reset();
    loadUsername();
});

$('#groupUsesInterests').change(function(){
  if($(this).val()=="true"){
    $('#hobbies').show();
  }
  else{
   $('#hobbies').hide(); 
  }
})

$('#groupSubmit').click( function() {
    name = $("#groupName").val();
    category = $(".groupOrEvent.active").children().val();
    startDate = $("#datepickStart").val();
    startTime = $("#startTimePick").val();
    //endDate = $("#datepickEnd").val();
    endTime = $("#endTimePick").val();
    repeats = $("#repeatDate").prop('checked');
    repeatsFrequency = "";
    repeatsDaysOfWeekArray = [];
    repeatsMonthType = "";
    repeatsEndDate = "";
    if(repeats == true){
      repeatsFrequency = $("#groupRepeats").val();
      if(repeatsFrequency == "Weekly"){
        $(".repeatDayOfWeek:checked").each(function(){
          repeatsDaysOfWeekArray.push($(this).val());
        })
      }
      
      if(repeatsFrequency == "Monthly"){
        repeatsMonthType = $(".monthTypeSelect:checked").val();
      }
      repeatsEndDate = $("#datepickRepeatEnd").val();
    }
    repeatsDaysOfWeek = repeatsDaysOfWeekArray.toString();
    repeatsSummaryText = $("#repeatText").html();
    groupPurpose = $("#groupPurpose").val().replace(/\r?\n/g, '<br />');
    eventType = $("#groupType").val();
    locationName = $("#searchableLocationName").html();
    locationLat = $("#searchableLocationLat").val();
    locationLng = $("#searchableLocationLng").val();
    locationAddress = $("#searchableLocationAddress").html();
    usesInterests = $("#groupUsesInterests").val();
    
    startTime = $("#startTimepick").val();
    endTime = $("#endTimepick").val();
    purpose = $("#groupPurpose").val();
    
    otherChurchOrgs = "";
    primaryChurchOrg = $("#primaryChurchOrg").val();
    otherChurchOrgArray = $("#churchOrgs").val();
    if(otherChurchOrgArray){
      for(var i=0;i<otherChurchOrgArray.length;i++){
        if(i==0){
          otherChurchOrgs = otherChurchOrgArray[i];
        }
        else{
          otherChurchOrgs += ";"+ otherChurchOrgArray[i];
        }
      }
    }
    gender = $("#gender").val();
    age = $("#age").val()
    childcare = $("#groupChildcare").val();
    
    hobbyMusicLover = $("#hobbyMusicLover").is(':checked');
    hobbyStressRelief = $("#hobbyStressRelief").is(':checked');
    hobbyKidsFamilies = $("#hobbyKidsFamilies").is(':checked');
    hobbySportsFitness = $("#hobbySportsFitness").is(':checked');
    hobbyOutdoors = $("#hobbyOutdoors").is(':checked');
    hobbySharpenTheMind = $("#hobbySharpenTheMind").is(':checked');
    hobbyCraftersArtists = $("#hobbyCraftersArtists").is(':checked');
    hobbyHistoryBuffs = $("#hobbyHistoryBuffs").is(':checked');
    hobbyScienceNature = $("#hobbyScienceNature").is(':checked');
    hobbyAdventureSeekers = $("#hobbyAdventureSeekers").is(':checked');
    hobbySocial = $("#hobbySocial").is(':checked');
    hobbyEntrepreneur = $("#hobbyEntrepreneur").is(':checked'); 
    hobbyMotorsports = $("#hobbyMotorsports").is(':checked');
    hobbyCollectors = $("#hobbyCollectors").is(':checked');
    
    validation = true;
    validationString = "";

    if(name.length == 0){
      validationString += "Please enter a name.<br>";
      validation = false;
    }
    if(!purpose){
      validationString+= "Please enter a purpose.<br>";
      validation = false;
    }
    if(!eventType){
      validationString+= "Please select a type.<br>";
      validation = false;
    }
    if(locationLat.length == 0){
      validationString+= "Please enter a valid location.<br>";
      validation = false;
    }
    if(!gender){
      validationString += "Please select a gender.<br>";
      validation = false;
    }
    if($('#groupUsesInterests').val()=="true" && !$('.hobby:checked').val()){
      validationString+= "Please select an interest.<br>";
      validation = false;
    }
    if(!age){
      validationString+= "Please select an age range.<br>";
      validation = false;
    }
    if(!childcare){
      validationString+= "Please indicate whether childcare is provided.<br>";
      validation = false;
    }
    if(!validation){
      $("#validation").html(validationString);
      return false;
    }
    $("#myModal2Body").hide();
    $("#myModal2Footer").hide();
    $("#myModal2Label").html("Request Submitting... Please wait a moment.");
    $('#myModal2').modal({
        keyboard: false,
        backdrop: 'static'
    })

    $.post("/rest/member/addLoggedInLeaderGroup",
        { name:name,
          category:category,
          startDate:startDate,
          startTime:startTime,
          //endDate:endDate,
          endTime:endTime,
          repeats:repeats,
          repeatsFrequency:repeatsFrequency,
          repeatsDaysOfWeek:repeatsDaysOfWeek,
          repeatsMonthType:repeatsMonthType,
          repeatsEndDate:repeatsEndDate,
          repeatsSummaryText:repeatsSummaryText,
          purpose:purpose,
          eventType:eventType,
          locationName:locationName,
          locationAddress:locationAddress,
          locationLat:locationLat,
          locationLng:locationLng,
          usesInterests:usesInterests,
          primaryChurchOrg:primaryChurchOrg,
          otherChurchOrgs:otherChurchOrgs,
          gender:gender,
          age:age,
          childcare:childcare,
          hobbyMusicLover:hobbyMusicLover,
          hobbyStressRelief:hobbyStressRelief,
          hobbyKidsFamilies:hobbyKidsFamilies,
          hobbySportsFitness:hobbySportsFitness,
          hobbyOutdoors:hobbyOutdoors,
          hobbySharpenTheMind:hobbySharpenTheMind,
          hobbyCraftersArtists:hobbyCraftersArtists,
          hobbyHistoryBuffs:hobbyHistoryBuffs,
          hobbyScienceNature:hobbyScienceNature,
          hobbyAdventureSeekers:hobbyAdventureSeekers,
          hobbySocial:hobbySocial,
          hobbyEntrepreneur:hobbyEntrepreneur,
          hobbyMotorsports:hobbyMotorsports,
          hobbyCollectors:hobbyCollectors,
        },
        function(data){
          $("#myModal2Label").html(data.status);
          if(data.status == "Group Succesfully Submitted."){
              resetGroupForm();
            }
            $("#myModal2Footer").show();   
    })
});



$('.clear-group-form').click( function() {
  resetGroupForm();
});
function resetGroupForm(){
    $("#groupForm")[0].reset();
    $('#groupForm').show();
    $('#groupSubmit').show();
    $('#hobbies').hide();
    $("#validation").html("");
    $("#age").val("Mixed");
    $("#gender").val("Mixed");
    $(".multiselect").prop("title","None Selected");
    $(".multiselect span").html("None Selected");
    $(".multiselect-container li").removeClass("active");
    $("[name='groupOrEvent'][value='event']").parent().removeClass("active");
    $("[name='groupOrEvent'][value='group']").parent().addClass("active");
    $("input:checkbox").prop("checked",false);
    $("#churchOrgs").val("");
    resetDateModal();
    $("#searchableLocationName").html("");
    $("#searchableLocationAddress").html("");
    $("#searchableLocationLat").html("");
    $("#searchableLocationLng").html("");
}

function loadUsername(){
    $.getJSON("/rest/member/getLoggedInUserInfo",function(userData){
        data = userData.statements;
        loadBanner(data);
        loadChurchOrgs(data.personHasPrimaryChurchOrg);
        $('#primaryChurchOrgName').html(data.personHasPrimaryChurchOrg.orgName);
        $('#primaryChurchOrg').val(data.personHasPrimaryChurchOrg.id);
        genderHTML = "";
        if(data.gender){
          genderHTML += '<option value="'+data.gender+'">'+data.gender+'</option>';
        }
        genderHTML += '<option value="Mixed" selected>Mixed</option>';
        $('#gender').html(genderHTML);

        ageHTML = "";
        if(data.ageRange){
          ageHTML += '<option value="'+data.ageRange+'">My Age Range</option>';
        }
        ageHTML += '<option value="Mixed" selected>Mixed</option>';
        $('#age').html(ageHTML);
    })
}

function loadChurchOrgs(primaryChurchOrg){
      $.getJSON('/rest/member/listChurchOrgs', function(data){
        orgHTML = '';
        $.each(data.statements, function (key,val){
          if(val.id != primaryChurchOrg.id){
            orgHTML += '<option value="'+val.id+'">'+val.orgName+'</option>'; 
          }
        })
        $('#churchOrgs').html(orgHTML);
        var mq = window.matchMedia('only screen and (min-device-width: 320px) and (max-device-width: 1024px)');
        if(!mq.matches) {
          $('#churchOrgs').multiselect({
            maxHeight: '200',
            numberDisplayed: 1,
            nSelectedText: 'Selected',
          });
        }
    })
}

$("#modalNo").click(function(){
  window.location.href = '/member/index.html';
})


