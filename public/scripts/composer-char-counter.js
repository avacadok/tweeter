$(document).ready(function() {
  // --- our code goes here ---

  countChar = function(words) {
    let charLength = words.value.length;
    $(".counter").text(140 - charLength);
    if (charLength > 140) {
      $("#counter").css("color", "#e5c959");
    } else {
      $("#counter").css("color", "#4b4b37");
    }
  };
});