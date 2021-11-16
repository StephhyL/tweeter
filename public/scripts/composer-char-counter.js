/**
adds a class to the target element when the expression is true
 */
const addClass = (target, expression, className) => {
  expression ? target.addClass(className) : target.removeClass(className);
};

$(document).ready(() => {
  $("#tweet-text").keyup(function() {
    const startCount = 140;
    const tweetLength = $(this).val().length;
    const count = startCount - tweetLength;

    // traverses up the DOM tree to form then back down to counter class
    const counterText = $(this).closest("form").find(".counter");
    // assigns class "negative" (makes text red) if count is < 0
    addClass(counterText, count < 0, "negative");
    
    // assigns the character displayed on web ("text") to be equal to count
    counterText.text(count);
  });
});
