import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 3, action: Action.Subtract, expected: 7 },
  { a: 10, b: 3, action: Action.Multiply, expected: 30 },
  { a: 12, b: 3, action: Action.Divide, expected: 4 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 5, b: 5, action: 'wrong action', expected: null },
  { a: {}, b: 'dmsklf', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  describe.each(testCases)('$a $action $b', ({ expected, ...input }) => {
    test(`returns ${expected}`, () => {
      const result = simpleCalculator(input);
      expect(result).toBe(expected);
    });
  });
});
