/**
adds a class to the target element when the expression is true
 */
const addClass = (target, expression, className) => {
  expression ? target.addClass(className) : target.removeClass(className);
};

// everything will run when the page has loaded
$(document).ready(() => {
  // activated when the user starts to type a tweet / when there is input
  $("#tweet-text").on("input", function() {
    const startCount = 140;
    const tweetLength = $(this).val().length;
    const count = startCount - tweetLength;

    // traverses up the DOM tree to form element then back down to counter class
    const counterText = $(this).closest("form").find(".counter");
    // assigns class "negative" (makes text red) if count is < 0
    addClass(counterText, count < 0, "negative");
    
    // assigns the characters-left counter displayed on page to be equal to count
    counterText.text(count);
  });
});
