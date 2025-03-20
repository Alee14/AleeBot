import { syncDB } from './utils/sync.js';
import { apiServer } from './api/server.js';
import { event } from './handlers/event.js';
import { command } from './handlers/command.js';
//import { deployCommands } from './util/deploy.js';

export async function init(client) {
    if (process.env.NODE_ENV === 'development') {
        await syncDB();
    }
    //deployCommands().then(() => console.log('[>] Deployed commands'));
    await apiServer(client);
    await event(client).then(() => console.log('[>] Event module loaded'));
    await command(client).then(() => console.log('[>] Command module loaded'));
}
