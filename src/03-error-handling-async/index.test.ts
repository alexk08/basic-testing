import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const RESOLVED_TEXT = 'Some awesome text';
    return expect(resolveValue(RESOLVED_TEXT)).resolves.toBe(RESOLVED_TEXT);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const MSG = 'Error message';
    expect(() => {
      throwError(MSG);
    }).toThrow(MSG);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => {
      throwError();
    }).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => {
      throwCustomError();
    }).toThrow(new MyAwesomeError().message);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    return expect(rejectCustomError()).rejects.toThrow(
      new MyAwesomeError().message,
    );
  });
});
