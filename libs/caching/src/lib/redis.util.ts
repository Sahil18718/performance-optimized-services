import { createClient } from 'redis';

export const client = createClient({
  url: 'redis://localhost:6379',
});

client.on('error', (err) => console.error('Redis Client Error', err));

export const connectToRedis = async () => {
  await client.connect();
  console.log('Connected to Redis');
};

export const setCache = async (key: string, value: any, ttl: number = 3600) => {
  await client.set(key, JSON.stringify(value), {
    EX: ttl,
  });
};

export const getCache = async (key: string) => {
  const data = await client.get(key);
  return data ? JSON.parse(data) : null;
};

export default client;
