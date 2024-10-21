import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

const baseURL = 'https://jsonplaceholder.typicode.com';
const path = '/users';
const mockResponse = {
  data: {
    users: [
      {
        name: 'John',
        surname: 'Doe',
        age: 28,
      },
    ],
  },
};

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());
  beforeEach(() => jest.runOnlyPendingTimers());
  afterEach(() => jest.clearAllMocks());

  test('should create instance with provided base url', async () => {
    const mocked = jest.spyOn(axios, 'create').mockReturnValue({
      get: jest.fn().mockReturnValue(mockResponse),
    } as unknown as AxiosInstance);
    await throttledGetDataFromApi(path);
    expect(mocked).lastCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const mockedGet = jest.fn().mockReturnValue(mockResponse);
    jest.spyOn(axios, 'create').mockReturnValue({
      get: mockedGet,
    } as unknown as AxiosInstance);
    await throttledGetDataFromApi(path);
    expect(mockedGet).lastCalledWith(path);
  });

  test('should return response data', async () => {
    jest.spyOn(axios, 'create').mockReturnValue({
      get: jest.fn().mockReturnValue(mockResponse),
    } as unknown as AxiosInstance);
    const data = await throttledGetDataFromApi(path);
    expect(data).toBe(mockResponse.data);
  });
});
