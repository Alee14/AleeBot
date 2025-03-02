import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eventsPath = path.join(__dirname, '../events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

export async function event(client) {
    console.log(`[i] Loading ${eventFiles.length} events into memory...`);
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = (await import(filePath)).default;
        console.log(`[i] Loading event: ${event.name}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }

}
