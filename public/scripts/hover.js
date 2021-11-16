
// same value as addClass
const newClass = (target, expression, className) => {
  expression ? target.addClass(className): target.removeClass(className);
}

$(document).ready(() => {
  // when hovering over the tweet, 
  $(".tweet").mouseover(function () {
    // console.log("hello");
    // console.log("this");
    $(this).addClass("tweetBorder");
  })

  $(".tweet").mouseleave(function () {
    $(this).removeClass("tweetBorder");
  })

  $("div.icons i").mouseover(function(){
    $(this).addClass("fill");
  })

  $("div.icons i").mouseleave(function(){
    $(this).removeClass("fill");
  })



});