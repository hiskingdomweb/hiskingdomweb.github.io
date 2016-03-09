weekdays = [];


$(document).ready(function(){
  $('#datepickStart').pickadate({
    format: 'mm/dd/yyyy',
    formatSubmit: 'mm/dd/yyyy',
    //min: new Date()
  });
  /*
  $('#datepickEnd').pickadate({
    format: 'mm/dd/yyyy',
    formatSubmit: 'mm/dd/yyyy',
    min: new Date()
  });*/
  $('#datepickRepeatEnd').pickadate({
    format: 'mm/dd/yyyy',
    formatSubmit: 'mm/dd/yyyy',
    container: 'body',
    min: new Date()
  });
  resetDateModal();
})

$('#datepickStart').change(function(){
  /*$("#datepickEnd").pickadate('picker').set('min',
    new Date($("#datepickStart").pickadate('picker').get()))*/
  start = new Date($(this).val());
  /*end = new Date($('#datepickEnd').val())
  if(start>end){
    $('#datepickEnd').pickadate('picker').set('select',start);
  }*/
  setEndTimeOptions();
  initializeRepeatText();
  $('#repeatText').html('Calendar Summary: ' + $('#repeatTextInModal').html());
})

/*
$('#datepickEnd').change(function(){
  setEndTimeOptions();
})*/

$("#startTimepick").change(function(){
  setEndTimeOptions();
})

$('#repeatDate').click(function(){
  $('#cancelRepeatDate').show();
  $('#closeRepeatDate').hide();
  if($('#repeatDate').prop('checked')){
    openModal();
  }
  else{
    $('#repeatText').html('Calendar Summary: Does not repeat');
    $('#repeatDateEdit').hide();
  }
});

$('#repeatDateEdit').click(function(){
  openModal();
  $('#cancelRepeatDate').hide();
  $('#closeRepeatDate').show();
  $('#startDateInModal').html($("#datepickStart").pickadate('picker').get()); 
})

$("#groupRepeats").change(function(){
  initializeRepeatText();
})
$('#datepickRepeatEnd').change(function(){
  updateRepeatText();
})
$('#cancelRepeatDate').click(function () {
  $('#repeatDate').prop('checked',false);
  $('#repeatText').html('Calendar Summary: Does not repeat');
})
$('#saveRepeatDate').click(function () {
  $('#datepickStart').pickadate('picker').set('select',new Date($('#startDateInModal').html()));
  $('#repeatText').html('Calendar Summary: ' + $('#repeatTextInModal').html());
  $('#repeatDateEdit').show();
})

$('#groupRepeatsMonthlyNumber').change(function(){
  updateRepeatsMonthlyFields();
})


$('#groupRepeatsMonthlyDayOfWeek').change(function(){
  updateRepeatsMonthlyFields();
 })

function updateRepeatsMonthlyFields(){
  startDateObject = new Date( new Date($("#datepickStart").pickadate('picker').get()));
  month = startDateObject.getMonth();
  originalStartDateObject = new Date(startDateObject);

  startDateObject.setTime(startDateObject.getTime()-(startDateObject.getDate())*86400000);
  startDateObject.setTime(startDateObject.getTime()-(startDateObject.getDay())*86400000);
  startDateObject.setTime(startDateObject.getTime()+
    (parseInt(dayOfWeekApprevToNum($('#groupRepeatsMonthlyDayOfWeek').val()))*86400000));
  if(startDateObject.getMonth()!=month){
    startDateObject.setTime(startDateObject.getTime()+(7*86400000));
  }
  startDateObject.setTime(startDateObject.getTime()+((parseInt($('#groupRepeatsMonthlyNumber').val())-1)*7*86400000));

  if(startDateObject.getTime()<originalStartDateObject.getTime()){
    startDateObject = originalStartDateObject;
    startDateObject.setMonth(startDateObject.getMonth()+1);
    month = startDateObject.getMonth();
    startDateObject.setTime(startDateObject.getTime()-(startDateObject.getDate())*86400000);
    startDateObject.setTime(startDateObject.getTime()-(startDateObject.getDay())*86400000);
    console.debug(startDateObject);
    startDateObject.setTime(startDateObject.getTime()+
      (parseInt(dayOfWeekApprevToNum($('#groupRepeatsMonthlyDayOfWeek').val()))*86400000));
    if(startDateObject.getMonth()!=month){
      startDateObject.setTime(startDateObject.getTime()+(7*86400000));
    }
  startDateObject.setTime(startDateObject.getTime()+((parseInt($('#groupRepeatsMonthlyNumber').val())-1)*7*86400000));
  }

  $('#startDateInModal').html((startDateObject.getMonth()+1)+"/"+startDateObject.getDate()+"/"+startDateObject.getFullYear());
  $('#repeatTextInModal').html($('#groupRepeats').val() + ' on ' + 
    getNumberWithSuffix($('#groupRepeatsMonthlyNumber').val()) + ' ' + dayOfWeekFull(startDateObject.getDay())+getEndString());

}

$('.repeatDayOfWeek').change(function(){
  weekdays = [];
  weekdayNumbers = [];
    $('.repeatDayOfWeek').each(function(){
        if($(this).prop('checked')){
            weekdays.push(dayOfWeekApprevToFull($(this).val()));
            weekdayNumbers.push(dayOfWeekApprevToNum($(this).val()));
        }
    })
    startDateObject = new Date( new Date($("#datepickStart").pickadate('picker').get()));
    


    if(weekdayNumbers[0]>startDateObject.getDay()){
      startDateObject.setTime(startDateObject.getTime()+((weekdayNumbers[0]-startDateObject.getDay())*86400000))
    }
    else if(weekdayNumbers[0]<startDateObject.getDay()){
      startDateObject.setTime(startDateObject.getTime()+((weekdayNumbers[0]-startDateObject.getDay()+7)*86400000))
    }
    
    $('#startDateInModal').html((startDateObject.getMonth()+1)+"/"+startDateObject.getDate()+"/"+startDateObject.getFullYear());
    $('#repeatTextInModal').html($('#groupRepeats').val() + ' on ' + weekdays.toString().replace(',',', ')+getEndString());
})

$('.monthTypeSelect').change(function(){
  startDate = $("#datepickStart").pickadate('picker').get();
  startDateObject = new Date(new Date(startDate));
  defaultDayOfWeekOfMonth(startDateObject);
})



function resetDateModal(){
  $('#datepickStart').pickadate('picker').set('select',new Date());
  //$('#datepickEnd').pickadate('picker').set('select',new Date());
  $("#startTimepick").val("17:00");
  $('#repeatDate').prop('checked',false);
  $('#repeatText').html('Calendar Summary: Does not repeat');
  $('#repeatTextInModal').html('Calendar Summary: Does not repeat');
  $('#dayOfWeekOfMonth').prop('checked',true);
  $('#datepickRepeatEnd').pickadate('picker').clear();
  $('#dateInMonth').prop('checked',false);
  startDate = $("#datepickStart").pickadate('picker').get();
  startDateObject = new Date(new Date(startDate));
  defaultDayOfWeek(startDateObject);
  $('#repeatDateEdit').hide();
  setEndTimeOptions();
}

function setEndTimeOptions(){
  startTimeArray = $("#startTimepick").val().split(':');
  startTime = new Date($("#datepickStart").pickadate('picker').get()).
    setHours(startTimeArray[0],startTimeArray[1]);
  $('#endTimepick option').each(function(key,val){
    endTimeArray = $(this).val().split(':');
    endTime =  new Date($("#datepickStart").pickadate('picker').get()).
    setHours(endTimeArray[0],endTimeArray[1]);
    if(endTime==startTime){
      $(this).hide();
      $('#endTimepick').prop('selectedIndex',key+2);
    }
    else if(endTime<=startTime){
      $(this).hide();
    }
    else{
      $(this).show();
    }
  })
}

function openModal(){
  startDate = $("#datepickStart").pickadate('picker').get();
  $('#repeatDateModal').modal({        
    keyboard: false,
    backdrop: 'static'
  })
  $('#startDateInModal').html(startDate); 
  initializeRepeatText();
}

function initializeRepeatText(){
  weekdays = [];

  startDate = $("#datepickStart").pickadate('picker').get();
  startDateObject = new Date(new Date(startDate));
  groupRepeats = $('#groupRepeats').val();
  $("#dayOfWeekOfMonthSelect").hide();
  $("#dayOfWeekPick").hide();
  if(groupRepeats == "Daily"){
    $('#repeatTextInModal').html(groupRepeats+getEndString());
  }
  else if(groupRepeats == "Weekly" || groupRepeats == "Bi-Weekly"){
    $("#dayOfWeekPick").show();
    defaultDayOfWeek(startDateObject);
  }
  else if(groupRepeats == "Monthly"){
    $("#dayOfWeekOfMonthSelect").show();
    defaultDayOfWeekOfMonth(startDateObject);
  }
  else if(groupRepeats == "Yearly"){
    $('#repeatTextInModal').html(groupRepeats + ' on ' + getMonthFull(startDateObject.getMonth())+' '+getNumberWithSuffix(startDateObject.getDate())+getEndString());
  }
}

function updateRepeatText(){
  startDate = $("#datepickStart").pickadate('picker').get();
  startDateObject = new Date(new Date(startDate));
  groupRepeats = $('#groupRepeats').val();
  if(groupRepeats == "Daily"){
    $('#repeatTextInModal').html(groupRepeats+getEndString());
  }
  else if(groupRepeats == "Weekly"){
    $('#repeatTextInModal').html(groupRepeats+ ' on ' + weekdays.toString().replace(',',', ')+getEndString());
  }
  else if(groupRepeats == "Bi-Weekly"){
    $('#repeatTextInModal').html(groupRepeats+ ' on ' + weekdays.toString().replace(',',', ')+getEndString());
  }
  else if(groupRepeats == "Monthly"){
    $("#dayOfWeekOfMonthSelect").show();
    defaultDayOfWeekOfMonth(startDateObject);
  }
  else if(groupRepeats == "Yearly"){
    $('#repeatTextInModal').html(groupRepeats + ' on ' + getMonthFull(startDateObject.getMonth())+' '+getNumberWithSuffix(startDateObject.getDate())+getEndString());
  }
} 


function defaultDayOfWeek(startDateObject){
  $('#repeatTextInModal').html($('#groupRepeats').val() + ' on ' + dayOfWeekFull(startDateObject.getDay())+getEndString());
  $('.repeatDayOfWeek').each(function(){
    if($(this).val()==dayOfWeekApprev(startDateObject.getDay())){
        $(this).prop('checked', true);
    }
    else{
        $(this).prop('checked', false);
    }
  })
  weekdays = [];
  weekdays.push(dayOfWeekFull(startDateObject.getDay()));
}


function defaultDayOfWeekOfMonth(startDateObject){
  if($('.monthTypeSelect:checked').val() == "dateInMonth"){
    $('#repeatMonthByDayOfWeek').hide()
    $('#repeatTextInModal').html($('#groupRepeats').val() + ' on the ' 
      + getNumberWithSuffix(startDateObject.getDate())+getEndString());
  }
  else if($('.monthTypeSelect:checked').val() == "dayOfWeekOfMonth"){
    $('#repeatMonthByDayOfWeek').show()
    dayOfWeekOfMonth = 1 + parseInt(startDateObject.getDate()/7);
    $('#groupRepeatsMonthlyNumber').val(dayOfWeekOfMonth);
    $('#groupRepeatsMonthlyDayOfWeek').val(dayOfWeekApprev(startDateObject.getDay()));
    $('#repeatTextInModal').html($('#groupRepeats').val() + ' on the ' + getNumberWithSuffix(dayOfWeekOfMonth) 
      + ' ' + dayOfWeekFull(startDateObject.getDay()) + getEndString());
  }
}

function getEndString(){
  if($('#datepickRepeatEnd').val()){
    return ', until ' + $('#datepickRepeatEnd').val();
  }
  else{
    return ', ongoing'
  }
}