$('#selectLeaders').click(function(){
  $('#selectLeadersModal').modal({
      keyboard: false,
      backdrop: 'static'
  })
  $('#updatedLeaders').val("true");
  $('.searchableselectLeaders tr').hide();  
})

function loadUserTables(gender,age,members,leaders){
  $.getJSON("/rest/member/listUsersGroupLeader",function(data){  
    loadLeadersTable(data);
    loadMembersTable(data);
    loadMembersLeadersFromGroup(members,leaders);
  })
}

function loadLeadersTable(data,gender,age){
    var usertable;
         $('#prospectiveLeadersList').html('<table><tbody class="searchableselectLeaders">');
         users = data.statements;
         users.sort(function(a,b){
            //return a.attributes.OBJECTID - B.attributes.OBJECTID;
            if(a.name.toLowerCase() == b.name.toLowerCase())
                return 0;
            if(a.name.toLowerCase() < b.name.toLowerCase())
                return -1;
            if(a.name.toLowerCase() > b.name.toLowerCase())
                return 1;
        });

        $.each(users, function (key,val) {
    
            $('#prospectiveLeadersList').append("<tr><td>"
            +val.name+"</td><td style='display:none;'>"+val.email+
            "</td><td><input id='leaders"+val.id+"' class='leadersChecklist' value='"+val.id+"' type='checkbox'></td></tr>");
            $('#leaders'+val.id).click(function(){
              addLeaderToList(val,$(this).prop('checked'));
            })
          
        })

        $('#prospectiveLeadersList').append("</tbody></table>");
        
        $('.searchableselectLeaders tr').hide();
   
}

$('#leaders-search-btn').click( function() {
    var rex = new RegExp($("#leaders-search-box").val(), 'i');
    $('.searchableselectLeaders tr').hide();
    $('.searchableselectLeaders tr').filter(function() {
        return rex.test($(this).text());
    }).show();
});

$('#saveAddLeaders').click(function(){
  $('#selectLeadersModal').modal('hide');
  updateLeaderText();
})

function updateLeaderText(){
  leaders = []
  leadersNameEmail = []
  $.each($('#prospectiveLeadersList :checked'),function(key,checkboxElement){
    if(!$(checkboxElement).prop('disabled')){
      leaders.push($(checkboxElement).val());
      leaderName = $($(checkboxElement).parent().siblings()[0]).html();
      leaderEmail = $($(checkboxElement).parent().siblings()[1]).html();
      leadersNameEmail.push(leaderName+"&#60;"+leaderEmail+"&#62;");
    }
  });
  $('#currentLeaders').val(leaders.toString());
  $('#currentLeadersHTML').html(leadersNameEmail.toString().replace(/,/g, ', '));
}

function addLeaderToList(val,checked){
  $('#leaders'+val.id).prop('checked',checked);
  if(checked){
    if($("#addedLeadersList tr").length == 0){
      $("#addedLeadersList").html("");
    }
    $("#addedLeadersList").append("<tr><td>"
      +val.name+"</td><td style='display:none;'>"+val.email+
      "</td><td><input id='addedLeaders"+val.id+"' class='addedLeadersChecklist' value='"+val.id+
      "' type='checkbox' checked></td></tr>");

    $('#addedLeaders'+val.id).change(function(){
      $('#leaders'+$(this).val()).prop('checked',false);
      $(this).parent().parent().remove();
      memberObject = new Object();
      memberObject.id = $('#members'+$(this).val()).val();
      memberObject.name = $($('#members'+$(this).val()).parent().siblings()[0]).html();
      memberObject.email = $($('#members'+$(this).val()).parent().siblings()[1]).html();
      $('#members'+$(this).val()).prop('disabled',false);
      addMemberToList(memberObject,true);
      updateMemberText();
    })
  }
  else{
    $('#addedLeaders'+val.id).parent().parent().remove();
  }
  if($("#addedLeadersList tr").length==0){
    $("#addedLeadersList").html("None");
  }

  $('.membersChecklist').prop('disabled',false);
  $.each($('.leadersChecklist'),function(key,val){
    if($(val).prop('checked')){
      $('#members'+$(val).val()).prop('disabled',true);
      $('#members'+$(val).val()).prop('checked',true);
      $('#addedMembers'+$(val).val()).parent().parent().remove();
    }
  })
  updateMemberText();
}

/////////////////////////////

$('#selectMembers').click(function(){
  $('#selectMembersModal').modal({
      keyboard: false,
      backdrop: 'static'
  })
  $('#updatedMembers').val("true");
  $('.searchableselectMembers tr').hide();  
})



function loadMembersTable(data){
    var usertable;
         $('#prospectiveMembersList').html('<tbody class="searchableselectMembers">');
         users = data.statements;
         users.sort(function(a,b){
            //return a.attributes.OBJECTID - B.attributes.OBJECTID;
            if(a.name.toLowerCase() == b.name.toLowerCase())
                return 0;
            if(a.name.toLowerCase() < b.name.toLowerCase())
                return -1;
            if(a.name.toLowerCase() > b.name.toLowerCase())
                return 1;
        });

        $.each(users, function (key,val) {
            $('#prospectiveMembersList').append("<tr><td>"
            +val.name+"</td><td style='display:none;'>"+val.email+
            "</td><td><input id='members"+val.id+"' class='membersChecklist' value='"+val.id+"' type='checkbox'></td></tr>");
            $('#members'+val.id).change(function(){
              addMemberToList(val,$(this).prop('checked'));
            })
        })
        $('#prospectiveMembersList').append("</tbody>");

        
        $('.searchableselectMembers tr').hide();    
}

$('#members-search-btn').click( function() {
    var rex = new RegExp($("#members-search-box").val(), 'i');
    $('.searchableselectMembers tr').hide();
    $('.searchableselectMembers tr').filter(function() {
        return rex.test($(this).text());
    }).show();
});

$('#saveAddMembers').click(function(){
  $('#selectMembersModal').modal('hide');
  updateMemberText();
})

function updateMemberText(){
  members = []
  membersNameEmail = []
  $.each($('#prospectiveMembersList :checked'),function(key,checkboxElement){

    if(!$(checkboxElement).prop('disabled')){
      members.push($(checkboxElement).val());
      memberName = $($(checkboxElement).parent().siblings()[0]).html();
      memberEmail = $($(checkboxElement).parent().siblings()[1]).html();
      membersNameEmail.push(memberName+"&#60;"+memberEmail+"&#62;");
    }
  });
  $('#currentMembers').val(members.toString());
  $('#currentMembersHTML').html(membersNameEmail.toString().replace(/,/g, ', '));
}

function loadMembersLeadersFromGroup(memberArray,leaderArray){
  $('.membersChecklist').prop('checked',false);
  $("#addedMembersList").html("None");
  $('.membersChecklist').prop('disabled',false);
  $("#addedLeadersList").html("None");
  $('.leadersChecklist').prop('checked',false);
  
  leaders = []
  leadersNameEmail = []
  $.each(leaderArray,function(key,val){
    leaders.push(val.id);
    leadersNameEmail.push(val.name+"&#60;"+val.email+"&#62;");
    addLeaderToList(val,true);
    $('#members'+val.id).prop('disabled',true);
    $('#members'+val.id).prop('checked',true);
  })

  members = []
  membersNameEmail = []
  $.each(memberArray,function(key,val){
    if($.inArray(val.id,leaders)<0){
      members.push(val.id);
      membersNameEmail.push(val.name+"&#60;"+val.email+"&#62;");
      addMemberToList(val,true);
    }
  })
  $('#currentMembers').val(members.toString());
  $('#currentMembersHTML').html(membersNameEmail.toString().replace(/,/g, ', '));
  $('#currentLeaders').val(leaders.toString());
  $('#currentLeadersHTML').html(leadersNameEmail.toString().replace(/,/g, ', '));
}

function addMemberToList(val,checked){
  $('#members'+val.id).prop('checked',checked);
  if(checked){
    if($("#addedMembersList tr").length == 0){
      $("#addedMembersList").html("");
    }
    $("#addedMembersList").append("<tr><td>"
      +val.name+"</td><td style='display:none;'>"+val.email+
      "</td><td><input id='addedMembers"+val.id+"' class='addedMembersList' value='"+val.id+
      "' type='checkbox' checked></td></tr>");
    $('#addedMembers'+val.id).change(function(){
      $('#members'+$(this).val()).prop('checked',false);
      $(this).parent().parent().remove();
    })
  }
  else{
    $('#addedMembers'+val.id).parent().parent().remove();
  }
  if($("#addedMembersList tr").length==0){
    $("#addedMembersList").html("None");
  }
}