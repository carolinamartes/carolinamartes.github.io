$(function(){
console.log("ready...")

  var counter=41;
  var character = 0;
  var $body= $('body');
  var $timer= $('.timer');
  var $time= $('#time');
  var $score= $('.score');
  var $textboxleft= $('#left');
  var $textboxlright= $('#right');

var arrE1L=[]; //array of English1Left String
arrE1L.push(English1Left.split(""));

      $('header').on("click", function (){
      $('.intro').hide();
      $('#thumbtack').show();
      $timer.show();
      $score.show();
      $textboxleft.text(English1Left);
      $textboxlright.text(English1Right);
      function countdown(){
      counter--
      $time.text("Time: " +counter)
      }
      setInterval(countdown,1000)
  })



      $body.keypress(function(e) {
          console.log(English1Left.charCodeAt(character))
          if (e.which == English1Left.charCodeAt(character)){
            var highlightedText= English1Left.charAt(character);
            highlightedText.toggleClass('goodHighlight')
            $textboxleft.text(highlightedText);
            character++
          }
          else{
            console.log("boo!")
          }
      })








  })
