$(document).ready(function(){
  loadGroupTable();
  loadUsername();
});

function loadUsername(){
    $.getJSON("/rest/member/getLoggedInUserInfo",function(userData){
        data = userData.statements;
        $("#accountName").html(data.fn + "'s Account<span class='caret'></span>");
 

    })
}

function addRequest(){
    groupName = $("#clickedGroupName").val();
    $("#infoAboutAddingText").html("<p>Adding Group Request... Please wait a moment.");
    $("#modalConfirm").hide();
    $("#modalRequestClose").hide();
    $("#modalBlock").hide();
    $.getJSON("/rest/member/addLoggedInUserRequestToGroup?name="+groupName,function(data){;
        $("#modalRequestClose").show();
        loadGroupTable();
        $("#infoAboutAddingText").html("Group Request Added.");
    })
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
    $("#modalGroupRequestText").html("Hiding Group... Please wait a moment.");
    $.getJSON("/rest/member/addLoggedInUserBlockToGroup?name="+groupName,function(data){;
        loadGroupTable();
        $("#modalGroupRequestText").html("Group Hidden.");
         $("#modalRequestClose").show();
    })
}

function fixWeekdayTable(groupMeetingPreference){
    return groupMeetingPreference.replace('M,','Mon,').replace('T,','Tues,').replace('W,','Wed,').replace('R,','Thur,').replace('F,','Fri,').replace('Sa,','Sat,').replace('Su,','Sun,')
}

function fixWeekday(groupMeetingPreference){
    return groupMeetingPreference.replace('M','Mon').replace('T','Tues').replace('W','Wed').replace('R','Thur').replace('F','Fri').replace('Sa','Sat').replace('Su,','Sun')
}

function loadGroupTable(){
    $("#groupRank tbody").html(""); 
    $.getJSON('/rest/member/getLoggedInGroupList', function(data){
        $(data.user).each(function(key,val){
            name = val.name;
            newRow = '<tr><td colspan="4"><a id="clickedGroup'+key+'">'+ name 
                    + '</a></td></tr><tr class="altRow"><td></td><td>'+val.percMatch+'</td><td>'+
                    fixWeekdayTable(val.groupMeetingPreference)+'</td></tr>';
                    $('#groupRank tbody').append(newRow);
            $("#clickedGroup"+key).click(function(){
                clickedGroup(val);
            })
        });
        $(data.spouse).each(function(key,val){
            name = val.name;
            newRow = '<tr><td colspan="4"><a id="clickedGroupSpouse'+key+'">'+ name 
                    + '</a></td></tr><tr class="altRow"><td></td><td>'+val.percMatch+'</td><td>'+
                    fixWeekdayTable(val.groupMeetingPreference)+'</td></tr>';
                    $('#groupRankSpouse tbody').append(newRow);
            
            $("#clickedGroupSpouse"+key).click(function(){
                clickedGroup(val);
            })

        });

    })
}



function clickedGroup(val){
    $("#blockSureText").hide();
    $("#modalConfirm").show();
    $("#modalRequestClose").show();
    $("#modalBlock").show();
    $("#modalBlockDeny").hide();
    $("#modalBlockConfirm").hide();
    $("#clickedGroupName").val(val.name);
    locations = "";
    churchOrgs = "";

    for(var i=0;i<val.groupStateCountyDistrict.length;i++){
        locations+=val.groupStateCountyDistrict[i]+"<br>";
    }
        for(var i=0;i<val.groupHasChurchOrg.length;i++){
        churchOrgs+=val.groupHasChurchOrg[i]+"<br>";
    }
    
    reasonString = translateGroupReasons(val.reasons);
    $("#modalGroupRequestText").html(
        "<p><strong>Group Name:</strong><br>"+val.name
        +"</p><p><strong>Reasons For Prediction:</strong><br>"+reasonString
        +"</p><p><strong>Day of Week:</strong><br>"+fixWeekday(val.groupMeetingDayPreference)
        +newHTML(val)
        +"</p><p><strong>Age:</strong><br>"+val.groupAge
        +"</p><p><strong>Gender:</strong><br>"+val.groupGender
        +"</p><p><strong>Group Type:</strong><br>"+val.groupGroupType
        +"</p><p><strong>Hobbies:</strong><br>"+getHobbyString(val)
        +"</p><p><strong>Group Description:</strong><br> " + val.groupDescription
        +"</p>");
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


