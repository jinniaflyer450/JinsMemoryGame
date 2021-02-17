const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    //Add the class facedown to display the back of the card before it is clicked.
    newDiv.classList.add('faceDown');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let firstCard = true;
let secondCard = true;
let matchCounter = 0;
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if(event.target.classList.contains('faceDown') && firstCard){
    event.target.classList.remove('faceDown')
    event.target.setAttribute('id', 'firstCard');
    firstCard = false;
  }
  else if(event.target.classList.contains('faceDown') && secondCard){
    event.target.classList.remove('faceDown');
    event.target.setAttribute('id', 'secondCard')
    secondCard = false
    if(document.querySelector('#firstCard').classList.value === document.querySelector('#secondCard').classList.value){
      console.log("Match!")
      document.querySelector('#firstCard').removeAttribute('id', 'firstCard');
      document.querySelector('#secondCard').removeAttribute('id', 'secondCard');
      firstCard = true;
      secondCard = true;
      matchCounter++
      if(matchCounter >= (COLORS.length)/2){
        console.log("YOU WON!")
      }
    }
    else{
      console.log("Not a match!")
      setTimeout(function(){
        document.querySelector('#firstCard').classList.add('faceDown');
        document.querySelector('#secondCard').classList.add('faceDown');
        document.querySelector('#firstCard').removeAttribute('id', 'firstCard');
        document.querySelector('#secondCard').removeAttribute('id', 'secondCard');
        firstCard = true;
        secondCard = true;
      }, 1000)
    }
  }
  else{}
}

// when the DOM loads
createDivsForColors(shuffledColors);
