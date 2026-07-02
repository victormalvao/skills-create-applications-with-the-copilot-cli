const {
  addition,
  subtraction,
  multiplication,
  division,
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
});

describe("calculate dispatcher", () => {
  test("supports operation aliases", () => {
    expect(calculate("add", 7, 8)).toBe(15);
    expect(calculate("-", 7, 8)).toBe(-1);
    expect(calculate("multiplication", 3, 4)).toBe(12);
    expect(calculate("/", 20, 4)).toBe(5);
  });

  test("throws on unknown operation", () => {
    expect(() => calculate("noop", 1, 1)).toThrow(
      "Unknown operation. Use add|sub|mul|div or +|-|*|/."
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
});
