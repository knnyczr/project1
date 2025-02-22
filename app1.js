let red = document.getElementById("circle1");
let green = document.getElementById("circle2");
let blue = document.getElementById("circle3");
let purple = document.getElementById("circle4");
let circleContainer = document.querySelector(".circles");
let allCircles = document.getElementsByClassName("circleButton");
let jsScore = document.getElementById("js-score");
let jsRound = document.getElementById("js-round");
let startButton = document.getElementById("start");
let lost = document.getElementById("youLost");
let resetBtn = document.getElementById('reset')
let simon = [];
let userInput = [];
let numberOfFlashes = 1;
let score = 0;
let round = 1;

// amke 4 functions that flash the colors
const flashRed = () => {
  red.style.opacity = 0.4;
  setTimeout(() => {
    red.style.opacity = 1;
  }, 500);
};

const flashGreen = () => {
  green.style.opacity = 0.4;
  setTimeout(() => {
    green.style.opacity = 1;
  }, 500);
};

const flashBlue = () => {
  blue.style.opacity = 0.4;
  setTimeout(() => {
    blue.style.opacity = 1;
  }, 500);
};

const flashPurple = () => {
  purple.style.opacity = 0.4;
  setTimeout(() => {
    purple.style.opacity = 1;
  }, 500);
};

// randomizer, the brains of simon, give you an order that has to be followed
// randomizer has to call the flash(s) functions in that order,

const simonArray = () => {
  simon.push(Math.floor(Math.random() * 4) + 1);
  for (let i = 0; i < numberOfFlashes; i++) {
    setTimeout(function() { // make this an ES6 IFFEs it's cleaner and looks better on your resume
      if (simon[i] == 1) {
        flashRed();
      } else if (simon[i] == 2) {
        flashGreen();
      } else if (simon[i] == 3) {
        flashBlue();
      } else if (simon[i] == 4) {
        flashPurple();
      }
    }, 1000 * i);

    //depending on the current round youre on make array longer
    // this makes it harder for the user to repeat
  }
};
const checkUserSequence = () => {
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] !== simon[i]) {
      console.log("in forloop for userseq");
      lost.innerText = "YOU LOST";
      userInput = [];
      simon = [];
      score = 0;
      jsScore.innerText = "Score: " + score;
      round = 0;
      jsRound.innerText = "Round: " + round;
      numberOfFlashes = 1;
      hasStarted = false;
      return;
    }
  }
  moveOn();
};

const moveOn = () => {
  userInput = [];
  score++;
  jsScore.innerText = "Score: " + score;
  round++;
  jsRound.innerText = "Round: " + round;
  numberOfFlashes++;
  startGame();
};

// a checker, that user is repeating that order(hint array comparison)
const userClicks = () => {
  for (let i = 0; i < allCircles.length; i++) {
    // make this an es6 IFFE
    allCircles[i].addEventListener("click", function(event) { 
      event.target.style.opacity = 0.4;
      setTimeout(() => {
        event.target.style.opacity = 1;
      }, 500);
      userInput.push(i + 1);
      if (userInput.length === simon.length) {
        checkUserSequence();
      }
    });
  }
};

const startGame = () => {
  let hasStarted = true;
  lost.innerText = "";
  jsRound.innerText = "Round: " + round;
  if (hasStarted) {
    simonArray();
  }
};
userClicks();

//start game
// push number in simon Array
// flash color
// get userinput
// if user matches simon Array, update score and round.
//     push another number in simon array and start process again

// score counter for every round
// restart button? clears the simon array?
//

startButton.addEventListener("click", startGame);
resetBtn.addEventListener('click', function(event){
  event.preventDefault();
  location.reload();
})
