//Password generator

var lowercaseLetters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
var uppercaseLetters = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
var number = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
var specialXter = [ '~', '!', '@', '#', '$', '%', '&' '^', '*', '(', ')', '_', '+'];

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;  //returns a random number between min and max (both included):
}

function lengthOfeachInput (pswdlength, specialXter){
  if (specialXter === "Yes"){
    lowercaseLetters_length = minlengthofeachInput + pswdlength % 4;
    uppercaseLetters_length = getRndInteger(1, minlengthofeachInput);
    numbers_length = getRndInteger(1, minlengthofeachInput);
    specialXter_length = pswdlength - lowercaseLetters_length - uppercaseLetters_length - number_length;
  } else {
    lowercaseLetters_length = minlengthofeachInput + pswdlength % 3;
    uppercaseLetters_length = getRndInteger(1, minlengthofeachInput);
    numbers_length = pswdlength - lowercaseLetters_length - uppercaseLetters_length;
    specialXter_length = 0;
  }
}

/*Shuffle an array*/
Array.prototype.shuffle = function() {
    var input = this;

    for (var i = input.length-1; i >=0; i--) {
        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}

//a = 0; z = 25
function generateLowercaseLetters(){
  getNumber = "";
  lowercaseInput = [];
  for (i = 0; i < lowercaseLetters_length; i++) {
    getNumber = getRndInteger(0, 25);
    getLetter = lowercaseLetters[getNumber];
    lowercaseInput.push(getLetter);
  }

  return lowercaseInput.shuffle();
}

//A = 0; Z = 25
function generateUppercaseLetters(){
  getNumber = "";
  uppercaseInput = [];
  for (i = 0; i < uppercaseLetters_length; i++) {
    getNumber = getRndInteger(0, 25);
    getLetter = uppercaseLetters[getNumber];
    uppercaseInput.push(getLetter);
  }

  return uppercaseInput.shuffle();
}

function generateNumbers(){
  getNumber = "";
  numberInput = [];
  for (i = 0; i < numbers_length; i++) {
    getNumber = getRndInteger(0, 9);
    numberInput.push(getNumber);
  }

  return numberInput.shuffle();
}

function generateSpecialXters(){
  getNumber = "";
  specialXterInput = [];
  for (i = 0; i < specialXter_length; i++) {
    getNumber = getRndInteger(0, 12);
    getSpecialXter = specialXter[getNumber];
    specialXterInput.push(getSpecialXter);
  }

  return specialXterInput.shuffle();
}

var newPassword = document.getElementById("newPassword");
var pswdLengtherror = document.getElementById("pswdLengtherror");

function generatePassword(pswdlength, specialXter) {
  newPassword.innerHTML = "";
  mypswd_arr = [];

  lengthOfeachInput(pswdlength, specialXter);
  generateLowercaseLetters();
  generateUppercaseLetters();
  generateNumbers();

  for (i = 0; i < lowercaseLetters_length; i++) {
    mypswd_arr.push(lowercaseInput[i]);
  }

  for (i = 0; i < uppercaseLetters_length; i++) {
    mypswd_arr.push(uppercaseInput[i]);
  }

  for (i = 0; i < numbers_length; i++) {
    mypswd_arr.push(numberInput[i]);
  }

  if (specialXter_length > 0) {
    generateSpecialXters();

    for (i = 0; i < specialXter_length; i++) {
      mypswd_arr.push(specialXterInput[i]);
    }
  }

  mypswd_arr.shuffle();

  /* try this later see effect on performance
  for ( i = 0; i < 4; i++ ) {
    mypswd_arr.shuffle();
  }
  */

  //Turn mypswd_arr to a string, mypswd_str
  mypswd_str = "";
  for ( i = 0; i < mypswd_arr.length; i++ ) {
    mypswd_str += mypswd_arr[i];
  }

  newPassword.innerHTML = mypswd_str;
}
