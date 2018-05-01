/*--------------------------------------------------
        CALCULATOR FUNCTIONS
----------------------------------------------------*/
var display = document.querySelector("#display");
var maxDecimalPlaces = 5;
var displayMaxLength = 60;

/*
lastChar = last character in display
expression = the entire string in the display
expressionArr = expression converted to an array.
                Split points are between each number and math operator
  e.g.  If expression = '1 + 2 - 3 x 4 / 5'
        Then expressionArr = ['1', '+', '2', '-', '3', 'x', '4', '/', '5'];
*/

function number(btnInput) {
  if (display.value.length < displayMaxLength) {
    display.value = display.value + btnInput;
  }

  display.scrollTop = display.scrollHeight 

}

function del() {
  var lastChar = display.value[display.value.length - 1];
  if (lastChar === " ") {
    display.value = display.value.substring(0, display.value.length - 3);
  } else {
    display.value = display.value.substring(0, display.value.length - 1);
  }
}

function ac() {
  display.value = "";
}

function operator(mathOperator) {
  //If last char entered is not a number, then delete last char
  var lastChar = display.value[display.value.length - 1];
  if (lastChar === ".") {
    display.value = display.value.substring(0, display.value.length - 1);
  } else if (lastChar === " ") {
    display.value = display.value.substring(0, display.value.length - 3);
  }

  switch (mathOperator) {
    case "add":
      display.value = display.value + " + ";
      break;
    case "subtract":
      display.value = display.value + " - ";
      break;
    case "multiply":
      display.value = display.value + " x ";
      break;
    case "divide":
      display.value = display.value + " / ";
      break;
  }
}

function equals() {
  var lastChar = display.value[display.value.length - 1];

  if (lastChar !== " ") {
    var expressionArr = display.value.split(" ");
    var solution = compute(expressionArr);
    solution = solution.toFixed(maxDecimalPlaces);
    solution = parseFloat(solution); //parseFloat gets rid of trailing zeros
    display.value = solution;

    function compute(expressionArr) {
      //Recursive function exit condition
      if (expressionArr.length === 1) {
        return expressionArr[0];
      }

      /*
    Evaluate expression by order of operations:
    Muliplication/Division from left to right
    Addition/subtraction from left to right
    */

      var var1;
      var var2;
      var var3;
      var operatorIndex;

      //Find first instance of x or /
      if (expressionArr.includes("x") || expressionArr.includes("/")) {
        var1;
        var2;
        var3;

        //Multiplication and division
        operatorIndex = expressionArr.findIndex(function (element) {
          return element === "x" || element === "/";
        });

        var1 = expressionArr[operatorIndex - 1];
        var2 = expressionArr[operatorIndex + 1];

        switch (expressionArr[operatorIndex]) {
          case "x":
            var3 = parseFloat(var1) * parseFloat(var2);
            break;
          case "/":
            var3 = parseFloat(var1) / parseFloat(var2);
            break;
        }

        expressionArr[operatorIndex - 1] = var3;
        expressionArr.splice(operatorIndex, 1);
        expressionArr.splice(operatorIndex, 1);
        return compute(expressionArr);
      }

      //Addition and subtraction
      if (expressionArr.includes("+") || expressionArr.includes("-")) {
        var1;
        var2;
        var3;
        operatorIndex = expressionArr.findIndex(function (element) {
          return element === "+" || element === "-";
        });

        var1 = expressionArr[operatorIndex - 1];
        var2 = expressionArr[operatorIndex + 1];

        switch (expressionArr[operatorIndex]) {
          case "+":
            var3 = parseFloat(var1) + parseFloat(var2);
            break;
          case "-":
            var3 = parseFloat(var1) - parseFloat(var2);
            break;
        }

        expressionArr[operatorIndex - 1] = var3;
        expressionArr.splice(operatorIndex, 1);
        expressionArr.splice(operatorIndex, 1);
        return compute(expressionArr);
      }
    }
  }
}

function decimal() {
  var expressionArr = display.value.split(" ");
  var lastNum = expressionArr[expressionArr.length - 1];
  var lastChar = lastNum[lastNum.length - 1];

  if (!lastNum.includes(".")) {
    //Prevents user form inputting something like 1232.232.1534
    switch (lastChar) {
      case undefined: //Calculator display is blank
        display.value = display.value + "0.";
        break;
      case " ": //Last input was a math operator
        display.value = display.value + "0.";
        break;
      default: //Last input was a number
        display.value = display.value + ".";
        break;
    }
  } else if (lastNum.includes(".")) { //Allows decimal button to toggle the display of '.'
    if (lastChar === ".") {
      display.value = display.value.substring(0, display.value.length - 1);
    }
  }
}

function negate() {
  //get last'block'
  var expression;
  var expressionArr = display.value.split(" ");
  var lastNum = expressionArr[expressionArr.length - 1];

  if (lastNum[0] !== "-") {
    lastNum = "-" + lastNum;
    expressionArr[expressionArr.length - 1] = lastNum;
    expression = expressionArr.join(" ");
    display.value = expression;
  } else if (lastNum[0] === "-") {
    lastNum = lastNum.substring(1);
    expressionArr[expressionArr.length - 1] = lastNum;
    expression = expressionArr.join(" ");
    display.value = expression;
  }
}

var isLouise = false;
var display = document.querySelector('#display');

function toggleLouise() {
  switch (isLouise) {
    case false:
      isLouise = true;
      display.classList.add('louise');
      break;
    case true:
      isLouise = false;
      display.classList.remove('louise');
      break;
  }
}