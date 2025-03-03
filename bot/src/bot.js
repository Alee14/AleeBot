import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import { event } from './handlers/event.js';
import { command } from './handlers/command.js';
import { apiServer } from './api/server.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

command(client).then(() => console.log('[>] Command module loaded'));
event(client).then(() => console.log('[>] Event module loaded'));
apiServer(client);

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
