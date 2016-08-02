/*Global Click Events*/

$(".on").on("click",function(){
  on();
})

$(".off").on("click",function(){
  off();
})

/* Click On button*/
function on(){
  $(".on").css("background", "#6495ed");
  $(".off").css("background", "#222");
  $(".count-display").text("--");
  // return function enableStuff(){
    $(".start-button").on("click", function(){
    newGame();
  });
    $(".strict-button").on("click", function(){
      toggleStrict();
    })
  // };
}

/*Click Off button*/
function off(){
  $(".off").css("background", "#6495ed");
  $(".on").css("background", "#222");
  $(".strict-light").css("background", "#222");
  $(".start-button").unbind();
  $(".strict-button").unbind();
  $(".count-display").text("");
}
/*end of global click events*/


function newGame(){
  console.log("hits start button. new game begins");
  computerGivesInstructions([],0)
}

function computerGivesInstructions(sequence, count){
  console.log("computerGivesInstructions executes", sequence, count);
  if (count === 20){
    $(".count-display").text("You win");
    // setTimeout(incrementCount,1000);
    newGame();
  }
  count++;
  $(".count-display").text(count);
  playCurrentSequence(sequence);
  var randomNum = Math.random();
  if (randomNum > .75) {
    setTimeout(function(){
      playButtonSound("red");
    },1000);
    sequence.push("red");
  } else if (randomNum > .5) {
    setTimeout(function(){
      playButtonSound("green");
    },1000)
    sequence.push("green");
  } else if (randomNum > .25) {
    setTimeout(function(){
      playButtonSound("blue");
    },1000)
    sequence.push("blue");
  } else { //randomNum
    setTimeout(function(){
      playButtonSound("yellow");
    },1000)
    sequence.push("yellow");
  }
  userInput(sequence,count);
}

function userInput(colorOrder,currNum){
  console.log(colorOrder, currNum);
  var userClickOrder = [];
  console.log("userInput function runs")
  $(".red-button").on("click",function(){
    playButtonSound("red");
    userClickOrder.push("red");
    console.log(userClickOrder);
    //create function after each click
    isUserCorrect(colorOrder, userClickOrder);
  })
  $(".green-button").on("click",function(){
    playButtonSound("green");
    userClickOrder.push("green");
    console.log(userClickOrder, colorOrder);
    isUserCorrect(colorOrder, userClickOrder);
  })
  $(".blue-button").on("click", function(){
    playButtonSound("blue");
    userClickOrder.push("blue");
    // console.log(userClickOrder);
    isUserCorrect(colorOrder, userClickOrder);
  })
  $(".yellow-button").on("click", function(){
    playButtonSound("yellow");
    userClickOrder.push("yellow");
    // console.log(userClickOrder);
    isUserCorrect(colorOrder, userClickOrder);
  })
}

function playCurrentSequence(existingSequence){
  console.log("hits the playCurrentSequence function", existingSequence);
  for (var i = 0; i < existingSequence.length; i++){
    (function IIFE(currColor){
      playButtonSound(currColor);
    })(existingSequence[i])
  }
  // existingSequence.forEach(function(value){
    // playButtonSound("value");
  // })
}

/*need conditions for...
  //1. if the computerOrder and userOrder is the same up to the point of the computerOrders length. (so userOrder is the same as computerOrder)
  //2. if the computerOrder and userOrder is the same for the current slice, but the user has not finished guessing the sequence
  //3. if the user guesses incorrectly meaning that the current slice of the userOrder and the computerOrder does not match*/
function isUserCorrect(computerOrder, userOrder){
  console.log("hits isUserCorrect function", computerOrder, userOrder);
  if (computerOrder.length === userOrder.length && computerOrder[computerOrder.length -1] === userOrder[userOrder.length-1]){
    console.log("hits this if statement", computerOrder, userOrder);
    return setTimeout(function(){
      computerGivesInstructions(computerOrder, computerOrder.length);
    },1000)
  }
}

function playButtonSound(color){
  if (color === "red"){
    // console.log("play red button");
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    audio.play();
    $(".red-button").css("opacity", "1");
    setInterval(function(){
      $(".red-button").css("opacity", "0.75");
  }, 1000)
  } else if (color === "green") {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    audio.play();
    $(".green-button").css("opacity", "1");
    setInterval(function(){
      $(".green-button").css("opacity", "0.75");
  }, 1000)
  } else if (color === "blue"){
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    audio.play();
    $(".blue-button").css("opacity", "1");
    setInterval(function(){
      $(".blue-button").css("opacity", "0.75");
  }, 1000)
  } else { //color === "yellow"
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
    audio.play();
    $(".yellow-button").css("opacity", "1");
    setInterval(function(){
      $(".yellow-button").css("opacity", "0.75");
  }, 1000)
}
}


/*turn on and off strict mode. So far only handles the light going on and off*/
function toggleStrict(){
  console.log("hits strict button");
  var backgroundColor = $(".strict-light").css("background-color");
  // console.log(backgroundColor);
  if (backgroundColor == "rgb(34, 34, 34)") { //same as #222
    // console.log("strict-light background is almost black")
    $(".strict-light").css("background", "red");
    // enterStrictMode(); 
  } else {
    $(".strict-light").css("background", "#222");
  } // strict light is red and strict mode is on
}

function enterStrictMode(){
  // console.log("in enterStrictMode function");
}