import { EmbedBuilder, Events, version } from 'discord.js';
import { readFileSync } from 'node:fs';

import { activities } from '../storage/activities.js';
import { abEmbedColour } from '../storage/consts.js';
import { QuoteOfTheDay } from '../plugins/qotd.js';
const { version: abVersion } = JSON.parse(readFileSync('./package.json', 'utf-8'));

function botActivity(client) {
    const activity = activities[Math.floor(Math.random() * activities.length)];

    client.user.setPresence({
        activities: [{
            name: activity.name,
            type: activity.type
        }],
        status: 'online'
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

        try {
            await botActivity(client);
            await QuoteOfTheDay(client);

            await client.guilds.cache.forEach(guild => {
                let threadCount = 0;

                guild.channels.cache.forEach(channel => {
                    if (channel.threads) {
                        threadCount += channel.threads.cache.size;
                        channel.threads.cache.forEach(thread => {
                            if (!thread.members.cache.has(client.user.id)) {
                                thread.join()
                                    .catch(error => console.error(`[X] Failed to join thread ${thread.name}:`, error));
                            }
                        });
                    }
                });

                console.log(`[>] Processed threads in guild: ${guild.name} | ${threadCount} Threads`);
            });

            if (process.env.NODE_ENV !== 'development') {
                const readyEmbed = new EmbedBuilder()
                    .setAuthor({ name: 'AleeBot Status', iconURL: client.user.avatarURL() })
                    .setDescription('AleeBot has started')
                    .addFields(
                        { name: 'Version', value: `${abVersion}`, inline: true },
                        { name: 'Node.JS Version', value: `${process.versions.node}`, inline: true },
                        { name: 'Discord.JS Version', value: `${version}`, inline: true }
                    )
                    .setColor(abEmbedColour);

                let statusChannel = client.channels.cache.get(process.env.STATUS_CHANNEL_ID);
                if (!statusChannel) return console.error('The status channel does not exist! Skipping.');
                await statusChannel.send({ embeds: [readyEmbed] });
            }

            setInterval(function () {
                botActivity(client);
            }, 200000);

        } catch (e) {
            console.error(e);
        }
    }
};
