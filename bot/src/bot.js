import { Client, GatewayIntentBits } from 'discord.js'
import 'dotenv/config'
import { event } from './handler/event.js'
import { commands } from "./handler/commands.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

commands(client);
event(client);

if (process.argv.indexOf('--beta') === -1) {
    client.login(process.env.abtoken).catch(function() {
        console.log('[X] Login failed. The token that you have put in is invalid.');
        process.exit(0);
    });
} else {
    client.login(process.env.abbtoken).catch(function() {
        console.log('[X] Login failed. The token that you have put in is invalid.');
        process.exit(0);
    });
}
