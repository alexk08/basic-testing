import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  const voidFn = () => {
    return;
  };

  return {
    ...originalModule,
    mockOne: voidFn,
    mockTwo: voidFn,
    mockThree: voidFn,
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const spy = jest.spyOn(global.console, 'log');

    mockOne();
    mockTwo();
    mockThree();
    expect(spy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const spy = jest.spyOn(global.console, 'log');

    unmockedFunction();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
