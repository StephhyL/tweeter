/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// jQuery's document ready function. Everything will run once page is loaded

$(()=> {
  //   tweets is an array
  const loadTweets = () => {
    const data = renderTweets(tweets);
    //******getting data from /tweets gets an array with 4 object tweets. We can then "render" these tweets. Each tweet goes through create tweet element. Note to self - this is only the GET request of the inital data - for now. Nothing to do with the POST.
    $.get("/tweets", (tweets)=> {
      console.log(tweets);
      renderTweets(tweets);
    });
  }

  //calling the loadTweets
  loadTweets();

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
   tweets.forEach(tweet => {
     const $tweet = createTweetElement(tweet);
     $("#tweets-container").append($tweet);
   });
   console.log($("#tweets-container"))
   return $("#tweets-container");
  }
  
  //renderTweets(data);

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
    // console.log("this.text.value---->", this.text.value);
    const tweetLength = this.text.value.length;
    const {error, val} = validateTweet(tweetLength);
    // if tweet is not valid, send an alert to the user and abort
    if (error) {
      return alert(error);
    }

    // converts/serializes form data into query string
    const serializedData = $(this).serialize();

    //post request to server.js
    $.post("/tweets", serializedData, (response) => {
      console.log(serializedData);
      // console.log("hello biss")
    });
  })



})


