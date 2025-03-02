import { Collection } from 'discord.js'
import { readdirSync } from 'node:fs';
import path from "node:path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const commandPath = path.join(__dirname, '../commands');

export async function commands(client) {
    client.commands = new Collection();
    const commandFiles = readdirSync(commandPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const { default: command } = await import(`../commands/${file}`);
        client.commands.set(command.data.name, command);
    }
}
