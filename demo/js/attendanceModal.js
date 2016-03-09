$('#takeAttendance').click(function(){
    $("#modalAttendanceText").html("");
    $("#modalAttendanceInputs").show();
    $("#modalAttendanceUpdated").hide();
    $("#modalAttendanceCompleted").show();
    $("#modalAttendanceClosed").text("Cancel");
    $('.attendance:checked').prop('checked',false);
    $("#attendanceListLeader").prop("checked",true);
    $('#datepick').pickadate({
        format: 'mm/dd/yyyy',
        formatSubmit: 'mm/dd/yyyy',
        min: new Date(),
        container:'#groupForm'
    });
    var input = $('#datepick').pickadate();
    var picker = input.pickadate('picker');
    picker.set('select',new Date());
    $('#myModalAttendance').modal({
        keyboard: false,
        backdrop: 'static'
    })
})

$('#modalAttendanceCompleted').click(function(){
    attendanceList = []
    $("#modalAttendanceInputs").hide();
    $("#modalAttendanceCompleted").hide();
    $('.attendance:checked').each(function(key,val){
        attendanceList.push($(val).val());
    });
    $("#modalAttendanceClose").hide();
    $("#modalAttendanceText").html("<h4>Creating a new attendance record. Please wait a moment.</h4>");
    $.post("/rest/member/addLoggedInMeetingAttendance",
        { 
            groupId:$("#groupId").val(),
            notes:$("#attendanceNotes").val(),
            attendanceList:attendanceList.toString(),
            date:$("#datepick").val()
        },
        function(data){
            $("#modalAttendanceText").html("<h4>"+data.status+"</h4>");
            if(data.status == "An attendance record was succesfully made for this group."){
                $("#modalAttendanceClose").text("Close");
            }
            else{
                $("#modalAttendanceUpdated").show();
            }
            $("#modalAttendanceClose").show();
    })
})

$('#modalAttendanceUpdated').click(function(){
    attendanceList = []
    $('.attendance:checked').each(function(key,val){
        attendanceList.push($(val).val());
    });
    $("#modalAttendanceClose").hide();
    $("#modalAttendanceUpdated").hide();
    $("#modalAttendanceCompleted").hide();
    $("#modalAttendanceText").html("<h4>Updating attendance record. Please wait a moment.</h4>");
    $.post("/rest/member/updateLoggedInMeetingAttendance",
        { 
            groupId:$("#groupId").val(),
            notes:$("#attendanceNotes").val(),
            attendanceList:attendanceList.toString(),
            date:$("#datepick").val()
        },
        function(data){
            $("#modalAttendanceText").html("<h4>"+data.status+"</h4>");
            $("#modalAttendanceClose").text("Close");
            $("#modalAttendanceUpdated").hide();
            $("#modalAttendanceClose").show();
    })
})
