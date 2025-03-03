import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import { init } from './init.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages] });

init(client);

client.login(process.env.token).catch(function() {
    console.log('[X] Login failed. The token that you have put in is invalid.');
    process.exit(1);
});
