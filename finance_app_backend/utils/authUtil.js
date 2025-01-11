import bcrypt from 'bcrypt';
import pkg from 'jsonwebtoken';
import { config } from 'dotenv';

// Load environment variables
config();

const { sign } = pkg;
const SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Hash the password
export const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

// Compare plain-text password with hashed password
export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

// Generate JWT token
export const generateToken = (user) => {
    return sign({ id: user.id, username: user.username }, SECRET, {
        expiresIn: '1h', // Token valid for 1 hour
    });
};
