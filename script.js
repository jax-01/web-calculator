let num1;
let num2;
let operator;
let displayValue = "0"; // variable that will store the current value shown in the display
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