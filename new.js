/*Global Click Events*/

$(".on").on("click",function(){
  on();
})

$(".off").on("click",function(){
  off();
})

function on(){
  $(".on").css("background", "#6495ed");
  $(".off").css("background", "#222");
  $(".count-display").text("--");
  // return function enableStuff(){
    $(".start-button").on("click", function(){
    computerGivesInstructions([],0, true);
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

//1. need to have computer give you a new instruction every second
  //1. repeat current sequence once second at a time
  //2. if user guess was right
    //1. then randomly pick new color and play that color
//2. need to have user input answer after computer gives instructions
//3. need to have user input compared to computer answers after each guess
  //1. if user is wrong and not in strict mode
    //1. repeat current sequence
  //2. if user is wrong and in strict mode
    //1. start over 
  //3. if user is right
    //1. repeat current sequence and add 1 new item

/*add for strict mode here
if ($(".strict-light").css("background-color") == "rgb(34, 34, 34)"){}
*/
function computerGivesInstructions(pcSequence, count, right){
  console.log("hits computerGivesInstructions");
  if (count === 20){
    $(".count-display").text("You win!");
    return computerGivesInstructions([],0, true);
  }
  if (right === true){
    count++;
    $(".count-display").text(count);
    var newColor = pickNewColor();
    pcSequence.push(newColor);
    playSequence(pcSequence);
    return userInput(pcSequence, []); //return this?
  } 
  playSequence(pcSequence);
  return userInput(pcSequence, []) //return this?
}

function playSequence(theSequence){
  for (let i = 0; i < theSequence.length; i++){ //change var to let?
    playButtonSound(theSequence[i]);
  }
}

function pickNewColor(){
  console.log("hits pickNewColor function");
  var newColor = Math.random();
  if (newColor > .75) {
    return "red";
  } 
  if (newColor > .5) {
    return "green";
  }
  if (newColor > .25){
    return "blue";
  } else {
    return "yellow";
  }
}

function userInput(pcSequence, userSequence){
  console.log("hits userInput function pcSequence is: ", pcSequence, "userSequence is : ", userSequence);
  $(".red-button").on("click",function(){
    playButtonSound("red");
    userSequence.push("red");
    console.log("clicked Red");
    console.log("PC sequence: ", pcSequence, "User sequence: ", userSequence);
    //create function after each click
    return checkAnswer(pcSequence, userSequence);
  })
  $(".green-button").on("click",function(){
    playButtonSound("green");
    userSequence.push("green");
    console.log("clicked Green");
    console.log("PC sequence: ", pcSequence, "User sequence: ", userSequence);
    return checkAnswer(pcSequence, userSequence);
    })
  $(".blue-button").on("click", function(){
    playButtonSound("blue");
    userSequence.push("blue");
    console.log("clicked Blue");
    console.log("PC sequence: ", pcSequence, "User sequence: ", userSequence);
    return checkAnswer(pcSequence, userSequence);
    })
  $(".yellow-button").on("click", function(){
    playButtonSound("yellow");
    userSequence.push("yellow");
    console.log("clicked Yellow");
    console.log("PC sequence: ", pcSequence, "User sequence: ", userSequence);
    return checkAnswer(pcSequence, userSequence);
  })
  // var countHere = 0;
  /*
  while (userSequence.length < pcSequence.length){
    // countHere++;
    userSequence.push("userGuess");
    var isAnswerRight = checkAnswer(pcSequence, userSequence);
    if (!isAnswerRight) {
      break;
    } 
  }
  if (true){ //was isAnswerRight
    return computerGivesInstructions(pcSequence,pcSequence.length, true);
  } else {
    return computerGivesInstructions(pcSequence,pcSequence.length); //undefined is falsey
  }
  */
}

function playButtonSound(color){
  if (color === "red") {
    //make sound
    console.log("Red sound");
  } else if (color === "green"){
    //make sound
    console.log("Green sound");
  } else if (color === "blue"){
    //make sound
    console.log("Blue sound");
  } else {
    //make sound
    console.log("Yellow sound")
  }
}

function checkAnswer(computerOrder, humanOrder){
  console.log("hits check answer function. first if statment runs if: ", computerOrder.length === humanOrder.length, computerOrder, humanOrder);
  if (computerOrder.length === humanOrder.length && computerOrder[computerOrder.length-1] === humanOrder[humanOrder.length-1]){
    return computerGivesInstructions(computerOrder, computerOrder.length, true);
  }
  console.log("check answer function second if runs if: ", computerOrder[humanOrder.length-1] === humanOrder[humanOrder.length-1]);
  if (computerOrder[humanOrder.length-1] === humanOrder[humanOrder.length-1]){
    return userInput(computerOrder, humanOrder);
  }
  console.log("hits checkAnswer 3rd option");
   //computerOrder.slice(0,humanOrder.length) === humanOrder
  return computerGivesInstructions(computerOrder, computerOrder.length);
}




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