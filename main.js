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
  console.log("computerGivesInstructions executes");
  if (count === 20){
    $(".count-display").text("You win");
    // setTimeout(incrementCount,1000);
    newGame();
  }
  count++;
  $(".count-display").text(count);
  var randomNum = Math.random();
  if (randomNum > .75) {
    playButtonSound("red");
  } else if (randomNum > .5) {
    playButtonSound("green");
  } else if (randomNum > .25) {
    playButtonSound("blue");
  } else { //randomNum
    playButtonSound("yellow");
  }
  userInput(sequence,count);
}

function userInput(colorOrder,currNum){
  var userClickOrder = [];
  console.log("userInput function runs")
  $(".red-button").on("click",function(){
    playButtonSound("red");
    userClickOrder.push("red");
    console.log(userClickOrder);
  })
  $(".green-button").on("click",function(){
    playButtonSound("green");
    userClickOrder.push("green");
    console.log(userClickOrder);
  })
  $(".blue-button").on("click", function(){
    playButtonSound("blue");
    userClickOrder.push("blue");
    console.log(userClickOrder);
  })
  $(".yellow-button").on("click", function(){
    playButtonSound("yellow");
    userClickOrder.push("yellow");
    console.log(userClickOrder);
  })
}

function playButtonSound(color){
  if (color === "red"){
    // console.log("play red button");
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    audio.play();
    $(".red-button").css("opacity", "1");
    setInterval(function(){
      $(".red-button").css("opacity", "0.5");
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
  if (backgroundColor == "rgb(34, 34, 34)") {
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