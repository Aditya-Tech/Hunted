var app;
var currAdd = '';
var texts = [];
var lines = [];
var usedIds = [];
var currId = 0;
var selectedId = 0;
var numLines = 0;
var websiteInProgress = 0;
var prompts = 0;
var isHexCode  = /^#[0-9A-F]{6}$/i.test('#aabbcc');
var detected = [];
var prompted = 0;
var greeted = 0;
var titlePrompt = 0;
var bgPrompt = 0;
var paraPrompt = 0;
var bulletPrompt = 0;
var textPrompt = [];
var q = [];
var highlightedElement;


// possible user-entered keywords
var greetings = ["Hello, I am Buildy! Do you want me to build you a website?", "Howdy! My name is Buildy and I can make you a website! Do you want me to (Yes/No)?"];
var titles = ["title", "header", "head"];
var paragraph = ["paragraph", "line", "sentence"];
var afterDirections = ["after", "underneath", "below", "under"];
var beforeDirections = ["before", "above"];
var bullets = ["bullet points", "bullets", "bullet", "bulleted list"];

var bgColors = ["background color", "background"];



function findingColors() {
  for (var i = 0; i < bgColors.length; i++) {
    if (msg.indexOf(bgColors[i]) >= 0){
      return this.bot_post("Background color detected!");
      document.getElementById("userPage").style.backgroundColor = "lightblue";
    }
  }
}
function findTitle() {
  for (var i = 0; i < titles.length; i++) {
    if (msg.indexOf(titles[i]) >= 0){
      detected.push("titles");
    }
  }
}


$(document).ready(function() {
  return app.init();
});


app = {
  init: function() {
    return this.bind_events();
  },
  bind_events: function() {
    return $(document).on("submit", "#chat", function(e) {
      app.send_message();
      return e.preventDefault();
    });
  },
  send_message: function() {
    var msg;
    msg = $(".text").val().trim();
    if (msg) {
      $(".text").val("");
      $(".messages").append("<div class='message'><div class='you'>" + msg + "</div></div>");
      usedNums =
      lines.add
      return this.check(msg);
    }
  },
  check: function(msg) {

    if (bgPrompt == 1) {
      var color = msg;
      document.getElementById("userPage").style.backgroundColor = msg;
      bgPrompt = 0;
    }

    if (titlePrompt == 1) {
      currId = Math.floor((Math.random() * 1000000) + 1);
      while (usedIds.includes(currId)) {
        currId = Math.floor((Math.random() * 1000000) + 1);
      }

      q.push(['<h1 onclick="markActiveLink(this);" id=' + currId + '>' + msg + '</h1>', currId]);
      $(".bottom").append('<h1 onclick="markActiveLink(this);" id=' + currId + '>' + msg + '</h1>');
      alert([q[0][1]]);

      titlePrompt = 0;
      return;
}
    if (paraPrompt == 1) {
      currId = Math.floor((Math.random() * 1000000) + 1);
      while (usedIds.includes(currId)) {
        currId = Math.floor((Math.random() * 1000000) + 1);
      }
      q.push(['<p onclick="markActiveLink(this);" id=' + currId + '>' + msg + '</p>', currId]);
      $(".bottom").append('<p onclick="markActiveLink(this);" id=' + currId + '>' + msg + '</p>');

      paraPrompt = 0;
      return;
    }

    if (bulletPrompt == 1) {
      if (msg != "DONE") {
        currId = Math.floor((Math.random() * 1000000) + 1);
        while (usedIds.includes(currId)) {
          currId = Math.floor((Math.random() * 1000000) + 1);
        }
        $(".bottom").append('<li onclick="markActiveLink(this);" id=' + currId + '>' + msg + '</li>');
        return this.bot_post("Any other list items? Type 'DONE' when you're finished.");
        //q.push(['<li onclick="markActiveLink(this);" id=' + currId + '>' + msg + '</li>', currId]);
      }
      //q.push(['</ul>', NULL]);
      $(".bottom").append('</ul>');
      bulletPrompt = 0;
      return;
    }

    if (prompted == 1 && websiteInProgress != 1) {
      if (msg.indexOf("Yes") >= 0 || msg.indexOf("yes") >= 0) {
        websiteInProgress = 1;
        this.bot_post("Great! Let's get started. Try saying 'I want a page with a light blue background and green text.'");
        return;

      } else if (msg == "No" || msg == "no") {
        prompted = 0;
        return this.bot_post("Oh :( That's too bad. Maybe next time?)");
      } else {
        return this.bot_post("Sorry, I didn't understand (Try saying 'yes' or 'no').");
      }
    }


    for (var i = 0; i < bgColors.length; i++) {
      if (msg.indexOf(bgColors[i]) >= 0){
        bgPrompt = 1;
        return this.bot_post("You want to change the " + "background color? Sure thing! Choose your color.");
      }
    }

    for (var i = 0; i < titles.length; i++) {
      if (msg.indexOf(titles[i]) >= 0) {
          titlePrompt = 1;
          return this.bot_post("You want a to add a " + titles[i] + " to your site? Sure thing! What do you want it to be called?");
      }
    }

    for (var i = 0; i < paragraph.length; i++) {
      if (msg.indexOf(paragraph[i]) >= 0) {
          paraPrompt = 1;
          return this.bot_post("You want a to add a " + paragraph[i] + " to your site? Sure thing! What do you want it to say?");

      }
    }

    for (var i = 0; i < bullets.length; i++) {
      if (msg.indexOf(bullets[i]) >= 0) {
        bulletPrompt = 1;
        currId = Math.floor((Math.random() * 1000000) + 1);
        while (usedIds.includes(currId)) {
          currId = Math.floor((Math.random() * 1000000) + 1);
        }
        q.push(['<ul onclick="markActiveLink(this);" id=' + currId + '>', currId]);
        $(".bottom").append('<ul onclick="markActiveLink(this);" id=' + currId + '>');
        return this.bot_post("You want a bulleted list? Sure! Start entering your list and type 'DONE' when you're finished!")
      }
    }



    if (msg.substring(0, 6) === "Hello!" && prompted != 1) {
      prompted = 1;
      return this.bot_post(greetings[Math.floor((Math.random() * 2))]);

    } else {
      prompted = 1;
      return this.bot_post(greetings[Math.floor((Math.random() * 2))]);
    }


  },
  bot_post: function(msg) {
    return $(".messages").append("<div class='message'><div class='bot'>" + msg + "</div></div>");
  }
};
