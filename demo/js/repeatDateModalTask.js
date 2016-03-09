weekdaysTask = [];

$(document).ready(function(){
  $('#datepickStartTask').pickadate({
    format: 'mm/dd/yyyy',
    formatSubmit: 'mm/dd/yyyy',
    min: new Date()
  });
  $('#datepickEndTask').pickadate({
    format: 'mm/dd/yyyy',
    formatSubmit: 'mm/dd/yyyy',
    min: new Date()
  });
  $('#datepickRepeatEndTask').pickadate({
    format: 'mm/dd/yyyy',
    formatSubmit: 'mm/dd/yyyy',
    container: 'body',
    min: new Date()
  });
  resetDateModalTask();
})

$('#datepickStartTask').change(function(){
  $("#datepickEndTask").pickadate('picker').set('min',
    new Date($("#datepickStartTask").pickadate('picker').get()))
  start = new Date($(this).val());
  end = new Date($('#datepickEndTask').val())
  if(start>end){
    $('#datepickEndTask').pickadate('picker').set('select',start);
  }
  setEndTimeOptionsTask();
})

$('#datepickEndTask').change(function(){
  setEndTimeOptionsTask();
})

$("#startTimepickTask").change(function(){
  setEndTimeOptionsTask();
})

$("#groupRepeatsTask").change(function(){
  initializeRepeatTextTask();
})

$('#datepickRepeatEndTask').change(function(){
  updateRepeatTextTask();
})


$('#repeatDateTask').click(function(){
  $('#cancelRepeatDate').show();
  $('#closeRepeatDate').hide();
  if($('#repeatDateTask').prop('checked')){
    openModalTask();
  }
  else{
    $('#repeatTextTask').html('Calendar Summary: Does not repeat');
    $('#repeatDateTaskEdit').hide();
  }
});

$('#repeatDateTaskEdit').click(function(){
  $('#repeatDateModalTask').modal('show');
  $('#cancelRepeatDateTask').hide();
  $('#closeRepeatDateTask').show();
  $('#startDateInModalTask').html($("#datepickStartTask").pickadate('picker').get()); 
})


$('#cancelRepeatDateTask').click(function () {
  $('#repeatDateTask').prop('checked',false);
  $('#repeatTextTask').html('Calendar Summary: Does not repeat');
})
$('#saveRepeatDateTask').click(function () {
  $('#repeatTextTask').html('Calendar Summary: ' + $('#repeatTextTaskInModal').html());
  $('#repeatDateTaskEdit').show();
})


$('.repeatDayOfWeekTask').change(function(){
    weekdaysTask = [];
    $('.repeatDayOfWeekTask').each(function(){
        if($(this).prop('checked')){
            weekdaysTask.push(dayOfWeekApprevToFull($(this).val()));
        }
    })
    $('#repeatTextTaskInModal').html($('#groupRepeatsTask').val() + ' on ' + weekdaysTask.toString().replace(',',', ')+getEndStringTask());
})

$('.monthTypeSelectTask').change(function(){
  startDate = $("#datepickStartTask").pickadate('picker').get();
  startDateObject = new Date(new Date(startDate));
  defaultDayOfWeekOfMonthTask(startDateObject);
})

function resetDateModalTask(){
  $('#datepickStartTask').pickadate('picker').set('select',new Date());
  $('#datepickEndTask').pickadate('picker').set('select',new Date());
  $("#startTimepickTask").val("17:00");
  $('#repeatDateTask').prop('checked',false);
  $('#repeatTextTask').html('Calendar Summary: Does not repeat');
  $('#repeatTextTaskInModal').html('Calendar Summary: Does not repeat');
  $('#dayOfWeekOfMonthTask').prop('checked',true);
  $('#dateInMonthTask').prop('checked',false);
  startDate = $("#datepickStartTask").pickadate('picker').get();
  startDateObject = new Date(new Date(startDate));
  defaultDayOfWeekTask(startDateObject);
  $('#repeatDateTaskEdit').hide();
  setEndTimeOptionsTask();
}

function setEndTimeOptionsTask(){
  startTimeArray = $("#startTimepickTask").val().split(':');
  startTime = new Date($("#datepickStartTask").pickadate('picker').get()).
    setHours(startTimeArray[0],startTimeArray[1]);
  $('#endTimepickTask option').each(function(key,val){
    endTimeArray = $(this).val().split(':');
    endTime =  new Date($("#datepickEndTask").pickadate('picker').get()).
    setHours(endTimeArray[0],endTimeArray[1]);
    if(endTime==startTime){
      $(this).hide();
      $('#endTimepickTask').prop('selectedIndex',key+2);
    }
    else if(endTime<=startTime){
      $(this).hide();
    }
    else{
      $(this).show();
    }
  })
}

function openModalTask(){
  startDateTask = $("#datepickStartTask").pickadate('picker').get();
  $('#repeatDateModalTask').modal({        
    keyboard: false,
    backdrop: 'static'
  })
  $('#startDateInModalTask').html(startDateTask); 
  initializeRepeatTextTask();
}

function initializeRepeatTextTask(){
  weekdaysTask = [];
  startDateTask = $("#datepickStartTask").pickadate('picker').get();
  startDateObjectTask = new Date(new Date(startDateTask));
  groupRepeatsTask = $('#groupRepeatsTask').val();
  $("#dayOfWeekOfMonthSelectTask").hide();
  $("#dayOfWeekPickTask").hide();
  if(groupRepeatsTask == "Daily"){
    $('#repeatTextTaskInModal').html(groupRepeatsTask+getEndStringTask());
  }
  else if(groupRepeatsTask == "Weekly"){
    $("#dayOfWeekPickTask").show();
    defaultDayOfWeekTask(startDateObjectTask);
  }
  else if(groupRepeatsTask == "Monthly"){
    $("#dayOfWeekOfMonthSelectTask").show();
    defaultDayOfWeekOfMonthTask(startDateObjectTask);
  }
  else if(groupRepeatsTask == "Yearly"){
    $('#repeatTextTaskInModal').html(groupRepeatsTask + ' on ' + getMonthFull(startDateObjectTask.getMonth())+' '
      +getNumberWithSuffix(startDateObjectTask.getDate())+getEndStringTask());
  }
}

function updateRepeatTextTask(){
  startDateTask = $("#datepickStartTask").pickadate('picker').get();
  startDateObjectTask = new Date(new Date(startDateTask));
  groupRepeatsTask = $('#groupRepeatsTask').val();
  if(groupRepeatsTask == "Daily"){
    $('#repeatTextTaskInModal').html(groupRepeatsTask+getEndStringTask());
  }
  else if(groupRepeatsTask == "Weekly"){
    $('#repeatTextTaskInModal').html(groupRepeatsTask+ ' on ' + weekdaysTask.toString().replace(',',', ')+getEndStringTask());
  }
  else if(groupRepeatsTask == "Monthly"){
    $("#dayOfWeekOfMonthSelectTask").show();
    defaultDayOfWeekOfMonthTask(startDateObjectTask);
  }
  else if(groupRepeatsTask == "Yearly"){
    $('#repeatTextTaskInModal').html(groupRepeatsTask + ' on ' + getMonthFull(startDateObjectTask.getMonth())+
      ' '+getNumberWithSuffix(startDateObject.getDate())+getEndStringTask());
  }
} 

function defaultDayOfWeekTask(startDateObjectTask){
  $('#repeatTextTaskInModal').html($('#groupRepeatsTask').val() + ' on ' + dayOfWeekFull(startDateObjectTask.getDay())+getEndStringTask());
  $('.repeatDayOfWeekTask').each(function(){
    if($(this).val()==dayOfWeekApprev(startDateObject.getDay())){
        $(this).prop('checked', true);
    }
    else{
        $(this).prop('checked', false);
    }
  })
  weekdaysTask = [];
  weekdaysTask.push(dayOfWeekFull(startDateObjectTask.getDay()));
}

function defaultDayOfWeekOfMonthTask(startDateObjectTask){
  if($('.monthTypeSelectTask:checked').val() == "dateInMonth"){
    $('#repeatTextTaskInModal').html(groupRepeatsTask + ' on the ' + 
      getNumberWithSuffix(startDateObjectTask.getDate())+getEndStringTask());
  }
  else if($('.monthTypeSelectTask:checked').val() == "dayOfWeekOfMonth"){
    dayOfWeekOfMonthTask = 1 + parseInt(startDateObjectTask.getDate()/7);
    $('#repeatTextTaskInModal').html(groupRepeatsTask + ' on the ' + getNumberWithSuffix(dayOfWeekOfMonthTask) + ' ' + 
      dayOfWeekFull(startDateObjectTask.getDay()) + getEndStringTask());
  }
}

function getEndStringTask(){
  if($('#datepickRepeatEndTask').val()){
    return ', until ' + $('#datepickRepeatEndTask').val();
  }
  else{
    return ', ongoing'
  }
}