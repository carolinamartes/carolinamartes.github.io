$(function() {
  console.log("ready...")

//variables


var $body = $('body');
var $timer = $('.timer');
var $time = $('#time');
var $score = $('.score');
var $scoreNum= $('#score')
var $level= $('#level')
var $textboxleft = $('#left');
var $textboxright = $('#right');
var $checkBox = $('#check');
var balloon = $('#balloon');
var thumbtack = $('#thumbtack');
var thumbtack2 = $('#thumbtack2');
var score = 0;
var totalscore=0;
var characterL = 0;
var characterR = 0;
var level= 1;
var arrTextR= [English1Right, Spanish1Right, French1Right];
var arrTextL= [English1Left, Spanish1Left, French1Left];
var textLeft="";
var textRight="";
var time = 41;
//functions



//game flow
$('.controls').hide();

setInterval(checkCollision, 1000);
var countdown= setInterval(countdown, 1000);

  $('#clickhere').on("click", function(){
    startGame()
  })

  if (level>1){
    startGame();
  }

  function startGame() {
    time=41;
    textLeft= arrTextL[level-1];
    textRight= arrTextR[level-1];
    $('.controls').show();
    $('.intro').hide();
    thumbtack.show();
    $timer.show();
    $score.show();
    $level.text("Level "+ level)
    $textboxleft.text(textLeft);
    $textboxright.text(textRight);
    if (level===3){
      balloon.addClass('moveballoonUpQuicker')
      time= 30;
    }
    else{
      balloon.addClass('moveballoonUp');
  }
  }

  function gameOver() {
    $('.intro p').remove();
    thumbtack.hide();
    $('.intro h1').text("GAME OVER");
    $('.intro').show();
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

  function checkCollision() {
    if (collision()) {
      balloon.hide("explode", {
        "pieces": "100"
      }, 1500);
      balloon.hide();
      balloon.removeClass('moveballoonUp');
      setTimeout(gameOver, 2000);
    }
  }

  function countdown() {
    time--
    $time.text("Time: " + time)
    if (time<1){
      time=1;
    }
  }


  $body.keypress(function checkText(e) {
    if (e.which == textLeft.charCodeAt(characterL)) {
      $checkBox.append(String.fromCharCode(e.which));
      characterL++
      score++
      totalscore++
      checkWinOrLose()
      $scoreNum.text("Score: " + totalscore);
    }
      else if (e.which == textRight.charCodeAt(characterR)) {
      $checkBox.append(String.fromCharCode(e.which));
      characterR++
      score++
      totalscore++
      checkWinOrLose()
      $scoreNum.text("Score: " + totalscore);
    }
      else {
      $checkBox.effect("shake");
    }
  })


  function Lose() {
    if (time === 0 && (score !== textLeft.length || score !== textRight.length)) {
      return true
    }
  }

  function Win() {
    if ((score === textLeft.length && characterL>1) || (score === textRight.length && characterR>1)) {
      return true
    }
  }

  function checkWinOrLose() {
    if (Lose()) {
      time = 0;
      gameOver()
    }
    if (Win()) {
      if (score === textLeft.length) {
        balloon.addClass('moveballoonLeft');
      } else if (score === textRight.length) {
        balloon.addClass('moveballoonRight');
      }

      function hideBalloon() {
        balloon.hide()
      }
      setTimeout(hideBalloon, 4000);
      $('.intro p').hide();
      thumbtack.hide();
      thumbtack2.hide();
      $('.intro h1').text("Nice floating!");
      $('.intro').show();


      function restart(){
      $('.intro').hide();
      balloon.removeClass('moveballoonUp');
      balloon.removeClass('moveballoonLeft');
      balloon.removeClass('moveballoonRight');
      balloon.show();
      $checkBox.text("");
      score=0;
      characterL=0;
      characterR=0;
      level++;
      if (level===4){
        $('.intro h1').text("You did it!");
        $('.intro').show();
        balloon.removeClass('moveballoonUpQuicker');
        balloon.removeClass('moveballoonUp');
      }
      else{
        if (level===2){
          thumbtack2.show();
        }
      startGame();
      }
      }
      setTimeout(restart, 4000);
    }
  }





})
