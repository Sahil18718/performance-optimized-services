import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectToDatabase } from '@performance-optimized-services/shared-db';
import { connectToRedis } from '@performance-optimized-services/caching';
import scamRoutes from './routes/scam.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan('combined'));

app.use(express.json());
app.use('/scam', scamRoutes);

const startServer = async () => {
  try {
    await connectToDatabase(process.env.MONGO_URI || '');
    console.log('Connected to MongoDB successfully.');

    await connectToRedis();
    console.log('Connected to Redis successfully.');

    app.listen(PORT,() => console.log(`Scam service running on port ${PORT}`));
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
};


startServer();
