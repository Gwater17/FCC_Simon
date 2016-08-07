//write a function that returns a random integer b/w 1 and 4

$(document).ready(function(){

var userProgressCount = 0;
var playBackCount = 0;
var arrColors = [];
generateSequence();


//event handlers for mousedown, mouseup
function userInput(){
  $(".bttn").on("mousedown", function(e){
    buttonPress($(this));
    console.log($(this), e.target, this.className.split(" ")[0]);
    userProgressCount++;
    validate(this.className.split(" ")[0]);
  })
}

function validate(pressedButton) {
  console.log("User Progress Count: ", userProgressCount, "Play Back Count: ", playBackCount, "Array of Colors: ", arrColors);
  if (userProgressCount === playBackCount - 1 && pressedButton === arrColors[userProgressCount - 1].slice(1)) {
    console.log("hits this");
    playCurrentSequenceSoFar(arrColors);
  } else if (true) {
    return;
  } else {
    userProgressCount--;
    playCurrentSequenceSoFar();
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
  playCurrentSequenceSoFar(arrColors);
}
// console.log(generateSequence());

//show button press for entire sequence
function playCurrentSequenceSoFar(sequence){
  playBackCount = 1;
  function inner(buttonColor){
    console.log(playBackCount);
    if (playBackCount > userProgressCount + 1) {
      console.log("return here");
      userProgressCount = 0; 
      // playBackCount = 0;
      return userInput();
    }
    buttonPress(buttonColor); 
    playBackCount++;
    setTimeout(function(){
      inner(sequence[playBackCount+1])
    },1000)
  }
  inner(sequence[playBackCount-1]);
}


function buttonPress(color) {
  $(color).css("opacity", 1)
  setTimeout(function(){
    $(color).css("opacity", .75);  
  }, 1000);
  
}


}); // document.ready 

