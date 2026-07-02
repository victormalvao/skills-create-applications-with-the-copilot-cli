const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
  calculate,
} = require("../calculator");

describe("calculator basic operations", () => {
  test("addition works with image example: 2 + 3 = 5", () => {
    expect(addition(2, 3)).toBe(5);
  });

  test("subtraction works with image example: 10 - 4 = 6", () => {
    expect(subtraction(10, 4)).toBe(6);
  });

  test("multiplication works with image example: 45 * 2 = 90", () => {
    expect(multiplication(45, 2)).toBe(90);
  });

  test("division works with image example: 20 / 5 = 4", () => {
    expect(division(20, 5)).toBe(4);
  });

  test("modulo with image example: 5 % 2 = 1", () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test("power with image example: 2 ^ 3 = 8", () => {
    expect(power(2, 3)).toBe(8);
  });

  test("square root with image example: sqrt(16) = 4", () => {
    expect(squareRoot(16)).toBe(4);
  });
});

describe("extended operations", () => {
  test("modulo returns 0 when dividend is evenly divisible", () => {
    expect(modulo(10, 5)).toBe(0);
  });

  test("power supports zero exponents", () => {
    expect(power(9, 0)).toBe(1);
  });

  test("squareRoot of zero returns zero", () => {
    expect(squareRoot(0)).toBe(0);
  });
});

describe("calculate dispatcher", () => {
  test("supports operation aliases", () => {
    expect(calculate("add", 7, 8)).toBe(15);
    expect(calculate("-", 7, 8)).toBe(-1);
    expect(calculate("multiplication", 3, 4)).toBe(12);
    expect(calculate("/", 20, 4)).toBe(5);
    expect(calculate("%", 10, 4)).toBe(2);
    expect(calculate("^", 2, 4)).toBe(16);
    expect(calculate("sqrt", 81)).toBe(9);
  });

  test("throws on unknown operation", () => {
    expect(() => calculate("noop", 1, 1)).toThrow(
      "Unknown operation. Use add|sub|mul|div|mod|pow|sqrt or +|-|*|/|%|^."
    );
  });
});

describe("edge cases", () => {
  test("division by zero throws an error", () => {
    expect(() => division(10, 0)).toThrow("Cannot divide by zero.");
  });

  test("division handles negative numbers", () => {
    expect(division(-20, 5)).toBe(-4);
    expect(division(20, -5)).toBe(-4);
  });

  test("squareRoot throws for negative numbers", () => {
    expect(() => squareRoot(-1)).toThrow(
      "Cannot calculate square root of a negative number."
    );
  });

  test("modulo by zero follows JavaScript remainder behavior", () => {
    expect(modulo(5, 0)).toBeNaN();
  });
});
