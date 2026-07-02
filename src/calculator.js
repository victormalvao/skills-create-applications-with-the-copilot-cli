#!/usr/bin/env node

/**
 * Supported operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 */

function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero.");
  }
  return a / b;
}

function calculate(operation, a, b) {
  switch (operation) {
    case "add":
    case "+":
    case "addition":
      return addition(a, b);
    case "sub":
    case "-":
    case "subtraction":
      return subtraction(a, b);
    case "mul":
    case "*":
    case "multiplication":
      return multiplication(a, b);
    case "div":
    case "/":
    case "division":
      return division(a, b);
    default:
      throw new Error("Unknown operation. Use add|sub|mul|div or +|-|*|/.");
  }
}

function runCli(argv) {
  const [operation, left, right] = argv;

  if (!operation || left === undefined || right === undefined) {
    console.log("Usage: node src/calculator.js <operation> <a> <b>");
    console.log("Example: node src/calculator.js add 7 5");
    process.exitCode = 1;
    return;
  }

  const a = Number(left);
  const b = Number(right);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error("Both operands must be valid numbers.");
  }

  const result = calculate(operation, a, b);
  console.log(result);
}

if (require.main === module) {
  try {
    runCli(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
};
