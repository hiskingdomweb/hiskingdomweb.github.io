$(document).ready(function(){
    $("#numKids").val(0);
    $("#oneOrOther .btn").removeClass("active");
    $("#commonDiverse .btn").removeClass("active");
    $('.meetingTime').prop('disabled',true);
    initializeValues();

});

$( "#priorityBody" ).sortable({
    cursorAt: { top:0, left: 0 },
    tolerance: "pointer",
    stop: function( event, ui ){
        $(this).find('tr').each(function(i){
            $(this).find('td:first').text(i+1+'. ');
        });
    }
});

$('#musicLover').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
            '<li>Playing an Instrument</li>'+
            '<li>Singing and Choir</li>'+
            '<li>Concerts</li>'+
            '<li>Music History Studies</li>'+
            '<li>Produce Music</li>'+
            '<li>Band Promotion</li>'+
            '<li>Teaching Music</li>'+
            '<li>Music Collection</li>'+
            '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#stressRelief').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
            '<li>Yoga</li>'+
            '<li>Meditation</li>'+
            '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#kidsFamilies').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
                '<li>Model Trains/Planes/Cars</li>'+
                '<li>Scenic Travel by Train</li>'+
                '<li>Remote Controlled Toys</li>'+
                '<li>Building with Legos</li>'+
                '<li>Magic Tricks</li>'+
                '<li>Kite Flying</li>'+
                '<li>Zoos</li>'+
                '<li>Cruising the Seas</li>'+
                '<li>Puppetry</li>'+
                '<li>Juggling</li>'+
                '<li>Collecting</li>'+        
                '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#kidsFamilies').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
                '<li>Model Trains/Planes/Cars</li>'+
                '<li>Scenic Travel by Train</li>'+
                '<li>Remote Controlled Toys</li>'+
                '<li>Building with Legos</li>'+
                '<li>Magic Tricks</li>'+
                '<li>Kite Flying</li>'+
                '<li>Zoos</li>'+
                '<li>Cruising the Seas</li>'+
                '<li>Puppetry</li>'+
                '<li>Juggling</li>'+
                '<li>Collecting</li>'+        
                '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});
$('#outdoors').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
                '<li>Fishing</li>'+
                '<li>Noodling</li>'+
                '<li>Boating</li>'+
                '<li>Hiking</li>'+
                '<li>Camping</li>'+
                '<li>RVing</li>'+
                '<li>Horseback Riding</li>'+
                '<li>Geo-caching</li>'+
                '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#sportsFitness').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
                '<li>Biking</li>'+
                '<li>Baseball/Softball</li>'+
                '<li>Volleyball</li>'+
                '<li>Walking</li>'+
                '<li>Marathons</li>'+
                '<li>Tennis</li>'+
                '<li>Golf</li>'+
                '<li>Skiing/Snowboarding</li>'+
                '<li>Dancing</li>'+
                '<li>Swimming</li>'+
                '<li>Football</li>'+
                '<li>Soccer</li>'+
                '<li>Basketball</li>'+
                '<li>Triathlons</li>'+
                '<li>Surfing/Wind Surfing</li>'+
                '<li>Weightlifting</li>'+
                '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#sharpenTheMind').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
                '<li>Puzzles and Brain Teasers</li>'+
                '<li>Card Games</li>'+
                '<li>Learn to draw or paint</li>'+
                '<li>Chess</li>'+
                '<li>Learn how to play an instrument</li>'+
                '<li>Master a New Language</li>'+
                '<li>Trivia Contests</li>'+
                '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#craftersArtists').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
               '<li>Home Projects</li>'+
               '<li>Jewelry making</li>'+
               '<li>Baking</li>'+
               '<li>Painting</li>'+
               '<li>Pottery</li>'+
               '<li>Drawing</li>'+
               '<li>Candle Making</li>'+
               '<li>Reading</li>'+
               '<li>Soap Making</li>'+
               '<li>Cross stitch</li>'+
               '<li>Journaling</li>'+
               '<li>Digital Art</li>'+
               '<li>Cooking</li>'+
               '<li>Cooking Contests</li>'+
               '<li>Gingerbread Houses</li>'+
               '<li>Doll Making</li>'+
               '<li>Doll House</li>'+
               '<li>Scrap-booking</li>'+
               '<li>Knitting</li>'+
               '<li>Sewing</li>'+
               '<li>Crocheting</li>'+
               '<li>Quilting</li>'+
               '<li>Gardening</li>'+
               '<li>Movie watching</li>'+
               '<li>Fen Shui</li>'+
               '<li>Interior Design</li>'+
               '<li>Writing</li>'+
               '<li>Needlepoint</li>'+
               '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#historyBuffs').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
               '<li>Study The Titanic</li>'+
               '<li>Americana Memorabilia</li>'+
               '<li>Become a Civil War Buff</li>'+
               '<li>Battle Reenactments</li>'+
               '<li>Visit Museums</li>'+
               '<li>Renaissance Fairs</li>'+
               '<li>Create a Family Tree</li>'+
               '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#scienceNature').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
               '<li>Astronomy</li>'+
               '<li>Build Model Rockets</li>'+
               '<li>Microscopy</li>'+
               '<li>Bird Watching</li>'+
               '<li>Aquariums</li>'+
               '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#adventureSeekers').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
               '<li>Scuba diving/Snorkeling</li>'+
               '<li>Mountain Climbing</li>'+
               '<li>Spelunking</li>'+
               '<li>Roller coasters</li>'+
               '<li>Bungee Jumping</li>'+
               '<li>Hot Air Ballooning</li>'+
               '<li>Travelling</li>'+
               '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
})
$('#social').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
               '<li>Wine Tasting</li>'+
               '<li>Flea Markets</li>'+
               '<li>Board Games and Trivia</li>'+
               '<li>Bingo</li>'+
               '<li>Bowling</li>'+
               '<li>Team and Club Sports</li>'+
               '<li>Book Club</li>'+
               '<li>Acting/Improve/Theatre</li>'+
               '<li>Frisbee Golf</li>'+
               '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#entrepreneur').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
               '<li>Writing, Blogging, etc</li>'+
               '<li>Crafting</li>'+
               '<li>Cake Decorating</li>'+
               '<li>Garage Sales and Auctions</li>'+
               '<li>Photography</li>'+
               '<li>Carpentry</li>'+
               '<li>Graphic Design</li>'+
               '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#motorsports').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
               '<li>All Terrain Vehicle Riding</li>'+
               '<li>Motorcycle Street Riding</li>'+
               '<li>Motorsport Racing</li>'+
               '<li>Vehicle Shows</li>'+
               '<li>Vehicle Restoration/Customization</li>'+
               '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#collectors').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
               '<li>Beer Can Collecting</li>'+
               '<li>Book Collecting</li>'+
               '<li>Coin Collecting</li>'+
               '<li>Pin Collecting</li>'+
               '<li>Toy Collecting</li>'+
               '<li>Car Collecting</li>'+
               '<li>Art Collecting</li>'+
               '<li>Spoon Collecting</li>'+
               '<li>Sports Cards/Memorabilia Collecting</li>'+
               '<li>Autograph Collecting</li>'+
               '<li>Antique Collecting</li>'+
               '<li>Rock and Gem Collecting</li>'+
               '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$("#spouseEmailButton").click(function(){
  spouseEmail = $("#spouseEmail").val();
  if(validateEmail(spouseEmail)){
    saveProfileValueSpouse("spouseEmail",spouseEmail);
  }
})

$("#spouseEmail").keyup(function(){
  spouseEmail = $("#spouseEmail").val();
  if(validateEmail(spouseEmail)){
    $("#spouseEmailSpan").removeClass("glyphicon-remove").addClass("glyphicon-ok");
  }
  else{
    $("#spouseEmailSpan").addClass("glyphicon-remove");
  }
})


function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

$("#occupation").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val());
  $("#occupationLabel").css("color","white");
})

$("#education").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val());
  $("#educationLabel").css("color","white");
})

$("#ageRange").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val().replace("+","%2B"));
  $("#ageRangeLabel").css("color","white");
})

$("#gender").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val());
  $("#genderLabel").css("color","white");
})

$("#numKids").change(function(){
  if($("#numKids").val() == 0){
    saveProfileValue($(this).attr('id'),$(this).val());
  }
})


$("#primaryChurchOrg").change(function(){
  loadSecondaryChurchOrgs($(this).val());
  saveProfileValue($(this).attr('id'),$(this).val());
  $("#primaryChurchOrgLabel").css("color","white");
  $("#churchOrgLabel").css("color","red");
})

$(".meetingDay").change(function(){
  $("#meetingTimeLabel").css("color","red");
  $(this).siblings('.meetingTime').prop('disabled',false);
  $(this).siblings('.meetingTime').val("-");
})


$(".meetingTime").change(function(){
  $("#meetingTimeLabel").css("color","white");
  saveProfileValue($(this).attr('id'),$(this).siblings('.meetingDay').val()+","+$(this).val());
})





/*
$(".state").change(function(){
  $("#meetingLocationLabel").css("color","red");
  div = $(this).parent().siblings('.county-td').children('.county')[0];
  loadCounties($(div),$(this).val());
  districtsHTML = '<select><option selected disabled>-</option></select>';
  $($(this).parent().siblings('.district-td').children('.district')).html(districtsHTML);
  //saveProfileValue($(this).attr('id'),$(this).val());
})

$(".county").change(function(){
  $("#meetingLocationLabel").css("color","red");
  div = $(this).parent().siblings('.district-td').children('.district')[0];
  state = $(this).parent().siblings('.state-td').children('.state').val();
  loadDistricts($(div),state,$(this).val());
})

$(".district").change(function(){
  $("#meetingLocationLabel").css("color","white");
  state = $(this).parent().siblings('.state-td').children('.state').val();
  county = $(this).parent().siblings('.county-td').children('.county').val();
  district = $(this).val();
  stateCountyDistrict = state+","+county+","+district;
  saveProfileValue($(this).attr('id'),stateCountyDistrict);
})

*/

$("#groupDynamic").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val());
})

$("#commonDiverse .btn").change(function(){
    saveProfileValue($(this).children()[0].name,$(this).children()[0].value);
})

$("#favoriteSubject").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val());
  $("#favoriteSubjectLabel").css("color","white");
})

$("#favoriteMusic").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val());
  $("#favoriteMusicLabel").css("color","white");
})

$("#favoriteMovie").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val());
  $("#favoriteMovieLabel").css("color","white");
})

$("#favoriteSeason").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val());
  $("#favoriteSeasonLabel").css("color","white");
})

$(".hobby").click(function(){
  saveProfileValue($(this).val(),this.checked);
  $("#hobbyLabel").css("color","white");
  if($(".hobby:checked").length == 0){
    $("#hobbyLabel").css("color","red");
  }
})

$("#wantsMissions").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val());
  $("#wantsMissionsLabel").css("color","white");
})

$("#beenOnMissions").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val());
  $("#beenOnMissionsLabel").css("color","white");
})

$("#oneOrOther .btn").click(function(){
    saveProfileValueOneOrOther($(this).children()[0].name,$(this).children()[0].value);
    $("#oneOrOtherLabel").css("color","white"); 
})

$("#alertFrequency").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val());
  $("#alertFrequencyLabel").css("color","white"); 
})

$("#spiritualJourney").change(function(){
  saveProfileValue($(this).attr('id'),$(this).val());
  $("#spiritualJourneyLabel").css("color","white"); 
})

$("#spiritualGifts").click(function(){
    if($("#spiritualGifts").text().indexOf("Retake")>=0){
      $('#sureModal').modal({
        keyboard: false,
        backdrop: 'static'
        })
      $('#sureModal').modal('show');
    }
    else{
      location.href = 'spiritGifts.html';
    }
    
})

$("#submit").click(function(){
    /*
    $('#myModal2').modal({
        keyboard: false,
        backdrop: 'static'
    })
    $.getJSON("/rest/member/editLoggedInUserProfile?key=profileCompleted&value=true&percent="+changeProgressBar(true),
        function(data){
          window.location.href = "/member/groups.html";
    })
  */
})

$(".progress").click(function(){
    $('#myModal2').modal({
        keyboard: false,
        backdrop: 'static'
    })
    $.getJSON("/rest/member/editLoggedInUserProfile?key=profileCompleted&value=true&percent="+changeProgressBar(true),
        function(data){
          window.location.href = "/member/groups.html";
    })
})

function saveProfileValue(name,value){
  $.getJSON("/rest/member/editLoggedInUserProfile?key="+name+"&value="+value+"&percent="+changeProgressBar(false),
        function(data){
          $("#submit").css("color","red");
    })
}

function saveProfileValueSpouse(name,value){
  $.getJSON("/rest/member/editLoggedInUserSpouse?key="+name+"&value="+value+"&percent="+changeProgressBar(false),
        function(data){
          $("#submit").css("color","red");
          if(data.hasSpouse == true){
            $("#spouseConfirm").html("Spouse Account Succesfully Linked!");
            $("#spouseConfirm").css("color","white");
          }
          else{
            $("#spouseConfirm").html("Your spouse must also put your email in this field for your accounts to be linked.");
            $("#spouseConfirm").css("color","red");
          }

    })
}

function saveProfileValueOneOrOther(name,value){
  $.getJSON("/rest/member/editLoggedInUserProfile?key="+name+"&value="+value+"&percent="+changeProgressBar(false),
        function(data){
          $("#submit").css("color","red");
    })
}

function saveProfileValueStates(){
  loadDistricts();
  loadCounties($("#state").val());
  if($("#state").val()){
    saveProfileValue("states",$("#state").val());
    $("#stateLabel").css("color","white");
  }
  else{
    saveProfileValue("states","");
    $("#stateLabel").css("color","red");
  }
  $("#countyLabel").css("color","red");
  $("#districtLabel").css("color","red");
  saveProfileValue("stateCounties","");
  saveProfileValue("stateCountyDistricts","");
}

function saveProfileValueCounties(){
  if($("#county").val()){
    $.each($("#county").val(),function(key,val){
      if(key == 0){
        stateCounty = val;
      }
      else{
        stateCounty += ';'+val;
      }
    })
    saveProfileValue("stateCounties",stateCounty);
    saveProfileValue("stateCountyDistricts","");
    $("#countyLabel").css("color","white");
    $("#districtLabel").css("color","red");

  } 
  else{
    saveProfileValue("stateCounties","");
    saveProfileValue("stateCountyDistricts","");
    $("#countyLabel").css("color","red");
    $("#districtLabel").css("color","red");
  }
}

function saveProfileValueDistricts(){
  if($("#district").val()){
    $.each($("#district").val(),function(key,val){
      if(key == 0){
        stateCountyDistrict = val;
      }
      else{
        stateCountyDistrict += ';'+val;
      }
    })
    saveProfileValue("stateCountyDistricts",stateCountyDistrict);
    $("#districtLabel").css("color","white");
  } 
  else{
    saveProfileValue("stateCountyDistricts","");
    $("#districtLabel").css("color","red");
  }
}


$("#maritalStatus").change(function(){
    $("#maritalStatusLabel").css("color","white");
    saveProfileValue($(this).attr('id'),$(this).val());
     if($("#maritalStatus").val() == "Married"){
        $("#spouseEmailDiv").show();
     }
     else{
        $("#spouseEmailDiv").hide();
     }
})

$("#numKids").change(function(){
     numKids = $("#numKids").val();
     addChildInfo(numKids);
})

function addChildInfo(numKids){
       $("#ageOfKids").html("");
     if(numKids>0){
        $(".kidLabels").css("color","red");
        $("#ageOfKids").html("<label class='kidLabels' style='color:red;'>Gender/Age of Child(ren):</label>");
     }
     for(var i=0;i<numKids;i++){
        var newdiv = document.createElement('div');
            newdiv.innerHTML = 
            '<select class="kidGender">'+
            '<option selected disabled>-</option>'+
              '<option val="Male">Male</option>'+
              '<option val="Female">Female</option>'+
            '</select>'+
            '<select class="kidAge" disabled>'+
            '<option selected disabled>-</option>'+
              '<option val="0-3">0-3</option>'+
              '<option val="Pre-K">Pre-K</option>'+
              '<option val="Elementary">Elementary</option>'+
              '<option val="Middle">Middle</option>'+
              '<option val="HS">HS</option>'+
              '<option val="College">College</option>'+
              '<option val="Empty Nest">Empty Nest</option>'+
              '<option val="Grandchild">Grandchild</option>'+
            '</select>';
          $("#ageOfKids").append(newdiv);
     }
    $(".kidGender").change(function(){
      $(this).siblings('.kidAge').prop('disabled',false);
      $(this).siblings('.kidAge').val("-");
    })
    $(".kidAge").change(function(){
      valid = true;
      $('.kidAge').each(function(){
        if(!$(this).val()){valid = false;}});
      if(valid){
        $(".kidLabels").css("color","white");
        saveProfileValue("kidGenderAgeGroup",getKidGenderAgeGroup());
      }
    })
}

function getKidGenderAgeGroup(){
    kidGenderAgeGroup = '';
    $(".kidAge").each(function(key,val){
      ageGroup = $(this).val();
      gender = $(this).siblings('.kidGender').val();
      if(key == 0){
            kidGenderAgeGroup += gender + "," + ageGroup 
        }
        else{
            kidGenderAgeGroup += ";" + gender + "," + ageGroup
        }
    })
    return kidGenderAgeGroup;
}

function setKidGenderAgeGroup(kidGenderAgeGroups){
  genderAgeArray = kidGenderAgeGroups;
   $("#numKids").val(kidGenderAgeGroups.length);
    addChildInfo(kidGenderAgeGroups.length);
    for(var i=0;i<kidGenderAgeGroups.length;i++){
      kidGenderAgeGroup = kidGenderAgeGroups[i].split(',');
      $('.kidGender').eq(i).val(kidGenderAgeGroup[0]);
      $('.kidAge').eq(i).val(kidGenderAgeGroup[1]);
    }
    $('.kidAge').prop('disabled',false);
    $(".kidLabels").css("color","white");
    return kidGenderAgeGroups;
}

function loadStates(states){
  var mq = window.matchMedia('only screen and (min-device-width: 320px) and (max-device-width: 1024px)');
  $("#state").val(states);
  if(!mq.matches) {
      $("#state").multiselect({
        width: '200',
        buttonWidth: '300',
        maxHeight: '200',
        numberDisplayed: 1,
        nSelectedText: 'Selected',
        includeSelectAllOption: true,
        onDropdownHide: function(event) {
          saveProfileValueStates();
        },
      });
      $("#state").multiselect("rebuild");
  }
  else{
     $("#state").change(function(){
        saveProfileValueStates();
     })
  }
}

function loadCounties(states,counties){
  $.getJSON('json/counties.json', function(response){
    countiesHTML = '<select multiple="multiple">';
    if(states){
      for(var i=0;i<states.length;i++){
        state = states[i];
        $.each(response[state], function (key,val){
          countiesHTML += '<option value="'+state+','+val+'">'+val+'</option>';
         })
      }
    }
     countiesHTML += '</select>';
     $("#county").html(countiesHTML);

     if(counties){
      $("#county").val(counties);
     }
      var mq = window.matchMedia('only screen and (min-device-width: 320px) and (max-device-width: 1024px)');
      if(!mq.matches) {
          $('#county').multiselect({
          width: '200',
          buttonWidth: '300',
          maxHeight: '200',
          numberDisplayed: 1,
          nSelectedText: 'Selected',
          onDropdownHide: function(event) {
            loadDistricts($("#county").val());
            saveProfileValueCounties();
          },
        });
        $("#county").multiselect("rebuild");
      }
      else{
        $("#county").change(function(){
          loadDistricts($("#county").val());
          saveProfileValueCounties();
        })
      }
  })
}

function loadDistricts(stateCounties,stateCountyDistricts){
    $.getJSON('json/school_districts.json', function(response){
      districtsHTML = '<select multiple="multiple">';
      if(stateCounties){
          $.each(stateCounties, function(key,stateCounty){
            $.each(response[stateCounty.split(",")[0]][stateCounty.split(",")[1]], function (key,val){
              districtsHTML += '<option value="'+stateCounty+','+val+'">'+val+'</option>';
            })
          })
      }

      districtsHTML += '</select>';
      $("#district").html(districtsHTML);

      if(stateCountyDistricts){
        $("#district").val(stateCountyDistricts);
      }

      var mq = window.matchMedia('only screen and (min-device-width: 320px) and (max-device-width: 1024px)');
      if(!mq.matches) {
          $("#district").multiselect({
            width: '200',
            buttonWidth: '300',
            maxHeight: '200',
            numberDisplayed: 1,
            nSelectedText: 'Selected',
            includeSelectAllOption: true,
            onDropdownHide: function(event) {
              saveProfileValueDistricts();
            },
          });
          $("#district").multiselect("rebuild");
      }
      else{
         $("#district").change(function(){
            saveProfileValueDistricts();
         })
      }
    })  
}



function setCountyDistrict(stateCountyDistrict,location){

    $.getJSON('json/school_districts.json', function(response){
      allCountyDistricts = response;
   

      districtsHTML = '<select><option disabled>-</option>';
      countyDistrict = stateCountyDistrict.split(',');
      selectDiv = $("#"+location+ " select");
      $.each(allCountyDistricts[countyDistrict[0]][countyDistrict[1]], function (key,val){
        if(val.indexOf(countyDistrict[2])<0){
          districtsHTML += '<option>'+val+'</option>';
        }
        else{
          districtsHTML += '<option selected="selected">'+val+'</option>';
        }
      })
      districtsHTML += '</select>';
      $(selectDiv[0]).val(countyDistrict[0]);
      $(selectDiv[2]).html(districtsHTML);
      loadCounties($(selectDiv[1]),countyDistrict[0],countyDistrict[1]);
    })

  
}

function getPriorityRanking(){
  var priorityRanking = '';
  $('#priorityTable tr').each(function(key,val) {
      if(key == 0){
        priorityRanking = $(this).find(".prefName").html();    
      }
      else{
       priorityRanking +=";" + $(this).find(".prefName").html();  
      }
   });
  return priorityRanking;
}

function setPriorityRanking(priorityRank){
  priorityRankArray = priorityRank.split(';');
  $('#priorityTable tr').each(function(key,val) {
      $(this).find(".prefName").html(priorityRankArray[key]);  
   });
}

function initializeValues(){
  loadStates();
  loadCounties();
  loadDistricts();
  loadUsername();
}


function loadUsername(){
    $.getJSON("/rest/member/getLoggedInUserInfo",function(userData){
        
        data = userData.statements;

        $("#accountName").html(data.fn + "'s Account<span class='caret'></span>");
        $("#occupation").val(data.occupation);
        if(data.occupation){
          $("#occupationLabel").css("color","white");
        }
        else{
          $("#occupationLabel").css("color","red");
        }
        $("#education").val(data.education);
        if(data.education){
          $("#educationLabel").css("color","white");
        }
        else{
          $("#educationLabel").css("color","red");
        }
        $("#maritalStatus").val(data.maritalStatus); 
        if(data.maritalStatus){
          $("#maritalStatusLabel").css("color","white");
        }
        else{
          $("#maritalStatusLabel").css("color","red");
        }
        if(data.maritalStatus == 'Married'){
          $("#spouseEmailDiv").show();
        }
        $("#gender").val(data.gender); 
        if(data.gender){
          $("#genderLabel").css("color","white");
        }
        else{
          $("#genderLabel").css("color","red");
        }
        $("#ageRange").val(data.ageRange); 
        if(data.ageRange){
          $("#ageRangeLabel").css("color","white");
        }
        else{
          $("#ageRangeLabel").css("color","red");
        }
        if(data.personHasPrimaryChurchOrg){
          loadChurchOrgs(data.personHasPrimaryChurchOrg,data.churchOrgs);
          $("#primaryChurchOrg").val(data.personHasPrimaryChurchOrg);
          $("#primaryChurchOrgLabel").css("color","white");
        }
        else{
          $("#primaryChurchOrgLabel").css("color","red");
        }
        if(data.personAdminForChurchOrg){
          $("#primaryChurchOrg").prop('disabled',true);
          $("#primaryChurchOrgLabel").text("(Admins cannot change this field) Change your home church affiliation.");
        }
        if(data.spouseEmail){
            $("#spouseEmail").val(data.spouseEmail);
            $("#spouseEmailDiv").show();
        }
        if(data.hasSpouse){
            $("#spouseConfirm").html("Spouse Account Succesfully Linked!");
            $("#spouseConfirm").css("color","white");
        }
        else{
           $("#spouseConfirm").css("color","red");
        }
        if(data.kidGenderAgeGroup){
            setKidGenderAgeGroup(data.kidGenderAgeGroup); 
        }
        if(data.meetingDayTime1){
            $("#meetingTimeLabel").css("color","white");
            $('#meetingDayTime1').prop('disabled',false)
            meetingDayTimeArray = data.meetingDayTime1.split(',');
            $("#meetingDay1").val(meetingDayTimeArray[0]);
            $("#meetingDayTime1").val(meetingDayTimeArray[1]);
        }
        else{
          $("#meetingTimeLabel").css("color","red");
        }
        if(data.meetingDayTime2){
            $("#meetingTimeLabel").css("color","white");
            $('#meetingDayTime2').prop('disabled',false)
            meetingDayTimeArray = data.meetingDayTime2.split(',');
            $("#meetingDay2").val(meetingDayTimeArray[0]);
            $("#meetingDayTime2").val(meetingDayTimeArray[1]);
        }
        if(data.meetingDayTime3){
            $("#meetingTimeLabel").css("color","white");
            $('#meetingDayTime3').prop('disabled',false)
            meetingDayTimeArray = data.meetingDayTime3.split(',');
            $("#meetingDay3").val(meetingDayTimeArray[0]);
            $("#meetingDayTime3").val(meetingDayTimeArray[1]);
        }
        if(data.desiredDynamicSpiritual){
          $("[name='desiredDynamicSpiritual'][value='"+data.desiredDynamicSpiritual+"']").parent().addClass("active");
        }
        if(data.desiredDynamicInterests){
          $("[name='desiredDynamicInterests'][value='"+data.desiredDynamicInterests+"']").parent().addClass("active");
        }
        if(data.desiredDynamicFamily){
          $("[name='desiredDynamicFamily'][value='"+data.desiredDynamicFamily+"']").parent().addClass("active");
        }

        if(data.states){
          loadStates(data.states);
          $("#stateLabel").css("color","white");
          if(data.stateCounties){
            loadCounties(data.states,data.stateCounties);
            $("#countyLabel").css("color","white");
            if(data.stateCountyDistricts){
              loadDistricts(data.stateCounties,data.stateCountyDistricts)
              $("#districtLabel").css("color","white");
            }
            else{
              loadDistricts(data.stateCounties);
              $("#districtLabel").css("color","red");
            }
          }
          else{
            $("#countyLabel").css("color","red");
            loadCounties(data.states);
            loadDistricts();
          }
        }
        else{
            $("#stateLabel").css("color","red");
            loadStates();
            loadCounties();
            loadDistricts();
        }
        if(data.priorityRank){
            setPriorityRanking(data.priorityRank);
        }
        $("#favoriteSubject").val(data.favoriteSubject);
        if(data.favoriteSubject){
          $("#favoriteSubjectLabel").css("color","white");
        }
        else{
          $("#favoriteSubjectLabel").css("color","red");
        }
        $("#favoriteMusic").val(data.favoriteMusic);
        if(data.favoriteMusic){
          $("#favoriteMusicLabel").css("color","white");
        }
        else{
          $("#favoriteMusicLabel").css("color","red");
        }
        $("#favoriteMovie").val(data.favoriteMovie);
        if(data.favoriteMovie){
          $("#favoriteMovieLabel").css("color","white");
        }
        else{
          $("#favoriteMovieLabel").css("color","red");
        }
        
        $("#favoriteSeason").val(data.favoriteSeason);
        if(data.favoriteSeason){
          $("#favoriteSeasonLabel").css("color","white");
        }
        else{
          $("#favoriteSeasonLabel").css("color","red");
        }

        if(data.outdoorIndoor || data.petsNoPets || data.booksMovies || data.crowdQuietTime || data.detailsBigPicture
          || data.planItDoIt){
          $("#oneOrOtherLabel").css("color","white");
        }
        else{
          $("#oneOrOtherLabel").css("color","red");
        }

        if(data.outdoorIndoor){
          $("[name='outdoorIndoor'][value='"+data.outdoorIndoor+"']").parent().addClass("active");
        }

        if(data.petsNoPets){
          $("[name='petsNoPets'][value='"+data.petsNoPets+"']").parent().addClass("active");
        }   
        if(data.booksMovies){
          $("[name='booksMovies'][value='"+data.booksMovies+"']").parent().addClass("active");
        }   
        if(data.crowdQuietTime){
          $("[name='crowdQuietTime'][value='"+data.crowdQuietTime+"']").parent().addClass("active");
        }  
        if(data.detailsBigPicture){
          $("[name='detailsBigPicture'][value='"+data.detailsBigPicture+"']").parent().addClass("active");
        }  
        if(data.planItDoIt){
          $("[name='planItDoIt'][value='"+data.planItDoIt+"']").parent().addClass("active");
        }
        $("#hobbyLabel").css("color","red");
        if(data.hobbyMusicLover){
           $("input:checkbox[value=hobbyMusicLover]").prop("checked", data.hobbyMusicLover === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbyStressRelief){
           $("input:checkbox[value=hobbyStressRelief]").prop("checked", data.hobbyStressRelief === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbyKidsFamily){
           $("input:checkbox[value=hobbyKidsFamily]").prop("checked", data.hobbyKidsFamily === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbySportsFitness){
           $("input:checkbox[value=hobbySportsFitness]").prop("checked", data.hobbySportsFitness === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbyOutdoors){
           $("input:checkbox[value=hobbyOutdoors]").prop("checked", data.hobbyOutdoors === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbySharpenTheMind){
           $("input:checkbox[value=hobbySharpenTheMind]").prop("checked", data.hobbySharpenTheMind === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbyCraftersArtists){
           $("input:checkbox[value=hobbyCraftersArtists]").prop("checked", data.hobbyCraftersArtists === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbyHistoryBuffs){
           $("input:checkbox[value=hobbyHistoryBuffs]").prop("checked", data.hobbyHistoryBuffs === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbyScienceAndNature){
           $("input:checkbox[value=hobbyScienceAndNature]").prop("checked", data.hobbyScienceAndNature === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbyAdventureSeekers){
           $("input:checkbox[value=hobbyAdventureSeekers]").prop("checked", data.hobbyAdventureSeekers === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbySocial){
           $("input:checkbox[value=hobbySocial]").prop("checked", data.hobbySocial === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbyEntrepreneur){
           $("input:checkbox[value=hobbyEntrepreneur]").prop("checked", data.hobbyEntrepreneur === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbyMotorsports){
           $("input:checkbox[value=hobbyMotorsports]").prop("checked", data.hobbyMotorsports === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.hobbyCollectors){
           $("input:checkbox[value=hobbyCollectors]").prop("checked", data.hobbyCollectors === "true");
           $("#hobbyLabel").css("color","white");
        }
        if(data.groupType){
          $("#groupTypeLabel").css("color","white");
          $("#groupType").val(data.groupType.split(','));
        }
        else{
          $("#groupTypeLabel").css("color","red");
        }
        if(data.groupMix){
          $("#groupMixLabel").css("color","white");
          $("#groupMix").val(data.groupMix.split(','));
        }
        else{
          $("#groupMixLabel").css("color","red");
        }
        if(data.growthAreas){
          $("#growthAreasLabel").css("color","white");
          $("#growthAreas").val(data.growthAreas.split(','));
        }
        else{
          $("#growthAreasLabel").css("color","red");
        }
        if(data.hasCompletedSurvey && data.hasCompletedSurvey.indexOf("spiritualGifts")>=0){
          $("#spiritualGifts").css("color","white");
          $("#spiritualGifts").text("Retake Spiritual Gifts Survey");
          if(data.spiritualGifts.length > 0){
            spiritGiftsHTML = "<ul>";
            spiritGiftsList = data.spiritualGifts.split(',');
            $.each(spiritGiftsList, function(key,spiritGift){
              spiritGiftsHTML+="<li>"+spiritGift+"</li>";
            })
     
            $("#spiritualGiftsListed").html(spiritGiftsHTML+"</ul>");
          }
          else{
            $("#spiritualGiftsListed").html("None");
          }
        }
        else{
          $("#spiritualGifts").css("color","red");
        }  
        $("#spiritualJourney").val(data.spiritualJourney);
        if(data.spiritualJourney){
          $("#spiritualJourneyLabel").css("color","white");
        }
        else{
          $("#spiritualJourneyLabel").css("color","red");
        }
        var mq = window.matchMedia('only screen and (min-device-width: 320px) and (max-device-width: 1024px)');
        if(!mq.matches) {
            $('#groupType').multiselect({
            buttonWidth: '200px',
            maxHeight: '200',
            onDropdownHide: function(event) {
              if($('#groupType').val()){
                  saveProfileValue($('#groupType').attr('id'),$('#groupType').val().toString());
                  $("#groupTypeLabel").css("color","white"); 
              }
              else{
                  saveProfileValue($('#groupType').attr('id'),""); 
                  $("#groupTypeLabel").css("color","red"); 
              }
            },
          });
            $('#groupMix').multiselect({
            buttonWidth: '200px',
            maxHeight: '200',
            onDropdownHide: function(event) {
              if($('#groupMix').val()){
                  saveProfileValue($('#groupMix').attr('id'),$('#groupMix').val().toString());
                  $("#groupMixLabel").css("color","white");
              }
              else{
                  saveProfileValue($('#groupMix').attr('id'),""); 
                  $("#groupMixLabel").css("color","red");
              }
            },
          });

          $('#growthAreas').multiselect({
            buttonWidth: '200px',
            maxHeight: '200',
            onDropdownHide: function(event) {
              if($('#growthAreas').val()){
                  saveProfileValue($('#growthAreas').attr('id'),$('#growthAreas').val().toString());
                  $("#growthAreasLabel").css("color","white");
              }
              else{
                  saveProfileValue($('#growthAreas').attr('id'),""); 
                  $("#growthAreasLabel").css("color","red");
              }
            },
          });
        } 
        else {
          $("#growthAreas").change(function(){
            if($('#growthAreas').val()){
                saveProfileValue($('#growthAreas').attr('id'),$('#growthAreas').val().toString());
                $("#growthAreasLabel").css("color","white");
            }
            else{
                saveProfileValue($('#growthAreas').attr('id'),""); 
                $("#growthAreasLabel").css("color","red");
            }
          })
          $("#groupMix").change(function(){
            if($('#groupMix').val()){
                saveProfileValue($('#groupMix').attr('id'),$('#groupMix').val().toString());
                $("#groupMixLabel").css("color","white");
            }
            else{
                saveProfileValue($('#groupMix').attr('id'),""); 
                $("#groupMixLabel").css("color","red");
            }
          })
          $("#groupType").change(function(){
           if($('#groupType').val()){
                saveProfileValue($('#groupType').attr('id'),$('#groupType').val().toString());
                $("#groupTypeLabel").css("color","white"); 
            }
            else{
                saveProfileValue($('#groupType').attr('id'),""); 
                $("#groupTypeLabel").css("color","red"); 
            }
          })
        }

        
        $("#alertFrequency").val(data.alertFrequency); 
        if(data.alertFrequency){
          $("#alertFrequencyLabel").css("color","white");
        }
        else{
          $("#alertFrequencyLabel").css("color","red");
        }

        $("#beenOnMissions").val(data.beenOnMissions); 
        if(data.beenOnMissions){
          $("#beenOnMissionsLabel").css("color","white");
        }
        else{
          $("#beenOnMissionsLabel").css("color","red");
        }
        $("#wantsMissions").val(data.wantsMissions); 
        if(data.wantsMissions){
          $("#wantsMissionsLabel").css("color","white");
        }
        else{
          $("#wantsMissionsLabel").css("color","red");
        }
        if(data.profileCompleted){
          setProgressBarValue(data.profilePercentCompleted,true); 
          $("#submit").css("color","blue");
        }
        else{
          if(data.profilePercentCompleted){
            setProgressBarValue(data.profilePercentCompleted,false); 
          }
          else{
           setProgressBarValue("0",false);  
          }
          $("#submit").css("color","red");
          $("#progress-bar").css("background-color","red");
        }
        
    })
}


function changeProgressBar(predictionsUpdated,cheatValue){
  complete = 0;
  total = 0;
    if(cheatValue){
      complete+= cheatValue;
    }

  if($("#maritalStatus").val()){
    complete += 1;
  }
  total +=1;
  if($("#ageRange").val()){
    complete += 1;
  }
  total +=1;
  if($("#primaryChurchOrg").val()){
    complete += 1;
  }
  total +=1;
  if($("#secondaryChurchOrgs").val()){
    complete += 1;
  }
  total +=1;
  if($("#gender").val()){
    complete += 1;
  }
  total +=1;
  if($("#occupation").val()){
    complete += 1;
  }
  total +=1;
  if($("#education").val()){
    complete += 1;
  }
  total +=1;
  if($(".meetingTime").val()){
    complete += 1;
  }
  total +=1;

  if(!(($("#stateCountyDistrict1").val() == null) && 
    ($("#stateCountyDistrict2").val() == null) &&
    ($("#stateCountyDistrict3").val() == null))){
    complete += 1;
  }
  total +=1;
  if($("#favoriteSubject").val()){
    complete += 1;
  }
  total +=1;
  if($("#favoriteMusic").val()){
    complete += 1;
  }
  total +=1;
  if($("#favoriteMovie").val()){
    complete += 1;
  }
  total +=1;
  if($("#favoriteSeason").val()){
    complete += 1;
  }
  total +=1;
  if($("#spiritualGiftsListed").html().length>0){
    complete += 1;
  }

  total +=1;
  complete += $('#oneOrOther .active').length;
  total +=6;

  hobbyCompleted = false;
  $('.hobby').each(function () {
      if(this.checked){
        hobbyCompleted = true;
      }
  });
  if(hobbyCompleted){
    complete += 1;
  }
  total+=1;
  if($("#groupType").val()){
    complete+= 1;
  };
  total+=1;
  if($("#groupMix").val()){
    complete+= 1;
  };
  total+=1;
  if($("#growthAreas").val()){
    complete+= 1;
  };
  total+=1;
  if($("#spiritualJourney").val()){
    complete+= 1;
  };
  total+=1;
  if($("#beenOnMissions").val()){
    complete += 1;
  }
  total +=1;
  if($("#wantsMissions").val()){
    complete += 1;
  }
  total +=1;

  number = Math.round(complete/total*100);
  setProgressBarValue(number,predictionsUpdated);
  return number;
}

function setProgressBarValue(number,predictionsUpdated){
  
  $("#progress-bar").attr('aria-valuenow', number).css("width", ""+number+"%");
  if(predictionsUpdated){
    $("#progress-bar").text(""+number+"%");
  }
  else{
    $("#progress-bar").text(""+number+"% Submit Update");
    $("#progress-bar").css("background-color","red");
  }

}

function loadChurchOrgs(primaryChurchOrg,churchOrgs){
      $.getJSON('/rest/member/listChurchOrgs', function(data){
        orgHTML = '';
        $.each(data.statements, function (key,val){
          if(val.id != primaryChurchOrg.id){
            orgHTML += '<option value="'+val.id+'">'+val.orgName+'</option>'; 
          }
        })
        $('#primaryChurchOrg').html('<option value="'+primaryChurchOrg.id+'">'+primaryChurchOrg.orgName+'</option>'+orgHTML);
        $('#secondaryChurchOrgs').html(orgHTML);
        if(churchOrgs){
          $("#secondaryChurchOrgs").val(churchOrgs);
          $("#churchOrgLabel").css("color","white");
        }
        $('#secondaryChurchOrgs').multiselect({
          maxHeight: '200',
          buttonWidth: '300',
          numberDisplayed: 1,
          nSelectedText: 'Selected',
          onDropdownHide: function(event) {
            if($('#secondaryChurchOrgs').val()){
              churchOrgs = "";
                for(var i=0;i<$('#secondaryChurchOrgs').val().length;i++){
                  if(i == 0){
                    churchOrgs = $('#secondaryChurchOrgs').val()[i];
                  }
                  else{
                    churchOrgs += ';'+$('#secondaryChurchOrgs').val()[i];
                  }
                }
                saveProfileValue($('#secondaryChurchOrgs').attr('id'),churchOrgs);
                $("#churchOrgLabel").css("color","white");
            }
            else{
                saveProfileValue($('#secondaryChurchOrgs').attr('id'),""); 
                $("#churchOrgLabel").css("color","red");
            }
          },
        });
    })
}

function loadSecondaryChurchOrgs(primaryChurchOrg){
      $.getJSON('/rest/member/listChurchOrgs', function(data){
        orgHTML = '';
        $.each(data.statements, function (key,val){
          if(val.orgName != primaryChurchOrg){
            orgHTML += '<option value="'+val.id+'">'+val.orgName+'</option>'; 
          }
        })
        $('#secondaryChurchOrgs').html(orgHTML);
        $('#secondaryChurchOrgs').multiselect('destroy');
        $('#secondaryChurchOrgs').multiselect({
          maxHeight: '200',
          numberDisplayed: 1,
          nSelectedText: 'Selected',
          onDropdownHide: function(event) {
            if($('#secondaryChurchOrgs').val()){
                churchOrgs = "";
                for(var i=0;i<$('#secondaryChurchOrgs').val().length;i++){
                  if(i == 0){
                    churchOrgs = $('#secondaryChurchOrgs').val()[i];
                  }
                  else{
                    churchOrgs += ';'+$('#secondaryChurchOrgs').val()[i];
                  }
                }
                saveProfileValue($('#secondaryChurchOrgs').attr('id'),churchOrgs);
                $("#churchOrgLabel").css("color","white");
            }
            else{
                saveProfileValue($('#secondaryChurchOrgs').attr('id'),""); 
                $("#churchOrgLabel").css("color","red");
            }
          },
        });
    })
}