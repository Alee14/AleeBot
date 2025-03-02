import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "node:path";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eventsPath = path.join(__dirname, '../events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

export async function event(client) {
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = (await import(filePath)).default;
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }

}
