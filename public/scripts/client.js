/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
{/* <div class="tweet-content">${text}</div> */ }
const createTweetElement = (tweet) => {
  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const safeHTML = `<div class="tweet-content">${escape(tweet.content.text)}</div>`;


  const currentDate = new Date();
  const msAgo = currentDate.getTime() - tweet.created_at;
  const daysAgo = Math.floor(msAgo / (1000 * 60 * 60 * 24))
  const text = $("<div>").text(tweet.content.text);
  return $(`
  <article class="tweet">
  <header class="author-row">
    <div class="name-avatar-container">
      <img src="https://i.imgur.com/73hZDYK.png">
      <div class="author-text">${tweet.user.name}</div>
    </div>
    <div class="handle-text">${tweet.user.handle}</div>
  </header>
  <div>
  ${safeHTML}
    <hr>
  </div>
    <footer>
    <div>${daysAgo} days ago</div>
    <div class="tweet-button-container">
      <div>A</div>
      <div>B</div>
      <div>C</div>
    </div>
    </footer>
  </article>
  `);
}

$(document).ready(function () {
  const $form = $('#tweet-form');
  $form.on('submit', function (event) {
    event.preventDefault();
    const tweetLength = $('#tweet-text').val().length;
    $('#error').slideUp("slow")
    if (tweetLength === 0) {
      $('#error').text('Tweet cannot be empty!')
      return $('#error').slideDown("slow")
    } else if (tweetLength > 140) {
      $('#error').text("Tweet must be < 140 characters")
      return $('#error').slideDown("slow")
    }
    const text = $('#tweet-text').serialize()
    const $form = $('#tweet-form');
    const url = $form.attr('action')

    $.post(url, text, () => {
      console.log("success!")
      loadTweets();
    })
  })
})

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    $('#tweets-container').prepend(createTweetElement(tweet)
    )
  }
}

const loadTweets = () => {
  $.ajax('http://localhost:8080/tweets', { method: 'GET' })
    .then(function (tweets) {
      renderTweets(tweets)
      console.log('Success: ', tweets);
    });
}

loadTweets();
