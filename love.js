var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor = [];
var gamePattern = [];
var useClickedPattern = [];
var randomNumber;
var gameStarted = false;
var level = 0;

// check đK tương tác vs trình duyệt (nhấn phím để start game)
$("#buttonplay").on("click", function () {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
    $("#section1").hide();
    $("#section2").show();
  }
});

// create new color random
function nextSequence() {
  if (level === 15) {
    winGame();
    return;
  }

  useClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(300)
    .fadeIn(500);

  playSound(randomChosenColor);
}

// play sound
function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}
// Detect event "click" on color button
var btn_1 = $(".btn");
for (var i = 0; i < btn_1.length; i++) {
  btn_1[i].addEventListener("click", function () {
    useClickedPattern.push(this.id);
    playSound(this.id);
    animatePress(this.id);
    checkAnswer(useClickedPattern.length - 1);
  });
}

// Animation when click button
function animatePress(currentColor) {
  var activeKey = $("." + currentColor);
  activeKey.addClass("pressed");

  setTimeout(function () {
    activeKey.removeClass("pressed");
  }, 100);
}

// check answers
function checkAnswer(currentlevel) {
  if (useClickedPattern[currentlevel] === gamePattern[currentlevel]) {
    console.log("*_success");
    if (useClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 700);
    }
  } else {
    console.log("x_wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Thua Oiii :>");
    startOver();
  }
}

//Win game

var winSounds = ["win1.mp3", "win2.mp3", "win3.mp3", "win4.mp3", "win5.mp3"];

function winGame() {
  var randomIndex = Math.floor(Math.random() * winSounds.length);
  var winSound = new Audio("sounds/playlist/" + winSounds[randomIndex]);
  winSound.play();

  $(".container").hide();
  $("#end").fadeIn(1000);
  startOver();
}

//Reset Game
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
