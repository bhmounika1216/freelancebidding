/*// config/db.js
const mongoose = require("mongoose");

// Set strictQuery explicitly to suppress the warning
//mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);  // Remove deprecated options
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

async function connectDB(uri = process.env.MONGO_URI) {
  if (!uri) throw new Error('MONGO_URI not set');
  await mongoose.connect(uri);
  console.log('MongoDB connected:', uri);
}

module.exports = { connectDB, mongoose };
dsgrygcvhvte
const mongoose = require('mongoose');

mongoose.set('strictQuery', false); // silence warning & keep future-proof

async function connectDB(uri = process.env.MONGO_URI) {
  if (!uri) throw new Error('MONGO_URI is not set');
  // If already connected with same URI, skip reconnect
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  // If connected to a different URI, close first
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }

  await mongoose.connect(uri);
  console.log('MongoDB connected:', uri);
  return mongoose.connection;
}

module.exports = { connectDB, mongoose };


jrgbeiutbvhkejtvh
*/
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

async function connectDB(uri = process.env.MONGO_URI) {
  if (!uri) throw new Error('MONGO_URI is not set');
  // Reuse existing connection if already open
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  // If connecting/connected to something else, close first
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
  await mongoose.connect(uri);
  console.log('MongoDB connected:', uri);
  return mongoose.connection;
}

module.exports = { connectDB, mongoose };
