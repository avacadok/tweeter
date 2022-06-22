/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
 const createTweetElement = (tweetData) => {
  const $tweet =`
  <article class="tweet"> 
    <header>
      <div class="profile-thing" >
        <img src="${tweetData.user.avatars}" width="80" height="80">
        <div class="profile-img-name">${tweetData.user.name}</div>
      </div>
      
      <div class="profile-handle">${tweetData.user.handle}</div>
    </header >

    <div class="post-detail">
      <div id="text">${tweetData.content.text}</div>
      <div class="border"></div>
    </div>

    <div class="post-info">
      <div class="post-time">${tweetData.created_at}</div>
      <div class="post-icon">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-reply"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </div>
  </article>
  `;
  return $tweet;
}


// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
};

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
 
})
