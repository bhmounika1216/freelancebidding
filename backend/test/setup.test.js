/*const { connectDB, mongoose } = require('../config/db'); // you already have this
const User = require('../models/User');

before(async function () {
  this.timeout(20000);
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'secret';
  await connectDB(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fbp_test');
  await mongoose.connection.db.dropDatabase();
});

after(async function () {
  await mongoose.connection.close();
});
bevrktbke5uvtbhekjhtvk

const { connectDB, mongoose } = require('../config/db');

before(async function () {
  this.timeout(20000);
  require('dotenv').config({ path: '.env.test' });
  await connectDB();
});

after(async function () {
  await mongoose.connection.close();
});
hrfjrhjfndnfdm
const { connectDB, mongoose } = require('../config/db');
require('dotenv').config({ path: '.env.test' });

before(async function () {
  this.timeout(20000);
  await connectDB(); // one connection
  await mongoose.connection.db.dropDatabase(); // clean test DB
});

after(async function () {
  await mongoose.connection.close();
});
htgevgtjeht
// backend/test/setup.test.js
require('dotenv').config({ path: '.env.test' });

const { connectDB, mongoose } = require('../config/db');

before(async function () {
  this.timeout(20000);

  // 1) connect once (server.js must NOT auto-connect when imported)
  await connectDB();

  // 2) clean all collections instead of dropDatabase (Atlas user may lack drop perms)
  const collections = await mongoose.connection.db.collections();
  for (const coll of collections) {
    try {
      await coll.deleteMany({});
    } catch (e) {
      // ignore if collection doesn't support write yet
    }
  }
});

after(async function () {
  await mongoose.connection.close();
});


jhubchur



const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongo;

before(async function () {
  this.timeout(30000);

  // Start in-memory Mongo
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  // Connect once for all tests
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

after(async function () {
  // Close connection + stop server
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
});
fjmhgvtuivbe


const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
// in test helpers or at top of each test file
const jwt = require('jsonwebtoken');
const tokenFor = (u) =>
  jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });


let mem;

before(async function () {
  this.timeout(30000);
  mem = await MongoMemoryServer.create();
  const uri = mem.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

after(async function () {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mem.stop();
});
*/
const tokenFor = (u) =>
  jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mem;

before(async function () {
  this.timeout(30000);
  mem = await MongoMemoryServer.create();
  const uri = mem.getUri();
  await mongoose.connect(uri);
});

after(async function () {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mem.stop();
});


