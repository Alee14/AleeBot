import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import { event } from './handlers/event.js';
import { command } from './handlers/command.js';
import { apiServer } from './api/server.js';
import { syncDB } from './utils/sync.js';
//import { deployCommands } from './util/deploy.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

async function init(client) {
    await syncDB();
    //deployCommands().then(() => console.log('[>] Deployed commands'));
    await apiServer(client);
    await event(client).then(() => console.log('[>] Event module loaded'));
    await command(client).then(() => console.log('[>] Command module loaded'));
}

init(client);

client.login(process.env.token).catch(function() {
    console.log('[X] Login failed. The token that you have put in is invalid.');
    process.exit(1);
});
