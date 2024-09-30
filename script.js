let num1 = null;
let num2 = null;
let operator = null;
let displayValue = "0"; // holds the value that will be shown in the display
let shouldClearDisplay = false;
const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".button");

function updateDisplay() {
  display.textContent = displayValue;
}

const operate = function(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
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
  // check if it is a number button or a decimal point
  if (!isNaN(buttonText) || buttonText === ".") {
    button.addEventListener("click", () => {
      if (shouldClearDisplay) {
        displayValue = buttonText;
        shouldClearDisplay = false;
      } else {
        displayValue = displayValue === "0" ? buttonText : displayValue + buttonText;
      }
      updateDisplay();
    });
  } else if (buttonText === "C") {  // Clear button
    button.addEventListener("click", () => {
      displayValue = "0";
      num1 = null;
      num2 = null;
      operator = null;
      shouldClearDisplay = false;
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
      shouldClearDisplay = true;  // clear the display for the next number
    });
  }
});