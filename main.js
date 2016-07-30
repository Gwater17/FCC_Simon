function on(){
  $(".on").css("background", "#6495ed");
  $(".off").css("background", "#222");
  $(".count-display").text("--");
  // return function enableStuff(){
    $(".start-button").on("click", function(){
    start();
  });
    $(".strict-button").on("click", function(){
      toggleStrict();
    })
  // };
}

function off(){
  $(".off").css("background", "#6495ed");
  $(".on").css("background", "#222");
  $(".count-display").text("");
}

$(".on").on("click",function(){
  on();
})

$(".off").on("click",function(){
  off();
})

function start(){
  console.log("hits start button");
}

function toggleStrict(){
  console.log("hits strict button");
  var backgroundColor = $(".strict-light").css("background-color");
  // console.log(backgroundColor);
  if (backgroundColor == "rgb(34, 34, 34)") {
    // console.log("strict-light background is almost black")
    $(".strict-light").css("background", "red");
    enterStrictMode(); 
  } else {
    $(".strict-light").css("background", "#222");
  } // strict light is red and strict mode is on
}

function enterStrictMode(){
  // console.log("in enterStrictMode function");
}