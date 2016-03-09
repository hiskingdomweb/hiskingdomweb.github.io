var cookSkills = [];
var genLaborSkills = [];
var handySkills = [];

$('#assignSkill').click(function(){
  $("#skillBox").html(skillBoxHTML);
  $('.skillSelect').hide();
  $('#skillModal').modal({
        keyboard: false,
        backdrop: 'static'
    });
  $('.skillButton').click(function(){
    if(!$('.skillSelect').is(':visible')){
      $('.skillButton').not(this).each(function(){
        $(this).fadeOut('fast'); 
      })
      $(this).animate({
        height: '50px'
      })
      loadSkillHTML($(this).text());
    }
    else{
      $('.skillButton').not(this).each(function(){
        $(this).show('fast');  
      })
      $(this).animate({
        height: '100px'
      })
      $('.skillSelect').fadeOut('fast');
    }
  })
})

$('#addSkills').click(function(){
  var cookSkills = [];
  var genLaborSkills = [];
  var handySkills = [];
  $('.cookSkill').each(function(){
    if($(this).prop('checked')){
      cookSkills.push($(this).val());
    }
  })
  $('.genLaborSkill').each(function(){
    if($(this).prop('checked')){
      genLaborSkills.push($(this).val());
    }
  })
  $('.handySkill').each(function(){
    if($(this).prop('checked')){
      handySkills.push($(this).val());
    }
  })
  $('#skillList').html(skillString(cookSkills,genLaborSkills,handySkills));
})

$('#cancelSkills').click(function(){
  $('.skill').each(function(){
    if($.inArray($(this).val(), genLaborSkills)>=0){
      $(this).prop('checked',true);
    }
    else{
      $(this).prop('checked',false);
    }
    if($.inArray($(this).val(), handySkills)>=0){
      $(this).prop('checked',true);
    }
    else{
      $(this).prop('checked',false);
    }
    if($.inArray($(this).val(), cookSkills)>=0){
      $(this).prop('checked',true);
    }
    else{
      $(this).prop('checked',false);
    }
  })
  $('#skillList').html(skillString(cookSkills,genLaborSkills,handySkills));
})

function skillString(cookSkills,genLaborSkills,handySkills){
  cookString = "";
  genLaborString = "";
  handyString = "";
  if(cookSkills.length + genLaborSkills.length + handySkills == 0){
    return "None";
  }
  if(cookSkills.length==0){
    cookString = "";
  }
  else{
    cookString = "Cooking Skills: "+ cookSkills.toString()+"<br>";
  }
  if(genLaborSkills.length==0){
    genLaborString = "";
  }
  else{
    genLaborString = "General Labor Skills: "+ genLaborSkills.toString() +"<br>";
  }
  if(handySkills.length==0){
    handyString = "";
  }
  else{
    handyString = "Handy Skills: "+ handySkills.toString() +"<br>";
  }
  return cookString+genLaborString+handyString;
}

function loadSkillHTML(skillType){
  if(skillType=="Cook"){
    $("#cookSkill").fadeIn('fast');
  }
  else if(skillType=="General Labor"){
   $("#genLaborSkill").fadeIn('fast');
  }
  else if(skillType=="Handy"){
   $("#handySkill").fadeIn('fast');
  }
}

function resetSkillModal(){
  $('.skill').prop('checked',false);
  $('#skillList').html('None');
}

skillBoxHTML =  '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton" id="test">General Labor</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Cook</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Handy</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Church Service</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Teach</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Social</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Kids</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Music</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Drama</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Grounds</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Clean</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Compassion</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Art</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Office</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Legal</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Engineering</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Crafts</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Business</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Language</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Mentor</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Counseling</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Mechanical</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Missions</button></div>'+
                '<div class="col-md-4 skillButtonCol"><button type="button" class="btn btn-default skillButton">Speaking</button></div>';