//write a function that returns a random integer b/w 1 and 4
/*What I still need to do 
//1. get timers to flash appropriate amount of time (DONE) 
//2. add sound (DONE)
//2.5 count display (WORKING VERSION DONE)
//2.75 disable clicking during play sequence (DONE)
//3. make on/off/start/buttons work
//3.5 make game stop at 20
//4. strict mode
Bonus
//0. add buzzer sound for wrong answer
//1. time limit for guess
//2. speed up instructions on 5th, 9th, 13th steps
//3. high score
//4. lives?
*/


$(document).ready(function(){



var userProgressCount = 0;
var playBackCount = 0;
var arrColors = [];
var numberOfTimesToRun = 0;
var displayCount = 0;
var stillRunning;
// incrementDisplayCount();
// generateSequence();

$(".off").on("click",function(){
  off();
})

$(".on").on("click",function(){
  on();
})


function off(){
  $(".off").css("background", "#6495ed");
  $(".on").css("background", "#222");
  $(".strict-light").css("background", "#222");
  $(".start-button").unbind();
  $(".count-display").text("");
  // clearTimeout(stillRunning);
}

function on(){
  $(".on").css("background", "#6495ed");
  $(".off").css("background", "#222");
  $(".count-display").text("--");
  $(".start-button").on("click", function(){
    setTimeout(function(){
      displayCount = 0;
      userProgressCount = 0;
      playBackCount = 0;
      numberOfTimesToRun = 0;
      incrementDisplayCount();
      generateSequence();
    },0)
  });
}

function incrementDisplayCount(){
  displayCount++;
  $(".count-display").text(displayCount);
}

//event handlers for mousedown, mouseup
function userInput(){
  console.log("what I need to click", arrColors.slice(0,playBackCount -1))
  $(".bttn").unbind("click").on("click", function(e){
    // e.stopPropagation();
    buttonPress($(this));
    // console.log($(this), e.target, this.className.split(" ")[0]);
    userProgressCount++;
    console.log("You clicked: ", userProgressCount, "times");
    validate(this.className.split(" ")[0]);
  })
}

function validate(pressedButton) {
  console.log("User Progress Count: ", userProgressCount, "Play Back Count: ", playBackCount);
  // console.log("User Progress Count: ", userProgressCount, "Play Back Count: ", playBackCount, "Array of Colors: ", arrColors);
  if (userProgressCount === playBackCount - 1 && pressedButton === arrColors[userProgressCount - 1].slice(1)) {
    console.log("guessed everything correctly");
    numberOfTimesToRun++;
    setTimeout(function(){
      incrementDisplayCount();
    }, 750)
    setTimeout(function(){
      playCurrentSequenceSoFar();
    },1000)
  } 
  else if (pressedButton === arrColors[userProgressCount - 1].slice(1)) { //if correct but not finished
    // userInput();
  } else {
    userProgressCount--;
    setTimeout(function(){
      playCurrentSequenceSoFar();
    },1000)
  }
}

//show button press for entire sequence
function playCurrentSequenceSoFar(){
  console.log("this is the whole sequence", arrColors);
  playBackCount = 1;
  function inner(buttonColor){
    console.log("this is the current color", buttonColor);
    // if (playBackCount > 20) {
      // $(".count-display").text("You Win!");
      // return generateSequence();
    // }
    if (playBackCount > numberOfTimesToRun + 1) {
      console.log("return here");
      userProgressCount = 0;
      console.log("User progress count: ", userProgressCount);
      numberOfTimesToRun = playBackCount - 2; 
      // playBackCount = 0;
      return userInput();
    }
    buttonPress(buttonColor); 
    playBackCount++;
    setTimeout(function(){
      inner(arrColors[playBackCount-1])
    },1000)
  }
  $(".bttn").unbind("click") //prevents me from clicking buttons while sequence is played
  inner(arrColors[playBackCount-1]);
}

/*
function buttonPress(color) {
  console.log("This color comes into button press", color);
  $(color).css("opacity", 1)
  setTimeout(function(){
    $(color).css("opacity", .75);  
  }, 500);
}*/

function buttonPress(color) {
  if ($(color).is(".red-button")|| color === ".red-button") {
    // console.log("hits red");
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    audio.play();
  } else if ($(color).is(".green-button")|| color === ".green-button") {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    audio.play();
  } else if ($(color).is(".blue-button")|| color === ".blue-button") {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    audio.play();
  } else {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
    audio.play();
  }
  console.log("This color comes into button press", color);
  $(color).css("opacity", 1)
  setTimeout(function(){
    $(color).css("opacity", .75);  
  }, 500);
}


function generateSequence(){
  var arr = [];
  for (var i = 0; i < 20; i++) {
    arr.push(Math.ceil(Math.random() * 4));
  }
  return convertNumsToColor(arr);
}

function convertNumsToColor(sequenceOfNums){
  arrColors = [];
  for (var i = 0; i < sequenceOfNums.length; i++){
    switch (sequenceOfNums[i]){
      case 1:
        arrColors.push(".red-button")
        break;
      case 2:
        arrColors.push(".green-button")
        break;
      case 3:
        arrColors.push(".blue-button")
        break;
      default:
        arrColors.push(".yellow-button")
    }
  }
  $(".bob").html(arrColors);
  playCurrentSequenceSoFar(arrColors);
}
// console.log(generateSequence());

}); // document.ready 


