import express from 'express';
import cors from 'cors';

import 'dotenv/config';
import { readFileSync } from 'node:fs';

import { quoteRouter } from './routes/quotes.js';
import { settingsRouter } from './routes/settings.js';
import { authRouter, verifyToken } from './routes/auth.js';

const app = express();

export const apiServer = (client) => {
    app.use(cors()); // Allow cross-origin requests
    app.use(express.json());

    app.use('/api', quoteRouter);
    app.use('/api', settingsRouter(client));
    app.use('/api', authRouter());

    app.get('/api/version', (req, res) => {
        const { version } = JSON.parse(readFileSync('./package.json', 'utf-8'));
        res.json({
            api_version: '1.0',
            ab_version: version
        });

    });

    app.get('/api/uptime', (req, res) => {
        res.json({
            uptime: client.uptime
        });
    });

    app.get('/api/servers', verifyToken, (req, res) => {
        const guildsInfo = [];

        if (client.guilds.cache.size === 0) {
            res.json({
                message: 'No servers found'
            });
        } else {
            client.guilds.cache.forEach((guild) => {
                const guildInfo = {
                    name: guild.name,
                    members: guild.memberCount,
                    id: guild.id
                };
                guildsInfo.push(guildInfo);
            });
        }

        res.json(guildsInfo);

    });

    app.post('/api/leave', verifyToken, (req, res) => {
        const { id } = req.body;
        let guild = client.guilds.cache.get(id);

        try {
            guild.leave().then(guild => {
                res.json({
                    guild: guild.name,
                    left: true
                });
            });

        } catch (error) {
            console.error('Error leaving server:', error);
            res.status(500).res.json({
                guild: guild.name,
                left: false
            });
        }
    });

    // Start the server
    app.listen(process.env.PORT, () => {
        console.log(`[i] Starting API at http://localhost:${process.env.PORT}`);
    });
};

