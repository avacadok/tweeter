/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = function(tweets) {
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
        <img src="${tweet.user.avatars}" width="80" height="80">
        <div class="profile-img-name">${tweet.user.name}</div>
      </div>
      
      <div class="profile-handle">${tweet.user.handle}</div>
    </header >

    <div class="post-detail">
      <div id="text">${tweet.content.text}</div>
      <div class="border"></div>
    </div>

    <div class="post-info">
      <div class="post-time">${tweet.created_at}</div>
      <div class="post-icon">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-reply"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </div>
  </article>
  `;
    $('#tweets-container').append($tweet);
    return $tweet;
  };

  renderTweets(data);

  $("#form-submit").submit(function(event) {
    console.log("hello there");
    //prevent DOM default behaviour
    event.preventDefault();
    //use ajax to do a POST request without refreshing the website
    $.ajax('/tweets', { method: 'POST', data: $("form").serialize() })
      .then(function() {
        console.log('Success!');
        console.log($("form").serialize());
      });

  });


});
