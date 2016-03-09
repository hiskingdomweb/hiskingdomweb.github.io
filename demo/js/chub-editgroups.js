$(document).ready(function(){
    $("#updatedGroup").val("false");
    $("#groupForm")[0].reset();
    $('#groupForm').hide();
    loadUsername();
    loadGroupTable();

});

$(document).change(function(){
    $("#updatedGroup").val("true");
})

$('#groupApproval').click( function() {
    $('#checkSuccess').html("Are you sure you want to approve this group?");
    $('#modalConfirm').show();
    $('#sureModal').modal({
        keyboard: false,
        backdrop: 'static'
        })
    $('#sureModal').modal('show');
})

$('#modalConfirm').click( function() {
    approveGroup();
})

$('#group-search-btn').click( function() {
    var rex = new RegExp($("#group-search-box").val(), 'i');
    $('.searchable-group tr').hide();
    $('.searchable-group tr').filter(function() {
        return rex.test($(this).text());
    }).show();
    $('#groupForm').hide();
});

function loadUsername(){
    $.getJSON("/rest/member/getLoggedInUserInfo",function(userData){
        data = userData.statements;
        $("#accountName").html(data.fn + "'s Account<span class='caret'></span>");
    })
}

function loadGroupTable(){
    $.getJSON("/rest/admin/listLoggedInGroups?groupApproval=false",function(data){
    //$.getJSON("json/rest/admin/listLoggedInGroups",function(data){
      
        grouptable = '<tbody class="searchable-group">';
        $("#groupForm")[0].reset();
        $.each(data.statements, function (key,val) {
            grouptable += "<tr><td><a href='#' onclick='loadGroup("+val.id+"); return false'>"+val.groupName+"</a>"+
            "</td><td><a href='#' onclick='deleteGroupModal(this.id); return false' id='"+val.id
            +"'>X</a></td></tr>";
        })
        $("#groupList").html(grouptable+"</tbody></table>");
        $('.searchable-group tr').show();
    })
}

function loadGroup(clicked_id){
    $('#groupUserSelect').find('option').remove().end();
    $('#groupForm').show();
    $('.searchable-group tr').hide();
    stateArray = [];
    countyArray = [];
    districtArray = [];
    stateCountyDistricts = [];
    $.post("/rest/admin/getGroupInfo",
       { name:clicked_id},function(userData){
    //$.getJSON('json/rest/admin/getGroupInfo',function(userData){
        data = userData.statements;
        $('#groupName').val(data.groupName);
        $('#groupId').val(clicked_id);
        $('#ledBy').html(data.ledBy.name+'&#60;'+data.ledBy.email+'&#62;');
        $('#ledByName').val(data.ledBy.name);
        $('#ledByEmail').val(data.ledBy.email);
        $('#datepickStart').pickadate('picker').set('select',new Date(data.groupStartDate));
        $('#startTimePick').val(data.groupStartTime);
        $('#datepickEnd').pickadate('picker').set('select',new Date(data.groupEndDate));
        $('#endTimePick').val(data.groupEndTime);
        $('#endpickStart').val(data.groupEndDate);
        $('#datepickRepeatEnd').val(data.groupDatepickRepeatEnd);
        $('#repeatDate').prop('checked',data.groupRepeats);
        if(data.groupRepeats == 'true'){
          $('#repeatDateEdit').show();
        }
        $('#groupRepeats').val(data.groupRepeatsFrequency);
        if(data.groupRepeatsFrequency == "Daily"){
          $('#dayOfWeekSelect').hide();
          $('#dayOfWeekOfMonthSelect').hide();
        }
        else if(data.groupRepeatsFrequency == "Weekly"){
          $('#dayOfWeekSelect').show();
          $('#dayOfWeekOfMonthSelect').hide();
          if(data.groupRepeatsDaysOfWeek){
            $.each($('.repeatDayOfWeek'),function(){
              if($.inArray($(this).val(),data.groupRepeatsDaysOfWeek.split(','))>-1){
                $(this).prop('checked',true);
              }
              else{
                $(this).prop('checked',false);
              }
            })
          }
        }
        else if(data.groupRepeatsFrequency == "Monthly"){
          $('#dayOfWeekSelect').hide();
          $('#dayOfWeekOfMonthSelect').show();
        }

        $("#repeatText").html(data.groupRepeatsSummaryText);
        $("#repeatTextInModal").html(data.groupRepeatsSummaryText);
        
        $('#datepickRepeatEnd').pickadate('picker').set('select',new Date(data.groupRepeatsEndDate));
        
        $('#searchableLocation').val(data.groupLocation);
        $('#searchableLocationName').html(data.groupLocation);
        $('#searchableLocationAddress').html(data.groupLocationAddress);
        $('#searchableLocationLat').val(data.groupLocationLat);
        $('#searchableLocationLng').val(data.groupLocationLng);
        $('#maxDistance').val(data.groupMaxDistance);



        $('#primaryChurchOrg').html(data.groupHasPrimaryChurchOrg);
        loadChurchOrgs(data.groupHasPrimaryChurchOrg,data.groupHasChurchOrg);
         
        $('#gender').val(data.groupGender);
        $('#age').val(data.groupAge);
        $("#meetingDay").val(data.groupMeetingDayPreference);
        $("#meetingTime").val(data.groupMeetingTimePreference);
        if(data.groupPurpose){
          $("#groupPurpose").val(data.groupPurpose.replace(/<br\s*[\/]?>/gi,"\n"));
        }
        $("#groupLocation").val(data.groupLocation);
        $("#groupChildcare").val(data.groupChildcare);
        
        
        $("#groupType").val(data.groupGroupType);
        $("#startTimepick").val(data.groupStartTime);
        $("#endTimepick").val(data.groupEndTime);
        $('#groupLocationAddress').html(data.groupLocationAddress);
        $('#groupLocationLat').val(data.groupLocationLat);
        $('#groupLocationLng').val(data.groupLocationLng);
        if(data.groupEventDate){
            $('#eventCalendarPick').show();
            $('#dayOfWeekPick').hide();

            $('#datepick').pickadate({
                  format: 'mm/dd/yyyy',
                  formatSubmit: 'mm/dd/yyyy',
                  min: new Date(),
            });

            var input = $('#datepick').pickadate();
            var picker = input.pickadate('picker');
            picker.set('select',data.groupEventDate);
        }
        else{
            $('#eventDiv').hide();
            $('#dayOfWeekPick').show();
        }

        if(data.groupHobbyMusicLover){
           $("#hobbyMusicLover").prop("checked", data.groupHobbyMusicLover === "true");
        }
        if(data.groupHobbyStressRelief){
           $("#hobbyStressRelief").prop("checked", data.groupHobbyStressRelief === "true");
        }
        if(data.groupHobbyKidsFamily){
           $("#hobbyKidsFamily").prop("checked", data.groupHobbyKidsFamily === "true");
        }
        if(data.groupHobbySportsFitness){
           $("#hobbySportsFitness").prop("checked", data.groupHobbySportsFitness === "true");
        }
        if(data.groupHobbyOutdoors){
           $("#hobbyOutdoors").prop("checked", data.groupHobbyOutdoors === "true");
        }
        if(data.groupHobbySharpenTheMind){
           $("#hobbySharpenTheMind").prop("checked", data.groupHobbySharpenTheMind === "true");
        }
        if(data.groupHobbyCraftersArtists){
           $("#hobbyCraftersArtists").prop("checked", data.groupHobbyCraftersArtists === "true");
        }
        if(data.groupHobbyHistoryBuffs){
           $("#hobbyHistoryBuffs").prop("checked", data.groupHobbyHistoryBuffs === "true");
        }
        if(data.groupHobbyScienceAndNature){
           $("#hobbyScienceAndNature").prop("checked", data.groupHobbyScienceAndNature === "true");
        }
        if(data.groupHobbyAdventureSeekers){
           $("#hobbyAdventureSeekers").prop("checked", data.groupHobbyAdventureSeekers === "true");
        }
        if(data.groupHobbySocial){
           $("#hobbySocial").prop("checked", data.groupHobbySocial === "true");
        }
        if(data.groupHobbyEntrepreneur){
           $("#hobbyEntrepreneur").prop("checked", data.groupHobbyEntrepreneur === "true");
        }
        if(data.groupHobbyMotorsports){
           $("#hobbyMotorsports").prop("checked", data.groupHobbyMotorsports === "true");
        }
        if(data.groupHobbyCollectors){
           $("#hobbyCollectors").prop("checked", data.groupHobbyCollectors === "true");
        }
        if($('.hobby:not(:checked)').size()==0){
          $("#checkAll").prop('checked',true);
        }

    })
}

function deleteGroupModal(clicked_id){
    $('#modalCloseDelete').show();
    $('#modalConfirmDelete').show();
    $("#clickedGroup").val(clicked_id.replace("&#39;","'"));
    $("#checkSuccessDelete").html("Are you sure you want to delete this group?");
    $('#sureModalDelete').modal({
        keyboard: false,
        backdrop: 'static'
        })
    $('#sureModalDelete').modal('show');
}

$("#modalConfirmDelete").click(function(){
    $('#modalCloseDelete').hide();
    $('#modalConfirmDelete').hide();
    $("#checkSuccessDelete").html("Deleting group, please wait a moment...");
    $.post("/rest/admin/deleteGroup",
        {name:$("#clickedGroup").val()},function(userData){
        loadGroupTable();
        $("#checkSuccessDelete").html("Group succesfully deleted.");
        $('#modalCloseDelete').show();
    })
})

function approveGroup(){
    $('#checkSuccess').html("Approving Group and Developing Group Predictions... Please wait a moment.");
    $('#modalConfirm').hide();
    $('#modalClose').hide();

    name = $("#groupName").val();
    groupId = $("#groupId").val();
    category = $(".groupOrEvent.active").children().val();
    ledBy = $('#ledByEmail').val();
    startDate = $("#datepickStart").val();
    startTime = $("#startTimePick").val();
    endDate = $("#datepickEnd").val();
    endTime = $("#endTimePick").val();
    repeats = $("#repeatDate").prop('checked');
    repeatsFrequency = $("#groupRepeats").val();
    repeatsDaysOfWeekArray = [];
    repeatsMonthType = "";
    if(repeats == true){
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
    maxDistance = $("#maxDistance").val();
    
    startTime = $("#startTimepick").val();
    endTime = $("#endTimepick").val();
    purpose = $("#groupPurpose").val();
    
    otherChurchOrgs = "";
    primaryChurchOrg = $("#primaryChurchOrg").html();
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
    hobbyKidsFamilies = $("#hobbyKidsFamily").is(':checked');
    hobbySportsFitness = $("#hobbySportsFitness").is(':checked');
    hobbyOutdoors = $("#hobbyOutdoors").is(':checked');
    hobbySharpenTheMind = $("#hobbySharpenTheMind").is(':checked');
    hobbyCraftersArtists = $("#hobbyCraftersArtists").is(':checked');
    hobbyHistoryBuffs = $("#hobbyHistoryBuffs").is(':checked');
    hobbyScienceNature = $("#hobbyScienceAndNature").is(':checked');
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
    if(name.indexOf("#")>=0){
      validationString += "Name can not contain a #.<br>";
      validation = false;
    }
    if(!purpose){
      validationString+= "Please enter a purpose.<br>";
      validation = false;
    }
    if(!eventType){
      validationString+= "Please select an event type.<br>";
      validation = false;
    }
    if(locationName.length == 0){
      validationString+= "Please enter a valid location.<br>";
      validation = false;
    }
    if(!gender){
      validationString += "Please select a gender.<br>";
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
    if($(".hobby:checked").length==0){
      validationString += "Please select at least one hobby.<br>";
      validation = false;
    }
    if(!validation){
      $("#validation").html(validationString);
      return false;
    }
    $("#myModal2Body").hide();
    $("#myModal2Footer").hide();
    $("#myModal2Label").html("Group Request Submitting... Please wait a moment.");
    $('#myModal2').modal({
        keyboard: false,
        backdrop: 'static'
    })

    $.post("/rest/admin/approveAndUpdateGroup",
        { groupId:groupId,
          name:name,
          ledBy:ledBy,
          category:category,
          startDate:startDate,
          startTime:startTime,
          endDate:endDate,
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
          maxDistance:maxDistance,
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
        },function(data){
        loadGroupTable();
        $('#checkSuccess').html(data.status);
        $('#modalClose').show();
        $('#groupForm').hide();
    })
}

function getMornMidNight(){
  result = "";
  var time = $("#startTimepick").val();
  if(time.indexOf("PM")>=0){
    isPM = true;
  }
  else{
    isPM = false;
  }
  if(time.indexOf(":")>=0){
    hour = parseInt(time.substring(0,time.indexOf(":")));
    if(!isPM && (hour>2 || hour == 12)){
      result = "Morn";
    }
    else if(isPM && (hour<5 || hour==12)){
      result = "Mid";
    }
    else{
      result = "Night";
    }
  }
    return result;
}

function loadChurchOrgs(primaryChurchOrg,churchOrgs){
      $.getJSON('/rest/member/listChurchOrgs', function(data){
        orgHTML = '';
        $.each(data.statements, function (key,val){
          if(val.orgName != primaryChurchOrg){
            orgHTML += '<option>'+val.orgName+'</option>'; 
          }
        })
        $('#churchOrgs').html(orgHTML);
        $("#churchOrgs").val(churchOrgs);
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

