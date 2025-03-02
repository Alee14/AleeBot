import { Events } from "discord.js";
import { readFileSync } from 'node:fs';

import { activities as activity } from '../storage/activities.js';

function botActivity(client) {
    client.user.setPresence({
        activities: [{
            name: activity[Math.floor(Math.random() * activity.length)]
        }],
        status: 'online',
        afk: false,
    });
    console.log(`[>] Updated bot presence to "${client.user.presence.activities[0].name}"`);
}

const { version } = JSON.parse(readFileSync('./package.json', 'utf-8'));

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
            botActivity();
        }, 200000);


    }
}
