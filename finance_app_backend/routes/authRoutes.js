import { Router } from 'express';
import { signup, login } from '../controllers/authController.js';

const router = Router();

// Signup Route
router.post('/signup', signup);

// Login Route
router.post('/login', login);

export default router;
