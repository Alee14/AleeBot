import { Events, MessageFlags } from 'discord.js';
import { Analytics } from '../plugins/analytics.js';
import { error } from '../storage/functions.js';

export default {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            if (interaction.guild) {
                console.log(`[i] ${interaction.user.username} has executed ${command.data.name} at ${interaction.guild.name}`);
            } else {
                console.log(`[i] ${interaction.user.username} has executed ${command.data.name} in DMs`);
            }

            await Analytics(command, interaction);
            await command.execute(interaction);
        } catch (e) {
            console.error(e);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: error(e), flags: MessageFlags.Ephemeral });
            } else {
                await interaction.reply({ content: error(e), flags: MessageFlags.Ephemeral });
            }
        }
    }
};
