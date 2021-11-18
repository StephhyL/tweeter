/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// jQuery's document ready function. Everything will run once page is loaded
$(()=> {
  // hiding the error message upon initial page load
  $("#error").hide();

  /**
   *  creates a new tweet with all the HTML elements. parameter tweet is an object
  */
  const createTweetElement = (tweet) => {
    
    const $img = $("<img>").attr("src",tweet.user.avatars);
    const $spanName = $("<span>").attr("name", "name").text(tweet.user.name);
    const $divAvatarName = $("<div>").addClass("avatar-name");
    // appending avatar img and user name into a div
    $divAvatarName.append($img, $spanName);
    
    const $spanHandle = $("<span>").attr("name", "handle").text(tweet.user.handle);
    const $header = $("<header>");
    // appending the div(with img, username) and handle to a header
    $header.append($divAvatarName, $spanHandle);
    
    const $p = $("<p>").attr("name", "content").text(tweet.content.text);
    
    const $iFlag = $("<i>").addClass("fas fa-flag");
    const $iRetweet = $("<i>").addClass("fas fa-retweet");
    const $iHeart = $("<i>").addClass("fas fa-heart");
    const $divIcons = $("<div>").addClass("icons");
    // appending the icons into a div
    $divIcons.append($iFlag, $iRetweet, $iHeart);
    
    const $spanDate = $("<span>").attr("name", "date").text(timeago.format(tweet.created_at));
    const $footer = $("<footer>").addClass("date-icons");
    //appending the div with icons and date into a footer
    $footer.append($spanDate, $divIcons);
    
    const $article = $("<article>").addClass("tweet");
    //appending the header, p, and footer into an article
    $article.append($header, $p, $footer);

    const $tweet = $article;
    return $tweet;
  };
  
  /**
   * For each tweet in the tweets array, calls createTweetElement function and its return value is appended to the tweets container
  */
  const renderTweets = (tweets) => {
    // empties the container first before prepending new tweets to it.
    $("#tweets-container").empty();

    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      // prepending tweets so they show up at the top
      $("#tweets-container").prepend($tweet);
    });
    return $("#tweets-container");
  };
  

  /**
   * makes an ajax GET request to retreieve tweets and displays on page
  */
  const loadTweets = () => {
    $.get("/tweets", (tweets)=> {
      renderTweets(tweets);
    });
  };

  // loads the api/server.js tweets upon inital GET request to website
  loadTweets();


  /**
   * validates if the tweet is within 1-140 characters. If outside range, returns error: message.
  */
  const validateTweet = (number) => {
    if (!number) {
      return {error: "No input detected. Please tweet something!"};
    }
    if (number > 140) {
      return {error: "Sorry, length of tweet must not be over 140 characters."};
    }
    return {error:null};
  };

  // activated when submit button is pressed
  $("form").submit(function(event) {
    // prevents the browser's default action of refreshing the page
    event.preventDefault();
    
    // hides error message if valid tweet
    $("#error").hide();

    const tweetLength = this.text.value.length;
    // getting error variable value based on return value of validateTweet(tweetLength)
    const {error} = validateTweet(tweetLength);

    // if tweet is not valid, error box appears on screen with appropriate message
    if (error) {
      $("#error-message").text(error);
      return $("#error").slideDown("fast");
    }

    // serializes form data into query string
    const serializedData = $(this).serialize();

    // ajax POST request to api/server.js activated if tweet is valid
    $.post("/tweets", serializedData, (response) => {
      //clears the textbox after user writes a tweet
      this.text.value = "";
      // resets the counter to 140 characters
      $(this).find(".counter").text(140);
      // calls on loadTweet function which will make an ajax GET request
      loadTweets();
    });
  });
});


