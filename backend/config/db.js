const mongoose = require('mongoose');

let isMongoConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    isMongoConnected = true;
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    console.error(`📝 Fix options:`);
    console.error(`   1. Start local MongoDB: mongod`);
    console.error(`   2. Use MongoDB Atlas: https://www.mongodb.com/cloud/atlas`);
    console.error(`   3. Update MONGO_URI in backend/.env with your connection string`);
    console.error(`🔄 Continuing without database connection. Server will return connection errors.`);
    // Don't exit - let server continue running
  }
};

const isConnected = () => isMongoConnected;

module.exports = connectDB;
module.exports.isConnected = isConnected;
