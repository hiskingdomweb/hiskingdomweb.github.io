var allGroupJsonData;
var filteredGroupJsonData;
var usernameAjax;
var groupListAjax;
var iOSDayOfWeekPreferences;


$(document).ready(function(){
  loadTableVariables();
  loadUsername();
  $.when(groupListAjax,usernameAjax).done(function(key,val){
    filteredGroupJsonData.groups = filterJsonArrayGroup(allGroupJsonData.groups);
    sortAndCreateGroupTables();
    
    filteredGroupJsonData.events = filterJsonArrayEvent(allGroupJsonData.events);
    sortAndCreateEventTables();
  })
  $('#datepickEventStart').pickadate({
    format: 'mm/dd/yyyy',
    formatSubmit: 'mm/dd/yyyy',
    min: new Date()
  });
  $('#datepickEventEnd').pickadate({
    format: 'mm/dd/yyyy',
    formatSubmit: 'mm/dd/yyyy',
    min: new Date()
  });

});

$('#datepickEventStart').change(function(){
  filteredGroupJsonData.events = filterJsonArrayEvent(allGroupJsonData.events);
  sortAndCreateEventTables();

})


$('#startTimePreferenceGroup').change(function(){
  saveProfileValue('startTimePreference',$(this).val());
  $('.startTimePreference').val($(this).val());
  filteredGroupJsonData.groups = filterJsonArrayGroup(allGroupJsonData.groups);
  sortAndCreateGroupTables();
})
$('#endTimePreferenceGroup').change(function(){
  saveProfileValue('endTimePreference',$(this).val());
  $('.endTimePreference').val($(this).val());
  filteredGroupJsonData.groups = filterJsonArrayGroup(allGroupJsonData.groups);
  sortAndCreateGroupTables();
})
$('#startTimePreferenceEvent').change(function(){
  saveProfileValue('startTimePreference',$(this).val());
  $('.startTimePreference').val($(this).val());
  filteredGroupJsonData.events = filterJsonArrayEvent(allGroupJsonData.events);
  sortAndCreateEventTables();
})
$('#endTimePreferenceEvent').change(function(){
  saveProfileValue('endTimePreference',$(this).val());
  $('.endTimePreference').val($(this).val());
  filteredGroupJsonData.events = filterJsonArrayEvent(allGroupJsonData.events);
  sortAndCreateEventTables();

})


$('#eventTypeSelectAll').change(function(){
    if($(this).prop('checked')){
        $('#eventTypePreference').val(["bibleStudy","discipleship","evangelism","fellowship","service","prayer"]);
         saveProfileValue('eventTypePreference',$('#eventTypePreference').val().toString());
    }
    else{
        $('#eventTypePreference').val("");
         saveProfileValue('eventTypePreference',"");
    }
    filteredGroupJsonData.events = filterJsonArrayGroup(allGroupJsonData.events);
    sortAndCreateEventTables();
})

$('#eventChildcare').change(function(){
  filteredGroupJsonData.events = filterJsonArrayEvent(allGroupJsonData.events);
  sortAndCreateEventTables();
  saveProfileValue('eventChildcarePreference',$('#eventChildcare').prop('checked').toString());
})

$('#eventInterests').change(function(){
  filteredGroupJsonData.events = filterJsonArrayEvent(allGroupJsonData.events);
  sortAndCreateEventTables();
  saveProfileValue('eventInterestsPreference',$('#eventInterests').prop('checked').toString());
})

$('#dayOfWeekSelectAll').change(function(){
    if($(this).prop('checked')){
        $('#dayOfWeekPreference').val(["1","2","3","4","5","6","7"]);
        saveProfileValue('dayOfWeekPreference',$('#dayOfWeekPreference').val().toString());
    }
    else{
        $('#dayOfWeekPreference').val("");
        saveProfileValue('dayOfWeekPreference',"");
    }
    filteredGroupJsonData.groups = filterJsonArrayGroup(allGroupJsonData.groups);
    sortAndCreateGroupTables();
})

function loadUsername(){
    //usernameAjax = $.getJSON("/rest/member/getLoggedInUserInfo",function(userData){
    usernameAjax = $.getJSON("json/rest/member/getLoggedInUserInfo",function(userData){
        data = userData.statements;
        loadBanner(data);
        number = 0;
        
        if(data.dayOfWeekPreference){
            daysOfWeek = data.dayOfWeekPreference.split(",");
            daysOfWeekArray = []
            $.each(daysOfWeek,function(key,val){
                daysOfWeekArray.push(val)
            })
            $('#dayOfWeekPreference').val(daysOfWeekArray);
        }
        else{
            $('#dayOfWeekPreference').val(["1","2","3","4","5","6","7"]);
        }
        if(data.startTimePreference){
          $('.startTimePreference').val(data.startTimePreference);
        }
        else{
         $('.startTimePreference').val('00:00'); 
        }
        if(data.endTimePreference){
          $('.endTimePreference').val(data.endTimePreference);
        }
        else{
          $('.endTimePreference').val('23:30');
        }
        if(data.eventTypePreference){
            eventTypes = data.eventTypePreference.split(",");
            eventTypesArray = []
            $.each(eventTypes,function(key,val){
                eventTypesArray.push(val);
            })
            $('#eventTypePreference').val(eventTypesArray)
        }
        else{
            $('#eventTypePreference').val(["bibleStudy","discipleship","evangelism","fellowship","service","prayer"])
        }
        if(data.eventChildcarePreference=="true"){
          $('#eventChildcare').prop('checked',true);
        }
        if(data.eventInterestsPreference=="true"){
          $('#eventInterests').prop('checked',true);
        }
        
        if(data.connectPercentComplete){
          number = parseInt(data.connectPercentComplete);
          $("#connectProgress").attr('aria-valuenow', number).css("width", ""+number+"%");
          $("#connectProgress").text(""+number+"%");
        }
        else{
          $("#connectProgress").text("0%"); 
        }
        if(data.servePercentComplete){
          number = parseInt(data.servePercentComplete);
          $("#serveProgress").attr('aria-valuenow', number).css("width", ""+number+"%");
          $("#serveProgress").text(""+number+"%");
        }
        else{
          $("#serveProgress").text("100%"); 
        }
        if(data.growPercentComplete){
          number = parseInt(data.growPercentComplete);
          $("#growProgress").attr('aria-valuenow', number).css("width", ""+number+"%");
          $("#growProgress").text(""+number+"%");
        }
        else{
         $("#growProgress").text("0%"); 
        }
        var mq = window.matchMedia('only screen and (min-device-width: 320px) and (max-device-width: 1024px)');
        if(!mq.matches) {
            $("#dayOfWeekSelectAllDiv").hide();
             $("#eventTypeSelectAllDiv").hide();
            $('#dayOfWeekPreference').multiselect({
            buttonWidth: '200px',
            maxHeight: '200',
            includeSelectAllOption: true,
            onDropdownHide:  function(event) {
              filteredGroupJsonData.groups = filterJsonArrayGroup(allGroupJsonData.groups);
              sortAndCreateGroupTables();
              if($('#dayOfWeekPreference').val()){
                saveProfileValue('dayOfWeekPreference',$('#dayOfWeekPreference').val().toString());
              }
              else{
                saveProfileValue('dayOfWeekPreference',"");
              }
            }
          });
          $('#eventTypePreference').multiselect({
              buttonWidth: '200px',
              maxHeight: '200',
              onDropdownHide:  function(event) {
                filteredGroupJsonData.events = filterJsonArrayEvent(allGroupJsonData.events);
                sortAndCreateEventTables();
                
                if($('#eventTypePreference').val()){
                  saveProfileValue('eventTypePreference',$('#eventTypePreference').val().toString());
                }
                else{
                  saveProfileValue('eventTypePreference',"");
                }
              }
            });
            $('#skillTypeTask').multiselect({
                buttonWidth: '200px',
                maxHeight: '200',
            });
        }
        else{
         
            $("#dayOfWeekSelectAllDiv").show();
            $("#eventTypeSelectAllDiv").show();
            $("#dayOfWeekPreference").prepend("<option class='fakeOption' disabled></option>");
            $("#eventTypePreference").prepend("<option class='fakeOption' disabled></option>");
            $(".fakeOption").hide();
            if($("#dayOfWeekPreference").val().toString() == "1,2,3,4,5,6,7"){
              $("#dayOfWeekSelectAll").prop("checked",true);
            }
            if($("#eventTypePreference").val().toString()==
              "bibleStudy,discipleship,evangelism,fellowship,service,prayer"){
              $("#eventTypeSelectAll").prop("checked",true);
            }
            $("#dayOfWeekPreference").change(function(){
              values = $("#dayOfWeekPreference").val()
              filteredGroupJsonData.groups = filterJsonArrayGroup(allGroupJsonData.groups);
              sortAndCreateGroupTables();
              if($('#dayOfWeekPreference').val()){
                saveProfileValue('dayOfWeekPreference',values.toString());
              }
              else{
                saveProfileValue('dayOfWeekPreference',"");
              }
            })
            $("#eventTypePreference").change(function(){
              values = $("#eventTypePreference").val()
              filteredGroupJsonData.events = filterJsonArrayEvent(allGroupJsonData.events);
              sortAndCreateEventTables();
              if($('#eventTypePreference').val()){
                saveProfileValue('eventTypePreference',values.toString());
              }
              else{
                saveProfileValue('eventTypePreference',"");
              }
          })
        }
        
        
        
        

    })
}



function addRequest(){
    groupId = $("#groupId").val();
    $("#infoAboutAddingText").html("<p>Adding Request... Please wait a moment.");
    $("#modalConfirm").hide();
    $("#modalRequestClose").hide();
    $("#modalBlock").hide();
    $("#modalRequestClose").show();
    loadTableVariables();
    $("#infoAboutAddingText").html("Request Added.");    
}

function confirmBlock(){
    groupName = $("#clickedGroupName").val();
    $("#blockSureText").show();
    $("#modalConfirm").hide();
    $("#modalRequestClose").hide();
    $("#modalBlock").hide();
    $("#modalBlockDeny").show();
    $("#modalBlockConfirm").show();
}

function addBlock(){
    $("#blockSureText").hide();
    $("#modalBlockDeny").hide();
    $("#modalBlockConfirm").hide();
    groupId = $("#groupId").val();
    $("#modalGroupRequestText").html("Hiding Group... Please wait a moment.");
    loadTableVariables();
    $("#modalGroupRequestText").html("Group Hidden.");
    $("#modalRequestClose").show();
    
}

function filterJsonArrayEvent(objArray){
    newObjArray = [];
    var matches = false;
    $.each(objArray,function(key,val){
        matches = false;
        if(val.groupGroupType){
          if($.inArray(val.groupGroupType.toLowerCase().replace(/\s/g,''),$('#eventTypePreference').val())>-1){
              matches = true;
          }  
        }
        if($('#datepickEventStart').val()){
          startDate = $("#datepickEventStart").pickadate('picker').get();
          startDateObject = new Date(new Date(startDate));
          if(parseInt(val.nextInMillis)-startDateObject.getTime()<0){
            matches = false;
          }

        }
        if($('#datepickEventEnd').val()){
          endDate = $("#datepickEventEnd").pickadate('picker').get();
          endDateObject = new Date(new Date(endDate));
          if(endDateObject.getTime() - parseInt(val.nextInMillis)<0){
            matches = false;
          }
        }
        if(val.groupStartTime){
          startTime = parseFloat(val.groupStartTime.replace(":","."));
          startTimePref = parseFloat($('#startTimePreferenceEvent').val().replace(":","."));
          if((startTime-startTimePref)<0){
            matches = false;
          }
        }
        if(val.groupStartTime){
          //start time instead of end time?
          endTime = parseFloat(val.groupStartTime.replace(":","."));
          endTimePref = parseFloat($('#endTimePreferenceEvent').val().replace(":","."));
          if((endTimePref-endTime)<0){
            matches = false;
          }
        }
        if($('#eventChildcare').prop('checked')){
          if(val.groupChildcare == "No"){
            matches = false;
          }
        }
        if($('#eventInterests').prop('checked')){
          if(val.groupUsesInterests == "false"){
            matches = false;
          }
        }

        if(matches){
            newObjArray.push(val);
        }
    })
    return newObjArray;
    
}

function filterJsonArrayGroup(objArray){
    newObjArray = [];
    var matches = false;
    $.each(objArray,function(key,val){
        matches = false;
        if(val.daysOfWeek){
            daysOfWeek = val.daysOfWeek.split(",");
            for(var i=0;i<daysOfWeek.length;i++){
                if($.inArray(daysOfWeek[i],$('#dayOfWeekPreference').val())>-1){
                    matches = true;
                }
            }
        }
        if(val.groupStartTime){
          startTime = parseFloat(val.groupStartTime.replace(":","."));
          startTimePref = parseFloat($('#startTimePreferenceGroup').val().replace(":","."));
          if((startTime-startTimePref)<0){
            matches = false;
          }
        }
        if(val.groupStartTime){
          //start time instead of end time?
          endTime = parseFloat(val.groupStartTime.replace(":","."));
          endTimePref = parseFloat($('#endTimePreferenceGroup').val().replace(":","."));
          if((endTimePref-endTime)<0){
            matches = false;
          }
        }
        if(matches){
            newObjArray.push(val);
        }
    })
    return newObjArray;
    
}

function sortJsonArrayByProperty(objArray, prop, direction){
    if (arguments.length<2) throw new Error("sortJsonArrayByProp requires 2 arguments");
    var direct = arguments.length>2 ? arguments[2] : 1; //Default to ascending

    if (objArray && objArray.constructor===Array){
        var propPath = (prop.constructor===Array) ? prop : prop.split(".");
        objArray.sort(function(a,b){
            if (a[prop] && b[prop]){
                a = a[prop];
                b = b[prop];
            }
                        // convert numeric strings to integers
            //a = a.match(/^\d+$/) ? +a : a;
            //b = b.match(/^\d+$/) ? +b : b;
            return ( (a < b) ? -1*direct : ((a > b) ? 1*direct : 0) );
        });
    }
}

$('#sortByGroup').change(function(){
  sortAndCreateGroupTables();
})

$('#sortByEvent').change(function(){
  sortAndCreateEventTables();
})

function sortAndCreateGroupTables(){
  groupReverseVal = 1;
    if($('#sortByGroup').val()=="score"){
    groupReverseVal = -1;
  }
  sortJsonArrayByProperty(filteredGroupJsonData.groups,$('#sortByGroup').val(),groupReverseVal);
  createGroupTable(filteredGroupJsonData.groups);
}

function sortAndCreateEventTables(){
  eventReverseVal = 1;
  if($('#sortByEvent').val()=="score"){
    eventReverseVal = -1;
  }
  sortJsonArrayByProperty(filteredGroupJsonData.events,$('#sortByEvent').val(),eventReverseVal);
  createEventTable(filteredGroupJsonData.events);
}

function createEventTable(json){
  $('#eventList tbody').html("");
  $(json).each(function(key,val){
    if(val.groupRepeats && val.groupRepeats == "true"){
        tableDate = val.groupNextStartDate;
        repeatFrequency = val.groupRepeatsFrequency;
    }
    else{
        tableDate = val.groupStartDate;
        repeatFrequency = "One-time";
    }
    leaders = [];
    $.each(val.ledBy,function(key,leader){
      leaders.push(leader.name);
    })
    leaderString = leaders.toString().replace(/,/g,', ');
    newRow = '<tr><td colspan="4"><a class="clickedGroup" id="'+val.id+'">'+ val.groupName 
            + '</a></td></tr><tr class="altRow"><td>'+leaderString+'</td><td>'+val.groupGroupType+'</td><td>'+
            tableDate+'</td><td>'+repeatFrequency+'</td></tr>';
            $('#eventList tbody').append(newRow);
    $('#'+val.id).click(function(){
        loadGroup(val);
    })
  });
}

function createGroupTable(json){
  $('#groupList tbody').html("");
  $(json).each(function(key,val){
    if(val.groupRepeats && val.groupRepeats == "true"){
        tableDate = new Date(val.groupNextStartDate);

        dow = dayOfWeekFull(tableDate.getDay());
        repeatFrequency = val.groupRepeatsFrequency;
    }
    else{
        tableDate = new Date(val.groupStartDate);
        dow = dayOfWeekFull(tableDate.getDay());
        repeatFrequency = "One-time";
    }
    leaders = [];
    $.each(val.ledBy,function(key,leader){
      leaders.push(leader.name);
    })
    
    leaderString = leaders.toString().replace(/,/g,', ');
    newRow = '<tr><td colspan="4"><a class="clickedGroup" id="'+val.id+'">'+ val.groupName 
            + '</a></td></tr><tr class="altRow"><td>'+leaderString+'</td><td>'+val.groupGroupType+'</td><td>'+
            dow+'</td><td>'+repeatFrequency+'</td></tr>';
            $('#groupList tbody').append(newRow);
    $('#'+val.id).click(function(){
        loadGroup(val);
    })
  });
}

function saveProfileValue(name,value){
  /*
  $.post("/rest/member/editLoggedInUserProfile",{key:name,value:value},
        function(data){
          refreshExpiredPage(data);
    })*/
}

function loadTableVariables(){
    $('#groupList tbody').html(""); 
    $('#eventList tbody').html(""); 
    tableDate = "";
    repeatFrequency = "";
    filteredGroupJsonData = []//This is the only way to clone json objects
    groupListAjax = $.getJSON('json/rest/member/getLoggedInList', function(data){
    //groupListAjax = $.getJSON('json/rest/member/getLoggedInList', function(data){
      allGroupJsonData = data;
    })
}

$('#newGroupSearch').click( function() {
    var rex = new RegExp($("#group-search-box").val(), 'i');
    $('.searchable-group tr').hide();
    $('.searchable-group tr').filter(function() {
        return rex.test($(this).text());
    }).show();
});

function loadGroup(data){
    $('#groupUserSelect').find('option').remove().end();
    $('#groupForm').show();
    $('.searchable-group tr').hide();
        $("#blockSureText").hide();
        $("#modalConfirm").show();
        $("#modalRequestClose").show();
        $("#modalBlock").show();
        $("#modalBlockDeny").hide();
        $("#modalBlockConfirm").hide();
        $('#groupName').html(data.groupName);
        $('#groupId').val(data.id);
        leaders = [];
        $.each(data.ledBy,function(key,leader){
          leaders.push(leader.name+'&#60;'+leader.email+'&#62;');
        })
        leaderString = leaders.toString().replace(/,/g,', ');
        $('#ledBy').html(leaderString);
        if(data.groupRepeats && data.groupRepeats == "true"){
            $('#datetime').html(data.groupNextStartDate+" "+convertTime(data.groupStartTime) + " to " + convertTime(data.groupEndTime));
        }
        else{
            $('#datetime').html(data.groupStartDate+" "+convertTime(data.groupStartTime) + " to " + convertTime(data.groupEndTime));
        }
        $("#datetimeSummaryText").html(data.groupRepeatsSummaryText);
        $('#searchableLocationAddress').html(data.groupLocationAddress);
        $('#primaryChurchOrg').html(data.groupHasPrimaryChurchOrg.orgName);
        churchOrgs = []
        $.each(data.groupHasChurchOrg,function(key,val){
            churchOrgs.push(val.orgName)
        })
        $('#churchOrg').html(churchOrgs.toString());
         
        $('#gender').html(data.groupGender);
        $('#age').html(data.groupAge);
        if(data.groupPurpose){
          $('#groupPurpose').html(data.groupPurpose.replace(/<br\s*[\/]?>/gi,"\n"));
        }
        $('#groupChildcare').html(data.groupChildcare);
        $('#groupType').html(data.groupGroupType);
        hobbies = [];
        if(data.groupUsesInterests == 'true'){
          if(data.groupHobbyMusicLover=='true'){
             hobbies.push(' Music Lover');
          }
          if(data.groupHobbyStressRelief=='true'){
             hobbies.push(' Stress Relief');
          }
          if(data.groupHobbyKidsFamily=='true'){
             hobbies.push(' Kids/Family');
          }
          if(data.groupHobbySportsFitness=='true'){
             hobbies.push(' Sports/Fitness');
          }
          if(data.groupHobbyOutdoors=='true'){
             hobbies.push(' Outdoors');
          }
          if(data.groupHobbySharpenTheMind=='true'){
             hobbies.push(' Sharpen The Mind');
          }
          if(data.groupHobbyCraftersArtists=='true'){
             hobbies.push(' Crafters/Artists');
          }
          if(data.groupHobbyHistoryBuffs=='true'){
             hobbies.push(' History Buffs');
          }
          if(data.groupHobbyScienceAndNature=='true'){
             hobbies.push(' Science And Nature');
          }
          if(data.groupHobbyAdventureSeekers=='true'){
             hobbies.push(' Adventure Seekers');
          }
          if(data.groupHobbySocial=='true'){
             hobbies.push(' Social');
          }
          if(data.groupHobbyEntrepreneur=='true'){
             hobbies.push(' Entrepreneur');
          }
          if(data.groupHobbyMotorsports=='true'){
             hobbies.push(' Motorsports');
          }
          if(data.groupHobbyCollectors){
             hobbies.push(' Collectors');
          }
        }
        if(hobbies.toString()!= null && hobbies.toString().length>0){
            $('#hobbiesDiv').show();
            $('#hobbies').html(hobbies.toString());
        }
        else{
            $('#hobbiesDiv').hide();
        }
    $("#blockSureText").hide();
    $('#myModal2').modal({
        keyboard: false,
        backdrop: 'static'
    })
    $('#myModal2').show();
    
}

function newHTML(val){
    if(val.groupPurpose){
        return "</p><p><strong>Start Time:</strong><br>"+val.groupStartTime
            +"</p><p><strong>End Time:</strong><br>"+val.groupEndTime
            +"</p><p><strong>Location:</strong><br>"+val.groupLocation
            +"</p><p><strong>Purpose:</strong><br>"+val.groupPurpose;
            +"</p><p><strong>Provides childcare?</strong><br>"+val.groupChildcare
    }
    else{
        return "";
    }
}

function getHobbyString(data){
        hobbies = [];
        if(data.groupHobbyMusicLover == "true"){
            hobbies.push("Music Lover");
        }
        if(data.groupHobbyStressRelief == "true"){
           hobbies.push("Stress Relief");
        }
        if(data.groupHobbyKidsFamily){
           hobbies.push("Kids/Family");
        }
        if(data.groupHobbySportsFitness){
           hobbies.push("Sports/Fitness")
        }
        if(data.groupHobbyOutdoors){
          hobbies.push("Outdoors");
        }
        if(data.groupHobbySharpenTheMind){
           hobbies.push("Sharpen The Mind");
        }
        if(data.groupHobbyCraftersArtists){
           hobbies.push("Crafters/Artists");
        }
        if(data.groupHobbyHistoryBuffs){
           hobbies.push("History Buffs");
        }
        if(data.groupHobbyScienceAndNature){
           hobbies.push("Science and Nature");
        }
        if(data.groupHobbyAdventureSeekers){
           hobbies.push("Adventure Seekers");
        }
        if(data.groupHobbySocial){
           hobbies.push("Social");
        }
        if(data.groupHobbyEntrepreneur){
           hobbies.push("Entrepreneur");
        }
        if(data.groupHobbyMotorsports){
           hobbies.push("Motorsports");
        }
        if(data.groupHobbyCollectors){
           hobbies.push("Collectors")
        }
        return hobbies.toString().replace(/,/g,", ");
}

function translateGroupReasons(reasons){
    reasonString = "";
    reasonArray = reasons.split(',');
    locationExact  = false;
    timeExact = false;
    for(var i=0;i<reasonArray.length;i++){
        if(reasonArray[i] == "DayTime"){
            timeExact = true;
            reasonString+="Day and Time Match<br>";
        }
        else if(reasonArray[i] == "District"){
            locationExact = true;
            reasonString+="County and District Match<br>";
        }
    }
    for(var i=0;i<reasonArray.length;i++){
        if(reasonArray[i] == "Day" && !timeExact){
            reasonString+="Day of Week Match<br>";
        }
        else if(reasonArray[i] == "Time" && !timeExact){
            reasonString+="Time of Day Match<br>";
        }
        else if(reasonArray[i] == "County" && !locationExact){
            reasonString+="County Match<br>";
        }
        else if(reasonArray[i] == "ComInterests"){
            reasonString+="Common Interests Match<br>";
        }
        else if(reasonArray[i] == "DivInterests"){
            reasonString+="Diverse Interests Match<br>";
        }
        else if(reasonArray[i] == "ComJourney"){
            reasonString+="Common Spiritual Journey Match<br>";
        }
        else if(reasonArray[i] == "DivJourney"){
            reasonString+="Diverse Spiritual Journey Match<br>";
        }
        else if(reasonArray[i] == "ComFamily"){
            reasonString+="Common Family Match<br>";
        }
        else if(reasonArray[i] == "DivFamily"){
            reasonString+="Diverse Family Match<br>";
        }
    }
    return reasonString;
}


