var buttonColours = ["red", "green", "blue", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
let isPressed = false;
    
$(document).keydown(function (e) {
    if (e.key === "a"){
        if (!isPressed) {
            isPressed = true;
            nextSequence();
        }
    }
    
});
    
$(".btn").click(function () {
    var chosencolour = $(this).attr("id");
    userClickedPattern.push(chosencolour);

    animatePress(chosencolour);
    playSound(chosencolour);
    checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
    
    $("h1").html("Level " + level);

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomColourChosen = buttonColours[randomNumber];

    gamePattern.push(randomColourChosen);

    $("#" + randomColourChosen).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColourChosen);

    level++;
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
        
    }
    else {
        $("body").addClass("game-over")
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").html("Press any key to Restart!");
        startOver();
    }
}

function animatePress(currentColor) {
    $("#" + currentColor).click(function() {
        $("#" + currentColor).addClass("pressed");
        setTimeout(function () {
            $("#" + currentColor).removeClass("pressed");
        }, 100);
    });

}

function playSound(name) {
    var colorAudio = new Audio("sounds/" + name + ".mp3");
    colorAudio.play();
}

function startOver() {
    gamePattern = [];
    isPressed = false;
    level = 0;
}
