$(document).ready(function () {
  $("#tweet-text").keyup(function () {
    const counter = $("#tweet-text").parent().find('.counter');
    const textLength = $(this).val().length;

    if(textLength > 140){
      counter.addClass("color-red")
    } else{
      counter.removeClass("color-red")
    }
    counter.val(140 -textLength)
  })
})