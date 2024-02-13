import { InsufficientFundsError, TransferFailedError, getBankAccount } from '.';

const INITIAL_VALUE = 100;
const WRONG_VALUE = 1000;
const CORRECT_VALUE = 90;
const account = getBankAccount(INITIAL_VALUE);
const anotherAccount = getBankAccount(INITIAL_VALUE);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(INITIAL_VALUE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(WRONG_VALUE)).toThrowError(
      new InsufficientFundsError(account.getBalance()),
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(WRONG_VALUE, anotherAccount)).toThrowError(
      new InsufficientFundsError(account.getBalance()),
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(WRONG_VALUE, account)).toThrowError(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    expect(account.deposit(INITIAL_VALUE).getBalance()).toBe(
      account.getBalance(),
    );
  });

  test('should withdraw money', () => {
    expect(account.withdraw(INITIAL_VALUE).getBalance()).toBe(
      account.getBalance(),
    );
  });

  test('should transfer money', () => {
    const initialBalance = anotherAccount.getBalance();
    account.transfer(CORRECT_VALUE, anotherAccount);
    expect(anotherAccount.getBalance()).toBe(initialBalance + CORRECT_VALUE);
  });

  // test('fetchBalance should return number in case if request did not failed', async () => {
  //   // Write your tests here
  // });

  // test('should set new balance if fetchBalance returned number', async () => {
  //   // Write your tests here
  // });

  // test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
  //   // Write your tests here
  // });
});
