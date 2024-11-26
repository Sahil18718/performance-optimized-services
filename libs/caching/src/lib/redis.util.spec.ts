import { connectToRedis, setCache, getCache } from './redis.util';

describe('Redis Caching Utilities', () => {
  beforeAll(async () => {
    await connectToRedis();
  });

  it('should set and get a value in Redis', async () => {
    const key = 'test-key';
    const value = { message: 'Hello, Redis!' };

    await setCache(key, value, 60);
    const cachedValue = await getCache(key);

    expect(cachedValue).toEqual(value);
  });

  afterAll(async () => {
    const client = (await import('./redis.util')).default;
    await client.quit();
  });
});
