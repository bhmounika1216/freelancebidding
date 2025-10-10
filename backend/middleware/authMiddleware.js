/*
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
kjdbfjdk
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate token helper
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
};

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, role });
    const token = generateToken(user._id, user.role);
    res.status(201).json({ id: user._id, name: user.name, email: user.email, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id, user.role);
    res.status(200).json({ id: user._id, name: user.name, email: user.email, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user profile (requires authentication)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
*/
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

    req.user = { id: decoded.id, _id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

const requireRole = (expectedRole) => (req, res, next) => {
  if (!req.user || req.user.role !== expectedRole) {
    return res.status(403).json({ message: `Forbidden: requires ${expectedRole}` });
  }
  next();
};

module.exports = { requireAuth, requireRole };
