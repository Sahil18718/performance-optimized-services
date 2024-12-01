
import authRoutes from './routes/auth.routes';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectToDatabase } from '@performance-optimized-services/shared-db';
import { connectToRedis } from '@performance-optimized-services/caching';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan('combined'));

app.use(express.json());
app.use('/auth', authRoutes);

const startServer = async () => {
  try {
    await connectToDatabase(process.env.MONGO_URI || '');
    console.log('Connected to MongoDB successfully.');

    await connectToRedis();
    console.log('Connected to Redis successfully.');

    app.listen(PORT, () => console.log(`auth service running on port ${PORT}`));
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
};


startServer();
