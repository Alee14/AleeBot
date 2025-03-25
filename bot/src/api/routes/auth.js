import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// Check if required environment variables are set
const requiredEnvVars = ['JWT_SECRET', 'API_USERNAME', 'API_PASSWORD_HASH'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    console.error('For AUTH_PASSWORD_HASH, run bcrypt with the round of 10');
}

export function authRouter() {
    const router = Router();

    // Login endpoint
    router.post('/login', async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required' });
            }

            // Check against environment variables
            if (username !== process.env.API_USERNAME) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Verify password
            const isPasswordValid = await bcrypt.compare(password, process.env.API_PASSWORD_HASH);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign(
                { username: username },
                process.env.JWT_SECRET,
                { expiresIn: '12h' }
            );

            res.json({ token });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    return router;
}

// Middleware to verify JWT token
export function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}
