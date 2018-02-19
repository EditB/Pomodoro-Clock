$(document).ready(function(){
  
  var sessionMin = 25;
  var restMin = 5;
  var restMode = false;
  var tickingMode = false;
  var countdownSeconds = sessionMin * 60;  
  var counter;
  var sessionString = "Session";
  var tomatoLength = 280;
  var percentageUnit = tomatoLength/countdownSeconds;
  var percentage = percentageUnit;
  var displayColor = "#f92707";
  
  
  $('#sessionMinutes').html(sessionMin);
  $('#restMinutes').html(restMin); 
  $('#clockSession').html(sessionString);
  $('#clockSession').css("color", displayColor);
  $('#mainClock').html(sessionMin);
  $('#mainClock').css("color", displayColor);
  
  $('#sessionMinus').on('click', function(){
    if (sessionMin > 1){
      sessionMin -= 1;  
    }
    $('#sessionMinutes').html(sessionMin);
    if (!restMode){
      countdownSeconds = sessionMin * 60;
      displayColor = "#f92707";
      $('#mainClock').css("color", displayColor);
      $('#clockSession').css("color", displayColor);
      percentageUnit = tomatoLength/countdownSeconds;
      percentage = percentageUnit;
      $('#mainClock').html(sessionMin);
    }
    
  });
  
  $('#sessionPlus').on('click', function(){
    sessionMin += 1;
    $('#sessionMinutes').html(sessionMin);
    if (!restMode){
      countdownSeconds = sessionMin * 60;
      displayColor = "#f92707";
      $('#mainClock').css("color", displayColor);
      $('#clockSession').css("color", displayColor);
      percentageUnit = tomatoLength/countdownSeconds;
      percentage = percentageUnit;
      $('#mainClock').html(sessionMin);
    }

  });
  
  $('#restMinus').on('click', function(){
    if (restMin > 1){
      restMin -= 1;
    }
    $('#restMinutes').html(restMin);
    if (restMode){
      countdownSeconds = restMin * 60;
      displayColor = "#121499";
      $('#mainClock').css("color", displayColor);
      $('#clockSession').css("color", displayColor);
      percentageUnit = tomatoLength/countdownSeconds;
      percentage = percentageUnit;
      $('#mainClock').html(restMin);
    }
  })

  $('#restPlus').on('click', function(){
    restMin += 1;
    $('#restMinutes').html(restMin);
    if (restMode){
      countdownSeconds = restMin * 60;
      displayColor = "#121499";
      $('#mainClock').css("color", displayColor);
      $('#clockSession').css("color", displayColor);
      percentageUnit = tomatoLength/countdownSeconds;
      percentage = percentageUnit;
      $('#mainClock').html(restMin);
    }
  });
  
 $('#mainClockRow').on('click', function(){
     
   if (tickingMode){
     tickingMode=false;
     clearInterval(counter);
   }
   else{
     tickingMode = true;
     counter = setInterval(function(){
       if (countdownSeconds > 0){
          countdownSeconds = setTimer(countdownSeconds);
         document.getElementById('mainClock').innerHTML = displayTime(countdownSeconds);
         $('#tomato').css("width", percentage + "px");
        $('#tomato').css("background", displayColor); 
         percentage += percentageUnit;
       }
       else{
         //need to change the mode
         if (restMode){
           restMode = false;
           sessionString = "Session";
           displayColor = "#f92707";
           $('#mainClock').css("color", displayColor);
           $('#clockSession').css("color", displayColor);
           countdownSeconds = sessionMin * 60;
           percentageUnit = tomatoLength/countdownSeconds;
           percentage = percentageUnit;
         }
         else{
           restMode = true;
           sessionString = "Rest";
           displayColor = "#121499";
           $('#mainClock').css("color", displayColor);
           $('#clockSession').css("color", displayColor);
           countdownSeconds = restMin * 60;
           percentageUnit = tomatoLength/countdownSeconds;
           percentage = percentageUnit;
         }
         $('#clockSession').html(sessionString);
       }
     }, 1000);
   }
 }); 
  
});

function setTimer(seconds){
  return seconds - 1;  
}

function displayTime(sec){
  var hour = 0;

  if ((sec/3600) > 1){
    hour = Math.floor(sec/3600);  
  }
  
  var min = Math.floor((sec - (hour * 3600))/60);
  var seconds = sec - ((hour*3600) + (min * 60));
  
  return (extraZero(hour) + ' : ' + extraZero(min) + ' : ' + extraZero(seconds));
}

function extraZero(num){
  returnVal = "";
  if (num < 10){
    returnVal = "0" + num; 
  }
  else{
    returnVal = num;
  }
  return returnVal;
}