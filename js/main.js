//Password generator
//"use strict";

var uppercaseLetters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
var lowercaseLetters = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
var number = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
var specialXter = [ '~', '!', '@', '#', '$', '%', '&', '^', '*', '(', ')', '_', '+'];

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;  //returns a random number between min and max (both included):
}

var minlengthofeachInput;

function minlength(pswdlength, nu) {
  spareLength = pswdlength % nu;

  if (spareLength === 0) {
    minlengthofeachInput = pswdlength / nu;
  } else {
    minlengthofeachInput = (pswdlength - spareLength) / nu;
  }
}


function lengthOfeachInput (pswdlength, specialXter){
  if (specialXter === "Yes"){
    minlength(pswdlength, 4);

    lowercaseLetters_length = minlengthofeachInput + spareLength;
    uppercaseLetters_length = getRndInteger(1, minlengthofeachInput);
    numbers_length = getRndInteger(1, minlengthofeachInput);
    specialXter_length = pswdlength - lowercaseLetters_length - uppercaseLetters_length - numbers_length;
  } else {
    minlength(pswdlength, 3);

    lowercaseLetters_length = minlengthofeachInput + spareLength;
    uppercaseLetters_length = getRndInteger(1, minlengthofeachInput);
    numbers_length = pswdlength - lowercaseLetters_length - uppercaseLetters_length;
    specialXter_length = 0;
  }
}

function shuffle(input) {
    var nu = input.length;
    var x = nu - 1;
    var newArray = [];

    for (var i = 0; i < nu; i++) {
        var index = getRndInteger(0, x)
        var letter = input[index];
        newArray.push(letter);
        input.splice(index, 1);
        x-=1;
    }

    return newArray;
}

//a = 0; z = 25
function generateLowercaseLetters(){
  getNumber = "";
  lowercaseInput = [];
  x = 25;  //number of alphabets, 26 - 1

  for (i = 0; i < lowercaseLetters_length; i++) {
    getNumber = getRndInteger(0, x);
    getLetter = lowercaseLetters[getNumber];
    lowercaseInput.push(getLetter);

    //Remove used letter from array to avoid repick
    lowercaseLetters.splice(getNumber, 1);
    x-=1;
  }

  lowercaseInput = shuffle(lowercaseInput);
  return lowercaseInput;
}

//A = 0; Z = 25
function generateUppercaseLetters(){
  getNumber = "";
  uppercaseInput = [];
  x = 25;  //number of alphabets, 26 - 1

  for (i = 0; i < uppercaseLetters_length; i++) {
    getNumber = getRndInteger(0, x);
    getLetter = uppercaseLetters[getNumber];
    uppercaseInput.push(getLetter);

    //Remove used letter from array to avoid repick
    uppercaseLetters.splice(getNumber, 1);
    x-=1;
  }

  //return uppercaseInput.shuffle();
  uppercaseInput = shuffle(uppercaseInput);
  return uppercaseInput;
}

function generateNumbers(){
  getNumber = "";
  numberInput = [];

  for (i = 0; i < numbers_length; i++) {
    getNumber = getRndInteger(0, 9);
    numberInput.push(getNumber);
  }

  //return numberInput.shuffle();
  numberInput = shuffle(numberInput);
  return numberInput;
}

// There are 13 special characters as listed above
function generateSpecialXters(){
  getNumber = "";
  specialXterInput = [];
  for (i = 0; i < specialXter_length; i++) {
    getNumber = getRndInteger(0, 12);
    getSpecialXter = specialXter[getNumber];
    specialXterInput.push(getSpecialXter);
  }

  //return specialXterInput.shuffle();
  specialXterInput = shuffle(specialXterInput);
  return specialXterInput;
}

function generatePassword(pswdlength, specialXter) {
  window.performance.mark("mark_start_generatePassword");   // User Timing API
  startTime = window.performance.now();

  document.getElementById("newPassword").innerHTML = "";
  pswdlength = document.getElementById("pswdlength").value;
  specialXter = document.getElementById("specialXter").value;
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

  //mypswd_arr = shuffle(mypswd_arr);

  /* try this later see effect on performance */
  for ( i = 0; i < 4; i++ ) {
    mypswd_arr = shuffle(mypswd_arr);
  }

  //Turn mypswd_arr to a string, mypswd_str
  mypswd_str = "";
  for ( i = 0; i < mypswd_arr.length; i++ ) {
    mypswd_str += mypswd_arr[i];
  }
/*
  document.getElementById("newPassword").innerHTML = mypswd_str;
  document.getElementById("generatePassword").disabled = true;

  window.performance.mark("mark_end_generatePassword");
  window.performance.measure("measure_generatePassword", "mark_start_generatePassword", "mark_end_generatePassword");
  var timeToGenerate = window.performance.getEntriesByName("measure_generatePassword");
  /*
  console.log("Time to generate password: " + timeToGenerate[timeToGenerate.length-1].duration + "ms");
*/
  stopTime = window.performance.now();
  spentTime = stopTime - startTime;
  console.log(startTime, stopTime, spentTime);
}

