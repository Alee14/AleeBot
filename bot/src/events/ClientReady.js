import { EmbedBuilder, Events, version } from 'discord.js';
import { readFileSync } from 'node:fs';

import { activities } from '../storage/activities.js';
import { readyMsg, abEmbedColour } from '../storage/consts.js';
const { version: abVersion } = JSON.parse(readFileSync('./package.json', 'utf-8'));

function botActivity(client) {
    const activity = activities[Math.floor(Math.random() * activities.length)];

    client.user.setPresence({
        activities: [{
            name: activity.name,
            type: activity.type
        }],
        status: 'online',
        afk: false,
    });
    console.log(`[>] Updated bot presence to "${activity.name}"`);
}

export default {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log('[>] AleeBot is now ready!');
        console.log(`[i] Logged in as ${client.user.tag}`);
        console.log(`[i] Bot ID: ${client.user.id}`);
        console.log(`[i] Running version ${abVersion} | Serving in ${client.guilds.cache.size} guilds`);

        await botActivity(client);

        if (readyMsg) {
            const readyEmbed = new EmbedBuilder()
                .setAuthor({ name: 'AleeBot Status', iconURL: client.user.avatarURL() })
                .setDescription('AleeBot has started')
                .addFields(
                    { name: 'Version', value: `${abVersion}`, inline: true },
                    { name: 'Node.JS Version', value: `${process.versions.node}`, inline: true },
                    { name: 'Discord.JS Version', value: `${version}`, inline: true }
                )
                .setColor(abEmbedColour);

            let statusChannel = client.channels.cache.get(process.env.statusChannelID);
            if (!statusChannel) return console.error('The status channel does not exist! Skipping.');
            await statusChannel.send({ embeds: [readyEmbed]});
        }

        setInterval(function() {
            botActivity(client);
        }, 200000);


    }
};
