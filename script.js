$(function() {
  console.log("ready...")

  var score = 0;
  var time = 41;
  var characterL = 0;
  var characterR = 0;
  var $body = $('body');
  var $timer = $('.timer');
  var $time = $('#time');
  var $score = $('.score');
  var $scoreNum= $('#score')
  var $textboxleft = $('#left');
  var $textboxright = $('#right');
  var $checkBox = $('#check');
  var balloon = $('#balloon');
  var thumbtack = $('#thumbtack');

  $('.controls').hide();

  $('header').on("click", function() {
    $('.controls').show();
    $('.intro').hide();
    thumbtack.show();
    $timer.show();
    $score.show();
    $textboxleft.text(English1Left);
    $textboxright.text(English1Right);
    balloon.addClass('moveballoonUp');

    function countdown() {
      time--
      $time.text("Time: " + time)
    }

    function checkWinOrLose() {
      if (Lose() || time < 1) {
        clearInterval(repeat);
        time = 0;
      }
      if (Win()) {

        if (score === English1Left.length) {
          balloon.addClass('moveballoonLeft');
        } else if (score === English1Right.length) {
          balloon.addClass('moveballoonRight');
        }

        function hideBalloon() {
          balloon.hide()
        }
        setTimeout(hideBalloon, 3000);

        $('.intro p').remove();
        thumbtack.remove();
        $('.intro h1').text("Nice floating!");
        $('.intro').show();
        clearInterval(repeatCollision);
        clearInterval(repeat);
        clearInterval(winOrLose);
      }
    }

    function collision() { //modified from http://jsfiddle.net/nGRwt/7/

      var y1 = balloon.offset().top;
      var h1 = balloon.outerHeight(true);
      var y2 = thumbtack.offset().top;
      var h2 = thumbtack.outerHeight(true);
      var b2 = y2 + h2;

      if (y1 > b2) return false;
      return true;
    }

    function gameOver() {
      $('.intro p').remove();
      thumbtack.remove();
      $('.intro h1').text("GAME OVER");
      $('.intro').show();
      clearInterval(repeatCollision)
    }

    function checkCollision() {
      if (collision()) {
        balloon.hide("explode", {
          "pieces": "100"
        }, 1500);
        balloon.hide();
        balloon.removeClass('moveballoonUp');
        setTimeout(gameOver, 2000);
      }
    };
    var repeatCollision = setInterval(checkCollision, 1000)
    var repeat = setInterval(countdown, 1000)
    var winOrLose = setInterval(checkWinOrLose, 1000)
  })



  $body.keypress(function(e) {

    if (e.which == English1Left.charCodeAt(characterL)) {
      $('#check').append(String.fromCharCode(e.which));
      characterL++
      score++
      $scoreNum.text("Score: " + score)
    }
      else if (e.which == English1Right.charCodeAt(characterR)) {
      $checkBox.append(String.fromCharCode(e.which));
      characterR++
      score++
      $scoreNum.text("Score: " + score)
    }
      else {
      $checkBox.effect("shake");
    }
  })

  function Lose() {
    if (time === 0 && (score !== English1Left.length || score !== English1Right.length)) {
      return true
    }
  }

  function Win() {
    if ((score === English1Left.length && characterL>1) || (score === English1Right.length && characterR>1)) {
      return true
    }
  }

})
