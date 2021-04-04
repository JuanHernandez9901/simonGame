// -------------------------------------------------- variables ---------------------------------------------------

var playing = false; 
var currentLevel = 1;
var pattern = [];
var i = 0;

// -------------------------------------------------- Functions --------------------------------------------------

//Generate next pattern
function nextPattern() {
    //Color Dictionary: green 0, red 1, blue 2, yellow 3
    return Math.floor(Math.random() * 4);
}

//Show animation of the next pattern
function buttonAnimation(color) {
    switch (color) {
        case 0:
            $("#green").fadeToggle(100).fadeToggle(100);
            break;

        case 1:
            $("#red").fadeToggle(100).fadeToggle(100);
            break;

        case 2:
            $("#blue").fadeToggle(100).fadeToggle(100);
            break;

        case 3:
            $("#yellow").fadeToggle(100).fadeToggle(100);
            break;

        default:
            console.log("showNextPattern went wrong")
            break;
    }
}

function playSound(color) {
    //Color Dictionary: green 0, red 1, blue 2, yellow 3
    if (playing) {
        switch (color) {
            case 0:
                var sound = new Audio("sounds/green.mp3");
                sound.play();
                break;

            case 1:
                var sound = new Audio("sounds/red.mp3");
                sound.play();
                break;

            case 2:
                var sound = new Audio("sounds/blue.mp3");
                sound.play();
                break;

            case 3:
                var sound = new Audio("sounds/yellow.mp3");
                sound.play();
                break;

            default:
                console.log("playSound went wrong")
                break;
        }
    } else {
        var sound = new Audio("sounds/wrong.mp3");
        sound.play();
    }
}

//Change Header
function changeHeader() {
    if (!playing) {
        $("h1").text("Game Over, Press Any Key to Restart");
    } else {
        $("h1").text("level " + currentLevel);
    }
}

// Check the answer
function checkAnswer(color, position) {
    if (color !== pattern[position]) {
        playing = false;
    }
}

// Translate from color to number
function colorToNumber(color) {

    switch (color) {
        case "green":
            return 0;
            break;

        case "red":
            return 1;
            break;

        case "blue":
            return 2;
            break;

        case "yellow":
            return 3;
            break;

        default:
            console.log("checkAnswer returned " + e.currentTarget.id)
            break;
    }

}
// --------------------------------------------------- Behavoir ---------------------------------------------------

//start
$(document).on("keydown", function (e) {
    if (!playing) {
        playing = true;

        changeHeader();
        pattern.push(nextPattern());
        buttonAnimation(pattern[pattern.length - 1]);
        playSound(pattern[pattern.length - 1]);

    }
});


$(".btn").on("click", function (e) {
    var color = colorToNumber(e.currentTarget.id);
    checkAnswer(color, i);
    playSound(color);
    buttonAnimation(color);
    i++;

    if (!playing) {
        changeHeader();
        currentLevel = 1;
        pattern = [];
        i = 0;

    } else if (i == pattern.length) {
        i = 0;
        currentLevel++;
        changeHeader();

        setTimeout(function () {
            pattern.push(nextPattern());
            buttonAnimation(pattern[pattern.length - 1]);
            playSound(pattern[pattern.length - 1]);
        }, 800);
    }
});