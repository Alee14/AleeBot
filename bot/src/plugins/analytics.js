import { commandUsages } from '../db/models/command-usages.js';
import { enableAnalytics } from '../storage/consts.js';

export async function Analytics(command, interaction) {
    if (enableAnalytics) {
        if (!interaction.guild) return await commandUsages.create({
            command: command.data.name,
            userID: interaction.user.id
        });

        return await commandUsages.create({
            command: command.data.name,
            userID: interaction.user.id,
            guildID: interaction.guild.id
        });
    }
}
