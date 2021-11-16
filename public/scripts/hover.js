$(document).ready(() => {
  // when hovering over the tweet, adds a class that creates a shadow border
  $(".tweet").mouseover(function() {
    $(this).addClass("tweetBorder");
  });

  // when not hovering over the tweet, removes a class that creates a shadow border
  $(".tweet").mouseleave(function() {
    $(this).removeClass("tweetBorder");
  });

  // when hovering over the icon, adds a class that makes the icon red
  $("div.icons i").mouseover(function() {
    $(this).addClass("fill");
  });

  // when not hovering on the icon, removes a class that makes the icon red
  $("div.icons i").mouseleave(function() {
    $(this).removeClass("fill");
  });
});