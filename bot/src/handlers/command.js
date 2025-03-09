import { Collection } from 'discord.js';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const commandPath = path.join(__dirname, '../commands');
const commandFiles = readdirSync(commandPath).filter(file => file.endsWith('.js'));

export async function command(client) {
    client.commands = new Collection();
    console.log(`[i] Loading ${commandFiles.length} commands into memory...`);

    for (const file of commandFiles) {
        const { default: command } = await import(`../commands/${file}`);
        console.log(`[i] Loading command: ${command.data.name}`);
        client.commands.set(command.data.name, command);
    }
}
