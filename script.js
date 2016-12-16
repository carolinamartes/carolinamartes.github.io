$(function() {
    console.log("ready...")

    //jquery variables
    const $scoreNum = $('#score');
    const $checkBox = $('#check');
    const $balloon = $('#balloon');
    const $thumbtack = $('#thumbtack');
    const $thumbtack2 = $('#thumbtack2');

    //variables
    let score = 0;
    let totalscore = 0;
    let characterL = 0;
    let characterR = 0;
    let level = 2;
    let textLeft = "";
    let textRight = "";
    let time = 41;

    //functions
    function findHighscore() {
        let highscore = localStorage.getItem("highscore");
        if (totalscore !== 0 && totalscore > highscore) {
            localStorage.setItem("highscore", totalscore)
        }
    }

    function showTime() {
        $('.timer').show();
    }

    function gameOver() {
        $('.intro p').remove();
        $thumbtack.hide();
        $thumbtack2.hide();
        $('.intro h1').text("GAME OVER");
        $('.intro').show();
    }

    function checkCollision() {
        if (collision()) {
            $balloon.hide("explode", {
                "pieces": "100"
            }, 1500);
            $balloon.hide();
            $balloon.removeClass('moveballoonUp');
            setTimeout(gameOver, 2000);
        }
    }

    function countdown() {
        checkWinOrLose()
        $('#time').text("Time: " + time)
        if (time !== 0) {
            time--
        }
    }

    function collision() { //modified from http://jsfiddle.net/nGRwt/7/
        let y1 = $balloon.offset().top;
        let h1 = $balloon.outerHeight(true);
        let y2 = $thumbtack.offset().top;
        let h2 = $thumbtack.outerHeight(true);
        let b2 = y2 + h2;
        if (y1 > b2) return false;
        return true;
    }

    function Lose() {
        if (time === 0 && Win() === false) {
            return true
        }
    }

    function Win() {
        if ($('#check').text().trim() === $('#right').text() || $('#check').text().trim() === $('#left').text()) {
            return true
        } else {
            return false
        }
    }

    function setDOMView() {
        let highscore = localStorage.getItem("highscore") || 0;
        $('#highscore').text("Highscore: " + highscore);
        $('.controls').show();
        $('.intro').hide();
        $thumbtack.show();
        $('.score').show();
        $('.highscore').show();
        $('#level').text("Level " + level)
        $('#left').text(textLeft);
        $('#right').text(textRight);
    }


    function startGame() {
        const arrTextR = [English1Right, Spanish1Right, French1Right];
        const arrTextL = [English1Left, Spanish1Left, French1Left];
        textLeft = arrTextL[level - 1];
        textRight = arrTextR[level - 1];
        setDOMView()
        setTimeout(showTime, 500);
        $balloon.addClass('moveballoonUp');
        $balloon.show();
    }


    function restart() {
        time = 41;
        level++;
        findHighscore();
        $balloon.attr('class', '')
        $checkBox.text("");
        score = 0;
        characterL = 0;
        characterR = 0;

        if (level === 4) {
            $('.controls').hide();
            $('.intro h1').text("You did it!");
            $('.intro').show();
            $balloon.show();
        } else {
            if (level === 2) {
                $thumbtack2.show();
            }
            if (level === 3) {
                $balloon.addClass('moveballoonUpQuicker')
                time = 31;
            }
            countdownInt = setInterval(countdown, 1000);
            startGame();
        }


    }

    function hideBalloon() {
        $balloon.hide()
    }

    //game flow

    let countdownInt = setInterval(countdown, 1000);

    $('#clickhere').on("click", function() {
        setInterval(checkCollision, 1000);
        startGame()
    })

    if (level > 1) {
        startGame();
    }


    $('body').keypress(function checkText(e) {
        if (e.which == textLeft.charCodeAt(characterL)) {
            $checkBox.append(String.fromCharCode(e.which));
            characterL++
            score++
            totalscore++
            $scoreNum.text("Score: " + totalscore);
        } else if (e.which == textRight.charCodeAt(characterR)) {
            $checkBox.append(String.fromCharCode(e.which));
            characterR++
            score++
            totalscore++
            $scoreNum.text("Score: " + totalscore);
        } else {
            $checkBox.effect("shake");
            if (totalscore > 0) {
                totalscore--
                $scoreNum.text("Score: " + totalscore);
            }
        }
    })

    function checkWinOrLose() {
        if (Lose()) {
            gameOver();
            findHighscore();
        }
        if (Win()) {
            if (score === textLeft.length) {

                $balloon.addClass('moveballoonLeft');
                // $balloon.removeClass('moveballoonUp');

            } else if (score === textRight.length) {

                $balloon.addClass('moveballoonRight');
                // $balloon.removeClass('moveballoonUp');

            }
            setTimeout(hideBalloon, 3000);
            $('.intro p').hide();
            $thumbtack.hide();
            $thumbtack2.hide();
            clearInterval(countdownInt);
            $('.intro h1').text("Nice floating!");
            $('.intro').show();
            setTimeout(restart, 3000);
        }
    }
})