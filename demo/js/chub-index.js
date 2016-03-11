$(document).ready(function(){
  loadGroupTable();
  loadUsername();
});

function loadUsername(){
    $.getJSON("json/rest/member/getLoggedInUserInfo",function(userData){

        data = userData.statements;
        loadBanner(data);
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

function addRequest(){
    groupId = $("#groupId").val();
    $("#infoAboutAddingText").html("<p>Adding Request... Please wait a moment.");
    $("#modalConfirm").hide();
    $("#modalRequestClose").hide();
    $("#modalBlock").hide();
     $("#modalRequestClose").show();
    $("#infoAboutAddingText").html("Group Added");
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
    loadGroupTable();
    $("#modalGroupRequestText").html("Group Hidden.");
    $("#modalRequestClose").show();
}

function fixWeekdayTable(groupMeetingPreference){
    return groupMeetingPreference.replace('M,','Mon,').replace('T,','Tues,').replace('W,','Wed,').replace('R,','Thur,').replace('F,','Fri,').replace('Sa,','Sat,').replace('Su,','Sun,')
}

function fixWeekday(groupMeetingPreference){
    return groupMeetingPreference.replace('M','Mon').replace('T','Tues').replace('W','Wed').replace('R','Thur').replace('F','Fri').replace('Sa','Sat').replace('Su,','Sun')
}

function loadGroupTable(){
    //$.get("/rest/member/listBulletinHeaders",function(data){
    $.getJSON("json/rest/memer/listBulletinHeaders",function(data){
        count = 0;
        var groupHeaders = new Array();
        $('#groupList').html("");
        $.each(data.statements.headers, function (key,val) {
          var groupInfo = new Array();
          var groupHeaderText = "";
          count+=1;

          if(val.groups){
            groupHeaderText += "<table id="+val.id+" class='table'><tbody>";
            $.each(val.groups, function (keys,groupVal) {
              bulletinOrder = groupVal.bulletinOrder;
              if(groupVal.bulletinOrder && groupVal.bulletinOrder!= ""){
                bulletinOrder = groupVal.bulletinOrder
              }
              else{
                bulletinOrder = key+'A';
              }
              groupInfo[groupVal.id] = "<tr id="+groupVal.id+"><td><a href='#' onclick='loadGroup(\""+groupVal.id+
                "\"); return false'>"+groupVal.bulletinName+
              "</a><br>"+groupVal.bulletinDescription+"</td></tr>";
            })
           
          }
          if(val.groupOrder){
            groupBulletinOrder = val.groupOrder.split(",");

            for(var i=0;i<groupBulletinOrder.length;i++){
              if(groupInfo[groupBulletinOrder[i]]){
                groupHeaderText+=groupInfo[groupBulletinOrder[i]];
              }
            }
          }
          groupHeaders[val.id] = "<h3>"+val.name+"&nbsp;</h3>"+groupHeaderText+"</tbody></table>";

        })
        if(data.statements.headerOrder){
          headerOrder = data.statements.headerOrder.split(",");
          
          for(var i=0;i<headerOrder.length;i++){
            $('#groupList').append(groupHeaders[headerOrder[i]]);
          }
        }
    })
}


function loadGroup(groupId){
    $('#groupForm').show();
    $('#editBulletinForm').show();
    $('#newGroupInBulletin').hide();
    //$.post('/rest/admin/getGroupInfo',{groupId:groupId},function(userData){
    $.getJSON('json/rest/admin/getGroupInfo',function(userData){
      data = userData.statements;
      if(data.groupHasHeader){
        $("#groupBulletinHeader").val(data.groupHasHeader);
      }
      if(data.groupBulletinName){
        $("#groupBulletinName").val(data.groupBulletinName);
      }
      else{
        $("#groupBulletinName").val(data.groupName+" "+data.groupStartDate);
      }
      if(data.groupBulletinDescription){
        $("#groupBulletinDescription").val(data.groupBulletinDescription);
      }
      else{
        $("#groupBulletinDescription").val(data.groupPurpose);
      }
      $(".modal-cancel").show();
      $("#modalSave").show();
      $("#modalClose").hide();
      $("#groupForm").show();
      $('#editBulletinForm').show();
      $('#groupName').html(data.groupName);
      $('#groupId').val(data.id);
      $('#ledBy').html(data.ledBy.name+'&#60;'+data.ledBy.email+'&#62;');
      if(data.groupRepeats && data.groupRepeats == "true"){
            $('#startDatetime').html(data.groupNextStartDate+" "+convertTime(data.groupStartTime) + " to " + convertTime(data.groupEndTime));
        }
        else{
            $('#startDatetime').html(data.groupStartDate+" "+convertTime(data.groupStartTime) + " to " + convertTime(data.groupEndTime));
        }
      $("#datetimeSummaryText").html(data.groupRepeatsSummaryText);
      $('#searchableLocationAddress').html(data.groupLocationAddress);
      $('#primaryChurchOrg').html(data.groupHasPrimaryChurchOrg.orgName);
      churchOrgs = []
      $.each(data.groupHasChurchOrg,function(key,val){
          churchOrgs.push(val.orgName)
      })
      $('#churchOrg').html(churchOrgs);
       
      $('#gender').html(data.groupGender);
      $('#age').html(data.groupAge);
      if(data.groupPurpose){
        $('#groupPurpose').html(data.groupPurpose.replace(/<br\s*[\/]?>/gi,"\n"));
      }
      $('#groupChildcare').html(data.groupChildcare);
      $('#groupType').html(data.groupGroupType);
      hobbies = [];
      if(data.groupHobbyMusicLover=='true'){
         hobbies.push('Music Lover');
      }
      if(data.groupHobbyStressRelief=='true'){
         hobbies.push('Stress Relief');
      }
      if(data.groupHobbyKidsFamily=='true'){
         hobbies.push('Kids/Family');
      }
      if(data.groupHobbySportsFitness=='true'){
         hobbies.push('Sports/Fitness');
      }
      if(data.groupHobbyOutdoors=='true'){
         hobbies.push('Outdoors');
      }
      if(data.groupHobbySharpenTheMind=='true'){
         hobbies.push('Sharpen The Mind');
      }
      if(data.groupHobbyCraftersArtists=='true'){
         hobbies.push('Crafters/Artists');
      }
      if(data.groupHobbyHistoryBuffs=='true'){
         hobbies.push('History Buffs');
      }
      if(data.groupHobbyScienceAndNature=='true'){
         hobbies.push('Science And Nature');
      }
      if(data.groupHobbyAdventureSeekers){
         hobbies.push('Adventure Seekers');
      }
      if(data.groupHobbySocial){
         hobbies.push('Social');
      }
      if(data.groupHobbyEntrepreneur){
         hobbies.push('Entrepreneur');
      }
      if(data.groupHobbyMotorsports){
         hobbies.push('Motorsports');
      }
      if(data.groupHobbyCollectors){
         hobbies.push('Collectors');
      }
      if(hobbies.toString()!= null && hobbies.toString().length>0){
          $('#hobbiesDiv').show();
          $('#hobbies').html(hobbies.toString());
      }
      else{
          $('#hobbiesDiv').hide();
      }
      $('#myModal2').modal({
          keyboard: false,
          backdrop: 'static'
      })
      $('#myModal2').show();

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
    

   
        for(var i=0;i<val.groupHasChurchOrg.length;i++){
        churchOrgs+=val.groupHasChurchOrg[i]+"<br>";
    }
    
    reasonString = translateGroupReasons(val.reasons);
    $('#myModal2').modal({
        keyboard: false,
        backdrop: 'static'
    })
    $('#myModal2').show();
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


