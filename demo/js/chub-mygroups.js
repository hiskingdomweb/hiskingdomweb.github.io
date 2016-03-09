$(document).ready(function(){
    $('#groupForm').hide();
    loadBanner();
    loadGroupTable();
});


$('#group-search-btn').click( function() {
    var rex = new RegExp($("#group-search-box").val(), 'i');
    $('.searchable-group tr').hide();
    $('.searchable-group tr').filter(function() {
        return rex.test($(this).text());
    }).show();
    $('#groupForm').hide();
});



function loadGroupTable(){
    $.getJSON("/rest/member/listLoggedInGroupsMember",function(data){
    //$.getJSON("json/rest/admin/listLoggedInGroups",function(data){
      
        grouptable = '<tbody class="searchable-group">';
        $("#groupForm")[0].reset();
        $.each(data.statements, function (key,val) {
            grouptable += "<tr><td><a href='#' onclick='loadGroup(\""+val.id+"\"); return false'>"+val.groupName+"</a>"+
            "</td></tr>";
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
    $.post("/rest/member/getLoggedInGroupInfo",
        {group:clicked_id},function(userData){
    //$.getJSON('json/rest/admin/getGroupInfo',function(userData){
        data = userData.statements;
        $('#groupName').html(data.groupName);
        $('#groupId').val(clicked_id);
        leaders = [];
        leadersId = [];
        $.each(data.ledBy,function(key,leader){
          leadersId.push(leader.id);
          leaders.push(leader.name+'&#60;'+leader.email+'&#62;');
        })
        leaderString = leaders.toString().replace(/,/g,', ');
        $('#ledBy').html(leaderString);
        members = [];
        $.each(data.hasAsMember,function(key,member){
            if($.inArray(member.id,leadersId)<0){
                members.push(member.name+'&#60;'+member.email+'&#62;');
            }
        })
        memberString = members.toString().replace(/,/g,', ');
        $('#memberList').html(memberString);
        if(data.groupRepeats && data.groupRepeats == "true"){
            $('#datetime').html(data.groupNextStartDate+": "+data.groupStartTime+" to "+data.groupEndTime);
        }
        else{
            $('#datetime').html(data.groupStartDate+" "+data.groupStartTime +" to "+data.groupEndTime);
            
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
        if(data.groupHobbyCollectors=='true'){
           hobbies.push(' Collectors');
        }
        if(hobbies.toString()!= null && hobbies.toString().length>0){
            $('#hobbiesDiv').show();
            $('#hobbies').html(hobbies.toString());
        }
        else{
            $('#hobbiesDiv').hide();
        }
    })
}

$("#modalConfirm").click(function(){
    $('#modalClose').hide();
    $('#modalConfirm').hide();
    $("#checkSuccess").html("Deleting group, please wait a moment...");
    $.post("/rest/admin/deleteGroup",
        {name:$("#clickedGroup").val()},function(userData){
        loadGroupTable();
        $("#checkSuccess").html("Group succesfully deleted.");
        $('#modalClose').show();
    })
})