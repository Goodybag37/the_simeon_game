var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedButton = [];
var level = 0;

console.log("code is running on the header");


function nextSequence(){


  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
  // Define a function to flash the button

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

// i have just deleted a function enclosing my fadeout code since i no longer need interval
// // Call the flashButton function repeatedly with a specified interval
// var flashingInterval = setInterval(flashButton, 2000); // Adjust the interval as needed (400 milliseconds in this example)
level++;

$("h1").text("level " + level);
}

console.log("code is running on the flash signal");



function playSound(){
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  // var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  // audio.play();
  $(".btn").on("click", function playClickedSound(){
    var userChosenColour = this.id;
    userClickedButton.push(userChosenColour);
    console.log(userClickedButton);
    var audio = new Audio("sounds/"+ userChosenColour +".mp3")
    audio.play();
    console.log("code is running when button is clicked ");
    $(this).addClass("pressed");
    setTimeout(function(){
      $("#"+userChosenColour).removeClass("pressed");
    }, 100)

    var indexed = userClickedButton.length - 1;

    checkAnswer(indexed);



  })
}

// function animatePress(currentColour){
//   $("btn").id = currentColour;
//   $("btn#" + currentColour).addClass("pressed")
// }
playSound();

$(document).on("keydown", function(){
  nextSequence();
  $("h1").text("level "+ level);

});

function checkAnswer(currentLevel){
      if (userClickedButton[currentLevel] === gamePattern[currentLevel]){
          if(userClickedButton.length === gamePattern.length){
            setTimeout(nextSequence, 1000);
            userClickedButton = [];
          }
      } else{
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        function remove(){
          $("body").removeClass("game-over");
        }
        setTimeout(remove, 300);
        $("h1").text("game over press any key to restart");
        startover();
      }
}

function startover(){
    level = 0;
    userClickedButton = [];
    userChosenColour = [];
    gamePattern = [];
}
