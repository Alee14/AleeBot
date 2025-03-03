import { Events, MessageFlags } from 'discord.js';

export default {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (e) {
            console.log(e);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: `Something went wrong. The following error message:\n\`\`\`${e}\`\`\``, flags: MessageFlags.Ephemeral });
            } else {
                await interaction.reply({ content: `Something went wrong. The following error message:\n\`\`\`${e}\`\`\``, flags: MessageFlags.Ephemeral });
            }
        }
    }
};
