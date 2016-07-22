$(function() {
  console.log("ready...")

  var time = 41;
  var character = 0;
  var $body = $('body');
  var $timer = $('.timer');
  var $time = $('#time');
  var $score = $('.score');
  var $textboxleft = $('#left');
  var $textboxlright = $('#right');
  var balloon = $('#balloon');
  var thumbtack = $('#thumbtack')
  var score = 0;

  var arrE1L = []; //array of English1Left String
  arrE1L.push(English1Left.split(""));

  $('header').on("click", function() {
    $('.intro').hide();
    thumbtack.show();
    $timer.show();
    $score.show();
    $textboxleft.text(English1Left);
    $textboxlright.text(English1Right);
    balloon.addClass('moveballoonUp');

    function countdown() {
      time--
      $time.text("Time: " + time);
      checkLose();
      if (checkLose() === true) {
        clearInterval(repeat)
        time = 0;
      }
    }

    function collision() { //http://jsfiddle.net/nGRwt/7/
      var x1 = balloon.offset().left;
      var y1 = balloon.offset().top;
      var h1 = balloon.outerHeight(true);
      var w1 = balloon.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = thumbtack.offset().left;
      var y2 = thumbtack.offset().top;
      var h2 = thumbtack.outerHeight(true);
      var w2 = thumbtack.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;

      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
    }

    function checkCollision() {
      if (collision()) {
        balloon.toggle("explode", 1000)
        balloon.removeClass("moveballoonUp")
        balloon.hide()
        alert("Game Over!")
      }
    };
    setInterval(checkCollision, 1000)

    var repeat = setInterval(countdown, 1000)
  })



  $body.keypress(function(e) {
    console.log(English1Left.charCodeAt(character))
    if (e.which == English1Left.charCodeAt(character)) {
      $('#check').append(English1Left.charAt(character));
      character++
      score++
      $score.text("Score: " + score)
    } else {
      $('#check').effect("shake");
      console.log("boo!")
    }
  })

  function checkLose() {
    if (score === English1Left.length) {
      balloon.addClass('moveballoonLeft')
    }
    if (time === 0 && score !== English1Left.length) {
      return true
    }
  }









})
