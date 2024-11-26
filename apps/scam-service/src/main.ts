import express from 'express';
import morgan from 'morgan'; // Import morgan
import dotenv from 'dotenv';
import { connectToDatabase } from '@performance-optimized-services/shared-db';
import { connectToRedis } from '@performance-optimized-services/caching';
import scamRoutes from './routes/scam.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Use morgan for logging requests
app.use(morgan('combined'));

app.use(express.json());
app.use('/scam', scamRoutes);

const startServer = async () => {
  await connectToDatabase(process.env.MONGO_URI || '');
  await connectToRedis();
  app.listen(PORT, () => console.log(`Scam service running on port ${PORT}`));
};

startServer();
