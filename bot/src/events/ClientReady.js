import { Events } from 'discord.js';
import { readFileSync } from 'node:fs';

import { activities } from '../storage/activities.js';
const { version } = JSON.parse(readFileSync('./package.json', 'utf-8'));

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
    execute(client) {
        console.log('[>] AleeBot is now ready!');
        console.log(`[i] Logged in as ${client.user.tag}`);
        console.log(`[i] Bot ID: ${client.user.id}`);
        console.log(`[i] Running version ${version} | Serving in ${client.guilds.cache.size} guilds`);

        botActivity(client);

        setInterval(function() {
            botActivity(client);
        }, 200000);


    }
};
