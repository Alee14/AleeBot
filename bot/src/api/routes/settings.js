import { ChannelType } from 'discord.js';
import { Router } from 'express';
import { guildSettings } from '../../models/guild-settings.js';
import { verifyToken } from './auth.js';

export function settingsRouter(client) {
    const router = Router();

    router.get('/settings/guild/:id', verifyToken, async (req, res) => {
        try {
            const settings = await guildSettings.findOne({ where: { guildID: req.params.id } });

            if (!settings) return res.sendStatus(404);

            let channels = [];

            client.guilds.cache.get(settings.guildID).channels.cache
                .filter((channel) => channel.type === ChannelType.GuildText)
                .forEach((channel) => {
                    const channelInfo = {
                        name: channel.name,
                        id: channel.id,
                        category: channel.parent ? channel.parent.name : 'No Category'
                    };

                    channels.push(channelInfo);
                });

            res.json({
                settings: settings,
                guild: [
                    {
                        name: client.guilds.cache.get(settings.guildID).name,
                        id: settings.guildID
                    }
                ],
                channels: channels
            });
        } catch (e) {
            console.error('Error fetching settings:', e);
            res.status(500).send('Internal Server Error');
        }
    });

    router.post('/settings/guild/:id', verifyToken, async (req, res) => {
        try {
            const guildID = req.params.id;
            const { ...newSettings } = req.body;
            const [updated] = await guildSettings.update(newSettings, { where: { guildID: guildID } });
            if (updated) {
                const updatedSettings = await guildSettings.findOne({ where: { guildID: guildID } });
                res.json(updatedSettings);
            } else {
                res.status(404).send('Settings not found');
            }
        } catch (e) {
            console.error('Error updating settings:', e);
            res.status(500).send('Internal Server Error');
        }
    });

    return router;
}
