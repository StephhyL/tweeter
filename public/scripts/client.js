/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(()=> {

  //test
  const tweetData =  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
 }


  // tweets is an object
  const createTweetElement = (tweet) => {
    // create a tweet article
 
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

    const $spanDate = $("<span>").attr("name", "date").text(tweet.created_at);
    const $footer = $("<footer>").addClass("date-icons");

    //appending the div with icons and date into a footer
    $footer.append($spanDate, $divIcons)

    const $article = $("<article>").addClass("tweet");
    //appending the header, p, and footer into an article
    $article.append($header, $p, $footer)
    const $tweet = $article;
    // console.log(tweet);
    return $tweet;
  }

  const $tweet = createTweetElement(tweetData);
  console.log($tweet); //to see what it looks like

  $('#all-tweets').append($tweet)


})


