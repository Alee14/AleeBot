import express from 'express';
import cors from 'cors';

import 'dotenv/config';
import { readFileSync } from 'node:fs';

import { quoteRouter } from './routes/quotes.js';

const app = express();

export const apiServer = (client) => {
    app.use(cors()); // Allow cross-origin requests
    app.use(express.json());

    app.use('/api', quoteRouter);

    app.get('/api/version', (req, res) => {
        const { version } = JSON.parse(readFileSync('./package.json', 'utf-8'));
        res.json({
            version: version
        });

    });

    app.get('/api/uptime', (req, res) => {
        res.json({
            uptime: client.uptime
        });
    });

    app.get('/api/servers', (req, res) => {
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

    app.post('/api/leave', (req, res) => {
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
    app.listen(process.env.port, () => {
        console.log(`[i] Starting API at http://localhost:${process.env.port}`);
    });
};

