import { createUser, findUserByEmail } from '../models/userModel.js';
import { hashPassword, comparePassword, generateToken } from '../utils/authUtil.js';

// Signup
export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await hashPassword(password);
        const userId = await createUser(username, email, hashedPassword);
        res.status(201).json({ message: 'User created successfully', userId });
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT') {
            return res.status(400).json({ message: 'User already exists' });
        }
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};


