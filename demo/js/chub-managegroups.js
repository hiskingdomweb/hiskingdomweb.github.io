$(document).ready(function(){
    $('#groupForm').hide();
    loadBanner();
    $('#searchRoleSelected').val("all");
    loadGroupLeadTable();
});

$("#searchRole .btn").click(function(){
    $("#searchRoleSelected").val($(this).children()[0].value);
    loadTable();
})

$('#groupOpen').change( function() {
    changeGroupOpen(this.checked);
})

$('#selectLeaders').click(function(){
    //An addition to the method that is in selectUsers.js
    $('.searchableselectLeaders tr').hide();  
    $('#saveAddLeadersManagePage').show();
    $('#selectLeadersConfirmBody').hide();
    $('#selectLeadersModalBody').show();
    $('#closePostConfirmAddLeader').hide();
})

$('#selectMembers').click(function(){
    //An addition to the method that is in selectUsers.js
    $('.searchableselectMembers tr').hide();  
    $('#saveAddMembersManagePage').show();
    $('#selectMembersConfirmBody').hide();
    $('#selectMembersModalBody').show();
    $('#closePostConfirmAddMember').hide();
})

$('#groupUsesInterests').change(function(){
  if($(this).val()=="true"){
    $('#hobbies').show();
  }
  else{
   $('#hobbies').hide(); 
   $('.hobby').prop('checked',false);
  }
})

$('#saveAddLeadersManagePage').click(function(){
    //This above is named differently since different click events need to happen then they do on the selectUsers.js admin side.
    addLeadersToGroup();
})

$('#saveAddMembersManagePage').click(function(){
    //This above is named differently since different click events need to happen then they do on the selectUsers.js admin side.
    addUsersToGroup();
})


$('#user-search-btn').click( function() {
    var rex = new RegExp($("#user-search-box").val(), 'i');
    $('.searchable-user tr').hide();
    $('.searchable-user tr').filter(function() {
        return rex.test($(this).text());
    }).show();
});



$('#userRemove').click( function() {
    removeUsersFromGroup();
});

$('#userApprove').click( function() {
    approveUsersForGroup();
});

$('#userDeny').click( function() {
    denyUsersForGroup();
});

$('#resetGroups').click(function(){
    resetPage();
})

function resetPage(){
    $('#groupListDiv').show();
    $('#groupForm').hide();
    $('#taskCount').val('1');
    loadTable();
    resetSkillModal();
    resetDateModal();
    resetDateModalTask();
    resetGoogleLocation();
    resetGoogleLocationTask();
}

function loadTable(){
    $('#groupList').hide();
    $('#taskList').hide();
    $('#eventList').hide();
    $('#allList').hide();
    if($('#searchRoleSelected').val()=="all"){
        $('#allList').show();
    }
    else if($('#searchRoleSelected').val()=="group"){
        $('#groupList').show();
    }
    else if($('#searchRoleSelected').val()=="event"){
        $('#eventList').show();
    }
    else if($('#searchRoleSelected').val()=="task"){
        $('#taskList').show();
    }
}

/*
function loadGroupTable(){
    $.getJSON("/rest/member/listLoggedInGroupsMember",function(data){
    //$.getJSON("json/rest/member/listLoggedInGroupsMember",function(data){
        grouptable = '<tbody class="searchable-group">';
        $.each(data.statements, function (key,val) {
            grouptable += "<tr><td><a href='#' onclick='loadGroup("+val.id+"); return false'>"+val.groupName+"</a></td></tr>";
        })
        $("#groupList").html(grouptable+"</tbody></table>");
        $('.searchable-group tr').show();
    })
}*/

function loadGroupLeadTable(){
    $.getJSON("json/rest/member/listLoggedInGroupsLead",function(data){
    //$.getJSON("json/rest/member/listLoggedInGroupsLead",function(data){
        grouptable = '<tbody class="searchable-group">';
        eventtable = '<tbody class="searchable-group">';
        tasktable = '<tbody class="searchable-group">';
        alltable = '<tbody class="searchable-group">';
        $.each(data.statements, function (key,val) {
            if(val.category=="group"){
                grouptable += "<tr><td><a href='#' onclick='loadGroup(\""+
                    val.id+"\"); return false'>"+val.groupName+"</a></td></tr>";
            }
            else if(val.category=="event"){
                eventtable += "<tr><td><a href='#' onclick='loadGroup(\""+
                    val.id+"\"); return false'>"+val.groupName+"</a></td></tr>";
            }
            else if(val.category=="task"){
                eventtable += "<tr><td><a href='#' onclick='loadGroup(\""+
                    val.id+"\"); return false'>"+val.groupName+"</a></td></tr>";
            }
            alltable += "<tr><td><a href='#' onclick='loadGroup(\""+
                val.id+"\"); return false'>"+val.groupName+"</a></td></tr>";
            
        })
        $('#groupList').html(grouptable+"</tbody></table>");
        $('#eventList').html(eventtable+"</tbody></table>");
        $('#taskList').html(tasktable+"</tbody></table>");
        $('#allList').html(alltable+"</tbody></table>");
        loadTable();
    })
}
/*
function loadGroup(clicked_id){
    $('.leaders').hide();
    if($("#searchRoleSelected").val()=="leader"){
        $('.leaders').show();
    }
    $('#groupSearchFilters').hide();
    $('#groupUserSelect').find('option').remove().end();
    $("#groupName").prop('disabled',true);
    $('meetingDay').prop('disabled',true);
    $('#meetingTime').prop('disabled',true);
    $('#gender').prop('disabled',true);
    $('#age').prop('disabled',true);
    $('#groupType').prop('disabled',true);
    $('#groupForm').show();
    $('.searchable-group tr').hide();
    $('#eventDateDiv').hide();
    $('#userApprove').hide();
    $('#userRemove').hide();
    $.getJSON("/rest/member/getLoggedInGroupInfo?name="+clicked_id,function(userData){
    //$.getJSON("json/rest/member/getLoggedInGroupInfo",function(userData){
        data = userData.statements;
        $('#groupSubmit').hide();
        $("#groupName").html(clicked_id);
        /*
        groupStateCountyDistrict = "";
        $.each(data.groupStateCountyDistrict,function(key,val){
            groupStateCountyDistrict += val + "<br>";
        })
        $("#stateCountyDistrict").html(groupStateCountyDistrict);
        *//*
        $("#groupLocation").html(data.groupLocation +"<br>"+data.groupLocationAddress);
        $("#groupPurpose").html(data.groupPurpose);
        $("#groupChildcare").html(data.groupChildcare);
        $("#groupStartTime").html(data.groupStartTime);
        $("#groupEndTime").html(data.groupEndTime);
        $("#meetingDay").html(fixWeekday(data.groupMeetingDayPreference));
        $("#age").html(data.groupAge);
        $("#gender").html(data.groupGender);
        $("#groupType").html(data.groupGroupType);
        $("#groupDescription").html(data.groupDescription);
        if(data.groupEventDate){
            $('#eventDateDiv').show();
            $("#eventDate").html(data.groupEventDate);
        }
        hobbies = []
        if(data.groupHobbyMusicLover){
            hobbies.push("Music Lover");
        }
        if(data.groupHobbyStressRelief){
            hobbies.push("Stress Relief");
        }
        if(data.groupHobbyKidsFamily){
            hobbies.push("Kids/Family");
        }
        if(data.groupHobbySportsFitness){
            hobbies.push("Sports/Fitness");
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
            hobbies.push("Science And Nature");
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
            hobbies.push("Collectors");
        }
        $("#hobbies").html(hobbies.toString().replace(/,/g,', '));
        if(data.groupOpen && data.groupOpen.indexOf("true")>=0){
            $("#groupOpen").prop("checked",true);
        }
        if(data.ledBy){
            
        }
        $("#groupUserSelect").html('');
        emailList = "";
        emailHTML = "";
        $("#modalAttendanceList").html("");

        for(var i=0;i<data.hasAsMember.length;i++){
            if(data.hasAsMember[i].email == data.ledBy){
                $("#ledBy").html(data.hasAsMember[i].name + '&#60;'+data.hasAsMember[i].email+'&#62;');

                $("#modalAttendanceList").append('<div><label><input type="checkbox"'+
                    'class="attendance" id="attendanceListLeader" value="'+data.hasAsMember[i].email+'">'
                +data.hasAsMember[i].name+'</label><br></div>');
            }
            else{
                $("#groupUserSelect").append(
                    '<div><label><input type="checkbox" class="member" value="'+data.hasAsMember[i].email+'">'
                    +data.hasAsMember[i].name+'</label><br></div>');
                if(emailList.length==0){
                    emailList = data.hasAsMember[i].name + '&#60;'+data.hasAsMember[i].email+'&#62;'; 
                }
                else{
                     emailList += ", "+data.hasAsMember[i].name + '&#60;'+data.hasAsMember[i].email+'&#62;'; 
                }
                $("#modalAttendanceList").append('<div><label><input type="checkbox"'+
                    'class="attendance" value="'+data.hasAsMember[i].email+'">'
                +data.hasAsMember[i].name+'</label><br></div>');
            }

        }
        
        if(emailList.length>0){
            emailHTML = emailList+addEmailLink(emailList,clicked_id)
        }
        $("#emailList").html($("#ledBy").html()+", "+emailHTML);
        if($(".member").length==0){
            $("#groupUserSelect").html("None");
        }
        $("#groupRequestedUserSelect").html('');
        if($("#searchRoleSelected").val()=="leader"){
            if(data.requestedByPerson.length==0){
                $("#groupRequestedUserSelect").html("None");
            }
            for(var i=0;i<data.requestedByPerson.length;i++){
            
                $('#userApprove').show();
                $('#groupRequestedUserSelect').append('<div><label><input type="checkbox"'+
                    'class="requestedMember" value="'+data.requestedByPerson[i].email+'">'
                +data.requestedByPerson[i].name+'</label><br></div>');
            }
        }
        $("#churchOrg").html('');
        for(var i=0;i<data.groupHasChurchOrg.length;i++){
            $("#churchOrg").append(data.groupHasChurchOrg[i]+"<br>"); 
        }
        $("#primaryChurchOrg").html(data.groupHasPrimaryChurchOrg);   
        
    })
}*/

function loadChurchOrgs(primaryChurchOrg,churchOrgs){
    $.getJSON('json/rest/member/listChurchOrgs', function(data){
      orgHTML = '';
      $.each(data.statements, function (key,val){
        if(val.id != primaryChurchOrg.id){
          orgHTML += '<option value="'+val.id+'">'+val.orgName+'</option>'; 
        }
      })
      $('#primaryChurchOrgName').html(primaryChurchOrg.orgName);
      $('#primaryChurchOrg').val(primaryChurchOrg.id);
      $('#secondaryChurchOrgs').html(orgHTML);
            churchOrgIds = [];
      $.each(churchOrgs,function(key,val){
        churchOrgIds.push(val.id);
      })
      $("#secondaryChurchOrgs").val(churchOrgIds);
      var mq = window.matchMedia('only screen and (min-device-width: 320px) and (max-device-width: 1024px)');
      if(!mq.matches) {
        $('#secondaryChurchOrgs').multiselect({
          maxHeight: '200',
          numberDisplayed: 1,
          nSelectedText: 'Selected',
        });
      }
    })
}

$('#updateFirstTab').click(function(){
    $('#generalModal').modal({
        keyboard: false,
        backdrop: 'static'
    })
    $('#generalModalText').html('Saving changes... Please wait a moment.');
    $('#generalModalClose').hide();
   updateGroup();

})

function loadGroup(clicked_id){
    $('#groupUserSelect').find('option').remove().end();
    $("#groupListDiv").hide();
    $('#groupForm').show();
    $('#taskCount').val("1");

    stateArray = [];
    countyArray = [];
    districtArray = [];
    stateCountyDistricts = [];

    //$.get("/rest/member/getLoggedInGroupInfo?group="+clicked_id,function(userData){
    $.getJSON('json/rest/member/getLoggedInGroupInfo',function(userData){
        data = userData.statements;
        emailList = '';
        $("#modalAttendanceList").html("");
        loadUserTables(data.groupGender,data.groupAge,data.hasAsMember,data.ledBy);
        /*
        for(var i=0;i<data.hasAsMember.length;i++){
            if(i==0){
                emailList = data.hasAsMember[i].name + '&#60;'+data.hasAsMember[i].email+'&#62;'; 
            }
            else{
                emailList += ", "+data.hasAsMember[i].name + '&#60;'+data.hasAsMember[i].email+'&#62;';    
            }
            if(data.hasAsMember[i].email == data.ledBy.email){
                $("#modalAttendanceList").append('<div><label><input type="checkbox"'+
                    'class="attendance" id="attendanceListLeader" value="'+data.hasAsMember[i].email+'">'
                +data.hasAsMember[i].name+'</label><br></div>');
                $('#attendanceListLeader').prop('checked',true);
            }
            else{
                $("#groupUserSelect").append(
                    '<div><label><input type="checkbox" class="member" value="'+data.hasAsMember[i].email+'">'
                    +data.hasAsMember[i].name+'</label><br></div>');
                
             
                $("#modalAttendanceList").append('<div><label><input type="checkbox"'+
                    'class="attendance" value="'+data.hasAsMember[i].email+'">'
                +data.hasAsMember[i].name+'</label><br></div>');
            }
        }*/
        $('#groupCategory').val(data.groupCategory);
        if(data.groupOpen && data.groupOpen.indexOf("true")>=0){
            $("#groupOpen").prop("checked",true);
        }
        if($("#groupUserSelect").html()==""){
            $('#userRemove').hide();
            $('#groupUserSelect').html("None");
            $('#emailList').html(emailList);
        }
        else{
            $('#emailList').html(emailList+
                addEmailLink(emailList.toString(),data.groupName));
        }

        for(var i=0;i<data.requestedByPerson.length;i++){
            $("#groupRequestedUserSelect").append(
                '<div><label><input type="checkbox" class="requestedMember" value="'+data.requestedByPerson[i].id+'">'
                +data.requestedByPerson[i].name+'</label><input type="hidden" id="requested'+data.requestedByPerson[i].id+'email">'+
                '<br></div>');
            $('#requested'+data.requestedByPerson[i].id+'email').val(data.requestedByPerson[i].email);
        }
        if($("#groupRequestedUserSelect").html()==""){
            $('#userApprove').hide();
            $('#groupRequestedUserSelect').html("None");
        }

        $('#groupNameHeader').html(capitalizeFirstLetter(data.groupCategory)+": "+data.groupName);
        $('#groupName').val(data.groupName);
        $('#groupId').val(clicked_id);
        $('#datepickStart').pickadate('picker').set('select',new Date(data.groupStartDate));
        $('#startTimePick').val(data.groupStartTime);
        //$('#datepickEnd').pickadate('picker').set('select',new Date(data.groupEndDate));
        $('#endTimePick').val(data.groupEndTime);
        $('#endpickStart').val(data.groupEndDate);
        if(data.groupRepeats == 'true'){
          $('#repeatDateEdit').show();
          $('#repeatDate').prop('checked',true);
          $('#datepickRepeatEnd').pickadate('picker').set('select',new Date(data.groupRepeatsEndDate));
          $('#groupRepeats').val(data.groupRepeatsFrequency);
        }
        else{
          $('#repeatDate').prop('checked',false);
        }
        if(data.groupRepeatsFrequency == "Daily"){
          $('#dayOfWeekSelect').hide();
          $('#dayOfWeekOfMonthSelect').hide();
        }
        else if(data.groupRepeatsFrequency == "Weekly"||data.groupRepeatsFrequency == "Bi-Weekly"){
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
        
        $('#searchableLocation').val(data.groupLocation);
        $('#searchableLocationName').html(data.groupLocation);
        $('#searchableLocationAddress').html(data.groupLocationAddress);
        $('#searchableLocationLat').val(data.groupLocationLat);
        $('#searchableLocationLng').val(data.groupLocationLng);
        $('#maxDistance').val(data.groupMaxDistance);



        $('#primaryChurchOrg').html(data.groupHasPrimaryChurchOrg.name);
        loadChurchOrgs(data.groupHasPrimaryChurchOrg,data.groupHasChurchOrg);
        
        $('#gender').html(data.groupGender);
        $('#age').html(data.groupAge);
        if(data.groupPurpose){
          $("#groupPurpose").val(data.groupPurpose.replace(/<br\s*[\/]?>/gi,"\n"));
        }
        $("#groupLocation").val(data.groupLocation);
        $("#groupChildcare").html(data.groupChildcare);
        
        
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
        $('#hobbies').hide();
        if(data.groupUsesInterests){
            $("#groupUsesInterests").val(data.groupUsesInterests);
        }
        else{
            $("#groupUsesInterests").val("false");
        }
        
        if(data.groupUsesInterests && data.groupUsesInterests == "true"){
            $('#hobbies').show();
            if(data.groupHobbyMusicLover){
               $("#hobbyMusicLover").prop("checked", data.groupHobbyMusicLover === "true");
            }
            if(data.groupHobbyStressRelief){
               $("#hobbyStressRelief").prop("checked", data.groupHobbyStressRelief === "true");
            }
            if(data.groupHobbyKidsFamily){
               $("#hobbyKidsFamilies").prop("checked", data.groupHobbyKidsFamily === "true");
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
               $("#hobbyScienceNature").prop("checked", data.groupHobbyScienceAndNature === "true");
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
        }
        else{
            $('.hobby').prop('checked',false);
        }
    })
}
/*
function removeUsersFromGroup(){
    $("#generalModalText").html("Member Being Removed... Please wait a moment.");
    $("#generalModalClose").hide();
    $("#modalAttendanceList").html("");
    groupName = $("#groupName").html();
    groupId = $("#groupId").val();
    $('#generalModal').modal({
        keyboard: false,
        backdrop: 'static'
    })
    emails = [];
    $(".member:checked").each(function(key,val){
        emails.push($(val).val());
        
        $(this).parent().parent().remove();
        if($(".member").length==0){
            $('#userRemove').hide();
            $('#groupUserSelect').html('None');
        }
        emailList = [];
        $(".member").each(function(key,val){
            emailList.push($(val).parent().text()+"&#60;"+$(val).val()+"&#62;");
        })
        if(emailList.length>0){
            $("#emailList").html($("#ledBy").html()+","+emailList.toString()+addEmailLink(emailList.toString(),groupName));
        }
        else{
            $("#emailList").html($("#ledBy").html());
        }
    });
    emailString = emails.toString()
    $.post("/rest/member/removeUsersFromGroup",{
        groupId:groupId,
        emails:emailString,
        },function(a,b){
            $('#userApprove').show();
            $("#generalModalClose").show();
            $("#generalModalText").html("Member Removed from Group.");
    })
    $(".member").each(function(key,val){
        $("#modalAttendanceList").append('<div><label><input type="checkbox"'+
            'class="attendance" value="'+$(val).val()+'">'
        +$(this).parent().text()+'</label><br></div>');
    })
}*/

function approveUsersForGroup(){
    $("#generalModalText").html("Membership Update Submitting... Please wait a moment.");
    $("#generalModalClose").hide();
    $("#modalAttendanceList").html("");
    groupName = $("#groupName").html();
    groupId = $("#groupId").val();
    $('#generalModal').modal({
        keyboard: false,
        backdrop: 'static'
    })
    members = []
    $(".requestedMember:checked").each(function(key,val){
        memberObject = new Object();
        memberObject.id = $(val).val();
        members.push(memberObject.id);
        memberObject.name = $(val).parent().text();
        memberObject.email = $("#requested"+$(val).val()+"email").val();
        $('#members'+$(this).val()).prop('disabled',false);
        addMemberToList(memberObject,true);
        $(this).parent().parent().remove();
        if($(".requestedMember").length==0){
            $('#userApprove').hide();
            $('#groupRequestedUserSelect').html('None');
        }
    })
    updateMemberText();
    $("#generalModalText").html("Member(s) Succesfully Approved.");
    $('#userRemove').show();
    $("#generalModalClose").show();
    
}

function addLeadersToGroup(){
    $('#selectLeadersModalBody').hide();
    $('#saveAddLeadersManagePage').hide();
    $('#selectLeadersConfirmBody').show();
    $("#selectLeadersConfirmBody").html("Leadership Update Submitting... Please wait a moment.");
    $("#generalModalClose").hide();
    $("#modalAttendanceList").html("");
    groupName = $("#groupName").html();
    groupId = $("#groupId").val();
    updateLeaderText();
    leaders = $('#currentLeaders').val();
    $('#closePostConfirmAddLeader').show();
    $("#selectLeadersConfirmBody").html("Leadership Succesfully Updated.");
    
}

function addUsersToGroup(){
    $('#selectMembersModalBody').hide();
    $('#saveAddMembersManagePage').hide();
    $('#selectMembersConfirmBody').show();
    $("#selectMembersConfirmBody").html("Membership Update Submitting... Please wait a moment.");
    $("#generalModalClose").hide();
    $("#modalAttendanceList").html("");
    groupName = $("#groupName").html();
    groupId = $("#groupId").val();
    updateMemberText();
    members = $('#currentMembers').val();
    $('#closePostConfirmAddMember').show();
    $("#selectMembersConfirmBody").html("Membership Succesfully Updated.");
   
}

function updateGroup(){
    $('#modalConfirm').hide();
    $('#modalClose').hide();

    name = $("#groupName").val();
    groupId = $("#groupId").val();
    category = $(".groupOrEvent.active").children().val();
    category = $('#groupCategory').val();
    startDate = $("#datepickStart").val();
    startTime = $("#startTimePick").val();
    //endDate = $("#datepickEnd").val();
    endTime = $("#endTimePick").val();
    repeats = $("#repeatDate").prop('checked');
    repeatsFrequency = $("#groupRepeats").val();
    repeatsDaysOfWeekArray = [];
    repeatsMonthType = "";
    repeatsEndDate = "";
    if(repeats == true){
      if(repeatsFrequency == "Weekly"||repeatsFrequency == "Bi-Weekly"){
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
    
    startTime = $("#startTimepick").val();
    endTime = $("#endTimepick").val();
    purpose = $("#groupPurpose").val();
    
    otherChurchOrgs = "";
    primaryChurchOrg = $("#primaryChurchOrg").val();
    otherChurchOrgArray = $("#secondaryChurchOrgs").val();
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
    gender = $("#gender").html();
    age = $("#age").html()
    childcare = $("#groupChildcare").html();
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
    if(locationName.length == 0){
      validationString+= "Please enter a valid location.<br>";
      validation = false;
    }

    if(!validation){
      $("#validation").html(validationString);
      return false;
    }
    $("#myModal2Body").hide();
    $("#myModal2Footer").hide();
    $("#myModal2Label").html("Submitting... Please wait a moment.");
    $('#myModal2').modal({
        keyboard: false,
        backdrop: 'static'
    })
        $('#generalModalText').html('This is only a demo, so changes won\'t be saved.');
        $('#generalModalClose').show();
}

function changeGroupOpen(value){
        if(value == false){
            $("#generalModalText").html("Closing. Please wait a moment.");
        }
        else if(value == true){
            $("#generalModalText").html("Opening. Please wait a moment.");
        }
        $("#generalModalClose").hide();
        $('#generalModal').modal({
            keyboard: false,
            backdrop: 'static'
        })
        
}

function addTask(){
    taskName = $('#taskName').val();
}

function addEmailLink(emailList,groupName){
    return "<br><a href='mailto:"+emailList.toString().replace(/,/g,';')+"?subject=Message from HisKingdom:"+groupName+"' target='_blank'>Send Email to Members</a>";
}