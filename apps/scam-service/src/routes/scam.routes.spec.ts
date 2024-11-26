import request from 'supertest';
import express from 'express';
import scamRoutes from './scam.routes';
import { connectToDatabase, mongoose } from '@performance-optimized-services/shared-db';
import { connectToRedis, client } from '@performance-optimized-services/caching'; // Correct imports
import { Scam } from '../models/scam.model';

const app = express();
app.use(express.json());
app.use('/scam', scamRoutes);

describe('/scam-status Endpoint', () => {
  beforeAll(async () => {
    await connectToDatabase('mongodb://localhost:27017/test_db'); // Use a test DB
    await connectToRedis();
  });

  beforeEach(async () => {
    await Scam.deleteMany(); // Clear test data
    await Scam.create({ type: 'phone', value: '1234567890', details: 'Test scam', reportsCount: 5 });
  });

  afterAll(async () => {
    await Scam.deleteMany();
    await client.quit(); // Close Redis client
    await mongoose.connection.close(); // Close MongoDB connection
  });

  it('should return scam status for a flagged value', async () => {
    const response = await request(app).get('/scam/scam-status?value=1234567890');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ isScam: true, reports: 1 });
  });

  it('should return not flagged for a non-existent value', async () => {
    const response = await request(app).get('/scam/scam-status?value=0987654321');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ isScam: false, reports: 0 });
  });

  it('should report a new scam', async () => {
    const response = await request(app)
      .post('/scam/report-scam')
      .send({ type: 'email', value: 'scam@example.com', details: 'Test email scam' });
  
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Scam reported successfully' });
  
    const scam = await Scam.findOne({ value: 'scam@example.com' });
    expect(scam).toBeTruthy();
    expect(scam?.reportsCount).toBe(1);
  });
});
