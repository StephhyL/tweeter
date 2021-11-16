$(document).ready(() => {
  console.log("document is loaded!");
})

const vaidateTweet = (tweetLength) => {
  const error = "Please write a tweet that contains no more than 140 characters."
  if (tweetLength <= 140) {
    return (null, true);
  }
  return (error, null);
}

/**
adds a "negative" class to the target element if count is <0*/
const colourClass = (target, count) => {
  if (count < 0) {
    target.addClass("negative");
  }
}


$(()=> {
  $("#tweet-text").keyup(function() {
    const startCount = 140;
    const tweetLength = $(this).val().length;
    const count = startCount - tweetLength;

    //traverses up the DOM tree to form then back down to counter class
    const counterText = $(this).closest("form").find(".counter")
    //assigns class "negative" (makes text red) if count is < 0
    colourClass(counterText, count);
    
    //assigns the character displayed on web ("text") to be equal to count
    counterText.text(count);
  })
})