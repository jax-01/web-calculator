let num1;
let num2;
let operator;

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