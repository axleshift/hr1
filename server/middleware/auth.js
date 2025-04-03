import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // adjust path based on your project structure

// Middleware to verify token and load user
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure JWT_SECRET is set in .env

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    res.status(403).json({ success: false, message: 'Invalid or expired token.' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required.' });
  }
  next();
};
