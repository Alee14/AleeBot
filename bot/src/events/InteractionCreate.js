import { Events, MessageFlags } from 'discord.js';
import { Analytics } from '../plugins/analytics.js';

function error(e) {
    return `Something went wrong. [Submit an issue at the AleeBot repository.](<https://github.com/Alee14/AleeBot/issues>)\nMessage:\n\`\`\`js\n${e.stack}\`\`\``;
}

export default {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            console.log(`[i] ${interaction.user.username} has executed ${command.data.name} at ${interaction.guild.name}`);
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
