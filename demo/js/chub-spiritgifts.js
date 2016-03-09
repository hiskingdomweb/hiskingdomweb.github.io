$(document).ready(function(){
    document.getElementById("surveyForm").reset();
    loadQuestions("spiritualGifts");
    loadUsername();
});

function loadUsername(){
    $.getJSON("/rest/member/getLoggedInUserInfo",function(userData){
        data = userData.statements;
        $("#accountName").html(data.fn + "'s Account<span class='caret'></span>");
    })
}

function submitSurvey() {
    var letters = '';
    $('input[class="boolean"]:checked', '#surveyForm').each(function(key,val){
            if(key==0){
                letters = val.name;
            }
            else{
                letters = letters + ',' + val.name;
            }
    })
    $.getJSON("/rest/member/submitSpiritualSurvey?letters="+letters,function(data){
        window.location.assign("transform.html#spiritGifts");
    }) 
    $("#takeSurveyDiv").html("Survey Saving... Please wait a moment.");
}

function loadQuestions(surveyName){
    var questiontable;
    $("#surveyName").val(surveyName);
    $.getJSON("/rest/member/getSurveyInfo?name="+surveyName,function(data){
        $("#takeSurveyDiv").html("");
        $.each(data.statements.questions, function (key,val) {
            if(val.type == 'boolean'){
                newQ = '<input type="checkbox" class="boolean" name="'+val.category+'" value="'+val.qId+'">'
                //+val.qText+' <a tabindex="0" id="'+val.qId+'">Scripture</a></label>';
                +val.qText+' <font color="blue">('+val.scripture+')</font><br>';
                $("#takeSurveyDiv").append(newQ);
                /*
                $('#'+val.qId).popover({
                    toggle:'popover',
                    title:'Quote',
                    content:val.scripture,
                    html:'True',
                    trigger:'focus'
                });*/
            }
            
        })
        
        button = '<button  type="button" id="surveySubmit"'+
            ' onclick="submitSurvey()" class="btn">Save Survey</button>';
        $("#takeSurveyDiv").append(button);
        

    })
}