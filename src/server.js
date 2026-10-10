
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('Falta configurar MONGO_URI en .env');
  process.exit(1);
}

try {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB Atlas');

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error('MongoDB connection error:', error.message);
  process.exit(1);
}
