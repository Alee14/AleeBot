const express = require('express');
const cors = require('cors');
const quotesRouter  = require('./routes/quotes');
require('dotenv').config()

const app = express();

const apiServer = (client) => {
    app.use(cors()); // Allow cross-origin requests
    app.use(express.json());

    app.use('/api', quotesRouter);

    app.get('/api/version', (req, res) => {
        const { abVersion } = require('../storage/settings.json');
        res.json(abVersion);

    });

    app.get('/api/uptime', (req, res) => {
        res.json(client.uptime);
    });

    app.get('/api/servers', (req, res) => {
        const guildsInfo = [];

        if (client.guilds.cache.size === 0) {
            res.json({
                message: 'No servers found'
            })
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
                })
            });

        } catch (error) {
            console.error('Error leaving server:', error);
            res.status(500).res.json({
                guild: guild.name,
                left: false
            })
        }
    });

    // Start the server
    app.listen(process.env.port, () => {
        console.log(`Server is running on http://localhost:${process.env.port}`);
    });
};

module.exports = apiServer;
