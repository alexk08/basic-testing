import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import { existsSync } from 'fs';

const TIMEOUT = 1000;
const INTERVAL = 1000;
const SINGLE_CALL = 1;
const MULTIPLE_CALLS = 5;
const PATH_TO_FILE = 'pathToFile';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');

    const cb = jest.fn();
    doStuffByTimeout(cb, TIMEOUT);
    expect(setTimeout).toHaveBeenCalledWith(cb, TIMEOUT);
  });

  test('should call callback only after timeout', () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');

    const cb = jest.fn();
    doStuffByTimeout(cb, TIMEOUT);

    expect(cb).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(cb).toHaveBeenCalled();
    expect(cb).toHaveBeenCalledTimes(SINGLE_CALL);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');

    const cb = jest.fn();
    doStuffByInterval(cb, INTERVAL);
    expect(setInterval).toHaveBeenCalledWith(cb, INTERVAL);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');

    const cb = jest.fn();
    doStuffByInterval(cb, INTERVAL);

    expect(cb).not.toHaveBeenCalled();

    for (let i = 0; i < MULTIPLE_CALLS; i++) {
      jest.runOnlyPendingTimers();
    }

    expect(cb).toHaveBeenCalledTimes(MULTIPLE_CALLS);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const mockedJoin = jest.spyOn(path, 'join');
    await readFileAsynchronously(PATH_TO_FILE);

    expect(mockedJoin.mock.calls[0]?.[1]).toEqual(PATH_TO_FILE);
  });

  test('should return null if file does not exist', async () => {
    jest.fn(existsSync).mockReturnValueOnce(false);
    expect(readFileAsynchronously(PATH_TO_FILE)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
