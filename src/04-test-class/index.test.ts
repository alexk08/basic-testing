import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import lodash from 'lodash';

const INITIAL_VALUE = 100;
const WRONG_VALUE = 1000;
const CORRECT_VALUE = 90;
const FETCHED_BALANCE = 75;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(INITIAL_VALUE);
    expect(account.getBalance()).toBe(INITIAL_VALUE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(INITIAL_VALUE);
    expect(() => account.withdraw(WRONG_VALUE)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(INITIAL_VALUE);
    const anotherAccount = getBankAccount(INITIAL_VALUE);

    expect(() => account.transfer(WRONG_VALUE, anotherAccount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(INITIAL_VALUE);
    expect(() => account.transfer(WRONG_VALUE, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const account = getBankAccount(INITIAL_VALUE);
    expect(account.deposit(CORRECT_VALUE).getBalance()).toBe(
      INITIAL_VALUE + CORRECT_VALUE,
    );
  });

  test('should withdraw money', () => {
    const account = getBankAccount(INITIAL_VALUE);
    expect(account.withdraw(CORRECT_VALUE).getBalance()).toBe(
      INITIAL_VALUE - CORRECT_VALUE,
    );
  });

  test('should transfer money', () => {
    const account = getBankAccount(INITIAL_VALUE);
    const anotherAccount = getBankAccount(INITIAL_VALUE);
    account.transfer(CORRECT_VALUE, anotherAccount);

    expect(anotherAccount.getBalance()).toBe(INITIAL_VALUE + CORRECT_VALUE);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(INITIAL_VALUE);
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(FETCHED_BALANCE)
      .mockReturnValueOnce(1);

    const fetchedBalance = await account.fetchBalance();

    expect(typeof fetchedBalance === 'number').toBeTruthy();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(INITIAL_VALUE);
    jest
      .spyOn(account, 'fetchBalance')
      .mockReturnValue(Promise.resolve(FETCHED_BALANCE));
    await account.synchronizeBalance();

    expect(account.getBalance()).toEqual(FETCHED_BALANCE);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', () => {
    const account = getBankAccount(INITIAL_VALUE);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    expect(() => account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
