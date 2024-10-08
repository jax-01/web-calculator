let num1 = null;
let num2 = null;
let operator = null;
let displayValue = "0"; // holds the value that will be shown in the display
let shouldClearDisplay = false;
let decimalUsed = false;
const decimalButton = document.querySelector(".button[data-decimal]");
const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".button");

function updateDisplay() {
  display.textContent = displayValue;
}

const operate = function(operator, num1, num2) {
  const firstVal = parseFloat(num1);
  const secondVal = parseFloat(num2);
  switch (operator) {
    case "+":
      return add(firstVal, secondVal);
    case "-":
      return subtract(firstVal, secondVal);
    case "x":
      return multiply(firstVal, secondVal);
    case "/":
      return divide(firstVal, secondVal);
    default:
      return;
  }
};

const add = function(num1, num2) {
  return num1 + num2;
};

const subtract = function(num1, num2) {
  return num1 - num2;
};

const multiply = function(num1, num2) {
  return num1 * num2;
};

const divide = function(num1, num2) {
  if (num2 == 0) throw new Error("Division by zero is not allowed");
  return num1 / num2;
};

buttons.forEach(button => {
  // get the button clicked
  const buttonText = button.textContent;
  // check if it is a number button
  if (!isNaN(buttonText)) {
    button.addEventListener("click", () => {
      if (shouldClearDisplay) {
        displayValue = buttonText;
        shouldClearDisplay = false;
        decimalUsed = false;              // allow decimal button again when a new number starts
        decimalButton.disabled = false;   // enable the decimal button
      } else {
        displayValue = displayValue === "0" ? buttonText : displayValue + buttonText;
      }
      updateDisplay();
    });
  } else if (buttonText === ".") {
    button.addEventListener("click", () => {
      if (!decimalUsed) {
        displayValue += buttonText;
        decimalUsed = true;             // the decimal button is used
        decimalButton.disabled = true;  // disable the decimal button
        updateDisplay();
      }
    });
  } else if (buttonText === "C") {  // Clear button
    button.addEventListener("click", () => {
      displayValue = "0";
      num1 = null;
      num2 = null;
      operator = null;
      shouldClearDisplay = false;
      decimalUsed = false;              // reset decimal flag
      decimalButton.disabled = false;   // enable the decimal button again
      updateDisplay();
    });
  } else if (buttonText === "=") {  // Equal sign button
    button.addEventListener("click", () => {
      if (operator === null || num1 === null) return;

      num2 = displayValue;
      displayValue = operate(operator, num1, num2);
      updateDisplay();
      num1 = null;
      num2 = null;
      operator = null;
      decimalUsed = false;              // reset decimal flag
      decimalButton.disabled = false;   // enable the decimal button again
    });
  } else if (buttonText === "+/-") {
    button.addEventListener("click", () => {
      displayValue = displayValue === "0" ? "0" : parseFloat(displayValue) * -1;
      // displayValue = parseFloat(displayValue) * -1;
      updateDisplay();
    });
  } else if (buttonText === "%") {
    button.addEventListener("click", () => {
      displayValue = Number(Math.round((parseFloat(displayValue) / 100)+'e10')+'e-10');
      updateDisplay();
    });
  } else {  // Operators button
    button.addEventListener("click", () => {
      // check if there are more than 1 pair
      if (operator !== null && num1 !== null) {
        num2 = displayValue;
        displayValue = operate(operator, num1, num2);
        updateDisplay();
        num1 = displayValue;  // the result becomes the new num1
      } else {
        num1 = displayValue;
      }
      operator = buttonText;
      shouldClearDisplay = true;      // clear the display for the next number
      decimalUsed = false;            // allow the use of decimal again after an operator is clicked
      decimalButton.disabled = false; // enable the decimal butto again
    });
  }
});