function on(){
  $(".on").css("background", "#6495ed");
  $(".off").css("background", "#222");
  $(".count-display").text("--");
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