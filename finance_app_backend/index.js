import express from 'express';
import pkg from 'body-parser';;
import { config } from 'dotenv';
import authRoutes from './routes/authRoutes.js';

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const { json } = pkg;
app.use(json());

// Routes
app.use('/auth', authRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Authentication API');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
