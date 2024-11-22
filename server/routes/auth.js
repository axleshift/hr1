import express from 'express';
import { login } from '../controller/authController.js';

const router = express.Router();

// Define your routes here
router.post('/login', login);

export default router;
