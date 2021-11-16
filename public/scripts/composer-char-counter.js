$(document).ready(() => {
  console.log("document is loaded!");
})



$(() => {
  let count = 140;
  $("#tweet-text").keydown(() => {
    count--;
    console.log(`you typed something. ${count}`)
    $(".counter").text(count);
  })
})