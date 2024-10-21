import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const values1 = [1, 2, 3];
  const values2 = ['a', 'b', 'c'];

  const expectedList = {
    next: {
      next: {
        next: {
          next: null,
          value: null,
        },
        value: 3,
      },
      value: 2,
    },
    value: 1,
  };

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const rersult = generateLinkedList(values1);
    expect(rersult).toStrictEqual(expectedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(values2);
    expect(result).toMatchSnapshot();
  });
});
