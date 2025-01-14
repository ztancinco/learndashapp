import mongoose from 'mongoose';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;

  const mongoURI = 'mongodb://root:secret@mongodb:27017/lms?authSource=admin';

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectToDatabase;
