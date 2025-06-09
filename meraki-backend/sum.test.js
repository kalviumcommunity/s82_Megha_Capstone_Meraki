const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('adds negative numbers correctly', () => {
  expect(sum(-1, -1)).toBe(-2);
});

test('adds zero correctly', () => {
  expect(sum(0, 5)).toBe(5);
});

test('adds floating point numbers correctly', () => {
  expect(sum(0.1, 0.2)).toBeCloseTo(0.3); // toBeCloseTo for float precision
});

test('adds large numbers correctly', () => {
  expect(sum(1000000, 2000000)).toBe(3000000);
});
