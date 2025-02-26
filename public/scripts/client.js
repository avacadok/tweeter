/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    tweets.forEach(tweet => {
      createTweetElement(tweet);
    });
  };

  const createTweetElement = (tweet) => {
    const $tweet = `
  <article class="tweet"> 
    <header>
      <div class="profile-thing" >
        <img src="${escape(tweet.user.avatars)}" width="80" height="80">
        <div class="profile-img-name">${escape(tweet.user.name)}</div>
      </div>
      
      <div class="profile-handle">${escape(tweet.user.handle)}</div>
    </header >

    <div class="post-detail">
      <div id="text">${escape(tweet.content.text)}</div>
      <div class="border"></div>
    </div>

    <div class="post-info">
      <div class="post-time">${escape(timeago.format(tweet.created_at))}</div>
      <div class="post-icon">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-reply"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </div>
  </article>
  `;
    //append add new tweet to the end of the container
    //add new tweet in the beginning of the container
    $('#tweets-container').prepend($tweet);
    return $tweet;
  };

  $('#sub-title').on('click', function () {
    if ($('.new-tweet').is(":hidden")) {
      $('.new-tweet').slideDown('slow');
    } else {
      $('.new-tweet').slideUp();
    }
  });

  $("#form-submit").submit(function (event) {
    //prevent DOM default behaviour
    event.preventDefault();
    const tweetLen = $('#enterTweet-text').val().length;

    //use.text() to input the msg that would show when the conditional statement is reached
    //less div class on HTML
    if (tweetLen > 140) {
      $(".warning-msg").text("Sorry, your input has exceeded the limit. Please reduce your input!");
      return $(".hidden-info").slideDown();
    } else if (tweetLen === 0) {
      $(".warning-msg").text("Please enter your tweet.");
      return $(".hidden-info").slideDown();
    } else if (tweetLen <= 140) {
      //also can use slideUp() to hide the error msg
      $(".hidden-info").slideUp();
    }

    //use ajax to do a POST request without refreshing the website
    $.ajax('/tweets', { method: 'POST', data: $("form").serialize() })
      .then(function () {
        console.log('Success!');
        console.log($("form").serialize());
        $('#tweets-container').empty();
        $('#enterTweet-text').val("");
        $('#counter').text(140);
        loadtweets();
      });

  });

  const loadtweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (tweetArr) {
        renderTweets(tweetArr);
      });
  };

  loadtweets();

  $(".hidden-info").hide();
});
