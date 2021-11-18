/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// jQuery's document ready function. Everything will run once page is loaded

$(()=> {
  //hiding the error message when the page loads
  $("#error").hide();


  // creates a new tweet with all the HTML elements. parameter tweet is an object
  const createTweetElement = (tweet) => {
    
    const $img = $("<img>").attr("src",tweet.user.avatars);
    const $spanName = $("<span>").attr("name", "name").text(tweet.user.name);
    const $divAvatarName = $("<div>").addClass("avatar-name");
    // appending avatar img and user name into a div
    $divAvatarName.append($img, $spanName);
    
    const $spanHandle = $("<span>").attr("name", "handle").text(tweet.user.handle);
    const $header = $("<header>")
    
    // appending the div(with img, username) and handle to a header
    $header.append($divAvatarName, $spanHandle);
    
    const $p = $("<p>").attr("name", "content").text(tweet.content.text);
    
    
    const $iFlag = $("<i>").addClass("fas fa-flag")
    const $iRetweet = $("<i>").addClass("fas fa-retweet")
    const $iHeart = $("<i>").addClass("fas fa-heart")
    const $divIcons = $("<div>").addClass("icons")
    
    // appending the icons into a div
    $divIcons.append($iFlag, $iRetweet, $iHeart);
    
    const $spanDate = $("<span>").attr("name", "date").text(timeago.format(tweet.created_at));
    const $footer = $("<footer>").addClass("date-icons");
    
    //appending the div with icons and date into a footer
    $footer.append($spanDate, $divIcons)
    
    const $article = $("<article>").addClass("tweet");
    //appending the header, p, and footer into an article
    $article.append($header, $p, $footer)

    const $tweet = $article;
    // console.log(tweet);
    return $tweet;
  };
  
  // loops through an array of tweets, calls createTweetElement for each tweet, return value is appended to the tweets container
  const renderTweets = (tweets) => {
    // empties the container first before prepending new tweets to it.
   $("#tweets-container").empty();
   tweets.forEach(tweet => {
     const $tweet = createTweetElement(tweet);
     // prepending tweets so they show up at the top
     $("#tweets-container").prepend($tweet);
   });
   console.log($("#tweets-container"))
   return $("#tweets-container");
  }
  
  //renderTweets(data);

  //   tweets is an array
  const loadTweets = () => {
    //******getting data from /tweets gets an array with 4 object tweets. We can then "render" these tweets. Each tweet goes through create tweet element. Note to self - this is only the GET request of the inital data - for now. Nothing to do with the POST.
    $.get("/tweets", (tweets)=> {
      // console.log(tweets);
      renderTweets(tweets);
    });
  }

  //calling the loadTweets
  loadTweets();


  // validates if the tweet is within 140 characters, else returns error value
  const validateTweet = (number) => {
    if (!number) {
      return {error: "no input detected", val: null};
    }
    if (number > 140) {
      return {error: "length of tweet must be < 140 characters", val: null}
    }
    return {error:null, val: true}
  }
  // activated when submit button is pressed.
  $("form").submit(function (event) {
    // prevents the default of refreshing the browser
    event.preventDefault();
    
    //hides error message if valid tweet
    $("#error").hide();

    // console.log("this.text.value---->", this.text.value);
    const tweetLength = this.text.value.length;
    const {error, val} = validateTweet(tweetLength);

    // if tweet is not valid, error box appears on screen with appropriate message
    if (error) {
      alert()

      $("#error-message").text(error);
      return $("#error").slideDown("fast");
    }


    // converts/serializes form data into query string
    const serializedData = $(this).serialize();
    //post request to server.js
    $.post("/tweets", serializedData, (response) => {
      console.log(serializedData);
      // console.log("hello biss")

      //clears the textbox after user writes a tweet
      this.text.value = "";
      // resets the counter to 140 characters
      $(this).find(".counter").text(140);
      loadTweets();
    });

  })

})


