import { ChannelType } from 'discord.js';
import { Router } from 'express';
import { guildSettings } from '../../models/guild-settings.js';

export function settingsRouter(client) {
    const router = Router();

    router.get('/settings/guild', async (req, res) => {
        try {
            const { guildID } = req.body;
            if (!guildID) return res.status(400).send('Guild ID not provided');
            const settings = await guildSettings.findOne({ where: { guildID: guildID } });
            res.json(settings);
        } catch (e) {
            console.error('Error fetching settings:', e);
            res.status(500).send('Internal Server Error');
        }
    });

    router.get('/settings/guild/:id', async (req, res) => {
        try {
            const settings = await guildSettings.findOne({ where: { guildID: req.params.id } });

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
                channels: channels
            });
        } catch (e) {
            console.error('Error fetching settings:', e);
            res.status(500).send('Internal Server Error');
        }
    });

    router.post('/settings/guild', async (req, res) => {
        try {
            const { guildID, ...newSettings } = req.body;
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
