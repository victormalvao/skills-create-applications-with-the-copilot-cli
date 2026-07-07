#!/usr/bin/env node

/**
 * Supported operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 * - modulo
 * - power
 * - squareRoot
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

function modulo(a, b) {
  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error("Cannot calculate square root of a negative number.");
  }
  return Math.sqrt(n);
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
    case "mod":
    case "%":
    case "modulo":
      return modulo(a, b);
    case "pow":
    case "^":
    case "power":
      return power(a, b);
    case "sqrt":
    case "squareRoot":
      return squareRoot(a);
    default:
      throw new Error(
        "Unknown operation. Use add|sub|mul|div|mod|pow|sqrt or +|-|*|/|%|^."
      );
  }
}

function runCli(argv) {
  const [operation, left, right] = argv;

  if (!operation || left === undefined) {
    console.log("Usage: node src/calculator.js <operation> <a> [b]");
    console.log("Examples:");
    console.log("  node src/calculator.js add 7 5");
    console.log("  node src/calculator.js sqrt 25");
    process.exitCode = 1;
    return;
  }

  const a = Number(left);
  if (Number.isNaN(a)) {
    throw new Error("Operand a must be a valid number.");
  }

  const sqrtOperation = operation === "sqrt" || operation === "squareRoot";
  let result;

  if (sqrtOperation) {
    result = calculate(operation, a);
  } else {
    if (right === undefined) {
      throw new Error("Operation requires two operands.");
    }

    const b = Number(right);
    if (Number.isNaN(b)) {
      throw new Error("Operand b must be a valid number.");
    }
    result = calculate(operation, a, b);
  }

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
  modulo,
  power,
  squareRoot,
  calculate,
};
