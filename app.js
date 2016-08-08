//write a function that returns a random integer b/w 1 and 4
/*What I still need to do 
//1. get timers to flash appropriate amount of time (DONE) 
//2. add sound (DONE)
//2.5 count display (WORKING VERSION DONE)
//2.75 disable clicking during play sequence (DONE)
//3. make on/off/start/buttons work (DONE)
//3.5 make game stop at 20 and start new one (DONE)
//4. strict mode (DONE!)
Bonus
//0. add buzzer sound for wrong answer (DONE)
//1. time limit for guess (DONE)
//2. speed up instructions on 5th, 9th, 13th steps //can use allTheGlobals.numberOfTimesToRun + 1 === whatever (DONE)
//3. high score (DONE)
//4. put global variables in object (DONE)
//5. lives?
//6. dynamically generate the array by adding 1 element at a time?
*/


$(document).ready(function(){

var allTheGlobals = {
  userProgressCount: 0,
  playBackCount: 0,
  arrColors: [],
  numberOfTimesToRun: 0,
  displayCount: 0,
  stop: false,
  strict: false,
  noBuzzerIfPressStart: false,
  highScore: 0,
  hasStartedOnce: false
}

// var userProgressCount = 0;
// var playBackCount = 0;
// var arrColors = [];
// var numberOfTimesToRun = 0;
// var displayCount = 0;
// var stop = false;
// var strict = false;
// var noBuzzerIfPressStart = false;
// var highScore = 0;
// var hasStartedOnce = false;
// incrementDisplayCount();
// generateSequence();

$(".off").on("click",function(){
  off();
})

$(".on").unbind().on("click",function(){
  on();
})


function off(){
  $(".off").css("background", "#6495ed");
  $(".on").css("background", "#222");
  $(".strict-light").css("background", "#222");
  $(".start-button").unbind();
  $(".strict-button").unbind();
  $(".count-display").text("");
  $(".bttn").unbind();
  allTheGlobals.stop = true;
  allTheGlobals.strict = false;
  allTheGlobals.hasStartedOnce = false;
  // clearTimeout(stillRunning);
}

function on(){
  $(".on").css("background", "#6495ed");
  $(".off").css("background", "#222");
  console.log("allTheGlobals.hasStartedOnce is: ", allTheGlobals.hasStartedOnce)
  if (!allTheGlobals.hasStartedOnce) {
    $(".count-display").text("--");
  }
  $(".strict-button").unbind().on("click", function(){
      setTimeout(function(){
        toggleStrict();
      },0)
    }) //why did it require me to put this button before start in the function?
  $(".start-button").unbind().on("click", function(){
    setTimeout(function(){
      allTheGlobals.noBuzzerIfPressStart = true;
      newGame();
    },0)
  });
}

function newGame(){
  allTheGlobals.hasStartedOnce = true;
  allTheGlobals.stop = false;
  allTheGlobals.displayCount = 0;
  allTheGlobals.userProgressCount = 0;
  allTheGlobals.playBackCount = 0;
  allTheGlobals.numberOfTimesToRun = 0;
  incrementDisplayCount();
  generateSequence();
}

function incrementDisplayCount(){
  allTheGlobals.displayCount++;
  $(".count-display").text(allTheGlobals.displayCount);
}

//event handlers for mousedown, mouseup
function userInput(){
  allTheGlobals.noBuzzerIfPressStart = false;
  var theBuzzer = setTimeout(function(){
    playBuzzer();
    if (allTheGlobals.strict) {
      return setTimeout(function(){
        newGame();
      },3000)
    } else {
      setTimeout(function(){
      playCurrentSequenceSoFar();
    },3000)
    }
  },5000)
  console.log("allTheGlobals.stop is: ", allTheGlobals.stop, "allTheGlobals.noBuzzerIfPressStart is: ", allTheGlobals.noBuzzerIfPressStart);
  setTimeout(function(){
      if (allTheGlobals.stop || allTheGlobals.noBuzzerIfPressStart) {
        clearTimeout(theBuzzer);
      }
    },4999)
  console.log("what I need to click", allTheGlobals.arrColors.slice(0,allTheGlobals.playBackCount -1))
  $(".bttn").unbind("click").on("click", function(e){
    clearTimeout(theBuzzer);
    // e.stopPropagation();
    buttonPress($(this));
    // console.log($(this), e.target, this.className.split(" ")[0]);
    allTheGlobals.userProgressCount++;
    console.log("You clicked: ", allTheGlobals.userProgressCount, "times");
    validate(this.className.split(" ")[0]);
  })
}

function validate(pressedButton) {
  console.log("User Progress Count: ", allTheGlobals.userProgressCount, "Play Back Count: ", allTheGlobals.playBackCount);
  // console.log("User Progress Count: ", allTheGlobals.userProgressCount, "Play Back Count: ", allTheGlobals.playBackCount, "Array of Colors: ", allTheGlobals.arrColors);
  if (allTheGlobals.userProgressCount === allTheGlobals.playBackCount - 1 && pressedButton === allTheGlobals.arrColors[allTheGlobals.userProgressCount - 1].slice(1)) {
    console.log("guessed everything correctly");
    checkForHighScore();
    if (allTheGlobals.userProgressCount === 20) {
      $(".count-display").text("Win!");
      return setTimeout(function(){
        newGame();
      },1000)
    }
    allTheGlobals.numberOfTimesToRun++;
    setTimeout(function(){
      incrementDisplayCount();
    }, 750)
    setTimeout(function(){
      playCurrentSequenceSoFar();
    },1000)
  } 
  else if (pressedButton === allTheGlobals.arrColors[allTheGlobals.userProgressCount - 1].slice(1)) { //if correct but not finished
    checkForHighScore();
    userInput();
  } else {
    playBuzzer();
    if (allTheGlobals.strict) {
      return setTimeout(function(){
        newGame();
      },3000)
    }
    allTheGlobals.userProgressCount--;
    setTimeout(function(){
      playCurrentSequenceSoFar();
    },3000)
  }
}

function checkForHighScore() {
  if (allTheGlobals.userProgressCount > allTheGlobals.highScore) {
    allTheGlobals.highScore = allTheGlobals.userProgressCount;
    $(".high-score-num").text(allTheGlobals.userProgressCount);
  }
}

function playBuzzer(){
  var audio = new Audio('https://res.cloudinary.com/dyr8j9g6m/video/upload/v1470621686/buzzer_otepjj.mp3');
  audio.play();
}

//show button press for entire sequence
function playCurrentSequenceSoFar(){
  console.log("Number of times to run: ", allTheGlobals.numberOfTimesToRun);
  if (allTheGlobals.stop) {
      return;
    }
  console.log("this is the whole sequence", allTheGlobals.arrColors);
  allTheGlobals.playBackCount = 1;
  function inner(buttonColor){
    if (allTheGlobals.stop) {
      return;
    }
    console.log("this is the current color", buttonColor);
    // console.log("playback count: ", allTheGlobals.playBackCount, "allTheGlobals.numberOfTimesToRun: ", allTheGlobals.numberOfTimesToRun)
    if (allTheGlobals.playBackCount > allTheGlobals.numberOfTimesToRun + 1) {
      // console.log("Number of times to run: ", allTheGlobals.numberOfTimesToRun);
      console.log("return here");
      allTheGlobals.userProgressCount = 0;
      console.log("User progress count: ", allTheGlobals.userProgressCount);
      allTheGlobals.numberOfTimesToRun = allTheGlobals.playBackCount - 2; 
      // allTheGlobals.playBackCount = 0;
      return userInput();
    }
    buttonPress(buttonColor); 
    allTheGlobals.playBackCount++;
    var incrementSpeed = determineIncrementSpeed();
    setTimeout(function(){
      inner(allTheGlobals.arrColors[allTheGlobals.playBackCount-1])
    },incrementSpeed)
  }
  $(".bttn").unbind("click") //prevents me from clicking buttons while sequence is played
  inner(allTheGlobals.arrColors[allTheGlobals.playBackCount-1]);
}

function determineIncrementSpeed(){
  if (allTheGlobals.numberOfTimesToRun + 1 >= 13) {
    return 400;
  } else if (allTheGlobals.numberOfTimesToRun + 1 >= 9) {
    return 600;
  } else if (allTheGlobals.numberOfTimesToRun + 1 >= 5) {
    return 800;
  } else {
    return 1000;
  }
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
    console.log("this is the audio element: ", audio)
    audio.playbackRate = determinePlayBackSoundSpeed();
    audio.play();
  } else if ($(color).is(".green-button")|| color === ".green-button") {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    console.log("this is the audio element: ", audio)
    audio.playbackRate = determinePlayBackSoundSpeed();
    audio.play();
  } else if ($(color).is(".blue-button")|| color === ".blue-button") {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    console.log("this is the audio element: ", audio)
    audio.playbackRate = determinePlayBackSoundSpeed();
    audio.play();
  } else {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
    console.log("this is the audio element: ", audio)
    audio.playbackRate = determinePlayBackSoundSpeed();
    audio.play();
  }
  console.log("This color comes into button press", color);
  $(color).css("opacity", 1)
  if (allTheGlobals.numberOfTimesToRun + 1 >= 9) {
    setTimeout(function(){
    $(color).css("opacity", .75);  
  }, 200); //400
  } else if (allTheGlobals.numberOfTimesToRun + 1 >= 9) {
    setTimeout(function(){
    $(color).css("opacity", .75);  
  }, 300); //600
  } else if (allTheGlobals.numberOfTimesToRun + 1 >= 5) {
    setTimeout(function(){
    $(color).css("opacity", .75);  
  }, 400); //800
  } else {
    setTimeout(function(){
    $(color).css("opacity", .75);  
  }, 500); //1000
  }
}

function determinePlayBackSoundSpeed(){
  if (allTheGlobals.numberOfTimesToRun + 1 >= 13) {
      return 2.5;
    } else if (allTheGlobals.numberOfTimesToRun + 1 >= 9) {
      return 1.66666666666666;
    } else if (allTheGlobals.numberOfTimesToRun + 1 >= 5) {
      return 1.25
    } else {
      return 1;
    }
}

function generateSequence(){
  var arr = [];
  for (var i = 0; i < 20; i++) {
    arr.push(Math.ceil(Math.random() * 4));
  }
  return convertNumsToColor(arr);
}

function convertNumsToColor(sequenceOfNums){
  allTheGlobals.arrColors = [];
  for (var i = 0; i < sequenceOfNums.length; i++){
    switch (sequenceOfNums[i]){
      case 1:
        allTheGlobals.arrColors.push(".red-button")
        break;
      case 2:
        allTheGlobals.arrColors.push(".green-button")
        break;
      case 3:
        allTheGlobals.arrColors.push(".blue-button")
        break;
      default:
        allTheGlobals.arrColors.push(".yellow-button")
    }
  }
  $(".bob").html(allTheGlobals.arrColors);
  playCurrentSequenceSoFar(allTheGlobals.arrColors);
}

function toggleStrict(){
  console.log("hits strict button");
  var backgroundColor = $(".strict-light").css("background-color");
  // console.log(backgroundColor);
  if (backgroundColor == "rgb(34, 34, 34)") { //same as #222
    // console.log("strict-light background is almost black")
    $(".strict-light").css("background", "red");
    allTheGlobals.strict = true;
    console.log("allTheGlobals.strict is: ", allTheGlobals.strict);
    // enterStrictMode(); 
  } else {
    $(".strict-light").css("background", "#222");
    allTheGlobals.strict = false;
    console.log("allTheGlobals.strict is: ", allTheGlobals.strict);
  } // strict light is red and strict mode is on
}

// console.log(generateSequence());

}); // document.ready 


