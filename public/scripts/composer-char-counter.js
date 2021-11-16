$(document).ready(() => {
  console.log("document is loaded!");
})

const vaidateTweet = (tweetLength) => {
  if (tweetLength <= 140) {
    return true;
  }
  return false;
}

$(()=> {
  $("#tweet-text").keyup(function() {
    const startCount = 140;
    const tweetLength = $(this).val().length;
    const count = startCount - tweetLength;
    $(this).closest(".new-tweet").find(".counter").text(count);
  })
})